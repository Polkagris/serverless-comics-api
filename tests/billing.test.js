import { calculateCost } from "../libs/billing-lib";
// Cost in 100 times actual value
test("Lower tier", () => {
    const storage = 10;
    const cost = 500;
    const expectedCost = calculateCost(storage);

    expect(cost).toEqual(expectedCost)
});

test("High tier", () => {
    const storage = 100;
    const cost = 1000;
    const expectedCost = calculateCost(storage);

    expect(cost).toEqual(expectedCost);
})