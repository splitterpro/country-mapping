# Country Mapping

A modern React application for exploring countries, built with TypeScript, Redux, SCSS, and Bootstrap.

## Features
- Country list with region filtering
- Responsive, modern UI with Bootstrap and SCSS
- Image slider for featured countries
- Login page with form validation
- Loading spinner for async actions
- Clean, modular code structure

## Getting Started

### Prerequisites
- Node.js (v14 or higher recommended)
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd country-mapping
   ```
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

### Running the App
```bash
npm start
# or
yarn start
```
The app will run at [http://localhost:3000](http://localhost:3000).

### Build for Production
```bash
npm run build
# or
yarn build
```

## Project Structure
```
country-mapping/
  src/
    pages/         # Main page components (Home, Login)
    store/         # Redux store and slices
    styles/        # SCSS styles
    utils/         # Utility functions
    assests/       # Images and static assets
```

## Customization
- Update country data or API endpoint in `src/store/slices/countriesSlice.ts`.
- Adjust styles in `src/pages/Home/Home.scss` and `src/styles/login.scss`.

## License
This project is for demonstration and interview purposes.

---

