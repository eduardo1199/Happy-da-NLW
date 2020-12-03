import React, { FormEvent, useState, useEffect } from 'react';
import './styles.css';
import imgLogin from '../../imags/undraw_Login_re_4vu2.svg';
import {Link, useHistory} from 'react-router-dom';
import {FiLogIn} from 'react-icons/fi'
import api from '../../services/api';

interface Usuarios{
    id: number;
    name:string;
    idade:number;
    email:string;
    CPF:string;
    senha:string;
}

export default function Login(){

    const [senha,setsenha] = useState('');
    const [Usuarios,setUsuarios] = useState<Usuarios[]>([]);
    const [cadastro, setCadastro] = useState(false);
    const [cpf, setcpf] = useState('');
    const history = useHistory();
    
    
    useEffect(() => {
        api.get('listUsuario').then(response => {
            setUsuarios(response.data);
        });
        localStorage.removeItem('IdUsuario');
    },[]);
    function Login(event: FormEvent<HTMLFormElement>){
        event.preventDefault();
        Usuarios.forEach(usuario => {
            try{
                if(usuario.senha === senha){
                    if(usuario.CPF === cpf){
                        localStorage.setItem('IdUsuario', String(usuario.id));
                        history.push(`/OrfanatoMap/${usuario.id}`);
                    }
                }
            }catch(err){
                alert('você não tem cadastro');
            }
        });
    }
    return(
        <div className="login-container">
            <div id="ajus-login">
                <img src={imgLogin}></img>
                <form onSubmit={Login}>
                    <strong>CPF</strong>
                    <input
                        type='CPF'
                        value={cpf}
                        onChange={(event) => setcpf(event.target.value)}
                    ></input>
                    <strong>Senha</strong>
                    <input
                        type="password"
                        value={senha}
                        onChange={(event)=>setsenha(event.target.value)}
                    >
                    </input>
                    <footer>
                        <Link to="/CadUsuario" id="Register-User">
                            Fazer Cadastro
                        </Link>
                        <button id="Login-User">
                            <FiLogIn size={25}></FiLogIn>
                        </button>
                    </footer>
                </form>
            </div>
        </div>
    );
}
