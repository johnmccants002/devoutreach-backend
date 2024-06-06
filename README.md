# Developer Outreach Backend

This repository contains the backend for the Dev Outreach application. The backend is built with Express.js and serves as an API to fetch company information from SerpApi and generate personalized email templates using OpenAI.

## Purpose

The purpose of this backend is to provide endpoints for fetching company data and generating email templates, facilitating communication between the frontend application and external APIs.

## Features

- Fetches company information using SerpApi.
- Generates personalized email templates using OpenAI.
- Provides API endpoints for the frontend application to interact with.

## Upcoming Features

- **Authentication Login**: Implement user authentication to manage personal templates and settings.
- **Edit Email Generation Prompt**: Allow users to customize the prompt used to generate email templates.
- **Scrape Contact Emails**: Extract contact emails from company websites.
- **Save and Paginate Templates**: Save generated templates and enable pagination through saved templates.
- **Create Connection to MongoDB**: Set up user information, save templates, save leads

## Installation

To run this project locally, follow these steps:

1. Clone the repository:

   ```sh
   git clone https://github.com/johnmccants002/devoutreach-backend.git
   cd devoutreach-backend

   ```

2. Install the dependencies:

```
npm install
```

3. Create a `.env` file in the root directory and add your environment variables:

```env
OPENAI_API_KEY=your_openai_api_key
SERP_API_KEY=your_serpapi_api_key
```

4. Start the application:

```
npm start
```

## Usage

The backend provides the following endpoints:

Fetch Company Information
GET /api/search

Fetches company information from SerpApi.

Example Request

```sh
GET /api/search?query=Mobile+App+Development+Texas

```

Example Response

```json
[
  {
    "position": 1,
    "title": "Hordanso LLC",
    "address": "4364 Western Center Blvd #2012, Fort Worth, TX 76137",
    "hours": "Closes soon ⋅ 6 PM ⋅ Opens 9 AM Thu",
    "phone": "(469) 425-8221",
    "website": "https://www.hordanso.com/",
    "thumbnail": "https://lh5.googleusercontent.com/p/AF1QipMXH41MOrwwtN09SgE-tn9oKx-2h16EqjFRvovp=w92-h92-k-no"
    ...
  },

]
```

### Generate Email Template

POST /api/generate-email

Generates a personalized email template using OpenAI.

Example Request

```sh
POST /api/generate
Content-Type: application/json

{
  "user": {
    "name": "John McCants",
    "skills": ["Mobile app development", "React Native", "Swift", "Web Development"],
    "hourlyWage": "$20",
    "links": ["github.com/johnmccants002", "linkedin.com/johnmccants", "youtube.com/johnmccants"]
  },
  "company": {
    "title": "Hordanso LLC"
  }
}
```

Example Response

```json
{
  "subject": "Experienced Software Engineer Interested in Joining Hordanso LLC",
  "body": "Dear Hiring Team at Hordanso LLC,\n\nI hope this email finds you well. My name is John McCants, and I am an experienced software engineer with a strong background in mobile app development, React Native, Swift, and web development. I am reaching out to express my interest in joining Hordanso LLC as a valued team member.\n\nI believe that my skills and experience make me a great fit for your company. With a passion for creating innovative and user-friendly software solutions, I have successfully developed and launched several mobile applications that have received positive feedback from users. My proficiency in React Native and Swift allows me to create high-quality and efficient mobile apps, while my expertise in web development enables me to contribute to a wide range of projects.\n\nI am impressed by Hordanso LLC's reputation for delivering cutting-edge digital solutions, and I am excited about the opportunity to collaborate with your talented team. My hourly wage expectation is $20, and I am confident that my dedication and technical skills would make me a valuable asset to your company.\n\nPlease find my online profiles for further information:\n\nGitHub: [github.com/johnmccants002](https://github.com/johnmccants002)\nLinkedIn: [linkedin.com/johnmccants](https://linkedin.com/johnmccants)\nYouTube: [youtube.com/johnmccants](https://youtube.com/johnmccants)\n\nThank you for considering my application. I look forward to the possibility of discussing this exciting opportunity with you.\n\nBest regards,\nJohn McCants"
}
```

## Project Structure

- `bin/`: Contains the executable script for starting the server.
  - `www`: Entry point to start the Express server.
- `node_modules/`: Contains all the npm dependencies.
- `public/`: Contains static assets and files.
- `routes/`: Contains the Express routes for handling API requests.
  - `emailTemplates.js`: Handles requests related to email template generation.
  - `index.js`: Main router file.
  - `serpApi.js`: Handles requests to SerpApi.
  - `users.js`: Handles user-related requests.
- `views/`: Contains view templates (if any).
- `.env`: Environment variables configuration file.
- `.gitignore`: Specifies files and directories to be ignored by Git.
- `app.js`: Main application setup and middleware configuration.
- `package-lock.json`: Describes the exact tree that was generated, so identical trees can be regenerated.
- `package.json`: Contains metadata about the project and dependencies.
- `README.md`: Project documentation and instructions.

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch:

   ```sh
   git checkout -b feature-name
   ```

3. Make your changes and commit them:

   ```sh
   git commit -m 'Add new feature'
   ```

4. Push to the branch:

   ```sh
   git push origin feature-name
   ```

5. Create a pull request.

## Contact

For any questions or suggestions, feel free to reach out to the project maintainer:

GitHub: johnmccants002

Email: johnmccants002@gmail.com
