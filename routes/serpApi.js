// routes/serpApi.js
const express = require("express");
const axios = require("axios");
const router = express.Router();

const BASE_URL = "https://serpapi.com/search";
const SERP_API_KEY = process.env.SERP_API_KEY;
if (!SERP_API_KEY) {
  throw new Error(
    "The OPENAI_API_KEY environment variable is missing or empty; please provide it in your .env file."
  );
}

router.get("/search", async (req, res) => {
  const { query } = req.query; // Extract the query parameter from the request

  const params = {
    engine: "google_maps",
    q: query || "Mobile App Development Texas", // Use the query parameter or a default value
    type: "search",
    api_key: SERP_API_KEY,
    hl: "en",
    ll: "@38.5816,-121.4944,14z",
    start: "40",
  };

  try {
    const response = await axios.get(BASE_URL, { params });
    res.json(response.data.local_results);
  } catch (error) {
    console.error("Error fetching data from SerpApi:", error);
    res.status(500).send("Error fetching data from SerpApi");
  }
});

module.exports = router;
