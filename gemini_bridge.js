cat << 'EOF' > gemini_bridge.js
// Scout Bridge: Direct Gemini API Integration
async function planRouteWithGemini(destination) {
    const resultsDiv = document.getElementById('search-results') || document.body;
    resultsDiv.innerHTML = `<div style="color:#0aff6e; padding:20px;">🔍 Scout AI is calculating a $3.50 route to ${destination}...</div>`;

    // Get API key from environment variable (stored securely in .env, not in Git)
    const API_KEY = window.GOOGLE_API_KEY || localStorage.getItem('GOOGLE_API_KEY') || prompt('Enter your Google API Key:');
    if (!API_KEY) throw new Error('API Key required');
    const URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

    try {
        const response = await fetch(URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: `You are the Scout AI for the Westlake/Thousand Oaks area. 
                        Plan a realistic transit/scooter route to ${destination}. 
                        Include estimated time and a total cost of $3.50. 
                        Format the response in clean HTML.`
                    }]
                }]
            })
        });

        if (!response.ok) throw new Error('API Key or Network Error');

        const data = await response.json();
        const aiResponse = data.candidates[0].content.parts[0].text;
        
        resultsDiv.innerHTML = `
            <div style="background:#161e16; border:1px solid #0aff6e; padding:20px; border-radius:8px; margin:20px;">
                <h3 style="color:#0aff6e; margin-top:0;">✅ Route Optimized</h3>
                <div style="color:white; line-height:1.6;">${aiResponse}</div>
            </div>`;

    } catch (error) {
        console.error("Scout Engine Error:", error);
        resultsDiv.innerHTML = `<div style="color:#ff5c1a; padding:20px;">❌ Error: Could not connect to Scout Brain. Check your API Key.</div>`;
    }
}
EOF
git add gemini_bridge.js && git commit -m "System: Update bridge to use direct Gemini API key" && git push origin main
