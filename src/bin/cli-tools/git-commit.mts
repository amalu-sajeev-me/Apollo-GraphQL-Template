#!/usr/bin/env node

import inquirer from 'inquirer';

import { execSync } from 'child_process';

interface Answers {
  type: string;
  message: string;
}

const types: string[] = ['feat', 'fix', 'chore', 'docs', 'style', 'refactor', 'test'];

inquirer.prompt<Answers>([
  {
    type: 'list',
    name: 'type',
    message: 'Select the type of change you are committing:',
    choices: types,
  },
  {
    type: 'input',
    name: 'message',
    message: 'Enter a short description of your change (max 100 chars):',
    validate: (input) => input.length <= 100,
  }
]).then((answers: Answers) => {
  const commitMessage: string = `[${answers.type}]: ${answers.message}`;
  execSync(`git commit -m "${commitMessage}"`, { stdio: 'inherit' });
});
