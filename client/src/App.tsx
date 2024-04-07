import theme from './styles/theme.ts';

import { Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';

import './App.css';

import {
  HomeDesktop,
} from './components';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path='/' element={<HomeDesktop/>}/>
        </Routes>
        <ToastContainer />
      </ThemeProvider>

    </>
  );
}

export default App;
