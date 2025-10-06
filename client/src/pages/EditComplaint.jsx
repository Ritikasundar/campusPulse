import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axiosConfig';

const EditComplaint = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [complaint, setComplaint] = useState({});

  // Fetch complaint details
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

  // Handle form field changes dynamically
  const handleChange = (e) => {
    const { name, value } = e.target;
    setComplaint(prev => ({ ...prev, [name]: value }));
  };

  // Submit updated complaint
  const handleSubmit = (e) => {
    e.preventDefault();
    api.put(`/complaints/${id}`, complaint)
      .then(res => {
        alert('Complaint updated successfully');
        navigate('/');
      })
      .catch(err => {
        console.error(err);
        alert('Failed to update complaint');
      });
  };

  // Render form fields dynamically based on object keys
  const renderFields = () => {
    return Object.keys(complaint).map(key => {
      if (['_id', '__v', 'createdAt', 'updatedAt'].includes(key)) return null;
      if (key === 'description') {
        return (
          <div key={key} style={{ marginBottom: '10px' }}>
            <label>{key}:</label>
            <textarea
              name={key}
              value={complaint[key]}
              onChange={handleChange}
              required
              style={{ width: '100%', height: '80px' }}
            />
          </div>
        );
      }
      return (
        <div key={key} style={{ marginBottom: '10px' }}>
          <label>{key}:</label>
          <input
            name={key}
            value={complaint[key]}
            onChange={handleChange}
            required
            style={{ width: '100%' }}
          />
        </div>
      );
    });
  };

  return (
    <div>
      <h2>Edit Complaint</h2>
      <form onSubmit={handleSubmit}>
        {renderFields()}
        <button type="submit">Update Complaint</button>
      </form>
    </div>
  );
};

export default EditComplaint;
