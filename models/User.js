const mysql = require('../config/db')
const auth_new = require('../middleware/auth')
class UserModel{
    static async login(phone) {
        return new Promise((resolve, reject) => {
            mysql.query('SELECT * FROM users WHERE phone = ?', [phone], (error, results) => {
                if(error) {
                    resolve({'message': error , 'status_code':400}); // Reject the promise if an error occurs
                } else {
                    if(results && results.length > 0) {
                        resolve({"message":"Login Successfully",
                        "status_code":200,
                        "user_id": results[0]['id'],
                        'access_token':auth_new.generateAccessToken({username: results[0]}),
                        'username' : results[0]['name'],
                        'phone' : results[0]['phone']
                    }); // Resolve with access token if results are found
                    } else {
                        resolve({"message":"No user found" , 'status_code':404}); // Reject if no results are found
                    }
                }
            });
        });
    }
    static async getUser(req,res,next){
        return new Promise(resolve=>{
            mysql.query('select * from users' , [], (error , result)=>{
                if(!error){
                    resolve(result);
                }
            });
        })
    }
    static async getUserInfo(id) {
        return new Promise((resolve, reject) => {
            // استعلام لجلب معلومات المستخدم من جدول users
            const userInfoQuery = `
                SELECT name,phone,email,city , address,active
                FROM users
                WHERE id = ?
            `;
    
            // استعلام لحساب مجموع الحالات من جدول bills
            const summaryQuery = `
            SELECT
            COALESCE((SELECT SUM(profit) FROM bills WHERE user_id = ? AND status = 4 AND pay = 0), 0) AS total_loss,
            COALESCE((SELECT SUM(profit) FROM bills WHERE user_id = ? AND status = 4 AND pay = 1), 0) AS total_received_profit,
            COALESCE((SELECT SUM(profit) FROM bills WHERE user_id = ? AND status = 5 AND pay = 0), 0) AS total_returned_orders,
            COALESCE((SELECT SUM(profit) FROM bills WHERE user_id = ? AND status NOT IN (4, 5) AND pay = 0), 0) AS total_expected_profit`;
    
            // تنفيذ استعلام معلومات المستخدم
            mysql.query(userInfoQuery, [id], (error, userInfoResult) => {
                if (error) {
                    return reject(error);
                }
                // تنفيذ استعلام مجموع الحالات
                mysql.query(summaryQuery, [id, id, id, id], (summaryError, summaryResult) => {
                    if (summaryError) {
                        return reject(summaryError);
                    }
                    resolve({ userInfo: userInfoResult[0], summary: summaryResult[0] });
                });
            });
        });
    }
    
    
    
    
    

    
    static async addNewUser(name , password , email){
        return new Promise(resolve=>{
            mysql.query('insert into users (name,password,email) values(?,?,?)' , [name,password,email],(error,r)=>{
                if(!error)
                resolve(true)
                else
                resolve(false)
            });
        })
    }
}
module.exports = UserModel;