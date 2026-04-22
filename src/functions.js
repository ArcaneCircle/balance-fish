import { game } from './state.js'

export let newID = 0
export function makeID() {
    newID ++
    return newID
}

export function mod(x, cap) {
    return (((x % cap) + cap) % cap)
}

export function random(min, max, bias = .5, strength = 0) {
    let base = Math.random()

    if (strength == 0) return base * (max - min) + min

    if (base < bias) base = bias * Math.pow(base / bias, 1 - strength)
    else base = 1 - (1 - bias) * Math.pow((1 - base) / (1 - bias), 1 - strength)

    return base * (max - min) + min
}

export function findAngle(A, B, C) {
    const AB = Math.sqrt(Math.pow(B.x - A.x, 2) + Math.pow(B.y - A.y, 2))
    const BC = Math.sqrt(Math.pow(B.x - C.x, 2) + Math.pow(B.y - C.y, 2))
    const AC = Math.sqrt(Math.pow(C.x - A.x, 2) + Math.pow(C.y - A.y, 2))
    return Math.PI - Math.acos((BC * BC + AB *AB - AC * AC) / (2 * BC * AB))
}

export function capDec(x) {
    if (x < 0) return 0
    if (x > 1) return 1
    return x
}

export function quad(x) {
    if (x < 0) return 0
    if (x > 1) return 1
    return x < .5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2
}

export function lerp(x, y, a) {
    if (a < 0) a = 0
    if (a > 1) a = 1
    return x * (1 - a) + y * a
}

export function easeInOutExpo(x) {
    if (x < 0) return 0
    if (x > 1) return 1
    return x == 0
        ? 0
        : x == 1
        ? 1
        : x < 0.5 ? Math.pow(2, 20 * x - 10) / 2
        : (2 - Math.pow(2, -20 * x + 10)) / 2;
}

export function sharpSin(x) {
    return quad(.5 + Math.sin(x) * .5) * 2 - 1
}

export const rgbFilters = []

export function rgbAdd(rgb) {
    rgbFilters.push(rgb)
}

export function rgbPop() {
    rgbFilters.pop()
}

export function rgbCalc(x,idx) {
    for (let i = 0; i < rgbFilters.length; i ++)
        x *= rgbFilters[i][idx]
    return x
}

export function rgb(r,g,b,a=1) {
    return 'rgb('+
        rgbCalc(r,0)*255+','+
        rgbCalc(g,1)*255+','+
        rgbCalc(b,2)*255+','+
        a+')'
}

export function rgbReset() {
    rMultiply = 1
    gMultiply = 1
    bMultiply = 1
    rAdd = 0
    gAdd = 0
    bAdd = 0
}

export function collide(a, b) {
    if (a.x + a.w > b.x &&
        a.x < b.x + b.w &&
        a.y + a.h > b.y &&
        a.y < b.y + b.h)
        return true
    return false
}

export function indexToPos(index, width) {
    return {
        x: index % width,
        y: Math.floor(index / width)
    }
}

export function posToIndex(x, y, width) {
    x = Math.floor(x)
    y = Math.floor(y)
    if (x < 0 || x >= width) return
    return x + y * width
}

export function pointIsInCircle(x, y, cx, cy, cr) {
    const dx = x - cx
    const dy = y - cy
    const d = Math.hypot(dx, dy)
    if (d < cr) return {dx, dy, d}
    return false
}

export function findCircleSide(dx, dy, d, r) {
    const normalX = dx / d
    const normalY = dy / d
    dx = normalX * r
    dy = normalY * r
    d = d - r
    return {dx, dy, d}
}

export function press(e, bool) {
    if (e.repeat) return
    game.key.press = bool
    if (e.code == 'ArrowUp' || e.code == 'KeyW' || e.code == 'KeyZ') game.key.up = bool
    if (e.code == 'ArrowLeft' || e.code == 'KeyA' || e.code == 'KeyQ') game.key.left = bool
    if (e.code == 'ArrowDown' || e.code == 'KeyS') game.key.down = bool
    if (e.code == 'ArrowRight' || e.code == 'KeyD') game.key.right = bool

    if (e.code == 'Space' || e.code == 'Enter')
        game.key.confirm = bool
    if (e.code == 'KeyX')
        game.key.danger = bool
    if (e.code == 'KeyR')
        game.key.r = bool
}

addEventListener('keydown', e => press(e, 1))
addEventListener('keyup', e => press(e, 0))