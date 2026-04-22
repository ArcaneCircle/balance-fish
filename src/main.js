import Hero from './hero.js'
import Game from './game.js'
import { setHero, setGame } from './state.js'
import { initWebGL } from './webgl.js'

const hero = new Hero()
setHero(hero)

const game = new Game()
setGame(game)

game.update(0)
game.map.formatAll()

initWebGL()
