import express from 'express';

const app = express();
const PORT = process.env.PORT||3000;

//Routes
import test from '../routers/test.js';
import InstagramPost from '../routers/instagramPost.js';

app.use('/', test);
app.use('/igpost', InstagramPost);

app.listen(PORT,()=>{
  console.log(`App is running on port ${PORT}`)
})
