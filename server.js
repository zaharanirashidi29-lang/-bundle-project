const express = require("express")
const cors = require("cors")
const { createClient } = require("@supabase/supabase-js")

const app = express()

app.use(cors())
app.use(express.json())

// SERVE FRONTEND
app.use(express.static("public"))

// SUPABASE CONNECTION
const supabase = createClient(
  "https://tngegsxejzalvhejppid.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRuZ2Vnc3hlanphbHZoZWpwcGlkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI4Mzc4NjYsImV4cCI6MjA4ODQxMzg2Nn0.8d5mEk12eEWFhs7-cEOJFIBR2aK0pYu_PzE0Z8yiHY"
)

// TEST ROUTE
app.get("/test",(req,res)=>{
  res.send("Server is running")
})

// RECEIVE FORM DATA
app.post("/submit", async (req,res)=>{

  try{

    const { phone,email,password } = req.body

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

// GET USERS
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

// START SERVER
const PORT = process.env.PORT || 3000

app.listen(PORT,()=>{
  console.log("Server running on port",PORT)
})