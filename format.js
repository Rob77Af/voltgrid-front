const fs = require('fs');

let content = fs.readFileSync('src/api/f1-data.ts', 'utf8');

const originalNames = [
  'Lando Norris', 'Oscar Piastri', 'Charles Leclerc', 'Lewis Hamilton',
  'George Russell', 'Kimi Antonelli', 'Max Verstappen', 'Isack Hadjar',
  'Fernando Alonso', 'Lance Stroll', 'Franco Colapinto', 'Pierre Gasly',
  'Esteban Ocon', 'Oliver Bearman', 'Liam Lawson', 'Arvid Lindblad',
  'Sergio Pérez', 'Valtteri Bottas', 'Alex Albon', 'Carlos Sainz',
  'Nico Hülkenberg', 'Gabriel Bortoleto'
];

function formatDriverName(fullName) {
    const parts = fullName.split(' ');
    const first = parts[0];
    const rest = parts.slice(1).join(' ');
    return `${first.charAt(0)}.${rest}`.toUpperCase();
}

originalNames.forEach(name => {
    const formatted = formatDriverName(name);
    // Escape regex characters just in case, though none here really need it except maybe dot if present
    const regex = new RegExp(`'${name}'`, 'g');
    content = content.replace(regex, `'${formatted}'`);
});

fs.writeFileSync('src/api/f1-data.ts', content);
console.log('Formatted drivers.');
