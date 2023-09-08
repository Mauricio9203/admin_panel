import React from 'react'
import Typography from '@mui/material/Typography';
import { Divider } from '@mui/material';
import ContentDashboard from './ContentDashboard';



const Dashboard = () => {
  return (
    <>
    <Typography variant="h5" gutterBottom>
        Dashboard
    </Typography>
    <Divider/>
    
    <ContentDashboard/>
 
    </>
  )
}

export default Dashboard
