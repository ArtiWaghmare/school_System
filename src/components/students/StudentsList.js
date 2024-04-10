
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';
import "./List.css";
import NavBar from '../layout/NavBar';
import CreateStudentForm from './CreateStudentForm';
import UpdateStudentForm from './UpdateStudentForm';

const StudentsList = () => {
  const [students, setStudents] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingStudentId, setEditingStudentId] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://localhost:8000/students');
      setStudents(response.data);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  const handleAddStudentClick = () => {
    setShowCreateForm(true);
  };

  const handleCancelClick = () => {
    setShowCreateForm(false);
    setEditingStudentId(null);
  };

  const handleStudentCreated = (newStudent) => {
    setStudents([...students, newStudent]);
    setShowCreateForm(false);
  };

  const handleEditClick = (studentId) => {
    setEditingStudentId(studentId);
  };

  const handleStudentUpdated = (updatedStudent) => {
    const updatedStudents = students.map(student =>
      student.id === updatedStudent.id ? updatedStudent : student
    );
    setStudents(updatedStudents);
    setEditingStudentId(null);
  };

  const handleDeleteClick = async (studentId) => {
    try {
      await axios.delete(`http://localhost:8000/students/${studentId}`);
      setStudents(students.filter(student => student.id !== studentId));
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  return (
    <>
      <NavBar />
      <div className="container-fluid mt-3">
        {showCreateForm ? (
          <CreateStudentForm onStudentCreated={handleStudentCreated} onCancel={handleCancelClick} />
        ) : editingStudentId ? (
          <UpdateStudentForm
            studentId={editingStudentId}
            onStudentUpdated={handleStudentUpdated}
            onCancel={handleCancelClick}
          />
        ) : (
          <>
            <div className="d-flex justify-content-between mb-2">
              <h2>Students List</h2>
              <Button variant="success" onClick={handleAddStudentClick}>Add Student</Button>
            </div>
            <Table striped bordered hover>
              <thead>
                <tr>
                 
                  <th>Name</th>
                  <th>Age</th>
                  <th>Grade</th>
                  <th>Email</th>
                  <th>Course</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.map(student => (
                  <tr key={student.id}>
                   
                    <td>{student.name}</td>
                    <td>{student.age}</td>
                    <td>{student.grade}</td>
                    <td>{student.email}</td>
                    <td>{student.course}</td>
                    <td>
                      <Button variant="success" onClick={() => handleEditClick(student.id)}>Edit</Button>{' '}
                      <Button variant="danger" onClick={() => handleDeleteClick(student.id)}>Delete</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </>
        )}
      </div>
    </>
  );
};

export default StudentsList;
