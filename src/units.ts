import { GameData, Direction } from './models'
import colors from 'chalk'
import { restorePlayer } from './utils'

class Player {
	x: number
	y: number
	hp: number
	coins: number
	damage: number

	constructor() {
		const restoredPlayer = restorePlayer()
		this.x = restoredPlayer.x
		this.y = restoredPlayer.y
		this.hp = restoredPlayer.hp
		this.coins = restoredPlayer.coins
		this.damage = restoredPlayer.damage
	}

	stringStats = () => {
		const hpColor =
			this.hp >= 85 ? 'green' : this.hp >= 70 ? 'yellowBright' : 'red'
		const hpLabel = `${colors[hpColor]('HP')}: ${this.hp}/100`
		const moneyLabel = `${colors.yellowBright('Money')}: $${this.coins}`
		return `${hpLabel}   ${moneyLabel}`
	}

	getNewPosition = (direction: Direction, game: GameData) => {
		let x = this.x
		let y = this.y
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
			x,
			y,
			exist: !!(game.content[y] && game.content[y][x])
		}
	}
}

class Unit {
	x: number
	y: number
	hp: number
	damage: number

	constructor(x: number, y: number, hp: number, damage: number) {
		this.x = x
		this.y = y
		this.hp = hp
		this.damage = damage
	}
}

export { Unit, Player }
