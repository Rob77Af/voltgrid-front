import { useState, useEffect } from "react";

export interface F1PositionUpdate {
    date: string;
    session_key: number;
    meeting_key: number;
    driver_number: number;
    position: number;
}

export function useLiveF1Positions() {
    const [positions, setPositions] = useState<Record<number, number>>({});
    const [isLoading, setIsLoading] = useState(true);
    const [progress, setProgress] = useState({ current: 0, total: 0 });

    useEffect(() => {
        let timer: NodeJS.Timeout;

        async function fetchPositions() {
            try {
                setIsLoading(true);
                // In a real app, this would be session_key=latest
                const response = await fetch("https://api.openf1.org/v1/position?session_key=9662");
                const data: F1PositionUpdate[] = await response.json();
                
                if (data.length === 0) {
                    setIsLoading(false);
                    return;
                }

                // Initialize with first 20 events (starting grid)
                const initialState: Record<number, number> = {};
                for (let i = 0; i < Math.min(20, data.length); i++) {
                    initialState[data[i].driver_number] = data[i].position;
                }
                setPositions(initialState);
                setProgress({ current: 20, total: data.length });
                setIsLoading(false);

                // Replay the rest of the events slowly
                let index = 20;
                timer = setInterval(() => {
                    if (index >= data.length) {
                        clearInterval(timer);
                        return;
                    }

                    // Process up to 3 events per tick to speed up the replay visually
                    const batchSize = 3;
                    const end = Math.min(index + batchSize, data.length);
                    
                    setPositions(prev => {
                        const next = { ...prev };
                        for (let i = index; i < end; i++) {
                            next[data[i].driver_number] = data[i].position;
                        }
                        return next;
                    });
                    
                    index = end;
                    setProgress({ current: index, total: data.length });
                }, 1000); // 1 second per tick

            } catch (error) {
                console.error("Failed to fetch F1 live positions", error);
                setIsLoading(false);
            }
        }

        fetchPositions();

        return () => {
            if (timer) clearInterval(timer);
        };
    }, []);

    return { positions, isLoading, progress };
}

