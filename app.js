const workouts = {

chest:[
{exercise:"Bench Press",sets:"4",reps:"8"},
{exercise:"Incline Dumbbell Press",sets:"3",reps:"10"},
{exercise:"Chest Fly",sets:"3",reps:"12"},
{exercise:"Tricep Pushdown",sets:"3",reps:"12"}
],

shoulders:[
{exercise:"Overhead Press",sets:"4",reps:"8"},
{exercise:"Lateral Raise",sets:"3",reps:"12"},
{exercise:"Arnold Press",sets:"3",reps:"10"},
{exercise:"Face Pull",sets:"3",reps:"12"}
],

arms:[
{exercise:"Barbell Curl",sets:"4",reps:"10"},
{exercise:"Hammer Curl",sets:"3",reps:"12"},
{exercise:"Tricep Pushdown",sets:"3",reps:"12"},
{exercise:"Skull Crushers",sets:"3",reps:"10"}
],

legs:[
{exercise:"Squat",sets:"4",reps:"6"},
{exercise:"Leg Press",sets:"3",reps:"10"},
{exercise:"Lunges",sets:"3",reps:"12"},
{exercise:"Romanian Deadlift",sets:"3",reps:"10"}
]

}



let recovery = JSON.parse(localStorage.getItem("recovery")) || {

chest:100,
shoulders:100,
arms:100,
legs:100

}



function generateWorkout(){

let muscle=document.getElementById("muscleSelect").value

buildWorkout(muscle)

highlightMuscle(muscle)

recovery[muscle]=0

localStorage.setItem("recovery",JSON.stringify(recovery))

updateRecovery()

}



function buildWorkout(muscle){

let plan=workouts[muscle]

let list=document.getElementById("generatedWorkout")

list.innerHTML=""

let title=document.createElement("h3")

title.innerText=muscle.toUpperCase()+" WORKOUT"

list.appendChild(title)

plan.forEach(item=>{

let li=document.createElement("li")

li.innerText=item.exercise+" — "+item.sets+" sets x "+item.reps+" reps"

list.appendChild(li)

})

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

buildWorkout(best)

highlightMuscle(best)

alert("Recommended workout: "+best)

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
