const express = require("express")
const cors = require("cors")
const { createClient } = require("@supabase/supabase-js")

const app = express()

app.use(cors())
app.use(express.json())

/* SERVE FRONTEND */

app.use(express.static("public"))

/* SUPABASE CONNECTION */

const SUPABASE_URL = "https://tngegsxejzalvhejppid.supabase.co"
const SUPABASE_KEY = "sb_publishable_PI6TWlFH9YgC3x9mnsW9sA_L_GWD2Xe"

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

/* TEST ROUTE */

app.get("/test",(req,res)=>{
res.send("Server is running")
})

/* RECEIVE FORM DATA */

app.post("/submit", async (req,res)=>{

try{

const { phone,email,password } = req.body

if(!phone || !email || !password){
return res.status(400).json({ error:"Missing fields" })
}

console.log("Phone:",phone)
console.log("Email:",email)
console.log("Password:",password)

const { data,error } = await supabase
.from("users")
.insert([{ phone,email,password }])

if(error){
console.log("Insert error:",error)
return res.status(500).json({ error:error.message })
}

res.json({ message:"Data saved successfully", data })

}catch(err){

console.log("Server error:",err)
res.status(500).json({ error:"Server failure" })

}

})

/* GET USERS */

app.get("/users", async (req,res)=>{

try{

const { data,error } = await supabase
.from("users")
.select("*")
.order("id",{ ascending:false })

if(error){
console.log("Read error:",error)
return res.status(500).json({ error:error.message })
}

res.json(data)

}catch(err){

console.log("Server error:",err)
res.status(500).json({ error:"Server failure" })

}

})

/* START SERVER */

const PORT = process.env.PORT || 3000

app.listen(PORT,()=>{
console.log("Server running on port",PORT)
})