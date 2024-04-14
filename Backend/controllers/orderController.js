const Order = require('../models/order');
const Product = require('../models/product');

exports.placeOrder = async (req, res) => {

     // Prevents unauthenticated users from placing orders.
    if (!req.user) {
        return res.status(401).json({ message: 'User not logged in.' });
    }

    const { products } = req.body;
    if (!products || products.length === 0) {
        return res.status(400).json({ message: 'Order must contain at least one item.' });
    }
    try {
        const populatedOrderItems = await Promise.all(products.map(async item => {
            const product = await Product.findById(item.productId);
            console.log('Product ID:', item.productId);
            console.log('Found product:', product);
            if (!product) {
                throw new Error('Product not found');
            }
            return {
                product: item.productId,
                qty: item.quantity,
                name: product.name,
                price: product.price,
                image: product.images[0],
            };
        }));
        const order = new Order({
            user: req.user.userId, 
            orderItems: populatedOrderItems,
        });
        const savedOrder = await order.save();
        res.status(201).json({ message: 'Order created successfully', order: savedOrder });
    } catch (error) {
        res.status(500).json({ message: 'Error creating order: ' + error.message });
    }
};

exports.getUserOrders = async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: 'User not logged in.' });
    }

    try {
        const userOrders = await Order.find({ user: req.user.userId })
            .populate('orderItems.product', 'name price description category images');
        if (userOrders.length === 0) {
            return res.status(404).json({ message: 'No orders found for this user' });
        }
        res.json(userOrders);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching order history: ' + error.message });
    }
};

exports.cancelOrder = async (req, res) => {
    try {
        const orderId = req.params.id;
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: 'Order not found.' });
        }
        if (order.user.toString() !== req.user.userId) {
            return res.status(403).json({ message: 'User not authorized to cancel this order.' });
        }
        await order.remove();
        res.json({ message: 'Order canceled successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Error canceling order: ' + error.message });
    }
};
