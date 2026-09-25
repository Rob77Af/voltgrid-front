import { useState, useEffect } from 'react';

export function useOpenF1Session(sessionType: string) {
    const [results, setResults] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;
        const fetchOpenF1 = async () => {
            setIsLoading(true);
            setError(null);
            
            try {
                // Map frontend session tabs to OpenF1 API session_name format
                const sessionMap: Record<string, string> = {
                    fp1: "Practice 1",
                    fp2: "Practice 2",
                    fp3: "Practice 3",
                    quali: "Qualifying",
                    sprint: "Sprint",
                    race: "Race"
                };

                const openF1SessionName = sessionMap[sessionType] || "Race";
                
                // 1. Fetch sessions
                const sessionRes = await fetch(`https://api.openf1.org/v1/sessions?year=2024&session_name=${encodeURIComponent(openF1SessionName)}`);
                const sessions = await sessionRes.json();
                
                if (!sessions || sessions.length === 0) {
                    if (isMounted) { setResults([]); setIsLoading(false); }
                    return;
                }

                // 2. Get the most recent session of this type
                const latestSession = sessions[sessions.length - 1];
                const sessionKey = latestSession.session_key;

                // 3. Fetch drivers for this specific session
                const driversRes = await fetch(`https://api.openf1.org/v1/drivers?session_key=${sessionKey}`);
                const drivers = await driversRes.json();

                // 4. Fetch position data to establish the classification
                const posRes = await fetch(`https://api.openf1.org/v1/position?session_key=${sessionKey}`);
                const posData = await posRes.json();

                // Map the latest known position for each driver
                const latestPositions: Record<number, number> = {};
                posData.forEach((p: any) => {
                    latestPositions[p.driver_number] = p.position;
                });

                // 5. Format to match our UI Table expectations
                const formattedResults = drivers.map((d: any) => ({
                    position: latestPositions[d.driver_number] || 'N/A',
                    number: d.driver_number,
                    Driver: {
                        givenName: d.first_name || '',
                        familyName: d.last_name || d.name_acronym || 'UNKNOWN'
                    },
                    Constructor: {
                        name: d.team_name || 'Unknown'
                    },
                    Time: {
                        time: sessionType === 'race' ? 'Ver Laps' : 'No Time Data'
                    },
                    points: sessionType === 'race' && latestPositions[d.driver_number] <= 10 ? '?' : '-' // OpenF1 doesn't have points
                }));

                // Sort properly by position
                formattedResults.sort((a: any, b: any) => {
                    if (a.position === 'N/A') return 1;
                    if (b.position === 'N/A') return -1;
                    return a.position - b.position;
                });

                if (isMounted) {
                    setResults(formattedResults);
                }
            } catch (err: any) {
                console.error("OpenF1 Error:", err);
                if (isMounted) setError(err.message);
            } finally {
                if (isMounted) setIsLoading(false);
            }
        };

        fetchOpenF1();

        return () => {
            isMounted = false;
        };
    }, [sessionType]);

    return { results, isLoading, error };
}
