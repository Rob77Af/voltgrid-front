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
  { id: 'm9', team: 'Cadillac', d1: { num: '11', name: 'S.PEREZ' }, d2: { num: '77', name: 'V.BOTTAS' }, defaultPick: '11' },
  { id: 'm10', team: 'Williams', d1: { num: '23', name: 'A.ALBON' }, d2: { num: '55', name: 'C.SAINZ' }, defaultPick: '55' },
  { id: 'm11', team: 'Audi/Sauber', d1: { num: '27', name: 'N.HULKENBERG' }, d2: { num: '05', name: 'G.BORTOLETO' }, defaultPick: '27' },
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
  'S.PEREZ',
  'V.BOTTAS',
  'A.ALBON',
  'C.SAINZ',
  'N.HULKENBERG',
  'G.BORTOLETO'
];

export function getDriverDetails(driverName: string) {
  for (const match of F1_MATCHUPS) {
    if (match.d1.name === driverName) return { ...match.d1, team: match.team };
    if (match.d2.name === driverName) return { ...match.d2, team: match.team };
  }
  return { name: driverName, num: '??', team: 'Unknown' };
}
export interface F1Event {
    round: string;
    name: string;
    circuit: string;
    date: string;
    time: string;
    status: 'OPEN' | 'CLOSED' | 'LIVE';
}

export const fetchNextEvent = async (): Promise<F1Event> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                round: '06',
                name: 'MIAMI GRAND PRIX',
                circuit: 'MIAMI INT. AUTODROME',
                date: 'MAY 05, 2024',
                time: '16:00 EST',
                status: 'OPEN'
            });
        }, 800);
    });
};

export interface RaceEvent {
    id: string;
    round: string;
    name: string;
    circuit: string;
    date: string;
    qualiStart: string;
    raceStart: string;
}

export const mockCalendar: RaceEvent[] = [
    { id: 'r1', round: '01', name: 'BAHRAIN GRAND PRIX', circuit: 'Bahrain International Circuit', date: 'FEB 29 - MAR 02', qualiStart: '01 MAR, 19:00', raceStart: '02 MAR, 18:00' },
    { id: 'r2', round: '02', name: 'SAUDI ARABIAN GRAND PRIX', circuit: 'Jeddah Corniche Circuit', date: 'MAR 07 - MAR 09', qualiStart: '08 MAR, 20:00', raceStart: '09 MAR, 20:00' },
    { id: 'r3', round: '03', name: 'AUSTRALIAN GRAND PRIX', circuit: 'Albert Park Circuit', date: 'MAR 22 - MAR 24', qualiStart: '23 MAR, 16:00', raceStart: '24 MAR, 15:00' },
    { id: 'r4', round: '04', name: 'JAPANESE GRAND PRIX', circuit: 'Suzuka International Racing Course', date: 'APR 05 - APR 07', qualiStart: '06 APR, 15:00', raceStart: '07 APR, 14:00' },
    { id: 'r5', round: '05', name: 'CHINESE GRAND PRIX', circuit: 'Shanghai International Circuit', date: 'APR 19 - APR 21', qualiStart: '20 APR, 15:00', raceStart: '21 APR, 15:00' },
    { id: 'r6', round: '06', name: 'MIAMI GRAND PRIX', circuit: 'Miami International Autodrome', date: 'MAY 03 - MAY 05', qualiStart: '04 MAY, 16:00', raceStart: '05 MAY, 16:00' },
    { id: 'r7', round: '07', name: 'EMILIA ROMAGNA GRAND PRIX', circuit: 'Imola Circuit', date: 'MAY 17 - MAY 19', qualiStart: '18 MAY, 16:00', raceStart: '19 MAY, 15:00' }
];

export const fetchCalendarData = async (): Promise<RaceEvent[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(mockCalendar);
        }, 800);
    });
};
