import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const Dashboard = () => {
  const { user, dispatch } = useContext(AuthContext);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const res = await axios.get('/api/courses', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setCourses(res.data);
    };
    fetchCourses();
  }, [user]);

  return (
    <div>
      <h1>Dashboard</h1>
      <h2>Courses</h2>
      <ul>
        {courses.map((course) => (
          <li key={course._id}>
            {course.title} - {course.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
