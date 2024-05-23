const Billcontroller = require('../controllers/Billcontroller');
const Categorycontroller = require('../controllers/Categorycontroller');
const OrderController = require('../controllers/OrderController');
const ProductController = require('../controllers/Productcontroller');
const SliderController = require('../controllers/Slidercontroller');
const Usercontroller = require('../controllers/Usercontroller');
const { authenticateToken } = require('../middleware/auth');
const router = require('express').Router();
const auth = require('../middleware/auth');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
//uploadimage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadDir = 'uploads/';
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir);
      }
      cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    }
  });
  const upload = multer({ storage: storage });
//Auth
router.get('/allusers',Usercontroller.getAllUsers);
router.post('/addnew',Usercontroller.addnewuser);
router.post('/login',Usercontroller.login);
router.get('/userInfo/:id',Usercontroller.getUserInfo);
//Products
// تعديل تكوين Multer لقبول ملفات متعددة

// تعديل نقطة النهاية لإضافة المنتج لتقبل الصور الأساسية والثانوية
router.post('/addProduct', upload.fields([
  { name: 'primaryImage', maxCount: 1 },
  { name: 'secondaryImages', maxCount: 3 }
]), async (req, res, next) => {
  try {
    // الصورة الأساسية
    const primaryImageUrl = req.files['primaryImage']
      ? `http://127.0.0.1:3000/uploads/${req.files['primaryImage'][0].filename}`
      : null;

    // الصور الثانوية
    const secondaryImagesUrls = req.files['secondaryImages']
      ? req.files['secondaryImages'].map(file => `http://127.0.0.1:3000/uploads/${file.filename}`)
      : [];

    // استدعاء دالة إضافة المنتج مع الصور الأساسية والثانوية
    await ProductController.addProduct(req,res,next, primaryImageUrl,secondaryImagesUrls);

  } catch (error) {
    next(error);
  }
});
router.get('/getProducts',ProductController.GetAllProducts);
router.get('/getProduct/:id',ProductController.GetProduct);
router.get('/filterProducts/:title',ProductController.FilterProducts);
router.get('/getProductByCategory/:id',ProductController.GetProductByCategory);
router.get('/getProductsRecently/:page/:limit',ProductController.GetProductRecently);
router.get('/getProductsFilters/:page/:limit',ProductController.GetProductFilter);
//Categories
// Categories
router.post('/addCategory', upload.single('file'), async (req, res, next) => {
    try {
        // Handle file upload logic
        const imageUrl = `http://127.0.0.1:3000/uploads/${req.file.filename}`;
        const title = req.body.title;

        // Check if the uploaded file is an image
        if (!req.file || !req.file.mimetype.startsWith('image/')) {
            return res.status(400).json({ error: 'Only image files are allowed.' });
        }

        // Call the addCategory function
        await Categorycontroller.addCategory(req, res, next, imageUrl, title);
    } catch (error) {
        // Handle any errors
        next(error); // Pass the error to the error-handling middleware
    }
});

router.get('/getCategories',Categorycontroller.GetAllCategories);
router.get('/getCategory/:id',Categorycontroller.GetCategory);
//Sliders
router.get('/getSliders',SliderController.GetAllProducts);
//Bills
router.get('/getAllBill',Billcontroller.getAllBill);
router.get('/getBillsLastest/:id',Billcontroller.getBillsLastest);
router.get('/getBill/:id',Billcontroller.getBill);
router.get('/getBills/:id',Billcontroller.getBillsByid);
router.post('/addBill',Billcontroller.addBill);
router.get('/getSales/:id',Billcontroller.getSalesById);
router.post('/changeStatus',Billcontroller.changeStatus);
//Orders
router.get('/getOrder/:id',OrderController.getOrder);
router.post('/addOrder',OrderController.addOrder);
router.get('/getAllOrders',OrderController.getAllOrder);
// Exprot

module.exports = router;