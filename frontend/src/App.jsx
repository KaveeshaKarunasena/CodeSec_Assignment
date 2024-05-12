import { useState } from 'react'
import { Route, Routes } from 'react-router-dom';
import SignIn from './components/userManagement/SignIn'
import SignUp from './components/userManagement/Sigup';
import Home from './components/userManagement/Home';
import Header from './components/templates/Header';
import Favourites from './components/userManagement/Favourites';
import { GuestGuard, PrivateGuard } from './auth/AuthGuard';
import { ResetPassword } from './components/userManagement/ResetPassowrd';

function UserRoute() {
  return (
    <PrivateGuard>
      <Header/>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/favourites" element={<Favourites />} />
      </Routes>
    </PrivateGuard>
  );
}

function GuestRoute() {
  return (
    <GuestGuard>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/reset/password" element={<ResetPassword />} />
      </Routes>
    </GuestGuard>
  );
}

function App() {

  return (
    <div >
      <Routes>
        <Route path="user/*" element={<UserRoute />} />
        <Route path="*" element={<GuestRoute />} />
      </Routes>
    </div>
  );
}

export default App
