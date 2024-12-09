const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const app = express();
const sequelize = require('./utils/database'); 
const blogRouter = require('./routes/blog')
const commentRouter = require('./routes/comment')

app.use(express.static(path.join(__dirname, 'static')));

app.use(cors());
app.use(bodyParser.json({extended:false}));
// app.use(express.static(path.join(__dirname,'views')))
// app.set('view engine','ejs')
// app.set('views','views')

app.use('/blog',blogRouter);
app.use('/blog/comment',commentRouter);

app.use((req,res)=>{
    res.status(404).render('404',{ title: '404 - Page Not Found' })
})
// app.options('*', cors());
sequelize
  .sync({ force: false })
  .then(() => {
    
  })
  .catch((err) => {
    console.log(err);
  });

  app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
  });