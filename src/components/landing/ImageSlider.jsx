import { useState, useEffect } from 'react';
import { Box, Paper, Typography, IconButton } from '@mui/material';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';

const slides = [
  {
    image: 'https://images.unsplash.com/photo-1695654393816-2c6bfe301c32?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZGVsaXZlcnklMjBiYWd8ZW58MHx8MHx8fDA%3D',
    title: 'Intuitive Dashboard',
    description: 'Get a complete overview of your operations at a glance',
  },
  {
    image: 'https://images.unsplash.com/photo-1695653420644-ab3d6a039d53?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Inventory Management',
    description: 'Track your raw materials and finished products efficiently',
  },
  {
    image: 'https://images.unsplash.com/photo-1695654402273-524fb7dd05dc?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Production Tracking',
    description: 'Monitor every stage of your manufacturing process',
  },
];

export default function ImageSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handlePrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <Paper
      sx={{
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 2,
      }}
    >
      <Box
        sx={{
          position: 'relative',
          height: { xs: 300, md: 400 },
        }}
      >
        {slides.map((slide, index) => (
          <Box
            key={index}
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              opacity: currentSlide === index ? 1 : 0,
              transition: 'opacity 0.5s ease-in-out',
              backgroundImage: `url(${slide.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                p: 3,
                background: 'rgba(0, 0, 0, 0.7)',
                color: 'white',
              }}
            >
              <Typography variant="h5" gutterBottom>
                {slide.title}
              </Typography>
              <Typography variant="body1">
                {slide.description}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>

      <IconButton
        onClick={handlePrevious}
        sx={{
          position: 'absolute',
          left: 8,
          top: '50%',
          transform: 'translateY(-50%)',
          color: 'white',
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
        }}
      >
        <KeyboardArrowLeft />
      </IconButton>

      <IconButton
        onClick={handleNext}
        sx={{
          position: 'absolute',
          right: 8,
          top: '50%',
          transform: 'translateY(-50%)',
          color: 'white',
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
        }}
      >
        <KeyboardArrowRight />
      </IconButton>
    </Paper>
  );
}