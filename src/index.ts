import { 
    reDraw,
    storeBackup
 } from './utils'
import input from 'readline'
import { Game } from './game'
import { 
    Unit,
    Player
 } from './units'
import { eventHandler } from './event-handler'

const help = 'Help message'
if (process.argv[2] === '-h' || process.argv[2] === '--help') {
    console.log(help)
    process.exit()
}

let game = new Game()
let player = new Player()
let units: Unit[] = []

input.emitKeypressEvents(process.stdin)
process.stdin.setRawMode(true)
process.stdin.on('keypress', (str, key) => {
    if (key.ctrl && (key.name === 'c' || key.name === 'C')) {
        storeBackup(game, player, units)
        process.exit()
    }
    eventHandler(key, game, player)
    reDraw(game, player)
})

reDraw(game, player)