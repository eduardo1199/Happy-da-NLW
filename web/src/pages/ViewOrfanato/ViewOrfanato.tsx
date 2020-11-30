import React,{useState, useEffect} from 'react';
import './style.css';
import 'leaflet/dist/leaflet.css';
import Logo1 from '../../imags/logo1.svg';
import {Link, useParams} from 'react-router-dom';
import {FiArrowLeft, FiClock} from 'react-icons/fi';
import {RiWhatsappLine} from 'react-icons/ri'
import imgOrfanato from '../../imags/download.jpeg';
import leaflet from 'leaflet';
import {Map, TileLayer, Marker, Popup} from 'react-leaflet';
import api from '../../services/api';


const Icon = leaflet.icon({
    iconUrl: Logo1,
    iconSize:[30,30],
    iconAnchor:[15,30],
    popupAnchor:[135, 25]
})
interface Orfanato{
    id:string;
    name:string;
    latitude:number;
    longitude:number;
    about: string;
    instructions: string;
    opening: string,
    openorfanato: boolean;
    images:{
        id:number;
        url:string;
    }[];
}
interface OrfanatoParms{
    id: string;
}


export default function ViewOrfanato(){
    const parms = useParams<OrfanatoParms>();
    const [indeximage, setindeximage] = useState(0);
    const [Orfanato, setOrfanato] = useState<Orfanato>();
    useEffect(()=>{ 
        api.get(`listOrfanatos/${parms.id}`).then(response => {
           setOrfanato(response.data);
        })
    },[parms.id]);
    if(!Orfanato){
        return <p>Carregando...</p>
    }
    
    return(
        <div className="ViewOrfanato">
            <aside>
                <img src={Logo1}></img>
                <footer>
                    <Link to="/OrfanatoMap">
                        <FiArrowLeft size={22}></FiArrowLeft>
                    </Link>
                </footer>
            </aside>
            <div className="container-ViewOrfanato">
                <img 
                    src={Orfanato.images[indeximage].url} 
                    id="image-principal">
                        
                </img>
                <div id="imgs-container">
                    {Orfanato.images.map((image,index) => {
                        return(
                            <button 
                                className={indeximage === index ? 'button-active':''}
                                key={image.id} 
                                type='button'
                                onClick={()=> setindeximage(index)}
                                >
                                <img src={image.url} alt={Orfanato.name}></img>
                            </button>
                        );
                    })}
                </div>
                <div className="container-map">
                    <h1>{Orfanato.name}</h1>
                    <p>{Orfanato.about}</p>
                    <Map
                        center={[Orfanato.latitude,Orfanato.longitude]}
                        zoom={16}
                        style={{
                            width:'100%',
                            height:300,
                        }}
                        dragging={false}
                        touchZoom={false}
                        zoomControl={false}
                        scrollWheelZoom={false}
                        doubleClickZoom={false}
                    >
                        <TileLayer
                        url={`https:api.mapbox.com/styles/v1/mapbox/outdoors-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_BOX_MAP_EDU}`}
                        >
                        </TileLayer>
                        <Marker
                            position={[Orfanato.latitude,Orfanato.longitude]}
                            icon={Icon}
                        >
                        </Marker>
                    </Map>
                    <footer>
                        <a target="_blank" rel="noopener noreferrer" href={`https://www.google.com/maps/dir/?api=1&destination=${Orfanato.latitude},${Orfanato.longitude}`}>Ver rotas no google Maps</a>
                    </footer>
                </div>
                <div className="container-contato">
                    <h1>Horário de Visitas</h1>
                    <p>Venha Visitar o Orfanato</p>
                    <div id="horario-container">
                        <div id="horario-view">
                            <FiClock size={20} color={'#29B6D1'}/><br/>
                            <p>Atendemos de segunda a sexta das {Orfanato.opening}</p>
                        </div>
                        {Orfanato.openorfanato ? (
                                <div id="horario-view">
                                    <FiClock size={20} color={'#29B6D1'}/><br/>
                                    <p>atendemos final de semana</p>
                                </div>
                        ):(
                            <div id="not-horario">
                                <FiClock size={20} color={'#FF669D'}/><br/>
                                <p>Não atendemos final de semana</p>
                            </div>
                        )}
                    </div>
                </div>
                <button type='button' id='button-contato'>
                    <RiWhatsappLine 
                        size={20}
                        style={{marginRight:20}}
                    />
                    Entrar em contato       
                </button>
            </div>
        </div>
    );

}