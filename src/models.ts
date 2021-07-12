type Direction = 'left' | 'right' | 'up' | 'down'

interface Player {
    hp: number,
    x: number,
    y: number,
    coins: number
}

interface GameBackup {
    logo?: string,
    info?: string,
    player?: Player
}

interface GameData {
    logo: string,
    info: string,
    content: Icon[][],
    player: Player,
    stringContent: (enableUnits: boolean) => string,
    getNewPosition: (direction: Direction) => ({
        x: number,
        y: number,
        exist: boolean
    }),
    setCellIcon: (x: number, y: number, icon: Icon) => void,
    getCellIcon: (x: number, y: number) => Icon,
    stringPlayerStats: () => string
}

interface Event {
    name: string,
    ctrl: boolean,
    shift: boolean,
    code: boolean
}

enum Icon {
    player = '@',
    wall = '#',
    coin = '$',
    way = '-'
}

export {
    Icon,
    Event,
    GameData,
    GameBackup
}