import React from 'react';
import {BrowserRouter,Route,Router,Switch} from 'react-router-dom';
import Landing from './pages/Landing/Landing';
import OrfanatoMap from './pages/OrfanatoMap/MapOrfanato';
import CadastroUsuario from './pages/CadastroUsuario/CadastroUsuario';
import Login from './pages/Login/Login';
import CadOrfanato from './pages/CadastroOrfanato/CadastroOrfanato';
import ViewOrfanato from './pages/ViewOrfanato/ViewOrfanato';

export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Landing}/>
                <Route path="/login" component={Login}/>
                <Route path="/OrfanatoMap" component={OrfanatoMap}/>
                <Route path="/CadUsuario" component={CadastroUsuario}/>
                <Route path="/CadOrfanato" component={CadOrfanato}/>
                <Route path="/ViewOrfanato/:id" component={ViewOrfanato}/>
            </Switch>
        </BrowserRouter>
    );
}

