import inquirer from 'inquirer';
import { Circle, Triangle, Square } from './lib/shapes.js';
import { c } from './lib/utils.js'

const colorList = [
    "black", "white", "red", "blue", "green", "yellow", "orange", "purple", "pink", 
    "brown", "gray", "navy", "teal", "aqua", "lime", "maroon", "olive", "silver", "gold", 
    "fuchsia", "cyan", "magenta", "beige", "coral", "ivory", "khaki", "lavender", "mint", 
    "orchid", "salmon", "sienna", "tan", "violet", "azure", "chartreuse", "indigo", "plum", 
    "tomato", "turquoise", "chocolate", "crimson", "darkblue", "darkcyan", "darkgrey", 
    "darkred", "darksalmon", "darkseagreen", "firebrick", "forestgreen", "gainsboro"
]

//defining questions
const questions = [
    { name: 'text', type:'input', message: `What are the ${c('Initials')} for the Logo. ${c('(3 characters max)','y')}:\n`,
        validate: input => { // Check if the input length is greater than 3
            input = input.trim()
            if (input.length > 3 || input.length == 0) { return c('Input must be 1 to 3 characters.','y') }
            return true;
        }
    },
    { name: 'text_color' , type: 'input', message: `What is the ${c('Text Color')}? ${c('( #Hexadecimal Number or Color name )','y')}:\n`,
        validate: input => validateColor(input)
    },
    { name: 'shape'      , type: 'list',  message: `What is the ${c('Shape')}?` , choices:['Circle','Square','Triangle']},
    { name: 'shape_color', type: 'input', message: `What is the ${c('Shape Color')}? ${c('( #Hexadecimal Number or Color name )', 'y')}:\n`,
        validate: input => validateColor(input)
    },
]

inquirer.prompt(questions).then((res) => {
    console.log(res)
    console.log('create file logo.svg 300x200')
    console.log('step: create file logo.svg')
    console.log(`Generated logo.svg`)
})

function validateColor(input){
    if (/^#([0-9a-fA-F]{3}([0-9a-fA-F]{3})?)$/.test(input)) { return true }
    if(colorList.indexOf(input) > -1 ) { return true }
    if(input[0] == "#"){return c("Hex color doesnt Macht propper pattern. Input #------",'y')}
    return c('Color name not recognized, Try a different color or a Hex color starting with "#".','y')
}

