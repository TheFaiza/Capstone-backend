const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Add your routes here

const inventoryListRoutes = require("./routes/inventorylist-routes");
const warehouseListRoutes = require("./routes/warehouselist-routes");

app.use('/inventory', inventoryListRoutes);
app.use('/warehouse',warehouseListRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
