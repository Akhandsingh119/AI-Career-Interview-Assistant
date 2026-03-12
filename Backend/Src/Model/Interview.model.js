const mongoose = require('mongoose')

const technicalQuestionSchema = new mongoose.Schema({
  technicalQuestion: {
    type: String,
    required: [true, "Technical question is required"]
  },
  intention: {
    type: String,
    required: [true, "Intention is required"]
  },
  answer: {
    type: String,
    required: [true, "Answer is required"]
  }
})

const behavioralQuestionSchema = new mongoose.Schema({
  behavioralQuestion: {
    type: String,
    required: [true, "Behavioral question is required"]
  },
  intention: {
    type: String,
    required: [true, "Intention is required"]
  },
  answer: {
    type: String,
    required: [true, "Answer is required"]
  }
})

const skillGapSchema = new mongoose.Schema({
  skill: {
    type: String,
    required: [true, "Skill is required"]
  },
  severity: {
    type: String,
    enum: ["low", "medium", "high"],
    required: [true, "Severity is required"]
  }
})

const preparationPlanSchema = new mongoose.Schema({
  day: {
    type: Number,
    required: [true, "Day is required"]
  },
  focusArea: {
    type: String,
    required: [true, "Focus area is required"]
  },
  tasks: {
    type: [String],
    required: [true, "Tasks are required"]
  }
})

const interviewReportSchema = new mongoose.Schema({
  jobDescription: {
    type: String,
    required: [true, "Job description is required"]
  },
  resume: {
    type: String
  },
  selfDescription: {
    type: String
  },
  matchScore: {
    type: Number,
    min: 0,
    max: 100
  },
  technicalQuestions:  [technicalQuestionSchema],
  behavioralQuestions: [behavioralQuestionSchema],
  skillGaps:           [skillGapSchema],
  preparationPlan:     [preparationPlanSchema],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
}, { timestamps: true })

const InterviewReport = mongoose.model("InterviewReport", interviewReportSchema)

module.exports =  InterviewReport 