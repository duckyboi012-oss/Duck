const express = require('express');
const app = express();
app.use(express.json());

app.post('/ask', async (req, res) => {
    const { prompt } = req.body;
    const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
            "x-api-key": process.env.CLAUDE_API_KEY,
            "anthropic-version": "2023-06-01",
            "content-type": "application/json"
        },
        body: JSON.stringify({
            model: "claude-sonnet-4-20250514",
            max_tokens: 2000,
            system: "You are a Roblox Luau expert. Write valid Luau code using correct Roblox APIs. When asked to write a script, output ONLY the code.",
            messages: [{ role: "user", content: prompt }]
        })
    });
    const data = await response.json();
    res.json({ reply: data.content[0].text });
});

app.listen(3000, () => console.log('Running'));
