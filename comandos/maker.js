//REQUERINDO MÓDULOS
const { decryptMedia } = require('@open-wa/wa-decrypt')
const axios = require('axios')
const puppeteer = require('puppeteer')
const msgs_texto = require('../lib/msgs')
const {erroComandoMsg, consoleErro, removerNegritoComando} = require("../lib/util")
const {sticker, sleep} = require("../lib/sticker")
const options = { headless: true, userDataDir: "./logs/Chrome/Maker", args: ['--aggressive-cache-discard', '--disable-application-cache', '--disable-cache', '--disable-offline-load-stale-cache', '--disable-setuid-sandbox', '--disk-cache-size=0', '--ignore-certificate-errors', '--no-sandbox', '--single-process'] }

module.exports = maker = async(client,message) => {
    try{
        const { type, id, from, caption, isMedia, mimetype, quotedMsg, quotedMsgObj, body} = message
        const commands = caption || body || ''
        var command = commands.toLowerCase().split(' ')[0] || ''
        command = removerNegritoComando(command)
        const arg = body.trim().substring(body.indexOf(' ') + 1)
        const args =  commands.split(' ')
        const arks = args.join(' ')
        const uaOverride = 'WhatsApp/2.2029.4 Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36'

        switch(command){      
            case "×gaming":
                if (args.length == 0) return await client.reply(from, "escriba " + 'palavras/words/números/numbers.', id)
                await client.reply(from, "por favor espere", id)
                await client.sendFileFromUrl(from, `https://docs-jojo.herokuapp.com/api/gaming?text=${body.slice(8)}`, '', '', id)
                break

            case '×slogan':
                if (args.length == 0) return await client.reply(from, "escriba " + 'palavras/words/números/numbers.', id)
                await client.reply(from, "espere" + '\n\n20+ s.', id)
                const browsersg = await puppeteer.launch(options)
                const pagesg = await browsersg.newPage()
                await pagesg.goto('https://textpro.me/1917-style-text-effect-online-980.html', { waitUntil: "networkidle2", timeout: 0 }).then(async () => {
                    await pagesg.waitForSelector('#text-0')
                    await pagesg.type("#text-0", body.slice(8))
                    await pagesg.click("#submit")
                    await sleep(10000) 
                    await pagesg.waitForSelector('div[class="thumbnail"] > img')
                    const divElement = await pagesg.$eval('div[class="thumbnail"] > img', txLogo => txLogo.src)
                    await client.sendFileFromUrl(from, divElement, 'slogan.jpg', '', id)
                    await browsersg.close()
                })
                break

            case '×wolf':
                if (args.length >= 2 && arks.includes('|')) {
                    const wolftype = ["https://textpro.me/create-wolf-logo-black-white-937.html", "https://textpro.me/create-wolf-logo-galaxy-online-936.html"];
                    const wolfchoice = wolftype[Math.floor(Math.random() * wolftype.length)];
                    if (arg.split('|')[0].length >= 1000 || arg.split('|')[1].length >= 10) return await client.reply(from, 'Max: 10 letras/letters p/frase - phrase.', id)
                    await client.reply(from, "espere" + '\n\n20+ s.', id)
                    const browserwf = await puppeteer.launch(options)
                    const pagewf = await browserwf.newPage()
                    await pagewf.goto(wolfchoice, { waitUntil: "networkidle2", timeout: 0 }).then(async () => {
                        await pagewf.waitForSelector('#text-0')
                        await pagewf.type("#text-0", arg.split('|')[0])
                        await pagewf.type("#text-1", arg.split('|')[1])
                        await pagewf.click("#submit")
                        await sleep(10000) 
                        await pagewf.waitForSelector('div[class="thumbnail"] > img')
                        const divElement = await pagewf.$eval('div[class="thumbnail"] > img', txLogo => txLogo.src)
                        await client.sendFileFromUrl(from, divElement, 'wolf.jpg', '', id)
                        await browserwf.close()
                    })
                } else return await client.reply(from, "escriba " + 'palavras/words/números/numbers.' + '\n\n' + 'use 1 "|".', id)
                break

            case '×3d':
                if (args.length == 0) return await client.reply(from, "Escriba " + 'palavras/words/números/numbers.', id)
                const tdtype = ["https://textpro.me/3d-gradient-text-effect-online-free-1002.html", "https://textpro.me/3d-box-text-effect-online-880.html"];
                const tdchoice = tdtype[Math.floor(Math.random() * tdtype.length)];
                if (arks.length >= 16) return await client.reply(from, 'Max: 10 letras/letters.', id)
                await client.reply(from, "Espere" + '\n\n20+ s.', id)
                const browsertd = await puppeteer.launch(options)
                const pagetd = await browsertd.newPage()
                await pagetd.goto(tdchoice, { waitUntil: "networkidle2", timeout: 0 }).then(async () => {
                    await pagetd.waitForSelector('#text-0')
                    await pagetd.type("#text-0", body.slice(4))
                    await pagetd.click("#submit")
                    await sleep(10000) // Aumente se sua conexão for superr lenta
                    await pagetd.waitForSelector('div[class="thumbnail"] > img')
                    const divElement = await pagetd.$eval('div[class="thumbnail"] > img', txLogo => txLogo.src)
                    await client.sendFileFromUrl(from, divElement, '3d.jpg', '', id)
                    await browsertd.close()
                })
                break

            case '×thunder':
                if (args.length == 0) return await client.reply(from, "Escriba " + 'palavras/words/números/numbers.', id)
                if (arks.length >= 16) return await client.reply(from, 'Max: 10 letras/letters.', id)
                await client.reply(from, "Espere" + '\n\n20+ s.', id)
                const browserth = await puppeteer.launch(options)
                const pageth = await browserth.newPage()
                await pageth.goto("https://textpro.me/thunder-text-effect-online-881.html", { waitUntil: "networkidle2", timeout: 0 }).then(async () => {
                    await pageth.waitForSelector('#text-0')
                    await pageth.type("#text-0", body.slice(9))
                    await pageth.click("#submit")
                    await sleep(10000) // Aumente se sua conexão for superr lenta
                    await pageth.waitForSelector('div[class="thumbnail"] > img')
                    const divElement = await pageth.$eval('div[class="thumbnail"] > img', txLogo => txLogo.src)
                    await client.sendFileFromUrl(from, divElement, 'thunder.jpg', '', id)
                    await browserth.close()
                })
                break

            case '×thunder2':
                if (args.length == 0) return await client.reply(from, "Escriba " + 'palavras/words/números/numbers.', id)
                if (arks.length >= 16) return await client.reply(from, 'Max: 10 letras/letters.', id)
                await client.reply(from, "Espere" + '\n\n20+ s.', id)
                const browserth2 = await puppeteer.launch(options)
                const pageth2 = await browserth2.newPage()
                await pageth2.goto("https://textpro.me/online-thunder-text-effect-generator-1031.html", { waitUntil: "networkidle2", timeout: 0 }).then(async () => {
                    await pageth2.waitForSelector('#text-0')
                    await pageth2.type("#text-0", body.slice(9))
                    await pageth2.click("#submit")
                    await sleep(10000) // Aumente se sua conexão for superr lenta
                    await pageth2.waitForSelector('div[class="thumbnail"] > img')
                    const divElement = await pageth2.$eval('div[class="thumbnail"] > img', txLogo => txLogo.src)
                    await client.sendFileFromUrl(from, divElement, 'thunder2.jpg', '', id)
                    await browserth2.close()
                })
                break

            case '×light':
                if (args.length == 0) return await client.reply(from, "Escriba " + 'palavras/words/números/numbers.', id)
                if (arks.length >= 16) return await client.reply(from, 'Max: 10 letras/letters.', id)
                await client.reply(from, "Espere" + '\n\n20+ s.', id)
                const browserlg = await puppeteer.launch(options)
                const pagelg = await browserlg.newPage()
                await pagelg.goto("https://textpro.me/create-a-futuristic-technology-neon-light-text-effect-1006.html", { waitUntil: "networkidle2", timeout: 0 }).then(async () => {
                    await pagelg.waitForSelector('#text-0')
                    await pagelg.type("#text-0", body.slice(7))
                    await pagelg.click("#submit")
                    await sleep(10000) // Aumente se sua conexão for superr lenta
                    await pagelg.waitForSelector('div[class="thumbnail"] > img')
                    const divElement = await pagelg.$eval('div[class="thumbnail"] > img', txLogo => txLogo.src)
                    await client.sendFileFromUrl(from, divElement, 'light.jpg', '', id)
                    await browserlg.close()
                })
                break

            case '×glitch':
                if (args.length == 0) return await client.reply(from, "Escriba " + 'palavras/words/números/numbers.', id)
                if (arks.length >= 50) return await client.reply(from, 'Max: 10 letras/letters.', id)
                await client.reply(from, "Espere" + '\n\n20+ s.', id)
                const browsergt = await puppeteer.launch(options)
                const pagegt = await browsergt.newPage()
                await pagegt.goto("https://textpro.me/create-impressive-glitch-text-effects-online-1027.html", { waitUntil: "networkidle2", timeout: 0 }).then(async () => {
                    await pagegt.waitForSelector('#text-0')
                    await pagegt.type("#text-0", body.slice(8))
                    await pagegt.click("#submit")
                    await sleep(10000) // Aumente se sua conexão for superr lenta
                    await pagegt.waitForSelector('div[class="thumbnail"] > img')
                    const divElement = await pagegt.$eval('div[class="thumbnail"] > img', txLogo => txLogo.src)
                    await client.sendFileFromUrl(from, divElement, 'glitch.jpg', '', id)
                    await browsergt.close()
                })
                break

            case '×glitch2':
                if (args.length >= 2 && arks.includes('|')) {
                if (arg.split('|')[0].length >= 1000 || arg.split('|')[1].length >= 25) return await client.reply(from, 'Max: 10 letras/letters p/frase - phrase.', id)
                    await client.reply(from, "espere" + '\n\n20+ s.', id)
                    const browsergt2 = await puppeteer.launch(options)
                    const pagegt2 = await browsergt2.newPage()
                    await pagegt2.goto("https://textpro.me/create-a-glitch-text-effect-online-free-1026.html", { waitUntil: "networkidle2", timeout: 0 }).then(async () => {
                        await pagegt2.waitForSelector('#text-0')
                        await pagegt2.type("#text-0", arg.split('|')[0])
                        await pagegt2.type("#text-1", arg.split('|')[1])
                        await pagegt2.click("#submit")
                        await sleep(10000) 
                        await pagegt2.waitForSelector('div[class="thumbnail"] > img')
                        const divElement = await pagegt2.$eval('div[class="thumbnail"] > img', txLogo => txLogo.src)
                        await client.sendFileFromUrl(from, divElement, 'glitch.jpg', '', id)
                        await browsergt2.close()
                    })
                } else return await client.reply(from, "escriba " + 'palavras/words/números/numbers.' + '\n\n' + 'use 1 "|".', id)
                break

            case '×transformer':
                if (args.length == 0) return await client.reply(from, "Escriba " + 'palavras/words/números/numbers.', id)
                if (arks.length >= 50) return await client.reply(from, 'Max: 10 letras/letters.', id)
                await client.reply(from, "Espere" + '\n\n20+ s.', id)
                const browsertr = await puppeteer.launch(options)
                const pagetr = await browsertr.newPage()
                await pagetr.goto("https://textpro.me/create-a-transformer-text-effect-online-1035.html", { waitUntil: "networkidle2", timeout: 0 }).then(async () => {
                    await pagetr.waitForSelector('#text-0')
                    await pagetr.type("#text-0", body.slice(13))
                    await pagetr.click("#submit")
                    await sleep(10000) // Aumente se sua conexão for superr lenta
                    await pagetr.waitForSelector('div[class="thumbnail"] > img')
                    const divElement = await pagetr.$eval('div[class="thumbnail"] > img', txLogo => txLogo.src)
                    await client.sendFileFromUrl(from, divElement, 'transformer.jpg', '', id)
                    await browsertr.close()
                })
                break

            case '×bear':
                if (args.length == 0) return await client.reply(from, "Escriba " + 'palavras/words/números/numbers.', id)
                if (arks.length >= 50) return await client.reply(from, 'Max: 10 letras/letters.', id)
                await client.reply(from, "Espere" + '\n\n20+ s.', id)
                const browseros = await puppeteer.launch(options)
                const pageos = await browseros.newPage()
                await pageos.goto("https://textpro.me/online-black-and-white-bear-mascot-logo-creation-1012.html", { waitUntil: "networkidle2", timeout: 0 }).then(async () => {
                    await pageos.waitForSelector('#text-0')
                    await pageos.type("#text-0", body.slice(6))
                    await pageos.click("#submit")
                    await sleep(10000) // Aumente se sua conexão for superr lenta
                    await pageos.waitForSelector('div[class="thumbnail"] > img')
                    const divElement = await pageos.$eval('div[class="thumbnail"] > img', txLogo => txLogo.src)
                    await client.sendFileFromUrl(from, divElement, 'oso.jpg', '', id)
                    await browseros.close()
                })
                break

            case '×devil':
                if (args.length == 0) return await client.reply(from, "Escriba " + 'palavras/words/números/numbers.', id)
                if (arks.length >= 50) return await client.reply(from, 'Max: 10 letras/letters.', id)
                await client.reply(from, "Espere" + '\n\n20+ s.', id)
                const browserdv = await puppeteer.launch(options)
                const pagedv = await browserdv.newPage()
                await pagedv.goto("https://textpro.me/create-neon-devil-wings-text-effect-online-free-1014.html", { waitUntil: "networkidle2", timeout: 0 }).then(async () => {
                    await pagedv.waitForSelector('#text-0')
                    await pagedv.type("#text-0", body.slice(7))
                    await pagedv.click("#submit")
                    await sleep(10000) // Aumente se sua conexão for superr lenta
                    await pagedv.waitForSelector('div[class="thumbnail"] > img')
                    const divElement = await pagedv.$eval('div[class="thumbnail"] > img', txLogo => txLogo.src)
                    await client.sendFileFromUrl(from, divElement, 'devil.jpg', '', id)
                    await browserdv.close()
                })
                break

            case '×graffiti':
                if (args.length >= 2 && arks.includes('|')) {
                const graffititype = ["https://textpro.me/create-a-cool-graffiti-text-on-the-wall-1010.html", "https://textpro.me/create-cool-wall-graffiti-text-effect-online-1009.html"];
                const graffitichoice = graffititype[Math.floor(Math.random() * graffititype.length)];
                if (arg.split('|')[0].length >= 1000 || arg.split('|')[1].length >= 10) return await client.reply(from, 'Max: 10 letras/letters p/frase - phrase.', id)
                    await client.reply(from, "espere" + '\n\n20+ s.', id)
                    const browsergr = await puppeteer.launch(options)
                    const pagegr = await browsergr.newPage()
                    await pagegr.goto(graffitichoice, { waitUntil: "networkidle2", timeout: 0 }).then(async () => {
                        await pagegr.waitForSelector('#text-0')
                        await pagegr.type("#text-0", arg.split('|')[0])
                        await pagegr.type("#text-1", arg.split('|')[1])
                        await pagegr.click("#submit")
                        await sleep(10000) 
                        await pagegr.waitForSelector('div[class="thumbnail"] > img')
                        const divElement = await pagegr.$eval('div[class="thumbnail"] > img', txLogo => txLogo.src)
                        await client.sendFileFromUrl(from, divElement, 'graffiti.jpg', '', id)
                        await browsergr.close()
                    })
                } else return await client.reply(from, "escriba " + 'palavras/words/números/numbers.' + '\n\n' + 'use 1 "|".', id)
                break

            case '×graffiti2':
                if (args.length == 0) return await client.reply(from, "Escriba " + 'palavras/words/números/numbers.', id)
                if (arks.length >= 50) return await client.reply(from, 'Max: 10 letras/letters.', id)
                await client.reply(from, "Espere" + '\n\n20+ s.', id)
                const browsergr2 = await puppeteer.launch(options)
                const pagegr2 = await browsergr2.newPage()
                await pagegr2.goto("https://textpro.me/create-wonderful-graffiti-art-text-effect-1011.html", { waitUntil: "networkidle2", timeout: 0 }).then(async () => {
                    await pagegr2.waitForSelector('#text-0')
                    await pagegr2.type("#text-0", body.slice(11))
                    await pagegr2.click("#submit")
                    await sleep(10000) // Aumente se sua conexão for superr lenta
                    await pagegr2.waitForSelector('div[class="thumbnail"] > img')
                    const divElement = await pagegr2.$eval('div[class="thumbnail"] > img', txLogo => txLogo.src)
                    await client.sendFileFromUrl(from, divElement, 'graffiti.jpg', '', id)
                    await browsergr2.close()
                })
                break

            case '×demon':
                if (args.length == 0) return await client.reply(from, "Escriba " + 'palavras/words/números/numbers.', id)
                if (arks.length >= 50) return await client.reply(from, 'Max: 10 letras/letters.', id)
                await client.reply(from, "Espere" + '\n\n20+ s.', id)
                const browserdm = await puppeteer.launch(options)
                const pagedm = await browserdm.newPage()
                await pagedm.goto("https://textpro.me/create-green-horror-style-text-effect-online-1036.html", { waitUntil: "networkidle2", timeout: 0 }).then(async () => {
                    await pagedm.waitForSelector('#text-0')
                    await pagedm.type("#text-0", body.slice(7))
                    await pagedm.click("#submit")
                    await sleep(10000) // Aumente se sua conexão for superr lenta
                    await pagedm.waitForSelector('div[class="thumbnail"] > img')
                    const divElement = await pagedm.$eval('div[class="thumbnail"] > img', txLogo => txLogo.src)
                    await client.sendFileFromUrl(from, divElement, 'graffiti.jpg', '', id)
                    await browserdm.close()
                })
                break

            case '×berry':
                if (args.length == 0) return await client.reply(from, "Escriba " + 'palavras/words/números/numbers.', id)
                if (arks.length >= 50) return await client.reply(from, 'Max: 10 letras/letters.', id)
                await client.reply(from, "Espere" + '\n\n20+ s.', id)
                const browserbr = await puppeteer.launch(options)
                const pagebr = await browserbr.newPage()
                await pagebr.goto("https://textpro.me/create-berry-text-effect-online-free-1033.html", { waitUntil: "networkidle2", timeout: 0 }).then(async () => {
                    await pagebr.waitForSelector('#text-0')
                    await pagebr.type("#text-0", body.slice(7))
                    await pagebr.click("#submit")
                    await sleep(10000) // Aumente se sua conexão for superr lenta
                    await pagebr.waitForSelector('div[class="thumbnail"] > img')
                    const divElement = await pagebr.$eval('div[class="thumbnail"] > img', txLogo => txLogo.src)
                    await client.sendFileFromUrl(from, divElement, 'graffiti.jpg', '', id)
                    await browserbr.close()
                })
                break

            case '×retro':
                if (args.length >= 2 && arks.includes('|')) {
                if (arg.split('|')[0].length >= 1000 || arg.split('|')[1].length >= 50) return await client.reply(from, 'Max: 10 letras/letters p/frase - phrase.', id)
                    await client.reply(from, "espere" + '\n\n20+ s.', id)
                    const browserrt = await puppeteer.launch(options)
                    const pagert = await browserrt.newPage()
                    await pagert.goto("https://textpro.me/video-game-classic-8-bit-text-effect-1037.html", { waitUntil: "networkidle2", timeout: 0 }).then(async () => {
                        await pagert.waitForSelector('#text-0')
                        await pagert.type("#text-0", arg.split('|')[0])
                        await pagert.type("#text-1", arg.split('|')[1])
                        await pagert.click("#submit")
                        await sleep(10000) 
                        await pagert.waitForSelector('div[class="thumbnail"] > img')
                        const divElement = await pagert.$eval('div[class="thumbnail"] > img', txLogo => txLogo.src)
                        await client.sendFileFromUrl(from, divElement, 'retro.jpg', '', id)
                        await browserrt.close()
                    })
                } else return await client.reply(from, "escriba " + 'palavras/words/números/numbers.' + '\n\n' + 'use 1 "|".', id)
                break

            case '×layered':
                if (args.length >= 2 && arks.includes('|')) {
                if (arg.split('|')[0].length >= 1000 || arg.split('|')[1].length >= 10) return await client.reply(from, 'Max: 10 letras/letters p/frase - phrase.', id)
                    await client.reply(from, "espere" + '\n\n20+ s.', id)
                    const browserly = await puppeteer.launch(options)
                    const pagely = await browserly.newPage()
                    await pagely.goto("https://textpro.me/create-layered-text-effects-online-free-1032.html", { waitUntil: "networkidle2", timeout: 0 }).then(async () => {
                        await pagely.waitForSelector('#text-0')
                        await pagely.type("#text-0", arg.split('|')[0])
                        await pagely.type("#text-1", arg.split('|')[1])
                        await pagely.click("#submit")
                        await sleep(10000) 
                        await pagely.waitForSelector('div[class="thumbnail"] > img')
                        const divElement = await pagely.$eval('div[class="thumbnail"] > img', txLogo => txLogo.src)
                        await client.sendFileFromUrl(from, divElement, 'layered.jpg', '', id)
                        await browserly.close()
                    })
                } else return await client.reply(from, "escriba " + 'palavras/words/números/numbers.' + '\n\n' + 'use 1 "|".', id)
                break

            case '×neon':
                if (args.length == 0) return await client.reply(from, "Escriba " + 'palavras/words/números/numbers.', id)
                if (arks.length >= 50) return await client.reply(from, 'Max: 10 letras/letters.', id)
                const neontype = ["https://textpro.me/neon-light-text-effect-with-galaxy-style-981.html", "https://textpro.me/create-3d-neon-light-text-effect-online-1028.html", "https://textpro.me/neon-light-text-effect-online-882.html", "https://textpro.me/neon-text-effect-online-879.html", "https://textpro.me/green-neon-text-effect-874.html", "https://textpro.me/bokeh-text-effect-876.html", "https://textpro.me/free-advanced-glow-text-effect-873.html", "https://textpro.me/metal-rainbow-text-effect-854.html", "https://textpro.me/online-3d-gradient-text-effect-generator-1020.html", "https://textpro.me/create-a-free-online-watercolor-text-effect-1017.html"];
                const neonchoice = neontype[Math.floor(Math.random() * neontype.length)];
                await client.reply(from, "Espere" + '\n\n20+ s.', id)
                const browsernn = await puppeteer.launch(options)
                const pagenn = await browsernn.newPage()
                await pagenn.goto(neonchoice, { waitUntil: "networkidle2", timeout: 0 }).then(async () => {
                    await pagenn.waitForSelector('#text-0')
                    await pagenn.type("#text-0", body.slice(6))
                    await pagenn.click("#submit")
                    await sleep(10000) // Aumente se sua conexão for superr lenta
                    await pagenn.waitForSelector('div[class="thumbnail"] > img')
                    const divElement = await pagenn.$eval('div[class="thumbnail"] > img', txLogo => txLogo.src)
                    await client.sendFileFromUrl(from, divElement, 'neon.jpg', '', id)
                    await browsernn.close()
                })
                break

            case '×magma':
                if (args.length == 0) return await client.reply(from, "Escriba " + 'palavras/words/números/numbers.', id)
                if (arks.length >= 50) return await client.reply(from, 'Max: 10 letras/letters.', id)
                await client.reply(from, "Espere" + '\n\n20+ s.', id)
                const browsermm = await puppeteer.launch(options)
                const pagemm = await browsermm.newPage()
                await pagemm.goto("https://textpro.me/create-a-magma-hot-text-effect-online-1030.html", { waitUntil: "networkidle2", timeout: 0 }).then(async () => {
                    await pagemm.waitForSelector('#text-0')
                    await pagemm.type("#text-0", body.slice(7))
                    await pagemm.click("#submit")
                    await sleep(10000) // Aumente se sua conexão for superr lenta
                    await pagemm.waitForSelector('div[class="thumbnail"] > img')
                    const divElement = await pagemm.$eval('div[class="thumbnail"] > img', txLogo => txLogo.src)
                    await client.sendFileFromUrl(from, divElement, 'magma.jpg', '', id)
                    await browsermm.close()
                })
                break

            case '×stone':
                if (args.length == 0) return await client.reply(from, "Escriba " + 'palavras/words/números/numbers.', id)
                if (arks.length >= 50) return await client.reply(from, 'Max: 10 letras/letters.', id)
                await client.reply(from, "Espere" + '\n\n20+ s.', id)
                const browserst = await puppeteer.launch(options)
                const pagest = await browserst.newPage()
                await pagest.goto("https://textpro.me/3d-stone-cracked-cool-text-effect-1029.html", { waitUntil: "networkidle2", timeout: 0 }).then(async () => {
                    await pagest.waitForSelector('#text-0')
                    await pagest.type("#text-0", body.slice(7))
                    await pagest.click("#submit")
                    await sleep(10000) // Aumente se sua conexão for superr lenta
                    await pagest.waitForSelector('div[class="thumbnail"] > img')
                    const divElement = await pagest.$eval('div[class="thumbnail"] > img', txLogo => txLogo.src)
                    await client.sendFileFromUrl(from, divElement, 'stone.jpg', '', id)
                    await browserst.close()
                })
                break

            case '×harry':
                if (args.length == 0) return await client.reply(from, "Escriba " + 'palavras/words/números/numbers.', id)
                if (arks.length >= 50) return await client.reply(from, 'Max: 10 letras/letters.', id)
                await client.reply(from, "Espere" + '\n\n20+ s.', id)
                const browserhp = await puppeteer.launch(options)
                const pagehp = await browserhp.newPage()
                await pagehp.goto("https://textpro.me/create-harry-potter-text-effect-online-1025.html", { waitUntil: "networkidle2", timeout: 0 }).then(async () => {
                    await pagehp.waitForSelector('#text-0')
                    await pagehp.type("#text-0", body.slice(7))
                    await pagehp.click("#submit")
                    await sleep(10000) // Aumente se sua conexão for superr lenta
                    await pagehp.waitForSelector('div[class="thumbnail"] > img')
                    const divElement = await pagehp.$eval('div[class="thumbnail"] > img', txLogo => txLogo.src)
                    await client.sendFileFromUrl(from, divElement, 'stone.jpg', '', id)
                    await browserhp.close()
                })
                break

        }
    } catch(err){
        throw err
    }
    

}