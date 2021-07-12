import { 
    reDraw,
    storeBackup
 } from './utils'
import input from 'readline'
import { game } from './game-data'
import { eventHandler } from './eventHandler'

const help = 'Help message'
if (process.argv[2] === '-h' || process.argv[2] === '--help') {
    console.log(help)
    process.exit()
}

input.emitKeypressEvents(process.stdin)
process.stdin.setRawMode(true)
process.stdin.on('keypress', (str, key) => {
    if (key.ctrl && (key.name === 'c' || key.name === 'C')) {
        storeBackup(game)
        process.exit()
    }
    eventHandler(key)
    reDraw(game)
})

reDraw(game)