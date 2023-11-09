import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from './Components/Login-Logout/Login';
import { Home } from './Components/Home/Home';
import { Dashboard } from './Components/Dashboard/Dashboard';
import { Rooms } from './Components/Rooms/Rooms';
import { Bookings } from './Components/Bookings/Bookings';
import { BookingDetail } from './Components/Bookings/BookingDetail';
import { Users } from './Components/Users/Users';
import { Contact } from './Components/Contact/Contact';
import { AuthProvider } from './Components/Login-Logout/auth';


function App(): JSX.Element{
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<Login/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/dashboard-miranda-hotel' element={<Login/>} />
          <Route path='/home' element={<Home/>}>
            <Route path='dashboard' element={<Dashboard/>} />  
            <Route path='bookings' element={<Bookings />} />  
            <Route path='bookings/:id' element={<BookingDetail />} />
            <Route path='rooms' element={<Rooms />} />  
            <Route path='contacts' element={<Contact />} />  
            <Route path='users' element={<Users />} />  
          </Route>
          {/* <Route path='*' element={<Login/>} /> */}
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;