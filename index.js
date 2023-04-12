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
        console.log(notaEncontrada)
        if(notaEncontrada){
            res.json(notaEncontrada);
        }else{
            res.status(404).json({message:"Nota não encontrada"});
        }
     }
})

app.post("alunos/novo", (req,res) =>{
    const {nome, matricula, media} = req.query;
})

app.listen(3000, ()=>{
    console.log("Executando na porta http://localhost:3000/")
} )