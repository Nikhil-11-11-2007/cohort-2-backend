import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Core Service Running");
});

app.listen(3000, () => {
  console.log("Core service running on port 3000");
}); 