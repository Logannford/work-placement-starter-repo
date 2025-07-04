// DOM Elements
const loginButton = document.getElementById('login');
const tracksContainer = document.getElementById('tracks');
const userProfile = document.getElementById('user-profile');
const profileImage = document.getElementById('profile-image');
const profileName = document.getElementById('profile-name');

// Event Listeners
loginButton.addEventListener('click', () => {
    window.location.href = '/login';
});

// Check for access token or error in URL parameters
window.addEventListener('load', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get('access_token');
    const error = urlParams.get('error');

    console.log('URL Parameters:', { accessToken: accessToken ? 'present' : 'not present', error });

    if (error) {
        console.error('Authentication error:', error);
        alert('Authentication error: ' + error);
        return;
    }

    if (accessToken) {
        console.log('Access token received, initializing app...');
        // Save token and load data
        localStorage.setItem('spotify_token', accessToken);
        // Clean up URL
        window.history.replaceState({}, document.title, '/');
        // Hide login button and load data
        loginButton.style.display = 'none';
        initializeApp(accessToken);
    } else {
        // Check if we have a token in localStorage
        const storedToken = localStorage.getItem('spotify_token');
        if (storedToken) {
            console.log('Found stored token, initializing app...');
            loginButton.style.display = 'none';
            initializeApp(storedToken);
        } else {
            console.log('No token found, showing login button');
            loginButton.style.display = 'block';
        }
    }
});

// Initialize app with token
async function initializeApp(token) {
    try {
        console.log('Loading user profile...');
        await loadUserProfile(token);
        console.log('Loading recently played tracks...');
        await loadRecentlyPlayed(token);
    } catch (error) {
        console.error('Error initializing app:', error);
        handleAuthError(error);
    }
}

// Load user profile
async function loadUserProfile(token) {
    try {
        console.log('Fetching user profile...');
        const response = await fetch('https://api.spotify.com/v1/me', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            console.error('Profile API Error:', errorData);
            throw new Error(`Failed to fetch profile: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log('Profile data received:', data);
        
        // Update profile section
        userProfile.classList.remove('hidden');
        profileImage.src = data.images[0]?.url || 'https://via.placeholder.com/150';
        profileName.textContent = data.display_name;
    } catch (error) {
        console.error('Error loading profile:', error);
        throw error; // Propagate error to initializeApp
    }
}

// Load recently played tracks
async function loadRecentlyPlayed(token) {
    try {
        console.log('Fetching recently played tracks...');
        const response = await fetch('https://api.spotify.com/v1/me/player/recently-played?limit=20', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            console.error('Recently Played API Error:', errorData);
            throw new Error(`Failed to fetch tracks: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log('Received tracks data:', data);
        
        if (!data.items || !data.items.length) {
            tracksContainer.innerHTML = '<p>No recently played tracks found.</p>';
            return;
        }
        
        displayTracks(data.items);
    } catch (error) {
        console.error('Error loading tracks:', error);
        throw error; // Propagate error to initializeApp
    }
}

// Handle authentication errors
function handleAuthError(error) {
    console.error('Authentication error occurred:', error);
    // Clear stored token if it's invalid
    localStorage.removeItem('spotify_token');
    // Show login button again
    loginButton.style.display = 'block';
    // Show error message to user
    alert('Authentication failed. Please try logging in again.');
}

// Display tracks in the UI
function displayTracks(tracks) {
    console.log('Displaying tracks:', tracks.length);
    tracksContainer.innerHTML = '';
    
    tracks.forEach(item => {
        const track = item.track;
        const playedAt = new Date(item.played_at);
        
        const trackElement = document.createElement('div');
        trackElement.className = 'track-card';
        trackElement.innerHTML = `
            <img class="track-image" src="${track.album.images[0].url}" alt="${track.name}">
            <div class="track-title">${track.name}</div>
            <div class="track-artist">${track.artists.map(artist => artist.name).join(', ')}</div>
            <div class="track-time">Played: ${formatDate(playedAt)}</div>
        `;
        
        tracksContainer.appendChild(trackElement);
    });
}

// Format date helper
function formatDate(date) {
    const now = new Date();
    const diff = now - date;
    
    // Less than 24 hours ago
    if (diff < 24 * 60 * 60 * 1000) {
        const hours = Math.floor(diff / (60 * 60 * 1000));
        if (hours === 0) {
            const minutes = Math.floor(diff / (60 * 1000));
            return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
        }
        return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    }
    
    // More than 24 hours ago
    return date.toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
} 