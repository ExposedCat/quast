import {
    Icon,
    Event
} from './models'
import { Game } from './game'
import { Player } from './units'

function eventHandler(event: Event, game: Game, player: Player) {
    game.info = ''
    if (!event.name) {
        event.name = event.sequence
    }
    switch (event.name) {
        case 'left':
        case 'right':
        case 'down':
        case 'up': {
            let move = true
            const { x, y, exist } = player.getNewPosition(event.name, game)
            if (!exist) {
                game.info = `Can't go out of map`
                return
            }
            switch (game.getCellIcon(x, y)) {
                case Icon.wall: {
                    move = false
                    game.info = `Can't move to wall`
                    break
                }
                case Icon.coin: {
                    const coins = Math.random() * 100 | 0
                    player.coins += coins
                    game.info = `Found ${coins} coins`
                    game.setCellIcon(x, y, Icon.way)
                    break
                }
            }
            if (move) {
                player.x = x
                player.y = y
            }
            break
        }
    }
}

export { eventHandler }