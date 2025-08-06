import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function UpdateStudent() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [student, setStudent] = useState({
    name: "",
    age: "",
    gender: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:8070/student/get/${id}`)
      .then((res) => {
        const fetchedStudent = res.data.Student;
        setStudent({
          name: fetchedStudent.name,
          age: fetchedStudent.age,
          gender: fetchedStudent.gender,
        });
        setLoading(false);
      })
      .catch((err) => {
        alert("Failed to fetch student: " + err.message);
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put(`http://localhost:8070/student/update/${id}`, student)
      .then(() => {
        alert("Student updated successfully");
        navigate("/all"); // redirect to list after update
      })
      .catch((err) => {
        alert("Failed to update student: " + err.message);
      });
  };

  if (loading) return <div>Loading student data...</div>;

  return (
    <div className="container mt-4">
      <h2>Update Student</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name:</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={student.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Age:</label>
          <input
            type="number"
            name="age"
            className="form-control"
            value={student.age}
            onChange={handleChange}
            required
            min="1"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Gender:</label>
          <select
            name="gender"
            className="form-select"
            value={student.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary">
          Update
        </button>
      </form>
    </div>
  );
}
