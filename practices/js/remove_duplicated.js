const arr = [1, 2, 3, 4, 2, 5, 6, 7, 8, 8];
let uniqueArray = [];
for (let i = 0; i < arr.length; i++) {
    
    if (uniqueArray.indexOf(arr[i]) === -1)
    {
        uniqueArray.push(arr[i]);
    }
}

console.log("Original Array:", arr);
console.log("Array with Duplicates Removed:", uniqueArray);
