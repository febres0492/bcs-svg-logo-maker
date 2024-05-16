import colors from 'colors'
import * as S from './shapes.js'
import * as fs from 'fs'

const colorList = [
    "aliceblue", "antiquewhite", "aqua", "aquamarine", "azure", "beige", "bisque", "black", 
    "blanchedalmond", "blue", "blueviolet", "brown", "burlywood", "cadetblue", "chartreuse", "chocolate", 
    "coral", "cornflowerblue", "cornsilk", "crimson", "cyan", "darkblue", "darkcyan", "darkgoldenrod", 
    "darkgray", "darkgreen", "darkgrey", "darkkhaki", "darkmagenta", "darkolivegreen", "darkorange", 
    "darkorchid", "darkred", "darksalmon", "darkseagreen", "darkslateblue", "darkslategray", 
    "darkslategrey", "darkturquoise", "darkviolet", "deeppink", "deepskyblue", "dimgray", "dimgrey", 
    "dodgerblue", "firebrick", "floralwhite", "forestgreen", "fuchsia", "gainsboro", "ghostwhite", "gold", 
    "goldenrod", "gray", "green", "greenyellow", "grey", "honeydew", "hotpink", "indianred", "indigo", 
    "ivory", "khaki", "lavender", "lavenderblush", "lawngreen", "lemonchiffon", "lightblue", "lightcoral", 
    "lightcyan", "lightgoldenrodyellow", "lightgray", "lightgreen", "lightgrey", "lightpink", "lightsalmon", 
    "lightseagreen", "lightskyblue", "lightslategray", "lightslategrey", "lightsteelblue", "lightyellow", 
    "lime", "limegreen", "linen", "magenta", "maroon", "mediumaquamarine", "mediumblue", "mediumorchid", 
    "mediumpurple", "mediumseagreen", "mediumslateblue", "mediumspringgreen", "mediumturquoise", 
    "mediumvioletred", "midnightblue", "mintcream", "mistyrose", "moccasin", "navajowhite", "navy", 
    "oldlace", "olive", "olivedrab", "orange", "orangered", "orchid", "palegoldenrod", "palegreen", 
    "paleturquoise", "palevioletred", "papayawhip", "peachpuff", "peru", "pink", "plum", "powderblue", 
    "purple", "red", "rebeccapurple", "rosybrown", "royalblue", "saddlebrown", "salmon", "sandybrown", 
    "seagreen", "seashell", "sienna", "silver", "skyblue", "slateblue", "slategray", "slategrey", "snow", 
    "springgreen", "steelblue", "tan", "teal", "thistle", "tomato", "turquoise", "violet", "wheat", 
    "white", "whitesmoke", "yellow", "yellowgreen", "darkblue", "darkcyan", "darkgoldenrod", "darkgreen", 
    "darkkhaki", "darkmagenta", "darkolivegreen", "darkorange", "darkorchid", "darkred", "darksalmon", 
    "darkseagreen", "darkslateblue", "darkslategray", "darkslategrey", "darkturquoise", "darkviolet", "lightblue", 
    "lightcoral", "lightcyan", "lightgoldenrodyellow", "lightgray", "lightgreen", "lightgrey", "lightpink", 
    "lightsalmon", "lightseagreen", "lightskyblue", "lightslategray", "lightslategrey", "lightsteelblue", "lightyellow"
]

export function c(str='null', color = 'g'){ 
    const opt = { r: 'red', g: 'green', y: 'yellow', b: 'blue'}
    return colors[opt[color]](str) 
}

export function validateFileName(fileName = 'logo', ext = 'svg'){
    ext = ext[0] != '.' ? '.'+ext : ext
    const defaultName = fileName
    let createFile = false
    let i = -1
    while(createFile === false ) { // checing if the file exists and updating the file name
        try {
            let suffix = `_${i}`
            fileName = i === -1 ? defaultName : defaultName + suffix
            fs.accessSync(`./examples/${fileName + ext}`, fs.F_OK)
        } catch (err) { 
            // if unwanted error
            if(err.toString().indexOf('no such file or directory') < 0){
                // this throws an error if the current error is anything other than the 
                // error fs.accessSync throws when the fileName doesnt exist
                throw new Error(err)
            }

            // loging what files exist
            if(i === 0) { console.log(c(`\nFile ${defaultName + ext} already exists:`,'y') +'\n') }
            if(i === 1) { console.log(c(`\nFiles ${defaultName + ext} and ${defaultName}_0${ext} already exists:`,'y')+'\n') }
            if(i > 1) { console.log(c(`\nFile ${defaultName}_0 to _${i-1} already exists:`,'y')+'\n') }
            createFile = true
        }
        i++
    }
    return createFile ? fileName + ext : null
}

export function validateInput(input){
    input = input.trim()
    // Check if the input length is greater than 3
    if (input.length > 3 || input.length == 0) { 
        return c('Input must be 1 to 3 characters.','y') 
    }
    return true;
}

export function validateColor(input){
    input = input.trim()
    // if input match hex color patter
    if (/^#([0-9a-fA-F]{3}([0-9a-fA-F]{3})?([0-9a-fA-F]{2})?)$/.test(input)) { return true; }
    // if input is in colorList
    if(colorList.indexOf(input) > -1 ) { return true } 
    // if input doesnt match hex color patter
    if(input[0] == "#"){return c("Hex color doesnt Macht propper pattern. Input #------",'y')} 
    // if no input
    if(input.length == 0){ return c('Please enter a #Hexadecimal Number or Color name','y')} 
    // if color name not in list
    return c('Color name not recognized, Try a different color or a Hex color starting with "#".','y') 
}

export function createFile (obj){
    const fileName = validateFileName()
    const values = { width: 300, height: 200, ...obj }
    const shapeObj = new S[obj.shape]( values ).render()

    fs.writeFile(`./examples/${fileName}`, shapeObj, (err) => {
        if(err) { console.log(`Error: ${err}`) } 
        else {
            console.log(c(`Generated ${fileName}\n `))
            console.log(`File saved in: ${c('./examples/','y')} folder`);
            console.log(`${c('To open in VScode')} hold ${c('Alt','y')} and click this link: ${c(`./examples/${fileName}`,'y')}`);
        }
    })
}

export function replacingPlaceHolders(obj, values) {
    let objStr = typeof obj != 'string' ? JSON.stringify(obj, null, 2) : obj
    const regex = /\[([^\[\]]+)\]/g

    // replacing placeholders with value
    objStr = objStr.replace(regex, (match, key) => {
        if(key in values) {
            let newVal = (values[key]+'').replace(regex, (m, k)=> values[k])
            newVal = newVal == 'undefined' ? values[key] : newVal
            return newVal
        }
    })
    return objStr
}