# React Dashboard Application

This project is a React dashboard application built with Vite, utilizing various components and Redux for state management. It provides functionalities for managing customer data with CRUD operations.

## Features

- **Dashboard Layout**: Utilizes Ant Design components for layout and styling.
- **Customer Management**: Allows adding, updating, and deleting customer records.
- **Sorting**: Supports sorting customers by ID, name, and email.
- **Modal Forms**: Modal forms for adding and updating customer information.
- **Redux Integration**: Manages state with Redux for seamless data flow.

## Prerequisites

- Node.js (version >= 12.0.0)
- npm or Yarn
- API server (if applicable)

## Getting Started

To get a local copy up and running follow these simple steps.

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/meetamjadsaeed/React-Dashboard-Application.git
   ```
2. Install npm packages
   ```sh
   npm install
   # or
   yarn install
   ```

### Usage

1. Start the development server
   ```sh
   npm run dev
   # or
   yarn dev
   ```
2. Open your browser and go to `http://localhost:3000` to see the application.

### API Configuration

If your project interacts with an API backend, configure the API endpoints in `src/services/appServices.js`.

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.
