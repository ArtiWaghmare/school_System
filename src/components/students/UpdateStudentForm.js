
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateStudentForm = ({ studentId, onStudentUpdated, onCancel }) => {
  const [student, setStudent] = useState({
    name: '',
    age: '',
    grade: '',
    email: '',
    course: ''
  });

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/students/${studentId}`);
        setStudent(response.data);
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };

    fetchStudent();
  }, [studentId]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setStudent({ ...student, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`http://localhost:8000/students/${studentId}`, student);
      onStudentUpdated(student);
    } catch (error) {
      console.error("Error updating student:", error);
    }
  };

  return (
    <div className="card mt-3">
      <h2 className='text-h1'>Update Student</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={student.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Age</label>
          <input
            type="number"
            className="form-control"
            name="age"
            value={student.age}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Grade</label>
          <input
            type="text"
            className="form-control"
            name="grade"
            value={student.grade}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={student.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Course</label>
          <input
            type="text"
            className="form-control"
            name="course"
            value={student.course}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-success mr-2">Update</button>
        <button type="button" className="btn btn-danger" onClick={() => onCancel()}>Cancel</button>
      </form>
    </div>
  );
};

export default UpdateStudentForm;
