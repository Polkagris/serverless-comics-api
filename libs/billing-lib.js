export const calculateCost = (storage) => {
    // 5$ for 10, 10$ for 100
    const rate = storage <= 10
        ? 5
        : storage <= 100
            ? 10
            : 10;
    return rate * 100;
};