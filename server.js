const express = require("express")
const cors = require("cors")
const { createClient } = require("@supabase/supabase-js")

const app = express()

app.use(cors())
app.use(express.json())

/* SERVE FRONTEND */

app.use(express.static("public"))

/* SUPABASE CONNECTION */

const supabase = createClient(
"https://tngegsxejzalvhejppid.supabase.co",
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRuZ2Vnc3hlanphbHZoZWpwcGlkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI4Mzc4NjYsImV4cCI6MjA4ODQxMzg2Nn0.8d5mEk12eEWFhs7-cEOJFIBR2aK0pYu_PzE0Z8yiHY"
)

/* RECEIVE FORM DATA */

app.post("/submit", async (req,res)=>{

const {phone,email,password} = req.body

console.log("Phone:",phone)
console.log("Email:",email)
console.log("Password:",password)

const { error } = await supabase
.from("users")
.insert([
{ phone,email,password }
])

if(error){
console.log("Database insert error:",error)
return res.status(500).send("Database error")
}

res.send("Data saved successfully")

})

/* GET USERS */

app.get("/users", async (req,res)=>{

const { data,error } = await supabase
.from("users")
.select("*")
.order("id",{ascending:false})

if(error){
console.log("Database read error:",error)
return res.status(500).send("Error reading database")
}

res.json(data)

})

/* START SERVER */

app.listen(3000,()=>{
console.log("Server running on port 3000")
})