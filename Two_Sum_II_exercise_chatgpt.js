// Two Sum II - Binary Search Assisted Trimming Strategy
var twoSum = function(arr, t) {
    const findRight = (i, j) => {
        if (arr[i] + arr[j] <= t) return j;
        let lo = i, hi = j;
        while (hi - lo > 1) {
            let mid = (lo + hi) >> 1;
            if (arr[i] + arr[mid] > t) hi = mid;
            else lo = mid;
        }
        return lo;
    };

    const findLeft = (i, j) => {
        if (arr[i] + arr[j] >= t) return i;
        let lo = i, hi = j;
        while (hi - lo > 1) {
            let mid = (lo + hi) >> 1;
            if (arr[mid] + arr[j] < t) lo = mid;
            else hi = mid;
        }
        return hi;
    };

    let i = 0, j = arr.length - 1;
    while (i < j) {
        const sum = arr[i] + arr[j];
        if (sum === t) return [i + 1, j + 1];
        else if (sum > t) j = findRight(i, j - 1);
        else i = findLeft(i + 1, j);
    }
    return [-1, -1];
};


const testCases = [
    { input: { arr: [-1,5,25,35,38,75,96,102], t: 100 }, expected: [3, 6] },
    { input: { arr: [2, 7, 11, 15], t: 9 }, expected: [1, 2] },
    { input: { arr: [1, 2, 3, 4, 4, 9, 56, 90], t: 8 }, expected: [4, 5] },
    { input: { arr: [1, 2], t: 3 }, expected: [1, 2] }, // minimal size
    { input: { arr: [-10, -3, 2, 4, 6, 9], t: 0 }, expected: [2, 6] }, // negatives
    { input: { arr: [1, 1, 3, 5, 7, 7, 9], t: 14 }, expected: [5, 7] }, // duplicates
    { input: { arr: [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21], t: 30 }, expected: [10, 11] }, // deeper search
    { input: { arr: Array.from({length: 10000}, (_, i) => i + 1), t: 19999 }, expected: [9999, 10000] }, // large array
];

testCases.forEach(({ input: { arr, t }, expected }, idx) => {
    const result = twoSum(arr, t);
    const pass = result[0] === expected[0] && result[1] === expected[1];
    console.log(`Test Case ${idx + 1}: ${pass ? '✅ Passed' : '❌ Failed'}`);
    if (!pass) {
        console.log(`  Expected: ${expected}, Got: ${result}`);
    }
});