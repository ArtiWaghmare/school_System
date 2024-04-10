
import React, { useState } from 'react';
import axios from 'axios';
import "./Form.css";

const CreateStudentForm = ({ onStudentCreated, onCancel }) => {
  const [newStudent, setNewStudent] = useState({
    name: '',
    age: '',
    grade: '',
    email: '',
    course: ''
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewStudent({ ...newStudent, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/students', newStudent);
      const createdStudent = response.data;
      onStudentCreated(createdStudent); 
      setNewStudent({ name: '', age: '', grade: '', email: '', course: '' });
    } catch (error) {
      console.error("Error creating student:", error);
    }
  };

  return (
    <div className="card mt-3">
      <h2 className='text-h1'>Create Student</h2>
      <form onSubmit={handleSubmit}>
           <div className="mb-3">
         <label className="form-label">Name</label>
        <input
            type="text"
            className="form-control"
            name="name"
            value={newStudent.name}
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
            value={newStudent.age}
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
            value={newStudent.grade}
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
            value={newStudent.email}
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
            value={newStudent.course}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-success mr-2">Submit</button>
        <button type="button" className="btn btn-danger" onClick={onCancel}>Cancel</button>
      </form>
    </div>
  );
};

export default CreateStudentForm;
