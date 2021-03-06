//REQUERINDO MODULOS
const msgs_texto = require('../lib/msgs')
const {criarTexto, primeiraLetraMaiuscula, erroComandoMsg, removerNegritoComando} = require("../lib/util")
const path = require("path")
const api = require('../lib/api')

module.exports = diversao = async(client,message) => {
    try {
        const {id, from, sender, isGroupMsg, chat, caption, quotedMsg, quotedMsgObj, mentionedJidList, body} = message
        const commands = caption || body || ''
        var command = commands.toLowerCase().split(' ')[0] || ''
        command = removerNegritoComando(command)
        const args =  commands.split(' ')
        const ownerNumber = process.env.NUMERO_DONO.trim() // NΓΊmero do administrador do bot
        const botNumber = await client.getHostNumber()
        const groupId = isGroupMsg ? chat.groupMetadata.id : ''
        const groupAdmins = isGroupMsg ? await client.getGroupAdmins(groupId) : ''
        const isGroupAdmins = isGroupMsg ? groupAdmins.includes(sender.id) : false
        const isBotGroupAdmins = isGroupMsg ? groupAdmins.includes(botNumber + '@c.us') : false
        const groupOwner = isGroupMsg ? chat.groupMetadata.owner : ''
        const gays = [
            'π Β‘ππππ πππππππ πππππππ! π³οΈβπ',
            'πππ% π³οΈβπ',
            '99% π³οΈβπ',
            '98% π³οΈβπ',
            '97% π³οΈβπ',
            '96% π³οΈβπ',
            '95% π³οΈβπ',
            '94% π³οΈβπ',
            '93% π³οΈβπ',
            '92% π³οΈβπ',
            '91% π³οΈβπ',
            '90% π³οΈβπ',
            '89% π³οΈβπ',
            '88% π³οΈβπ',
            '87% π³οΈβπ',
            '86% π³οΈβπ',
            '85% π³οΈβπ',
            '84% π³οΈβπ',
            '83% π³οΈβπ',
            '82% π³οΈβπ',
            '81% π³οΈβπ',
            '80% π³οΈβπ',
            '79% π³οΈβπ',
            '78% π³οΈβπ',
            '77% π³οΈβπ',
            '76% π³οΈβπ',
            '75% π³οΈβπ',
            '74% π³οΈβπ',
            '73% π³οΈβπ',
            '72% π³οΈβπ',
            '71% π³οΈβπ',
            '70% π³οΈβπ',
            '69% π³οΈβπ',
            '68% π³οΈβπ',
            '67% π³οΈβπ',
            '66% π³οΈβπ',
            '64% π³οΈβπ',
            '63% π³οΈβπ',
            '62% π³οΈβπ',
            '61% π³οΈβπ',
            '60% π³οΈβπ',
            '59% π³οΈβπ',
            '58% π³οΈβπ',
            '57% π³οΈβπ',
            '56% π³οΈβπ',
            '55% π³οΈβπ',
            '54% π³οΈβπ',
            '53% π³οΈβπ',
            '52% π³οΈβπ',
            '51% π³οΈβπ',
            '50% π³οΈβπ',
            '49% π³οΈβπ',
            '48% π³οΈβπ',
            '47% π³οΈβπ',
            '46% π³οΈβπ',
            '45% π³οΈβπ',
            '44% π³οΈβπ',
            '43% π³οΈβπ',
            '42% π³οΈβπ',
            '41% π³οΈβπ',
            '40% π³οΈβπ',
            '39% π³οΈβπ',
            '38% π³οΈβπ',
            '37% π³οΈβπ',
            '36% π³οΈβπ',
            '35% π³οΈβπ',
            '34% π³οΈβπ',
            '33% π³οΈβπ',
            '32% π³οΈβπ',
            '31% π³οΈβπ',
            '30% π³οΈβπ',
            '29% π³οΈβπ',
            '28% π³οΈβπ',
            '27% π³οΈβπ',
            '26% π³οΈβπ',
            '25% π³οΈβπ',
            '24% π³οΈβπ',
            '23% π³οΈβπ',
            '22% π³οΈβπ',
            '21% π³οΈβπ',
            '20% π³οΈβπ',
            '19% π³οΈβπ',
            '18% π³οΈβπ',
            '17% π³οΈβπ',
            '16% π³οΈβπ',
            '15% π³οΈβπ',
            '14% π³οΈβπ',
            '13% π³οΈβπ',
            '12% π³οΈβπ',
            '11% π³οΈβπ',
            '10% π³οΈβπ',
            '9% π³οΈβπ',
            '8% π³οΈβπ',
            '7% π³οΈβπ',
            '6% π³οΈβπ',
            '5% π³οΈβπ',
            '4% π³οΈβπ',
            '3% π³οΈβπ',
            '2% π³οΈβπ',
            '1% π³οΈβπ',
            '0% π³οΈβπ',
            ]

        switch(command){
            case 'Γdetector' :
                if (!isGroupMsg) return await client.reply(from, msgs_texto.permissao.grupo, id)
                if(!quotedMsg) return await client.reply(from, erroComandoMsg(command) , id)
                var imgsDetector = ['verdade','vaipra','mentiroso','meengana','kao','incerteza','estresse','conversapraboi']
                var indexAleatorio = Math.floor(Math.random() * imgsDetector.length)
                await client.sendFile(from, './media/img/comandos/detector/calibrando.png', 'detector.png', msgs_texto.diversao.detector.espera, id)
                await client.sendFile(from, `./media/img/comandos/detector/${imgsDetector[indexAleatorio]}.png`, 'detector.png', "", quotedMsgObj.id)
                break
            
            case 'Γviadometro' :
                if (!isGroupMsg) return await client.reply(from, msgs_texto.permissao.grupo, id)
                if(!quotedMsg && mentionedJidList.length == 0) return await client.reply(from, erroComandoMsg(command), id)
                if(mentionedJidList.length > 1) return await client.reply(from, msgs_texto.diversao.viadometro.apenas_um, id)
                var respostas = msgs_texto.diversao.viadometro.respostas
                var indexAleatorio = Math.floor(Math.random() * respostas.length), idResposta = null, alvo = null
                if(mentionedJidList.length == 1) idResposta = id, alvo = mentionedJidList[0].replace(/@c.us/g, '')
                else idResposta = quotedMsgObj.id, alvo = quotedMsgObj.author.replace(/@c.us/g, '')
                if(ownerNumber == alvo) indexAleatorio = 0
                var respostaTexto = criarTexto(msgs_texto.diversao.viadometro.resposta,respostas[indexAleatorio])
                await client.reply(from, respostaTexto, idResposta)
                break
            
            case 'Γbafometro' :
                if (!isGroupMsg) return await client.reply(from, msgs_texto.permissao.grupo, id)
                if(!quotedMsg && mentionedJidList.length == 0) return await client.reply(from, erroComandoMsg(command), id)
                if (mentionedJidList.length > 1) return await client.reply(from, msgs_texto.diversao.bafometro.apenas_um, id)
                var respostas = msgs_texto.diversao.bafometro.respostas
                var indexAleatorio = Math.floor(Math.random() * respostas.length), idResposta = null, alvo = null
                if(mentionedJidList.length == 1) idResposta = id, alvo = mentionedJidList[0].replace(/@c.us/g, '')
                else idResposta = quotedMsgObj.id, alvo = quotedMsgObj.author.replace(/@c.us/g, '')
                if(ownerNumber == alvo) indexAleatorio = 0
                var respostaTexto = criarTexto(msgs_texto.diversao.bafometro.resposta, respostas[indexAleatorio])
                await client.reply(from, respostaTexto, idResposta)
                break

            case "Γcaracoroa":
                var ladosMoeda = ["cara","coroa"], indexAleatorio = Math.floor(Math.random() * ladosMoeda.length)
                await client.reply(from, msgs_texto.diversao.caracoroa.espera, id)
                var respostaTexto = criarTexto(msgs_texto.diversao.caracoroa.resposta, primeiraLetraMaiuscula(ladosMoeda[indexAleatorio]))
                await client.sendFile(from, path.resolve(`media/img/comandos/caracoroa/${ladosMoeda[indexAleatorio]}.png`), `${ladosMoeda[indexAleatorio]}.png`, respostaTexto, id)
                break

            case "Γppt":
                var ppt = ["pedra","papel","tesoura"], indexAleatorio = Math.floor(Math.random() * ppt.length)
                if(args.length === 1) return await client.reply(from, erroComandoMsg(command), id)
                if(!ppt.includes(args[1].toLowerCase())) return await client.reply(from, msgs_texto.diversao.ppt.opcao_erro, id)
                var escolhaBot = ppt[indexAleatorio], iconeEscolhaBot = null, escolhaUsuario = args[1].toLowerCase(), iconeEscolhaUsuario = null, vitoriaUsuario = null
                if(escolhaBot == "pedra"){
                    iconeEscolhaBot = "β"
                    if(escolhaUsuario == "pedra") vitoriaUsuario = null, iconeEscolhaUsuario = "β"
                    if(escolhaUsuario == "tesoura") vitoriaUsuario = false, iconeEscolhaUsuario = "βοΈ"
                    if(escolhaUsuario == "papel") vitoriaUsuario = true, iconeEscolhaUsuario = "β"
                } else if(escolhaBot == "papel"){
                    iconeEscolhaBot = "β"
                    if(escolhaUsuario == "pedra") vitoriaUsuario = false, iconeEscolhaUsuario = "β"
                    if(escolhaUsuario == "tesoura") vitoriaUsuario = true, iconeEscolhaUsuario = "βοΈ"
                    if(escolhaUsuario == "papel") vitoriaUsuario = null, iconeEscolhaUsuario = "β"
                } else  {
                    iconeEscolhaBot = "βοΈ"
                    if(escolhaUsuario == "pedra") vitoriaUsuario = true, iconeEscolhaUsuario = "β"
                    if(escolhaUsuario == "tesoura") vitoriaUsuario = null, iconeEscolhaUsuario = "βοΈ"
                    if(escolhaUsuario == "papel") vitoriaUsuario = false, iconeEscolhaUsuario = "β"
                }
                var textoResultado = ''
                if(vitoriaUsuario == true) textoResultado = msgs_texto.diversao.ppt.resposta.vitoria
                else if(vitoriaUsuario == false) textoResultado = msgs_texto.diversao.ppt.resposta.derrota
                else textoResultado = msgs_texto.diversao.ppt.resposta.empate
                await client.reply(from, criarTexto(textoResultado, iconeEscolhaUsuario, iconeEscolhaBot), id)
                break

            case "Γmassacote":
            case 'Γmascote':
                var mascoteFotoURL = "https://i.imgur.com/mVwa7q4.png"
                await client.sendFileFromUrl(from, mascoteFotoURL, 'mascote.jpeg', 'Whatsapp Jr.', id)
                break 

            case 'Γmalacos':
                const malacosFotoURL = "https://i.imgur.com/7bcn2TK.jpg"
                await client.sendFileFromUrl(from, malacosFotoURL, 'malacos.jpg', 'Somos o problema', id)
                break

            case 'Γroletarussa':
                if (!isGroupMsg) return await client.reply(from, msgs_texto.permissao.grupo, id)
                if (!isGroupAdmins) return await client.reply(from, msgs_texto.permissao.apenas_admin , id)
                if (!isBotGroupAdmins) return await client.reply(from,msgs_texto.permissao.bot_admin, id)
                var idParticipantesAtuais = await client.getGroupMembersId(groupId)
                idParticipantesAtuais.splice(idParticipantesAtuais.indexOf(groupOwner),1)
                idParticipantesAtuais.splice(idParticipantesAtuais.indexOf(botNumber+'@c.us'),1)
                if(idParticipantesAtuais.length == 0) return await client.reply(from, msgs_texto.diversao.roletarussa.sem_membros, id)
                var indexAleatorio = Math.floor(Math.random() * idParticipantesAtuais.length)
                var respostaTexto = criarTexto(msgs_texto.diversao.roletarussa.resposta, idParticipantesAtuais[indexAleatorio].replace(/@c.us/g, ''))
                await client.reply(from, msgs_texto.diversao.roletarussa.espera , id)
                await client.sendTextWithMentions(from, respostaTexto)
                await client.removeParticipant(groupId, idParticipantesAtuais[indexAleatorio])
                break
            
            case 'Γcasal':
                if (!isGroupMsg) return await client.reply(from, msgs_texto.permissao.grupo, id)
                var idParticipantesAtuais = await client.getGroupMembersId(groupId)
                if(idParticipantesAtuais.length < 2) return await client.reply(from, msgs_texto.diversao.casal.minimo, id)
                var indexAleatorio = Math.floor(Math.random() * idParticipantesAtuais.length)
                var pessoaEscolhida1 = idParticipantesAtuais[indexAleatorio]
                idParticipantesAtuais.splice(indexAleatorio,1)
                indexAleatorio = Math.floor(Math.random() * idParticipantesAtuais.length)
                var pessoaEscolhida2 = idParticipantesAtuais[indexAleatorio]
                var respostaTexto = criarTexto(msgs_texto.diversao.casal.resposta, pessoaEscolhida1.replace(/@c.us/g, ''), pessoaEscolhida2.replace(/@c.us/g, ''))
                await client.sendTextWithMentions(from, respostaTexto)
                break

            case 'Γgadometro':
                if (!isGroupMsg) return await client.reply(from, msgs_texto.permissao.grupo, id)
                if(!quotedMsg && mentionedJidList.length === 0) return await client.reply(from, erroComandoMsg(command) , id)
                if(mentionedJidList.length > 1) return await client.reply(from, msgs_texto.diversao.gadometro.apenas_um , id)
                var respostas = msgs_texto.diversao.gadometro.respostas 
                var indexAleatorio = Math.floor(Math.random() * respostas.length), idResposta = null, alvo = null
                if (mentionedJidList.length == 1) idResposta = id, alvo = mentionedJidList[0].replace(/@c.us/g, '')
                else idResposta = quotedMsgObj.id, alvo = quotedMsgObj.author.replace(/@c.us/g, '')
                if(ownerNumber == alvo) indexAleatorio = 0
                var respostaTexto = criarTexto(msgs_texto.diversao.gadometro.resposta, respostas[indexAleatorio])
                await client.reply(from, respostaTexto, idResposta)       
                break

            case 'Γgay':
                  if (!isGroupMsg) return client.reply(from, 'β *Β‘π³π ππππππππ, Β‘ππππ πππππππ ππππ ππ πππππ ππππ ππππππ ππ ππππππ!* β', id)
                  const ratings = args.join(' ')
                  const medidorgays = gays[Math.floor(Math.random() * (gays.length))]
                  if (!ratings) client.reply(from, '')
                  const logo = './media/lgtb.jpg'
                  await client.sendTextWithMentions(from, `π€π *Β‘πππππππ ππ ππππππππ ππππ!* ππ€\n\nπ³ @${mentionedJidList[0].replace('@c.us', '')}, *Β‘π―ππππ ππππππ ππ πππππ ππ π΄ππππππ πππππππ π πππ ππππ ππ*  *"${medidorgays}"*  *ππ πππ πππ π΄ππππππ ππ ππππππ πππ ππ ππ π?ππππ!* π³\n\n@${mentionedJidList[0].replace('@c.us', '')}\nπ€π³ *Β‘πππππππ πππππππ ππ ππππππ!* π³π€`)
            break

            case 'Γtop5':
                if (!isGroupMsg) return await client.reply(from, msgs_texto.permissao.grupo, id)
                if(args.length === 1) return await client.reply(from, erroComandoMsg(command), id)
                var temaRanking = body.slice(6).trim(), idParticipantesAtuais = await client.getGroupMembersId(groupId)
                if(idParticipantesAtuais.length < 5) return await client.reply(from,msgs_texto.diversao.top5.erro_membros, id)
                var respostaTexto = criarTexto(msgs_texto.diversao.top5.resposta_titulo, temaRanking)
                for (let i = 0 ; i < 5 ; i++){
                    var medalha = ""
                    switch(i+1){
                        case 1:
                            medalha = 'π₯'
                        break
                        case 2:
                            medalha = 'π₯'
                        break
                        case 3:
                            medalha = 'π₯'
                        break
                        default:
                            medalha = ''
                    }
                    var indexAleatorio = Math.floor(Math.random() * idParticipantesAtuais.length)
                    var membroSelecionado = idParticipantesAtuais[indexAleatorio]
                    respostaTexto += criarTexto(msgs_texto.diversao.top5.resposta_itens, medalha, i+1, membroSelecionado.replace(/@c.us/g, ''))
                    idParticipantesAtuais.splice(idParticipantesAtuais.indexOf(membroSelecionado),1)                
                }
                await client.sendTextWithMentions(from, respostaTexto)
                break

            case 'Γpar':
                if (!isGroupMsg) return await client.reply(from, msgs_texto.permissao.grupo, id)
                if(mentionedJidList.length !== 2) return await client.reply(from, erroComandoMsg(command) , id)
                var respostas = msgs_texto.diversao.par.respostas
                var indexAleatorio = Math.floor(Math.random() * respostas.length)
                var respostaTexto = criarTexto(msgs_texto.diversao.par.resposta, mentionedJidList[0].replace(/@c.us/g, ''), mentionedJidList[1].replace(/@c.us/g, ''), respostas[indexAleatorio])
                await client.sendTextWithMentions(from, respostaTexto)
                break

            case "Γfch":
                try{
                    var respostaFrase = await api.obterCartasContraHu()
                    await client.reply(from, respostaFrase, id)
                } catch(err){
                    await client.reply(from, err.message, id)
                }
                break    
        }
    } catch(err){
        throw err
    }
    
}