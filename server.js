require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

// Enable CORS and JSON parsing
app.use(cors());
app.use(express.json());

// Spotify OAuth configuration
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = 'http://127.0.0.1:8001/callback';
const SCOPE = 'user-read-recently-played user-read-private user-read-email';

// Login route
app.get('/login', (req, res) => {
    const authUrl = 'https://accounts.spotify.com/authorize?' + new URLSearchParams({
        response_type: 'code',
        client_id: CLIENT_ID,
        scope: SCOPE,
        redirect_uri: REDIRECT_URI,
        show_dialog: true
    }).toString();
    
    res.redirect(authUrl);
});

// Callback route to handle the authorization code
app.get('/callback', async (req, res) => {
    const code = req.query.code || null;
    
    if (code) {
        try {
            const response = await fetch('https://accounts.spotify.com/api/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Basic ' + Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64')
                },
                body: new URLSearchParams({
                    code: code,
                    redirect_uri: REDIRECT_URI,
                    grant_type: 'authorization_code'
                }).toString()
            });

            if (!response.ok) {
                throw new Error('Token exchange failed');
            }

            const data = await response.json();
            res.redirect(`/?access_token=${data.access_token}`);
        } catch (error) {
            console.error('Error exchanging code for token:', error);
            res.redirect('/?error=token_exchange_failed');
        }
    } else {
        res.redirect('/?error=invalid_code');
    }
});

// Serve static files
app.use(express.static(__dirname));

// Start server
const PORT = 8001;
app.listen(PORT, () => {
    console.log(`Server is running on http://127.0.0.1:${PORT}`);
    console.log('To start using the app, visit: http://127.0.0.1:8001/login');
}); 