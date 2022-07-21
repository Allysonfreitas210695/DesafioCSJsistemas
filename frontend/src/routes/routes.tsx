import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Atualizar } from '../pages/Atualizar';
import { Cadastro } from '../pages/Cadastro';
import { Home } from '../pages/Home';


export const RoutasApp = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/cadastro' element={<Cadastro/>}/>
        <Route path='/atualizar/:id' element={<Atualizar/>}/>
      </Routes>
    </BrowserRouter>
  )
}
