import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class imagensOrfanatos1604318652698 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'Imagens',
            columns:[
                {
                    name: 'id',//id do orfanato
                    type:'integer',//tipo inteiro
                    unsigned:true,//sempre positivo
                    isPrimary:true,//chave única de cada usuario
                    isGenerated:true,//gerar coluna automaticamente
                    generationStrategy:'increment',//incrementar numero automaticamente
                },
                {
                    name: 'path',
                    type:'varchar',
                },
                {
                    name:'Orfanato_id',
                    type:'integer',
                },
            ],
            foreignKeys:[
                {
                    name:'imagesOrfanatos',
                    columnNames:['Orfanato_id'],
                    referencedTableName:'Orfanatos',
                    referencedColumnNames:['id'],
                    onUpdate:'CASCADE',
                    onDelete:'CASCADE',
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('Imagens');
    }

}
