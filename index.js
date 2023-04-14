const express = require("express");
const {alunos, encontrarAlunoNome, encontrarAlunoNota} = require("./modules/alunos.js")

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
        if(notaEncontrada){
            res.json(notaEncontrada);
        }else{
            res.status(404).json({message:"Nota não encontrada"});
        }
     }
})

app.post("/alunos/novo", (req, res) => {
  const { nome, matricula, media, email } = req.body;
  if (nome && matricula && media && email) {
    let lastIndex = alunos.length > 0 ? alunos[alunos.length - 1].id : -1;
    alunos.push({
      id: lastIndex + 1,
      nome: nome,
      email: email,
      matricula: matricula,
      media: media,
    });
    res.json("Aluno adicionado com sucesso");
  } else {
    res.status(400).json({ message: "Insira dados válidos" });
  }
});

app.listen(3000, ()=>{
    console.log("Executando na porta http://localhost:3000/")
} )