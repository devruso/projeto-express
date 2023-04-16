const fs = require("fs");


function dbAtt(array){
    const data = {alunos: array};
    const jsonData = JSON.stringify(data, null, 2);
    fs.writeFileSync("db.json",jsonData);
}

const dbLoad = () =>{  
    try{
      const data = fs.readFileSync("db.json", "utf-8");
      return JSON.parse(data);
    }catch (e){
      console.log(e);
      return {alunos : []};
    }
}

function encontrarAlunoNome(nome){
    const alunos = dbLoad().alunos;
    let alunoEncontrado = alunos.filter(el => el.nome.toLowerCase().includes(nome));
    return alunoEncontrado;
}
function encontrarAlunoNota(nota){
    const alunos = dbLoad().alunos;
    let notaEncontrada = alunos.filter(el => el.media >= Number(nota));
    return notaEncontrada;
}
function adicionarAluno(nome, matricula, media, email){
  try{
    const alunos = dbLoad().alunos;
    const novoAluno = {
        id: alunos.length,
        nome: nome,
        email: email,
        matricula: matricula,
        media: media,
      };
      alunos.push(novoAluno);
      dbAtt(alunos);
      return novoAluno;
  }catch (e){
    console.log(e);
    throw new Error("Erro ao adicionar aluno: " + e.message);
  }
}

function atualizarAluno(nome, media, id) {
  const alunos = dbLoad().alunos;
    const aluno = alunos.find(aluno => aluno.id === id);
    if (aluno) {
      aluno.nome = nome;
      aluno.media = media;
      dbAtt(alunos);
      return aluno;
    } else {
      return !aluno;
    }
  }

function deletarAluno(index){
  const alunos = dbLoad().alunos;
  let indexEncontrado = alunos.findIndex(el => el.id === Number(index));
  if(indexEncontrado === -1){
    return "Index inválido";
  }else{
    alunos.splice(indexEncontrado,1);
    dbAtt(alunos);
    return alunos;
  }
}


module.exports = {encontrarAlunoNome,encontrarAlunoNota,adicionarAluno, atualizarAluno, deletarAluno, dbLoad};