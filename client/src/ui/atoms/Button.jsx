import * as React from 'react';
import PropTypes from 'prop-types';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Button as MuiButton } from '@mui/material';

const greys = {
  foreground: '#333',
  level4: 'rgba(51, 51, 51, 0.5)',
  level3: 'rgba(51, 51, 51, 0.25)',
  level1: 'rgba(51, 51, 51, 0.07)',
  background: '#fff'
}

let theme = createTheme({
  palette: {
    primary: {
      main: '#334ACC',
      dark: '#223289',
      contrastText: greys.background,
    },
    secondary: {
      main: '#E8EAF6',
      dark: '#C5CAE9',
    },
    error: {
      main: '#FCECE6',
      dark: '#FF5D5D',
      contrastText: '#FF5D5D'
    },
    success: {
      main: '#DBEBDB',
      dark: '#00A980',
      contrastText: '#00A980'
    },
    warning: {
      main: '#FFF5D2',
      dark: '#FFA726',
      contrastText: '#B28C09'
    },
  },
  typography: {
    button: {
      fontFamily: ['"Inter"', 'sans-serif'].join(','),
      fontSize: 15,
      textTransform: 'none',
      lineHeight: 1.375,
    }
  },

});

theme = createTheme(theme, {
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          // width: '72px',
          // height: '38px',
          padding: '6px 12px',
          boxShadow: 'none',
          '&:hover, &:active': {
            boxShadow: 'none'
          },
        },
        containedPrimary: {
          '&:hover, &:active': {
            color: theme.palette.secondary.main,
          },
          "&.Mui-disabled": {
            color: greys.level3,
            backgroundColor: greys.level1
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
          "&.Mui-disabled": {
            color: greys.level3,
            backgroundColor: greys.level1,
            borderStyle: 'none',
          },
        },
        containedError: {
          '&:hover, &:active': {
            color: greys.background,
          },
          '&:active': {
            backgroundColor: theme.palette.error.main,
            color: theme.palette.error.dark
          },
          "&.Mui-disabled": {
            color: greys.level3,
            backgroundColor: greys.level1
          },
        },
        outlinedError: {
          backgroundColor: greys.background,
          color: theme.palette.error.dark,
          borderColor: theme.palette.error.dark,
          '&:hover, &:active': {
            backgroundColor: '#FDE8E0',
            borderColor: theme.palette.error.dark,
          },
          "&.Mui-disabled": {
            color: greys.level3,
            backgroundColor: greys.background,
            borderColor: greys.level1
          },
        },
        containedSuccess: {
          // fontWeight: 600,
          '&:hover': {
            color: greys.background,
          },
          '&:active': {
            backgroundColor: theme.palette.success.main,
            color: theme.palette.success.dark
          },
          "&.Mui-disabled": {
            color: greys.level3,
            backgroundColor: greys.level1
          },
        },
        outlinedSuccess: {
          // fontWeight: 600,
          backgroundColor: greys.background,
          color: theme.palette.success.dark,
          borderColor: theme.palette.success.main,
          '&:hover, &:active': {
            backgroundColor: theme.palette.success.main,
            borderColor: theme.palette.success.dark
          },
          "&.Mui-disabled": {
            color: greys.level3,
            backgroundColor: greys.background,
            borderColor: greys.level1
          },
        },
        containedWarning: {
          // fontWeight: 600,
          '&:hover': {
            color: greys.background,
          },
          '&:active': {
            backgroundColor: theme.palette.warning.main,
            color: theme.palette.warning.dark
          },
          "&.Mui-disabled": {
            color: greys.level3,
            backgroundColor: greys.level1
          },
        },
        outlinedWarning: {
          // fontWeight: 600,
          backgroundColor: greys.background,
          color: theme.palette.warning.dark,
          borderColor: theme.palette.warning.dark,
          '&:hover, &:active': {
            backgroundColor: theme.palette.warning.main,
            borderColor: theme.palette.warning.dark,
          },
          "&.Mui-disabled": {
            color: greys.level3,
            backgroundColor: greys.background,
            borderColor: greys.level1
          },
        },
        sizeSmall: {
          fontSize: 14
        },
        sizeMedium: {
          fontSize: 15
        },
        sizeLarge: {
          fontSize: 16
        },
        iconSizeSmall: {
          '& > *:first-child': {
            fontSize: 10,
          },
        },
        iconSizeMedium: {
          '& > *:first-child': {
            fontSize: 12,
          },
        },
        iconSizeLarge: {
          '& > *:first-child': {
            fontSize: 14,
          },
        },
      },
    },
  },
})


// export function Button({ children, ...props }) {
//   return <MuiButton {...props}>{children}</MuiButton>;
// }

// export function Button(props) {
//   const { variant, color, disabled, onClick, label, size, startIcon, endIcon } = props;
//   return (
//     <ThemeProvider theme={customTheme}>
//       <MuiButton
//         variant={variant}
//         color={color}
//         disabled={disabled}
//         size={size}
//         onClick={onClick}
//         startIcon={startIcon && <AddIcon />}
//         endIcon={endIcon && <ArrowForwardIosIcon />}
//       // className={classes.button}
//       >
//         {label}
//       </MuiButton>
//     </ThemeProvider>
//   )
// }

export function Button({ children, startIcon, endIcon, ...props }) {
  return (
    <ThemeProvider theme={theme}>
      <MuiButton
        {...props}
        startIcon={startIcon && <AddIcon />}
        endIcon={endIcon && <ArrowForwardIosIcon />}
      >
        {children}
      </MuiButton>
    </ThemeProvider>
  )
}

Button.propTypes = {
  variant: PropTypes.string,
  color: PropTypes.string,
  size: PropTypes.string,
  onClick: PropTypes.func,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  startIcon: PropTypes.bool,
  endIcon: PropTypes.bool,
};

Button.defaultProps = {
  variant: 'contained',
  color: 'primary',
  size: 'medium',
  disabled: false,
  startIcon: false,
  endIcon: false
}


