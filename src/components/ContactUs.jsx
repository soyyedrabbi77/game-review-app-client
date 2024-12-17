import React, { useState } from "react";
import Swal from "sweetalert2"; // Import SweetAlert2
import "./ContactUs.css"; // Assuming you'll create a separate CSS file

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple form validation
    if (!formData.name || !formData.email || !formData.message) {
      // Show SweetAlert with a custom message if the fields are empty
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill out all fields.",
        confirmButtonText: "Okay",
      });
      return;
    }

    // Simulate form submission (you can replace this with an actual API call)
    console.log("Form Submitted:", formData);
    setStatus("Thank you for reaching out! We will get back to you soon.");

    // Reset form
    setFormData({
      name: "",
      email: "",
      message: "",
    });

    // Show success SweetAlert
    Swal.fire({
      icon: "success",
      title: "Message Sent",
      text: "Thank you for reaching out! We will get back to you soon.",
      confirmButtonText: "Close",
    });
  };

  return (
    <div className="contact-us">
      <h2 className="contact-us-title">Contact Us</h2>
      <p className="contact-us-description">
        Have any questions or suggestions? We’d love to hear from you!
      </p>

      <form onSubmit={handleSubmit} className="contact-us-form">
        <label htmlFor="name" className="contact-us-label">
          Your Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="contact-us-input"
        />

        <label htmlFor="email" className="contact-us-label">
          Your Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="contact-us-input"
        />

        <label htmlFor="message" className="contact-us-label">
          Your Message
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          className="contact-us-textarea"
        ></textarea>

        <button type="submit" className="contact-us-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ContactUs;
