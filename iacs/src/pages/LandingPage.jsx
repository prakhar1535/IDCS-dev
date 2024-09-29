import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Grid,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  Paper,
  Rating,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import {
  MessageCircle,
  BarChart2,
  BookOpen,
  Users,
  Check,
  Star,
  ArrowRight,
  Globe,
  Calculator,
  Microscope,
  UserPlus,
  Activity,
  Headphones,
} from "lucide-react";

// Create a theme instance
const theme = createTheme({
  palette: {
    primary: {
      main: "#3f51b5",
    },
    secondary: {
      main: "#f50057",
    },
  },
});

const LandingPage = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "background.default",
          color: "text.primary",
        }}
      >
        {/* Header */}
        <AppBar position="static" color="default" elevation={0}>
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              AIComm
            </Typography>
            <Button color="inherit">Product</Button>
            <Button color="inherit">Pricing</Button>
            <Button color="inherit">Company</Button>
            <Button color="inherit">Documentation</Button>
            <Button color="primary">Log in</Button>
            <Button variant="contained" color="primary">
              Get started
            </Button>
          </Toolbar>
        </AppBar>

        {/* Main Content */}
        <Container maxWidth="lg">
          <Box sx={{ py: 12 }}>
            <Grid container spacing={6} alignItems="center">
              {/* Left Column */}
              <Grid item xs={12} md={6}>
                <Typography variant="h2" gutterBottom>
                  Comprehensive communication for the deaf and mute
                </Typography>
                <Typography variant="h5" paragraph>
                  AIComm is an AI-powered tool that integrates into your daily
                  life, helping you communicate effortlessly with confidence.
                </Typography>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <MessageCircle color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="Real-time sign language interpretation" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <BookOpen color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="Interactive learning modules" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <BarChart2 color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="Progress tracking and analytics" />
                  </ListItem>
                </List>
                <Box mt={4}>
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    sx={{ mr: 2 }}
                    onClick={() => (window.location.href = "/StartClass")}
                  >
                    Get started for free 🙌
                  </Button>
                  <Button variant="outlined" color="primary" size="large">
                    Book a demo
                  </Button>
                </Box>
              </Grid>

              {/* Right Column */}
              <Grid item xs={12} md={6}>
                <Paper elevation={3} sx={{ p: 3 }}>
                  <Typography variant="h4" gutterBottom>
                    Communication Dashboard
                  </Typography>
                  <Box
                    sx={{ bgcolor: "grey.100", p: 2, borderRadius: 1, mb: 2 }}
                  >
                    <Typography variant="h6" gutterBottom>
                      Performance
                    </Typography>
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Typography>Sign Language Accuracy</Typography>
                      <Typography color="success.main">95%</Typography>
                    </Box>
                    <Box
                      sx={{
                        width: "100%",
                        bgcolor: "grey.300",
                        borderRadius: 5,
                        mt: 1,
                      }}
                    >
                      <Box
                        sx={{
                          width: "95%",
                          height: 10,
                          bgcolor: "success.main",
                          borderRadius: 5,
                        }}
                      />
                    </Box>
                  </Box>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Paper sx={{ p: 2, bgcolor: "grey.100" }}>
                        <Typography variant="subtitle1">
                          Daily Practice
                        </Typography>
                        <Typography variant="h4" color="primary">
                          30 min
                        </Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={6}>
                      <Paper sx={{ p: 2, bgcolor: "grey.100" }}>
                        <Typography variant="subtitle1">
                          Words Learned
                        </Typography>
                        <Typography variant="h4" color="primary">
                          250+
                        </Typography>
                      </Paper>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        </Container>

        {/* Features Section */}
        <Box sx={{ bgcolor: "background.paper", py: 10 }}>
          <Container maxWidth="lg">
            <Typography variant="h3" align="center" gutterBottom>
              Comprehensive Features
            </Typography>
            <Grid container spacing={4} mt={4}>
              <FeatureCard
                icon={<MessageCircle />}
                title="Real-time Interpretation"
                description="Instant translation between sign language and text/speech."
              />
              <FeatureCard
                icon={<BookOpen />}
                title="Interactive Learning"
                description="Engaging lessons to improve sign language skills for all users."
              />
              <FeatureCard
                icon={<BarChart2 />}
                title="Progress Tracking"
                description="Monitor your learning journey with detailed analytics and insights."
              />
              <FeatureCard
                icon={<Globe />}
                title="Language Conversion"
                description="Convert text and speech to sign language and vice versa."
              />
              <FeatureCard
                icon={<UserPlus />}
                title="Multi-User Support"
                description="Tailored experiences for students, teachers, parents, and HR professionals."
              />
              <FeatureCard
                icon={<Activity />}
                title="Advanced Analytics"
                description="Detailed reports and insights on learning progress and communication patterns."
              />
            </Grid>
          </Container>
        </Box>

        {/* Modules Section */}
        <Box sx={{ bgcolor: "background.default", py: 10 }}>
          <Container maxWidth="lg">
            <Typography variant="h3" align="center" gutterBottom>
              Comprehensive Learning Modules
            </Typography>
            <Grid container spacing={4} mt={4}>
              <ModuleCard
                icon={<BookOpen />}
                onclick={() => (window.location.href = "http://localhost:5000")}
                title="Language Interpretation"
                description="Master Gujarati alphabets, numbers, and basic vocabulary through interactive tutorials and writing practice."
              />
              <ModuleCard
                icon={<MessageCircle />}
                title="Sentence Formation"
                description="Learn to construct sentences in Gujarati with sign language interpretation and practice exercises."
              />
              <ModuleCard
                icon={<Calculator />}
                title="Mathematics"
                onclick={() => (window.location.href = "http://localhost:3001")}
                description="Study tables, basic arithmetic, and solve math problems with sign language guidance."
              />
              <ModuleCard
                icon={<Microscope />}
                title="Science"
                description="Explore basic science concepts through interactive tutorials and hands-on exercises."
              />
              <ModuleCard
                icon={<Users />}
                title="Parent Support"
                description="Resources to help parents understand and support their children's learning journey."
              />
              <ModuleCard
                icon={<Headphones />}
                title="HR Tools"
                description="Features for interviews and meetings to enhance workplace inclusivity for deaf individuals."
              />
            </Grid>
          </Container>
        </Box>

        {/* How It Works Section */}
        <Box sx={{ bgcolor: "background.paper", py: 10 }}>
          <Container maxWidth="lg">
            <Typography variant="h3" align="center" gutterBottom>
              How It Works
            </Typography>
            <Grid container spacing={4} mt={4} justifyContent="center">
              <StepCard
                number="1"
                title="Sign Up"
                description="Create your account and set up your profile."
              />
              <StepCard
                number="2"
                title="Choose Your Path"
                description="Select your learning goals and communication needs."
              />
              <StepCard
                number="3"
                title="Start Learning"
                description="Access modules and begin your journey to effective communication."
              />
              <StepCard
                number="4"
                title="Practice & Improve"
                description="Use AIComm in real-world scenarios and track your progress."
              />
            </Grid>
          </Container>
        </Box>

        {/* Testimonials Section */}
        <Box sx={{ bgcolor: "background.default", py: 10 }}>
          <Container maxWidth="lg">
            <Typography variant="h3" align="center" gutterBottom>
              What Our Users Say
            </Typography>
            <Grid container spacing={4} mt={4}>
              <TestimonialCard
                quote="AIComm has revolutionized how I communicate with my deaf colleagues. It's incredibly intuitive and accurate."
                author="John D., HR Manager"
              />
              <TestimonialCard
                quote="As a deaf individual, AIComm has opened up so many opportunities for me. I feel more confident in my daily interactions."
                author="Sarah L., Student"
              />
              <TestimonialCard
                quote="The learning modules are fantastic! I've made significant progress in learning sign language thanks to AIComm."
                author="Michael R., Teacher"
              />
            </Grid>
          </Container>
        </Box>

        {/* Pricing Section */}
        <Box sx={{ bgcolor: "background.paper", py: 10 }}>
          <Container maxWidth="lg">
            <Typography variant="h3" align="center" gutterBottom>
              Choose Your Plan
            </Typography>
            <Grid container spacing={4} mt={4} justifyContent="center">
              <PricingCard
                title="Basic"
                price="Free"
                features={[
                  "Real-time sign language interpretation",
                  "Basic learning modules",
                  "Community forum access",
                ]}
              />
              <PricingCard
                title="Pro"
                price="$9.99/month"
                features={[
                  "All Basic features",
                  "Advanced learning modules",
                  "Progress tracking and analytics",
                  "Priority customer support",
                ]}
                highlighted={true}
              />
              <PricingCard
                title="Enterprise"
                price="Custom"
                features={[
                  "All Pro features",
                  "Custom integration options",
                  "Dedicated account manager",
                  "Employee training programs",
                ]}
              />
            </Grid>
          </Container>
        </Box>

        {/* Trusted By Section */}
        <Box sx={{ bgcolor: "background.default", py: 6 }}>
          <Container maxWidth="lg">
            <Typography variant="h4" align="center" gutterBottom>
              Trusted by
            </Typography>
            <Grid container justifyContent="center" spacing={4} mt={2}>
              {[1, 2, 3, 4, 5].map((item) => (
                <Grid item key={item}>
                  <Box
                    sx={{
                      width: 100,
                      height: 32,
                      bgcolor: "grey.300",
                      borderRadius: 1,
                    }}
                  />
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <Grid item xs={12} sm={6} md={4}>
    <Card elevation={0} sx={{ textAlign: "center", height: "100%" }}>
      <CardContent>
        <Box sx={{ color: "primary.main", mb: 2 }}>
          {React.cloneElement(icon, { size: 48 })}
        </Box>
        <Typography variant="h5" gutterBottom>
          {title}
        </Typography>
        <Typography>{description}</Typography>
      </CardContent>
    </Card>
  </Grid>
);

const ModuleCard = ({ icon, title, description, onclick }) => (
  <Grid item xs={12} sm={6} md={4} onClick={onclick}>
    <Card elevation={3} sx={{ height: "100%" }}>
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mb: 2,
            color: "primary.main",
          }}
        >
          {React.cloneElement(icon, { size: 48 })}
        </Box>
        <Typography variant="h5" align="center" gutterBottom>
          {title}
        </Typography>
        <Typography align="center">{description}</Typography>
      </CardContent>
    </Card>
  </Grid>
);

const StepCard = ({ number, title, description }) => (
  <Grid item xs={12} sm={6} md={3}>
    <Box textAlign="center">
      <Box
        sx={{
          width: 48,
          height: 48,
          borderRadius: "50%",
          bgcolor: "primary.main",
          color: "primary.contrastText",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mb: 2,
          mx: "auto",
        }}
      >
        <Typography variant="h5">{number}</Typography>
      </Box>
      <Typography variant="h5" gutterBottom>
        {title}
      </Typography>
      <Typography>{description}</Typography>
    </Box>
  </Grid>
);

const TestimonialCard = ({ quote, author }) => (
  <Grid item xs={12} md={4}>
    <Card elevation={3} sx={{ height: "100%" }}>
      <CardContent>
        <Typography variant="body1" paragraph>
          "{quote}"
        </Typography>
        <Typography variant="subtitle1">- {author}</Typography>
      </CardContent>
    </Card>
  </Grid>
);

const PricingCard = ({ title, price, features, highlighted = false }) => (
  <Grid item xs={12} sm={6} md={4}>
    <Card
      elevation={highlighted ? 8 : 3}
      sx={{
        height: "100%",
        border: highlighted ? 2 : 0,
        borderColor: "primary.main",
      }}
    >
      <CardContent>
        <Typography variant="h4" align="center" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h3" align="center" color="primary" gutterBottom>
          {price}
        </Typography>
        <List>
          {features.map((feature, index) => (
            <ListItem key={index}>
              <ListItemIcon>
                <Check color="primary" />
              </ListItemIcon>
              <ListItemText primary={feature} />
            </ListItem>
          ))}
        </List>
        <Button
          variant={highlighted ? "contained" : "outlined"}
          color="primary"
          fullWidth
          size="large"
        >
          Choose Plan
        </Button>
      </CardContent>
    </Card>
  </Grid>
);

export default LandingPage;
