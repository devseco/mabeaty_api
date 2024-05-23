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
    static async addProduct(req,res,next , imageUrl , secondaryImagesUrls){
        try{
            const title = req.body.title;
            const price = req.body.price;
            const description = req.body.description;
            const category = req.body.category;
            const count = req.body.count;
            const renewable = req.body.renewable;
        const result = await Product.addProduct(title,price,description,imageUrl,category,count,renewable , secondaryImagesUrls);
        if(result)
        res.send(result)
        }catch(error){
            console.log(error)
        }
    }
    
}
module.exports = ProductController;