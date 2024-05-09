import inquirer from 'inquirer';
import * as U from './lib/utils.js'
import * as shape from './shapes.js'
import { c } from './lib/utils.js'

//defining questions
const questions = [
    { name: 'text', type:'input', 
        message: `What are the ${c('Initials')} for the Logo. ${c('(3 characters max)','y')}:\n`,
        validate: input => U.validateInput(input)
    },
    { name: 'text_color' , type: 'input', 
        message: `What is the ${c('Text Color')}? ${c('( #Hexadecimal Number or Color name )','y')}:\n`,
        validate: input => U.validateColor(input)
    },
    { name: 'shape'      , type: 'list',  message: `What is the ${c('Shape')}?` , choices:['Circle','Square','Triangle']},
    { name: 'shape_color', type: 'input', message: `What is the ${c('Shape Color')}? ${c('( #Hexadecimal Number or Color name )', 'y')}:\n`,
        validate: input => U.validateColor(input)
    },
]

inquirer.prompt(questions).then((res) => {
    console.log(res)
    console.log('create file logo.svg 300x200')
    // U.createFile()
    // const shape = U[]
    console.log('step: create file logo.svg')
    console.log(`print: Generated logo.svg`)
})



