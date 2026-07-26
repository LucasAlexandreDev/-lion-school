/*****************************************************************************
 * Object     : Arquivo responsável por carregar a tela contendo os alunos de um determinado curso com os dados da API
 * Date       : 2026-07-24
 * Development: Lucas Alexandre da Silva
 * Version    : 1.0
 * Screen     : 02 - listagem dos alunos
 ****************************************************************************/

'use strict'

// ---| Import dos métodos de requisição |---
import { getAlunoCurso, getAlunoStatus } from "../../api/lionSchool.js"
import { inicializarCursos } from "../main.js"
import { inicializarDadosAluno } from "./telaDadosAluno.js"

// ---| Funções da Interface |---

// Função responsável por inicializar a busca dos alunos na API com base no curso selecionado e chama a montagem da tela.
export const inicializarAlunos = async function (siglaCurso) {
    
    // Altera o botão fixo do header de "Sair" para "Voltar" ao entrar na tela de alunos
    let spanTextoHeader = document.getElementById('texto-acao-header')
    let containerSair = document.querySelector('header .container-sair')
    
    if (spanTextoHeader) {
        spanTextoHeader.textContent = 'Voltar'
    }

    // Configura a ação de clique para voltar à tela principal
    if (containerSair) {
        
        // Remove eventos anteriores para evitar duplicações e define a nova ação
        containerSair.onclick = () => {
            
            // Retorna o texto do header para "Sair"
            if (spanTextoHeader) spanTextoHeader.textContent = 'Sair'
            
            // Remove a ação de clique do voltar para que o botão volte a se comportar como "Sair"
            containerSair.onclick = null 
            
            // Limpa o root e chama a função que carrega a tela principal (main)
            let result = document.getElementById('root')
            result.replaceChildren()
            
            // Chama a função que inicializa a sua tela root
            inicializarCursos()
        }
    }
    
    // Seleciona a tag <main id="root"> e limpa o conteúdo dela
    let result = document.getElementById('root')
    result.replaceChildren()

    // Converte a sigla do curso (DS ou REDES) para o ID numérico esperado pela API
    let idCurso = siglaCurso === 'DS' ? 1 : 2

    // Faz a requisição assíncrona para buscar a lista de alunos do curso na API e aguarda o resultado
    let listaAlunos = await getAlunoCurso(idCurso)

    if(listaAlunos) {
        
        // Envia os dados obtidos para a função responsável por criar os elementos visuais na tela
        criarTelaAlunos(listaAlunos, siglaCurso, idCurso)
    
    } else {
        alert("[ERRO] AO CARREGAR OS DADOS DOS ALUNOS")
    }
}

// Função responsável por montar a estrutura HTML da tela de alunos com os dados dinâmicos vindos da API
const criarTelaAlunos = async function (listaAlunos, siglaCurso, idCurso) {

    // Armazena o id do arquivo aonde vamos inserir os elementos com os dados dinâmicos
    const result = document.getElementById("root")
    
    // ---| Criação da DIV Principal da Tela de Alunos |---

    // Criação da div mãe da tela 
    let divPrincipal       = document.createElement("div")
    divPrincipal.className = 'container-alunos-geral'

    // ---| Criação do Topo (Filtro de Status + Legenda + Título do Curso) |---

    let divTopo       = document.createElement("div")
    divTopo.className = 'container-topo-alunos'

    // Criação da div que vai agrupar o select de filtro e a legenda lado a lado
    let divLinhaFiltro       = document.createElement("div")
    divLinhaFiltro.className = 'linha-filtro-alunos'

    // Criação do select para filtrar os alunos por status (cursando ou finalizado)
    let selectStatus       = document.createElement("select")
    selectStatus.className = 'select-status'

    // Valor do option inicial (Permite voltar para o estado padrão)
    let optionDefault         = document.createElement("option")
    optionDefault.textContent = 'Status'
    optionDefault.value       = 'todos'
    optionDefault.selected    = true

    // Valor do option finalizado
    let optionFinalizado         = document.createElement("option")
    optionFinalizado.textContent = 'Finalizado'
    optionFinalizado.value       = 'finalizado'

    // Valor do option cursando
    let optionCursando         = document.createElement("option")
    optionCursando.textContent = 'Cursando'
    optionCursando.value       = 'cursando'

    // Adição dos valores dos option dentro do select
    selectStatus.append(optionDefault, optionFinalizado, optionCursando)

    // ---| Criação da Legenda de cores referente ao status dos alunos |---

    // Criação da div que vai armazenar a legenda de cores dos status
    let divLegenda       = document.createElement("div")
    divLegenda.className = 'container-legenda'

    // Criação do texto fixo "LEGENDA"
    let textoLegenda         = document.createElement("span")
    textoLegenda.className   = 'texto-legenda'
    textoLegenda.textContent = 'LEGENDA'

    // Criação do item de legenda referente ao status "Cursando"
    let itemLegendaCursando       = document.createElement("div")
    itemLegendaCursando.className = 'item-legenda'

    let corLegendaCursando       = document.createElement("span")
    corLegendaCursando.className = 'cor-legenda cursando'

    let textoLegendaCursando         = document.createElement("span")
    textoLegendaCursando.textContent = 'Cursando'

    // Adição da cor + texto dentro do item de legenda "Cursando"
    itemLegendaCursando.append(corLegendaCursando, textoLegendaCursando)

    // Criação do item de legenda referente ao status "Finalizado"
    let itemLegendaFinalizado       = document.createElement("div")
    itemLegendaFinalizado.className = 'item-legenda'

    let corLegendaFinalizado       = document.createElement("span")
    corLegendaFinalizado.className = 'cor-legenda finalizado'

    let textoLegendaFinalizado         = document.createElement("span")
    textoLegendaFinalizado.textContent = 'Finalizado'

    // Adição da cor + texto dentro do item de legenda "Finalizado"
    itemLegendaFinalizado.append(corLegendaFinalizado, textoLegendaFinalizado)

    // Adição do texto "LEGENDA" + os dois itens dentro da div de legenda
    divLegenda.append(textoLegenda, itemLegendaCursando, itemLegendaFinalizado)

    // Adição do select e da legenda dentro da linha de filtro
    divLinhaFiltro.append(selectStatus, divLegenda)

    // Criação do h2 que vai armazenar o nome completo do curso
    let tituloCurso       = document.createElement("h2")
    tituloCurso.className = 'titulo-tela-alunos'

    // Define o texto do título dinamicamente com base na sigla do curso recebida: se for 'DS', exibe 'Desenvolvimento de Sistemas', caso contrário, exibe 'Redes de Computadores'
    tituloCurso.textContent = siglaCurso === 'DS' ? 'Desenvolvimento de Sistemas' : 'Redes de Computadores'

    // Adição da linha de filtro e do título dentro da div do topo
    divTopo.append(divLinhaFiltro, tituloCurso)


    // ---| Criação da Grade de Cards dos Alunos |---

    // Criação da div que vai armazenar todos os cards dos alunos em formato de grade
    let divCardsGrid       = document.createElement("div")
    divCardsGrid.className = 'grid-cards-alunos'

    // Função auxiliar para renderizar os cards dos alunos no container de grade filtrando estritamente pelo ID do curso da tela
    const renderizarCards = (alunos) => {
        divCardsGrid.replaceChildren()

        alunos.forEach(itemAluno => {
            
            // Garante que o aluno exibido pertence estritamente ao curso atual da tela
            if (itemAluno.curso_id === idCurso) {
                
                // Criação do card que vai armazenar a foto e o nome do aluno
                let cardAluno       = document.createElement("div")
                cardAluno.className = `card-aluno ${itemAluno.status.toLowerCase()}` // Adiciona a classe base e o status para estilização

                // Criação da imagem da foto do aluno
                let imgAluno = document.createElement("img")
                imgAluno.src = itemAluno.foto
                imgAluno.alt = 'foto do aluno percorrido'

                // Criação do span que vai conter o nome do aluno 
                let spanNomeAluno         = document.createElement("span")
                spanNomeAluno.textContent = itemAluno.nome 

                // Adição da foto + nome do aluno dentro do card
                cardAluno.append(imgAluno, spanNomeAluno)

                // ---| ADICIONANDO O EVENTO DE CLIQUE PARA A TELA DE DADOS DO ALUNO |---
                cardAluno.addEventListener('click', () => {
                    
                    // Passamos o identificador único do aluno e a sigla do curso
                    inicializarDadosAluno(itemAluno.id, siglaCurso,)
                })

                // Adição do cardAluno dentro da div de grade
                divCardsGrid.append(cardAluno)
            }
        })
    }

    // Renderização inicial com todos os alunos do curso utilizando os dados obtidos de getAlunoCurso
    renderizarCards(listaAlunos)

    // ---| Evento de mudança no select para consumir getAlunoCurso ou getAlunoStatus |---
    selectStatus.addEventListener('change', async () => {
        
        let statusSelecionado = selectStatus.value

        if (statusSelecionado === "todos") {
            
            // Se selecionar "Status", exibe todos os alunos do curso usando a lista padrão carregada pelo curso
            renderizarCards(listaAlunos)
        
        } else {
            
            // Se selecionar "Finalizado" ou "Cursando", busca na API usando o método getAlunoStatus
            let alunosPorStatus = await getAlunoStatus(statusSelecionado)
            
            if (alunosPorStatus) {
                renderizarCards(alunosPorStatus)
            
            } else {
                alert("[ERRO] AO FILTRAR OS DADOS DOS ALUNOS POR STATUS")
            }
        }
    })

    // ---| Adição de todos os elementos criados dentro da divPrincipal da Tela de Alunos |---
    divPrincipal.append(divTopo, divCardsGrid)
    result.append(divPrincipal)

}