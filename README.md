Application Link: [https://diogenispanagiotis.github.io/spotify-api/](https://diogenispanagiotis.github.io/spotify-api/)

### Documentation

I've recreated the Music Track Player utilizing the Spotify Web API with some modifications.

Design decisions: 

- Altered the three input box layout to have just one input box for searching based on the actual interface of the Spotify mobile application
- Added a select option box to determine whether the data request is for "albums", "artists", or "tracks"
- Created a select option box to determine the order of the list rendered (ascending or descending) alternatively to a "button"

### Spotify Web API Endpoint

GET https://api.spotify.com/v1/search
- type: "album", "artist", "track"
- market: "US"
- limit: 10

### Notes

- There is no popularity information provided in the Spotify API so "ascending" and "descending" is simply switching the list order
- Decided to use select option elements instead of buttons but this could be altered if preffered
- Mobile friendly using media queries
- Fetched Spotify access_token before each request as it expires quickly but possibly it might be good to fetch the access_token upon "componentDidMount"

### Questions
- Please let me know if you have any questions! I would love to discuss some of the choices / decisions created in this application.

### `yarn start`

Runs the application in development mode.<br />

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `yarn test`

Launches the test runner.

### `yarn build`

Builds the app for production into the `build` folder.<br />
