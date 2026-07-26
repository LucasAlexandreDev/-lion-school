/*****************************************************************************
 * Object     : Arquivo responsável por carregar a tela de desempenho individual do aluno com os dados da API
 * Date       : 2026-07-25
 * Development: Lucas Alexandre da Silva
 * Version    : 1.0
 * Screen     : 03 - desempenho do aluno
 ****************************************************************************/

'use strict'

// ---| Import dos métodos de requisição e da tela anterior para o botão voltar |---
import { getAluno } from "../../api/lionSchool.js"
import { inicializarAlunos } from "./telaAlunosCurso.js"

// ---| Funções da Interface |---

// Função responsável por inicializar a busca dos dados detalhados do aluno na API recebendo todos os parâmetros necessários
export const inicializarDadosAluno = async function (idAluno, siglaCurso) {
    
    // Altera o comportamento do botão do header para voltar para a listagem dos alunos do curso
    let spanTextoHeader = document.getElementById('texto-acao-header')
    let containerSair   = document.querySelector('header .container-sair')
    
    if (spanTextoHeader) {
        spanTextoHeader.textContent = 'Voltar'
    }

    if (containerSair) {
        
        containerSair.onclick = () => {
            
            if (spanTextoHeader) spanTextoHeader.textContent = 'Sair'
            containerSair.onclick = null 
            
            // Retorna para a tela de listagem de alunos daquele curso passando a sigla
            inicializarAlunos(siglaCurso)
        }
    }
    
    // Seleciona a tag <main id="root"> e limpa o conteúdo dela
    let result = document.getElementById('root')
    result.replaceChildren()

    // Faz a requisição assíncrona para buscar os dados específicos do aluno 
    let dadosAluno = await getAluno(idAluno)

    if (dadosAluno) {

        // Envia os dados obtidos para a função responsável por criar os elementos visuais da tela de desempenho
        criarTelaDadosAluno(dadosAluno)
    
    } else {
        alert("[ERRO] AO CARREGAR OS DADOS DE DESEMPENHO DO ALUNO")
    }
}

// Função responsável por montar a estrutura HTML da tela de desempenho do aluno
const criarTelaDadosAluno = async function (aluno) {

    const result = document.getElementById("root")
    
    // ---| Criação da DIV Principal da Tela de Dados do Aluno |---
    let divPrincipal       = document.createElement("div")
    divPrincipal.className = 'container-dados-aluno-geral'

    // ---| Criação do Card do Aluno (Lado esquerdo) |---
    let cardAluno       = document.createElement("div")
    cardAluno.className = `card-aluno-detalhe ${aluno.status.toLowerCase()}`

    let imgAluno = document.createElement("img")
    imgAluno.src = aluno.foto
    imgAluno.alt = `foto de ${aluno.nome}`

    let spanNomeAluno         = document.createElement("span")
    spanNomeAluno.textContent = aluno.nome 

    cardAluno.append(imgAluno, spanNomeAluno)

    // ---| Criação do Container de Notas / Gráfico (Lado direito) |---
    let divContainerNotas       = document.createElement("div")
    divContainerNotas.className = 'container-grafico-notas'

    // Iteração direta sobre o array de desempenho vindo do JSON
    aluno.desempenho.forEach(itemDesempenho => {
        
        let linhaMateria       = document.createElement("div")
        linhaMateria.className = 'linha-materia'

        // Criação e exibição do valor numérico da nota no topo da barra 
        let spanValor         = document.createElement("span")
        spanValor.className   = 'valor-nota'
        spanValor.textContent = itemDesempenho.valor

        // Criação da estrutura de fundo (trilho) da barra do gráfico
        let barraFundo       = document.createElement("div")
        barraFundo.className = 'barra-grafico-fundo'

        // Configuração da altura da barra preenchida com base na nota
        let barraPreenchida         = document.createElement("div")
        barraPreenchida.style.height = `${itemDesempenho.valor}%`

        // Verificação e aplicação da classe de cor específica para cada disciplina
        let categoria = itemDesempenho.categoria.toUpperCase()
        
        if (categoria === 'IP') {
            barraPreenchida.className = 'barra-grafico-categoria-ip'
        
        } else if (categoria === 'LING') {
            barraPreenchida.className = 'barra-grafico-categoria-ling'
        
        } else {
            barraPreenchida.className = 'barra-grafico-preenchida'
        }

        barraFundo.append(barraPreenchida)
    

        // Sigla da Matéria (Exibida na PARTE INFERIOR da barra)
        let spanCategoria         = document.createElement("span")
        spanCategoria.className   = 'sigla-materia'
        spanCategoria.textContent = itemDesempenho.categoria

        // Monta a linha com nota em cima, barra no meio e categoria embaixo
        linhaMateria.append(spanValor, barraFundo, spanCategoria)
        divContainerNotas.append(linhaMateria)
    })

    // ---| Adição dos elementos criados dentro da divPrincipal |---
    divPrincipal.append(cardAluno, divContainerNotas)
    result.append(divPrincipal)
}