import { BrowserRouter, Outlet } from 'react-router-dom';
import { useState } from 'react';
// material
import { styled } from '@mui/material/styles';
import TopMenu from '../frontendPages/src/components/TopMenu';
import Header from '../frontendPages/src/components/Header';
import Footer from '../frontendPages/src/components/Footer';

// ----------------------------------------------------------------------
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import '../frontendPages/src/App.min.css';
// ----------------------------------------------------------------------

export default function DashboardLayout() {
  const [open, setOpen] = useState(false);

  return (
    <React.Fragment>
      <Header />
      <TopMenu />
      <Outlet />
      <Footer />
    </React.Fragment>
  );
}
