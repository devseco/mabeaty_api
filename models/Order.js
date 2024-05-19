const mysql = require('../config/db')
class Order{
    //getOrders
    static async getOrder(id) {
        return new Promise(resolve => {
            mysql.query('SELECT  * FROM orders WHERE id = ?', [id], (error, result) => {
                if (!error) {
                    resolve(result);
                } else {
                    resolve(error);
                }
            });
        });
    }
    static async getAllOrder() {
        return new Promise(resolve => {
            mysql.query('SELECT  * FROM orders ', [], (error, result) => {
                if (!error) {
                    resolve(result);
                } else {
                    resolve(error);
                }
            });
        });
    }
    static async addOrder(name, phone, total, payment_type, payment_number, payment_name) {
        return new Promise((resolve, reject) => {
            mysql.query('INSERT INTO orders (name, phone, total, payment_type, payment_number, payment_name) VALUES (?, ?, ?, ?, ?, ?)', 
            [name, phone, total, payment_type, payment_number, payment_name], 
            (error, result) => {
                if (!error) {
                    console.log('ok');
                    mysql.query('UPDATE bills SET request = 1 WHERE pay = 0 AND status = 4', (updateError, updateResult) => {
                        if (!updateError) {
                            console.log('update ok');
                            resolve({insertResult: result, updateResult: updateResult});
                        } else {
                            console.log(updateError);
                            resolve(updateError);
                        }
                    });
                } else {
                    console.log(error);
                    resolve(error);
                }
            });
        });
    }
    
    //UPDATE bills SET request = 1 WHERE pay = 0 AND status = 4
    

}
module.exports = Order;