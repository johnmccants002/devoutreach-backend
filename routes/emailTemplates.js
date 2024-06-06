// routes/openai.js
const express = require("express");
const { OpenAI } = require("openai");
const router = express.Router();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
if (!OPENAI_API_KEY) {
  throw new Error(
    "The OPENAI_API_KEY environment variable is missing or empty; please provide it in your .env file."
  );
}

const obj = {
  subject:
    "Experienced Software Engineer Interested in Joining ${company.name}",
  body: "Dear Hiring Team at ${company.name},\n\nI hope this email finds you well. My name is John McCants, and I am an experienced software engineer with a strong background in mobile app development, React Native, Swift, and web development. I am reaching out to express my interest in joining Hordanso LLC as a valued team member.\n\nI believe that my skills and experience make me a great fit for your company. With a passion for creating innovative and user-friendly software solutions, I have successfully developed and launched several mobile applications that have received positive feedback from users. My proficiency in React Native and Swift allows me to create high-quality and efficient mobile apps, while my expertise in web development enables me to contribute to a wide range of projects.\n\nI am impressed by Hordanso LLC's reputation for delivering cutting-edge digital solutions, and I am excited about the opportunity to collaborate with your talented team. My hourly wage expectation is $20, and I am confident that my dedication and technical skills would make me a valuable asset to your company.\n\nPlease find my online profiles for further information:\n\nGitHub: [github.com/johnmccants002](https://github.com/johnmccants002)\nLinkedIn: [linkedin.com/johnmccants](https://linkedin.com/johnmccants)\nYouTube: [youtube.com/johnmccants](https://youtube.com/johnmccants)\n\nThank you for considering my application. I look forward to the possibility of discussing this exciting opportunity with you.\n\nBest regards,\nJohn McCants",
};

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

const generateEmailTemplate = async (user, company) => {
  const prompt = `Create a professional email template for a software engineer named ${
    user.name
  } with skills in ${user.skills.join(
    ", "
  )}. The engineer is looking for a job and wants to send this email. The engineer charges ${
    user.hourlyWage
  } per hour. Include links to ${user.links.join(", ")}.
    The JSON object being returned should follow this exact format:
    {
      "subject": "Experienced Software Engineer Interested in Joining *company*",
      "body": "Dear Hiring Team at *company*,\\n\\nI hope this email finds you well. My name is ${
        user.name
      }, and I am an experienced software engineer with a strong background in mobile app development, React Native, Swift, and web development. I am reaching out to express my interest in joining *company* as a valued team member.\\n\\nI believe that my skills and experience make me a great fit for your company. With a passion for creating innovative and user-friendly software solutions, I have successfully developed and launched several mobile applications that have received positive feedback from users. My proficiency in React Native and Swift allows me to create high-quality and efficient mobile apps, while my expertise in web development enables me to contribute to a wide range of projects.\\n\\nI am impressed by *company*'s reputation for delivering cutting-edge digital solutions, and I am excited about the opportunity to collaborate with your talented team. My hourly wage expectation is ${
    user.hourlyWage
  }, and I am confident that my dedication and technical skills would make me a valuable asset to your company.\\n\\nPlease find my online profiles for further information:\\n\\nGitHub: [github.com/johnmccants002](https://github.com/johnmccants002)\\nLinkedIn: [linkedin.com/johnmccants](https://linkedin.com/johnmccants)\\nYouTube: [youtube.com/johnmccants](https://youtube.com/johnmccants)\\n\\nThank you for considering my application. I look forward to the possibility of discussing this exciting opportunity with you.\\n\\nBest regards,\\nJohn McCants"
    }
    The *company* allows us to edit on the front end to replace with the company name. DO NOT INCLUDE THE SUBJECT INSIDE THE BODY PART OF THE OBJECT.`;

  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: prompt,
      },
    ],
    response_format: { type: "json_object" },
  });

  const responseText = completion.choices[0].message.content;

  const emailTemplate = {
    subject: `Experienced Software Engineer Interested in Joining ${company.name}`,
    body: responseText,
  };

  return emailTemplate;
};

router.post("/generate", async (req, res) => {
  const { user, company } = req.body;
  try {
    const emailTemplate = await generateEmailTemplate(user, company);
    res.json(emailTemplate);
  } catch (error) {
    console.error("Error generating email template:", error);
    res.status(500).send("Error generating email template");
  }
});

module.exports = router;
