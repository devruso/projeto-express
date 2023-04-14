const express = require("express");
const fs = require("fs");
const {alunos, encontrarAlunoNome, encontrarAlunoNota, adicionarAluno} = require("./modules/alunos.js")

const app = express();

app.use(express.json());

app.get("/alunos", (req, res) =>{
     const {nome,nota} = req.query;
     if(nome){
        let alunoEncontrado = encontrarAlunoNome(nome);
        if(alunoEncontrado){
            res.json(alunoEncontrado);
        }else{
            res.status(404).json({message: "Aluno não encontrado"});
        }
     }
     if(nota){
        let notaEncontrada = encontrarAlunoNota(nota);
        if(notaEncontrada.length > 0){
            res.json(notaEncontrada);
        }else{
            res.status(404).json({message:"Nota não encontrada"});
        }
     }
     if(!nota && !nome){
        res.json(alunos)
     }
})

app.post("/alunos/novo", (req, res) => {
  const { nome, matricula, media, email } = req.body;
  if (nome && matricula && media && email) {
    const novoAluno = {
        id: alunos.length,
        nome: nome,
        email: email,
        matricula: matricula,
        media: media,
      };
    alunos.push(novoAluno);
    try{
                // const dadosAluno =  fs.readFileSync("alunos.js","utf-8");
                // const objetoAlunos = JSON.parse(dadosAluno);
                // objetoAlunos.alunos = alunos;
                // const jsonAlunos = JSON.stringify(objetoAlunos);
                // fs.writeFileSync("alunos.js", jsonAlunos);
                res.json({ message: "Aluno inserido com sucesso" });
    }catch(err){
        console.log(err);
        res.status(500).json({message: "Erro ao inserir o aluno"});
    }
    
  } else {
    res.status(400).json({ message: "Insira dados válidos" });
  }
});

app.listen(3000, ()=>{
    console.log("Executando na porta http://localhost:3000/")
} )