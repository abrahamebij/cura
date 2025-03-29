# Cura - Hospital Management System (With AI Chatbot)

## Overview

Cura (from Latin word meaning "Care") is an innovative Hospital Management System form Stackup's March hackathon that aims to improve healthcare operations for both patients and staff.  Built for the Devpost hackathon, it allows users to manage appointments, medicines, medical data, and billing while also giving staff with a dashboard.  It leverages AI, MongoDB, and NextAuth to store data securely.

![Screenshot_20250329-201337_Chrome](https://github.com/user-attachments/assets/441760f1-6299-408c-b05d-fb2f99242d0f)


### Why Adopt Cura?

Cura improves hospital operations by consolidating data and automating activities.  It enhances the patient experience by enabling easy appointment booking, record viewing, and bill payment.  The AI-powered chatbot aids with queries, increasing worker availability and operational efficiency.

## Demo

### Link

[<https://cura-six.vercel.app>](https://cura-six.vercel.app/)

### Video

Watch Cura in action! Check out our demo video to see how patients and staff interact with the system:

[Video Demo Link Here](https://github.com/user-attachments/assets/d5126e5f-35c2-40cd-a4f1-45d94d962f26)


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

4. **Set Up Environment Variables Create a .env.local file in the root directory and add:**

    ```bash
    MONGODB_URI=your-mongodb-uri
    AUTH_SECRET=your-secret
    GEMINI_API_KEY=aistudio.google.com
    ```

5. **Run App**

    ```bash
    npm run dev
    ```
