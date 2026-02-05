//DOM 
const countDisplay=document.getElementById('countDisplay');
const incrementBtn=document.getElementById('incrementBtn');
const decrementBtn=document.getElementById('decrementBtn');
const resetBtn=document.getElementById('resetBtn');

//state-data that can change 
//this variable keeps track of current count
let count=0;

//update function
function updateDisplay(){
    countDisplay.textContent=count;//text-count=changes text inside element
}

//function buttons
function increaseCount(){
    count=count+1;
    updateDisplay();
}
function decreaseCount(){
    count=count-1;
    updateDisplay();
}
function resetCount(){
    count=0;
    updateDisplay();
}

//connecting buttons to fns(event listeners)  //passing fn not calling
incrementBtn.addEventListener('click', increaseCount);
decrementBtn.addEventListener('click', decreaseCount);
resetBtn.addEventListener('click', resetCount);

updateDisplay();