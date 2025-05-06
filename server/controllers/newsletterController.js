const newsletterService = require("../services/newsletterService");

// Add a new newsletter subscriber
const addSubscriber = async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }
    
    await newsletterService.addSubscriber(email);
    res.json({ success: true, message: "Successfully subscribed to the newsletter" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all newsletter subscribers
const getAllSubscribers = async (req, res) => {
  try {
    const subscribers = await newsletterService.getAllSubscribers();
    res
      .set('Content-Type', 'application/json; charset=utf-8')
      .json(subscribers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  addSubscriber,
  getAllSubscribers
};
