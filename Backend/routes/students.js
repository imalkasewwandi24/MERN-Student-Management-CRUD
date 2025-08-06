const router = require("express").Router();
let Student = require("../models/student");


//Insert route in type 1
router.route("/add").post((req,res) =>{
    const name = req.body.name;
    const age = Number(req.body.age);
    const gender = req.body.gender;

    const newStudent = new Student({
        name,
        age,
        gender
    })

    newStudent.save().then(() =>{
        res.json("Student Added")
    }).catch((err) => {
        console.log(err);
    })
})


//Fetch route
router.route("/").get((req,res) =>{
    Student.find().then((Student) =>{
        res.json(Student)
    }).catch((err) =>{
        console.log(err)
    })
})


//Update route in type 2 (Using async/await)
router.route("/update/:id").put(async(req,res) =>{
    let userId = req.params.id;

    const {name,age,gender} = req.body;

    const updateStudent = {
        name,
        age,
        gender
    }

    const update = await Student.findByIdAndUpdate(userId , updateStudent)
    .then(() => {
        res.status(200).send({status: "User Updated"})
    }).catch((err) =>{
        console.log(err);
    })
})


//Delete route 
router.route("/delete/:id").delete(async(req,res) =>{
    let userId = req.params.id;

    await Student.findByIdAndDelete(userId)
    .then(()=>{
        res.status(200).send({status: "User Deleted"});
    }).catch((err) =>{
        console.log(err.message);
        res.status(500).send({status : "Error with delete user", error:err.message});
    })
})

//Fetch Only One user details 
router.route("/get/:id").get(async(req,res) =>{
    let userId = req.params.id;

    const user = await Student.findById(userId).then((Student) =>{
        res.status(200).send({status : "User fetched" , Student})
    }).catch((err) =>{
        console.log(err);
    })
})
   


module.exports = router;