import React, { useState, useEffect } from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Modal, Box } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../constants/DefaultValues';

function AdminDashboard() {
  const [kycData, setKycData] = useState([]);
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false);
  const [documentUrl, setDocumentUrl] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchKycData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Please log in first');
        return;
      }

      try {
        const response = await axios.get(BASE_URL + 'api/admin/kyc', {
          headers: {
            'Authorization': `${token}`,
          },
        });
        setKycData(response.data);
      } catch (err) {
        setError('Failed to fetch KYC data');
      }
    };

    fetchKycData();
  }, []);

  const handleStatusChange = async (id, status) => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Please log in first');
      return;
    }

    try {
      await axios.put(BASE_URL + `api/admin/kyc/${id}`, { status }, {
        headers: {
          'Authorization': `${token}`,
        },
      });
      setKycData(kycData.map((item) => (item.id === id ? { ...item, status } : item)));
    } catch (err) {
      setError('Failed to update KYC status');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleViewDocument = (url) => {
    setDocumentUrl(url);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setDocumentUrl('');
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        KYC Applications
      </Typography>

      {error && <Typography color="error">{error}</Typography>}
      {/* <Button variant="outlined" color="secondary" onClick={handleLogout}>
        Logout
      </Button> */}

      <TableContainer component={Paper} sx={{ mt: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Document Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Document</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {kycData.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.username}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell style={{
                  color:
                    row.status === "approved" ? "green" :
                      row.status === "rejected" ? "red" :
                        "orange"
                }}>{row.status || 'Pending'}</TableCell>

                <TableCell>
                  <Button
                    variant="outlined"
                    color="primary"

                    onClick={() => handleViewDocument(BASE_URL + row.document_path)}
                  >
                    View Document
                  </Button>
                </TableCell>
                {row.status === "pending" && <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleStatusChange(row.id, 'approved')}
                  >
                    Approve
                  </Button>


                  <Button
                    variant="contained"
                    color="secondary"
                    sx={{marginTop:1}}
                    onClick={() => handleStatusChange(row.id, 'rejected')}
                  >
                    Reject
                  </Button>
                </TableCell>}

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal to view document */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="document-view-modal"
        aria-describedby="modal-to-view-documents"
      >
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'white', p: 4, width: '80%', maxHeight: '80vh', overflow: 'auto' }}>
          <Typography variant="h6" gutterBottom>
            Document Preview
          </Typography>
          <iframe
            src={documentUrl}
            width="100%"
            height="600"
            title="Document Preview"
          ></iframe>
          <Button variant="contained" color="secondary" onClick={handleClose} sx={{ mt: 2 }}>
            Close
          </Button>
        </Box>
      </Modal>
    </div>
  );
}

export default AdminDashboard;
