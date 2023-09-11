import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from './Components/Login';
import { Home } from './Components/Home';
import { Dashboard } from './Components/Dashboard';
import { Room } from './Components/Room';
import { Bookings } from './Components/Bookings';
import { Guest } from './Components/Guest';
import { Concierge } from './Components/Concierge';
import { AuthProvider } from './Components/auth';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<Login/>} />
          <Route path='/dashboard-miranda' element={<Login/>} />
          <Route path='/home' element={<Home/>}>
            <Route path='dashboard' element={<Dashboard/>} />  
            <Route path='room' element={<Room/>} />  
            <Route path='bookings' element={<Bookings/>} />  
            <Route path='guest' element={<Guest/>} />  
            <Route path='concierge' element={<Concierge/>} />  
          </Route>
          <Route path='*' element={<Login/>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
