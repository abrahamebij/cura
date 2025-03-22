# Cura - Hospital Management System

## Overview

Cura is an innovative Hospital Management System that aims to improve healthcare operations for both patients and staff.  Built for the Devpost hackathon, it allows users to manage appointments, medicines, medical data, and billing while also giving staff with a dashboard.  It leverages AI, MongoDB, and NextAuth to store data securely.

### Why Adopt Cura?

Cura improves hospital operations by consolidating data and automating activities.  It enhances the patient experience by enabling easy appointment booking, record viewing, and bill payment.  The AI-powered chatbot aids with queries, increasing worker availability and operational efficiency.

## Demo Video

Watch Cura in action! Check out our demo video to see how patients and staff interact with the system:

[Insert Video Demo Link Here]

## Installation and Setup

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- Vercel account (for deployment)
- Gemini API key (for AI features)

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/abrahamebij/cura.git
    ```

2. **Navigate to Folder**  

   ```bash
   cd cura
    ```

3. **Install Dependencies**

   ```bash
   npm install
    ```

4. **Set Up Environment Variables Create a `.env.local` file in the root directory and add:**

    ```bash
    MONGODB_URI=your-mongodb-uri
    AUTH_SECRET=your-secret
    ```

4. **Run App**

    ```bash
    npm run dev
    ```
