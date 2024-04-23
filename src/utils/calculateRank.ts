
const calculateRank = (rank: number): { level: number, percentage: number } => {
    let level = 0;
    let percentage = 0;
    if (rank >= 10 && rank < 20) {
        level = 1
        percentage = (rank - 10) / (20 - 10) * 100;
    } else if (rank >= 20 && rank < 50) {
        level = 2
        percentage = (rank - 20) / (50 - 20) * 100;
    } else if (rank >= 50 && rank < 120) {
        level = 3
    } else if (rank >= 120 && rank < 220) {
        level = 4
        percentage = (rank - 120) / (220 - 120) * 100;
    } else if (rank >= 220 && rank < 500) {
        level = 5
        percentage = (rank - 220) / (500 - 220) * 100;
    } else if (rank >= 500 && rank < 1000) {
        level = 6
        percentage = (rank - 500) / (1000 - 500) * 100;
    } else if(rank >= 1000) {
        level = 7
        percentage = 100;
    }
    return {
        level: level,
        percentage: percentage
    };
};

export default calculateRank;
