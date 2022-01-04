const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');

const app = express();
app.engine('.hbs', hbs());
app.set('view engine', '.hbs');
app.use(express.urlencoded({ extended: false }));

/*app.use((req, res, next) => {
  res.show = (name) => {ello
    res.sendFile(path.join(__dirname, `/views/${name}`));
  };
  next();
});
*/

app.use(express.static(path.join(__dirname, '/public')));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/hello/:name', (req, res) => {
  res.render('hello', { name: req.params.name });
});

app.get('/sum/:a/:b', (req, res) => {
  let numberA = parseInt(req.params.a);
  let numberB = parseInt(req.params.b);
  res.render('hello', {name: numberA+numberB})
})

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

app.get('/info', (req, res) => {
  res.render('info');
});

app.get('/history', (req, res) => {
  res.render('history');
});
//''==false
app.post('/contact/send-message', (req, res) => {

  const { author, sender, title, message, img } = req.body;
  
  if(author && sender && title && message && img) {
    res.render('contact', { isSent: true});
  }
  else {
    res.render('contact', { isError: true})
  }
});

app.use((req, res) => {
  res.status(404).send('404 not found...');
})

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});

//przegladatka <--- server

//przegladarka ----> server

//localhost:8000/sum/4/5 => 9
//localhost:8000/sum/10/5 => 15
//localhost:8000/sum/2/8 => 10