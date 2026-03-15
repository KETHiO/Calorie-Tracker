const exercises = {

chest:["Bench Press","Incline Dumbbell Press","Chest Fly","Push-ups"],

shoulders:["Overhead Press","Lateral Raise","Arnold Press"],

arms:["Bicep Curl","Tricep Pushdown","Hammer Curl"],

legs:["Squats","Leg Press","Lunges","Romanian Deadlift"]

}


let recovery = JSON.parse(localStorage.getItem("recovery")) || {

chest:100,
shoulders:100,
arms:100,
legs:100

}


function generateWorkout(){

let muscle=document.getElementById("muscleSelect").value

highlightMuscle(muscle)

let workout=exercises[muscle]

let list=document.getElementById("generatedWorkout")

list.innerHTML=""

workout.forEach(exercise=>{

let li=document.createElement("li")

li.innerText=exercise+" | 3 sets x 10 reps"

list.appendChild(li)

})

recovery[muscle]=0

localStorage.setItem("recovery",JSON.stringify(recovery))

updateRecovery()

}


function highlightMuscle(muscle){

document.querySelectorAll(".muscle").forEach(m=>{
m.classList.remove("active")
})

document.getElementById(muscle).classList.add("active")

}


function updateRecovery(){

for(let muscle in recovery){

let element=document.getElementById(muscle)

let value=recovery[muscle]

if(value<30){

element.style.background="red"

}else if(value<70){

element.style.background="orange"

}else{

element.style.background="limegreen"

}

}

}


function recoverMuscles(){

for(let muscle in recovery){

recovery[muscle]+=10

if(recovery[muscle]>100){

recovery[muscle]=100

}

}

localStorage.setItem("recovery",JSON.stringify(recovery))

updateRecovery()

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

alert("Recommended workout today: "+best)

}


function showPage(page){

document.getElementById("dashboardPage").style.display="none"
document.getElementById("foodPage").style.display="none"
document.getElementById("workoutPage").style.display="none"
document.getElementById("profilePage").style.display="none"

document.getElementById(page).style.display="block"

}


setInterval(recoverMuscles,30000)

updateRecovery()
