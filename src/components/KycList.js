import React, { useEffect, useState } from 'react'; 
import { Button, Grid, Card, CardContent, Typography } from '@mui/material';
import KycCard from './KycCard';
import Header from './Header';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../constants/DefaultValues';

function KycListPage() {
  const [kycData, setKycData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch KYC data from the server
    const fetchKycData = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('No token found');
          navigate('/login');
          return;
        }
      
        try {
          const response = await fetch(BASE_URL + 'api/kyc-status', {
            headers: {
              'Authorization': `${token}`,
            },
          });
      
          if (!response.ok) {
            // Handle non-OK responses
            const errorText = await response.text();
            console.error(`HTTP error! Status: ${response.status}, Response: ${errorText}`);
            if (response.status === 401) {
              navigate('/login');
            }
            return;
          }
      
          const data = await response.json();
          setKycData(data.kyc);
        } catch (error) {
          console.error('Error fetching KYC data:', error);
          navigate("/login");
        }
    };

    fetchKycData();
  }, [navigate]);

  const handleLogout = () => {
    console.log('User logged out');
    localStorage.clear();
    navigate("/login");
  };

  const handleKycSubmission = () => {
    navigate('/submit-kyc');
  };

  const handleUpdateKyc = (id) => {
    // Navigate to the page where the user can update their KYC based on the ID
    navigate(`/update-kyc/${id}`);
  };

  return (
    <div>
      <Header onLogout={handleLogout} />
      <Grid container spacing={2} margin={5} direction="column" >
        {kycData ? (
          <>
            <KycCard
              key={kycData.id}
              name={kycData.name}
              description={kycData.description}
              image={BASE_URL + kycData.document_path}
              status={kycData.status}
            />
            {kycData.status === 'rejected' && (
              <Grid item>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleUpdateKyc(kycData.id)}
                  sx={{ marginTop: 2 }}
                >
                  Update KYC
                </Button>
              </Grid>
            )}
          </>
        ) : (
          <Button
            variant="contained"
            color="primary"
            onClick={handleKycSubmission}
          >
            KYC Submission
          </Button>
        )}
      </Grid>
    </div>
  );
}

export default KycListPage;
