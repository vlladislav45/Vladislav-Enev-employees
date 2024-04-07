/* eslint-disable quotes */
import { createTheme, Theme } from '@mui/material/styles';
import React from 'react';

declare module '@mui/material/styles' {
    interface Palette {
        dark: React.CSSProperties['color'];
        grayDark: React.CSSProperties['color'];
        grayMedium: React.CSSProperties['color'];
        grayLight: React.CSSProperties['color'];
        white: React.CSSProperties['color'];
        red: React.CSSProperties['color'];
        green: React.CSSProperties['color'];
    }

    // allow configuration using `createTheme`
    interface PaletteOptions {
        dark: React.CSSProperties['color'];
        grayDark: React.CSSProperties['color'];
        grayMedium: React.CSSProperties['color'];
        grayLight: React.CSSProperties['color'];
        white: React.CSSProperties['color'];
        red: React.CSSProperties['color'];
        green: React.CSSProperties['color'];
    }
}

declare module '@mui/material/Button' {
    interface ButtonPropsVariantOverrides {
        containedSecondary: true;
    }
}

const primaryColor = '#166AEA'; // You can adjust this primary color
const secondaryColor = '#6C757D'; // You can adjust this secondary color
const whiteColor = '#FFFFFF';
const darkColor = '#000'; // Change this to a darker shade near black
const grayColor = '#444'; // Change this to a darker shade near black

// @ts-ignore
const theme = createTheme({
  typography: {
    fontFamily: [
      'sans-serif',
    ].join(','),
    h2: {
      fontSize: 36,
      fontWeight: 500,
    },
    h4: {
      fontSize: 24,
      fontWeight: 500,
    },
    h6: { lineHeight: 1.2 },
    subtitle1: {
      fontSize: 16,
      fontWeight: 700,
    },
    subtitle2: {
      fontSize: 14,
      fontWeight: 700,
    },
    caption: {
      fontSize: 12,
      lineHeight: 1.4,
      display: 'block',
    },
  },
  palette: {
    primary: {
      main: primaryColor,
    },
    secondary: {
      main: secondaryColor,
    },
    background: {
      default: whiteColor,
    },
    text: {
      primary: grayColor,
    },
  },
  components: {
    MuiContainer: { defaultProps: { maxWidth: 'xl' } },
    MuiButton: {
      variants: [
        {
          props: { variant: 'containedSecondary' },
          style: {
            "backgroundColor": secondaryColor,
            "color": whiteColor,
            '&:hover': {
              backgroundColor: primaryColor,
            },
          },
        },
      ],
      defaultProps: {
        color: 'primary',
        variant: 'contained',
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: 30,
          fontWeight: 700,
        },
        sizeLarge: {
          paddingTop: 16,
          paddingBottom: 14,
          paddingLeft: 22,
          paddingRight: 22,
        },
        outlined: { borderColor: primaryColor },
      },
    },
    MuiTooltip: {
      defaultProps: {
        enterTouchDelay: 0,
        enterDelay: 0,
        leaveTouchDelay: 5000,
      },
      styleOverrides: {
        tooltip: {
          backgroundColor: darkColor, // Use the 'darkColor' constant here
          color: whiteColor,
          padding: '18px',
          borderRadius: '20px',
          boxShadow: '3px 3px 7px rgba(0, 0, 0, 0.25)',
          textAlign: 'center',
          fontSize: '12px',
        },
      },
    },
    // Other component styles can be customized here
  },
} as Theme);

export default theme;
