import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from './Components/Login-Logout/Login';
import { Home } from './Components/Home/Home';
import { Dashboard } from './Components/Dashboard/Dashboard';
import { Rooms } from './features/rooms/Rooms';
import { Bookings } from './features/bookings/Bookings';
import { Users } from './features/users/Users';
import { Contact } from './features/contact/Contact.jsx';
import { AuthProvider } from './Components/Login-Logout/auth';


function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/dashboard-miranda-hotel' element={<Home/>} />
          <Route path='/home' element={<Home/>}>
            <Route path='dashboard' element={<Dashboard/>} />  
            <Route path='bookings' element={<Bookings />} />  
            <Route path='rooms' element={<Rooms />} />  
            <Route path='contact' element={<Contact />} />  
            <Route path='users' element={<Users />} />  
          </Route>
          <Route path='*' element={<Login/>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
