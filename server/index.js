const express = require('express')
const app = express()
const port = 3000

// app.use(express.static('client/dist'))
app.use(express.json());

var db = require('../db');

// Routes

// Example if cannot build in one query:
  // let promiseQueries = [db.query(), db.query()….]
  // Promise.all(promiseQueries)
  // .then
  // .catch

app.get('/products', (req, res) => {
  var page = req.query.page || 1;
  var count = req.query.count || 5;
  console.log(page)
  var queryStr = `SELECT * FROM product WHERE id BETWEEN ${(page - 1) * count + 1} AND ${page * count}`;
  db.query(queryStr)
  .then(response => {
    res.send(response.rows);
  })
  .catch(e => console.log(e))
})


app.get('/products/:id', (req, res) => {
  var {id} = req.params;
  var queryStr = `SELECT p.id, p.name, p.slogan, p.description, p.category, p.default_price, (SELECT json_agg(json_build_object('feature', feature, 'value', value)) AS features FROM features WHERE product_id = ${id}) FROM product AS p WHERE p.id=${id}`;
  db.query(queryStr)
  .then(response => {
    res.send(response.rows);
  })
  .catch(e => console.log(e))
})

app.get('/products/:id/styles', (req, res) => {
  var {id} = req.params;
  var queryStr = `SELECT productId, name, original_price, sale_price, default_style AS "default?",
  (SELECT json_object_agg(id, json_build_object('quantity', quantity, 'size', size)) AS skus FROM skus WHERE styleId=${id})
  FROM styles WHERE productId=${id} LIMIT 1`;
  db.query(queryStr)
  .then(response => {
    res.send(response.rows);
  })
  .catch(e => console.log(e))
})


// Serve
app.listen(port, () => {
  console.log(`server listening on port ${port}`)
})

