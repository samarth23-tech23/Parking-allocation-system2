const express = require('express');
const app = express();

// function isActive(req ,route) {
//   // Determine the active route based on current route or other data
//   // For example, assuming you have access to the request object:
//   const currentRoute = req.url;

//   // Return true if the current route matches the specified route, false otherwise
//   return currentRoute === route;
// }


app.use('/assets',express.static('assets'))
// Set EJS as the view engine
app.set('view engine', 'ejs');

// Set the views directory
// app.set('views', __dirname);
app.set('views', 'C:\\Users\\DELL\\Desktop\\summer_internship\\views');

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


app.get('/page1', (req, res) => {
  res.render('page1'); // Render the "table" view
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
