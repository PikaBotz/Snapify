import express from 'express';
import path,{dirname} from 'path';
import {
    fileURLToPath
  } from 'url';
  import {
    createRequire
  } from 'module';
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(fileURLToPath(import.meta.url))

  const app = express();
  const PORT = process.env.PORT||3000;

  //Routes
  import test from '../routers/test.js';
  
  import InstagramPost from '../routers/instgramPost.js'

  app.use('/', test);
  app.use('/igpost', InstagramPost);

  app.listen(PORT,()=>{
      console.log(`App is running on port ${PORT}`)
  })
