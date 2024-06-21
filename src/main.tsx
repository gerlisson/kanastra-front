import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter,Route, Routes } from 'react-router-dom'
import { Home } from './containers/home.tsx';
import { Upload } from './containers/upload.tsx';
import { FileProvider } from './components/ui/file';
import { Grid } from '@mui/material';
import { Navigation } from './components/ui/navigation'
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  
  <React.StrictMode>
    <FileProvider>
      <BrowserRouter>
        <Grid container spacing={2}>
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/upload" element={<Upload />} />
          </Routes>
        </Grid>
      </BrowserRouter>
    </FileProvider>
  </React.StrictMode>
)
