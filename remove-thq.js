const fs = require('fs');
const path = require('path');

function removeTeleportHQ(dir) {
    if (!fs.existsSync(dir)) return;
    fs.readdirSync(dir).forEach(file => {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            removeTeleportHQ(fullPath);
        } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.js')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            // Regex to remove the entire <a href='...teleporthq...'>...</a> block
            const regex = /<a href="https:\/\/play\.teleporthq\.io\/signup">[\s\S]*?<\/a>/g;
            let newContent = content.replace(regex, '');
            if (newContent !== content) {
                fs.writeFileSync(fullPath, newContent);
                console.log('Cleaned ' + file);
            }
        }
    });
}

removeTeleportHQ(path.join(__dirname, 'src', 'views'));
removeTeleportHQ(path.join(__dirname, 'src', 'components'));
