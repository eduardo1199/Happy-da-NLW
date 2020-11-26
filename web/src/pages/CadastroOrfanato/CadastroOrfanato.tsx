import React from 'react';
import './styles.css';
import {Link} from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi';
import {GrFormAdd} from 'react-icons/gr';
import Logo1 from '../../imags/logo1.svg';
import leaflet from 'leaflet';
import {Map, TileLayer, Marker, Popup} from 'react-leaflet';


const Icon = leaflet.icon({
    iconUrl: Logo1,
    iconSize:[30,30],
    iconAnchor:[15,30],
    popupAnchor:[135, 25]
})

export default function CadastroOrfanato(){
    return(
        <div className="cadOrfanato">
            <aside>
                <img src={Logo1}></img>
                <footer>
                    <Link to="/">
                        <FiArrowLeft size={22}></FiArrowLeft>
                    </Link>
                </footer>
            </aside>
            <div className="container-cadOrfanato">
            <form>
                <div className="map-cadOrfanato">
                    
                        <h1>Dados</h1>
                        <hr></hr>
                        <Map
                            center={[-5.8064786,-35.1847402]}
                            zoom={16}
                            style={{
                                width:'100%',
                                height:300,
                            }}
                        >
                            <TileLayer url={`https:api.mapbox.com/styles/v1/mapbox/outdoors-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_BOX_MAP_EDU}`}/>
                            <Marker
                                position={[-5.8064786,-35.1847402]}
                                icon={Icon}
                            >
                            </Marker>
                        </Map>
                        <p>Nome</p>
                        <input></input>
                        <div id="about-cadOrfanato">
                            <p>Sobre</p>
                            <p>máximo 300 caracteres</p>
                        </div>
                        <input></input>
                        <p>Fotos</p>
                        <div id="imgs-cadOrfanato">
                            <label htmlFor='uploadImgsOrfa'>
                                <GrFormAdd size={25}></GrFormAdd>
                            </label>
                            <input type='file' id='uploadImgsOrfa'></input>
                        </div>
                    </div>
                    <div className="visit-orfanato">
                        <h1>Visitação</h1>
                        <hr></hr>
                        <p>Instruções</p>
                        <textarea>
                        </textarea>
                        <p>Nome</p>
                        <input></input>
                        <p>Atende final de semana</p>
                        <div id='button-atentimento'>
                            <button type='button'>Sim</button>
                            <button type='button'>Não</button>
                        </div>
                    </div>
                    <button type='button' id='button-cadOrfanato'>Cadastrar</button>
            </form>
        </div>
    </div>
    );
};