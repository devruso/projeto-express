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
function encontrarAlunoNome(nome){
    let alunoEncontrado = alunos.filter(el => el.nome.toLowerCase().includes(nome));
    return alunoEncontrado;
}
function encontrarAlunoNota(nota){
    let notaEncontrada = alunos.filter(el => el.media >= Number(nota));
    return notaEncontrada;
}

function adicionarAluno(aluno) {
    const novoAluno = {
      id: alunos.length,
      nome: aluno.nome,
      email: aluno.email,
      matricula: aluno.matricula,
      media: aluno.media,
    };
    alunos.push(novoAluno);
  }

module.exports = {alunos, encontrarAlunoNome,encontrarAlunoNota, adicionarAluno};