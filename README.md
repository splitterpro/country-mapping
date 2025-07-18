# Country Mapping Application

A React application that displays countries with their flags and regions, featuring a login page with form validation and a home page with interactive features.

## Features

### Login Page
- Clean, responsive design matching the provided mockup
- Form validation with password requirements:
  - Minimum 8 characters
  - At least 1 capital letter
  - At least 1 number
  - At least 1 symbol
- Redux state management for authentication
- Navigation to home page on successful login

### Home Page
- **Countries Display**: Lists all countries with flags and regions
- **Interactive Slider**: Features 5 countries with next/previous navigation and dots
- **Region Filtering**: Filter countries by continent/region
- **Load More Pagination**: Progressive loading of countries
- **Responsive Design**: Works on all device sizes
- **Logout Functionality**: Return to login page

### Technical Features
- **Redux Toolkit**: State management for authentication and countries data
- **React Bootstrap**: UI components and responsive design
- **TypeScript**: Type-safe development
- **SCSS**: Advanced styling with variables and mixins
- **React Router**: Navigation between pages
- **API Integration**: Fetches data from REST Countries API

## Technologies Used

- React 19.1.0
- TypeScript 4.9.5
- Redux Toolkit 2.8.2
- React Bootstrap 2.10.10
- React Router DOM 7.7.0
- SCSS for styling

## Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd country-mapping
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (not recommended)

## Project Structure

```
src/
├── components/          # Reusable components
├── pages/              # Page components
│   ├── Login/          # Login page
│   └── Home/           # Home page
├── store/              # Redux store
│   ├── slices/         # Redux slices
│   └── hooks.ts        # Typed Redux hooks
├── styles/             # SCSS styles
├── utils/              # Utility functions
└── assests/            # Static assets
```

## API Integration

The application uses the [REST Countries API](https://restcountries.com/) to fetch country data:
- Endpoint: `https://restcountries.com/v2/all?fields=name,region,flag`
- Returns: Country name, region, and flag URL

## Deployment

The application can be deployed to any static hosting service:

1. Build the production version:
```bash
npm run build
```

2. Deploy the `build` folder to your preferred hosting service (Vercel, Netlify, etc.)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.
