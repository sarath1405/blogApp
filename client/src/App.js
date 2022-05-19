import Home from './components/Home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import Feedback from './components/Feedback'
import Uhome from './components/user/Uhome'
import Create from './components/user/Create'
import MyBlogs from './components/user/MyBlogs'

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Home/>}></Route>
        <Route exact path='/login' element={<LoginPage/>}></Route>
        <Route exact path='/signup' element={<SignupPage/>}></Route>
        <Route exact path='/create' element={<Create/>}></Route>
        <Route exact path='/feedback' element={<Feedback/>}></Route>
        <Route exact path='/home' element={<Uhome/>}></Route>
        <Route exact path='/myBlogs' element={<MyBlogs/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
