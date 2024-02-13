const bodyParser = require('body-parser')
const express = require('express')
const mongoose = require('mongoose')

const {Restaurants} = require('./Schema.cjs')

const app = express()
app.use(bodyParser.json())
const connectTODb =  async function connectTODb(){
    try{
        await mongoose.connect('mongodb+srv://giriprasath:giri78@cluster0.dmts8ll.mongodb.net/swigey?retryWrites=true&w=majority')
        const port = 8002
        app.listen (port,function(){
            console.log(`Have a great Day ${port}`)
        })
    }catch(error){
        console.log(error)
    }
}
connectTODb()

app.post('/add-restaurents', async function(request,res){
    try{
        await Restaurants.create({
            "areaName" : request.body.areaName,
            "avgRating" : request.body.avgRating,
            "cuisines" : request.body.cuisines,
            "costForTwo" : request.body.costForTwo,
            "name" : request.body.name
        })
        res.json({"status":"success"})

    }catch (error){
        console.log(error)
    }
})

app.get('/get-restaurents-details',async function(request,response){
    try{
        const resdetails=await Restaurants.find()
        response.status(200).json(resdetails)
    }
    catch(error)
    {
        console.log("Error")
    }
})