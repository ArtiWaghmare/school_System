

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditStudentForm = ({ studentId, onStudentUpdated, onCancel }) => {
  const [student, setStudent] = useState({
    name: '',
    age: '',
    grade: '',
    email: '',
    course: '',
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

    if (studentId) {
      fetchStudent();
    }
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
    
        <button type="submit" className="btn btn-primary mr-2">Update</button>
        <button type="button" className="btn btn-danger" onClick={() => onCancel()}>Cancel</button>
      </form>
    </div>
  );
};

export default EditStudentForm;
