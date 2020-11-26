import React from 'react';
import './style.css';
import 'leaflet/dist/leaflet.css';
import Logo1 from '../../imags/logo1.svg';
import {Link} from 'react-router-dom';
import {FiArrowLeft, FiClock} from 'react-icons/fi';
import {RiWhatsappLine} from 'react-icons/ri'
import imgOrfanato from '../../imags/download.jpeg';
import leaflet from 'leaflet';
import {Map, TileLayer, Marker, Popup} from 'react-leaflet';


const Icon = leaflet.icon({
    iconUrl: Logo1,
    iconSize:[30,30],
    iconAnchor:[15,30],
    popupAnchor:[135, 25]
})

export default function ViewOrfanato(){
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
                <img src={imgOrfanato} id="image-principal"></img>
                <div id="imgs-container">
                    <button type='button'>
                        <img src={imgOrfanato}></img>
                    </button>
                    <button type='button'>
                        <img src={imgOrfanato}></img>
                    </button>
                    <button type='button'>
                        <img src={imgOrfanato}></img>
                    </button>
                    <button type='button'>
                        <img src={imgOrfanato}></img>
                    </button>
                    <button type='button'>
                        <img src={imgOrfanato}></img>
                    </button>
                </div>
                <div className="container-map">
                    <h1>Casa do Bem</h1>
                    <p>Preste Assistência a crianças em sittuação de risco e vunerabilidade</p>
                    <Map
                        center={[-5.8064786,-35.1847402]}
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
                            position={[-5.8064786,-35.1847402]}
                            icon={Icon}
                        >
                        </Marker>
                    </Map>
                    <footer>
                        <Link to="">Ver rotas no google Maps</Link>
                    </footer>
                </div>
                <div className="container-contato">
                    <h1>Instruções para Visita</h1>
                    <p>Venha visitar o orfanato</p>
                    <div id="horario-container">
                        <div id="horario-view">
                            <FiClock size={20} color={'#29B6D1'}/><br/>
                            <p>Horario de funcionamento de segunda a sexta</p>
                        </div>
                        <div id="horario-view">
                            <FiClock size={20} color={'#29B6D1'}/><br/>
                            <p>Não atendemos final de semana</p>
                        </div>
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