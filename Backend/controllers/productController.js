const Product = require('../models/product');
const fs = require('fs');
const path = require('path');
const util = require('util');
const { v4: uuidv4 } = require('uuid');

const mkdir = util.promisify(fs.mkdir);
const rename = util.promisify(fs.rename);

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createProduct = async (req, res) => {
    try {
        const { name, description, category } = req.body;
        let price = parseFloat(req.body.price).toFixed(2); // Convert price to a string with two decimal places
        let newProduct = new Product({
            name,
            description,
            price,
            category
        });
        await newProduct.save();

        const newFolderPath = path.join('public', 'img', `${newProduct.name}-${newProduct._id}`);
        await mkdir(newFolderPath, { recursive: true });

        newProduct.images = await Promise.all(req.body.images.map(async (image) => {
            const tempImagePath = path.join('public', 'img', 'temp', image);
            const newImageName = `${newProduct.name}-${uuidv4()}.jpg`;
            const newImagePath = path.join(newFolderPath, newImageName);
            await rename(tempImagePath, newImagePath);
            return path.join(`${newProduct.name}-${newProduct._id}`, newImageName); // Return the relative path to the image
        }));

        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const { name, description, category } = req.body;
        let price = parseFloat(req.body.price).toFixed(2); // Convert price to a string with two decimal places
        let product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });

        const oldFolderPath = path.join('public', 'img', `${product.name}-${product._id}`);
        const newFolderPath = path.join('public', 'img', `${name}-${product._id}`);
        if (oldFolderPath !== newFolderPath) {
            await rename(oldFolderPath, newFolderPath);
        }

        const imagePaths = product.images;
        if (req.files.length > 0) {
            for (let file of req.files) {
                const tempImagePath = file.path;
                const newFileName = `${name}-${uuidv4()}${path.extname(file.originalname)}`;
                const newImagePath = path.join(newFolderPath, newFileName);
                await rename(tempImagePath, newImagePath);
                const relativeImagePath = path.join(`${name}-${product._id}`, newFileName);
                imagePaths.push(relativeImagePath); // Push the relative path to the image
            }
        }

        product.name = name;
        product.description = description;
        product.price = price;
        product.category = category;
        product.images = imagePaths;

        await product.save();
        res.json(product);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const rm = util.promisify(fs.rm);
exports.deleteProduct = async (req, res) => {
    try {
        let product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });

        const folderPath = path.join('public', 'img', `${product.name}-${product._id}`);
        if (fs.existsSync(folderPath)) {
            await rm(folderPath, { recursive: true, force: true });
        }

        await Product.deleteOne({ _id: req.params.id });
        res.json({ message: 'Product deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
