function MaxAverage(nums, k) {
    let n = nums.length;
    let max = -Infinity;
    let currentSum = 0;

    // Calculate the sum of the first k elements
    for (let i = 0; i < k; i++) {
        currentSum += nums[i];
    }

    // Initialize the maximum average with the average of the first k elements
    max = currentSum / k;

    // Slide the window across the array
    for (let i = k; i < n; i++) {
        // Update the sum by adding the next element and subtracting the first element in the previous window
        currentSum += nums[i] - nums[i - k];
        maxAvg = Math.max(max, currentSum / k);

        
        let tempSum = currentSum;
        for (let j = i + 1; j < n; j++) {
            tempSum += nums[j];
            max = Math.max(max, tempSum / (j - i + k));
        }
    }

    return max;
}


let nums = [1, 12, -5, -6, 50, 3];
let k = 4;
console.log(MaxAverage(nums, k));  