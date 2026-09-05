import { useState, useEffect } from "react";

export interface JolpicaDriver {
    driverId: string;
    permanentNumber: string;
    code: string;
    givenName: string;
    familyName: string;
    nationality: string;
}

export interface JolpicaConstructor {
    constructorId: string;
    name: string;
    nationality: string;
}

export interface JolpicaDriverStanding {
    position: string;
    points: string;
    wins: string;
    Driver: JolpicaDriver;
    Constructors: JolpicaConstructor[];
}

export interface JolpicaConstructorStanding {
    position: string;
    points: string;
    wins: string;
    Constructor: JolpicaConstructor;
}

export interface JolpicaRace {
    season: string;
    round: string;
    raceName: string;
    Circuit: { circuitName: string; Location: { locality: string; country: string } };
    date: string;
    time: string;
}

export interface JolpicaRaceResult {
    number: string;
    position: string;
    points: string;
    Driver: JolpicaDriver;
    Constructor: JolpicaConstructor;
    grid: string;
    laps: string;
    status: string;
    Time?: { millis: string; time: string };
    FastestLap?: { rank: string; lap: string; Time: { time: string }; AverageSpeed: { speed: string } };
}

export function useJolpicaStandings(year: string = "2024") {
    const [drivers, setDrivers] = useState<JolpicaDriverStanding[]>([]);
    const [constructors, setConstructors] = useState<JolpicaConstructorStanding[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchStandings() {
            try {
                setIsLoading(true);
                const [dRes, cRes] = await Promise.all([
                    fetch(`https://api.jolpi.ca/ergast/f1/${year}/driverStandings.json`),
                    fetch(`https://api.jolpi.ca/ergast/f1/${year}/constructorStandings.json`)
                ]);
                const dData = await dRes.json();
                const cData = await cRes.json();
                
                setDrivers(dData.MRData.StandingsTable.StandingsLists[0]?.DriverStandings || []);
                setConstructors(cData.MRData.StandingsTable.StandingsLists[0]?.ConstructorStandings || []);
            } catch (err) {
                console.error("Failed to fetch standings:", err);
            } finally {
                setIsLoading(false);
            }
        }
        fetchStandings();
    }, [year]);

    return { drivers, constructors, isLoading };
}

export function useJolpicaCalendar(year: string = "2024") {
    const [races, setRaces] = useState<JolpicaRace[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchCalendar() {
            try {
                setIsLoading(true);
                const res = await fetch(`https://api.jolpi.ca/ergast/f1/${year}.json`);
                const data = await res.json();
                setRaces(data.MRData.RaceTable.Races || []);
            } catch (err) {
                console.error("Failed to fetch calendar:", err);
            } finally {
                setIsLoading(false);
            }
        }
        fetchCalendar();
    }, [year]);

    return { races, isLoading };
}

export function useJolpicaRaceResults(year: string = "2024", round: string) {
    const [results, setResults] = useState<JolpicaRaceResult[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!round) return;
        async function fetchResults() {
            try {
                setIsLoading(true);
                const res = await fetch(`https://api.jolpi.ca/ergast/f1/${year}/${round}/results.json`);
                const data = await res.json();
                if (data.MRData.RaceTable.Races.length > 0) {
                    setResults(data.MRData.RaceTable.Races[0].Results || []);
                } else {
                    setResults([]);
                }
            } catch (err) {
                console.error("Failed to fetch race results:", err);
                setResults([]);
            } finally {
                setIsLoading(false);
            }
        }
        fetchResults();
    }, [year, round]);

    return { results, isLoading };
}
