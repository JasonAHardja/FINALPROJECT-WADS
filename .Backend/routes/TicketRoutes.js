// import express from 'express';
// import { createTicket, getTickets } from '../controllers/TicketController.js';
// import { auth } from '../middleware/auth.js';

// const router = express.Router();

// router.post('/', auth, createTicket);     // POST /api/tickets
// router.get('/', getTickets);        // GET /api/tickets

// export default router;

import express from 'express';
import { createTicket, getUserTickets, getTicketsByUserId, updateTicket } from '../controllers/TicketController.js';
import { auth } from '../middleware/auth.js'

const router = express.Router();

router.post('/', auth, createTicket);
router.get('/', auth, getUserTickets);
router.get('/:userId', auth, getTicketsByUserId);
router.put('/:id', auth, updateTicket);

export default router;
