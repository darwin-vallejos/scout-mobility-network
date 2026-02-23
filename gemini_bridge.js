// Scout AI Bridge: Connecting the frontend to the Gemini Brain
async function planRouteWithGemini(destination) {
    const resultsDiv = document.getElementById('search-results') || document.body;
    resultsDiv.innerHTML = `🔍 Scout AI is calculating your route to ${destination}...`;

    const API_KEY = "PASTE_YOUR_AI_STUDIO_KEY_HERE";
    const GEMINI_ENDPOINT = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";
    const URL = `${GEMINI_ENDPOINT}?key=${API_KEY}`;

    try {
        const response = await fetch(URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{ parts: [{ text: `Plan a $3.50 Scout scooter route in Westlake to ${destination}. Return a 3-sentence summary.` }] }]
            })
        });

        if (!response.ok) {
            const errText = await response.text();
            throw new Error(`API error ${response.status}: ${errText}`);
        }

        const data = await response.json();
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || JSON.stringify(data);
        resultsDiv.innerHTML = `<h3>✅ Route Found</h3><p>${text}</p>`;
    } catch (err) {
        resultsDiv.innerHTML = "❌ Connection Error. Check your API Key.";
        console.error(err);
    }
}

