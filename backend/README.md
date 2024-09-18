# Express Backend with Supabase(SQL)

This is a simple Express.js backend application that handles CSV file uploads and stores the data in a Supabase database. It also provides an endpoint to retrieve the stored user data.

## Features

- **Upload CSV File**: Upload a CSV file with user data, which is then processed and stored in the Supabase database.
- **Retrieve Users**: Fetch all users stored in the database.

## Technologies

- **Node.js**: Runtime environment.
- **Express.js**: Web framework for Node.js.
- **Supabase**: Backend-as-a-Service for database management.
- **Multer**: Middleware for handling file uploads.
- **csv-parse**: Library for parsing CSV files.
- **CORS**: Middleware to enable Cross-Origin Resource Sharing.

## Setup

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- [Supabase](https://supabase.com/) account and database

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/your-username/your-repo.git
   cd your-repo
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Configure Supabase**

   - Create a `.env` file in the root directory of your project.
   - Add your Supabase credentials to the `.env` file:

   ```bash
   SUPABASE_URL=your-supabase-url
   SUPABASE_KEY=your-supabase-key
   ```

4. **Start the Server**

   ```bash
   npm start
   ```

   The server will start on port `3001`.

## API Endpoints

### Upload CSV File

- **URL**: `/users/upload`
- **Method**: `POST`
- **Description**: Upload a CSV file containing user data. The file should have columns for `name`, `email`, and `phones`.
- **Request**: Form-data with a file field named `file`.
- **Response**: A success message or an error message if something went wrong.

### Retrieve Users

- **URL**: `/users`
- **Method**: `GET`
- **Description**: Fetch all users stored in the database.
- **Response**: JSON object containing the list of users.

## Error Handling

- **400 Bad Request**: If no file is uploaded or the file buffer is missing.
- **500 Internal Server Error**: For any errors during file processing, CSV parsing, or database operations.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contributing

Feel free to submit issues, feature requests, or pull requests. For major changes, please open an issue first to discuss what you would like to change.

## Contact

For any questions or feedback, you can reach out to [your-email@example.com](mailto:your-email@example.com).
