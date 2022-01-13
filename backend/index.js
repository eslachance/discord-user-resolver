import express from "express";
import dotenv from "dotenv";
import { Client, Intents } from "discord.js";
import cors from "cors";

dotenv.config();

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

const getUser = async (id) => {
  if (client.users.cache.has(id)) return client.users.cache.get(id);
  console.log(`User ${id} is not cached, fetching...`);
  return client.users.fetch(id).catch(console.error);
};

client.once("ready", () => {
  console.log("Client Ready to Roll!");
});

// Login to Discord with your client's token
client.login();

const app = express();

app.use(cors());

app.use(express.static("static"));

app.get("/user/:userId", async (req, res) => {
  console.log("Getting data for: ", req.params.userId);
  const userdata = await getUser(req.params.userId);
  if (!userdata) return res.status(404);
  res.json(userdata);
});

app.listen(process.env.PORT || 3030);
