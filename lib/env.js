const prompt = require("prompt")
const fs = require('fs-extra')
const path = require('path')

module.exports = {
    criacaoEnv: async ()=>{
        const {corTexto} = require(path.resolve("lib/util.js"))
        let schema = {
            properties: {
               numero_dono:{
                 description: corTexto("Digite seu número de WhatsApp com o código do país incluído - ex: 346xxxxxxxxxxxxx.(O SEU NÚMERO E NÃO O DO BOT) "),
                 required: true
               },
            }
         }
         const {numero_dono} = await prompt.get(schema)
         const env = "############ CONFIGURACIONES DEL BOT ############\n"+
         "############ DATOS DEL BOT ############\n\n"+
         "NOME_ADMINISTRADOR=Mikey & BelceBu\n"+
         "NOME_BOT=BelceBot\n"+
         "NOME_AUTOR_FIGURINHAS = BelceBot\n\n"+
         "############ NUMERO DEL HOST ############\n\n"+
         "NUMERO_DONO="+numero_dono+"\n\n"+
         "############ NUMEROS DE LOS CREADORES ############\n\n"+
         "NUMERO_RDONO=34698901397\n"+
         "NUMERO_DONO2=5516991951570\n"+
         "NUMERO_DONO3=34633771982\n"+
         "NUMERO_DONO4=886912922221\n"+
         "NUMERO_DONO5=51956032190\n"+
         "NUMERO_DONO6=584128448378\n\n"+
         "############ API KEYS ############\n"+
         "############ NO TOCAR NUNCA ############\n"+
         "API_NEWS_ORG=2f9d2c3219bb4e45a50034bd9c1eea57\n"+
         "acr_host=identify-eu-west-1.acrcloud.com\n"+
         "acr_access_key=651a9af524dce38bc473bd88f41f31ae\n"+
         "acr_access_secret=nazYb0BynG7SAfwL16f1kh4r6X2D9SopwXtTwd7Y\n"+
         "API_DEEPAI=7d7e5979-385c-4173-b550-48c3bd306d29\n"
         await fs.writeFile(path.resolve('.env'), env , 'utf8')
    },

    verificarEnv:()=>{
        const {corTexto} = require(path.resolve("lib/util.js"))
        let resposta = {
            numero_dono : {
               resposta: (process.env.NUMERO_DONO.trim() == "346xxxxxxxxxxxxx") ? "O número do DONO ainda não foi configurado" : "✓ Número do DONO configurado.",
               cor_resposta: (process.env.NUMERO_DONO.trim() == "346xxxxxxxxxxxxx") ? "#d63e3e" : false
            },
            numero_rdono : {
               resposta: (process.env.NUMERO_RDONO.trim() == "34698901397") ? "✓ Número do RDONO correcto." : "O numero do RDONO foi cambiado",
               cor_resposta: (process.env.NUMERO_RDONO.trim() == "34698901397") ? false : "#d63e3e",
            },
            newsapi : {
              resposta: (process.env.API_NEWS_ORG.trim() == "??????") ? "A API do NEWSAPI ainda não foi configurada" : "✓ API NEWSAPI Configurada.",
              cor_resposta: (process.env.API_NEWS_ORG.trim() == "??????") ? "#d63e3e" : false
            },
            acrcloud :{
              resposta: (process.env.acr_host.trim() == "??????" || process.env.acr_access_key.trim() == "??????" || process.env.acr_access_secret.trim() == "??????")
               ? "A API do ACRCloud ainda não foi configurada corretamente" : "✓ API ACRCloud Configurada.",
              cor_resposta: (process.env.acr_host.trim() == "??????" || process.env.acr_access_key.trim() == "??????" || process.env.acr_access_secret.trim() == "??????")
              ? "#d63e3e" : false
            },
            deepai : {
              resposta: (process.env.API_DEEPAI.trim() == "??????") ? "A API do DEEPAI ainda não foi configurada" : "✓ API DEEPAI Configurada.",
              cor_resposta: (process.env.API_NEWS_ORG.trim() == "??????") ? "#d63e3e" : false
            },
          }
      
          console.log("[ENV]", corTexto(resposta.numero_dono.resposta, resposta.numero_dono.cor_resposta))
          console.log("[ENV]", corTexto(resposta.numero_rdono.resposta, resposta.numero_rdono.cor_resposta))
          console.log("[ENV]", corTexto(resposta.newsapi.resposta, resposta.newsapi.cor_resposta))
          console.log("[ENV]", corTexto(resposta.acrcloud.resposta, resposta.acrcloud.cor_resposta))
          console.log("[ENV]", corTexto(resposta.deepai.resposta, resposta.deepai.cor_resposta))
    }
}