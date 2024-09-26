import React, { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Drawer, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  CssBaseline,
  Box,
  Container,
  Grid,
  Paper,
  Avatar,
  InputBase,
  IconButton,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  LinearProgress
} from '@mui/material';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import {
  Home as HomeIcon,
  BarChart as BarChartIcon,
  People as PeopleIcon,
  Book as BookIcon,
  Settings as SettingsIcon,
  Laptop as LaptopIcon,
  TrendingUp as TrendingUpIcon,
  Notifications as NotificationsIcon,
  Search as SearchIcon,
  CheckCircleOutline as CheckCircleOutlineIcon
} from '@mui/icons-material';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  PointElement, 
  LineElement, 
  RadialLinearScale, 
  ArcElement, 
  Title, 
  Tooltip, 
  Legend, 
  Filler 
} from 'chart.js';
import { Bar, Line, Radar, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale, 
  LinearScale, 
  BarElement, 
  PointElement, 
  LineElement, 
  RadialLinearScale, 
  ArcElement, 
  Title, 
  Tooltip, 
  Legend, 
  Filler
);

// Theme setup
const theme = createTheme();

// Styled components
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.common.white,
  '&:hover': {
    backgroundColor: theme.palette.common.white,
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

// Sample data (you would typically fetch this from an API)
const progressData = [
  { week: 'Week 1', average: 20, topPerformer: 35 },
  { week: 'Week 2', average: 35, topPerformer: 50 },
  { week: 'Week 3', average: 45, topPerformer: 65 },
  { week: 'Week 4', average: 60, topPerformer: 80 },
  { week: 'Week 5', average: 75, topPerformer: 90 },
  { week: 'Week 6', average: 85, topPerformer: 95 },
];

const subjectData = {
  labels: ['Gujarati', 'Mathematics', 'Science', 'Social Studies', 'English'],
  datasets: [
    {
      label: 'Average Score',
      data: [80, 70, 90, 65, 75],
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
    {
      label: 'Top Score',
      data: [95, 88, 98, 82, 90],
      backgroundColor: 'rgba(75, 192, 192, 0.5)',
    },
  ],
};

const studentData = [
  { id: 1, name: 'Aarav Patel', overallScore: 78, improvement: 5, signLanguage: 85, braille: 70, lastActive: '2 hours ago', completedModules: 15 },
  { id: 2, name: 'Diya Shah', overallScore: 82, improvement: 3, signLanguage: 90, braille: 75, lastActive: '1 day ago', completedModules: 18 },
  { id: 3, name: 'Veer Mehta', overallScore: 75, improvement: 7, signLanguage: 80, braille: 85, lastActive: '3 hours ago', completedModules: 14 },
  { id: 4, name: 'Anaya Desai', overallScore: 88, improvement: 2, signLanguage: 95, braille: 80, lastActive: '30 minutes ago', completedModules: 20 },
  { id: 5, name: 'Reyansh Kumar', overallScore: 71, improvement: 8, signLanguage: 75, braille: 90, lastActive: '5 hours ago', completedModules: 13 },
];

const accessibilityData = {
  labels: ['Sign Language Users', 'Braille Users', 'Visual Aids Users', 'Hearing Aids Users', 'Cognitive Aids Users'],
  datasets: [{
    data: [30, 25, 20, 15, 10],
    backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
  }]
};

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('home');

  const renderContent = () => {
    switch(activeSection) {
      case 'home':
        return <HomeSection />;
      case 'analytics':
        return <AnalyticsSection />;
      case 'students':
        return <StudentsSection />;
      default:
        return <HomeSection />;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
          <Toolbar>
            <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
              EduAdapt
            </Typography>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search>
            <IconButton color="inherit">
              <NotificationsIcon />
            </IconButton>
            <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
              <Avatar alt="John Doe" src="/static/images/avatar/1.jpg" />
              <Typography variant="subtitle1" sx={{ ml: 1 }}>John Doe</Typography>
              <IconButton color="inherit" size="small">
                <LaptopIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          sx={{
            width: 240,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box' },
          }}
        >
          <Toolbar />
          <Box sx={{ overflow: 'auto' }}>
            <List>
              {[
                { text: 'Dashboard', icon: <HomeIcon />, section: 'home' },
                { text: 'Analytics', icon: <BarChartIcon />, section: 'analytics' },
                { text: 'Students', icon: <PeopleIcon />, section: 'students' },
                { text: 'Courses', icon: <BookIcon />, section: 'courses' },
                { text: 'Settings', icon: <SettingsIcon />, section: 'settings' },
              ].map((item) => (
                <ListItem 
                  button 
                  key={item.text} 
                  onClick={() => setActiveSection(item.section)}
                  selected={activeSection === item.section}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
          {renderContent()}
        </Box>
      </Box>
    </ThemeProvider>
  );
};

const HomeSection = () => (
  <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
    <Grid container spacing={3}>
      {/* Stat Cards */}
      <Grid item xs={12} sm={6} md={3}>
        <StatCard icon={<PeopleIcon />} label="Total Students" value="1,234" change="+5.2%" />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatCard icon={<LaptopIcon />} label="Active Courses" value="28" change="+3" />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatCard icon={<TrendingUpIcon />} label="Avg. Improvement" value="12.7%" change="+2.3%" />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StatCard icon={<BookIcon />} label="Learning Modules" value="156" change="+5" />
      </Grid>
      
      {/* Charts */}
      <Grid item xs={12}>
        <Paper sx={{ p: 2 }}>
          <Typography component="h2" variant="h6" color="primary" gutterBottom>
            Learning Path Progress
          </Typography>
          <Box sx={{ height: 300 }}>
            <Line
              data={{
                labels: progressData.map(d => d.week),
                datasets: [
                  {
                    label: 'Average Progress',
                    data: progressData.map(d => d.average),
                    borderColor: 'rgb(59, 130, 246)',
                    backgroundColor: 'rgba(59, 130, 246, 0.5)',
                    fill: true,
                  },
                  {
                    label: 'Top Performer',
                    data: progressData.map(d => d.topPerformer),
                    borderColor: 'rgb(16, 185, 129)',
                    backgroundColor: 'rgba(16, 185, 129, 0.5)',
                    fill: true,
                  }
                ],
              }}
              options={{
                responsive: true,
                plugins: {
                  legend: { position: 'top' },
                  title: { display: true, text: 'Student Learning Path Progression' },
                },
                scales: {
                  y: { beginAtZero: true, max: 100, title: { display: true, text: 'Completion %' } },
                },
              }}
            />
          </Box>
        </Paper>
      </Grid>
      
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 2 }}>
          <Typography component="h2" variant="h6" color="primary" gutterBottom>
            Subject Performance
          </Typography>
          <Box sx={{ height: 300 }}>
            <Bar
              data={subjectData}
              options={{
                responsive: true,
                plugins: {
                  legend: { position: 'top' },
                  title: { display: true, text: 'Average Scores by Subject' },
                },
                scales: {
                  y: { beginAtZero: true, max: 100, title: { display: true, text: 'Score' } },
                },
              }}
            />
          </Box>
        </Paper>
      </Grid>
      
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 2 }}>
          <Typography component="h2" variant="h6" color="primary" gutterBottom>
            Accessibility Needs Distribution
          </Typography>
          <Box sx={{ height: 300 }}>
            <Doughnut
              data={accessibilityData}
              options={{
                responsive: true,
                plugins: {
                  legend: { position: 'right' },
                  title: { display: true, text: 'Distribution of Accessibility Needs' },
                },
              }}
            />
          </Box>
        </Paper>
      </Grid>
      
      {/* Recent Activity Feed */}
      <Grid item xs={12}>
        <Paper sx={{ p: 2 }}>
          <Typography component="h2" variant="h6" color="primary" gutterBottom>
            Recent Activity
          </Typography>
          <List>
            <ListItem>
              <ListItemIcon>
                <CheckCircleOutlineIcon color="success" />
              </ListItemIcon>
              <ListItemText
                primary="Aarav Patel completed 'Advanced Sign Language Communication' module"
                secondary="2 hours ago"
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <TrendingUpIcon color="primary" />
              </ListItemIcon>
              <ListItemText
                primary="Overall student performance increased by 3.2% this week"
                secondary="1 day ago"
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <BookIcon color="secondary" />
              </ListItemIcon>
              <ListItemText
                primary="New course 'Inclusive STEM Education' added to the curriculum"
                secondary="3 days ago"
              />
            </ListItem>
          </List>
        </Paper>
      </Grid>
    </Grid>
  </Container>
);

const AnalyticsSection = () => (
  <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
    <Typography variant="h4" gutterBottom>
      Detailed Analytics
    </Typography>
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 2 }}>
          <Typography component="h2" variant="h6" color="primary" gutterBottom>
            Subject Performance Breakdown
          </Typography>
          <Box sx={{ height: 300 }}>
            <Bar
              data={subjectData}
              options={{
                responsive: true,
                plugins: {
                  legend: { position: 'top' },
                  title: { display: true, text: 'Average vs Top Scores by Subject' },
                },
                scales: {
                  y: { beginAtZero: true, max: 100, title: { display: true, text: 'Score' } },
                },
              }}
            />
          </Box>
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 2 }}>
          <Typography component="h2" variant="h6" color="primary" gutterBottom>
            Skill Assessment Radar
          </Typography>
          <Box sx={{ height: 300 }}>
            <Radar
              data={{
                labels: ['Reading', 'Writing', 'Listening', 'Speaking', 'Problem Solving', 'Critical Thinking'],
                datasets: [{
                  label: 'Average Skill Level',
                  data: [65, 59, 80, 81, 56, 55],
                  backgroundColor: 'rgba(54, 162, 235, 0.2)',
                  borderColor: 'rgb(54, 162, 235)',
                  pointBackgroundColor: 'rgb(54, 162, 235)',
                }]
              }}
              options={{
                responsive: true,
                plugins: {
                  legend: { position: 'top' },
                  title: { display: true, text: 'Student Skill Assessment' },
                },
                scales: {
                  r: { beginAtZero: true, max: 100 },
                },
              }}
            />
          </Box>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper sx={{ p: 2 }}>
          <Typography component="h2" variant="h6" color="primary" gutterBottom>
            Detailed Performance Metrics
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Metric</TableCell>
                  <TableCell>This Month</TableCell>
                  <TableCell>Last Month</TableCell>
                  <TableCell>Change</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Average Completion Rate</TableCell>
                  <TableCell>78%</TableCell>
                  <TableCell>72%</TableCell>
                  <TableCell sx={{ color: 'success.main' }}>+6%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Average Time per Module</TableCell>
                  <TableCell>45 minutes</TableCell>
                  <TableCell>52 minutes</TableCell>
                  <TableCell sx={{ color: 'success.main' }}>-7 minutes</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Student Engagement Score</TableCell>
                  <TableCell>8.5/10</TableCell>
                  <TableCell>7.8/10</TableCell>
                  <TableCell sx={{ color: 'success.main' }}>+0.7</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Accessibility Feature Usage</TableCell>
                  <TableCell>92%</TableCell>
                  <TableCell>85%</TableCell>
                  <TableCell sx={{ color: 'success.main' }}>+7%</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Grid>
    </Grid>
  </Container>
);

const StudentsSection = () => (
  <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
    <Typography variant="h4" gutterBottom>
      Student Profiles
    </Typography>
    <Paper sx={{ p: 2, mb: 4 }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Overall Progress</TableCell>
              <TableCell>Improvement</TableCell>
              <TableCell>Sign Language</TableCell>
              <TableCell>Braille</TableCell>
              <TableCell>Completed Modules</TableCell>
              <TableCell>Last Active</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {studentData.map((student) => (
              <TableRow key={student.id}>
                <TableCell>{student.name}</TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ width: '100%', mr: 1 }}>
                      <LinearProgress variant="determinate" value={student.overallScore} />
                    </Box>
                    <Box sx={{ minWidth: 35 }}>
                      <Typography variant="body2" color="text.secondary">{`${student.overallScore}%`}</Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell sx={{ color: 'success.main' }}>+{student.improvement}%</TableCell>
                <TableCell>{student.signLanguage}%</TableCell>
                <TableCell>{student.braille}%</TableCell>
                <TableCell>{student.completedModules}</TableCell>
                <TableCell>{student.lastActive}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 2 }}>
          <Typography component="h2" variant="h6" color="primary" gutterBottom>
            Top Performers
          </Typography>
          <List>
            {studentData.sort((a, b) => b.overallScore - a.overallScore).slice(0, 3).map((student, index) => (
              <ListItem key={student.id}>
                <ListItemIcon>
                  <Avatar sx={{ bgcolor: 'primary.main' }}>{index + 1}</Avatar>
                </ListItemIcon>
                <ListItemText
                  primary={student.name}
                  secondary={`Overall Score: ${student.overallScore}%`}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 2 }}>
          <Typography component="h2" variant="h6" color="primary" gutterBottom>
            Most Improved
          </Typography>
          <List>
            {studentData.sort((a, b) => b.improvement - a.improvement).slice(0, 3).map((student, index) => (
              <ListItem key={student.id}>
                <ListItemIcon>
                  <Avatar sx={{ bgcolor: 'success.main' }}>{index + 1}</Avatar>
                </ListItemIcon>
                <ListItemText
                  primary={student.name}
                  secondary={`Improvement: +${student.improvement}%`}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Grid>
    </Grid>
  </Container>
);

const StatCard = ({ icon, label, value, change }) => (
  <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 140 }}>
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
      {React.cloneElement(icon, { color: 'primary', sx: { mr: 1 } })}
      <Typography color="text.secondary" variant="body2">
        {label}
      </Typography>
    </Box>
    <Typography component="p" variant="h4">
      {value}
    </Typography>
    <Typography 
      sx={{ 
        color: change.startsWith('+') ? 'success.main' : 'error.main',
        mt: 'auto'
      }} 
      variant="body2"
    >
      {change}
    </Typography>
  </Paper>
);

export default Dashboard;