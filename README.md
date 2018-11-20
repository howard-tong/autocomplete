# Autocomplete
A simple autocomplete for cities and books given a static dataset

## How to run

```
npm install
npm start
```

## Libraries used
```
facebook/create-react-app
React
Redux
ESLint (Airbnb)
prop-types
```
Check package.json for details.

## Design Challenges
The main challenge of this project was figuring out how to handle the two different data formats. The cleanest way I could think of to make the components reusable was to make a higher-order component that wraps the `Autocomplete` component.
