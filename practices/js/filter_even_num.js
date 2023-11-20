const arr = [1, 2, 3, 4, 2, 5, 6, 7, 8, 8];

// Filter Even Numbers:
// Write a function that takes an array of numbers and returns a new array containing only the even numbers.

let even = [];
for (let i = 0; i < arr.length; i++) {
    
    if(arr[i] %2 ==0)
    {
        even.push(arr[i])
    }
}

console.log(even);