import { useEffect, useState } from "react";
import axios from "axios";

export default function App() {
  const [tickets, setTickets] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const fetchTickets = async () => {
    const res = await axios.get("http://localhost:5000/api/tickets");
    setTickets(res.data);
  };

  const addTicket = async () => {
    if (!title || !description) return;
    await axios.post("http://localhost:5000/api/tickets", { title, description });
    setTitle("");
    setDescription("");
    fetchTickets();
  };

  const updateStatus = async (id, status) => {
    await axios.put(`http://localhost:5000/api/tickets/${id}`, { status });
    fetchTickets();
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Ticketing System</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="border p-2 mr-2"
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          className="border p-2 mr-2"
        />
        <button onClick={addTicket} className="bg-blue-500 text-white px-4 py-2">Add Ticket</button>
      </div>
      <ul>
        {tickets.map(ticket => (
          <li key={ticket.id} className="border p-2 mb-2">
            <div className="font-bold">{ticket.title}</div>
            <div>{ticket.description}</div>
            <div>Status: {ticket.status}</div>
            <button
              onClick={() => updateStatus(ticket.id, ticket.status === "Open" ? "Closed" : "Open")}
              className="text-sm text-blue-600 mt-2"
            >
              Toggle Status
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
