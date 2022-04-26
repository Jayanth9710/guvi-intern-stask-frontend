import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import Home from './Components/Home';
import Register from './Components/Register';
import Login from './Components/Login';
import Profile from './Components/Profile';


function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Home/>} exact={true}/>
        <Route path='/signup' element={<Register/>} exact={true}/>
        <Route path='/signin' element={<Login/>} exact={true}/>
        <Route path='/:id' element={<Profile/>} exact={true}/>
      </Routes>
    </Router>
    </>
  )
}

export default App;
