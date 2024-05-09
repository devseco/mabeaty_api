const Billcontroller = require('../controllers/Billcontroller');
const Categorycontroller = require('../controllers/Categorycontroller');
const ProductController = require('../controllers/Productcontroller');
const SliderController = require('../controllers/Slidercontroller');
const Usercontroller = require('../controllers/Usercontroller');
const { authenticateToken } = require('../middleware/auth');
const router = require('express').Router();
const auth = require('../middleware/auth');
//Auth
router.get('/allusers',auth.authenticateToken,Usercontroller.getAllUsers);
router.post('/addnew',Usercontroller.addnewuser);
router.post('/login',Usercontroller.login);
//Products
router.get('/getProducts',ProductController.GetAllProducts);
router.get('/getProduct/:id',ProductController.GetProduct);
router.get('/filterProducts/:title',ProductController.FilterProducts);
router.get('/getProductByCategory/:id',ProductController.GetProductByCategory);
router.get('/getProductsRecently',ProductController.GetProductRecently);
//Categories
router.get('/getCategories',Categorycontroller.GetAllCategories);
router.get('/getCategory/:id',Categorycontroller.GetCategory);
//Sliders
router.get('/getSliders',SliderController.GetAllProducts);
//Bills
router.get('/getBillsLastest/:id',Billcontroller.getBillsLastest);
router.get('/getBill/:id',Billcontroller.getBill);
router.get('/getBills/:id',Billcontroller.getBillsByid);
router.post('/addBill',Billcontroller.addBill);
router.get('/getSales/:id',Billcontroller.getSalesById);
// Exprot
module.exports = router;