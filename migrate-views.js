const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');
const appDir = path.join(srcDir, 'app');
const viewsDir = path.join(srcDir, 'views');

const mappings = [
    { view: 'bet-now', pageDir: '' },
    { view: 'bet', pageDir: 'bet' },
    { view: 'homepage', pageDir: 'homepage' },
    { view: 'terms-conditions', pageDir: 'terms-conditions' }
];

// Helper to extract metadata
function extractMetadata(pageContent) {
    const match = pageContent.match(/export const metadata.*?=.*?\{[\s\S]*?\};/);
    return match ? match[0] : '';
}

mappings.forEach(m => {
    const viewPath = path.join(viewsDir, `${m.view}.tsx`);
    const cssPath = path.join(viewsDir, `${m.view}.css`);
    const targetDir = path.join(appDir, m.pageDir);
    const targetPagePath = path.join(targetDir, 'page.tsx');
    const targetCssPath = path.join(targetDir, 'page.css');

    if (fs.existsSync(viewPath)) {
        // 1. Read existing page.tsx to get metadata
        let metadata = '';
        if (fs.existsSync(targetPagePath)) {
            const pageContent = fs.readFileSync(targetPagePath, 'utf8');
            metadata = extractMetadata(pageContent);
        } else {
            fs.mkdirSync(targetDir, { recursive: true });
        }

        // 2. Read the view content
        let viewContent = fs.readFileSync(viewPath, 'utf8');

        // 3. Clean up the view content
        // Remove use client
        viewContent = viewContent.replace(/"use client";\n?/, '');
        viewContent = viewContent.replace(/'use client';\n?/, '');
        
        // Fix component imports
        viewContent = viewContent.replace(/\.\.\/components/g, '@/components');
        viewContent = viewContent.replace(/\.\.\/\.\.\/components/g, '@/components');

        // 4. Combine metadata and view content
        let finalContent = `import type { Metadata } from 'next';\nimport './page.css';\n\n`;
        if (metadata) {
            finalContent += metadata + '\n\n';
        }
        finalContent += viewContent;

        // 5. Write to page.tsx
        fs.writeFileSync(targetPagePath, finalContent);
        console.log(`Migrated ${m.view} to ${targetPagePath}`);

        // 6. Move CSS file if it exists
        if (fs.existsSync(cssPath)) {
            fs.renameSync(cssPath, targetCssPath);
            console.log(`Moved ${m.view}.css to ${targetCssPath}`);
        }
    }
});

// Remove CSS imports from globals.css
let globalsCssPath = path.join(appDir, 'globals.css');
let globalsCss = fs.readFileSync(globalsCssPath, 'utf8');
globalsCss = globalsCss.replace(/@import "\.\.\/views\/bet-now\.css";\n?/, '');
globalsCss = globalsCss.replace(/@import "\.\.\/views\/homepage\.css";\n?/, '');
globalsCss = globalsCss.replace(/@import "\.\.\/views\/terms-conditions\.css";\n?/, '');
fs.writeFileSync(globalsCssPath, globalsCss);
console.log('Cleaned up globals.css');

// Remove views directory if empty
fs.readdirSync(viewsDir).forEach(file => {
    const fPath = path.join(viewsDir, file);
    fs.unlinkSync(fPath);
});
fs.rmdirSync(viewsDir);
console.log('Removed views directory.');
