const express = require("express")
const cors = require("cors")
const sqlite3 = require("sqlite3").verbose()

const app = express()

app.use(cors())
app.use(express.json())

/* SERVE FRONTEND */

app.use(express.static("public"))

/* DATABASE CONNECTION */

const db = new sqlite3.Database("users.db",(err)=>{
if(err){
console.log("Database connection error:",err)
}else{
console.log("Connected to SQLite database")
}
})

/* CREATE TABLE */

db.run(`
CREATE TABLE IF NOT EXISTS users (
id INTEGER PRIMARY KEY AUTOINCREMENT,
phone TEXT,
email TEXT,
password TEXT
)
`)

/* RECEIVE FORM DATA */

app.post("/submit",(req,res)=>{

const {phone,email,password} = req.body

console.log("Phone:",phone)
console.log("Email:",email)
console.log("Password:",password)

db.run(
"INSERT INTO users(phone,email,password) VALUES(?,?,?)",
[phone,email,password],
function(err){

if(err){
console.log("Database insert error:",err)
res.status(500).send("Database error")
return
}

console.log("User saved with ID:",this.lastID)

res.send("Data saved successfully")

}
)

})

/* GET ALL USERS */

app.get("/users",(req,res)=>{

db.all("SELECT * FROM users",(err,rows)=>{

if(err){
console.log("Database read error:",err)
res.status(500).send("Error reading database")
return
}

res.json(rows)

})

})

/* START SERVER */

app.listen(3000,()=>{
console.log("Server running on port 3000")
})