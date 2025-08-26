const express = require('express')
const controller = require('./controller')
const app = express()

app.use(express.json()) //Middleware to convert request to JSON
app.post('/insert', controller.insertData)
app.get('/getAllStudents',(req,res)=>{
    console.log("[INFO] Entered into Get All Students")
    res.send(data)
})
app.get('/getStudentById',controller.getDataById)
app.delete('/deleteStudentById',controller.deleteDataById)
app.put('/editStudent',controller.editData)
app.get('/paramscheck/:id',(req,res)=>{
    console.log(req.params.id);
    res.send("Params Checked")
})
app.get('/querycheck',(req,res)=>{
    console.log(req.query)
    res.send("Query params checked")
})
app.listen(3000)