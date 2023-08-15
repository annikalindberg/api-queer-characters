import express from "express";
import cors from "cors";
import queerCharacters from "./queer-characters";

const port = process.env.PORT || 8080;
const app = express();

app.use(express.json());
app.use(cors());

// Define your router
const router = express.Router();

// Define routes on the router
router.get("/", (req, res) => {
  res.send("Hello, world!");
});

router.get("/api/characters", (req, res) => {
  const { platform } = req.query;
  let charactersFromPlatform = queerCharacters;

  if (platform) {
    charactersFromPlatform = charactersFromPlatform.filter(
      (character) => character.platform === platform
    );
  }

  res.json(charactersFromPlatform); // this is the response that the client will receive when they make a GET request to /api/characters (or /api/characters?platform=Netflix)
});

// Use the router under the /api path
app.use('/', router);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

