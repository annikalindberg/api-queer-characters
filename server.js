import express from "express";
import cors from "cors";
import queerCharacters from "./queer-characters";

const port = process.env.PORT || 8080;
const app = express();

app.use(express.json());
app.use(cors());



// Define routes on the router
/* router.get("/", (req, res) => {
  res.send("Hello, world!");
}); */

// Create the platform to characters mapping
const platformToCharactersMap = {};

// Populate the mapping using the queerCharacters data
queerCharacters.forEach(character => {
  const { platform } = character;
  if (!platformToCharactersMap[platform]) {
    platformToCharactersMap[platform] = [];
  }
  platformToCharactersMap[platform].push(character);
});

// Define your router
const router = express.Router();

router.get("/api/characters", (req, res) => {
  const { platform } = req.query;
  let charactersFromPlatform = platformToCharactersMap[platform] || [];

  res.json(charactersFromPlatform); // this is the response that the client will receive when they make a GET request to /api/characters (or /api/characters?platform=Netflix)
});

// Use the router under the /api path
app.use('/', router);

 /*  if (platform) {
    charactersFromPlatform = charactersFromPlatform.filter(
      (character) => character.platform === platform
    );
  }
 */

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

