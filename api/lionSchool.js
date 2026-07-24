/*****************************************************************************
 * Object     : Arquivo responsável pela comunicação com a API da Lion School
 * Date       : 2026-07-23
 * Development: Lucas Alexandre da Silva
 * Version    : 1.0
 *****************************************************************************/

// ---| URL Base da API |---
const apiURL = 'https://lion-school-phbo.onrender.com/'

// ---| Função de requisição |---

// Função responsável por realiza uma requisição para a API utilizando o endpoint informado
const request = async function(endpoint){

    // Realiza a requisição para o endpoint informado
    const response = await fetch(`${apiURL}${endpoint}`)

    // Verifica se a API retornou uma resposta de sucesso
    if(!response.ok){
        throw new Error(`Erro ao acessar o endpoint: ${endpoint}`)
    }

    // Converte a resposta da API para o formato JSON
    const data = await response.json()

    // Retorna os dados obtidos da API
    return data
}

// ---| Funções da API |---

// Função responsável por solicitar à API a lista de todos os cursos cadastrados
export const getCursos = async function(){
    return await request('cursos')
}

// Função responsável por solicitar à API a lista de todos os alunos cadastrados
export const getAlunos = async function(){
    return await request('alunos')
}

// Função responsável por solicitar à API a lista de alunos pertencentes a um curso
export const getAlunoCurso = async function(idCurso){
    return await request(`alunos?curso_id=${idCurso}`)
}

// Função responsável por solicitar à API a lista de alunos conforme o status informado
export const getAlunoStatus = async function(status){
    return await request(`alunos?status=${status}`)
}

 // Função responsável por solicitar à API os dados de um aluno específico
export const getAluno = async function(id){
    return await request(`alunos/${id}`)
}