const fs = require('fs');
const path = require('path');

function prependUseClient(dir) {
    if (!fs.existsSync(dir)) return;
    fs.readdirSync(dir).forEach(file => {
        const fullPath = path.join(dir, file);
        if (fullPath.endsWith('.tsx')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            if (!content.startsWith('"use client"')) {
                fs.writeFileSync(fullPath, '"use client";\n' + content);
            }
        }
    });
}

prependUseClient(path.join(__dirname, 'src', 'components'));
prependUseClient(path.join(__dirname, 'src', 'views'));
