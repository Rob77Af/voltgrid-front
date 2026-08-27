const fs = require('fs');
const path = require('path');

const playgroundDir = path.join(__dirname, '.playground');
const srcDir = path.join(__dirname, 'src');
const componentsDir = path.join(srcDir, 'components');
const viewsDir = path.join(srcDir, 'views');
const appDir = path.join(srcDir, 'app');

if (!fs.existsSync(componentsDir)) fs.mkdirSync(componentsDir, { recursive: true });
if (!fs.existsSync(viewsDir)) fs.mkdirSync(viewsDir, { recursive: true });

let allCssImports = [];

// Helper to process JS files
function processFile(filePath, outDir) {
    const fileName = path.basename(filePath);
    const isJs = fileName.endsWith('.js');
    const isCss = fileName.endsWith('.css');
    
    if (isJs) {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // React Router to Next.js Router
        content = content.replace(/import\s+\{\s*Link\s*\}\s+from\s+['"]react-router-dom['"]/g, "import Link from 'next/link'");
        content = content.replace(/<Link([^>]*)to=/g, '<Link$1href=');
        
        // Remove individual CSS imports to prevent Next.js global CSS errors
        const cssImportRegex = /import\s+['"]\.\/([^'"]+\.css)['"]/g;
        let match;
        while ((match = cssImportRegex.exec(content)) !== null) {
            allCssImports.push(path.join(outDir, match[1]));
        }
        content = content.replace(cssImportRegex, '// css imported globally');
        
        // Save as .tsx
        const newFileName = fileName.replace('.js', '.tsx');
        fs.writeFileSync(path.join(outDir, newFileName), content);
    } else if (isCss) {
        // Just copy CSS
        fs.copyFileSync(filePath, path.join(outDir, fileName));
    }
}

// Process components
if (fs.existsSync(path.join(playgroundDir, 'components'))) {
    fs.readdirSync(path.join(playgroundDir, 'components')).forEach(file => {
        processFile(path.join(playgroundDir, 'components', file), componentsDir);
    });
}

// Process views
if (fs.existsSync(path.join(playgroundDir, 'views'))) {
    fs.readdirSync(path.join(playgroundDir, 'views')).forEach(file => {
        processFile(path.join(playgroundDir, 'views', file), viewsDir);
    });
}

// Process style.css
if (fs.existsSync(path.join(playgroundDir, 'style.css'))) {
    fs.copyFileSync(path.join(playgroundDir, 'style.css'), path.join(appDir, 'playground-style.css'));
}

// Write a master CSS file that imports everything
let globalsCssPath = path.join(appDir, 'globals.css');
let globalsCssContent = fs.existsSync(globalsCssPath) ? fs.readFileSync(globalsCssPath, 'utf8') : '';

globalsCssContent += '\n\n/* Playground Imports */\n';
globalsCssContent += '@import "./playground-style.css";\n';
allCssImports.forEach(cssPath => {
    // get relative path from appDir
    let relPath = path.relative(appDir, cssPath).replace(/\\/g, '/');
    globalsCssContent += `@import "../${relPath}";\n`; // Wait, relPath is from appDir so `../components/x.css` since it's `../components` or `../views` relative to `src/app`
});

fs.writeFileSync(globalsCssPath, globalsCssContent);

console.log('Migration of files complete.');
