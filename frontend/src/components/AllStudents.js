import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AllStudents() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = () => {
    axios
      .get("http://localhost:8070/student/")
      .then((res) => {
        setStudents(res.data);
        setLoading(false);
      })
      .catch((err) => {
        alert("Failed to fetch students: " + err.message);
        setLoading(false);
      });
  };

  const deleteStudent = (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      axios
        .delete(`http://localhost:8070/student/delete/${id}`)
        .then(() => {
          alert("Student deleted successfully");
          fetchStudents(); // refresh list after delete
        })
        .catch((err) => {
          alert("Failed to delete student: " + err.message);
        });
    }
  };

  const goToUpdate = (id) => {
    navigate(`/update/${id}`);
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">All Students</h2>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th>Index</th>
              <th>Name</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Actions</th> {/* New column */}
            </tr>
          </thead>
          <tbody>
            {students.length > 0 ? (
              students.map((student, index) => (
                <tr key={student._id}>
                  <td>{index + 1}</td>
                  <td>{student.name}</td>
                  <td>{student.age}</td>
                  <td>{student.gender}</td>
                  <td
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    <button
                      className="btn btn-outline-success"
                      onClick={() => goToUpdate(student._id)}
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteStudent(student._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">
                  No students found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
