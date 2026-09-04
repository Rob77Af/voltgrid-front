export interface VirtualUser {
    id: string;
    name: string;
    avatar: string;
    masterPicks: number[]; // Array of driver numbers they predicted for Top 10
    basePoints: number;    // Points from other events (Qualy, etc.)
}

// These are mock driver numbers based on the 2024/2025 grid
export const MOCK_USERS: VirtualUser[] = [
    { id: "u1", name: "Alex F1", avatar: "??", basePoints: 420, masterPicks: [1, 4, 16, 55, 63, 44, 81, 14, 10, 22] },
    { id: "u2", name: "Volt King", avatar: "?", basePoints: 415, masterPicks: [4, 1, 81, 16, 63, 55, 44, 11, 14, 31] },
    { id: "u3", name: "Tifosi BR", avatar: "???", basePoints: 405, masterPicks: [16, 55, 1, 4, 44, 81, 14, 63, 10, 20] },
    { id: "u4", name: "Papaya Rules", avatar: "??", basePoints: 390, masterPicks: [4, 81, 1, 16, 55, 63, 44, 22, 14, 27] },
    { id: "u5", name: "Senna1991", avatar: "????", basePoints: 380, masterPicks: [1, 16, 4, 81, 44, 63, 55, 11, 14, 10] },
];

export interface LiveScore {
    userId: string;
    name: string;
    avatar: string;
    totalPoints: number;
    trend: "up" | "down" | "same";
    rank: number;
}

export function calculateLiveScores(positions: Record<number, number>, previousScores: LiveScore[]): LiveScore[] {
    const currentTop10 = new Set<number>();
    
    // Find who is currently in the top 10
    Object.entries(positions).forEach(([driverStr, pos]) => {
        if (pos <= 10) {
            currentTop10.add(Number(driverStr));
        }
    });

    // Calculate raw points
    const newScores = MOCK_USERS.map(user => {
        let liveMasterPoints = 0;
        
        user.masterPicks.forEach((driverNum, index) => {
            const actualPos = positions[driverNum];
            
            // Basic provisional logic: 
            // 25 points if exactly correct position
            // 10 points if they are in the Top 10 but wrong position
            if (actualPos === index + 1) {
                liveMasterPoints += 25;
            } else if (currentTop10.has(driverNum)) {
                liveMasterPoints += 10;
            }
        });

        return {
            userId: user.id,
            name: user.name,
            avatar: user.avatar,
            totalPoints: user.basePoints + liveMasterPoints,
            trend: "same" as "same" | "up" | "down",
            rank: 0,
        };
    });

    // Sort descending
    newScores.sort((a, b) => b.totalPoints - a.totalPoints);

    // Apply ranks and calculate trends against previous state
    newScores.forEach((score, index) => {
        score.rank = index + 1;
        
        if (previousScores && previousScores.length > 0) {
            const prev = previousScores.find(p => p.userId === score.userId);
            if (prev) {
                if (score.rank < prev.rank) score.trend = "up";
                else if (score.rank > prev.rank) score.trend = "down";
                else score.trend = "same";
            }
        }
    });

    return newScores;
}

