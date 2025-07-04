# 🎵 Spotify Recently Played App Challenges 🎮

Welcome to the challenges! These tasks will help you learn more about web developments, particularly:
- Servers
- Client
- API's

Start with Level 1 and work your way up. Don't worry if you get stuck - that's part of learning!

I have thrown you in the deep here a bit (sorry, it is how I learned though!). If you get stuck remember, Google is your best friend. Or just give a developer a shout. We're all happy to help.

Although we have outlined the below challenges for you to strengthen your understanding of web dev, please feel free to reach out with better tasks / challenges you feel would be more beneficial to your time with us.🤓

## 🌟 Level 1: Getting Started (Super Easy!)

### Challenge 1: Change Text Colors
- Find the text that says "Recently Played Tracks" in index.html
- Change its color to Spotify green (#1DB954)
- Hint: Look in style.css for the color property
- What you'll learn:
  - How to change CSS colors
  - How CSS affects what you see on the page
- Useful links:
  - [CSS Colors for Beginners](https://www.w3schools.com/css/css_colors.asp)

### Challenge 2: Change the Title
- Find the `<title>` tag in index.html
- Change it to your name (e.g., "John's Music History")
- What you'll learn:
  - How HTML structure works
  - What the title tag does
- Useful links:
  - [HTML Title Tag](https://www.w3schools.com/tags/tag_title.asp)

### Challenge 3: Make Images Bigger
- Find where we set the track image size in style.css
- Try changing the numbers to make images bigger or smaller
- What you'll learn:
  - How CSS sizes work
  - How to adjust element dimensions
- Useful links:
  - [CSS Size Units](https://www.w3schools.com/css/css_units.asp)

## 🌟 Level 2: Basic Changes

### Challenge 4: Add Track Numbers
- Add numbers before each track (1., 2., 3., etc.)
- Hint: Look for where we create track elements in script.js
- What you'll learn:
  - How to work with JavaScript strings
  - How to modify HTML content
- Useful links:
  - [JavaScript Strings](https://www.w3schools.com/js/js_strings.asp)

### Challenge 5: Simple Color Coding
- Make tracks played today show up in green
- Everything else stays the normal color
- Hint: Look at the `played_at` date in the track data, you can view this by going into the 'developer tool' in your browser. Try searching: 'How to open dev tools in [your browser name]'
- What you'll learn:
  - Basic JavaScript if/else statements
  - How to work with dates
- Useful links:
  - [JavaScript if/else](https://www.w3schools.com/js/js_if_else.asp)
  - [JavaScript Dates](https://www.w3schools.com/js/js_dates.asp)

### Challenge 6: Track Counter
- Add text at the top that says "Showing X tracks"
- Replace X with the actual number of tracks
- What you'll learn:
  - How to count items in JavaScript
  - How to update page content
- Useful links:
  - [JavaScript Arrays](https://www.w3schools.com/js/js_arrays.asp)
  - [JavaScript DOM](https://www.w3schools.com/js/js_htmldom.asp)

## 🌟 Level 3: Getting Interactive

### Challenge 7: Add a "Clear All" Button
- Add a button that clears all the tracks
- When clicked, the tracks should disappear
- What you'll learn:
  - How buttons work
  - How to handle click events
- Useful links:
  - [HTML Buttons](https://www.w3schools.com/tags/tag_button.asp)
  - [JavaScript Events](https://www.w3schools.com/js/js_events.asp)

### Challenge 8: Simple Search
- Add a text box at the top
- When you type a song name, it shows only songs matching that name
- What you'll learn:
  - How to use input elements
  - Basic JavaScript filtering
- Useful links:
  - [HTML Input Types](https://www.w3schools.com/html/html_form_input_types.asp)
  - [JavaScript String Search](https://www.w3schools.com/js/js_string_search.asp)

### Challenge 9: "Play More" Button
- Add a button under each track saying "Play More"
- When clicked, open the track in Spotify
  - Look for the 'external url' in the 'Received tracks data' in the dev tools!
- Hint: Use the track's Spotify URL
- What you'll learn:
  - How to make links
  - How to open URLs
- Useful links:
  - [HTML Links](https://www.w3schools.com/html/html_links.asp)

## 🌟 Advanced Challenges
(Only try these if you're feeling confident!)

### Challenge 10: Get your currently playing track
This is stepping it up (quite a lot) but you will learn valuable and crucial parts of web development with just this task alone!

#### What We're Adding
- A new section that shows what you're playing right now
- Updates automatically when you change songs
- Shows the current song's:
  - Name
  - Artist
  - Album cover
  - Progress (how far into the song you are)

#### Step-by-Step Guide

1. **First, Add the HTML**
   - Open `index.html`
   - Add this new section above your recently played tracks:
   ```html
   <div id="now-playing" class="hidden">
     <h2>Now Playing</h2>
     <div class="current-track">
       <!-- We'll fill this with JavaScript -->
     </div>
   </div>
   ```

2. **Add Some Style**
   - Open `style.css`
   - Add these styles:
   ```css
   #now-playing {
     background: var(--spotify-grey);
     padding: 1rem;
     border-radius: 8px;
     margin-bottom: 2rem;
   }

   #now-playing.hidden {
     display: none;
   }

   .current-track {
     display: flex;
     align-items: center;
     gap: 1rem;
   }
   ```

3. **Add the JavaScript**
   - Open `script.js`
   - Add this new function:
   ```javascript
   async function getCurrentTrack(token) {
     try {
       const response = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
         headers: {
           'Authorization': `Bearer ${token}`
         }
       });

       // No song playing
       if (response.status === 204) {
         document.getElementById('now-playing').classList.add('hidden');
         return;
       }

       const data = await response.json();
       showCurrentTrack(data);
     } catch (error) {
       console.error('Error getting current track:', error);
     }
   }

   function showCurrentTrack(data) {
     const nowPlaying = document.getElementById('now-playing');
     const track = data.item;

     if (!track) {
       nowPlaying.classList.add('hidden');
       return;
     }

     nowPlaying.classList.remove('hidden');
     nowPlaying.querySelector('.current-track').innerHTML = `
       <img src="${track.album.images[0].url}" alt="${track.name}" style="width: 100px; height: 100px;">
       <div>
         <h3>${track.name}</h3>
         <p>${track.artists.map(artist => artist.name).join(', ')}</p>
       </div>
     `;
   }
   ```

4. **Call the Function**
   - Find where you load the recently played tracks
   - Add this line:
   ```javascript
   // Check current track every few seconds
   getCurrentTrack(token);
   setInterval(() => getCurrentTrack(token), 5000);
   ```

#### Understanding What's Happening

1. **The API Call**
   - We're asking Spotify "what's playing right now?"
   - The URL is: `https://api.spotify.com/v1/me/player/currently-playing`
   - We need to send our token to prove we have permission

2. **The Response**
   - Status 204 means no song is playing
   - Otherwise, we get data about the current track
   - Look in your browser's console to see what data you get!

3. **Updating the Page**
   - We check every 5 seconds (that's what setInterval does)
   - If there's a song, we show it
   - If not, we hide the section

#### Common Problems & Solutions

1. **"Authorization failed"**
   - Check your token is still valid
   - Make sure you have the right permissions (scopes)
   - Add 'user-read-currently-playing' to your scopes list

2. **Nothing shows up**
   - Play a song on Spotify first!
   - Check your console for errors
   - Make sure your HTML IDs match

3. **Old song still showing**
   - The 5-second update might be too slow
   - Try changing 5000 to a smaller number
   - But don't go too small or you'll make too many requests!

#### Make It Better!

Try these improvements:
1. Add a progress bar showing the song position
2. Show if the song is paused or playing
3. Add play/pause buttons (this needs extra permissions!)
4. Make it update faster or slower
5. Add animations when the song changes

#### Need Help?

1. Check the [Spotify API docs](https://developer.spotify.com/documentation/web-api/reference/get-the-users-currently-playing-track)
2. Use console.log() to see what data you're getting
3. Try playing different songs to test it works
4. Ask for help if you get stuck!

## 🌟 Challenge 10 Detailed Walkthrough: Time Display

### What We're Building
We want to show how long ago each track was played, like:
- "2 minutes ago"
- "5 hours ago"
- "2 days ago"

### Step-by-Step Guide

#### Step 1: Find Where to Make Changes
1. Open `script.js`
2. Look for the `displayTracks` function
3. Find where we create the track element HTML

Current code looks something like this:
```javascript
trackElement.innerHTML = `
    <img class="track-image" src="${track.album.images[0].url}" alt="${track.name}">
    <div class="track-title">${track.name}</div>
    <div class="track-artist">${track.artists.map(artist => artist.name).join(', ')}</div>
    <div class="track-time">Played: ${formatDate(playedAt)}</div>
`;
```

#### Step 2: Create a Helper Function
Add this function to your script.js:
```javascript
function getTimeAgo(date) {
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);

    // Less than a minute
    if (seconds < 60) {
        return "Just now";
    }

    // Less than an hour
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) {
        return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
    }

    // Less than a day
    const hours = Math.floor(minutes / 60);
    if (hours < 24) {
        return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    }

    // Days
    const days = Math.floor(hours / 24);
    return `${days} day${days !== 1 ? 's' : ''} ago`;
}
```

#### Step 3: Use the New Function
Change the track-time div to use our new function:
```javascript
<div class="track-time">Played: ${getTimeAgo(playedAt)}</div>
```

### Understanding the Code

#### How the Math Works
1. `now - date` gives us milliseconds between now and when the song played
2. Divide by 1000 to get seconds
3. Divide by 60 to get minutes
4. Divide by 60 again to get hours
5. Divide by 24 to get days

#### The String Parts
- We use `${}` to put numbers into our text
- We add 's' to make words plural (hour → hours)
- The `?` is like asking a question:
  - `minutes !== 1 ? 's' : ''` means:
  - "If minutes is not 1, add 's', otherwise add nothing"

### Common Mistakes to Avoid
1. Don't forget `new Date()` for the current time
2. Remember to use Math.floor() to round down numbers
3. Check that playedAt is actually a Date object

### Testing Your Changes
1. Play a song on Spotify
2. Refresh your app
3. You should see something like "2 minutes ago"
4. Wait a few minutes and refresh again
5. The time should update!

### Make It Your Own!
Try these simple modifications:
1. Change "ago" to "previously" or another word
2. Add different colors for different times
3. Add more time periods (like weeks or months)

### Need Help?
If you get stuck:
1. Check the console for errors (F12 in your browser)
2. Make sure all your brackets and quotes match
3. Try `console.log(playedAt)` to see the date
4. Ask for help - this is a tricky challenge!

### Extra Learning
Want to learn more? Check out:
- [JavaScript Dates](https://www.w3schools.com/js/js_dates.asp)
- [Template Literals](https://www.w3schools.com/js/js_string_templates.asp)
- [Math Object](https://www.w3schools.com/js/js_math.asp)

## 🔍 Helpful Resources for Beginners

- [W3Schools HTML Tutorial](https://www.w3schools.com/html/default.asp)
  - Great for absolute beginners
  - Lots of simple examples
  - Try-it-yourself editors

- [W3Schools CSS Tutorial](https://www.w3schools.com/css/default.asp)
  - Start here for styling
  - Basic concepts explained simply
  - Color and size guides

- [W3Schools JavaScript Tutorial](https://www.w3schools.com/js/default.asp)
  - Begin with basic concepts
  - Simple explanations
  - Lots of examples
