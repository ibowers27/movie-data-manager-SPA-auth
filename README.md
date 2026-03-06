# Golden Reel (movie manager)

###
Teammates: Ivy Bowers, Thien Ong, Angelo Morelli

This website is a personal movie manager built with Vite, React, React Router, and Firebase Authentication. The app features utility-first styling using TailwindCSS and DaisyUI with a complete role-based routing system for authenticated and guest users.

## Live Link:
https://movieweek5ncf.web.app 


### Routing:
- **MainRoute.jsx**: Central router config that defines all app routes
  - `/ (Home)`: Guest landing page with site preview and limited filtering
  - `/dashboard`: Full movie management interface (req. auth)
  - `/unauthorized`: 401 error page for unauthed access attempts
  - `*`: 404 for undefined routes
- **PrivateRoute.jsx**: Component protecting authenticated routes using Firebase auth state

### Authentication:
- Authentication using Firebase
- Email/password registration and login
- Google OAuth popup login via Firebase
- Real-time auth state syncing across all components using `onAuthStateChanged()`
- **Authenticator.jsx**: Firebase-integrated auth UI that syncs with live auth state; displays logout button when user is authenticated

### Major Sections in the page:
- Component-based implementation (authenticator, body, displaymanager, export, filterbar, footer, header, moviecard, movielist, navbar) to keep App.jsx as clean as possible.
- Utilized map() and filter() for displaying the page and items and for filtering/sorting items from arrays.
- Utilized React hooks (useEffect, useState). Created FetchMovies.js, MovieFilters.js, MovieInteractions.js as custom hooks.
- DaisyUI header/navbar w/ liked and watchlisted movies, and login button.
- DaisyUI authenticator: google, username, password. Uses useEffect hook for user input.
- DaisyUI footer with social media links.
- "Export as CSV" button under Likes and Watchlist dropdowns.
- DaisyUI loader on button when exporting as CSV.
- Conditional Audio: likes, dislikes, some login functions.

### Functions of the movie manager:
- Fetch movie.json and display as cards with information contained modularly.
- Each card has the ability to like, dislike, and add to watchlist (heart).
- Navigate the website with a header with our logo icon, a DaisyUI navbar with liked and watchlisted movies, and login.
- Users can find movies by filtering and sorting. Filter by categories like genre, age group, and year released. Sort by newest/oldest release, highest/lowest IMDb rating, and longest/shortest runtime.
- Users can download the list of their watchlisted OR liked movies in CSV format.
- React-Toastify and React-Icons are used to make the app look more interesting and to display notification messages as when an item is added to watchlist & if filters return no result.
- Get more information and social media links from our DaisyUI footer.

# mini-project04-movie-data-manager
