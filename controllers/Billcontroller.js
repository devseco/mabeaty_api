const Bill = require('../models/Bill');

class BillController {
    static async addBill(req, res, next) {
        try {
            const { name, phone, city, address, price, delivery, items , user_id, customer_name ,customer_total , customer_nearpoint , profit , note} = req.body;
            const result = await Bill.addBill(name, phone, city, address, price, delivery, items,user_id,customer_name, customer_total , customer_nearpoint , profit , note);
            res.status(200).send('Bill added successfully');
        } catch (error) {
            console.error('Error adding bill:', error);
            res.status(500).send('Failed to add bill');
        }
    }
    static async getSalesById(req, res, next) {
        try {
            const billId = req.params.id;
            const result = await Bill.getSalesById(billId);
            if (result.length > 0) {
                res.status(200).json(result);
            } else {
                res.status(404).send('Bill not found');
            }
        } catch (error) {
            console.error('Error fetching bill:', error);
            res.status(500).send('Failed to fetch bill');
        }
    }
    static async getAllBill(req, res, next) {
        try {
            const result = await Bill.getAllBill();
            if (result.length > 0) {
                res.status(200).json(result);
            } else {
                res.status(404).send('Bill not found');
            }
        } catch (error) {
            console.error('Error fetching bill:', error);
            res.status(500).send('Failed to fetch bill');
        }
    }
    static async getBill(req, res, next) {
        try {
            const billId = req.params.id;
            const result = await Bill.getBill(billId);
            if (result.length > 0) {
                res.status(200).json(result);
            } else {
                res.status(404).send('Bill not found');
            }
        } catch (error) {
            console.error('Error fetching bill:', error);
            res.status(500).send('Failed to fetch bill');
        }
    }
    static async getBillsLastest(req, res, next) {
        try {
            const billId = req.params.id;
            const result = await Bill.getBillsLastest(billId);
            if (result.length > 0) {
                res.status(200).json(result);
            } else {
                res.status(404).send('Bill not found');
            }
        } catch (error) {
            console.error('Error fetching bill:', error);
            res.status(500).send('Failed to fetch bill');
        }
    }
    
    static async getBillsByid(req, res, next) {
        try {
            const billId = req.params.id;
            const result = await Bill.getBillsById(billId);
            if (result.length > 0) {
                res.status(200).json(result);
            } else {
                res.status(404).send('Bill not found');
            }
        } catch (error) {
            console.error('Error fetching bill:', error);
            res.status(500).send('Failed to fetch bill');
        }
    }
    static async changeStatus(req, res, next) {
        try {
          // تحويل billIds إلى مصفوفة إذا كانت سلسلة نصية
          const billIds = Array.isArray(req.body.id) ? req.body.id : JSON.parse(req.body.id);
          const status = req.body.status;
          const results = await Promise.all(billIds.map(billId => Bill.changeStatusBill(status, billId)));
          res.status(200).json(results);
        } catch (error) {
          console.error('Error changing bill status:', error);
          res.status(500).send('Failed to change bill status');
        }
      }
      
      
}

module.exports = BillController;
