const Cart = require('./cart');
const db = require('../util/database');

module.exports = class Product {
  constructor(title, imageUrl, description, price, id = null) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = +price;
    this.id = id;
  }

  save() {
    return db.execute(`INSERT INTO products (title,price,description,imageUrl) VALUES (?,?,?,?)`, [this.title, this.price, this.description, this.imageUrl]);
  }

  static edit(title, imageUrl, price, description, productId) {
    return db.execute('UPDATE products SET title=?,price=?,description=?,imageUrl=? WHERE id=?', [title, price, description, imageUrl, productId]);
  }

  static delete(id) {
    Cart.deleteProduct(id);
    return db.execute('DELETE FROM products WHERE id=?',[id]);
  }

  static fetchAll() {
    return db.execute(`SELECT * FROM products;`);
  }

  static findById(id) {
    return db.execute('SELECT * FROM products WHERE id=?', [id]);
  }
};
