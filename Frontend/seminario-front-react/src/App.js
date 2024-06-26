// En el App.js, supongamos que tienes una función para obtener los datos del usuario
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from './components/Signup';
import Login from "./components/Login";
import UserPage from "./components/UserPage";
import EditPerfil from "./components/EditPerfil";
import CreateDocument from "./components/CreateDocument";
import EditDocument from "./components/EditDocument";
import DelDocument from "./components/DelDocument";
import PrivateRoute from './auth/PrivateRoute';
import './App.css';
import ChatbotPopup from './components/Chatbot';

function App() {
  const [userData, setUserData] = useState(null);
  //const [albumData, setAlbumData] = useState(null);
  //const [albumDataFoto, setAlbumDataFoto] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await fetch(`http://localhost:5000/editperfil/getperfil?id=${token}`);
          if (response.ok) {
            const userData = await response.json();
            setUserData(userData);
          } else {
            throw new Error('Error al obtener los datos del usuario');
          }
        }
      } catch (error) {
        console.error('Error al obtener los datos del usuario:', error);
      }
    };

    /*
    const fetchArticulosData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await fetch(`http://localhost:5000/editalbum/getalbum?id=${token}`);
          if (response.ok) {
            const albumData = await response.json();
            setAlbumData(albumData);
          } else {
            throw new Error('Error al obtener los datos del usuario');
          }
        }
      } catch (error) {
        console.error('Error al obtener los datos del usuario:', error);
      }
    };

    const fetchPublicadosData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await fetch(`http://localhost:5000/loadphoto/watchphoto?id=${token}`);
          if (response.ok) {
            const albumfoto = await response.json();
            setAlbumDataFoto(albumfoto);
          } else {
            throw new Error('Error al obtener los datos del usuario');
          }
        }
      } catch (error) {
        console.error('Error al obtener los datos del usuario:', error);
      }
    };
    */

    fetchUserData();
    //fetchArticulosData();
    //fetchPublicadosData();
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          {/* Rutas protegidas */}
          <Route path='/userpage' element={<PrivateRoute><UserPage userData={userData} /></PrivateRoute>} />
          <Route path='/editperfil' element={<PrivateRoute><EditPerfil userData={userData} /></PrivateRoute>} />
          <Route path='/createdocument' element={<PrivateRoute><CreateDocument /></PrivateRoute>} />
          <Route path='/editdocument' element={<PrivateRoute><EditDocument /></PrivateRoute>} />
          <Route path='/deldocument' element={<PrivateRoute><DelDocument  /></PrivateRoute>} />
        </Routes>
      </BrowserRouter>
      <ChatbotPopup />
    </>
  );
}

export default App;
