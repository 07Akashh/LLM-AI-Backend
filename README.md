# LLM-AI-Backend

A fully functional **custom LLM AI backend** built using Node.js and Express.  
This project simulates an AI chat model named **LLM AI**, which responds to user prompts using **predefined default responses**. It is designed to mimic an AI model without relying on external APIs like Google Gemini, making it lightweight and fully self-contained.

---

## Table of Contents

- [Features](#features)  
- [Technologies Used](#technologies-used)  
- [Installation](#installation)  
- [Environment Variables](#environment-variables)  
- [Running the Server](#running-the-server)  
- [API Endpoints](#api-endpoints)  
- [Example Requests](#example-requests)  
- [Contributing](#contributing)  
- [License](#license)  

---

## Features

- Fully custom backend AI named **LLM AI**  
- Pretrained default responses stored in the backend  
- Fallback responses for unknown prompts  
- Structured JSON responses for success and error  
- Validation for required fields  
- Health check endpoint  
- Simple HTML documentation page served on `/`  
- Easy to extend with additional default responses  

---

## Technologies Used

- **Node.js** – JavaScript runtime  
- **Express.js** – Web server framework  
- **CORS** – Cross-origin requests handling  
- **dotenv** – Environment variable management  
- **axios** – For potential external API calls (optional)  
- **HTML & CSS** – Documentation served on root endpoint  

---

## Installation

1. Clone the repository:

```bash
git clone https://github.com/07Akashh/LLM-AI-Backend.git
cd LLM-AI-Backend
