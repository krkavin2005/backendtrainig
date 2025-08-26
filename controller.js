let data = []
function insertData(req, res) {
    console.log("[INFO] Entered into insert Data")
    if (checkIfPresent(req.body.roll)) {
        console.log("[INFO] Duplicate Record found")
        res.send("Data Exists")
    }
    else {
        console.log("[INFO] No duplicates found")
        data.push(req.body)
        console.log("[SUCCESS] Data Inserted Successfully")
        res.send("Data Inserted")
    }
}

function checkIfPresent(roll){
    for(let i of data){
        if(i.roll==roll){
            return true
        }
    }
    return false
}

function getDataById(req,res){
    console.log("[INFO] Entered into getDataById function")
    const roll=req.body.roll
    const student=data.find(s=>s.roll==roll)
    if(student){
        console.log("[SUCCESS] Student fount")
        res.status(200).send(student)
    }
    else {
        console.log("[ERROR] Student not found")
        res.status(404).send("student not found")
    }
}

function deleteDataById(req,res){
    console.log("[INFO] Entered into deletDataById")
    const roll=req.body.roll
    const index=data.findIndex(s=>s.roll==roll)
    if(index!=-1){
        console.log("[SUCCESS] Student deleted")
        data.splice(index,1)
        res.send("Data Deleted")
    }
    else {
        console.log("[ERROR] Student not found")
        res.status(404).send("student not found")
    }
}

function editData(req,res){
    const index=data.findIndex(s=>s.roll==req.body.roll)
    if(index==-1){
        console.log("[ERROR] Student not found");
        res.status(404).send("Student not found")
    }
    else{
        data[index]=req.body
        console.log("[SUCCESS] Edited successfully");
        res.send("Edited successfully")
    }
}

module.exports={deleteDataById,insertData,getDataById,editData}