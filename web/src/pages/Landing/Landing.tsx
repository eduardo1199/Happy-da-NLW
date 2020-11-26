import React from 'react';
import './styles.css';
import logoImg from '../../imags/Logo.svg';
import {FiArrowRight} from 'react-icons/fi';
import {Link} from 'react-router-dom';

export default function Landing(){
    return(
        <div id="page-landing">
            <div className="container-landing">
                <img src={logoImg} alt="happy"></img>
                <main>
                    <h1>Leve felicidade para o mundo</h1>
                    <p>Visite orfanatos e mude o dia das crianças.</p>
                </main>
                <div className="container-landing-2">
                    <span>Natal</span>
                    <strong>Rio Grande do Norte</strong>
                </div>
                <Link to="/login" id="button-login-in">
                    <FiArrowRight size={25} color="rgba(0, 0 ,0, 0.7)"/>
                </Link>
                <Link to="/CadOrfanato" id="button-cad-Orfanato">
                    <FiArrowRight size={25} color="rgba(0, 0 ,0, 0.7)"/>
                </Link>
            </div>
        </div>
    );
}