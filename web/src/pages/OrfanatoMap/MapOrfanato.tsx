import React, { useEffect, useState } from 'react';
import './styles.css';
import Logo1 from '../../imags/logo1.svg';
import {Link} from 'react-router-dom';
import {useHistory} from 'react-router-dom';
import {FiPlus, FiArrowRight} from 'react-icons/fi';
import leaflet from 'leaflet';
import {Map, TileLayer, Marker, Popup} from 'react-leaflet'; // ler documentação 
import 'leaflet/dist/leaflet.css';
import api from '../../services/api';
import { inflate } from 'zlib';

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


export default function OrfanatoMap(){  
    const [Orfanato, setOrfanato] = useState<Orfanato[]>([])
    useEffect(()=>{ 
        api.get('listOrfanatos').then(response => {
           setOrfanato(response.data);
        })
    },[]);
    return(
        <div id="container-map">
            <aside>
                <header>
                    <img src={Logo1}></img>
                    <h2>Escolha um orfanato no mapa</h2>
                    <p>Muitas crianças estão esperando sua visita :D</p>
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