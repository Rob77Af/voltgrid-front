const fs = require('fs');
let content = fs.readFileSync('.playground/views/bet-now.js', 'utf8');

// 1. replace Link
content = content.replace(/import\s+\{\s*Link\s*\}\s+from\s+['"]react-router-dom['"]/g, "import Link from 'next/link'");
content = content.replace(/<Link([^>]*)to=/g, '<Link$1href=');
// 2. remove css imports
content = content.replace(/import\s+['"]\.\/([^'"]+\.css)['"]/g, '// css imported globally');
// 3. remove Helmet
content = content.replace(/import\s*\{\s*Helmet\s*\}\s*from\s*['"]react-helmet['"]\n?/g, '');
content = content.replace(/<Helmet>[\s\S]*?<\/Helmet>/g, '');
// 4. remove prop-types
content = content.replace(/import\s*PropTypes\s*from\s*['"]prop-types['"]\n?/g, '');
content = content.replace(/[a-zA-Z0-9_]+\.propTypes\s*=\s*\{[\s\S]*?\}/g, '');
content = content.replace(/[a-zA-Z0-9_]+\.defaultProps\s*=\s*\{[\s\S]*?\}/g, '');
// 5. prepend use client
content = '"use client";\n' + content;

fs.writeFileSync('src/views/bet-now.tsx', content);
console.log('Restored bet-now.tsx');
