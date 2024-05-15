import inquirer from 'inquirer';
import * as U from './lib/utils.js'
import { c } from './lib/utils.js'

//defining questions
const questions = [
    { name: 'text', type:'input', 
        message: `What are the ${c('Initials')} for the Logo. ${c('(3 characters max)','y')}:\n`,
        validate: input => U.validateInput(input)
    },
    { name: 'stack_letters', type: 'list', message: `Do you want to ${c('stack the first letter')}?\n`,
        choices: ['no','yes'],
        when: (answers) => answers.text.length > 1
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
    U.createFile(res)
})
