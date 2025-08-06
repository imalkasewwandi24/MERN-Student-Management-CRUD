import React, {useState} from "react";
import axios from "axios";


export default function AddStudent(){

  const[name, setName] = useState("");
  const[age, setAge] = useState("");
  const[gender, setGender] = useState("");

  function sendData(e){
    e.preventDefault();
    const newStudent = { name, age, gender };
    axios.post("http://localhost:8070/student/add", newStudent)
      .then(() => {
        alert("Student Added Successfully");
        setName("");
        setAge("");
        setGender("");
      })
      .catch((err) => {
        alert("Error: " + err.message);
      });
  }

  return(
    <div className="container mt-5">
      <form onSubmit={sendData}>
  <div class="mb-3">

    <label for="name" class="form-label">Student Name</label>
    <input type="text" class="form-control" id="name" placeholder="Enter your Name" aria-describedby="emailHelp" onChange={(e) => setName(e.target.value)} />

  </div>
  <div className="mb-3">
    <label for="age" className="form-label">Student Age</label>
    <input type="number" className="form-control" id="age" placeholder="Enter your Age" onChange={(e) => setAge(e.target.value)} />
  </div>
  <div className="mb-3">
    <label for="gender" className="form-label">Student Gender</label>
    <input type="text" className="form-control" id="gender" placeholder="Enter your Gender" onChange={(e) => setGender(e.target.value)} />
  </div>

  <button type="submit" className="btn btn-dark">Submit</button>
</form>
    </div>
  )

}
