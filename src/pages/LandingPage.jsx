import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Box,
  Button,
  Container,
  Fab,
  IconButton,
  Toolbar,
  Typography,
  useTheme,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Slide,
  useScrollTrigger,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Brightness4,
  Brightness7,
  KeyboardArrowUp,
  Facebook,
  Twitter,
  Instagram,
} from '@mui/icons-material';
import { useColorMode } from '../contexts/ColorModeContext';
import HeroSection from '../components/landing/HeroSection';
import AboutSection from '../components/landing/AboutSection';
import FeaturesSection from '../components/landing/FeaturesSection';
import ContactSection from '../components/landing/ContactSection';
import ImageSlider from '../components/landing/ImageSlider';
import ScrollTop from '../components/landing/ScrollTop';

function HideOnScroll({ children }) {
  const trigger = useScrollTrigger();
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

export default function LandingPage() {
  const navigate = useNavigate();
  const theme = useTheme();
  const { toggleColorMode } = useColorMode();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Features', href: '#features' },
    { label: 'Inquiry', href: '#contact' },
  ];

  const handleMenuClick = (href) => {
    setMobileMenuOpen(false);
    document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Box>
      <HideOnScroll>
        <AppBar>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              BagMaster Pro
            </Typography>

            {isMobile ? (
              <IconButton
                color="inherit"
                edge="start"
                onClick={() => setMobileMenuOpen(true)}
              >
                <MenuIcon />
              </IconButton>
            ) : (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                {menuItems.map((item) => (
                  <Button
                    key={item.label}
                    color="inherit"
                    onClick={() => handleMenuClick(item.href)}
                  >
                    {item.label}
                  </Button>
                ))}
                <Button
                  variant="outlined"
                  color="inherit"
                  onClick={() => navigate('/login')}
                >
                  Login
                </Button>

                <IconButton color="inherit" onClick={toggleColorMode}>
                  {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
                </IconButton>
              </Box>
            )}
          </Toolbar>
        </AppBar>
      </HideOnScroll>

      <Drawer
        anchor="right"
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      >
        <List sx={{ width: 250 }}>
          {menuItems.map((item) => (
            <ListItem
              button
              key={item.label}
              onClick={() => handleMenuClick(item.href)}
            >
              <ListItemText primary={item.label} />
            </ListItem>
          ))}
          <ListItem button onClick={() => navigate('/login')}>
            <ListItemText primary="Login" />
          </ListItem>
          <ListItem button onClick={() => navigate('/register')}>
            <ListItemText primary="Sign Up" />
          </ListItem>
        </List>
      </Drawer>

      <Toolbar id="back-to-top-anchor" />

      <Container maxWidth="lg">
        <Box id="home" sx={{ my: 8 }}>
          <HeroSection />
        </Box>

        <Box id="about" sx={{ my: 8 }}>
          <AboutSection />
        </Box>

        <Box sx={{ my: 8 }}>
          <ImageSlider />
        </Box>

        <Box id="features" sx={{ my: 8 }}>
          <FeaturesSection />
        </Box>

        <Box id="contact" sx={{ my: 8 }}>
          <ContactSection />
        </Box>
      </Container>
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: 4,
          backgroundColor: theme.palette.primary.main,
          color: 'white',
          textAlign: 'center',
        }}
      >
        <Typography variant="body2">
          &copy; {new Date().getFullYear()} BagMaster Pro. All rights reserved.
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 2 }}>
          <IconButton color="inherit">
            <Facebook />
          </IconButton>
          <IconButton color="inherit">
            <Twitter />
          </IconButton>
          <IconButton color="inherit">
            <Instagram />
          </IconButton>
        </Box>
      </Box>
      <ScrollTop>
        <Fab color="secondary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUp />
        </Fab>
      </ScrollTop>
    </Box>
  );
}