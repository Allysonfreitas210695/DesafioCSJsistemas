import React, { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../Api/api';
import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { Input } from '../../components/Input';
import { RemoverAcentos } from '../../utils';
import * as S from './styled';

export const Cadastro = () => {
  const [form, setForm] = useState({
    identificacao: "",
    cep: "",
    logradouro: "",
    numeroEndereco: "",
    complemento: "",
    bairro: "",
    cidade: "",
    capacidade: ""
  });
  const navigate = useNavigate();

  function handleChange(event: React.ChangeEvent<HTMLInputElement>){
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });

  }

 async function handleSubmit(event: FormEvent){
    event.preventDefault();

    const create =  await api.post('/locaisReciclagem', {
      identificacao: RemoverAcentos(form.identificacao),
      cep: form.cep,
      logradouro: RemoverAcentos(form.logradouro),
      numeroEndereco: form.numeroEndereco,
      complemento: RemoverAcentos(form.complemento),
      bairro: RemoverAcentos(form.bairro),
      cidade: RemoverAcentos(form.cidade),
      capacidade: Number(form.capacidade)
    } )

    const { data } = create;
    if(data){
      navigate("/")
    }
  }
 
  
  return (
    <S.Wrapper>
      <Header router='/' text='Volta'/>
      <S.Container>
        <h1>Cadastro</h1>
        <S.Form onSubmit={handleSubmit}>
          <Input type='text' 
            id="identificacao" 
            name="identificacao" 
            placeholder="identificação do local....."
            onChange={handleChange}
            value={form.identificacao}
            required
          />

          <Input type='text' 
            id="cep" 
            name="cep" 
            placeholder="Cep da cidade ex: 598100-000"
            onChange={handleChange}
            value={form.cep}
            required={false}
          />
  
          <Input type='text' 
            id="logradouro" 
            name="logradouro" 
            placeholder="informe o logradouro....."
            onChange={handleChange}
            value={form.logradouro}
            required={false}
          />
       
          <Input type='text' 
            id="numeroEndereco" 
            name="numeroEndereco" 
            placeholder="numero endereço....."
            onChange={handleChange}
            value={form.numeroEndereco}
            required={false}
          />
        
          <Input type='text' 
            id="complemento" 
            name="complemento" 
            placeholder="complemento do lugar....."
            onChange={handleChange}
            value={form.complemento}
          />
        
          <Input type='text' 
            id="bairro" 
            name="bairro" 
            placeholder="informe o bairro....."
            onChange={handleChange}
            value={form.bairro}
            required={false}
          />
        
          <Input type='text' 
            id="cidade" 
            name="cidade" 
            placeholder="informe a cidade....."
            onChange={handleChange}
            value={form.cidade}
          />
          
          <Input type='text' 
            id="capacidade" 
            name="capacidade" 
            placeholder="informe a capacidade....."
            onChange={handleChange}
            value={form.capacidade}
          />

          <Button text='Cadastro' router='/' type='submit' link={false}/>
        </S.Form>
      </S.Container>
    </S.Wrapper>
  )
}
