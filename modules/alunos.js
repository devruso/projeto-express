const fs = require("fs");
let alunos = [
    {
        id:0,
        nome : "Jamilson Pestana Júnior",
        matricula: 47534697,
        email: "jamilson@email.com",
        media: 8.6
    },
    {
        id: 1,
        nome : "Jose Almir ",
        matricula: 13548975,
        email: "josealmir@email.com",
        media: 9.8
    },
    {
        id: 2,
        nome : "Gabriel Braga",
        matricula: 23467954,
        email: "gabriel@email.com",
        media: 9.6
    },
    {
        id : 3,
        nome : "Antonio  Roger",
        matricula: 45678124,
        email: "antonio@email.com",
        media: 6.6
    },
    {
        id: 4,
        nome : "Monkey D. Luffy",
        matricula: 89743648,
        email: "monkeyd@email.com",
        media: 4.6
    }
];
function dbAtt(array){
    const data = {alunos: array};
    const jsonData = JSON.stringify(data);
    fs.writeFileSync("db.json",jsonData);
}

function encontrarAlunoNome(nome){
    let alunoEncontrado = alunos.filter(el => el.nome.toLowerCase().includes(nome));
    return alunoEncontrado;
}
function encontrarAlunoNota(nota){
    let notaEncontrada = alunos.filter(el => el.media >= Number(nota));
    return notaEncontrada;
}
function adicionarAluno(nome, matricula, media, email){
    const novoAluno = {
        id: alunos.length,
        nome: nome,
        email: email,
        matricula: matricula,
        media: media,
      };
      alunos.push(novoAluno);
      return novoAluno;
}

function atualizarAluno(nome, media, id) {
    const aluno = alunos.find(aluno => aluno.id === id);
    if (aluno) {
      aluno.nome = nome;
      aluno.media = media;
      return aluno;
    } else {
      return "Aluno não encontrado";
    }
  }

function deletarAluno(index){
  let indexEncontrado = alunos.findIndex(el => el.id === parseInt(index));
  if(indexEncontrado === -1){
    return "Index inválido";
  }else{
    alunos.splice(indexEncontrado,1);
    return alunos;
  }
}
module.exports = {alunos, encontrarAlunoNome,encontrarAlunoNota,adicionarAluno, atualizarAluno, deletarAluno};