const arr = [1, 2, 3, 4, 2, 5, 6, 7, 8, 8];

// Find Maximum Value:
let mx = 0;
for (let i = 0; i < arr.length; i++) {
    if(arr[i] > mx)
    {
        mx = arr[i];
    }
    
}
console.log(mx);
