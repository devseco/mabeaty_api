const mysql = require('../config/db')
class Slider {
    static GetAllSliders(){
        return new Promise(resolve=>{
            mysql.query('select * from sliders' , [],(e,r)=>{
                if(!e)
                resolve(r)
            });
        })
    }
}
module.exports = Slider