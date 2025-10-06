import React, { useState } from 'react';

const ComplaintForm = ({ initial = {}, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: initial.title || '',
    description: initial.description || '',
    location: initial.location || '',
    reporterName: initial.reporterName || '',
    priority: initial.priority || 'low',
    status: initial.status || 'open'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <label>
        Title
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Description
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </label>

      <label>
        Location
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
        />
      </label>

      <label>
        Your Name
        <input
          type="text"
          name="reporterName"
          value={formData.reporterName}
          onChange={handleChange}
        />
      </label>

      <label>
        Priority
        <select name="priority" value={formData.priority} onChange={handleChange}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </label>

      <label>
        Status
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="open">Open</option>
          <option value="in-progress">In-Progress</option>
          <option value="resolved">Resolved</option>
        </select>
      </label>

      <button type="submit">Submit</button>
    </form>
  );
};

export default ComplaintForm;
