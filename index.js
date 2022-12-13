const express = require('express')

const mongoose = require("mongoose")
const studentModel = require("./models/studentUsers")

mongoose.connect("mongodb://127.0.0.1/userDBMongoose")
const bodyParser = require("body-parser");


const app = express()

const port = 8080

// Parse JSON bodies (as sent by API clients)
app.use(bodyParser.json())
// your code goes here


// 1. get all  the users

        app.get("/api/student" , async (req,res)=> {

            try{
                const user = await studentModel.find()
                res.json({
                    status:"Success",
                    users: user
                })
            }
            catch(e){
                res.status(404).json({
                    status: "Failed",
                    message: e.message
                })
            }
            
        })



// 2. get the particular user using id

        app.get("/api/student/:id", async (req, res) => {

            try {
                const user = await studentModel.find({id : req.params.id})
                console.log(user);
                if(!user.length){
                    res.status(404).json({
                        status: "Failed",
                        message: "Invalid Id"
                    })
                }
                res.json({
                    status: "Success",
                    users: user
                })
            }
            catch (e) {
                res.status(404).json({
                    status: "Failed",
                    message: e.message
                })
            }

        })



// 3. create  data
        app.post("/api/student", async (req, res) => {

            try {
            
                //console.log(req.body);
                const user = await studentModel.create(req.body)

                res.json({
                    status: "Success",
                    new_userID: user.id
                })
                res.setHeader({'content-type':'application/x-www-form-urlencoded'})

            }
            catch (e) {
                res.status(400).json({
                    status: "Failed",
                    message: e.message
                })
            }

        })


// 4. update data

            app.put("/api/student/:id", async (req, res) => {

                try {

                    let user = await studentModel.find({id: req.params.id})
                    
                    if(!user.length){
                        res.status(400).json({
                            status: "Failed",
                            message: "Invalid Id"
                        })
                    
                    }
                    else{
                        user = await studentModel.updateMany({id: req.params.id} , {$set : {name: req.body.name}})

                        res.json({
                            status: "Success",
                            user: user
                        })
                        res.setHeader({'content-type':'application/x-www-form-urlencoded'})

                    
                    }
                    
                }
                catch (e) {
                    res.status(400).json({
                        status: "Failed",
                        message: e.message
                    })
                }

            })


// 5. Delete data

            app.delete("/api/student/:id", async (req, res) => {

                try {

                    let user = await studentModel.find({ id: req.params.id })

                    if (!user.length) {
                        res.status(400).json({
                            status: "Failed",
                            message: "Invalid Id"
                        })
                        

                    }
                    else {
                        user = await studentModel.deleteOne({id: req.params.id})

                        res.json({
                            status: "Success",
                            user: user
                        })
                    }

                }
                catch (e) {
                    res.status(400).json({
                        status: "Failed",
                        message: e.message
                    })
                }

            })

            

app.get("*" , (req , res)=> {
    res.send("API NOT FOUND")
})

app.listen(port, () => console.log(`App listening on port ${port}!`))

//module.exports = app;   