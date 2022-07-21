import React, { FormEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../../Api/api';
import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { Input } from '../../components/Input';
import { RemoverAcentos } from '../../utils';
import * as S from './styled';

export const Atualizar = () => {
  const { id } = useParams();
  const [erros, setErros] = useState(false);
  const [form, setForm] = useState({
    localReciclagem_id: "",
    identificacao: "",
    cep: "",
    logradouro: "",
    numeroEndereco: "",
    complemento: "",
    bairro: "",
    cidade: "",
    capacidade: ""
  });

  useEffect(() => {
    api.get(`/locaisReciclagem/${id}`)
    .then(response => {
      const { data } = response;
      setForm(data);
    }).catch((error) => {
      setErros(true)
    })
  }, [id]);
  
 
console.log(form);

  const navigate = useNavigate();

  function handleChange(event: React.ChangeEvent<HTMLInputElement>){
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });

  }

 async function handleSubmit(event: FormEvent){
    event.preventDefault();

    const update =  await api.put(`/locaisReciclagem/${id}`, {
      identificacao: RemoverAcentos(form.identificacao),
      cep: form.cep,
      logradouro: RemoverAcentos(form.logradouro),
      numeroEndereco: form.numeroEndereco,
      complemento: RemoverAcentos(form.complemento),
      bairro: RemoverAcentos(form.bairro),
      cidade: RemoverAcentos(form.cidade),
      capacidade: Number(form.capacidade)
    } )

    const { data } = update;
    if(data){
      navigate("/")
    }
  }
 
  
  return (
   <>
   {!erros ? (
     <S.Wrapper>
     <Header router='/' text='Volta'/>
     <S.Container>
       <h1>Atualizar</h1>
       <S.Form onSubmit={handleSubmit}>
         <Input type='text' 
           id="identificacao" 
           name="identificacao" 
           placeholder="identificação do local....."
           onChange={handleChange}
           value={form.identificacao || ""}
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
           value={form.logradouro || ""}
           required={false}
         />
      
         <Input type='text' 
           id="numeroEndereco" 
           name="numeroEndereco" 
           placeholder="numero endereço....."
           onChange={handleChange}
           value={form.numeroEndereco || ""}
           required={false}
         />
       
         <Input type='text' 
           id="complemento" 
           name="complemento" 
           placeholder="complemento do lugar....."
           onChange={handleChange}
           value={form.complemento || ""}
           required={false}
         />
       
         <Input type='text' 
           id="bairro" 
           name="bairro" 
           placeholder="informe o bairro....."
           onChange={handleChange}
           value={form.bairro || ""}
           required={false}
         />
       
         <Input type='text' 
           id="cidade" 
           name="cidade" 
           placeholder="informe a cidade....."
           onChange={handleChange}
           value={form.cidade || ""}
         />
         
         <Input type='text' 
           id="capacidade" 
           name="capacidade" 
           placeholder="informe a capacidade....."
           onChange={handleChange}
           value={form.capacidade || ""}
         />

         <Button text='Atualizar' router='/' type='submit' link={false}/>
       </S.Form>
     </S.Container>
   </S.Wrapper>
   ) : (
     <>
     <h1 style={{color: 'white'}}>Erro no local ou no parametro passado aqui</h1>
      { setTimeout(() => {
        navigate('/')
      }, 3000) }
      </>
   )}
   </>
  )
}
