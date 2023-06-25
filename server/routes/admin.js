const express = require('express');
const app = express();

app.use('/public',express.static('public'))
// Set EJS as the view engine
app.set('view engine', 'ejs');

// Set the views directory
// app.set('views', __dirname);
app.set('views', 'C:\\Users\\DELL\\Desktop\\summer_internship\\views');

app.get('/', (req, res) => {
  res.render('side_bar'); // Render the "side_bar" view
});

// Define a route to render the EJS file
app.get('/side_bar', (req, res) => {
    res.render('side_bar'); // Render the "side_bar" view
});

app.get('/_card', (req, res) => {
  res.render('_card'); // Render the "card" view

});

app.get('/table_info', (req, res) => {
  res.render('table_info'); // Render the "table" view
});

app.get('/dashboard', (req, res) => {
  res.render('dashboard'); // Render the "card" view

});

app.get('/alluser', (req, res) => {
  res.render('alluser'); // Render the "card" view

});

app.get('/homepage', (req, res) => {
  res.render('homepage'); // Render the "card" view

});

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});

