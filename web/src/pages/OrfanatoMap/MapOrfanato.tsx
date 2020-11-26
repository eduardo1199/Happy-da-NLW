import React from 'react';
import './styles.css';
import Logo1 from '../../imags/logo1.svg';
import {Link} from 'react-router-dom';
import {FiPlus, FiArrowRight} from 'react-icons/fi';
import leaflet from 'leaflet';
import {Map, TileLayer, Marker, Popup} from 'react-leaflet'; // ler documentação 
import 'leaflet/dist/leaflet.css';

const Icon = leaflet.icon({
    iconUrl: Logo1,
    iconSize:[30,30],
    iconAnchor:[15,30],
    popupAnchor:[135, 25]
})

export default function OrfanatoMap(){ 
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
                <Marker
                    icon={Icon}
                    position={[-5.8064786,-35.1847402]}
                >
                    <Popup closeButton={false} marginTop={15} maxWidth={200} minWidth={200} className="popup-map">
                        Casa do Bem
                        <Link to="/ViewOrfanato/4">
                            <FiArrowRight/>
                        </Link>
                    </Popup>
                </Marker>
            </Map>
        </div>
    );
}