import {
    Icon
} from './models'
import colors from 'chalk'
import asciiText from 'figlet'
import { Player } from './units'
import { restoreGameData } from './utils'

class Game {
    logo = colors.green(
        asciiText.textSync('quast', {
            font: 'ANSI Shadow'
        })
    )
    info: string
    content: Icon[][] = []

    constructor() {
        const { map, info } = restoreGameData()
        this.content = map.split('\n').map(stringRow =>
            stringRow.split('').map(icon => icon as Icon)
        )
        this.info = info
    }

    getCellIcon(x: number, y: number) {
        return this.content[y][x]
    }

    setCellIcon(x: number, y: number, icon: Icon) {
        this.content[y][x] = icon
    }

    stringContent(enableUnits: boolean, player: Player) {
        let stringContent = ''
        for (const y in this.content) {
            for (const x in this.content[y]) {
                if (enableUnits) {
                    if (Number(x) === player.x && Number(y) === player.y) {
                        stringContent += colors.green(Icon.player)
                        continue
                    }
                }
                stringContent += this.content[y][x]
            }
            if (Number(y) !== this.content.length - 1) {
                stringContent += '\n'
            }
        }
        return stringContent
    }
}

export { Game }