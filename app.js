let goal = 2200

let foods = JSON.parse(localStorage.getItem("foods")) || []
let workouts = JSON.parse(localStorage.getItem("workouts")) || []

function updateCalories(){

let consumed = foods.reduce((sum,food)=>sum + Number(food.calories),0)

document.getElementById("consumed").innerText = consumed

document.getElementById("remaining").innerText = goal - consumed

}

function renderFoods(){

let list = document.getElementById("foodList")

list.innerHTML=""

foods.forEach(food=>{

let li=document.createElement("li")

li.innerText = food.name + " - " + food.calories + " kcal"

list.appendChild(li)

})

updateCalories()

}

function renderWorkouts(){

let list=document.getElementById("workoutList")

list.innerHTML=""

workouts.forEach(workout=>{

let li=document.createElement("li")

li.innerText = workout.exercise + " | " + workout.sets + " sets x " + workout.reps + " reps"

list.appendChild(li)

})

}

function addFood(){

let food={

name:document.getElementById("foodName").value,

calories:document.getElementById("foodCalories").value

}

foods.push(food)

localStorage.setItem("foods",JSON.stringify(foods))

renderFoods()

}

function addWorkout(){

let workout={

exercise:document.getElementById("exerciseName").value,

sets:document.getElementById("sets").value,

reps:document.getElementById("reps").value

}

workouts.push(workout)

localStorage.setItem("workouts",JSON.stringify(workouts))

renderWorkouts()

}

renderFoods()

renderWorkouts()
