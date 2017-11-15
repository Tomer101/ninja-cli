#!/usr/bin/env node

const program = require('commander');
const { prompt } = require('inquirer');
const { addNinja , findNinja , updateNinja , deleteNinja , listNinjas } = require ('./index');


//Ninja questions
const questions = [
    {
        //Type of the prompt(input == user input) - the Value
        type: 'input',
        // The name to use when storing the answer  - the Key
        name: 'firstName',
        //The question to print(prompt)
        message: 'Ninja first name'
        // will look like this-> Key(firstName):Value(input)
    },
    {
        type: 'input',
        name: 'lastName',
        message: 'Ninja last name'
    },
    {
        type: 'list',
        choices: [ "Beginner" , "Practitioner ", "Expert", "Master" ],
        name: 'rank',
        message: 'Ninja rank'
    },
    {
        type: 'input',
        name: 'attack',
        message: 'Ninja Special attack'
    }
];

program.version('1.0.0').description('Client management system');

//Add command
program.command('add')
.alias('a')
.description('add a new ninja')
.action(()=> {
    //answer is the data the return from the prompt (it is a ninja object {firstName:input , lastName:input , rank:list , attack: input};
    prompt(questions).then(answers => {
        addNinja(answers);
        //console.log(answers); if you want to see the answers object...
    })}
);

//Find command
program.command('find <name>')
.alias('f')
.description('find a ninja')
.action((name)=> {
    findNinja(name);
});

//Update command
program.command('update <name>')
.alias('u')
.description('update a ninja')
.action((name)=> {
    //answer is the data the return from the prompt (it is a ninja object)
    prompt(questions).then(answers => updateNinja(name, answers));
});

//Delete command
program.command('delete <name>')
.alias('d')
.description('delete a ninja')
.action((name) => {
    deleteNinja(name);
});

//List command
program.command('list')
.alias('l')
.description('list all ninjas')
.action(() => {
    listNinjas();
});


program.parse(process.argv);