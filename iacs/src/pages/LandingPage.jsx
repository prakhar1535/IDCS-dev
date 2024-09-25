import React from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Card, 
  CardContent, 
  Container, 
  Grid, 
  Box,
  List,
  ListItem,
  ListItemText,
  Hidden,
  useMediaQuery
} from '@mui/material';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';

// Create a theme instance
const theme = createTheme();

const StyledButton = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  borderRadius: theme.shape.borderRadius,
}));

const LandingPage = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ bgcolor: 'background.default', color: 'text.primary', minHeight: '100vh' }}>
        <Header />
        <main>
          <HeroSection />
          <FeaturesSection />
          <HowItWorks />
          <CallToAction />
        </main>
        <Footer />
      </Box>
    </ThemeProvider>
  );
};

const Header = () => {
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <AppBar position="static" color="default" elevation={1}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
              EduAdapt
            </Typography>
          </Box>
          <Hidden mdDown>
            <Box sx={{ display: 'flex', gap: 4 }}>
              {['Features', 'How It Works', 'Testimonials', 'Contact'].map((item) => (
                <Button key={item} color="inherit" href={`#${item.toLowerCase().replace(' ', '-')}`}>
                  {item}
                </Button>
              ))}
            </Box>
            <Box sx={{ display: 'flex', gap: 2, ml: 4 }}>
              <StyledButton variant="outlined" color="primary">Log In</StyledButton>
              <StyledButton variant="contained" color="primary">Sign Up</StyledButton>
            </Box>
          </Hidden>
          {isMobile && (
            <Button color="inherit">Menu</Button>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

const HeroSection = () => (
  <Box sx={{ bgcolor: 'grey.100', py: 10, textAlign: 'center' }}>
    <Container maxWidth="md">
      <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
        Inclusive Education Reimagined
      </Typography>
      <Typography variant="h5" paragraph sx={{ mb: 4, maxWidth: '800px', mx: 'auto' }}>
        Empowering deaf and mute students with AI-driven learning in Gujarati and Indian Sign Language
      </Typography>
      <StyledButton variant="contained" color="primary" size="large" sx={{ px: 4, py: 1.5 }}>
        Start Your Journey
      </StyledButton>
    </Container>
  </Box>
);

const FeaturesSection = () => {
  const features = [
    { title: "Sign Language Converter", description: "Real-time gesture recognition using advanced AI" },
    { title: "Speech to Gujarati", description: "Instant speech recognition and translation" },
    { title: "Interactive PDF Viewer", description: "Voice-controlled document navigation with AI narration" },
    { title: "Progress Tracking", description: "Detailed analytics and personalized learning paths" },
    { title: "AI-Powered Learning", description: "Adaptive lessons tailored to individual needs" },
    { title: "Comprehensive Modules", description: "Full curriculum support in multiple subjects" },
  ];

  return (
    <Box id="features" sx={{ py: 10 }}>
      <Container maxWidth="lg">
        <Typography variant="h3" component="h2" align="center" gutterBottom sx={{ fontWeight: 'bold', mb: 6 }}>
          Cutting-Edge Features
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={6} lg={4} key={index}>
              <FeatureCard {...feature} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

const FeatureCard = ({ title, description }) => (
  <Card raised sx={{ height: '100%' }}>
    <CardContent>
      <Typography variant="h6" component="h3" gutterBottom>
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {description}
      </Typography>
    </CardContent>
  </Card>
);

const HowItWorks = () => {
  const steps = [
    { title: "Sign Up", description: "Create your personalized account" },
    { title: "Choose Your Path", description: "Select subjects and set learning goals" },
    { title: "Learn Interactively", description: "Engage with AI-powered lessons" },
    { title: "Track Progress", description: "Monitor your growth with detailed analytics" },
  ];

  return (
    <Box id="how-it-works" sx={{ bgcolor: 'grey.100', py: 10 }}>
      <Container maxWidth="lg">
        <Typography variant="h3" component="h2" align="center" gutterBottom sx={{ fontWeight: 'bold', mb: 6 }}>
          How EduAdapt Works
        </Typography>
        <Grid container spacing={4}>
          {steps.map((step, index) => (
            <Grid item xs={12} md={6} lg={3} key={index}>
              <Box sx={{ textAlign: 'center' }}>
                <Box sx={{ 
                  bgcolor: 'background.paper', 
                  borderRadius: '50%', 
                  width: 64, 
                  height: 64, 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  mx: 'auto', 
                  mb: 2 
                }}>
                  <Typography variant="h4" component="span" sx={{ fontWeight: 'bold' }}>
                    {index + 1}
                  </Typography>
                </Box>
                <Typography variant="h6" component="h3" gutterBottom>
                  {step.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {step.description}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

const CallToAction = () => (
  <Box sx={{ bgcolor: 'primary.main', color: 'primary.contrastText', py: 10, textAlign: 'center' }}>
    <Container maxWidth="md">
      <Typography variant="h3" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
        Ready to Transform Your Learning Experience?
      </Typography>
      <Typography variant="h5" paragraph sx={{ mb: 4 }}>
        Join thousands of students, teachers, and parents in making education truly inclusive.
      </Typography>
      <StyledButton 
        variant="contained" 
        color="secondary" 
        size="large" 
        sx={{ px: 4, py: 1.5, bgcolor: 'background.paper', color: 'text.primary', '&:hover': { bgcolor: 'grey.100' } }}
      >
        Start Your Free Trial
      </StyledButton>
    </Container>
  </Box>
);

const Footer = () => (
  <Box component="footer" sx={{ bgcolor: 'grey.100', py: 6 }}>
    <Container maxWidth="lg">
      <Grid container spacing={4}>
        <Grid item xs={12} md={3}>
          <Typography variant="h6" gutterBottom>EduAdapt</Typography>
          <Typography variant="body2" color="text.secondary">
            Empowering inclusive education through technology.
          </Typography>
        </Grid>
        <Grid item xs={12} md={3}>
          <Typography variant="h6" gutterBottom>Features</Typography>
          <List dense>
            {['Sign Language Converter', 'Speech to Gujarati', 'Interactive PDF Viewer', 'Progress Tracking'].map((item) => (
              <ListItem key={item} disablePadding>
                <ListItemText primary={item} />
              </ListItem>
            ))}
          </List>
        </Grid>
        <Grid item xs={12} md={3}>
          <Typography variant="h6" gutterBottom>Resources</Typography>
          <List dense>
            {['Blog', 'Tutorials', 'FAQs', 'Support'].map((item) => (
              <ListItem key={item} disablePadding>
                <ListItemText primary={item} />
              </ListItem>
            ))}
          </List>
        </Grid>
        <Grid item xs={12} md={3}>
          <Typography variant="h6" gutterBottom>Contact</Typography>
          <Typography variant="body2" paragraph>info@eduadapt.com</Typography>
          <Typography variant="body2">+91 1234567890</Typography>
        </Grid>
      </Grid>
      <Box sx={{ mt: 4, pt: 4, borderTop: 1, borderColor: 'divider', textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          &copy; 2024 EduAdapt. All rights reserved.
        </Typography>
      </Box>
    </Container>
  </Box>
);

export default LandingPage;