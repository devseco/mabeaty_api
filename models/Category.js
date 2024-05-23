const mysql = require('../config/db')
class Category {
    static async GetAllCategories(){
        return new Promise(resolve=>{
            mysql.query('select * from categories' , [], (error , result)=>{
                if(!error){
                    resolve(result);
                }
            });
        })
    }
    static async GetCategory(id){
        return new Promise(resolve=>{
            mysql.query('select * from categories where id = ?' , [id], (error , result)=>{
                if(!error){
                    resolve(result);
                }
            });
        })
    }
    static async addCategory(title, image) {
        return new Promise((resolve) => {
            const query = 'INSERT INTO categories (title, image , active) VALUES (?, ? , 1)';
            mysql.query(query, [title, image], (error, result) => {
                if (!error) {
                    resolve('add Successfully');
                }else{
                    resolve(error);
                }
            });
        });
    }
}
module.exports = Category;