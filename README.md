# 🃏 Card Game

## 📝 Description

G5 Card Game is a robust web application showcasing a seamless integration of a card game with real-time chat capabilities. This project, an evolution of the [Card Management System](https://github.com/siliataider/ASI-atelier1-react-node-springboot), now features an interactive gaming arena and a live chat module, providing a more engaging user experience. It demonstrates advanced software architectural concepts such as real-time communication, SOA, and event-driven architecture, leveraging technologies like Socket.IO, React, Redux, and Node.js.

## 🛠️ Technology Stack

![React](https://img.shields.io/badge/Frontend-React-blue)
![Node.js](https://img.shields.io/badge/Backend-Node.js-green)
![Socket.IO](https://img.shields.io/badge/Real_Time-Socket.IO-red)
![JSX](https://img.shields.io/badge/Code-JSX-orange)
![Redux](https://img.shields.io/badge/State_Management-Redux-purple)
![SpringBoot](https://img.shields.io/badge/Backend-SpringBoot-green)
![ActiveMQ](https://img.shields.io/badge/Messaging-ActiveMQ-red)
![Maven](https://img.shields.io/badge/Build_Tool-Maven-orange)
![Vite](https://img.shields.io/badge/Build_Tool-Vite-brightgreen)


## 🌟 Features

- **🔐 User Authentication:** Enables users to securely log in and sign up.
- **💬 Real-Time Chat:** Enables users to chat live with other players.
- **🎮 Interactive Gaming Arena:** Provides a dynamic card game experience.
- **⚙️ Event-Driven Architecture:** Utilizes Socket.IO for real-time communication.
- **💳 Card Transactions:** Allows users to buy and sell cards.
- **👥 User Interactivity:** Provides a dynamic user interface with React for an engaging experience.
- **📡 Communication Bus:** Utilizes ActiveMQ for efficient message handling.


## 💻 Front-End Development

- **👥 Collaborators:** [@siliataider](https://github.com/siliataider), [@Eliott-rjd](https://github.com/Eliott-rjd), [@merMorty](https://github.com/merMorty), [@JadGhandour](https://github.com/JadGhandour)
- **📋 Responsibilities:** 
  - Development of interactive UI components using React.
  - - Implementing real-time chat and game features using Socket.IO.
  - State management using Redux.
  - Integration with backend APIs for authentication, card transactions, and game management.
  - Styling with Semantic-UI + Bootstrap for a responsive and modern design.
 
## 💻 Back-End Development

- **👥 Collaborators:** [@merMorty](https://github.com/merMorty), [@siliataider](https://github.com/siliataider), [@Eliott-rjd](https://github.com/Eliott-rjd), [@JadGhandour](https://github.com/JadGhandour)
- **📋 Responsibilities:**  
  - Building RESTful services and real-time communication with Node.js and Socket.IO.
  - Implementing game logic and user management.
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
  Navigate to the directory containing the `launcher.sh` script and run it to set up NGINX as a reverse proxy, to launch the node backend, the react front end, and the activemq container:
  ```bash
  bash ./launcher.sh
  ```
3. **🌱 Launch the SpringBoot Application:**
  Open the backend project in your IDE and start the SpringBoot application. 

5. **🌐 Access the Application:**
The application should now be running and accessible at [http://localhost:5173/](http://localhost:80/).

### ActiveMQ Configuration

Ensure ActiveMQ is running and properly configured to handle messages for the application. Refer to the ActiveMQ documentation for setup instructions.

### NGINX Configuration

Make sure NGINX is configured according to the requirements of the project, especially the reverse proxy settings for routing requests to the SpringBoot application and the React front-end.

## Usage

Once the application is running, you can access the various features through the web interface, such as user authentication, card buying/selling, starting a game, picking your opponent, selecting the cards you want to play with, chatting and attacking your opponent, etc.

## Excalidraw

https://excalidraw.com/#room=b380ed1c38d8a9db8307,FWb4z9wbfXCpVy3G7QjyZA

![alt text](https://drive.google.com/uc?id=1xD3KpNjewd_z5TxSd9N5IIx5KWDjg-qd)






   
