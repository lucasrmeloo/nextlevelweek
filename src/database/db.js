/**
 * Importar a dependencia do sqlite 3
 */
const sqlite3 = require('sqlite3').verbose()

/**
 * Criar o objeto que ira fazer operações no banco de dados
 */
const db = new sqlite3.Database('./src/database/database.db')

module.exports = db

/**
 * Utilizar o objeto do banco de dados para nossas operacoes
 */
db.serialize(() => {
    // Criar uma tabela
/*    db.run(`
        CREATE TABLE IF NOT EXISTS places(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT,
            name TEXT,
            address TEXT,
            address2 TEXT,
            state TEXT,
            city TEXT,
            items TEXT
        );
    `)
    // Inserir dados na tabela
        const query = `
            INSERT INTO places (
                image,
                name,
                address, 
                address2,
                state,
                city,
                items
            ) values (
                ?, ?, ?, ?, ?, ?, ?
            )
        `

        const values = [
            "https://images.unsplash.com/photo-1567093321629-c23611f44d52?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
            "Colectoria",
            "Guilherme Gemballa, Jardim América",
            "Nº 260",
            "Santa Catarina",
            "Rio do Sul",
            "Resíduos eletrônicos, Lâmpadas"

        ]

        function afterInsertData(err) {
            if(err) {
                return console.log(err)
            }
            console.log('Cadastrado com sucesso')
            console.log(this)
        }

    // db.run(query, values, afterInsertData)
*/    

    // Consultar os dados da tabela
/*
    db.all(`SELECT * FROM places`, function(err, rows) {
        if(err) {
            return console.log(err)
        }
        console.log('Aqui estão seus registros')
        console.log(rows)
    })*/


/*    
    db.all(`SELECT name FROM places`, function(err, rows) {
        if(err) {
            return console.log(err)
        }
        console.log('Aqui estão seus registros')
        console.log(rows)
    })
*/

    // Deletar dados da tabela

/*
    db.run('Delete from places WHERE id = ?', [3], function(err) {
        if(err) {
            return console.log(err)
        }
        console.log("Registro deletado com sucesso") 
    })*/

    
})