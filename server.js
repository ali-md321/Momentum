if(process.env.NODE_ENV !== "production"){
  require('dotenv').config(); 
}
const express = require("express");
const app = require("./Backend/app");
const path = require("path");
const connectDB = require('./Backend/config/databaseConnect');
const { configureSocket } = require("./Backend/config/socketConfig");
const PORT = process.env.PORT || 3000;

connectDB();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "Frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "Frontend", "dist", "index.html"));
  });
}

const server = app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

configureSocket(server);