import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axiosConfig';

const EditComplaint = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [complaint, setComplaint] = useState({ title: '', description: '' });

  useEffect(() => {
    api.get(`/complaints/${id}`)
      .then(res => setComplaint(res.data))
      .catch(err => {
        console.error(err);
        if (err.response && err.response.status === 404) {
          alert('Complaint not found');
          navigate('/');
        }
      });
  }, [id, navigate]);

  const handleChange = (e) => {
    setComplaint({ ...complaint, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    api.put(`/complaints/${id}`, complaint)
      .then(res => {
        alert('Complaint updated successfully');
        navigate('/');
      })
      .catch(err => console.error(err));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="title" value={complaint.title} onChange={handleChange} required />
      <textarea name="description" value={complaint.description} onChange={handleChange} required />
      <button type="submit">Update Complaint</button>
    </form>
  );
};

export default EditComplaint;
