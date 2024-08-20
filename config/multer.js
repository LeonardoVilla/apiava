const multer = require("multer");
const path = require("path");

// Configuração de armazenamento
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "uploads/"); // Diretório onde os arquivos serão salvos
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Nome do arquivo com base no timestamp
    }
});

// Filtros de arquivo (opcional, caso queira restringir os tipos de arquivo)
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png/;
    const extName = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = allowedTypes.test(file.mimetype);

    if (extName && mimeType) {
        return cb(null, true);
    } else {
        cb("Error: Only images are allowed!"); // Você pode personalizar a mensagem de erro
    }
};

// Configuração do upload com limite de tamanho e filtro de arquivo
const upload = multer({ 
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // Limite de 5MB para cada arquivo
    fileFilter
}).fields([
    { name: 'imagem_questao', maxCount: 1 },
    { name: 'imagem_a', maxCount: 1 },
    { name: 'imagem_b', maxCount: 1 },
    { name: 'imagem_c', maxCount: 1 },
    { name: 'imagem_d', maxCount: 1 }
]);

module.exports = upload;