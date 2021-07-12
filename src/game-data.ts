import {
    Icon,
    GameData
} from './models'
import colors from 'chalk'
import asciiText from 'figlet'
import { restoreBackup } from './utils'

const { map, backup } = restoreBackup()

let game: GameData = {
    logo: colors.green(
        asciiText.textSync('quast', {
            font: 'ANSI Shadow'
        })
    ),
    info: backup.info || '',
    player: backup.player || {
        hp: 100,
        x: 3,
        y: 3,
        coins: 0
    },
    content: map.split('\n').map(stringRow =>
        stringRow.split('').map(icon => icon as Icon)
    ),
    stringPlayerStats: () => {
        return `${colors.red('HP')}: ${game.player.hp}/100   ${colors.yellowBright('Money')}: $${game.player.coins}`
    },
    stringContent: enableUnits => {
        let stringContent = ''
        for (const y in game.content) {
            for (const x in game.content[y]) {
                if (enableUnits) {
                    if (Number(x) === game.player.x && Number(y) === game.player.y) {
                        stringContent += colors.green(Icon.player)
                        continue
                    }
                }
                stringContent += game.content[y][x]
            }
            if (Number(y) !== game.content.length - 1) {
                stringContent += '\n'
            }
        }
        return stringContent
    },
    getCellIcon: (x, y) => {
        return game.content[y][x]
    },
    setCellIcon: (x, y, icon) => {
        game.content[y][x] = icon
    },
    getNewPosition: direction => {
        let { x, y } = game.player
        switch (direction) {
            case 'left': {
                x--
                break
            }
            case 'right': {
                x++
                break
            }
            case 'up': {
                y--
                break
            }
            case 'down': {
                y++
                break
            }
        }
        return {
            x, y,
            exist: !!(game.content[y] && game.content[y][x])
        }
    }
}

export { game }