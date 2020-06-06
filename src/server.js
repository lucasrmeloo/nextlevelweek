const express = require("express")
const server = express()

// pegar banco de dados
const db = require("./database/db")

// configurando pasta publica
server.use(express.static("public"))

// habilitar o uso do req.body na aplicacao
server.use(express.urlencoded({extended: true}))

// utilizando template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})

/**
 * Configurando caminhos
 */

// Pagina inicial
server.get("/", (req, res) => {
    return res.render("index.html", {
        title: 'Seu marketplace de coleta de resíduos'
    })
})




server.get("/create-point", (req, res) => {
    return res.render("create-point.html")
})

server.post("/savepoint", (req, res) => {
    //console.log(req.body)
    // inserir dados no bd
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
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items

    ]

    function afterInsertData(err) {
        if(err) {
            console.log(err)
            //return res.send("Erro no cadastro")
            return res.render("create-point.html", {notsaved: true})
        }
        console.log('Cadastrado com sucesso')
        console.log(this)

        return res.render("create-point.html", {saved: true})
    }

    db.run(query, values, afterInsertData)
})


server.get("/search", (req, res) => {
    const search = req.query.search

    if(search == "") {
        // pesquisa vazia
        // mostrar a pagina html com os dados
        return res.render("search-results.html", {total: 0})
    }



    // pegar dados do bd
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows) {
        if(err) {
            return console.log(err)
        }
        console.log('Aqui estão seus registros')
        //console.log(rows)
        const total = rows.length
        // mostrar a pagina html com os dados
        return res.render("search-results.html", {places: rows, total: total})
    })
})

// ligar servidor
server.listen(3000)