import colors from 'colors'
import * as S from './shapes.js'
import * as fs from 'fs'

const colorList = [
    "black", "white", "red", "blue", "green", "yellow", "orange", "purple", "pink", 
    "brown", "gray", "navy", "teal", "aqua", "lime", "maroon", "olive", "silver", "gold", 
    "fuchsia", "cyan", "magenta", "beige", "coral", "ivory", "khaki", "lavender", "mint", 
    "orchid", "salmon", "sienna", "tan", "violet", "azure", "chartreuse", "indigo", "plum", 
    "tomato", "turquoise", "chocolate", "crimson", "darkblue", "darkcyan", "darkgrey", 
    "darkred", "darksalmon", "darkseagreen", "firebrick", "forestgreen", "gainsboro"
]

export function c(str='null', color = 'g'){ 
    const opt = { r: 'red', g: 'green', y: 'yellow', b: 'blue' }
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
            if(i === 0) { console.log(c(`File ${defaultName + ext} already exists:`), ) }
            if(i === 1) { console.log(c(`Files ${defaultName + ext} and ${defaultName}_0${ext} already exists:`), ) }
            if(i > 1) { console.log(c(`File ${defaultName}_0 to _${i-1} already exists:`), ) }
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
    if (/^#([0-9a-fA-F]{3}([0-9a-fA-F]{3})?)$/.test(input)) { return true }                            // if input match hex color patter
    if(colorList.indexOf(input) > -1 ) { return true }                                                 // if input is in colorList
    if(input[0] == "#"){return c("Hex color doesnt Macht propper pattern. Input #------",'y')}         // if input doesnt match hex color patter
    if(input.length == 0){ return c('Please enter a #Hexadecimal Number or Color name','y')}           // if no input
    return c('Color name not recognized, Try a different color or a Hex color starting with "#".','y') // if color name not in list
}

export function createFile (obj = ` this just a test`){
    const fileName = validateFileName()
    if(fileName == null){ throw new Error('fileName can not be null') }

    const shapeInputs = {
        Circle: { radius: 5 }, 
        Square:   { width: 100, height: 100 }, 
        Triangle: { base: 100, height: 100 }, 
    }
    
    const shapeObj = new S[obj.shape]( shapeInputs[obj.shape] ).render()
    const fileContent = JSON.stringify( shapeObj )
    console.log('fileContent', fileContent)

    fs.writeFile(`./examples/${fileName}`, fileContent, (err) => {
        if(err) { console.log(`Error: ${err}`) } 
        else {
            console.log(c(`created file: ${c(fileName,'y')}`));
            console.log(c(`File saved in: ${c('./examples/','y')} folder`));
            console.log(`${c('To open in VScode')} hold ${c('Alt','y')} and click this link: ${c(`./examples/${fileName}`,'y')}`);
        }
    })
}