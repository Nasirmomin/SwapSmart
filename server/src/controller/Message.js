import Message from '../models/Messages.js';

// Get all messages
export const getAllMessages = async (req, res) => {
  try {
    const messages = await Message.findAll();
    res.status(200).json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching messages', error: error.message });
  }
};

// Get messages between two users
export const getMessagesBetweenUsers = async (req, res) => {
  const { sender_id, receiver_id } = req.params;
  try {
    const messages = await Message.findAll({
      where: {
        sender_id,
        receiver_id
      },
      order: [['createdAt', 'ASC']]
    });
    res.status(200).json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching conversation', error: error.message });
  }
};

// Send a new message
export const sendMessage = async (req, res) => {
  try {
    const newMessage = await Message.create(req.body);
    res.status(201).json(newMessage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error sending message', error: error.message });
  }
};

// Mark message as read
export const markAsRead = async (req, res) => {
  const { id } = req.params;
  try {
    const message = await Message.findByPk(id);
    if (!message) return res.status(404).json({ message: 'Message not found' });

    await message.update({ is_read: true });
    res.status(200).json({ message: 'Message marked as read', updatedMessage: message });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error marking message as read', error: error.message });
  }
};

// Delete a message
export const deleteMessage = async (req, res) => {
  const { id } = req.params;
  try {
    const message = await Message.findByPk(id);
    if (!message) return res.status(404).json({ message: 'Message not found' });

    await message.destroy();
    res.status(200).json({ message: 'Message deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting message', error: error.message });
  }
};
