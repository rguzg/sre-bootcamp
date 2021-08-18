/* 
  dotenv/config must be imported first so that all other imported modules 
  have access to the environment variables

  For more info check out: https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
*/ 

import "dotenv/config";

import Config from 'config';
import app from './server';

let config = Config;

 app.listen(config.port, function() {
  console.log('listening at',config.port);
});
