const express = require('express');
const router = express.Router();
const multer = require('multer');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');
const productController = require('../controllers/productController');

// Configure multer for image storage
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/img/temp/');
    },
    filename: function(req, file, cb) {
        cb(null,Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });


// Middleware to resize images
const resizeImages = async (req, res, next) => {
    if (!req.files) return next();

    req.body.images = [];
    await Promise.all(req.files.map(async (file) => {
        const filename = file.originalname.replace(path.extname(file.originalname), '.jpg');

        // Path for the compressed image
        const outputPath = `public/img/temp/${filename}`;

        try {
            // Compressing the image, converting to JPEG, and resizing
            await sharp(file.path)
                .resize(500)
                .jpeg({ quality: 70 })
                .toFile(outputPath);

            // Add the filename to req.body.images to use later 
            req.body.images.push(filename);

          
        } catch (error) {
            console.error("Error processing file", filename, error);
        }
    }));

    next();
};

// Routes
router.post('/products', upload.array('images', 10), resizeImages, productController.createProduct);
router.put('/products/:id', upload.array('images', 10), resizeImages, productController.updateProduct);
router.get('/products', productController.getAllProducts);
router.get('/products/:id', productController.getProductById);
router.delete('/products/:id', productController.deleteProduct);

module.exports = router;
