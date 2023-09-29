#!/usr/bin/env node
import 'reflect-metadata';
import inquirer from 'inquirer';

import { execSync } from 'child_process';
import { Scream } from '../../services/Scream.service.ts';
import { container } from 'tsyringe';

interface Answers {
  type: string;
  message: string;
}

const types: string[] = ['feat', 'fix', 'chore', 'docs', 'style', 'refactor', 'test'];
const scream: Scream = container.resolve(Scream);
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
]).then(async (answers: Answers) => {
  const commitMessage: string = `[${answers.type}]: ${answers.message}`;
  try {
    execSync(`git commit -m "${commitMessage}"`, { stdio: 'inherit' });
  } catch (error) {
    console.log({ error });
    if (error.status !== 1) {
      const answers = await inquirer.prompt([{
        name: 'push',
        type: 'confirm',
        message: 'Do you wat to push your changes to GitHub now ?'
      }]);
      const { push } = answers;
      if (push) execSync('git push -u origin HEAD');
    }
    scream.error('operation failed');
    throw error;
  }
});
