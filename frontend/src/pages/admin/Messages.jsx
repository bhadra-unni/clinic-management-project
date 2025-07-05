import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Button,
} from '@mui/material';
import AdminLayout from './AdminLayout';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await axios.get('http://localhost:3000/messages/all');
      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

 const handleDelete = async (id) => {
  const confirmDelete = window.confirm('Are you sure you want to delete this message?');
  if (!confirmDelete) return;

  try {
    await axios.delete(`http://localhost:3000/messages/${id}`);
    setMessages((prev) => prev.filter((msg) => msg._id !== id));
  } catch (error) {
    console.error('Error deleting message:', error);
  }
};


  return (
    <AdminLayout>
      <Box sx={{ maxWidth: '95%', mx: 'auto', mt: 3 }}>
        <Typography variant="h5" gutterBottom>
          Patient Messages / Enquiries
        </Typography>

        <Paper sx={{ overflowX: 'auto' }}>
          <Table>
            <TableHead sx={{ backgroundColor: '#1976d2' }}>
              <TableRow>
                <TableCell sx={{ color: 'white' }}>Name</TableCell>
                <TableCell sx={{ color: 'white' }}>Email</TableCell>
                <TableCell sx={{ color: 'white' }}>Message</TableCell>
                <TableCell sx={{ color: 'white' }}>Reply</TableCell>
                <TableCell sx={{ color: 'white' }}>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {messages.length > 0 ? (
                messages.map((msg, index) => (
                  <TableRow key={index}>
                    <TableCell>{msg.name}</TableCell>
                    <TableCell>{msg.email}</TableCell>
                    <TableCell>{msg.message}</TableCell>
                    <TableCell>
                      <Button
                        variant='contained'
                        color='primary'
                        onClick={() => navigate(`/admin/send-email/${msg.email}`)}
                      >
                        Reply
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant='contained'
                        color='error'
                        onClick={() => handleDelete(msg._id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    No messages found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Paper>
      </Box>
    </AdminLayout>
  );
};

export default Messages;
