import express from "express";
import cors from 'cors';
import eventRoute from "./routes/eventRoute.js";
import categoryRoute from "./routes/categoryRoute.js";
import pembicaraRoute from "./routes/pembicaraRoute.js"; // Import Pembicara

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Server Event Management Core API - Active");
});

// Routing API Nodes
app.use("/events", eventRoute);
app.use("/categories", categoryRoute);
app.use("/pembicara", pembicaraRoute); // Daftarkan rute pembicara

app.listen(port, () => {
  console.log(`⚡ Core Server running on http://localhost:${port}`);
});