import { CircularProgress, Box } from '@mui/material';

export const Loader = () => {
  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      height: '600px'
    }}>
      <CircularProgress />
    </Box>
  );
};



