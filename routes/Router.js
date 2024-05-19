const Billcontroller = require('../controllers/Billcontroller');
const Categorycontroller = require('../controllers/Categorycontroller');
const OrderController = require('../controllers/OrderController');
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
router.get('/userInfo/:id',Usercontroller.getUserInfo);
//Products
router.get('/getProducts',ProductController.GetAllProducts);
router.get('/getProduct/:id',ProductController.GetProduct);
router.get('/filterProducts/:title',ProductController.FilterProducts);
router.get('/getProductByCategory/:id',ProductController.GetProductByCategory);
router.get('/getProductsRecently/:page/:limit',ProductController.GetProductRecently);
router.get('/getProductsFilters/:page/:limit',ProductController.GetProductFilter);
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
//Orders
router.get('/getOrder/:id',OrderController.getOrder);
router.post('/addOrder',OrderController.addOrder);
router.get('/getAllOrders',OrderController.getAllOrder);
// Exprot

module.exports = router;