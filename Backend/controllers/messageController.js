exports.sendMessage = (req, res) => {
    const { name, email, message } = req.body;

    // Validate the required fields
    if (!name || !email || !message) {
        // If any of the fields are missing, return a 400 status code
        return res.status(400).json({ message: 'All fields are required: name, email, message.' });
    }

    // If validation passes, return a 200 status code
    res.status(200).json({ message: 'Message received successfully', data: { name, email, message } });
};