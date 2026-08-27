const fs = require('fs');
const path = require('path');

function cleanFile(filePath) {
    if (!fs.existsSync(filePath)) return;
    let content = fs.readFileSync(filePath, 'utf8');

    // 1. Remove react-helmet imports
    content = content.replace(/import\s*\{\s*Helmet\s*\}\s*from\s*['"]react-helmet['"]\n?/g, '');
    
    // 2. Remove <Helmet>...</Helmet> block entirely
    content = content.replace(/<Helmet>[\s\S]*?<\/Helmet>/g, '');

    // 3. Replace dangerous-html Script with standard React script
    content = content.replace(/import\s*Script\s*from\s*['"]dangerous-html\/react['"]\n?/g, '');
    
    // Replace `<Script html={`...`} ></Script>` with `<script dangerouslySetInnerHTML={{ __html: `...` }} />`
    content = content.replace(/<Script\s+html=\{`([\s\S]*?)`\}\s*><\/Script>/g, '<script dangerouslySetInnerHTML={{ __html: `$1` }} />');

    // 4. Remove prop-types imports and usage
    content = content.replace(/import\s*PropTypes\s*from\s*['"]prop-types['"]\n?/g, '');
    content = content.replace(/[a-zA-Z0-9_]+\.propTypes\s*=\s*\{[\s\S]*?\}/g, '');
    content = content.replace(/[a-zA-Z0-9_]+\.defaultProps\s*=\s*\{[\s\S]*?\}/g, '');

    fs.writeFileSync(filePath, content);
}

function processDir(dir) {
    if (!fs.existsSync(dir)) return;
    fs.readdirSync(dir).forEach(file => {
        const fullPath = path.join(dir, file);
        if (fullPath.endsWith('.tsx')) {
            cleanFile(fullPath);
        }
    });
}

processDir(path.join(__dirname, 'src', 'components'));
processDir(path.join(__dirname, 'src', 'views'));

console.log('Cleanup script executed.');
