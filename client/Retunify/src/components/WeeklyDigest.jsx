// WeeklyDigest.jsx – extracted component for later use (not imported in Homepage)
import React from 'react';
import { Box, Typography, Button, Paper, Stack, alpha } from '@mui/material';

export default function WeeklyDigest({ userName = 'Jesper', reviewsWritten = 38 }) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 3, md: 5 },
        borderRadius: 3,
        bgcolor: '#111111',
        border: '1px solid #1f1f1f',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 4,
        '&::before': {
          content: '""',
          position: 'absolute',
          top: -80,
          right: 200,
          width: 300,
          height: 300,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${alpha('#00e544', 0.1)} 0%, transparent 70%)`,
          pointerEvents: 'none',
        },
      }}
    >
      <Box sx={{ flex: 1, maxWidth: 520, zIndex: 1 }}>
        <Typography variant="overline" sx={{ color: '#00e544', letterSpacing: 3, fontWeight: 600, fontSize: 11 }}>
          Your weekly digest
        </Typography>
        <Typography variant="h3" sx={{ fontFamily: 'DM Serif Display, serif', color: '#fff', my: 1 }}>
          Keep the Music Playin'
        </Typography>
        {/* <Typography variant="body1" sx={{ mb: 3 }}>
          You have logged <strong style={{ color: '#00e544' }}>{loggedCount} albums</strong> this month.
        </Typography> */}
        <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
          {/* <Paper sx={{ p: 1.5, textAlign: 'center', bgcolor: '#1a1a1a', borderColor: '#1f1f1f', minWidth: 90 }} elevation={0}>
            <Typography variant="h5" fontWeight={700} sx={{ color: '#00e544' }}>{totalLogged}</Typography>
            <Typography variant="caption" sx={{ color: '#8a8a8a', textTransform: 'uppercase' }}>Total Logged</Typography>
          </Paper> */}
          {/* <Paper sx={{ p: 1.5, textAlign: 'center', bgcolor: '#1a1a1a', borderColor: '#1f1f1f', minWidth: 90 }} elevation={0}>
            <Typography variant="h5" fontWeight={700} sx={{ color: '#00e544' }}>{avgRating}</Typography>
            <Typography variant="caption" sx={{ color: '#8a8a8a', textTransform: 'uppercase' }}>Avg Rating</Typography>
          </Paper> */}
          <Paper sx={{ p: 1.5, textAlign: 'center', bgcolor: '#1a1a1a', borderColor: '#1f1f1f', minWidth: 90 }} elevation={0}>
            <Typography variant="h5" fontWeight={700} sx={{ color: '#00e544' }}>{reviewsWritten}</Typography>
            <Typography variant="caption" sx={{ color: '#8a8a8a', textTransform: 'uppercase' }}>Reviews Written</Typography>
          </Paper>
        </Stack>
        {/* <Button
          variant="contained"
          sx={{
            bgcolor: '#00e544',
            color: '#000',
            fontWeight: 700,
            '&:hover': { boxShadow: `0 0 24px ${alpha('#00e544', 0.5)}` },
          }}
        >
          Browse New Releases
        </Button> */}
      </Box>
      {/* Optional decorative stack – you can add the rotating records back if needed */}
    </Paper>
  );
}