import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Cadastro } from '../pages/Cadastro';
import { Home } from '../pages/Home';


export const RoutasApp = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/cadastro' element={<Cadastro/>}/>
      </Routes>
    </BrowserRouter>
  )
}
