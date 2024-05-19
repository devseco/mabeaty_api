const Product = require('../models/Product')
class ProductController {
    static async GetAllProducts(req , res , next){
        const result = await Product.getProducts();
        if(result)
        res.send(result)
    }
    static async GetProduct(req , res , next){
        const result = await Product.getProduct(req.params.id);
        if(result)
        res.send(result)
    }
    static async FilterProducts(req , res , next){
        const result = await Product.searchProduct(req.params.title);
        if(result)
        res.send(result)
    }
    static async GetProductByCategory(req , res , next){
        const result = await Product.getProductByCategory(req.params.id);
        if(result)
        res.send(result)
    }
    static async GetProductRecently(req , res , next){
        const page = parseInt(req.params.page) || 1;
        const limit = parseInt(req.params.limit) || 10; // عدد العناصر لكل صفحة
        const result = await Product.getProductsRecently(page,limit);
        if(result)
        res.send(result)
    }
    static async GetProductFilter(req , res , next){
        const page = parseInt(req.params.page) || 1;
        const limit = parseInt(req.params.limit) || 10; // عدد العناصر لكل صفحة
        const result = await Product.getTopSellingProducts(page,limit);
        if(result)
        res.send(result)
    }
}
module.exports = ProductController;