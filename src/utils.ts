import {
    Unit,
    Player
} from './units'
import {
    PlayerData
} from './models'
import fs from 'fs'
import { Game } from './game'

function reDraw(game: Game, player: Player) {
    console.clear()
    console.log(game.logo)
    console.log(game.info)
    console.log()
    console.log(game.stringContent(true, player))
    console.log()
    console.log(player.stringStats())
}

function storeBackup(game: Game, player: Player, units: Unit[]) {
    fs.writeFileSync('./saved/map.txt',
        game.stringContent(false, player)
    )
    fs.writeFileSync('./saved/units.json',
        JSON.stringify(units)
    )
    fs.writeFileSync('./saved/player.json',
        JSON.stringify(player)
    )
    fs.writeFileSync('./saved/game-data.json',
        JSON.stringify({
            info: game.info
        })
    )
    game.info = 'Game saved'
    reDraw(game, player)
}

function restoreGameData() {
    let map = ''
    try {
        map = fs.readFileSync('./saved/map.txt', 'utf-8')
    } catch (e) {
        map = fs.readFileSync('./assets/start-map.txt', 'utf-8')
    }
    let info = ''
    try {
        const gameData = JSON.parse(fs.readFileSync('./saved/game-data.json', 'utf-8'))
        info = gameData.info
    } catch (e) { }
    return { map, info }
}

function restoreUnits(): Unit[] {
    let units = []
    try {
        units = JSON.parse(fs.readFileSync('./saved/units.json', 'utf-8'))
    } catch (e) { }
    return units
}

function restorePlayer(): PlayerData {
    let player = {
        x: 1,
        y: 1,
        hp: 100,
        coins: 0,
        damage: 5
    }
    try {
        player = JSON.parse(fs.readFileSync('./saved/player.json', 'utf-8'))
    } catch (e) { }
    return player
}

export {
    reDraw,
    storeBackup,
    restoreUnits,
    restorePlayer,
    restoreGameData
}