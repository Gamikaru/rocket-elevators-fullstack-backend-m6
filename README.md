# Rocket Elevators Full-Stack Application

Welcome to the Rocket Elevators full-stack application! This project is a comprehensive solution that brings together frontend development, backend API services, and database management to create a fully functional web application for a fictional elevator company, Rocket Elevators.

---

## Project Overview

This project simulates a real-world business scenario where a junior developer at Genesis Solutions contributes to a full-stack application for Rocket Elevators. It integrates various aspects of web development:

- **Frontend**: A responsive, multi-page website using HTML, CSS, and JavaScript.
- **Backend**: An Express.js API that handles business logic and data processing.
- **Database**: MongoDB for data persistence, storing information like agent details and contact messages.

---

## Backend Overview

### Getting Started

To set up the backend server, follow these steps.

### Prerequisites

- **Node.js** (version 14 or higher)
- **npm** (comes with Node.js)
- **MongoDB** (local installation or a cloud-based MongoDB Atlas instance)
- **Git** for version control

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/rocket-elevators.git
   cd rocket-elevators/backend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory and add the following:

   ```env
   PORT=3000
   MONGODB_URI=your_mongodb_connection_string
   ACCESS_TOKEN=your_access_token
   ENVIRONMENT=development
   ```

   Replace `your_mongodb_connection_string` and `your_access_token` with your actual MongoDB URI and desired access token.

4. **Start the server**

   ```bash
   npm start
   ```

   The server will start on the port specified in your `.env` file.

---

## Frontend Overview

### Website Structure

The frontend consists of multiple HTML pages, CSS stylesheets, and JavaScript files organized as follows:

- **HTML Files**:
  - `index.html`: The homepage featuring an overview of services, portfolio highlights, news, clients, and contact form.
  - `residential.html`: A dedicated page for residential services, including testimonials and an interactive agent table.
  - `commercial.html`: A dedicated page for commercial services, including slideshows and client testimonials.
  - `quote.html`: A page with a dynamic form for users to request quotes based on building types.

- **CSS Files**:
  - `assets/css/essentials.css`: Core CSS styles.
  - `assets/css/layout.css`: Layout-specific styles.
  - `assets/css/color_scheme/red.css`: Color scheme styles.
  - `assets/css/residential.css`: Styles specific to the residential services page.

- **JavaScript Files**:
  - `assets/js/scripts.js`: General scripts for interactivity and animations.
  - `assets/js/quote.js`: Handles the logic for the quote request form, including calculations and dynamic content display.
  - `assets/js/residential.js`: Fetches and displays agent information dynamically from the backend API.
  - `assets/js/validators.js`: Client-side input validation functions.

### Key Features

- **Responsive Design**: The website is mobile-friendly and adapts to different screen sizes.
- **Dynamic Content**: Certain pages fetch data from the backend API to display up-to-date information.
- **Interactive Forms**:
  - **Quote Request Form**: Calculates elevator requirements and costs based on user inputs. The logic has been moved to the backend API for better maintainability.
  - **Contact Us Form**: Submits user messages to the backend API, which stores them in MongoDB.
- **Agent Table on Residential Page**:
  - Displays agent data pulled from MongoDB.
  - Information includes full name, rating, and fee (formatted as currency).
  - Color-coded ratings: Green for 100, blue for 90+, and purple for the rest.
  - Sortable by name, rating, and fee.
  - Filterable by region using middleware validators.
- **Sliders and Animations**: Enhanced user experience with sliders, carousels, and animations.
- **Modals and Notifications**: User feedback through modals for actions like form submissions and newsletter subscriptions.

---

## API Endpoints

The backend API provides various endpoints for interacting with agent and contact data, as well as calculating elevator requirements.

### Public Routes

- **GET** `/agents`

  - **Description**: Retrieve a list of all agents.
  - **Response**: JSON array of agent objects.

- **GET** `/agents/:id`

  - **Description**: Get details of a specific agent by ID.
  - **Response**: JSON object of the agent.

- **GET** `/calc/:buildingType`

  - **Description**: Calculate elevator requirements based on building type.
  - **Path Parameters**:
    - `buildingType`: `residential`, `commercial`, or `industrial`.
  - **Query Parameters**: Vary depending on `buildingType`.
    - **Residential**: `numFloors`, `numApartments`.
    - **Commercial**: `numFloors`, `maxOccupancy`.
    - **Industrial**: `elevators`.
  - **Response**: JSON object with calculation results.

### Protected Routes

Protected routes require a valid access token in the request headers.

- **GET** `/agents-by-region`

  - **Description**: Get agents filtered by region.
  - **Query Parameters**: `region` (north, south, east, west)
  - **Response**: JSON array of agents in the specified region.

- **GET** `/all-stars`

  - **Description**: Get the top-rated agent from each region.
  - **Response**: JSON object with top agents per region.

### Admin Routes

- **GET** `/email-list`

  - **Description**: Retrieve a comma-separated list of agent emails.
  - **Response**: String of emails.

- **GET** `/region-avg`

  - **Description**: Get the average rating and fee for agents in a specified region.
  - **Query Parameters**: `region` (north, south, east, west)
  - **Response**: JSON containing `region`, `average_rating`, and `average_fee`.

### Health Routes

- **GET** `/hello`

  - **Description**: Simple health check endpoint.
  - **Response**: Standardized JSON message.

- **GET** `/status`

  - **Description**: Retrieve server status and environment information.
  - **Response**: Standardized JSON message indicating the environment and port.

- **GET** `/error`

  - **Description**: Simulate an error for testing error handling.
  - **Response**: Standardized JSON error message.

---

## Skills and Tools Demonstrated

### Programming Languages and Frameworks

- **JavaScript**: Used extensively in both frontend and backend development.
- **Node.js**: Server-side JavaScript runtime environment.
- **Express.js**: Web application framework for building APIs.

### Frontend Development

- **HTML5 and CSS3**: Structured and styled the web pages.
- **Responsive Design**: Ensured compatibility across devices using media queries and flexible layouts.
- **JavaScript and jQuery**: Added interactivity, DOM manipulation, and AJAX calls to the backend API.
- **Bootstrap**: Utilized for responsive grid system and prebuilt components.
- **LayerSlider and Revolution Slider**: Implemented sliders and carousels for enhanced user experience.
- **Client-Side Validation**: Validated user inputs on forms before submission.
- **Modals and Pop-ups**: Provided user feedback and notifications using modal dialogs.

### Backend Development

- **API Development**: Built RESTful endpoints using Express.js.
- **Middleware Implementation**:
  - **Custom Validators**: Ensured correct data is passed to endpoints, especially for filtering agents by region.
  - **Authentication**: Protected routes using token-based authentication.
  - **Error Handling Middleware**: Standardized error responses across the API.
- **Business Logic Migration**:
  - Moved calculation logic for the quote request form from the frontend to the backend for better maintainability and security.

### Database Technologies

- **MongoDB**: NoSQL database for data storage.
- **Mongoose**: Object Data Modeling (ODM) library for MongoDB.
- **Data Persistence**:
  - **Contact Messages**: Stored messages from the contact form into MongoDB.
  - **Agent Information**: Fetched and manipulated agent data from the database.

### API Development and Design

- **RESTful API Principles**: Implemented CRUD operations adhering to REST conventions.
- **HTTP Methods and Status Codes**: Used appropriate methods and codes for different operations.
- **Input Validation**: Used the `validator` library and custom middleware to ensure data integrity.

### Testing

- **Unit Testing**:
  - **Mocha**: Testing framework for writing unit tests.
  - **Chai**: Assertion library for testing.
  - **Sinon**: Used for mocking and stubbing functions during tests.
- **Test Coverage**:
  - Wrote tests for `/hello`, `/status`, and `/error` routes.
  - Ensured that utility functions and middleware are tested for consistent behavior.

### Code Organization and Modularity

- **MVC Architecture**: Separated concerns by organizing code into models, views, and controllers.
- **Reusable Components**: Created utility functions and middleware that can be reused across different parts of the application.
- **Frontend Modularity**: Structured frontend code with separate CSS and JS files for maintainability.

### Project Management and Git Workflow

- **Git Branching**:
  - Created a `dev` branch separate from `main` for development work.
  - Made multiple commits with clear messages for features and fixes.
- **Version Control**:
  - Used Git for tracking changes and collaboration.
  - Regularly pushed commits to the repository.
- **Milestone Tracking**:
  - Followed a structured plan with daily tasks and milestones.
  - Ensured deliverables were completed on time.

---

## Unit Testing and Justification

### Comparison of Testing Types

- **Unit Testing**:
  - Focuses on individual units of code (functions, methods) to ensure they work correctly in isolation.
  - Fast and specific, making it easier to identify the source of a problem.
- **Integration Testing**:
  - Tests the interaction between different units or components to ensure they work together correctly.
  - Helps identify issues with interfaces and data flow between modules.
- **Functional Testing**:
  - Validates the software against functional requirements/specifications.
  - Ensures that the system behaves as expected from an end-user perspective.

### Justification for Focusing on Unit Testing

As our codebase expands and functionality is segmented into different folders and modules, implementing unit tests becomes crucial for maintaining code quality and consistency. Unit tests allow us to:

- **Catch Bugs Early**: Identify issues at the earliest stage before they propagate.
- **Facilitate Refactoring**: Provide confidence when modifying code, ensuring existing functionality remains unaffected.
- **Improve Documentation**: Serve as additional documentation on how functions are supposed to work.
- **Enhance Collaboration**: Make it easier for multiple developers to work on the codebase without stepping on each other's toes.

By focusing on unit testing at this stage, we establish a solid foundation that makes integration and functional testing more effective later on.

---

## Contact

[Email](mailto:gavrielmrudolph@gmail.com) - [LinkedIn](https://www.linkedin.com/in/gavriel-rudolph-95a66b127/)

---


---