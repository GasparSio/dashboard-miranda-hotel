import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from './Components/Login';
import { Home } from './Components/Home';
import { Dashboard } from './Components/Dashboard/Dashboard';
import { Rooms } from './Components/Rooms';
import { Bookings } from './Components/Bookings';
import { Users } from './Components/Users';
import { Contact } from './Components/Contact';
import { AuthProvider } from './Components/auth';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/dashboard-miranda' element={<Home/>} />
          <Route path='/home' element={<Home/>}>
            <Route path='dashboard' element={<Dashboard/>} />  
            <Route path='bookings' element={<Bookings/>} />  
            <Route path='rooms' element={<Rooms/>} />  
            <Route path='contact' element={<Contact/>} />  
            <Route path='users' element={<Users/>} />  
          </Route>
          <Route path='*' element={<Login/>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
