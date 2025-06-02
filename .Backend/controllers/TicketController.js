import Ticket from '../models/Ticket.js';

// Create a new ticket
export const createTicket = async (req, res) => {
  try {
    const { title, category, description } = req.body;

    if (!title || !category || !description) {
        return res.status(400).json({ message: "Title, category, and description are required." });
        }

    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "Unauthorized. No user found." });
    }

    const ticket = new Ticket({
      title,
      category,
      description,
      user: req.user._id,
    });

    await ticket.save();
    res.status(201).json(ticket);
  } catch (error) {
    console.error("Create Ticket Error:", error);
    res.status(500).json({ message: "Server error while creating ticket" });
  }
};

// Get all tickets for the current user
export const getUserTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(tickets);
  } catch (error) {
    console.error("Get User Tickets Error:", error);
    res.status(500).json({ message: "Server error while fetching tickets" });
  }
};

// Update a ticket (e.g., add a response or mark as completed)
export const updateTicket = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const ticket = await Ticket.findOneAndUpdate(
      { _id: id, user: req.user._id },
      updates,
      { new: true }
    );

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found or unauthorized" });
    }

    res.json(ticket);
  } catch (error) {
    console.error("Update Ticket Error:", error);
    res.status(500).json({ message: "Server error while updating ticket" });
  }
};

// Delete a ticket
export const deleteTicket = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Ticket.findOneAndDelete({ _id: id, user: req.user._id });

    if (!deleted) {
      return res.status(404).json({ message: "Ticket not found or unauthorized" });
    }

    res.json({ message: "Ticket deleted successfully" });
  } catch (error) {
    console.error("Delete Ticket Error:", error);
    res.status(500).json({ message: "Server error while deleting ticket" });
  }
};

export const getTicketsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({ message: "User ID is required." });
    }

    const tickets = await Ticket.find({ user: userId }).sort({ createdAt: -1 });
    res.json(tickets);
  } catch (error) {
    console.error("Get Tickets By UserId Error:", error);
    res.status(500).json({ message: "Server error while fetching tickets" });
  }
};