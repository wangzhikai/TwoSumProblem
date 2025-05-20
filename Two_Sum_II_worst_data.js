function generateLinearSpreadArray(n, step = 1e6) {
    return Array.from({ length: n }, (_, i) => i * step);
}

const n = 20;
const arr = generateLinearSpreadArray(n);
const target = arr[5] + arr[15] + 1; // No valid pair can sum to this
console.log("Strict worst-case array:", arr);
console.log("Target:", target);

function twoSum(numbers, target) {
    let i = 0;
    let j = numbers.length - 1;
    let loopCount = 0;

    while (i < j) {
        loopCount++;
        const sum = numbers[i] + numbers[j];
        console.log(`Loop ${loopCount}: i=${i}, j=${j}, sum=${sum}`);
        if (sum === target) {
            console.log("Total loops:", loopCount);
            return [i + 1, j + 1];
        } else if (sum > target) {
            j = findRight(numbers, i, j - 1, target - numbers[i]);
        } else {
            i = findLeft(numbers, i + 1, j, target - numbers[j]);
        }
    }

    console.log("Total loops:", loopCount);
    return [-1, -1];
}

function findLeft(numbers, i, j, target) {
    while (i < j) {
        const mid = Math.floor((i + j) / 2);
        if (numbers[mid] < target) {
            i = mid + 1;
        } else {
            j = mid;
        }
    }
    return i;
}

function findRight(numbers, i, j, target) {
    while (i < j) {
        const mid = Math.floor((i + j + 1) / 2);
        if (numbers[mid] > target) {
            j = mid - 1;
        } else {
            i = mid;
        }
    }
    return j;
}

const result = twoSum(arr, target);
console.log("Result:", result);



var a2 = [
         0,  1000000,  2000000,
   3000000,  4000000,  5000000,
   6000000,  7000000,  8000000,
   9000000, 10000000, 10000001,
  12000000, 13000000, 14000000,
  15000000, 16000000, 17000000,
  18000000, 19000000
];

//10000000
//20000001
var target2 = 20000001
const result2 = twoSum(a2, target);
console.log("Result:", result2);