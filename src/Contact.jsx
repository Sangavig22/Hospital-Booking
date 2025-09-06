import React, { useState } from "react";
import "./contact.module.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 2500);
    console.log("Form Submitted:", formData);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="contact-wrapper">
      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder=" "
          />
          <label>Name</label>
        </div>
        <div className="input-group">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder=" "
          />
          <label>Email</label>
        </div>
        <div className="input-group">
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            placeholder=" "
          />
          <label>Message</label>
        </div>
        <button type="submit">Send</button>
        {submitted && <span className="success-msg">Sent!</span>}
      </form>
    </div>
  );
};

export default Contact;
