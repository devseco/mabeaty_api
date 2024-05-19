const Order = require('../models/Order');
class OrderController {
    static async addOrder(req, res, next) {
        try {
            const {name, phone, total, payment_type, payment_number, payment_name} = req.body;
            const result = await Order.addOrder(name, phone, total, payment_type, payment_number, payment_name);
            res.status(200).send('Order added successfully');
        } catch (error) {
            console.error('Error adding bill:', error);
            res.status(500).send('Failed to add Orders');
        }
    }
    static async getOrder(req, res, next) {
        try {
            const orderId = req.params.id;
            const result = await Order.getOrder(orderId);
            if (result.length > 0) {
                res.status(200).json(result);
            } else {
                res.status(404).send('Orders not found');
            }
        } catch (error) {
            console.error('Error fetching Orders:', error);
            res.status(500).send('Failed to fetch Orders');
        }
    }
    static async getAllOrder(req, res, next) {
        try {
            const billId = req.params.id;
            const result = await Order.getAllOrder();
            if (result.length > 0) {
                res.status(200).json(result);
            } else {
                res.status(404).send('Orders not found');
            }
        } catch (error) {
            console.error('Error fetching Orders:', error);
            res.status(500).send('Failed to fetch Orders');
        }
    }
    
}
module.exports = OrderController;
