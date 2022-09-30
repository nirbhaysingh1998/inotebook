import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import SignUp from './components/SignUp';
import { useState } from 'react';

function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }

  return (



    <NoteState>
      <BrowserRouter>

        <Navbar title="iNoteBook" />
        <Alert alert={alert} />
        <div className='container'>
          <Routes>
            <Route exact path='/home' element={<Home heading="My iNoteBook App" showAlert={showAlert} />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path='/login' element={<Login showAlert={showAlert} />} />
            <Route exact path='/signup' element={<SignUp showAlert={showAlert} />} />
          </Routes>
        </div>
      </BrowserRouter >

    </NoteState >
  );
}

export default App;
