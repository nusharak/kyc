import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material';

function KycCard({ name, description, image, status }) {
  const defaultImage = 'path/to/default-image.jpg'; // Replace with your default image path

  const handleViewClick = () => {
    // Open the document in a new window
    window.open(image, '_blank');
  };

  const renderMedia = () => {
    const fileExtension = image.split('.').pop().toLowerCase();

    if (['jpg', 'jpeg', 'png', 'gif'].includes(fileExtension)) {
      return (
        <CardMedia
          component="img"
          height="140"
          image={image || defaultImage}
          alt={`${name}'s ID`}
        />
      );
    } else if (fileExtension === 'pdf') {
      return (
        <CardMedia
          component="img"
          height="140"
          image={defaultImage}
          alt={`${name}'s ID`}
        />
      );
    } else {
      return (
        <CardMedia
          component="img"
          height="140"
          image={defaultImage}
          alt={`${name}'s ID`}
        />
      );
    }
  };

  return (
    <Card style={{ maxWidth: 345, margin: '1rem' }}>
      {renderMedia()}
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography gutterBottom variant="p" component="div">
          {description}
        </Typography>
        <Typography variant="body2" sx={{
          color:
            status === "approved" ? "green" :
            status === "rejected" ? "red" :
                "orange"
        }}>
          Status: {status}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleViewClick}
          style={{ marginTop: '1rem' }}
        >
          View
        </Button>
      </CardContent>
    </Card>
  );
}

export default KycCard;
