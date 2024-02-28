# Student Registry

Student Registry is a simple 2-page site built using Next.js, featuring a search box, a button to add data, and a table displaying student information. Users can add, edit, and delete student data interactively.
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Table of Contents

- [Getting Started](#getting-started)
- [Installation](#installation)
- [Features](#features)
- [Built with Material-UI](#built-with-material-ui)
- [Folder Structure](#folder-structure)
- [Technologies](#technologies)
- [Dependencies](#dependencies)
- [Usage](#usage)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Installation

To run this project locally, you can clone the repository and follow these steps:

1. Clone the repository:

   ```bash
   git clone git@github.com:kishanpadhi291/TestDemo.git
   cd TestDemo
   npm install
   npm run dev
   ```

## Features

- Interactive search box and data table.
- Add, edit, and delete student data with ease.
- Responsive and user-friendly interface.

## Built with Material-UI

- This project exclusively utilizes [Material-UI](https://mui.com/) for building the user interface.
- Material-UI provides a set of React components that follow the Material Design guidelines, making it easy to create sleek and responsive UIs.
- By leveraging Material-UI, we ensure a consistent and visually appealing design throughout the application.

## Folder Structure

The project is organized into the following main directories:

- `app`: Contains the main components for rendering pages and the primary navigation logic.
- `components`: Reusable React components used throughout the project.
- `utils`: Global utility functions and components, such as the date picker.
- `models`: Backend models for database schema and data handling.
- `lib`: Houses slices, custom hooks, and the Redux store configuration.

## Technologies

> Frontend: Next.js
> Testing: Jest for testing

## Dependencies

- [Next.js](https://nextjs.org/) v14.1.0
- [Jest](https://jestjs.io/) v29.7.0
- [Mui](https://mui.com/material-ui/) v5.15.10

## Usage

- The main page displays a search box, an "Add Data" button, and a table of student information.
- Each row in the table has "Edit" and "Delete" buttons for interactive editing and deletion.
  ![Dashboard](https://res.cloudinary.com/ddhrf759q/image/upload/v1709132073/ss1_nm34mc.png)
- Clicking "Add Data" opens a form to add a new student.
  ![FormModal](https://res.cloudinary.com/dnvgfs5kc/image/upload/v1709119138/hjf9aauc2wtfzmntxu8x.png)
- Clicking "Edit button" opens a form to edit student data.
  ![EditFormModal](https://res.cloudinary.com/ddhrf759q/image/upload/v1709132074/ss2_u72pal.png)
- Clicking on a table row shows detailed information about that student.
  ![DetailPage](https://res.cloudinary.com/ddhrf759q/image/upload/v1709132074/ss3_vfza7k.png)
