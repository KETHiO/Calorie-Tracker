const exerciseLibrary = [

{name:"Bench Press",muscle:"chest",equipment:"barbell",difficulty:"intermediate"},
{name:"Incline Dumbbell Press",muscle:"chest",equipment:"dumbbell",difficulty:"intermediate"},
{name:"Chest Fly",muscle:"chest",equipment:"machine",difficulty:"beginner"},

{name:"Pull-ups",muscle:"back",equipment:"bodyweight",difficulty:"intermediate"},
{name:"Lat Pulldown",muscle:"back",equipment:"machine",difficulty:"beginner"},
{name:"Barbell Row",muscle:"back",equipment:"barbell",difficulty:"intermediate"},

{name:"Squat",muscle:"legs",equipment:"barbell",difficulty:"intermediate"},
{name:"Leg Press",muscle:"legs",equipment:"machine",difficulty:"beginner"},
{name:"Lunges",muscle:"legs",equipment:"bodyweight",difficulty:"beginner"},

{name:"Overhead Press",muscle:"shoulders",equipment:"barbell",difficulty:"intermediate"},
{name:"Lateral Raise",muscle:"shoulders",equipment:"dumbbell",difficulty:"beginner"},

{name:"Barbell Curl",muscle:"arms",equipment:"barbell",difficulty:"beginner"},
{name:"Hammer Curl",muscle:"arms",equipment:"dumbbell",difficulty:"beginner"},
{name:"Tricep Pushdown",muscle:"arms",equipment:"cable",difficulty:"beginner"}

]


let recovery = JSON.parse(localStorage.getItem("recovery")) || {

chest:100,
back:100,
legs:100,
shoulders:100,
arms:100

}


let history = JSON.parse(localStorage.getItem("history")) || {}



function generateWorkout(){

let muscle=document.getElementById("muscleSelect").value

let exercises = exerciseLibrary.filter(e => e.muscle === muscle)

buildWorkout(exercises)

highlightMuscle(muscle)

recovery[muscle]=0

localStorage.setItem("recovery",JSON.stringify(recovery))

updateRecovery()

}



function buildWorkout(exercises){

let list=document.getElementById("generatedWorkout")

list.innerHTML=""

exercises.forEach(exercise=>{

let lastWeight = history[exercise.name] || 20

let suggested = Math.round((lastWeight + 2.5)*10)/10

let li=document.createElement("li")

li.innerHTML = `
<strong>${exercise.name}</strong>
<br>
Muscle: ${exercise.muscle}
<br>
Equipment: ${exercise.equipment}
<br>
Difficulty: ${exercise.difficulty}
<br>
Last: ${lastWeight} kg
<br>
Suggested: ${suggested} kg
<br>
<input placeholder="Weight used (kg)" id="${exercise.name}">
<button onclick="saveWeight('${exercise.name}',${suggested})">Save</button>
`

list.appendChild(li)

})

}



function saveWeight(exercise,suggested){

let input=document.getElementById(exercise)

let weight=input.value

if(weight===""){

weight=suggested

}

history[exercise]=parseFloat(weight)

localStorage.setItem("history",JSON.stringify(history))

alert("Workout saved!")

}



function suggestWorkout(){

let best="chest"

let highest=0

for(let muscle in recovery){

if(recovery[muscle]>highest){

highest=recovery[muscle]

best=muscle

}

}

let exercises = exerciseLibrary.filter(e => e.muscle === best)

buildWorkout(exercises)

highlightMuscle(best)

alert("Recommended workout: "+best)

}



function highlightMuscle(muscle){

document.querySelectorAll(".muscle").forEach(m=>{

m.classList.remove("active")

})

let element=document.getElementById(muscle)

if(element) element.classList.add("active")

}



function updateRecovery(){

for(let muscle in recovery){

let element=document.getElementById(muscle)

if(!element) continue

let value=recovery[muscle]

if(value<30){

element.style.background="red"

}

else if(value<70){

element.style.background="orange"

}

else{

element.style.background="limegreen"

}

}

}



function recoverMuscles(){

for(let muscle in recovery){

recovery[muscle]+=5

if(recovery[muscle]>100){

recovery[muscle]=100

}

}

localStorage.setItem("recovery",JSON.stringify(recovery))

updateRecovery()

}



function showPage(page){

document.getElementById("dashboardPage").style.display="none"
document.getElementById("foodPage").style.display="none"
document.getElementById("workoutPage").style.display="none"
document.getElementById("profilePage").style.display="none"

document.getElementById(page).style.display="block"

}



setInterval(recoverMuscles,20000)

updateRecovery()
