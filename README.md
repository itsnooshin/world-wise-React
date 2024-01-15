# World Wise with React

Worldwise is a dynamic Single Page Application (SPA) designed for geography enthusiasts and travelers. It offers an immersive experience in exploring global cities and countries.

## Features

- Interactive Map: Users can interact with a world map to discover new locations.
- City Information: Clicking on a city reveals detailed information, enhancing users' geographical knowledge.
- User Accounts: With user login functionality, the application provides a personalized experience.
- City and Country Lists: Users can view and manage a list of cities and countries, adding to their personal collection.
- Add Cities: An innovative feature allows users to add new cities directly from the map, using an integrated form.

## Screenshots


https://github.com/itsnooshin/world-wise-React/assets/93255365/5c357e87-ab5b-4c2b-a58e-b47371699942



## Usage

Run `npm install` or `bun install` to install all needed dependencies.

```
$ npm install
```

The API is simulated by a JSON file in the data folder running on json-server. The --delay flag is set to 500 milliseconds to simulate latency so the loading components have time to render. This can be changed inside package.json.

```
$ npm run server

# on another terminal instance
$ npm run dev
```

## Built with

- state management (context API + useReducer ,memo, useMemo, useCallback)
- JavaScript / React js
- Packeges(Date Picker , leaflet , React router)
- CSS modules
- use FAKE API
- Custom hook

## License

This project is built with Jonas Schmedtmann 's Udemy course [the MIT License](https://www.udemy.com/course/the-ultimate-react-course)
