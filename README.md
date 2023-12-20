# 🃏 Card Management System - ASI2

## 📝 Description

The Card Management System is our attempt to transition a web application with a monolithic backend architecture to a Service-Oriented Architecture (SOA). 
This project showcases different software architectural concepts such as MVC, SOA, and Communication Buses.
Using technologies like ActiveMQ, SpringBoot, Maven, React and JavaScript, this application offers basic user authentication, a Shop, an Inventory and the capability to buy and sell cards. It also includes an independent module in SpringBoot for updating user properties through a communication bus.

## 🛠️ Technology Stack

![JSX](https://img.shields.io/badge/Code-JSX-orange)
![React](https://img.shields.io/badge/Frontend-React-blue)
![Redux](https://img.shields.io/badge/State_Management-Redux-purple)
![SpringBoot](https://img.shields.io/badge/Backend-SpringBoot-green)
![ActiveMQ](https://img.shields.io/badge/Messaging-ActiveMQ-red)
![Maven](https://img.shields.io/badge/Build_Tool-Maven-orange)
![Vite](https://img.shields.io/badge/Build_Tool-Vite-brightgreen)

## 🌟 Features

- **🔐 User Authentication:** Enables users to securely log in and sign up.
- **💳 Card Transactions:** Allows users to buy and sell cards.
- **👥 User Interactivity:** Provides a dynamic user interface with React for an engaging experience.
- **⚙️ SOA Transition:** Showcases the transformation from a monolithic architecture to SOA.
- **📡 Communication Bus:** Utilizes ActiveMQ for efficient message handling.

## 💻 Front-End Development

- **👥 Collaborators:** [@siliataider](https://github.com/siliataider), [@Eliott-rjd](https://github.com/Eliott-rjd)
- **📋 Responsibilities:** 
  - Development of interactive UI components using React.
  - State management using Redux.
  - Integration with backend APIs for authentication, card transactions, and user management.
  - Styling with Semantic-UI + Bootstrap for a responsive and modern design.

## 💻 Back-End Development

- **👥 Collaborators:** [@merMorty](https://github.com/merMorty), [@JadGhandour](https://github.com/JadGhandour)
- **📋 Responsibilities:** 
  - Developing RESTful services for user management.
  - Integration with ActiveMQ for messaging and event handling.

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- Git
- Java (JDK 8 or later)
- Node.js and npm
- ActiveMQ
- NGINX
- An IDE of your choice (e.g., IntelliJ IDEA for Spring Boot development)

### Installation and Setup

1. **📥 Clone the Repository:**
   First, clone the project repository to your local machine:
   
  ```bash
  git clone https://github.com/siliataider/ASI-atelier1-react-node-springboot.git
  cd ASI-atelier1-react-node-springboot
  ```
2. **🔄 Start the Reverse Proxy:**
  Navigate to the directory containing the `reverse-proxy.sh` script and run it to set up NGINX as a reverse proxy:
  ```bash
  ./reverse-proxy.sh
  ```
3. **🌱 Launch the SpringBoot Application:**
  Open the backend project in your IDE and start the SpringBoot application. 
4. **🎨 Set Up and Run the Front-End Application:**
  Navigate to the front-end directory, install dependencies, and start the development server:
  ```bash
  cd front
  npm install
  npm run dev
  ```
5. **🌐 Access the Application:**
The application should now be running and accessible at [http://localhost:5173/](http://localhost:5173/).

### ActiveMQ Configuration

Ensure ActiveMQ is running and properly configured to handle messages for the application. Refer to the ActiveMQ documentation for setup instructions.

### NGINX Configuration

Make sure NGINX is configured according to the requirements of the project, especially the reverse proxy settings for routing requests to the SpringBoot application and the React front-end.

## Usage

Once the application is running, you can access the various features through the web interface, such as user authentication, card buying/selling, and viewing card details.

## Excalidraw

https://excalidraw.com/#room=b380ed1c38d8a9db8307,FWb4z9wbfXCpVy3G7QjyZA






   
