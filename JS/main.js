/*****************************************************************************
 * Object     : Arquivo responsável por carregar a tela inicial com os cursos da API
 * Date       : 2026-07-23
 * Development: Lucas Alexandre da Silva
 * Version    : 1.0
 * Screen     : 01 - root 
 ****************************************************************************/

'use strict'

// ---| Import dos métodos de requisição |---
import { getCursos } from "../api/lionSchool.js"

// ---| Funções da Interface |---

// Função responsável por inicializar a busca dos cursos na API e chama a montagem da tela.
const inicializarCursos = async function () {
    
    // Seleciona a tag <main id="root"> e limpa o conteúdo dela
    let result = document.getElementById('root')
    result.replaceChildren()

    // Faz a requisição assíncrona para buscar a lista de cursos na API e aguarda o resultado
    let listaCursos = await getCursos()

    if(listaCursos) {
        
        // Envia os dados obtidos para a função responsável por criar os elementos visuais na tela
        criarTelaCursos(listaCursos)
    
    }else{
        alert("[ERRO] AO CARREGAR OS DADOS DOS CURSOS")
    }
   
}

// Função responsável por montar a estrutura HTML da tela inicial com os dados dinâmicos dos cursos vindos da API.
const criarTelaCursos = async function (listaCursos) {

    // Armazena o id do arquivos aonde vamos inserir os elementos com os dados dinâmicos
    const result = document.getElementById("root")
    
    // ---| Criação da DIV Principal da Tela Curso |---

    // Criação da div mãe da tela 
    let divPrincipal       = document.createElement("div")
    divPrincipal.className = 'container-curso'

    // ---| Crição da parte da esquerda da tela (texto core + img dos equipamentos) |---

    // Criação da div que vai armazenar o texto core
    let divApresentacao       = document.createElement("div")
    divApresentacao.className = 'container-apresentacao'

    // Crição do h2 que vai armazenar o título da apresentação
    let textoApresentacao       = document.createElement("h2")
    textoApresentacao.className = 'texto-apresentacao'

    // Criação do span que vai armazenar a palavra 'curso' que está em distaque no título de apresentação
    let spanCurso         = document.createElement("span")
    spanCurso.className   = 'span-curso'
    spanCurso.textContent = 'curso'

    // Criação da quebra de linha para bater com o design
    let quebraLinha = document.createElement("br")

    // Ajunção do (título + spanCurso + quebra linha) para formar a frase completa de apresentação
    textoApresentacao.append('Escolha um ', spanCurso, quebraLinha, 'para gerenciar') // append -> Adição do elemento filho dentro do container pai

    // Criação da div que vai armazenar a img dos aparelhos eletrônicos
    let divEquipamentos       = document.createElement("div")
    divEquipamentos.className = 'container-equipamentos'

    // Criação da img dos equipamentos
    let imgEquipamentos = document.createElement("img")
    imgEquipamentos.src = '../IMG/equipamentos.png'
    imgEquipamentos.alt = 'imagem dos equipamentos eletrônicos'

    // Adição do elementro da img dentro da div de equipamentos
    divEquipamentos.append(imgEquipamentos)

    // Adição dos elementos (texto core + img dos equipamentos) dentro da div de apresentação
    divApresentacao.append(textoApresentacao, divEquipamentos)


    // ---| Crição da parte da central da tela (img da estudante)|---

    // Crição da div que vai armazenar a img da estudante
    let divIlustracao       = document.createElement("div")
    divIlustracao.className = 'container-ilustracao'

    // Crição da img da estudante
    let imgEstudante = document.createElement("img")
    imgEstudante.src = '../IMG/estudante.png'
    imgEstudante.alt = 'imagem da estudante ilustrada'

    // Adição da img para dentro da div ilustração
    divIlustracao.append(imgEstudante)


    // ---| Crição da parte da direita da tela (dois botões do curso) |---

    // Crição da div que vai armazenar os dois botões dos cursos disponíveis na API
    let divAcoesBtn       = document.createElement("div")
    divAcoesBtn.className = 'container-botao'

    // Criação do laço de repetição, para encontrar e retonar uma lista de todos os cursos disponíveis na API
    listaCursos.forEach(itemCurso =>{

        // Criação do botão que vai armezenar o icon e o nome do curso
        let btnCurso         = document.createElement("button")
        btnCurso.className   = 'btn-curso'

         // Criação da imagem do icon do símbolo de cada curso disponível
        let imgIconCurso = document.createElement("img")
        imgIconCurso.src = itemCurso.icon
        imgIconCurso.alt = 'imagem do icon do curso percorrido'

        // Crição do span que vai conter o nome do curso 
        let spanSiglaCurso          = document.createElement("span")
        spanSiglaCurso.textContent  = itemCurso.sigla 

        // Adição da imagem do icon + nome do curso dentro do btn
        btnCurso.append(imgIconCurso, spanSiglaCurso)

        // Adição do btnCurso dentro da divAcaoBtn
        divAcoesBtn.append(btnCurso)

    })

    // ---| Adição de todos os elemetos criados dentro da divPrincipal da Tela Curso |---
    divPrincipal.append(divApresentacao, divIlustracao, divAcoesBtn)
    result.append(divPrincipal)
}

// Inicialização da criação da Tela de Curso
inicializarCursos()

