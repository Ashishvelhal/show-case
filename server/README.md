# MERN Stack Server

This is the backend server for the MERN stack application.

## Features

- RESTful API architecture
- MongoDB database integration
- Environment configuration
- Error handling middleware
- Request logging
- CORS support

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- MongoDB (local or cloud instance)

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the server root directory and add your environment variables (use `.env.example` as a reference)

### Available Scripts

- `npm start` - Start the server in production mode
- `npm run dev` - Start the server in development mode with nodemon
- `npm test` - Run tests (coming soon)
- `npm run lint` - Run ESLint

## API Endpoints

### Items

- `GET /api/items` - Get all items
- `POST /api/items` - Create a new item

## Environment Variables

Create a `.env` file in the root directory and add the following:

```
NODE_ENV=development
PORT=5000
MONGODB_URI=your_mongodb_uri
```

## Project Structure

```
server/
├── config/         # Configuration files
├── controllers/    # Route controllers
├── middlewares/    # Custom middlewares
├── models/         # Mongoose models
├── routes/         # Route definitions
└── utils/          # Utility functions
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
