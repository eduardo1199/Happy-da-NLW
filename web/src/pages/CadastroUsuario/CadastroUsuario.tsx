import React, {FormEvent, useState} from 'react';
import {ChangeEvent} from 'react';
import './style.css';
import imgLogin from '../../imags/undraw_Login_re_4vu2.svg';
import {Link,useHistory} from 'react-router-dom';
import {GrFormAdd} from 'react-icons/gr';
import api from '../../services/api';



export default function Cadastro(){
    const [nome,setnome] = useState('');
    const [show, setshow] = useState(false);
    const [response, setresponse] = useState('');
    const [idade,setidade] = useState('');
    const [email,setemail] = useState('');
    const [cpf,setcpf] = useState('');
    const [senha,setsenha] = useState('');
    const [image,setimage] = useState<File[]>([]);
    const [preview, setpreview] = useState<string[]>([]);
    const history = useHistory();



    function SelectionImage(event: ChangeEvent<HTMLInputElement>){
        console.log(event.target.files);
        if(!event.target.files){
            return;
        }

        const images = Array.from(event.target.files)
        setimage(images);
        const previewimages = images.map(image=>{
            return URL.createObjectURL(image);
        });
        setpreview(previewimages);
        console.log(preview);
    }
    async function CadastroUsuario(event:FormEvent){
        event.preventDefault();
        const data = new FormData();
        data.append('name',nome);
        data.append('idade',idade);
        data.append('email',email);
        data.append('CPF',cpf);
        data.append('senha',senha);
        image.forEach(image => (
            data.append('images', image)
        ))

        await api.post('cadUsuario', data)
            try{
                alert(`Seu cadastro foi realizado com sucesso, sua senha é ${senha}`)
                history.push('/login');
            }catch(err){
                alert('deu erro');
            }
    }
    
    return(
        <div className="cad-container">
            <img src={imgLogin}></img>
            <form onSubmit={CadastroUsuario}>
                <header>
                    <strong>Cadastro de Usuario</strong>
                </header>
                <div id="form-cadUsuario">
                    <label>Nome</label>
                    <input
                        placeholder="Nome Completo"
                        value={nome}
                        onChange={event => setnome(event.target.value)}
                    />
                    <label>Idade</label>
                    <input
                        placeholder="Idade"
                        value={idade}
                        onChange={event => setidade(event.target.value)}
                    />
                    <label>Email</label>
                    <input
                        placeholder="Email"
                        value={email}
                        onChange={event => setemail(event.target.value)}
                    />
                    <label>CPF</label>
                    <input
                        placeholder="CPF"
                        value={cpf}
                        onChange={event => setcpf(event.target.value)}
                    />
                    <label>Senha</label>
                    <input
                        type="password"
                        placeholder="Senha"
                        value={senha}
                        onChange={event => setsenha(event.target.value)}
                    />  
                </div>
                <p>
                    Adicionar Foto de Perfil
                </p>
                <footer>
                    <div id="image-container">
                        <label htmlFor="input-image">
                            <GrFormAdd size={25}></GrFormAdd>
                        </label>
                        {preview.map(image=>{
                            return(
                                <img src={image} alt={image}/>
                            )
                        })}
                    </div>
                    <input onChange={SelectionImage} type="file" id="input-image"></input>
                    
                </footer>
                <button id="button-cadastro">
                    Cadastrar
                </button>
            </form>
        </div>
    );
    
}