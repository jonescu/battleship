import { shipFactory } from "../src";

test('should return an array of hit coordinates', () => {
    expect(shipFactory.hit(4,5)).toEqual([[4,5]])
}) 