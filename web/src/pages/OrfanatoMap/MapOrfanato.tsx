import React, { SetStateAction, useEffect, useState} from 'react';
import './styles.css';
import Logo1 from '../../imags/logo1.svg';
import {Link} from 'react-router-dom';
import {FiArrowRight} from 'react-icons/fi';
import leaflet, { Handler } from 'leaflet';
import {Map, TileLayer, Marker, Popup} from 'react-leaflet'; // ler documentação 
import 'leaflet/dist/leaflet.css';
import api from '../../services/api';



const Icon = leaflet.icon({
    iconUrl: Logo1,
    iconSize:[30,30],
    iconAnchor:[15,30],
    popupAnchor:[135, 25]
})
interface Orfanato{
    id:number;
    name:string;
    latitude:number;
    longitude:number;
}
interface Usuario{
    id:number;
    name:string;
    email:string;
    images:{
        id:number;
        url:string;
    }[];
}


export default function OrfanatoMap(){  
    const [Orfanato, setOrfanato] = useState<Orfanato[]>([]);
    const [Usuario, setUsuario] = useState<Usuario>();
    const [id, setid] = useState<Number>();
    const [preview, setpreview] = useState<String>();
    const [state, setstate] = useState(false);

    useEffect(()=>{  
        const IdUsuario = Number(localStorage.getItem('IdUsuario'));
        setid(IdUsuario);
        api.get('listOrfanatos').then(response => {
           setOrfanato(response.data);
        });
        api.get(`Usuario/${id}`).then(response => {
            setUsuario(response.data);
        })
        
    },[id]);
    if(!Usuario){
        return <h1>Carregando....</h1>
    }

    return(
        <div id="container-map">
            {state ? (
                <button onClick={event => setstate(false)} className='poup-perfil'>
                    <p>{Usuario.name}</p>
                    <p>{Usuario.email}</p>
                    {Usuario.images.map(images => {
                        return (
                            <img src={images.url}></img>
                        )
                    })}
                    <Link to='/login'>
                        Sair
                    </Link>
                </button>
            ):(
                <button onClick={event => setstate(true)} >
                    <p>{Usuario.name}</p>
                </button>
            )}
            <aside>
                <header>
                    <img src={Logo1}></img>
                    <h2></h2>
                    <p>Venha Visitar um Orfanato mais próximo de você :D</p>
                </header>
                <footer>
                    <strong>Natal</strong>
                    <span>Rio Grande do Norte</span>
                </footer>
            </aside>
            <Map
                center={[-5.8064786,-35.1847402]}
                zoom={12}
                style={{
                    width:'100%',
                    height:'100%'
                }}
            >
                <TileLayer
                    url={`https:api.mapbox.com/styles/v1/mapbox/outdoors-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_BOX_MAP_EDU}`}
                >
                </TileLayer>
               {Orfanato.map(Orfanato =>{
                   return(
                        <Marker
                        icon={Icon}
                        position={[Orfanato.latitude,Orfanato.longitude]}
                        key={Orfanato.id}
                        >
                        <Popup closeButton={false} marginTop={15} maxWidth={200} minWidth={200} className="popup-map">
                            {Orfanato.name}
                            <Link to={`/ViewOrfanato/${Orfanato.id}`}>
                                <FiArrowRight/>
                            </Link>
                        </Popup>
                    </Marker>
                   )
               })}
            </Map>
        </div>
    );
}