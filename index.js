const express = require("express");
const fs = require("fs");
let {
  alunos,
  encontrarAlunoNome,
  encontrarAlunoNota,
  adicionarAluno,
  atualizarAluno,
  deletarAluno,
  dbLoad
} = require("./modules/alunos.js");

const app = express();

app.use(express.json());

app.get("/alunos", (req, res) => {
  const { nome, nota } = req.query;
  const alunos = dbLoad().alunos;
  if (nome) {
    let alunoEncontrado = encontrarAlunoNome(nome);
    if (alunoEncontrado) {
      res.json(alunoEncontrado);
    } else {
      res.status(404).json({ message: "Aluno não encontrado" });
    }
  }
  if (nota) {
    let notaEncontrada = encontrarAlunoNota(nota);
    if (notaEncontrada.length > 0) {
      res.json(notaEncontrada);
    } else {
      res.status(404).json({ message: "Nota não encontrada" });
    }
  }
  if (!nota && !nome) {
    res.json(alunos);
  }
});

app.post("/alunos/novo", (req, res) => {
  const { nome, matricula, media, email } = req.body;
  if (nome && matricula && media && email) {
    adicionarAluno(nome, matricula, media, email);
    res.json({ message: "Aluno inserido com sucesso" });
  } else {
    res.status(400).json({ message: "Insira dados válidos" });
  }
});

app.delete("/alunos/deletar/:index", (req, res) => {
  const index = req.params.index;
  const alunos = dbLoad().alunos;
  if (alunos.length -1 >= index) {
    deletarAluno(index);
    res.json({message: "Aluno deletado com sucesso"});
  } else {
    res.status(404).json({ message: "Aluno não encontrado" });
  }
});

app.put("/alunos/atualizar/:index", (req, res) =>{
  const {nome, media} = req.body;
  const index = parseInt(req.params.index);
  const alunos = dbLoad().alunos;
  if(nome && media){
    if(index <= alunos.length){
       atualizarAluno(nome,media,index);
      res.json({message: "Aluno atualizado com sucesso"});
    }else{
      res.status(400).json({message: "Insira um index válido"});
    }
  }else{
    res.status(400).json({message: "Insira dados válidos"});
  }
})

app.listen(3000, () => {
  console.log("Executando na porta http://localhost:3000/");
});
