// Hardcoded mock data for the F1 predictions

export const F1_MATCHUPS = [
  { id: 'm1', team: 'McLaren', d1: { num: '04', name: 'L.NORRIS' }, d2: { num: '81', name: 'O.PIASTRI' }, defaultPick: '04' },
  { id: 'm2', team: 'Ferrari', d1: { num: '16', name: 'C.LECLERC' }, d2: { num: '44', name: 'L.HAMILTON' }, defaultPick: '44' },
  { id: 'm3', team: 'Mercedes', d1: { num: '63', name: 'G.RUSSELL' }, d2: { num: '12', name: 'K.ANTONELLI' }, defaultPick: '63' },
  { id: 'm4', team: 'Red Bull', d1: { num: '01', name: 'M.VERSTAPPEN' }, d2: { num: '06', name: 'I.HADJAR' }, defaultPick: '06' },
  { id: 'm5', team: 'Aston Martin', d1: { num: '14', name: 'F.ALONSO' }, d2: { num: '18', name: 'L.STROLL' }, defaultPick: '14' },
  { id: 'm6', team: 'Alpine', d1: { num: '43', name: 'F.COLAPINTO' }, d2: { num: '10', name: 'P.GASLY' }, defaultPick: '10' },
  { id: 'm7', team: 'Haas', d1: { num: '31', name: 'E.OCON' }, d2: { num: '87', name: 'O.BEARMAN' }, defaultPick: '31' },
  { id: 'm8', team: 'Racing Bulls', d1: { num: '30', name: 'L.LAWSON' }, d2: { num: '41', name: 'A.LINDBLAD' }, defaultPick: '41' },
  { id: 'm9', team: 'Cadillac', d1: { num: '11', name: 'S.PÉREZ' }, d2: { num: '77', name: 'V.BOTTAS' }, defaultPick: '11' },
  { id: 'm10', team: 'Williams', d1: { num: '23', name: 'A.ALBON' }, d2: { num: '55', name: 'C.SAINZ' }, defaultPick: '55' },
  { id: 'm11', team: 'Audi/Sauber', d1: { num: '27', name: 'N.HÜLKENBERG' }, d2: { num: '05', name: 'G.BORTOLETO' }, defaultPick: '27' },
];

export const F1_DRIVERS = [
  'L.NORRIS',
  'O.PIASTRI',
  'C.LECLERC',
  'L.HAMILTON',
  'G.RUSSELL',
  'K.ANTONELLI',
  'M.VERSTAPPEN',
  'I.HADJAR',
  'F.ALONSO',
  'L.STROLL',
  'F.COLAPINTO',
  'P.GASLY',
  'E.OCON',
  'O.BEARMAN',
  'L.LAWSON',
  'A.LINDBLAD',
  'S.PÉREZ',
  'V.BOTTAS',
  'A.ALBON',
  'C.SAINZ',
  'N.HÜLKENBERG',
  'G.BORTOLETO'
];

export function getDriverDetails(driverName: string) {
  for (const match of F1_MATCHUPS) {
    if (match.d1.name === driverName) return { ...match.d1, team: match.team };
    if (match.d2.name === driverName) return { ...match.d2, team: match.team };
  }
  return { name: driverName, num: '??', team: 'Unknown' };
}
