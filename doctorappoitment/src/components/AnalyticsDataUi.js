import React, { useContext } from 'react'
import { AdminContext } from './AdminDashContext';

import {
  Card,

  Typography,
  Grid,
  CircularProgress,
  Box,
  styled,
  Tooltip
} from '@mui/material';
import {
  FaUser,
  FaUserMd,
  FaCalendarAlt,
  FaClipboardCheck,
  FaCheckCircle
} from 'react-icons/fa';
import { red, green, blue, orange, purple, grey } from '@mui/material/colors';
const StyledCard = styled(Card)(({ theme, color }) => ({
  backgroundColor: color,
  color: theme.palette.common.white,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[5],
  transition: 'transform 0.3s, box-shadow 0.3s',
  height: '100%', 
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: theme.shadows[15],
  },
}));

const IconWrapper = styled(Box)(({ theme, iconColor }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 80, 
  height: 80,
  borderRadius: '50%',
  backgroundColor: theme.palette.common.white,
  marginBottom: theme.spacing(2),
  transition: 'background-color 0.3s, color 0.3s',
  color: iconColor,
  '&:hover': {
    backgroundColor: iconColor,
    color: theme.palette.common.white,
  },
}));

const iconSize = 40; 

const CardContentWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  height: '100%',
  padding: theme.spacing(3), 
}));

const DashboardContainer = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(4),
  backgroundColor: '#f4f6f9',
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const AnalyticsDataUi = () => {
    const { analyticsData} = useContext(AdminContext);
    const renderContent = (count, label) => (
      <Box textAlign="center">
        <Typography variant="h6" component="div" gutterBottom sx={{ fontWeight: 'bold', mb: 1 }}>
          {label}
        </Typography>
        <Typography variant="h3" component="div"> 
          {analyticsData ? count : <CircularProgress color="inherit" size={30} />} 
        </Typography>
      </Box>
    );
  
  return (
    <DashboardContainer>
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Tooltip title="Number of Patients" arrow>
          <StyledCard color={red[600]}>
            <CardContentWrapper>
              <IconWrapper iconColor={red[100]}>
                <FaUser size={iconSize} />
              </IconWrapper>
              {renderContent(analyticsData?.patientsCount, 'Patients Count')}
            </CardContentWrapper>
          </StyledCard>
        </Tooltip>
      </Grid>

      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Tooltip title="Number of Doctors" arrow>
          <StyledCard color={green[600]}>
            <CardContentWrapper>
              <IconWrapper iconColor={green[100]}>
                <FaUserMd size={iconSize} />
              </IconWrapper>
              {renderContent(analyticsData?.doctorsCount, 'Doctors Count')}
            </CardContentWrapper>
          </StyledCard>
        </Tooltip>
      </Grid>

      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Tooltip title="Total Appointments" arrow>
          <StyledCard color={blue[600]}>
            <CardContentWrapper>
              <IconWrapper iconColor={blue[100]}>
                <FaCalendarAlt size={iconSize} />
              </IconWrapper>
              {renderContent(analyticsData?.totalAppointments, 'Total Appointments')}
            </CardContentWrapper>
          </StyledCard>
        </Tooltip>
      </Grid>

      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Tooltip title="Pending Appointments" arrow>
          <StyledCard color={orange[600]}>
            <CardContentWrapper>
              <IconWrapper iconColor={orange[100]}>
                <FaClipboardCheck size={iconSize} />
              </IconWrapper>
              {renderContent(analyticsData?.pendingAppointments, 'Pending Appointments')}
            </CardContentWrapper>
          </StyledCard>
        </Tooltip>
      </Grid>

      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Tooltip title="Booked Appointments" arrow>
          <StyledCard color={purple[600]}>
            <CardContentWrapper>
              <IconWrapper iconColor={purple[100]}>
                <FaCalendarAlt size={iconSize} />
              </IconWrapper>
              {renderContent(analyticsData?.bookedAppointments, 'Booked Appointments')}
            </CardContentWrapper>
          </StyledCard>
        </Tooltip>
      </Grid>

      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Tooltip title="Completed Appointments" arrow>
          <StyledCard color={grey[800]}>
            <CardContentWrapper>
              <IconWrapper iconColor={grey[300]}>
                <FaCheckCircle size={iconSize} />
              </IconWrapper>
              {renderContent(analyticsData?.completedAppointments, 'Completed Appointments')}
            </CardContentWrapper>
          </StyledCard>
        </Tooltip>
      </Grid>
    </Grid>
  </DashboardContainer>
  )
}

export default AnalyticsDataUi