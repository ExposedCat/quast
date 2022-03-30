type Direction = 'left' | 'right' | 'up' | 'down'

interface GameData {
	info: string
	content: Icon[][]
}

interface PlayerData {
	x: number
	y: number
	hp: number
	coins: number
	damage: number
}

enum Icon {
	player = '@',
	wall = '#',
	coin = '$',
	way = '-'
}

interface UnitData {
	x: number
	y: number
	hp: number
	damage: number
}

interface Event {
	sequence: string
	name: string
	ctrl: boolean
	shift: boolean
	code: boolean
}

export { Icon, Event, GameData, UnitData, Direction, PlayerData }
