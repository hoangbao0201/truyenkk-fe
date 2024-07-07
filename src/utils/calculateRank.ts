
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
    } else if(rank >= 1000 && rank < 2000) {
        level = 7
        percentage = (rank - 1000) / (2000 - 1000) * 100;
    } else if(rank >= 2000 && rank < 2600) {
        level = 8
        percentage = (rank - 2000) / (2600 - 2000) * 100;
    } else if(rank >= 2600 && rank < 3300) {
        level = 9
        percentage = (rank - 2600) / (3300 - 2600) * 100;
    } else if(rank >= 3300 && rank < 4100) {
        level = 10
        percentage = (rank - 3300) / (4100 - 3300) * 100;
    } else if(rank >= 4100 && rank < 5000) {
        level = 11
        percentage = (rank - 4100) / (5000 - 4100) * 100;
    }
    else if(rank > 5000) {
        level = 12
        percentage = 100;
    }
    return {
        level: level,
        percentage: percentage
    };
};

export default calculateRank;

// 1: 10->20        10 luyện khí
// 2: 20->60        20 trúc cơ      +10
// 3: 60->120       60 kim đan
// 4: 120->320      120 nguyên anh  +40
// 5: 320->640      320 hóa thần
// 6: 640->1600     640 luyện hư    +160
// 7: 1600->3200    1600 hợp thể
// 8: 3200->7680    3200 đại thừa   +640

// 9: 7680-> 15360   7680 đại thừa
// 10: 15360->       15360 đại thừa   +2560

// 1: 0->10  luyện khí
// 2: 10->50     50 trúc cơ
// 3: 50->120    70 kim đan
// 4: 120->220   100 nguyên anh
// 5: 220->360   140 hóa thần
// 6: 360->550   190 luyện hư
// 7: 550-> hợp thể
