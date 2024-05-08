import inquirer from 'inquirer';
import { Circle, Triangle, Square } from './lib/shapes.js';
import { c } from './lib/utils.js'

//defining questions
const questions = [
    {name: 'text', type:'input', message: `What are the Initials. ${c('3 Max','y')}:`,
        validate: input => { // Check if the input length is greater than 3
            if (input.length > 3) { return 'Input must be 1 to 3 characters.' }
            return true;
        }
    },
    {name: 'text_color' , type: 'input', message: `What is the ${c('Text Color')}? ${c('hexadecimal number or color name','y')}:\n`},
    {name: 'shape'      , type: 'list',  message: `What is the ${c('Shape')}?` , choices:['Circle','Square','Triangle']},
    {name: 'shape_color', type: 'input', message: `What is the ${c('Shape Color')}? ${c('hexadecimal number or color name', 'y')}:\n`},
]

inquirer.prompt(questions).then((res) => {
    console.log(res)
    console.log('create file logo.svg 300x200')
    console.log('step: create file logo.svg')
    console.log(`Generated logo.svg`)
})

