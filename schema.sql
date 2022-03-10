/* Run in psql:
  \i /Users/danielkim520/Desktop/SDC/schema.sql
 */


create table product (
  id INTEGER NOT NULL PRIMARY KEY,
  name VARCHAR,
  slogan VARCHAR,
  description VARCHAR,
  category VARCHAR,
  default_price VARCHAR
);

create table features (
  id INTEGER NOT NULL PRIMARY KEY,
  product_id INTEGER REFERENCES product(id), /* titled "id" in api */
  feature VARCHAR,
  value VARCHAR
);

create table styles (
  id INTEGER NOT NULL PRIMARY KEY, /* titled "style_id" in api */
  productId INTEGER REFERENCES product(id), /* titled "product_id" in api */
  name VARCHAR,
  sale_price VARCHAR,
  original_price VARCHAR,
  default_style BOOLEAN /* titled "default?" and is a boolean in api */
);

create table photos (
  id INTEGER NOT NULL PRIMARY KEY,
  styleId INTEGER REFERENCES styles(id), /* "style_id" in api*/
  url VARCHAR,
  thumbnail_url VARCHAR
);

create table skus (
  id INTEGER NOT NULL PRIMARY KEY, /* I think "skus" in api */
  styleId INTEGER REFERENCES styles(id),
  size VARCHAR,
  quantity INTEGER
);

/* Load */
COPY product from '/Users/danielkim520/Desktop/SDC/csvData/product.csv' DELIMITERS ',' CSV HEADER;
COPY features from '/Users/danielkim520/Desktop/SDC/csvData/features.csv' DELIMITERS ',' CSV HEADER;
COPY styles from '/Users/danielkim520/Desktop/SDC/csvData/styles.csv' DELIMITERS ',' CSV HEADER;
COPY photos from '/Users/danielkim520/Desktop/SDC/csvData/photos.csv' DELIMITERS ',' CSV HEADER;
COPY skus from '/Users/danielkim520/Desktop/SDC/csvData/skus.csv' DELIMITERS ',' CSV HEADER;

CREATE INDEX features_product_id_index ON features (product_id);
CREATE INDEX styles_productId_index ON styles (productId);
CREATE INDEX photos_styleId_index ON photos (styleId);
CREATE INDEX skus_styleId_index ON skus (styleId);

-- create table related (
--   id BIGSERIAL NOT NULL PRIMARY KEY,
--   productId INTEGER REFERENCES products,
--   relatedProductId REFERENCES products(productId)
--   )