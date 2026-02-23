// Scout Bridge: call local Netlify function `route` to get routing data
async function planRouteWithGemini(destination) {
    const resultsDiv = document.getElementById('search-results') || document.body;
    resultsDiv.innerHTML = `🔍 Scout is calculating your route to ${destination}...`;

    const URL = `/.netlify/functions/route`;

    try {
        const response = await fetch(URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ destination })
        });

        if (!response.ok) {
            const errText = await response.text();
            throw new Error(`Function error ${response.status}: ${errText}`);
        }

        const data = await response.json();
        resultsDiv.innerHTML = `<h3>✅ Route Found</h3><p>${data.summary}</p><pre>${JSON.stringify(data, null, 2)}</pre>`;
    } catch (err) {
        resultsDiv.innerHTML = '❌ Connection Error.';
        console.error(err);
    }
}
        resultsDiv.innerHTML = "❌ Connection Error. Check your API Key.";

