import { alpha, createTheme, responsiveFontSizes } from '@mui/material/styles'
import type { Theme } from '@mui/material/styles'

const baseTheme = createTheme({
  palette: {
    primary: { main: '#E53935' },
    secondary: { main: '#0F172A' },
    background: { default: '#F8FAFC' },
  },
  typography: {
    fontFamily: ['Poppins', 'system-ui', 'Arial', 'sans-serif'].join(','),
    h1: { fontWeight: 800 },
    h2: { fontWeight: 800 },
    h3: { fontWeight: 700 },
    h4: { fontWeight: 700 },
    button: { textTransform: 'none', fontWeight: 700 },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 10px rgba(15, 23, 42, 0.08)',
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#F8FAFC',
        },
      },
    },
  },
})

export const appTheme: Theme = responsiveFontSizes(
  createTheme({
    ...baseTheme,
    palette: {
      ...baseTheme.palette,
      background: { default: '#F8FAFC' },
      divider: alpha('#0F172A', 0.12),
    },
  })
)

