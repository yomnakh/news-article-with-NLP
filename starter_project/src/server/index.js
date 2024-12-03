const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const axios = require("axios");
const querystring = require("querystring");

dotenv.config();
const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("dist"));

// Initialize TextRazor API key
const API_KEY = process.env.API_KEY;

app.get("/", (req, res) => {
    res.sendFile(path.resolve("dist/index.html"));
});

app.post("/api/analyze", async (req, res) => {
    const { url } = req.body;

    if (!url) {
        return res.status(400).json({ message: "URL is required" });
    }

    try {
        const postData = querystring.stringify({
            url: url,
            extractors: "entities,topics,sentiment",
        });

        const response = await axios.post(
            "https://api.textrazor.com",
            postData,
            {
                headers: {
                    "x-textrazor-key": API_KEY,
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            }
        );

        // Log the complete response for debugging
        console.log("Complete TextRazor Response:", response.data);

        const entities = response.data.response.entities || [];
        const filteredEntities = entities
            .filter(e => e.entityId) // Ensure entities have an ID
            .sort((a, b) => b.relevanceScore - a.relevanceScore)
            .map((e) => ({
                id: e.entityId,
                relevance: e.relevanceScore,
                confidence: e.confidenceScore,
                types: e.freebaseTypes,
            }));

        res.json({
            entities: filteredEntities,
            topics: response.data.response.topics || [],
            sentiment: response.data.response.sentiment || {},
        });
    } catch (error) {
        console.error("Error with TextRazor API:", error.message);
        res.status(500).json({
            message: "Error analyzing URL",
            details: error.message,
        });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
