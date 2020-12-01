import React, { ChangeEvent, FormEvent, useState } from 'react';
import './styles.css';
import {Link} from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi';
import {GrFormAdd} from 'react-icons/gr';
import Logo1 from '../../imags/logo1.svg';
import leaflet, { Handler, LeafletEvent } from 'leaflet';
import {Map, TileLayer, Marker, Popup} from 'react-leaflet';
import {LeafletMouseEvent} from 'leaflet';


const Icon = leaflet.icon({
    iconUrl: Logo1,
    iconSize:[30,30],
    iconAnchor:[15,30],
    popupAnchor:[135, 25]
})

export default function CadastroOrfanato(){
    const [position, setposition] = useState({latitude : 0,longitude : 0});
    const [name,setname] = useState('');
    const [about, setabout] = useState('');
    const [instructions, setinstructions] = useState('');
    const [opening, setopening] = useState('');
    const [openorfanato, setopenorfanato] = useState(true);

    function hadlerMarker(event:LeafletMouseEvent){
        const {lat , lng} = event.latlng;
       setposition({
           latitude: lat,
           longitude:lng
       })
    }
    function Cadastro(event:FormEvent){
        event.preventDefault();
    }

    function handlerImage(event:ChangeEvent<HTMLInputElement>){
        console.log(event.target.files);
    }

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
            <form onChange={Cadastro}>
                <div className="map-cadOrfanato">
                    
                        <h1>Dados</h1>
                        <h4>Clique na sua localização</h4>
                        <hr></hr>
                        <Map
                            center={[-5.8064786,-35.1847402]}
                            zoom={10}
                            style={{
                                width:'100%',
                                height:300,
                            }}
                            onClick={hadlerMarker}
                        >
                            <TileLayer url={`https:api.mapbox.com/styles/v1/mapbox/outdoors-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_BOX_MAP_EDU}`}/>
                            {position.latitude !== 0 ? (
                                <Marker
                                    interactive={false}
                                    icon={Icon}
                                    position={[position.latitude,position.longitude]}
                                ></Marker>
                            ): null}
                        </Map>
                        <p>Nome</p>
                        <input
                            type='input'
                            value={name}
                            onChange={event => setname(event.target.value)}
                        ></input>
                        <div id="about-cadOrfanato">
                            <p>Sobre</p>
                            <p>máximo 300 caracteres</p>
                        </div>
                        <input
                            type='input'
                            value={about}
                            onChange={event => setabout(event.target.value)}
                        ></input>
                        <p>Fotos</p>
                        <div id="imgs-cadOrfanato">
                            <label htmlFor='uploadImgsOrfa'>
                                <GrFormAdd size={25}></GrFormAdd>
                            </label>
                            <input onChange={handlerImage} multiple type='file' id='uploadImgsOrfa'></input>
                        </div>
                    </div>
                    <div className="visit-orfanato">
                        <h1>Visitação</h1>
                        <hr></hr>
                        <p>Instruções</p>
                        <textarea
                            maxLength={300}
                            value={instructions}
                            onChange={event => setinstructions(event.target.value)}
                        >
                        </textarea>
                        <p>Horário de Funcionamento</p>
                        <input
                            type='input'
                            value={opening}
                            onChange={event => setopening(event.target.value)}
                        ></input>
                        <p>Atende final de semana</p>
                        <div id='button-atentimento'>
                            <button 
                                type='button'
                                className={openorfanato ? 'active': ''}
                                onClick={event => setopenorfanato(true)}
                            >Sim</button>
                            <button
                                className={!openorfanato ? 'no-active': ''}
                                type='button'
                                onClick={event => setopenorfanato(false)}
                            >Não</button>
                        </div>
                    </div>
                    <button type='button' id='button-cadOrfanato'>Cadastrar</button>
            </form>
        </div>
    </div>
    );
};