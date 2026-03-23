const { GoogleGenAI } = require("@google/genai");
const { z } = require("zod");
const { zodToJsonSchema } = require("zod-to-json-schema");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

/* ---------- ZOD SCHEMA  ---------- */
const interviewReportSchema = z.object({
  matchScore: z.number().min(0).max(100)
    .describe("A score between 0 and 100 indicating how well the candidate profile matches the job requirements"),

  technicalQuestions: z.array(
    z.object({
      technicalQuestion: z.string().describe("The technical question that can be asked in the interview"),
      intention: z.string().describe("The intention of the interviewer behind asking this question"),
      answer: z.string().describe("Explanation of how the candidate should answer the question and what points to cover")
    })
  ),

  behavioralQuestions: z.array(
    z.object({
      behavioralQuestion: z.string().describe("The behavioral interview question that can be asked in the interview"),
      intention: z.string().describe("The intention of the interviewer behind asking this behavioral question"),
      answer: z.string().describe("Suggested STAR method answer explaining how the candidate should respond")
    })
  ),

  skillGaps: z.array(
    z.object({
      skill: z.string().describe("The skill that the candidate is lacking or needs improvement in"),
      severity: z.enum(["low", "medium", "high"]).describe("The severity level of the skill gap")
    })
  ),

  preparationPlan: z.array(
    z.object({
      day: z.number().describe("The day number in the preparation plan starting from 1"),
      focusArea: z.string().describe("The main focus topic for that preparation day"),
      tasks: z.array(z.string()).describe("List of tasks the candidate should complete on that day")
    })
  )
});

/* ---------- 100% WORKING VERSION ---------- */
async function generateInterviewReport(resume, selfDescription, jobDescription) {
  const prompt = `generate an interview report for a candidate based on the following json format
  
  
  sample of format is 

  {
  "matchScore": 78,

  "technicalQuestions": [
    {
      "technicalQuestion": "Explain the event loop in Node.js.",
      "intention": "To assess core Node.js knowledge.",
      "answer": "Event loop handles async operations by continuously checking call stack and callback queue."
    },
    {
      "technicalQuestion": "How does Redis caching work?",
      "intention": "Candidate mentioned Redis in resume.",
      "answer": "Redis is in-memory key-value store. I used it to reduce API response time by 40%."
    },
    {
      "technicalQuestion": "What is the difference between SQL and NoSQL?",
      "intention": "Candidate uses both MongoDB and PostgreSQL.",
      "answer": "SQL is structured with fixed schema, NoSQL is flexible. I use MongoDB for unstructured data and PostgreSQL for relational data."
    },
    {
      "technicalQuestion": "How do you secure a REST API?",
      "intention": "FinTech role requires strong security knowledge.",
      "answer": "Using JWT tokens, HTTPS, rate limiting, input validation and bcrypt for passwords."
    },
    {
      "technicalQuestion": "Explain Docker and why you use it.",
      "intention": "Job requires Docker knowledge.",
      "answer": "Docker containerizes applications ensuring same environment everywhere. I used it for consistent deployments."
    }
  ],

  "behavioralQuestions": [
    {
      "behavioralQuestion": "Tell me about a time you optimized a slow API.",
      "intention": "Assess problem solving and performance skills.",
      "answer": "S: Payment API timing out. T: Fix in 2 days. A: Found N+1 query, added Redis cache. R: Response time 2s to 200ms."
    },
    {
      "behavioralQuestion": "Describe a time you worked under pressure.",
      "intention": "Assess stress handling ability.",
      "answer": "S: Production bug at midnight. T: Fix before morning. A: Debugged logs, found issue, hotfix deployed. R: Zero downtime."
    },
    {
      "behavioralQuestion": "Tell me about a time you disagreed with your team.",
      "intention": "Assess communication and teamwork.",
      "answer": "S: Team wanted REST, I suggested GraphQL. T: Convince team. A: Made demo comparing both. R: Team agreed with data."
    },
    {
      "behavioralQuestion": "How did you handle a tight deadline?",
      "intention": "Assess time management.",
      "answer": "S: Feature needed in 3 days. T: Deliver on time. A: Broke into small tasks, focused on MVP first. R: Delivered on time."
    },
    {
      "behavioralQuestion": "Tell me about your biggest technical failure.",
      "intention": "Assess self awareness and learning.",
      "answer": "S: Pushed code without testing. T: Fix production issue. A: Hotfix deployed, added CI/CD pipeline after. R: No repeat incidents."
    }
  ],

  "skillGaps": [
    {
      "skill": "Kubernetes",
      "severity": "high"
    },
    {
      "skill": "FinTech payment systems at scale",
      "severity": "high"
    },
    {
      "skill": "GraphQL",
      "severity": "medium"
    },
    {
      "skill": "System Design for high traffic",
      "severity": "medium"
    },
    {
      "skill": "gRPC",
      "severity": "low"
    }
  ],

  "preparationPlan": [
    {
      "day": 1,
      "focusArea": "Node.js Deep Dive",
      "tasks": ["Revise event loop", "Study streams and buffers", "Practice 3 system design problems"]
    },
    {
      "day": 2,
      "focusArea": "Database Optimization",
      "tasks": ["MongoDB aggregation pipelines", "PostgreSQL indexing", "Solve 5 query problems"]
    },
    {
      "day": 3,
      "focusArea": "Redis & Caching",
      "tasks": ["Cache invalidation patterns", "Implement Redis with Node.js", "Study cache stampede"]
    },
    {
      "day": 4,
      "focusArea": "Security & Auth",
      "tasks": ["JWT best practices", "OAuth 2.0 flow", "Study FinTech security standards"]
    },
    {
      "day": 5,
      "focusArea": "Docker & DevOps",
      "tasks": ["Docker compose practice", "CI/CD pipeline setup", "AWS EC2 and S3 revision"]
    },
    {
      "day": 6,
      "focusArea": "System Design",
      "tasks": ["Design payment system", "Study microservices patterns", "Practice load balancing concepts"]
    },
    {
      "day": 7,
      "focusArea": "Mock Interview",
      "tasks": ["Solve 5 DSA problems", "Practice behavioral answers", "Review all skill gaps"]
    }
  ]
}
  
generate exactly this format for the interview report
  
  .
Candidate Resume:
${resume}

Self Description:
${selfDescription}

Job Description:
${jobDescription}`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",                   
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseJSONSchema: zodToJsonSchema(interviewReportSchema)  
    }
  });

const parsed = JSON.parse(response.text) 
return parsed

}

module.exports = generateInterviewReport;