"use client"
import React, { useState} from 'react';
import Modal from './modal';



const ContactForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({ name: '', email: '', message: '' });
  const [open, setOpen] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const { name, email, message } = formData;
    const newErrors= { name: '', email: '', message: '' };

    if (!name.trim()) {
      newErrors.name = 'Name is required';
    } else if (name.trim().length < 3 || name.trim().length > 32) {
      newErrors.name = 'Name must be between 3 and 32 characters';
    } else if (!/^[A-Za-z ]+$/.test(name.trim())) {
      newErrors.name = 'Name can only contain letters and spaces';
    }

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(email.trim())) {
      newErrors.email = 'Email is invalid';
    }

    if (!message.trim()) {
      newErrors.message = 'Message is required';
    } else if (message.trim().length < 3 || message.trim().length > 80) {
      newErrors.message = 'Message must be between 3 and 80 characters';
    }

    setErrors(newErrors);

    return !Object.values(newErrors).some(error => error);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setOpen(true);
    }
  };

  const handleModalClose = () => {
    setFormData({ name: '', email: '', message: '' });
    setOpen(false);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleInputChange}
            className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm ${
              errors.name ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleInputChange}
            className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700">
            Message
          </label>
          <textarea
            name="message"
            id="message"
            value={formData.message}
            onChange={handleInputChange}
            className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm ${
              errors.message ? 'border-red-500' : 'border-gray-300'
            }`}
            rows={4}
          ></textarea>
          <div className="text-xs text-gray-500 text-right mt-1">{`${formData.message.length}/80`}</div>
          {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Submit
        </button>
      </form>

      {open && (
        <Modal onClose={handleModalClose}>
          <h3 className="text-lg font-semibold">Form Submitted Successfully</h3>
          <p className="mt-2">
            <strong>Name:</strong> {formData.name.trim()}
          </p>
          <p>
            <strong>Email:</strong> {formData.email.trim()}
          </p>
          <p>
            <strong>Message:</strong> {formData.message.trim()}
          </p>
          <button
            onClick={handleModalClose}
            className="mt-4 py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            OK
          </button>
        </Modal>
      )}
    </div>
  );
};

export default ContactForm;
