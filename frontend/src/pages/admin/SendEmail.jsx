import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { useParams, useLocation } from 'react-router-dom';
import AdminLayout from './AdminLayout';


const SendEmail = () => {
  const { email } = useParams(); 
  const location = useLocation();
  const [message, setMessage] = useState("");
 const [name, setName] = useState(location.state?.recipientName || '');


  const handleSend = (e) => {
    e.preventDefault();

    const templateParams = {
      to_email: email,
      to_name: name,
      message: message,
    };

    emailjs.send(
      'service_8py5ulb',      
      'template_4mn3hss',      
      templateParams,
      'K7eguUXZvchd526L1'      
    )
      .then((res) => {
        alert('Email sent successfully!');
        setMessage('');
        setName('');
      })
      .catch((err) => {
        console.error(err);
        alert('Failed to send email.');
      });
  };

  return (
    <AdminLayout>
    <div style={styles.container}>
      <h2 style={styles.heading}>Send Email to: <span style={{ color: '#1976d2' }}>{email}</span></h2>

      <form onSubmit={handleSend} style={styles.form}>
        <label style={styles.label}>Recipient Name</label>
        <input
  type="text"
  value={name}
  readOnly
  style={styles.input}
/>


        <label style={styles.label}>Message</label>
        <textarea
          rows="5"
          placeholder="Write your reply..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          style={styles.textarea}
        />

        <button type="submit" style={styles.button}>Send Email</button>
      </form>
    </div>
  
    </AdminLayout>);
};


const styles = {
  container: {
    maxWidth: '600px',
    margin: '40px auto',
    padding: '30px',
    backgroundColor: '#f9f9f9',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
    fontFamily: 'Arial, sans-serif',
  },
  heading: {
    marginBottom: '25px',
    fontSize: '22px',
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  label: {
    fontSize: '16px',
    fontWeight: 'bold',
  },
  input: {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '16px',
  },
  textarea: {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '16px',
    resize: 'vertical',
  },
  button: {
    backgroundColor: '#1976d2',
    color: 'white',
    padding: '12px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s ease',
  }
};

export default SendEmail;
