let foods = JSON.parse(localStorage.getItem("foods")) || []

const exerciseLibrary = {

chest:["Bench Press","Incline Dumbbell Press","Chest Fly"],

back:["Pull-ups","Lat Pulldown","Barbell Row"],

legs:["Squat","Leg Press","Lunges"],

shoulders:["Overhead Press","Lateral Raise","Arnold Press"],

arms:["Barbell Curl","Hammer Curl","Tricep Pushdown"]

}

let workoutPlan=[]
let currentExercise=0
let sets=0



/* FOOD SYSTEM */

function addFood(){

let name=document.getElementById("foodName").value

let calories=document.getElementById("foodCalories").value

foods.push({name,calories})

localStorage.setItem("foods",JSON.stringify(foods))

renderFoods()

}

function renderFoods(){

let list=document.getElementById("foodList")

list.innerHTML=""

foods.forEach(food=>{

let li=document.createElement("li")

li.innerText=food.name+" - "+food.calories+" kcal"

list.appendChild(li)

})

}



/* BARCODE SCANNER */

function startScanner(){

Quagga.init({

inputStream:{
name:"Live",
type:"LiveStream",
target:document.querySelector("#scanner")
},

decoder:{
readers:["ean_reader"]
}

},function(err){

if(err){console.log(err);return}

Quagga.start()

})

Quagga.onDetected(function(data){

let code=data.codeResult.code

alert("Barcode: "+code)

Quagga.stop()

})

}



/* WORKOUT BUILDER */

function generateWorkout(){

let muscle=document.getElementById("muscleSelect").value

workoutPlan=exerciseLibrary[muscle]

let list=document.getElementById("generatedWorkout")

list.innerHTML=""

workoutPlan.forEach(exercise=>{

let li=document.createElement("li")

li.innerText=exercise+" | 3 sets x 10 reps"

list.appendChild(li)

})

}



/* WORKOUT SESSION */

function startWorkout(){

currentExercise=0

sets=0

showPage("sessionPage")

loadExercise()

}

function loadExercise(){

document.getElementById("sessionExercise").innerText=

workoutPlan[currentExercise]

document.getElementById("setCounter").innerText="0"

sets=0

}

function completeSet(){

sets++

document.getElementById("setCounter").innerText=sets

if(sets>=3){

alert("Exercise complete!")

}

}

function nextExercise(){

currentExercise++

if(currentExercise>=workoutPlan.length){

alert("Workout complete!")

showPage("dashboardPage")

return

}

loadExercise()

}



/* REST TIMER */

let timerInterval

function startTimer(){

let time=60

document.getElementById("timer").innerText=time

clearInterval(timerInterval)

timerInterval=setInterval(()=>{

time--

document.getElementById("timer").innerText=time

if(time<=0){

clearInterval(timerInterval)

}

},1000)

}



/* NAVIGATION */

function showPage(page){

document.getElementById("dashboardPage").style.display="none"
document.getElementById("foodPage").style.display="none"
document.getElementById("workoutPage").style.display="none"
document.getElementById("sessionPage").style.display="none"

document.getElementById(page).style.display="block"

}

renderFoods()
