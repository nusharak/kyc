import React, { useState, useEffect } from 'react';
import { Typography, CircularProgress, Grid, Card, CardContent, Avatar } from '@mui/material';
import axios from 'axios';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import PendingIcon from '@mui/icons-material/HourglassEmpty';
import GroupIcon from '@mui/icons-material/Group';
import { BASE_URL } from '../constants/DefaultValues';

function Dashboard() {
    const [acceptedCount, setAcceptedCount] = useState(0);
    const [rejectedCount, setRejectedCount] = useState(0);
    const [pendingCount, setPendingCount] = useState(0);
    const [userCount, setUserCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchKycData = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('Please log in first');
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get(BASE_URL+'api/admin/kyc', {
                    headers: {
                        'Authorization': `${token}`,
                    },
                });
                const data = response.data;
                setAcceptedCount(data.filter(item => item.status === 'approved').length);
                setRejectedCount(data.filter(item => item.status === 'rejected').length);
                setPendingCount(data.filter(item => item.status === "pending").length);
            } catch (err) {
                setError('Failed to fetch KYC data');
            } finally {
                setLoading(false);
            }
        };

        const fetchUserData = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('Please log in first');
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get(BASE_URL+'api/admin/user-count', {
                    headers: {
                        'Authorization': `${token}`,
                    },
                });
                const data = response.data;
                setUserCount(data.userCount);
            } catch (err) {
                setError('Failed to fetch user data');
            } finally {
                setLoading(false);
            }
        };

        fetchKycData();
        fetchUserData();
    }, []);

    if (loading) return <CircularProgress />;
    if (error) return <Typography color="error">{error}</Typography>;

    return (
        <div>
            <Typography variant="h4" gutterBottom>
                Dashboard
            </Typography>
            <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Avatar style={{ backgroundColor: '#2196f3', margin: '0 auto' }}>
                                <GroupIcon />
                            </Avatar>
                            <Typography variant="h6" align="center">
                                Total Users

                            </Typography>
                            <Typography variant="h4" align="center">
                                {userCount}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Avatar style={{ backgroundColor: '#4caf50', margin: '0 auto' }}>
                                <CheckCircleIcon />
                            </Avatar>
                            <Typography variant="h6" align="center">
                                Accepted KYC Applications
                            </Typography>
                            <Typography variant="h4" align="center">
                                {acceptedCount}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Avatar style={{ backgroundColor: '#f44336', margin: '0 auto' }}>
                                <CancelIcon />
                            </Avatar>
                            <Typography variant="h6" align="center">
                                Rejected KYC Applications
                            </Typography>
                            <Typography variant="h4" align="center">
                                {rejectedCount}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Avatar style={{ backgroundColor: '#ff9800', margin: '0 auto' }}>
                                <PendingIcon />
                            </Avatar>
                            <Typography variant="h6" align="center">
                                Pending KYC Applications
                            </Typography>
                            <Typography variant="h4" align="center">
                                {pendingCount}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                
            </Grid>
        </div>
    );
}

export default Dashboard;
