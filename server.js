const express = require('express');
const app = express();
app.use(express.json());

app.post('/ask', async (req, res) => {
    try {
        const { prompt } = req.body;

        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + process.env.GROQ_API_KEY,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "llama-3.3-70b-versatile",
                messages: [
                    {
                        role: "system",
                        content: "You are a Roblox Luau expert. Write valid Luau code using correct Roblox APIs. When asked to write a script, output ONLY the code."
                    },
                    {
                        role: "user",
                        content: prompt
                    }
                ]
            })
        });

        const data = await response.json();

        if (data && data.choices && data.choices[0]) {
            res.json({ reply: data.choices[0].message.content });
        } else {
            res.json({ reply: "Error: " + JSON.stringify(data) });
        }
    } catch (err) {
        res.json({ reply: "Server error: " + err.message });
    }
});

app.listen(3000, () => console.log('Running'));
