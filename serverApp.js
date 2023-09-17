const express = require("express")
const mongoose = require("mongoose")
const path = require("path")
require('dotenv').config()

const PORT = process.env.PORT || 5000

const app = express()

app.use(express.urlencoded({extended : true}))

app.use(express.static(path.join(__dirname + "public")))

app.get("/", (req,res) => {
    res.send("<h1> This is your express app</h1>")
})
app.get("/register", (req, res) => {
    res.sendFile( path.join(__dirname, "public", "index.html"))
})

mongoose.connect("mongodb://localhost:27017/newUser")
        .then(console.log("The database is connected"))

app.post("/api/Register", (req,res) => {
    const nam = req.body.name;
    const emai = req.body.email;
    const passwor = req.body.password;

    const schema = mongoose.Schema({
        name : {type : String, required : true},
        email : {type : String, required : true},
        password : {type : String}
    })

    const userModel4 = mongoose.model("registeredUser", schema)

    const data = userModel4({
        name : nam,
        email : emai,
        password : passwor
    })

    data.save()
             .then((res) => console.log("User is registered"))
             .catch((err) => console.log("Regeisteration failed"))
    res.send(`<h1> Welcome ${nam}, you are now registered</h1> `)


})

app.listen (PORT, () => {
    console.log("express server in live now at port: " + PORT) 
})