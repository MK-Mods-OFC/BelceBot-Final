//REQUERINDO MÓDULOS
const fs = require('fs-extra')
const axios = require('axios')
const menu = require('../lib/menu')
const msgs_texto = require('../lib/msgs')
const { version } = require('../package.json')

const {criarTexto, erroComandoMsg, removerNegritoComando, timestampParaData} = require("../lib/util")
const path = require('path')
const db = require('../lib/database')
const {botInfo} = require(path.resolve("lib/bot.js"))

module.exports = info = async(client, message, abrirMenu) => {
    try{
        const {id, from, sender, chat, isGroupMsg, caption, body, quotedMsg, mentionedJidList} = message
        const { pushname, verifiedName, formattedName } = sender, username = pushname || verifiedName || formattedName
        const commands = caption || body || ''
        var command = commands.toLowerCase().split(' ')[0] || ''
        command = removerNegritoComando(command)
        const args =  commands.split(' ')
        const user = sender.id
        const botNumber = await client.getHostNumber()
        const groupId = isGroupMsg ? chat.groupMetadata.id : ''
        const groupAdmins = isGroupMsg ? await client.getGroupAdmins(groupId) : ''
        const isGroupAdmins = isGroupMsg ? groupAdmins.includes(sender.id) : false
        const ownerNumber = process.env.NUMERO_DONO.trim()
        if(abrirMenu) command = "×menu"

        switch(command){
            case "×info":
                const botFotoURL = await client.getProfilePicFromServer(botNumber+'@c.us')
                var infoBot = JSON.parse(fs.readFileSync(path.resolve("database/json/bot.json")))
                var botInicializacaoData = timestampParaData(infoBot.iniciado)
                var resposta = criarTexto(msgs_texto.info.info.resposta, process.env.NOME_ADMINISTRADOR.trim(), process.env.NOME_BOT.trim(), botInicializacaoData, infoBot.cmds_executados, ownerNumber, version)
                if(botFotoURL != undefined){
                    await client.sendFileFromUrl(from, botFotoURL, "botfoto.jpg", resposta, id)
                } else {
                    await client.reply(from, resposta, id)
                }
                break
            
            case '×profile':
            case '×perfil':
                if (isGroupMsg) {
                    if (mentionedJidList.length !== 0) menUser = await client.getContact(mentionedJidList[0])
                    var qmid = quotedMsg ? quotedMsgObj.sender.id : (mentionedJidList.length !== 0 ? menUser.id : user)
                    var pic = await client.getProfilePicFromServer(qmid)
                    var namae = quotedMsg ? quotedMsgObj.sender.pushname : (mentionedJidList.length !== 0 ? menUser.pushname : pushname)
                    var sts = await client.getStatus(qmid)
                    var adm = groupAdmins.includes(qmid) ? 'Si' : 'No'
                    var { status } = sts;status == '' || status == '401' ? status = '' : status = `\n\n💌️ *Frase de mensaje?*\n${status}`
                    if (pic == null || typeof pic === 'object') { var pfp = errorurl } else { var pfp = pic }
                    await client.sendFileFromUrl(from, pfp, 'pfo.jpg', `🔖️ *Usertag? ${namae}*
👑️ *Administrador? ${adm}*`, id)
                } else return await client.reply(from, msgs_texto.permissao.grupo, id)
                break

            case "×reportar":
                if(args.length == 1) return client.reply(from, erroComandoMsg(command) ,id)
                var usuarioMensagem = body.slice(10).trim(), resposta = criarTexto(msgs_texto.info.reportar.resposta, username, sender.id.replace("@c.us",""), usuarioMensagem)
                await client.sendText(ownerNumber+"@c.us", resposta)
                await client.reply(from,msgs_texto.info.reportar.sucesso,id)
                break
            
            case '×meusdados':
                var dadosUsuario = await db.obterUsuario(sender.id), tipoUsuario = dadosUsuario.tipo, maxComandosDia = dadosUsuario.max_comandos_dia ||  "Sem limite" 
                tipoUsuario = msgs_texto.tipos[tipoUsuario]
                var nomeUsuario = username , resposta = criarTexto(msgs_texto.info.meusdados.resposta_geral, tipoUsuario, nomeUsuario, dadosUsuario.comandos_total)
                if(botInfo().limite_diario.status) resposta += criarTexto(msgs_texto.info.meusdados.resposta_limite_diario, dadosUsuario.comandos_dia, maxComandosDia, maxComandosDia)
                if(isGroupMsg){
                    var dadosGrupo = await db.obterGrupo(groupId)
                    if(dadosGrupo.contador.status){
                        var usuarioAtividade = await db.obterAtividade(groupId,sender.id)
                        resposta += criarTexto(msgs_texto.info.meusdados.resposta_grupo, usuarioAtividade.msg)
                    }   
                }
                await client.reply(from, resposta, id)
                break
            
            case '×menu':
            case '×ajuda': 
                var dadosUsuario = await db.obterUsuario(sender.id), tipoUsuario = dadosUsuario.tipo, maxComandosDia = dadosUsuario.max_comandos_dia || "Sem limite" 
                tipoUsuario = msgs_texto.tipos[tipoUsuario]
                var dadosResposta = '', nomeUsuario = username
                if(botInfo().limite_diario.status){
                    dadosResposta = criarTexto(msgs_texto.info.ajuda.resposta_limite_diario, nomeUsuario, dadosUsuario.comandos_dia, maxComandosDia, tipoUsuario)
                } else {
                    dadosResposta = criarTexto(msgs_texto.info.ajuda.resposta_comum, nomeUsuario, tipoUsuario)
                }
                dadosResposta += `╍╍╍╍╍𝙱𝙸𝙴𝙽𝚅𝙴𝙽𝙸𝙳𝙾╍╍╍╍╍╍\n`

                if(args.length == 1){
                    var menuResposta = menu.menuPrincipal()
                    const logo = './lib/imagemenus/logo.jpg'
                    await client.sendFile(from, logo, 'logo.jpg', dadosResposta+menuResposta)
                } else {
                    var usuarioOpcao = args[1]
                    var menuResposta = menu.menuPrincipal()
                    switch(usuarioOpcao){
                        case "0":
                            menuResposta = menu.menuInfoSuporte()
                            break
                        case "1":
                            menuResposta = menu.menuFigurinhas()
                            break
                        case "2":
                            menuResposta = menu.menuUtilidades()
                            break
                        case "3":
                            menuResposta = menu.menuDownload()
                            break
                        case "4":
                            if(isGroupMsg) menuResposta = menu.menuGrupo(isGroupAdmins)
                            else return await client.reply(from, msgs_texto.permissao.grupo, id)
                            break
                        case "5":
                            menuResposta = menu.menuDiversao(isGroupMsg)
                            break
                        case "6":
                            menuResposta = menu.menuCreditos()
                            break
                        case "7":
                            menuResposta = menu.menuSpam()
                            break
                        case "8":
                            menuResposta = menu.menuMaker()
                            break
                    }
                    const logo = './lib/imagemenus/logo.jpg'
                    await client.sendFile(from, logo, 'logo.jpg', dadosResposta+menuResposta)
                }
                break

            case '×spam': 
                var dadosUsuario = await db.obterUsuario(sender.id), tipoUsuario = dadosUsuario.tipo, maxComandosDia = dadosUsuario.max_comandos_dia || "Sin limite" 
                tipoUsuario = msgs_texto.tipos[tipoUsuario]
                var dadosResposta = '', nomeUsuario = username
                if(botInfo().limite_diario.status){
                    dadosResposta = criarTexto(msgs_texto.info.ajuda.resposta_limite_diario, nomeUsuario, dadosUsuario.comandos_dia, maxComandosDia, tipoUsuario)
                } else {
                    dadosResposta = criarTexto(msgs_texto.info.ajuda.resposta_comum, nomeUsuario, tipoUsuario)
                }
                dadosResposta += `╍╍╍╍╍𝙱𝙸𝙴𝙽𝚅𝙴𝙽𝙸𝙳𝙾╍╍╍╍╍╍\n`

                if(args.length == 1){
                    var menuResposta = menu.menuSpam()
                    const logo = '../lib/imagemenus/logo.jpg'
                    await client.sendFile(from, logo, 'logo.jpg', dadosResposta+menuResposta)
                } else {
                    var usuarioOpcao = args[1]
                    var menuResposta = menu.menuSpam()
                    switch(usuarioOpcao){
                        case "0":
                            menuResposta = menu.menuInstagram()
                            break
                        case "1":
                            menuResposta = menu.menuTikTok()
                            break
                        case "2":
                            menuResposta = menu.menuDiscord()
                            break
                        case "3":
                            menuResposta = menu.menuTwitch()
                            break
                        case "4":
                            menuResposta = menu.menuYouTube()
                            break
                        case "5":
                            menuResposta = menu.menuGrupos()
                            break
                        case "6":
                            menuResposta = menu.menuBots()
                            break
                        case "7":
                            menuResposta = menu.menuWhaInm()
                            break

                    }
                    const logo = './lib/imagemenus/logo.jpg'
                    await client.sendFile(from, logo, 'logo.jpg', dadosResposta+menuResposta)
                }
                break
        }
    } catch(err){
        throw err
    }
    

}