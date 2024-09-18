# React & NestJS Application

This project is a full-stack web application developed using React on the front-end and NestJS on the back-end. It is designed to simulate real-world sensor data and display the information in interactive charts using Chart.js.

## Features

- **Authentication**: Implemented JWT (JSON Web Token) for secure user authentication.
- **Real-time Data**: Simulates sensor data and displays it in dynamic charts with Chart.js.
- **Filtering**: Users can filter sensor data based on time ranges.
- **Add New Temperature**: Option to add new temperature data manually.
- **Cron Job**: Simulates data retrieval from real sensors with an automated cron job.
- **Tailwind CSS**: Used Tailwind for responsive and modern UI styling.
- **Request Throttling**: Integrated request size throttling on the backend using Thrushler for performance management.
- Covers all required and optional functionalities from the assignment description.

## Getting Started

### Running the Front-end

1. Clone the front-end repository.
2. Install the necessary dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run start
   ```

### Running the Back-end

1. Clone the back-end repository.
2. Create a .env file in the root directory and add the environment variable for the DATABAE_URL:
   ```bash
   DATABASE_URL="postgresql://postgres:password@timescaledb:5432/mydatabase?schema=public"
   ```
3. Make sure you already have Postgresql and put the the exact root password and database_name into .env file inside place holder my password and mydatabase or leave it as it is in case you want to go with Docker option
4. Install the necessary dependencies:

   ```bash
   npm install
   ```

5. Start the back-end server in development mode:

   ```bash
   npm run start:dev
   ```

### Running with Docker

This project includes Docker configuration files to simplify the setup process.

1. Build the Docker images:

   ```bash
   sudo docker-compose build
   ```

   Note: The build process may take some time initially.

2. Start the Docker containers:

   ```bash
   sudo docker-compose up
   ```

3. Run database migrations:

   ```bash
   sudo docker compose exec nest-app npm run prisma:migrate:dev
   ```

### Requirements

- **Node.js**: Ensure that your Node.js version is greater than 20.
