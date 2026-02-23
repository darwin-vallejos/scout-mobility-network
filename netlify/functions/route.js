exports.handler = async function (event, context) {
  try {
    const apiKey = process.env.MY_API_KEY || null;
    if (!apiKey) {
      console.warn('MY_API_KEY is not set in environment; proceeding without it.');
    } else {
      console.log('MY_API_KEY loaded from environment.');
    }
    const method = event.httpMethod || 'GET';
    let destination = 'unknown';

    if (method === 'GET') {
      destination = (event.queryStringParameters && event.queryStringParameters.destination) || destination;
    } else {
      const body = event.body ? JSON.parse(event.body) : {};
      destination = body.destination || destination;
    }

    // Minimal mock routing engine response — replace with real logic later.
    const route = {
      destination,
      eta_minutes: 7,
      cost_usd: 3.5,
      summary: `Direct Scout route to ${destination}: ~7 minutes, $3.50.`,
      legs: [
        { from: 'Start', to: 'Waypoint A', mode: 'scooter', duration_min: 4 },
        { from: 'Waypoint A', to: destination, mode: 'scooter', duration_min: 3 }
      ]
    };

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(route)
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: String(err) })
    };
  }
};
