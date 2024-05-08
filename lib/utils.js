import colors from 'colors'

function c(str='null', color = 'g'){ 
    const opt = { r: 'red', g: 'green', y: 'yellow', b: 'blue' }
    return colors[opt[color]](str) 
}

export { c }