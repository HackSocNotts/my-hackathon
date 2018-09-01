#!/usr/bin/env node
const program = require('commander');
const { version, description } = require('./package.json');
const { init, setAdminEmail } = require('./logic');

program
  .version(version)
  .description(description);

program
  .command('initialize')
  .alias('i')
  .description('Intialize myHackathon using a setup process')
  .action(() => {
    init();
  });

program
  .command('setAdmin <email>')
  .alias('sa')
  .description('Sets the admin email address')
  .action(email => setAdminEmail(email));

program.parse(process.argv);
