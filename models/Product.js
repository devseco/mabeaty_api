const mysql = require('../config/db')
class Product {


  static async addProduct(title, price, description, primaryImageUrl, category, count, renewable, secondaryImagesUrls) {
    return new Promise((resolve, reject) => {
      // إدراج المنتج في جدول products
      const productQuery = 'INSERT INTO products (title, price, description, image, category, lastprice, count, renewable) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
      mysql.query(productQuery, [title, price, description, primaryImageUrl, category, 0, count, renewable], (error, productResult) => {
        if (error) {
          return resolve(error);
        }
        // الحصول على ID المنتج المضاف
        const productId = productResult.insertId;
  
        // إدراج الصور الثانوية في جدول images
        const imagesQuery = 'INSERT INTO images (item_id, image) VALUES ?';
        const imagesData = secondaryImagesUrls.map(url => [productId, url]);
        mysql.query(imagesQuery, [imagesData], (imagesError) => {
          if (imagesError) {
            return resolve(imagesError);
          }
          resolve('Product and images added successfully');
        });
      });
    });
  }
  
  

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

      static async getProduct(id) {
        return new Promise((resolve, reject) => {
            mysql.query('SELECT * FROM products WHERE id = ?', [id], (error, productResult) => {
                if (error) {
                    return reject(error);
                }
    
                if (productResult.length === 0) {
                    return resolve(null); // or reject with an error if preferred
                }
    
                const product = productResult[0];
    
                mysql.query('SELECT image FROM images WHERE item_id = ?', [id], (imgError, imgResult) => {
                    if (imgError) {
                        return reject(imgError);
                    }
    
                    const images = imgResult.map(image => image.image);
    
                    const productWithImages = {
                        id: product.id,
                        title: product.title,
                        price: product.price,
                        description: product.description,
                        image: product.image,
                        category: product.category,
                        lastprice: product.lastprice,
                        count: product.count,
                        renewable: product.renewable,
                        images: images
                    };
    
                    resolve(productWithImages);
                });
            });
        });
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