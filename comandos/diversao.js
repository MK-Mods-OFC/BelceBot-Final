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
        const ownerNumber = process.env.NUMERO_DONO.trim() // Número do administrador do bot
        const botNumber = await client.getHostNumber()
        const groupId = isGroupMsg ? chat.groupMetadata.id : ''
        const groupAdmins = isGroupMsg ? await client.getGroupAdmins(groupId) : ''
        const isGroupAdmins = isGroupMsg ? groupAdmins.includes(sender.id) : false
        const isBotGroupAdmins = isGroupMsg ? groupAdmins.includes(botNumber + '@c.us') : false
        const groupOwner = isGroupMsg ? chat.groupMetadata.owner : ''
        const gays = [
            '😂 ¡𝐄𝐑𝐄𝐒 𝐌𝐀𝐑𝐈𝐂𝐎𝐍 𝐏𝐄𝐑𝐃𝐈𝐃𝐎! 🏳️‍🌈',
            '𝟏𝟎𝟎% 🏳️‍🌈',
            '99% 🏳️‍🌈',
            '98% 🏳️‍🌈',
            '97% 🏳️‍🌈',
            '96% 🏳️‍🌈',
            '95% 🏳️‍🌈',
            '94% 🏳️‍🌈',
            '93% 🏳️‍🌈',
            '92% 🏳️‍🌈',
            '91% 🏳️‍🌈',
            '90% 🏳️‍🌈',
            '89% 🏳️‍🌈',
            '88% 🏳️‍🌈',
            '87% 🏳️‍🌈',
            '86% 🏳️‍🌈',
            '85% 🏳️‍🌈',
            '84% 🏳️‍🌈',
            '83% 🏳️‍🌈',
            '82% 🏳️‍🌈',
            '81% 🏳️‍🌈',
            '80% 🏳️‍🌈',
            '79% 🏳️‍🌈',
            '78% 🏳️‍🌈',
            '77% 🏳️‍🌈',
            '76% 🏳️‍🌈',
            '75% 🏳️‍🌈',
            '74% 🏳️‍🌈',
            '73% 🏳️‍🌈',
            '72% 🏳️‍🌈',
            '71% 🏳️‍🌈',
            '70% 🏳️‍🌈',
            '69% 🏳️‍🌈',
            '68% 🏳️‍🌈',
            '67% 🏳️‍🌈',
            '66% 🏳️‍🌈',
            '64% 🏳️‍🌈',
            '63% 🏳️‍🌈',
            '62% 🏳️‍🌈',
            '61% 🏳️‍🌈',
            '60% 🏳️‍🌈',
            '59% 🏳️‍🌈',
            '58% 🏳️‍🌈',
            '57% 🏳️‍🌈',
            '56% 🏳️‍🌈',
            '55% 🏳️‍🌈',
            '54% 🏳️‍🌈',
            '53% 🏳️‍🌈',
            '52% 🏳️‍🌈',
            '51% 🏳️‍🌈',
            '50% 🏳️‍🌈',
            '49% 🏳️‍🌈',
            '48% 🏳️‍🌈',
            '47% 🏳️‍🌈',
            '46% 🏳️‍🌈',
            '45% 🏳️‍🌈',
            '44% 🏳️‍🌈',
            '43% 🏳️‍🌈',
            '42% 🏳️‍🌈',
            '41% 🏳️‍🌈',
            '40% 🏳️‍🌈',
            '39% 🏳️‍🌈',
            '38% 🏳️‍🌈',
            '37% 🏳️‍🌈',
            '36% 🏳️‍🌈',
            '35% 🏳️‍🌈',
            '34% 🏳️‍🌈',
            '33% 🏳️‍🌈',
            '32% 🏳️‍🌈',
            '31% 🏳️‍🌈',
            '30% 🏳️‍🌈',
            '29% 🏳️‍🌈',
            '28% 🏳️‍🌈',
            '27% 🏳️‍🌈',
            '26% 🏳️‍🌈',
            '25% 🏳️‍🌈',
            '24% 🏳️‍🌈',
            '23% 🏳️‍🌈',
            '22% 🏳️‍🌈',
            '21% 🏳️‍🌈',
            '20% 🏳️‍🌈',
            '19% 🏳️‍🌈',
            '18% 🏳️‍🌈',
            '17% 🏳️‍🌈',
            '16% 🏳️‍🌈',
            '15% 🏳️‍🌈',
            '14% 🏳️‍🌈',
            '13% 🏳️‍🌈',
            '12% 🏳️‍🌈',
            '11% 🏳️‍🌈',
            '10% 🏳️‍🌈',
            '9% 🏳️‍🌈',
            '8% 🏳️‍🌈',
            '7% 🏳️‍🌈',
            '6% 🏳️‍🌈',
            '5% 🏳️‍🌈',
            '4% 🏳️‍🌈',
            '3% 🏳️‍🌈',
            '2% 🏳️‍🌈',
            '1% 🏳️‍🌈',
            '0% 🏳️‍🌈',
            ]

        switch(command){
            case '×detector' :
                if (!isGroupMsg) return await client.reply(from, msgs_texto.permissao.grupo, id)
                if(!quotedMsg) return await client.reply(from, erroComandoMsg(command) , id)
                var imgsDetector = ['verdade','vaipra','mentiroso','meengana','kao','incerteza','estresse','conversapraboi']
                var indexAleatorio = Math.floor(Math.random() * imgsDetector.length)
                await client.sendFile(from, './media/img/comandos/detector/calibrando.png', 'detector.png', msgs_texto.diversao.detector.espera, id)
                await client.sendFile(from, `./media/img/comandos/detector/${imgsDetector[indexAleatorio]}.png`, 'detector.png', "", quotedMsgObj.id)
                break
            
            case '×viadometro' :
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
            
            case '×bafometro' :
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

            case "×caracoroa":
                var ladosMoeda = ["cara","coroa"], indexAleatorio = Math.floor(Math.random() * ladosMoeda.length)
                await client.reply(from, msgs_texto.diversao.caracoroa.espera, id)
                var respostaTexto = criarTexto(msgs_texto.diversao.caracoroa.resposta, primeiraLetraMaiuscula(ladosMoeda[indexAleatorio]))
                await client.sendFile(from, path.resolve(`media/img/comandos/caracoroa/${ladosMoeda[indexAleatorio]}.png`), `${ladosMoeda[indexAleatorio]}.png`, respostaTexto, id)
                break

            case "×ppt":
                var ppt = ["pedra","papel","tesoura"], indexAleatorio = Math.floor(Math.random() * ppt.length)
                if(args.length === 1) return await client.reply(from, erroComandoMsg(command), id)
                if(!ppt.includes(args[1].toLowerCase())) return await client.reply(from, msgs_texto.diversao.ppt.opcao_erro, id)
                var escolhaBot = ppt[indexAleatorio], iconeEscolhaBot = null, escolhaUsuario = args[1].toLowerCase(), iconeEscolhaUsuario = null, vitoriaUsuario = null
                if(escolhaBot == "pedra"){
                    iconeEscolhaBot = "✊"
                    if(escolhaUsuario == "pedra") vitoriaUsuario = null, iconeEscolhaUsuario = "✊"
                    if(escolhaUsuario == "tesoura") vitoriaUsuario = false, iconeEscolhaUsuario = "✌️"
                    if(escolhaUsuario == "papel") vitoriaUsuario = true, iconeEscolhaUsuario = "✋"
                } else if(escolhaBot == "papel"){
                    iconeEscolhaBot = "✋"
                    if(escolhaUsuario == "pedra") vitoriaUsuario = false, iconeEscolhaUsuario = "✊"
                    if(escolhaUsuario == "tesoura") vitoriaUsuario = true, iconeEscolhaUsuario = "✌️"
                    if(escolhaUsuario == "papel") vitoriaUsuario = null, iconeEscolhaUsuario = "✋"
                } else  {
                    iconeEscolhaBot = "✌️"
                    if(escolhaUsuario == "pedra") vitoriaUsuario = true, iconeEscolhaUsuario = "✊"
                    if(escolhaUsuario == "tesoura") vitoriaUsuario = null, iconeEscolhaUsuario = "✌️"
                    if(escolhaUsuario == "papel") vitoriaUsuario = false, iconeEscolhaUsuario = "✋"
                }
                var textoResultado = ''
                if(vitoriaUsuario == true) textoResultado = msgs_texto.diversao.ppt.resposta.vitoria
                else if(vitoriaUsuario == false) textoResultado = msgs_texto.diversao.ppt.resposta.derrota
                else textoResultado = msgs_texto.diversao.ppt.resposta.empate
                await client.reply(from, criarTexto(textoResultado, iconeEscolhaUsuario, iconeEscolhaBot), id)
                break

            case "×massacote":
            case '×mascote':
                var mascoteFotoURL = "https://i.imgur.com/mVwa7q4.png"
                await client.sendFileFromUrl(from, mascoteFotoURL, 'mascote.jpeg', 'Whatsapp Jr.', id)
                break 

            case '×malacos':
                const malacosFotoURL = "https://i.imgur.com/7bcn2TK.jpg"
                await client.sendFileFromUrl(from, malacosFotoURL, 'malacos.jpg', 'Somos o problema', id)
                break

            case '×roletarussa':
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
            
            case '×casal':
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

            case '×gadometro':
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

            case '×gay':
                  if (!isGroupMsg) return client.reply(from, '❌ *¡𝑳𝒐 𝒔𝒆𝒏𝒕𝒊𝒎𝒐𝒔, ¡𝒆𝒔𝒕𝒆 𝒄𝒐𝒎𝒂𝒏𝒅𝒐 𝒔𝒐𝒍𝒐 𝒔𝒆 𝒑𝒖𝒆𝒅𝒆 𝒖𝒔𝒂𝒓 𝒅𝒆𝒏𝒕𝒓𝒐 𝒅𝒆 𝒈𝒓𝒖𝒑𝒐𝒔!* ❌', id)
                  const ratings = args.join(' ')
                  const medidorgays = gays[Math.floor(Math.random() * (gays.length))]
                  if (!ratings) client.reply(from, '')
                  const logo = './media/lgtb.jpg'
                  await client.sendTextWithMentions(from, `🖤😏 *¡𝐌𝐄𝐃𝐈𝐃𝐎𝐑 𝐃𝐄 𝐌𝐀𝐋𝐃𝐈𝐓𝐎𝐒 𝐆𝐀𝐘𝐒!* 😏🖤\n\n😳 @${mentionedJidList[0].replace('@c.us', '')}, *¡𝑯𝒆𝒎𝒐𝒔 𝒎𝒆𝒅𝒊𝒅𝒐 𝒕𝒖 𝒏𝒊𝒗𝒆𝒍 𝒅𝒆 𝑴𝒂𝒓𝒊𝒄𝒐𝒏 𝒑𝒆𝒓𝒅𝒊𝒅𝒐 𝒚 𝒉𝒂𝒔 𝒅𝒂𝒅𝒐 𝒖𝒏*  *"${medidorgays}"*  *𝒆𝒏 𝒔𝒆𝒓 𝒖𝒏𝒂 𝑴𝒂𝒓𝒊𝒄𝒐𝒏 𝒅𝒆 𝒎𝒊𝒆𝒓𝒅𝒂 𝒎𝒂𝒔 𝒆𝒏 𝒆𝒍 𝑮𝒓𝒖𝒑𝒐!* 😳\n\n@${mentionedJidList[0].replace('@c.us', '')}\n🖤😳 *¡𝐌𝐀𝐋𝐃𝐈𝐓𝐎 𝐌𝐀𝐑𝐈𝐂𝐎𝐍 𝐃𝐄 𝐌𝐈𝐄𝐑𝐃𝐀!* 😳🖤`)
            break

            case '×top5':
                if (!isGroupMsg) return await client.reply(from, msgs_texto.permissao.grupo, id)
                if(args.length === 1) return await client.reply(from, erroComandoMsg(command), id)
                var temaRanking = body.slice(6).trim(), idParticipantesAtuais = await client.getGroupMembersId(groupId)
                if(idParticipantesAtuais.length < 5) return await client.reply(from,msgs_texto.diversao.top5.erro_membros, id)
                var respostaTexto = criarTexto(msgs_texto.diversao.top5.resposta_titulo, temaRanking)
                for (let i = 0 ; i < 5 ; i++){
                    var medalha = ""
                    switch(i+1){
                        case 1:
                            medalha = '🥇'
                        break
                        case 2:
                            medalha = '🥈'
                        break
                        case 3:
                            medalha = '🥉'
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

            case '×par':
                if (!isGroupMsg) return await client.reply(from, msgs_texto.permissao.grupo, id)
                if(mentionedJidList.length !== 2) return await client.reply(from, erroComandoMsg(command) , id)
                var respostas = msgs_texto.diversao.par.respostas
                var indexAleatorio = Math.floor(Math.random() * respostas.length)
                var respostaTexto = criarTexto(msgs_texto.diversao.par.resposta, mentionedJidList[0].replace(/@c.us/g, ''), mentionedJidList[1].replace(/@c.us/g, ''), respostas[indexAleatorio])
                await client.sendTextWithMentions(from, respostaTexto)
                break

            case "×fch":
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