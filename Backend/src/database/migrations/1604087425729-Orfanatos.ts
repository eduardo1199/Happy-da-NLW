import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class cadOrfanatos1602958759446 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        //realizar alterações no banco de dados, criar novo campo, salvar
        await queryRunner.createTable(new Table({
          name: 'Orfanatos', //nome da tabela
          columns:[//dados da tabela
              {
                name: 'id',//id do orfanato
                type:'integer',//tipo inteiro
                unsigned:true,//sempre positivo
                isPrimary:true,//chave única de cada usuario
                isGenerated:true,//gerar coluna automaticamente
                generationStrategy:'increment',//incrementar numero automaticamente
              },
              {
                name:'name',//nome do orfanato
                type:'varchar',
              },
              {
                name:'latitude',//localização
                type:'decimal',
                scale:10,//numero dantes da virgula
                precision:2,//numero depois da virgula
              },

              {
                name:'longitude',//localização
                type:'decimal',
                scale:10,//numero dantes da virgula
                precision:2,//numero depois da virgula
              },
              {
                name:'about',//informaçẽos do orfanato
                type:'text',
              },
              {
                name:'instructions',//instruções do orfanato
                type:'text',
              },
              {
                name:'opening',//nome do orfanato
                type:'varchar',
              },
              {
                name:'openorfanato',//se o orfanato ta aberto ou não
                type:'boolean',
                default:false,//por padrão não está aberto
              },
          ], 
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        //voltar atras do que fizemos na tabela orfanatos
        await queryRunner.dropTable('Orfanatos')
    }

}
