# SmartClinic Document

[**Live Website**](https://smart-clinic-challenge.vercel.app/)

## Overview

SmartClinic Document is a web application that allows users to upload CSV files containing user data and view the stored data in a table format. The application features a React frontend, an Express backend, and uses MySQL for data storage.

## Features

- **Home Page**: Starting page with no UI as of now.
- **Upload Page**: Drag-and-drop area to upload CSV files. The CSV should contain `name`, `email`, and `phones` fields. Data is uploaded to the database.
- **Users Page**: Displays a table with user data including ID, Name, Email, Phones, and Creation Date. The Phones column features a dropdown to list all phone numbers.

## Technologies

### Frontend

- **React**: Framework for building the user interface.
- **react-router**: For handling routing within the application.
- **Axios**: For making HTTP requests.
- **react-dropzone**: For implementing the drag-and-drop file upload functionality.

### Backend

- **Express**: Framework for creating the RESTful APIs.
- **Multer**: Middleware for handling file uploads.
- **dotenv**: For managing environment variables.
- **csv-parse**: For parsing CSV files.
- **@supabase/supabase-js**: For interacting with the Supabase database.
- **cors**: For enabling Cross-Origin Resource Sharing.

### Database

- **MySQL**: Database for storing the uploaded data.

## Setup

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- [MySQL](https://www.mysql.com/) for the database

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/your-username/your-repo.git
   cd your-repo
   ```

2. **Install Backend Dependencies**

   ```bash
   cd backend
   npm install
   ```

3. **Configure Backend**

   - Create a `.env` file in the `backend` directory.
   - Add your Supabase credentials and database configuration to the `.env` file.

   ```bash
   SUPABASE_URL=your-supabase-url
   SUPABASE_KEY=your-supabase-key
   MYSQL_HOST=your-database-host
   MYSQL_USER=your-database-user
   MYSQL_PASSWORD=your-database-password
   MYSQL_DATABASE=your-database-name
   ```

4. **Install Frontend Dependencies**

   ```bash
   cd ../frontend
   npm install
   ```

5. **Start the Backend Server**

   ```bash
   cd ../backend
   npm start
   ```

6. **Start the Frontend Development Server**

   ```bash
   cd ../frontend
   npm start
   ```

## Usage

- Navigate to the Home page to start.
- Go to the Upload page to drag and drop a CSV file for upload.
- Visit the Users page to view the table with the uploaded data.

## API Endpoints

### Upload CSV File

- **URL**: `/users/upload`
- **Method**: `POST`
- **Description**: Upload a CSV file containing user data.
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
