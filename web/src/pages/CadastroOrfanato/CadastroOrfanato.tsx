import React, { ChangeEvent, FormEvent, useState } from 'react';
import './styles.css';
import {Link, useHistory} from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi';
import {GrFormAdd} from 'react-icons/gr';
import Logo1 from '../../imags/logo1.svg';
import leaflet, { Handler, LeafletEvent, map } from 'leaflet';
import {Map, TileLayer, Marker, Popup} from 'react-leaflet';
import {LeafletMouseEvent} from 'leaflet';
import OrfanatoMap from '../OrfanatoMap/MapOrfanato';
import api from '../../services/api';
import { OperationCanceledException } from 'typescript';


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
    const [images, setimages] = useState<File[]>([]);
    const [Preview, SetPreview] = useState<string[]>([]);
    const history = useHistory();
    function hadlerMarker(event:LeafletMouseEvent){
        const {lat , lng} = event.latlng;
       setposition({
           latitude: lat,
           longitude:lng
       })
    }
    async function Cadastro(event:FormEvent){
        event.preventDefault();
        const data = new FormData();
        data.append('name',name);
        data.append('latitude',String(position.latitude));
        data.append('longitude',String(position.longitude));
        data.append('about',about);
        data.append('instructions',instructions);
        data.append('opening',opening);
        data.append('openorfanato',String(openorfanato));
        
        images.forEach(images => (
            data.append('images', images)
        ))
        await api.post('cadOrfanatos', data)
            try{
                alert('Seu cadastro foi realizado com sucesso')
                history.push('/');
            }catch(err){
                alert('deu erro');
            }
    }

    function handlerImage(event:ChangeEvent<HTMLInputElement>){
       if(!event.target.files){
           return;
       } //verificando se o campo não é nulo de images
       const selected = Array.from(event.target.files); //transformar o objeto em um array 
       setimages(selected);
       const previewimages = selected.map(images => {
           return URL.createObjectURL(images);//pegando a URL das images
       });
       SetPreview(previewimages);
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
            <form onSubmit={Cadastro}>
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
                            {Preview.map(images => {
                                return(
                                    <img key={images} src={images} alt={name}></img>
                                )
                            })}
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
                    <button id='button-cadOrfanato'>Cadastrar</button>
            </form>
        </div>
    </div>
    );
};