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
  var queryStr = `SELECT * FROM product WHERE id BETWEEN $1 AND $2`;
  db.query(queryStr, [(page - 1) * count + 1, page * count])
  .then(response => {
    res.send(response.rows);
  })
  .catch(e => console.log(e))
})


app.get('/products/:id', (req, res) => {
  var {id} = req.params;
  var queryStr = `SELECT p.id, p.name, p.slogan, p.description, p.category, p.default_price,
  (SELECT json_agg(json_build_object('feature', feature, 'value', value)) AS features FROM features WHERE product_id = ${id}) FROM product AS p WHERE p.id=${id}`;
  db.query(queryStr)
  .then(response => {
    res.send(response.rows);
  })
  .catch(e => console.log(e))
})

// app.get('/products/:id/styles', (req, res) => {
//   var {id} = req.params;
//   var queryStr = `SELECT id AS style_id, name, original_price, sale_price, default_style AS "default?",
//   (SELECT json_agg(json_build_object('thumbnail_url', thumbnail_url, 'url', url)) AS photos FROM photos WHERE styleId = styles.id),
//   (SELECT json_object_agg(id, json_build_object('quantity', quantity, 'size', size)) AS skus FROM skus WHERE styleId=styles.id)
//   FROM styles WHERE productId=${id}`;
//   db.query(queryStr)
//   .then(response => {
//     res.send(response.rows);
//   })
//   .catch(e => console.log(e))
// })

app.get('/products/:id/styles', (req, res) => {
  var {id} = req.params;
  var queryStr = `SELECT id AS style_id, name, original_price, sale_price, default_style AS "default?",
  (SELECT json_agg(json_build_object('thumbnail_url', thumbnail_url, 'url', url)) AS photos FROM photos WHERE styleId = styles.id),
  (SELECT json_object_agg(id, json_build_object('quantity', quantity, 'size', size)) AS skus FROM skus WHERE styleId=styles.id)
  FROM styles WHERE productId=${id}`;
  db.query(queryStr)
  .then(response => {
    var final = {product_id: id};
    final.results = response.rows;
    res.send(final)
  })
  .catch(e => console.log(e))
})

app.get('/loaderio-dbfe4d36b1f2cd0cc140e26bc862d9d1.txt', (req, res) => {
  res.status(200).send('loaderio-dbfe4d36b1f2cd0cc140e26bc862d9d1');
})

// Serve
app.listen(port, () => {
  console.log(`server listening on port ${port}`)
})

