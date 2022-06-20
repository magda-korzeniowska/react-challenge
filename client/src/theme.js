import { createTheme } from '@mui/material';

let theme = createTheme({
  shape: {
    borderRadius: 4,
  },
  palette: {
    text: {
      primary: '#333',
    },
    type: 'light',
    primary: {
      main: '#334ACC',
      dark: '#223289',
      light: '#e6f0fd',
      contrastText: '#fff',
    },
    secondary: {
      main: '#E8EAF6',
      dark: '#C5CAE9',
      light: '#e6f0fd',
      contrastText: '#fff',
    },
    error: {
      main: '#FF5D5D',
      light: '#FCECE6',
      contrastText: '#fff',
    },
    success: {
      main: '#66BB6A',
      dark: '#00A980',
      light: '#DBEBDB',
      contrastText: '#fff',
    },
    warning: {
      main: '#FFA726',
      dark: '#B28C09',
      light: '#FFF5D2',
      contrastText: '#fff',
    },
    background: {
      default: '#F8F8F8',
      secondary: '#fff',
    },
    grey: {
      level1: 'rgba(51, 51, 51, 0.07)',
      level3: 'rgba(51, 51, 51, 0.25)',
      level4: 'rgba(51, 51, 51, 0.5)',
    },
  },
});

theme = createTheme(theme, {
  typography: {
    fontSize: 16,
    fontWeightLight: 300,
    h1: {
      fontWeight: 700,
      lineHeight: 1.2,
      fontSize: '2.25rem',
      letterSpacing: '-0.1rem',
    },
    h2: {
      fontWeight: 700,
      fontSize: '2.074rem',
    },
    h3: {
      fontWeight: 700,
      fontSize: '1.728rem',
    },
    h4: {
      fontWeight: 700,
      fontSize: '1.44rem',
    },
    h5: {
      fontSize: '1.44rem',
    },
    h6: {
      fontSize: '1.44rem',
    },
    body1: {
      fontFamily: 'Inter, sans-serif',
      fontSize: '1.2rem',
    },
    button: {
      fontFamily: 'Inter, sans-serif',
      textTransform: 'none',
      lineHeight: 1.375,
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#fff',
          color: '#333',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          padding: '6px 12px',
          boxShadow: 'none',
          minWidth: '34px',
          '&:hover, &:active': {
            boxShadow: 'none',
          },
          '&.Mui-disabled': {
            backgroundColor: theme.palette.grey.level1,
            color: theme.palette.grey.level3,
          },
        },
        outlined: {
          '&.Mui-disabled': {
            backgroundColor: theme.palette.background.secondary,
            color: theme.palette.grey.level3,
            borderColor: theme.palette.grey.level1,
          },
        },
        containedPrimary: {
          '&:hover, &:active': {
            color: theme.palette.secondary.main,
          },
        },
        outlinedPrimary: {
          backgroundColor: theme.palette.secondary.main,
          borderStyle: 'none',
          '&:hover, &:active': {
            backgroundColor: theme.palette.secondary.dark,
            color: theme.palette.primary.dark,
            borderStyle: 'none',
          },
          '&.Mui-disabled': {
            backgroundColor: theme.palette.grey.level1,
            borderStyle: 'none',
          },
        },
        containedError: {
          backgroundColor: theme.palette.error.light,
          color: theme.palette.error.main,
          '&:hover': {
            backgroundColor: theme.palette.error.main,
            color: theme.palette.error.contrastText,
          },
          '&:active': {
            backgroundColor: theme.palette.error.light,
            color: theme.palette.error.main,
          },
        },
        outlinedError: {
          backgroundColor: theme.palette.background.secondary,
          borderColor: theme.palette.error.main,
          '&:hover, &:active': {
            backgroundColor: theme.palette.error.light,
          },
        },
        containedSuccess: {
          fontWeight: 600,
          backgroundColor: theme.palette.success.light,
          color: theme.palette.success.dark,
          '&:hover': {
            backgroundColor: theme.palette.success.dark,
            color: theme.palette.error.contrastText,
          },
          '&:active': {
            backgroundColor: theme.palette.success.light,
            color: theme.palette.success.dark,
          },
        },
        outlinedSuccess: {
          fontWeight: 600,
          backgroundColor: theme.palette.background.secondary,
          color: theme.palette.success.dark,
          borderColor: theme.palette.success.main,
          '&:hover, &:active': {
            backgroundColor: theme.palette.success.light,
            color: theme.palette.success.dark,
          },
        },
        containedWarning: {
          fontWeight: 600,
          backgroundColor: theme.palette.warning.light,
          color: theme.palette.warning.dark,
          '&:hover': {
            backgroundColor: theme.palette.warning.main,
            color: theme.palette.warning.contrastText,
          },
          '&:active': {
            backgroundColor: theme.palette.warning.light,
            color: theme.palette.warning.dark,
          },
        },
        outlinedWarning: {
          fontWeight: 600,
          backgroundColor: theme.palette.background.secondary,
          color: theme.palette.warning.main,
          borderColor: theme.palette.warning.main,
          '&:hover, &:active': {
            backgroundColor: theme.palette.warning.light,
          },
        },
        startIcon: {
          '& > *:first-of-type': {
            fontSize: 'inherit',
          },
          padding: '6px 0px',
        },
        endIcon: {
          '& > *:first-of-type': {
            fontSize: '10px',
          },
          padding: '6px 0px',
          marginRight: '0px',
          marginLeft: '0px',
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: theme.shape.borderRadius,
          color: theme.palette.grey['500'],
          ':hover': {
            borderRadius: 0,
            backgroundColor: 'transparent',
            color: theme.palette.primary.main,
          },
          '&.Mui-selected': {
            borderRadius: 0,
            backgroundColor: 'transparent',
            borderBottom: '2px solid #0666eb',
            color: theme.palette.primary.main,
          },
          '.MuiTypography-root': {
            fontWeight: '500',
            fontSize: '14px',
          },
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: '#33333350',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          padding: '40px 32px',
          border: 'none',
          boxShadow: theme.shadows[3],
        },
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        root: {
          padding: '0',
          fontSize: '24px',
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: '0',
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          borderRadius: theme.shape.borderRadius,
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            backgroundColor: '#F9FAFD',
          },
        },
      },
    },
  },
});

export { theme };
