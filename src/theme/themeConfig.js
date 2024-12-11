
import React, { useContext } from 'react';
import { ThemeProvider, createTheme, responsiveFontSizes } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { StyledEngineProvider } from '@mui/material/styles';
import getDesignTokens from './theme';
import { ThemeContext } from '../context/ThemeContext';

function ThemeConfig({ children }) {

  const { mode } = useContext(ThemeContext);

  const theme = React.useMemo(
    () => responsiveFontSizes(createTheme(getDesignTokens(mode))
    ), [mode]);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>

  )
}

export default ThemeConfig;
