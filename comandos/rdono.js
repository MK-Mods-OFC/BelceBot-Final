//REQUERINDO MODULOS
const { decryptMedia } = require('@open-wa/wa-decrypt')
const menu = require('../lib/menu')
const moment = require("moment-timezone")
const { version } = require('../package.json');
const msgs_texto = require('../lib/msgs')
const {criarTexto,erroComandoMsg, removerNegritoComando, timestampParaData} = require('../lib/util')
const {desbloquearComandosGlobal, bloquearComandosGlobal} = require("../lib/bloqueioComandos")
const cadastrarGrupo = require("../lib/cadastrarGrupo")
const db = require('../lib/database')
const fs = require("fs-extra")
const path = require("path")
const {botAlterarLimitador, botInfo, botAlterarLimiteDiario, botQtdLimiteDiario, botAlterarLimitarMensagensPv, botAlterarAutoSticker, botAlterarAntitrava, botAlterarPvLiberado} = require('../lib/bot')

module.exports = rdono = async(client,message) => {
    try{
        const {id, from, sender, isGroupMsg, t, chat, caption, type, mimetype, isMedia, quotedMsg, quotedMsgObj, mentionedJidList } = message
        let { body } = message
        const commands = caption || body || ''
        var command = commands.toLowerCase().split(' ')[0] || ''
        command = removerNegritoComando(command)
        const args =  commands.split(' ')
        const botNumber = await client.getHostNumber()
        const blockNumber = await client.getBlockedIds()
        const groupId = isGroupMsg ? chat.groupMetadata.id : ''
        const rownerNumber = process.env.NUMERO_RDONO.trim()
        const ownerNumber2 = process.env.NUMERO_RDONO2.trim()
        const isROwner = rownerNumber == sender.id.replace(/@c.us/g, '')
        const isROwner2 = ownerNumber2 == sender.id.replace(/@c.us/g, '')
        if (!isROwner && !isROwner2) return client.reply(from, msgs_texto.permissao.apenas_dono_bot, id)

        switch(command){
            case "×menucreador":
                await client.sendText(from, menu.menuCreador())
                break

            case "×usuarios":
                if(args.length === 1) return await client.reply(from, erroComandoMsg(command), id)
                var tipo = args[1].toLowerCase()
                var usuarios = await db.obterUsuariosTipo(tipo)
                if(usuarios.length == 0) return await client.reply(from, msgs_texto.admin.usuarios.nao_encontrado, id)
                var respostaItens = ''
                for (var usuario of usuarios) respostaItens += criarTexto(msgs_texto.admin.usuarios.resposta_item, usuario.nome, usuario.id_usuario.replace("@c.us", ""), usuario.comandos_total)
                var resposta = criarTexto(msgs_texto.admin.usuarios.resposta_titulo, tipo.toUpperCase(), usuarios.length, respostaItens)
                await client.sendTextWithMentions(from, resposta)
                break

            case "×alterartipo":
                if(args.length === 1) return await client.reply(from, erroComandoMsg(command), id)
                var usuario_tipo = ""
                if(quotedMsg) usuario_tipo = quotedMsgObj.author
                else if(mentionedJidList.length === 1) usuario_tipo = mentionedJidList[0]
                else if(args.length > 2) usuario_tipo = args.slice(2).join("").replace(/\W+/g,"")+"@c.us"
                else return await client.reply(from, erroComandoMsg(command),id)
                if(rownerNumber == usuario_tipo.replace("@c.us","")) return await client.reply(from, msgs_texto.admin.alterartipo.tipo_dono,id)
                let c_registrado = await db.verificarRegistro(usuario_tipo)
                if(c_registrado){
                    var alterou = await db.alterarTipoUsuario(usuario_tipo, args[1])
                    if(!alterou) return await client.reply(msgs_texto.admin.alterartipo.tipo_invalido, id)
                    await client.reply(from, criarTexto(msgs_texto.admin.alterartipo.sucesso, args[1].toUpperCase()),id)
                } else {
                    await client.reply(from, msgs_texto.admin.alterartipo.nao_registrado,id)
                }
                break
        
            case "×tipos":
                var tipos = botInfo().limite_diario.limite_tipos, respostaTipos = ''
                for (var tipo in tipos) respostaTipos += criarTexto(msgs_texto.admin.tipos.item_tipo, msgs_texto.tipos[tipo], tipos[tipo] || "∞")
                await client.reply(from, criarTexto(msgs_texto.admin.tipos.resposta, respostaTipos), id)
                break
            
            case "×rtodos":
                if(!botInfo().limite_diario.status) return await client.reply(from, msgs_texto.admin.rtodos.erro_limite_diario,id)
                await db.resetarComandosDia()
                await client.reply(from, msgs_texto.admin.rtodos.sucesso,id)
                break

            case '×bctodos':
                if(args.length === 1) return await client.reply(from, erroComandoMsg(command), id)
                var mensagem = body.slice(9).trim(), chats = await client.getAllChats(), bloqueados = await client.getBlockedIds()
                await client.reply(from, criarTexto(msgs_texto.admin.bctodos.espera, chats.length, chats.length), id)
                for (let chat of chats) {
                    if(chat.isGroup && !chat.isReadOnly && !chat.isAnnounceGrpRestrict){
                        await new Promise((resolve)=>{
                            setTimeout(async ()=>{
                                resolve(await client.sendText(chat.id, criarTexto(msgs_texto.admin.bctodos.anuncio, mensagem)))
                            }, 1000)
                        })
                    } else {
                        if(!bloqueados.includes(chat.id)) {
                            await new Promise((resolve)=>{
                                setTimeout(async ()=>{
                                    resolve(await client.sendText(chat.id, criarTexto(msgs_texto.admin.bctodos.anuncio, mensagem)))
                                }, 1000)
                            })
                        }
                    }
                }
                await client.reply(from, msgs_texto.admin.bctodos.bc_sucesso , id)
                break

            case '×bccontatos':
                if(args.length === 1) return client.reply(from, erroComandoMsg(command), id)
                var mensagem = body.slice(12).trim(), chats = await client.getAllChats(), grupos = await client.getAllGroups(), bloqueados = await client.getBlockedIds(), qtdChatContatos = chats.length - grupos.length
                await client.reply(from, criarTexto(msgs_texto.admin.bccontatos.espera, qtdChatContatos, qtdChatContatos), id)
                for (let chat of chats) {
                    if(!chat.isGroup && !bloqueados.includes(chat.id)) {
                        await new Promise((resolve)=>{
                            setTimeout(async ()=>{
                                resolve(await client.sendText(chat.id, criarTexto(msgs_texto.admin.bccontatos.anuncio, mensagem)))
                            }, 1000)
                        })
                    }
                }
                await client.reply(from, msgs_texto.admin.bccontatos.bc_sucesso , id)
                break
            
            case '×bcgrupos':
                if(args.length === 1) return client.reply(from, erroComandoMsg(command), id)
                var mensagem = body.slice(10).trim(), grupos = await client.getAllGroups()
                await client.reply(from, criarTexto(msgs_texto.admin.bcgrupos.espera, grupos.length, grupos.length) , id)
                for (var grupo of grupos) {
                    if (!grupo.isReadOnly && !grupo.isAnnounceGrpRestrict) {
                        await new Promise((resolve)=>{
                            setTimeout(async ()=>{
                                resolve(await client.sendText(grupo.id, criarTexto(msgs_texto.admin.bcgrupos.anuncio, mensagem)))
                            }, 1000)
                        })
                    }
                }
                await client.reply(from, msgs_texto.admin.bcgrupos.bc_sucesso , id)
                break

            case '×desligar':
                await client.reply(from, msgs_texto.admin.desligar.sucesso, id)
                await client.kill()
                break
        }
    } catch(err){
        throw err
    }
    
}