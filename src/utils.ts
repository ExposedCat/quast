import {
    GameData,
    GameBackup
} from './models'
import fs from 'fs'

function reDraw(game: GameData) {
    console.clear()
    console.log(game.logo)
    console.log(game.info)
    console.log()
    console.log(game.stringContent(true))
    console.log()
    console.log(game.stringPlayerStats())
}

function storeBackup(game: GameData) {
    const realGameInfo = game.info
    game.info = 'Game saved'
    reDraw(game)
    fs.writeFileSync('./assets/map.txt', game.stringContent(false))
    fs.writeFileSync(
        './assets/game.json',
        JSON.stringify({
            info: realGameInfo,
            player: game.player
        })
    )
}

function restoreBackup() {
    let map = fs.readFileSync('./assets/map.txt', 'utf-8')
    if (!map) {
        map = fs.readFileSync('./assets/start-map.txt', 'utf-8')
    }
    let backup: GameBackup
    try {
        backup = JSON.parse(fs.readFileSync('./assets/game.json', 'utf-8'))
    } catch (e) {
        backup = {}
    }

    return {
        map,
        backup
    }
}

export {
    reDraw,
    storeBackup,
    restoreBackup
}