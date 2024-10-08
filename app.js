const express = require("express");
const cors = require('cors'); // Importa o middleware CORS

const app = express();

app.use(cors());

app.use(express.json());

require("dotenv").config();
require("./db");

const port = process.env.PORT || 3000;

// Importando o arquivo de rotas correto
const questaoRouter = require("./routes/questao"); // Certifique-se de que o nome do arquivo seja questoes.js

// Usando a rota /questoes
app.use("/questao", questaoRouter);

app.listen(port, () => {
    console.log(`Servidor está rodando na porta ${port}`);
});
