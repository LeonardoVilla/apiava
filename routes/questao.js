const express = require("express");
const router = express.Router();

const upload = require("../config/multer"); // Certifique-se de que o nome do arquivo de configuração está correto

const questaoController = require("../controllers/questaoController"); // Nome correto da controller

// Configurando a rota POST para usar o middleware multer configurado para múltiplos arquivos
router.post("/", upload, questaoController.create); // Sem o .single(), pois estamos lidando com múltiplos campos

router.get("/", questaoController.findAll);

router.delete("/:id", questaoController.remove);

module.exports = router;