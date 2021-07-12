import {
    Event,
    Icon
} from './models'
import { game } from './game-data'

function eventHandler(event: Event) {
    game.info = ''
    switch (event.name) {
        case 'left':
        case 'right':
        case 'down':
        case 'up': {
            let move = true
            const { x, y, exist } = game.getNewPosition(event.name)
            if (!exist) {
                game.info = `Can't go out of map`
            }
            switch (game.getCellIcon(x, y)) {
                case Icon.wall: {
                    move = false
                    game.info = `Can't move to wall`
                    break
                }
                case Icon.coin: {
                    const coins = Math.random() * 100 | 0
                    game.player.coins += coins
                    game.info = `Found ${coins} coins`
                    game.setCellIcon(x, y, Icon.way)
                    break
                }
            }
            if (move) {
                game.player.x = x
                game.player.y = y
            }
        }
    }
}

export { eventHandler }