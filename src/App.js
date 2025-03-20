import React from 'react';
import { ThemeProvider, createTheme, CssBaseline, Box } from '@mui/material';
import Header from './Components/Header/Header';
import Main from './Components/Main/Main';
import Footer from './Components/Footer/Footer';

const theme = createTheme({
    typography: {
        fontFamily: "'Lora', serif",
        h1: { fontFamily: "'Abril Fatface', serif", fontSize: "3.5rem", fontWeight: 400 },
        h2: { fontFamily: "'Abril Fatface', serif", fontSize: "3rem", fontWeight: 400 },
        h3: { fontFamily: "'Abril Fatface', serif", fontSize: "2.5rem", fontWeight: 400 },
        body1: { fontSize: "1.2rem" }, // Было 1rem
        body2: { fontSize: "1rem" }, // Было 0.875rem
    },
    palette: {
        primary: { main: '#3f51b5' },
        secondary: { main: '#4b6076' },
    },
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Header />
                <Main />
                {/*<Footer />*/}
            </Box>
        </ThemeProvider>
    );
}

export default App;
