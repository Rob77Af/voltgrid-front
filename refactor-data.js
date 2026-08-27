const fs = require('fs');

// 1. driver-matchup-predictions.tsx
let matchupCode = fs.readFileSync('src/components/driver-matchup-predictions.tsx', 'utf8');
matchupCode = matchupCode.replace(/const matchups = \[[\s\S]*?\];/m, '');
matchupCode = matchupCode.replace(/import React, \{ useState \} from 'react';/, "import React, { useState } from 'react';\nimport { F1_MATCHUPS } from '@/api/f1-data';");
matchupCode = matchupCode.replace(/useState\(matchups\)/g, 'useState(F1_MATCHUPS)');
fs.writeFileSync('src/components/driver-matchup-predictions.tsx', matchupCode);

// 2. top-10-finish.tsx
let top10Code = fs.readFileSync('src/components/top-10-finish.tsx', 'utf8');
top10Code = top10Code.replace(/const drivers = \[[\s\S]*?\]\.sort\(\);/, '');
top10Code = top10Code.replace(/import React, \{ useState \} from 'react';/, "import React, { useState } from 'react';\nimport { F1_DRIVERS } from '@/api/f1-data';");
top10Code = top10Code.replace(/\{drivers\.map/g, '{F1_DRIVERS.map');
fs.writeFileSync('src/components/top-10-finish.tsx', top10Code);
console.log('Replacements done.');
