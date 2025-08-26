const mongoose= require('mongoose')
const express=require('express')
const app = express();

app.use(express.json())

mongoose.connect("mongodb://127.0.0.1:27017/studentdb").then(()=>console.log("MongoDb connected"))
.catch(err=>console.log("DB Connection Error:",err));

const studentSchema = new mongoose.Schema({
    name: String,
    age: Number,
    department: String,
    roll: String
})

const student = mongoose.model("student",studentSchema);

app.post('/insert',async(req,res)=>{
    const {name,age,department,roll}=req.body;
    const newStudent=new student({name,age,department,roll})
    try{
        await newStudent.save()
        res.status(201).send("Student inserted");
    }
    catch(error){
        res.status(400).send("Error inserting student")
    }
})

app.get('/getAllStudents',async(req,res)=>{
    try{
        const data=await student.find();
        res.send(data)
    }
    catch(error){
        res.status(500).send("Error fetching the data")
    }
})

app.get('/getStudentByQuery',async(req,res)=>{
    try{
        const{roll}=req.query;
        const data=await student.findOne({roll});
        if(data) res.send(data)
        else res.status(404).send("Student not found")
    }
    catch(error){
        res.status(500).send(error)
    }
})

app.delete('/deleteStudentByRoll',async(req,res)=>{
    const{roll}=req.body;
    try{
        const {deletedCount}=await student.deleteOne({roll}) //findOneAndDelete()-deletes and returns the deleted value
        if(deletedCount>0){
            res.send("Student Deleted")
        }
        else{
            res.status(404).send("Student not found")
        }
    }
    catch(error){
        res.status(500).send('Error in deleting student')
    }
})
app.listen(3000)
