const apiURL = "https://lion-school-phbo.onrender.com/"

export async function getCursos(){

    const response = await fetch(apiURL)

    if(!response.ok) throw new Error("Erro ao listar todos os Cursos")
    return response.json()
}

export async function getAlunos(id){

    const response = await fetch(`${apiURL}/${id}`)

    if(!response.ok) throw new Error("Erro ao listar tosos os Alunos")
    return response
} 

export async function getAlunoCurso(id, materia){

    const response = await fetch(`${apiURL}/alunos${id}?curso_id=${materia}`)

    if(!response.ok) throw new Error("Erro ao filtro alunos pelo curso")
    return response
}

export async function getAlunoStatus(id, statusCurso){

    const response = await fetch(`${apiURL}/alunos${id}?status=${statusCurso}`)

    if(!response.ok) throw new Error("Errro ao filtrar alunos pelo status (cursando/finalizado)")
    return response
}

export async function getInfoAluno(id){

    const response = await fetch(`${apiURL}/alunos/${id}`)

    if(!response.ok) throw new Error("Erro ao buscar detallhes de um aluno")
    return response
}
