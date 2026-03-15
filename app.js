let goal = 2200

let foods = JSON.parse(localStorage.getItem("foods")) || []
let workouts = JSON.parse(localStorage.getItem("workouts")) || []

const exercises = {

chest:["Bench Press","Incline Dumbbell Press","Chest Fly","Push-ups"],
back:["Pull-ups","Lat Pulldown","Barbell Row","Seated Cable Row"],
legs:["Squats","Leg Press","Lunges","Romanian Deadlift"],
shoulders:["Overhead Press","Lateral Raise","Arnold Press"],
arms:["Bicep Curl","Tricep Pushdown","Hammer Curl"]

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

}

function highlightMuscle(muscle){

document.querySelectorAll(".muscle").forEach(m=>{
m.classList.remove("active")
})

document.getElementById(muscle).classList.add("active")

}

function addWorkout(){

let exercise=document.getElementById("exerciseName").value

let sets=document.getElementById("sets").value

let reps=document.getElementById("reps").value

workouts.push({
exercise:exercise,
sets:sets,
reps:reps
})

localStorage.setItem("workouts",JSON.stringify(workouts))

renderWorkouts()

}

function renderWorkouts(){

let list=document.getElementById("workoutList")

list.innerHTML=""

workouts.forEach(workout=>{

let li=document.createElement("li")

li.innerText=workout.exercise+" | "+workout.sets+"x"+workout.reps

list.appendChild(li)

})

}

function showPage(page){

document.getElementById("dashboardPage").style.display="none"
document.getElementById("foodPage").style.display="none"
document.getElementById("workoutPage").style.display="none"
document.getElementById("profilePage").style.display="none"

document.getElementById(page).style.display="block"

}

renderWorkouts()
