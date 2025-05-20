import math
import random

# Generate worst-case data where a_i ≈ b_i, clustering around target/2
def generate_worst_case_data(n, target):
    half = target // 2
    spread = n // 10  # small spread to cluster around target/2
    data = sorted(random.randint(half - spread, half + spread) for _ in range(n))
    return data

# Binary search to find the smallest index such that arr[i] >= x
def binary_search_closest_ge(arr, low, high, x):
    while low < high:
        mid = (low + high) // 2
        if arr[mid] < x:
            low = mid + 1
        else:
            high = mid
    return low

# Binary search to find the largest index such that arr[i] <= x
def binary_search_closest_le(arr, low, high, x):
    while low < high:
        mid = (low + high + 1) // 2
        if arr[mid] > x:
            high = mid - 1
        else:
            low = mid
    return low

# Find the left pointer such that arr[i] + arr[j] >= target
def findLeft(arr, i, j, target):
    while i < j:
        if arr[i] + arr[j] < target:
            i += 1
        else:
            break
    return i

# Find the right pointer such that arr[i] + arr[j] <= target
def findRight(arr, i, j, target):
    while i < j:
        if arr[i] + arr[j] > target:
            j -= 1
        else:
            break
    return j

# Check if a valid pair exists at (i, j)
def is_valid_pair(arr, i, j, target):
    return 0 <= i < j < len(arr) and arr[i] + arr[j] == target

# Main algorithm with log^2 strategy
def two_sum_log_squared(arr, target):
    i, j = 0, len(arr) - 1
    percent = 0.5
    steps = 0
    max_loops = int(math.log2(len(arr))) + 1

    for _ in range(max_loops):
        steps += 1
        i = findLeft(arr, i, j, target)
        j = findRight(arr, i, j, target)
        if i == -1 or j == -1 or i >= j:
            return None, steps

        pivot = target // 2
        newI = binary_search_closest_ge(arr, i, j, pivot)
        newJ = binary_search_closest_le(arr, i, j, pivot)

        stepI = int((newI - i) * percent)
        stepJ = int((j - newJ) * percent)

        guessI = max(i, newI - stepI)
        guessJ = min(j, newJ + stepJ)

        gi = findLeft(arr, guessI, guessJ, target)
        gj = findRight(arr, guessI, guessJ, target)
        if is_valid_pair(arr, gi, gj, target):
            return (gi, gj), steps

        i, j = newI, newJ

    return None, steps

# Example usage
if __name__ == "__main__":
    n = 1000
    target = 1000
    arr = generate_worst_case_data(n, target)
    result, steps = two_sum_log_squared(arr, target)
    print(f"Result: {result}, Steps: {steps}")
    if result:
        i, j = result
        print(f"arr[{i}] = {arr[i]}, arr[{j}] = {arr[j]}, sum = {arr[i] + arr[j]}")
