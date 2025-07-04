# Spotify Recently Played App

This web application displays your recently played tracks from Spotify using the Spotify Web API.

![Spotify Recently Played App Screenshot](/example.png)

(I know the below may seem overwhelming, but I will be walking you through it so don't panic)
(If you don't have/don't want a Spotify account, you can use my account and see my amazing music taste😎)

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/en/download)
- [Visual Studio Code](https://code.visualstudio.com/download) (or any code editor)
- A [Spotify Developer Account](https://developer.spotify.com/dashboard)

## Setup Instructions

1. **Create a Spotify Developer App**
   - Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
   - Create a new app
   - Select "Web API" when asked which API/SDKs you plan to use
   - Set the redirect URI to: `http://127.0.0.1:8001/callback`
   - Save your Client ID for later use

2. **Configure Environment Variables**
   - Create a `.env` file in the project root
   - Add your Spotify Client ID:
     ```
     CLIENT_ID=your_spotify_client_id
     CLIENT_SECRET=your_spotify_client_secret
     ```

3. **Install Dependencies**
   ```bash
   npm install
   ```

4. **Start the Server**
   ```bash
   node server.js
   ```

5. **Open the Application**
   - Open `index.html` in your web browser
   - Click "Login with Spotify" to begin

## Project Structure

```
spotify-recently-played/
├── index.html      # Main webpage
├── script.js       # Frontend JavaScript
├── style.css       # Styling
├── server.js       # Node.js auth server
└── .env           # Environment variables
```

## Features

- Spotify OAuth authentication
- Display recently played tracks
- Show track details including:
  - Song title
  - Artist name
  - Album artwork
  - Play time

## Starting the challenges!

Head over to [here](/CHALLENGES.md) to get started with the challenges!

## Security Note

⚠️ Never commit your `.env` file or share your Client ID publicly. These should remain private to prevent unauthorized access to your Spotify application. 