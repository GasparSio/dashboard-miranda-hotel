import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from './Components/Login-Logout/Login';
import { Home } from './Components/Home/Home';
import { Dashboard } from './Components/Dashboard/Dashboard';
import { Rooms } from './Components/Rooms/Rooms';
import { Bookings } from './Components/Bookings/Bookings';
import { Users } from './Components/Users/Users';
import { Contact } from './Components/Contact/Contact';
import { AuthProvider } from './Components/Login-Logout/auth';
import data from './Components/Rooms/MOCK_DATA.json';
import usersdata from './Components/Users/UsersData.json';
import bookingdata from './Components/Bookings/BokkingData.json';
import contactdata from './Components/Contact/ContactReviews.json'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/dashboard-miranda-hotel' element={<Home/>} />
          <Route path='/home' element={<Home/>}>
            <Route path='dashboard' element={<Dashboard/>} />  
            <Route path='bookings' element={<Bookings data={bookingdata}/>} />  
            <Route path='rooms' element={<Rooms data={data}/>} />  
            <Route path='contact' element={<Contact data={contactdata}/>} />  
            <Route path='users' element={<Users data={usersdata}/>} />  
          </Route>
          <Route path='*' element={<Login/>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
