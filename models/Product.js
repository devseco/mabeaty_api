const mysql = require('../config/db')
class Product {

    static async getProducts(){
        return new Promise(resolve=>{
            mysql.query('select * from products', [], (error , result)=>{
                if(!error){
                    resolve(result);
                }
            });
        })
    }
    static async getTopSellingProducts(page, limit) {
      return new Promise(resolve => {
        const offset = (page - 1) * limit;
        mysql.query(`
          SELECT p.*, COUNT(s.item_id) AS total_sales
          FROM products p
          JOIN sales s ON p.id = s.item_id
          GROUP BY p.id
          ORDER BY total_sales DESC
          LIMIT ?, ?`, [offset, limit], (error, results) => {
          if (!error) {
            resolve(results);
          } else {
            // handle error
          }
        });
      });
    }
    
    static async getProductsRecently(page, limit) {
        return new Promise(resolve => {
          const offset = (page - 1) * limit;
          mysql.query('SELECT * FROM products ORDER BY id DESC LIMIT ?, ?', [offset, limit], (error, results) => {
            if (!error) {
              resolve(results);
            } else {
              // handle error
            }
          });
        });
      }
      static searchProduct(title) {
        return new Promise((resolve, reject) => {
          const query = 'SELECT * FROM products WHERE title LIKE ? ORDER BY id DESC';
          mysql.query(query, ['%' + title + '%'], (error, results) => {
            if (!error) {
              // تحويل النتائج إلى الشكل المطلوب
              const formattedResults = results.map((item) => {
                return {
                  'label': item.title, // افترض أن لديك عمود title في جدول products
                  'value': item.id    // افترض أن لديك عمود id في جدول products
                };
              });
              resolve(formattedResults);
            } else {
              reject(error); // يجب التعامل مع الخطأ بشكل مناسب
            }
          });
        });
      }      

    static async getProduct(id){
        return new Promise(resolve=>{
            mysql.query('select * from products where id = ?' , [id], (error , result)=>{
                if(!error){
                    resolve(result);
                }
            });
        })
    }
    static async getProductByCategory(id){
        return new Promise(resolve=>{
            mysql.query('select * from products where category = ?' , [id], (error , result)=>{
                if(!error){
                    resolve(result);
                }
            });
        })
    }
}
module.exports = Product;