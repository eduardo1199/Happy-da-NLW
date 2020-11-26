import express from 'express';
import './database/connection';
import Routes from './Routes';
import path from 'path';
import 'express-async-errors';
import errorHandler from './errors/handler';
import cors from 'cors';

const app = express();
 
app.use(cors());

app.use(express.json());

app.use(Routes);

app.use('/uploads', express.static(path.join(__dirname,'..','uploads')));

// A rota é para onde está a resposta e a requisão do usuario onde ele efetua e recebe a ação, o comando
//abaixo é uma rota.

//o recurso => é o que é passado na rota, o destino de acesso com o '/'
 
//métodos HTTP => 
//.get (bucar informação como lista, item, etc)
// .post(criando uma informação nova)
// .put ( editando uma informação)
// .delete (deletar uma informação)

//Parâmetros => Query Params: são operações realizadas na linha do local host para acessar determinada informação
// ex: http://localhost:3333/users?seach=Eduardo&page=2 => buscar todos os usuarios com nome de eduardo na pagina dois
// Route Params => são parametros que enviamos na URL para identificar um recurso
// ex: http://localhost:3333/users/1 => usuario com ID 1
//Body  => é o corpo de dados e informações que vão para um usuario por exemplo

/*/app.get('/:id',(request, response)=>{
    console.log(request.query)// visualizando todos os query da requisição
    console.log(request.params)// visualizando todos os route params da requisição
    console.log(request.body)//visualizando o body da requisição
    return response.json({
        Menssage: 'Oi Eduardo'
    })
})/*/
app.use(errorHandler);


app.listen(3333);

/*/ 3 formas de se lidar com banco de dados dentro do back end
DRIVER NATIVO , QUERY BUILD , ORM

DRIVER NATIVO => ele permite executar as querys do banco de dados direto pelo node, exemplo é o proprio
sqlite
QUERY BUILD => Knex é o mais famoso, escrevemos nossas query com o próprio JS
ORM => represetação de uma query ou busca de informação no banco de dados por exemplo de usuário de forma de 
tag  ex: table users => tag User (Nessa aplicação será construido o ORM)
/*/