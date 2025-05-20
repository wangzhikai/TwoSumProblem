// author : Zhikai Wang ( zhikai.wang@alumni.ucla.edu heteroclinic.net)
// Two Sum algo:
// Input : sorted array length >= 2, n[i] + n[i+1] <=  t ( the samllest sum), n[l-1] + n[l-2]  >= t (largest sum)
// Output find i j j>i such a[i] + a[j] === t, the input guarantee t exist
// output [i+1,j+1]
// starting at i = 0, j = l - 1
// loop :
//      findRight: trim the right,
//      find the largest index such that n[nj] + n[i] <= t; 
//      nj > i ; n[nj+1] if exist n[nj] + n[i] > t
//      by doing so we know any elements beyond nj can not pair with the current n[i]. the sum will be bigger than t
//      check if n[nj] + n[i] === t, if so return [i+1,nj+1]
//      elements beyond nj are ruled out
//      j = nj 
//
//      findLeft: trim the left
//      find the smallest index such that n[ni] + n[j] >=t
//      ni < j ; n[ni-1] if exist n[ni-1] + n[j] < t
//      Given findRight done, we want the i side to catch up with the sum up to t or barely greater than t.
//      By doing so, we rule out elements not large enough to pair with current j.
//      check if n[ni-1] + n[j] === t, if so return [ni-1+1,j+1]
// if a[0] + a[0+1] > t, the smallest sum too big, return -1, this should be guaranteed by input but just for safety
// if a[l-2] + a[l-1] < t, the largest sum too small , return Infinity, this should be guaranteed by input but just for safety
// Underflow and overflow: 
// remove overflow check from findLeft , still need high level logic pre and post checks.
// keep underflow check in findLeft to make sure the progrom ends.
// remove underflow check from findRight, keep overflow check to make sure it ends.


// Asymptotic analysis TODO
// Suppose a + b = t, a_i and b_i are their indices.
// Each loop, it is bounded by log(n) conservatively.
// So the worst case is k log(n) where k is max(a_i, l - b_i). 
// If we visualize k = max(a_i, l-b_i) we see the search degenerates when a_i and b_i are very near. 
// When this happens, maybe we start the search by locating t/2, which is the average of a and b.
// Will that be a four pointers case??













// findLeft
// given ascending sorted array seg bounded by i and j, j > i. 
// find the smallest index ni,
// such n[ni] + n[j] >= t; ni <j ; n[ni-1] if exist n[ni-1] + n[j] < t
// if a[i] + a[j] >= t : if a[i-1] exist and a[i-1] + a[j] < t, return i, else return -2. If i = 0, return 0.
function findLeft(numbers, i, j, t, debug =false) {
    var n = numbers 


    // Underflow, greatest sum less than target
    if (n[j] + n[j-1] < t) {
        return Infinity
    }


    // the input should guarantee if [i-1] exist, n[i-1] +n[j] < t
    if ( n[i] +n[j] >= t) {
        if (i > 0 && n[i-1] +n[j] >=t ) {
            return -2
        } else {
            return i
        }
        
    }  
    var l = i
    var r = j
    var m = Math.floor((l+r) / 2);
    var s =  n[m] + n[j] 

    if (debug) {
        console.log(`0.1 l ${l} r ${r} m ${m} s ${s} t ${t} `)
    }
    
    while (true) {
        //  //n[j] + n[j-1] ? t check makes sure there is result and loop ends
        // if ( l+1 === r) {
        //     console.log(`0.2 l ${l} r ${r} m ${m} s ${s} t ${t} `)
        //     return l
        // }

        if (s >= t) {
            if (debug) {
                console.log(`1.1 l ${l} r ${r} m ${m} s ${s} t ${t} `)
            }
            
            if (n[m-1] + n[j] < t) {
                if (debug) {
                    console.log(`1.2 l ${l} r ${r} m ${m} s ${s} t ${t} `)
                }
                
                return m
            }
            r = m-1
            m = Math.floor((l+r) / 2);

            s =  n[m] + n[j] 
            
            if (debug) {
                console.log(`1.3 l ${l} r ${r} m ${m} s ${s} t ${t} `)
            }
        } 
        else //if (s < t) {
        {
            if (debug) {
                console.log(`2.1 l ${l} r ${r} m ${m} s ${s} t ${t} `)
            }
            l = m+1
            m = Math.floor((l+r) / 2);

            s =  n[m] + n[j] 
            
            if (debug) {
                console.log(`2.4 l ${l} r ${r} m ${m} s ${s} t ${t} `)
            }
        }
    }
    
    // console.log(`3.0 l ${l} r ${r} m ${m} s ${s} t ${t} `)
    // return l
}



// findRight
// given ascending sorted array seg bounded by i and j, j > i. 
// find the largest index nj,
// such n[nj] + n[i] <= t; nj > i ; n[nj+1] if exist n[nj] + n[i] > t
// at the beginning a[i] + a[j] <= t just return j
function findRight(numbers, i, j, t, debug =false) {
    var n = numbers 


    // overflow check
    if (n[i] + n[i+1] > t) {
        if (debug) {
            console.log(`0.-3`)
        }
        return -1
    }

    if ( n[i] +n[j] <= t) {
        if (n[j+1] != undefined && n[i] +n[j+1] <= t) {
            if (debug) {
                console.log(`0.-1`)
            }
            return -3
        } else {
            if (debug) {
                console.log(`0.-2`)
            }
            return j
        }
    }  
    var l = i
    var r = j
    var m = Math.floor((l+r) / 2);
    var s =  n[m] + n[i] 

    if (debug) {
        console.log(`0.1 l ${l} r ${r} m ${m} s ${s} t ${t} `)
    }
    // overflow check makes sure the loop end
    while (true) {
        if (s > t) {
            if (debug) {
                console.log(`1.1 l ${l} r ${r} m ${m} s ${s} t ${t} `)
            }
            r = m - 1
            m = Math.floor((l+r) / 2);

            s =  n[m] + n[i] 
            if (debug) {
                console.log(`1.3 l ${l} r ${r} m ${m} s ${s} t ${t} `)
            }
        } 
        else //if (s <= t) {
        {
            if (debug) {
                console.log(`2.1 l ${l} r ${r} m ${m} s ${s} t ${t} `)
            }
            if (n[m+1] + n[i] > t) {
                // n[i] + n[i+1] ? t makes sure it ends
                if (debug) {
                    console.log(`2.2 l ${l} r ${r} m ${m} s ${s} t ${t} `)
                }
                return m
            }
            l = m+1
            m = Math.floor((l+r) / 2);

            s =  n[m] + n[i] 
            if (debug) {
                console.log(`2.4 l ${l} r ${r} m ${m} s ${s} t ${t} `)
            }
        }
    }
    
    // console.log(`3.0 l ${l} r ${r} m ${m} s ${s} t ${t} `)
    // return l
}

//TODO integrate Two sum 


var twoSum = function(numbers, target) {
    let i = 0;
    let j = numbers.length - 1;

    while (i < j) {
        const sum = numbers[i] + numbers[j];

        if (sum === target) {
            return [i + 1, j + 1]; // Return 1-based indices
        }
        //n[nj] + n[i] <= t; nj > i ; n[nj+1] if exist n[nj] + n[i] > t
        var newJ = findRight(numbers, i, j, target );
        if (newJ >= 0) {
            j= newJ
        } else {
            return [-2,-1]
        }

        var newI = findLeft(numbers, i, j, target );
        if (newI >= 0) {
            i= newI
        } else {
            return [-2,-1]
        }
    }
    return [-1, -1]; // Should never reach here due to problem constraints
};


// {
//     var numbers =[-1,5,25,35,38,75,96,102], target = 100
//     console.log(twoSum(numbers, target)); //[3,6]

// }


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