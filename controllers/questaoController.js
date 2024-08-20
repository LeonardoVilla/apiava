const Questao = require("../models/Questao"); 
// Certifique-se de que o modelo correto está importado

const fs = require("fs");

exports.create = async (req, res) => {
    try {
        const {
            enunciado,
            nivel_questao,
            alternativa_a,
            alternativa_b,
            alternativa_c,
            alternativa_d,
            alternativa_correta
        } = req.body;
    
        const {
            imagem_questao,
            imagem_a,
            imagem_b,
            imagem_c,
            imagem_d
        } = req.files;
    
        const questao = new Questao({
            enunciado,
            nivel_questao,
            alternativas: [
                { texto: alternativa_a, imagem: imagem_a ? imagem_a[0].path : null },
                { texto: alternativa_b, imagem: imagem_b ? imagem_b[0].path : null },
                { texto: alternativa_c, imagem: imagem_c ? imagem_c[0].path : null },
                { texto: alternativa_d, imagem: imagem_d ? imagem_d[0].path : null }
            ],
            alternativa_correta,
            imagem_suporte: imagem_questao ? imagem_questao[0].path : null,
        });
    
        await questao.save();
    
        res.json({ questao, msg: "Questão salva com sucesso!" });
    
    } catch (error) {
        res.status(500).json({ message: "Erro ao salvar a questão" });
    }
};

exports.findAll = async (req, res) => {
    try {
        const questoes = await Questao.find(); // Renomeie a variável para 'questoes'
        res.json(questoes);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar questões" });
    }
};

exports.remove = async (req, res) => {
    try {
        const questao = await Questao.findById(req.params.id); // Renomeie a variável para 'questao'

        if (!questao) {
            return res.status(404).json({ message: "Questão não encontrada" });
        }

        // Verifique se o arquivo realmente existe antes de excluí-lo
        if (fs.existsSync(questao.imagem_suporte)) { // Verifique o campo correto
            fs.unlinkSync(questao.imagem_suporte);
        }

        // Exclua as imagens associadas às alternativas
        questao.alternativas.forEach(alternativa => {
            if (alternativa.imagem && fs.existsSync(alternativa.imagem)) {
                fs.unlinkSync(alternativa.imagem);
            }
        });

        await Questao.findByIdAndDelete(req.params.id);

        res.json({ message: "Questão excluída com sucesso" });

    } catch (error) {
        console.error(error); // Para ajudar na depuração
        res.status(500).json({ message: "Erro ao excluir questão" });
    }
};