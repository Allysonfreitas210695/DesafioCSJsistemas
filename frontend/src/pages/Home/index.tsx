import { useEffect, useState } from 'react';
import { api } from '../../Api/api';
import { Header } from '../../components/Header';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'react-toastify/dist/ReactToastify.min.css'; 
import { toast, ToastContainer } from 'react-toastify';
import * as S from './styled';
import { Link } from 'react-router-dom';


interface ILocaisReciclagem {
  localReciclagem_id: number;
  identificacao: String;
  cep: String;
  logradouro: String;
  numeroEndereco: String;
  complemento: String;
  bairro: String;
  cidade: String;
  capacidade: String;
  createdAt: String;
  updatedAt: String;
  lat: number;
  lng: number;
}

export const Home = () => {
  const [locaisReciclagem, setLocaisReciclagem] = useState<ILocaisReciclagem[]>([]);
  const [erros, setErros] = useState(false);
  
  
  useEffect(() => {
    
    api.get('/locaisReciclagem')
    .then(response => {
      setLocaisReciclagem(response.data);
    }).catch((error) => {
      setErros(true)
    })
  
  }, [ locaisReciclagem ]);

  function handleDelete(event: React.MouseEvent<HTMLButtonElement, MouseEvent>,id: any | string ){
    api.delete(`/locaisReciclagem/${id}`)
    .then(Response => {
      const newArrayLocais = locaisReciclagem.filter((local:any) => {
        if(local.id !== Number(id)){
          return local
        }
      })

      console.log(Response.data);
      toast.success(`${id} deletado com sucesso`)
      setLocaisReciclagem(newArrayLocais);
    }).catch((error) => {
      toast.error(`${id} error ao deleta`)
    })
    
  
  }
  
  return (
    <>
      {!erros && locaisReciclagem.length === 0 && (
        <p style={{color: 'white', fontSize: '19px', fontWeight: 'bold'}}>Loading.....</p>
      )}
      {
        erros && (<h1 style={{color: 'white'}}>Erro de Conexão com BD</h1>)
      }
      {(!erros && locaisReciclagem.length > 0) && (
        <S.Wrapper>
        <Header router='/cadastro' text='Cadastro Novo Local'/>
        <S.Container>
        <MapContainer style={{width: '100%', height: '100%'}} center={[-23.2353205, -45.8919099]} zoom={10} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
         {locaisReciclagem.map(local => {
          return (
            <Marker position={[local.lat, local.lng]} key={local.lng}>
              
              <Popup>
                <h2>{local.identificacao}</h2>
                <span> {local.cep ? `CEP: ${local.cep}` : ''}</span> <br />
                <span>{local.logradouro ? local.logradouro : ""} - </span>
                <span>{local.numeroEndereco ? local.numeroEndereco : ""}</span> <br />
                <span>{local.complemento}</span> <br />
                <span>{local.bairro}</span> <br />
                <span>{local.cidade}</span> <br />
                <span>{local.capacidade}</span> <br />
                <ToastContainer />
                <S.Button>
                  <Link to={`/atualizar/${local.localReciclagem_id}`}>
                    Atualizar
                  </Link>
                </S.Button>
                <S.Button style={{background: 'red'}} onClick={(e) => handleDelete(e, local.localReciclagem_id)}>
                  Deleta
                </S.Button>
              </Popup>
            </Marker>
          )
         })}
        
        </MapContainer>
        </S.Container>
      </S.Wrapper>
      )}
    </>
  )
}
