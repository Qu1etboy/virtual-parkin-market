const express = require("express");
const multer = require("multer");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const PORT = 4000;

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./uploads");
  },
  filename: function (req, file, callback) {
    callback(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/upload", upload.single("image"), (req, res) => {
  res.json(req.file);
});

app.post("/upload-multiple", upload.array("images[]"), (req, res) => {
  res.send(req.files);
});

app.listen(PORT, () => console.log(`Running on port ${PORT}`));
