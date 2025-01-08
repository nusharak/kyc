import React, { useEffect, useState } from 'react';
import { TextField, Button, Typography, Box, Container, CircularProgress } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { BASE_URL } from '../constants/DefaultValues';

function UpdateKyc() {
  const { id } = useParams(); // Get the KYC record ID from the URL
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [kycData, setKycData] = useState(null);

  useEffect(() => {
    const fetchKycData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const response = await axios.get(BASE_URL+`api/kyc-status`, {
          headers: {
            'Authorization': `${token}`,
          },
        });

        if (response.data) {
          setKycData(response.data.kyc);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching KYC data:', error);
        navigate('/login');
      }
    };

    fetchKycData();
  }, [id, navigate]);

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      id_document: null,
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Document Name is required'),
      description: Yup.string().required('Description is required'),
      id_document: Yup.mixed(),
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      const token = localStorage.getItem('token');
      if (!token) {
        setErrors({ submit: 'Please log in first' });
        setSubmitting(false);
        return;
      }

      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('description', values.description);
      if (values.id_document) {
        formData.append('id_document', values.id_document);
      }

      try {
        await axios.put(BASE_URL+`api/update-kyc/${id}`, formData, {
          headers: {
            'Authorization': `${token}`,
          },
        });
        navigate('/kyc-listed');
      } catch (err) {
        setErrors({ submit: 'Failed to update KYC' });
        setSubmitting(false);
      }
    },
  });

  // Update formik values once kycData is fetched
  useEffect(() => {
    if (kycData) {
      formik.setValues({
        name: kycData.name,
        description: kycData.description,
        id_document: null, // You can manage file handling separately
      });
    }
  }, [kycData, ]);

  if (loading) {
    return (
      <Container maxWidth="sm">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
          }}
        >
          <CircularProgress />
          <Typography variant="h6" sx={{ mt: 2 }}>
            Fetching KYC details...
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
        }}
      >
        <Typography variant="h4" gutterBottom>
          Update KYC
        </Typography>
        {formik.errors.submit && (
          <Typography color="error" gutterBottom>
            {formik.errors.submit}
          </Typography>
        )}
        <form onSubmit={formik.handleSubmit} style={{ width: '100%' }}>
          <TextField
            label="Full Name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Description"
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.description && Boolean(formik.errors.description)}
            helperText={formik.touched.description && formik.errors.description}
            fullWidth
            margin="normal"
            required
          />
          <Typography variant="body1" gutterBottom>
            Upload ID Document 
          </Typography>
          <input
            type="file"
            name="id_document"
            onChange={(event) => {
              formik.setFieldValue('id_document', event.currentTarget.files[0]);
            }}
            onBlur={formik.handleBlur}
            style={{ marginBottom: 16 }}
          />
          {formik.touched.id_document && formik.errors.id_document && (
            <Typography color="error" gutterBottom>
              {formik.errors.id_document}
            </Typography>
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={formik.isSubmitting}
            sx={{ mt: 2 }}
          >
            Update KYC
          </Button>
        </form>
      </Box>
    </Container>
  );
}

export default UpdateKyc;
