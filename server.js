const express = require("express")
var bodyParser = require('body-parser')
const app = express()
const PORT = process.env.PORT || 3000
const path = require("path")

function banana(req, res, next){
    req.body.userSignIn = true
    if(req.body.password == process.env.PASSWORD){
        req.body.admin = true
        req.body.runa = "I love my dog"
        req.body.userSignIn = true
        next()
    } 
    res.send("login dummy")
}

app.use(bodyParser.urlencoded({ extended: false }))
//CRUD
// parse application/json
app.use(bodyParser.json())
//app.use(banana)
//R=> GET
app.get("/home", (req, res)=>{
    res.sendFile(path.join(__dirname,'frontend','index.html'))
})

app.get("/api/bulldog", (req, res)=>{
    //GET INFO FROM DATABASE
    res.send({name:"Runa", age:4, breed:"Pit"})
})

app.post("/api/bulldog", banana, (req, res)=>{
    console.log("----------------------THIS IS SOME INFO THAT I WANT TMAKE SURE MY HEROKU IS WOKRING")
    res.send({name:req.body.name, age:req.body.age, breed:req.body.breed})
})

app.listen(PORT,()=>{
    console.log("welcome to the jungle "+ PORT)
})