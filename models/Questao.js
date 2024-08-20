const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const QuestaoSchema = new Schema({
    enunciado: { type: String, required: true },
    nivel_questao: { type: String, required: true },
    imagem_suporte: { type: String }, // Tornando opcional

    alternativa_correta: { type: String, required: true },

    alternativas: [
        {
            texto: { type: String, required: true },
            imagem: { type: String }, // Tornando opcional
        }
    ]
});

module.exports = mongoose.model("Questao", QuestaoSchema);