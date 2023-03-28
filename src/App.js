import logo from './logo.svg';
import './App.css';
import SignUp from './components/pages/SignUp';
import { Routes,Route, } from 'react-router-dom';
import Login from './components/pages/Login';
import Home from './components/pages/Home';

function App() {
  return (
    <div className="App">
      <header>
        MailBox Client
      </header>
      
      <Routes>
        <Route path='/' element={<SignUp/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/home' element={<Home/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
