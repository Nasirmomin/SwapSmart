import Subscriber from '../models/Subscribers.js';

// Add a new subscriber
export const addSubscriber = async (req, res) => {
    const { email } = req.body;
    try {
        const subscriber = await Subscriber.create({ email });
        res.status(201).json(subscriber);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all subscribers
export const getSubscribers = async (req, res) => {
    try {
        const subscribers = await Subscriber.findAll();
        res.status(200).json(subscribers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a subscriber by ID
export const deleteSubscriber = async (req, res) => {
    const { id } = req.params;
    try {
        const subscriber = await Subscriber.destroy({ where: { id } });
        if (subscriber) {
            res.status(200).json({ message: 'Subscriber deleted successfully' });
        } else {
            res.status(404).json({ message: 'Subscriber not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
