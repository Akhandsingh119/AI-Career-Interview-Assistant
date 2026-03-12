const pdfParse = require("pdf-parse")
const interviewReportGenerator = require("../Service/Ai.service")
const InterviewModel = require("../Model/Interview.model")




async function getAllInterviews(req,res){

  const interviews = await InterviewModel
    .find({
      user: req.user.id
    })
    .sort({ createdAt: -1 })
    .select("-resume -selfDescription -jobDescription")

  res.status(200).json({
    message: "Interviews fetched successfully",
    data: interviews
  })



}



async function GenerateInterViewReportController(req, res) {
  const { interviewId } = req.params

  const interviewReport = await InterviewModel.findOne({
    _id: interviewId,
    user: req.user.id
  })

  if (!interviewReport) {
    return res.status(404).json({
      message: "Interview report not found"
    })
  }

  res.status(200).json({
    message: "Interview report fetched successfully",
    data: interviewReport
  })
}










async function Interviews(req, res) {

  try {
    
const resumeData = await (
  new pdfParse.PDFParse(Uint8Array.from(req.file.buffer))
).getText()
    

    const { jobDescription, selfDescription } = req.body


 

    const interviewReport = await interviewReportGenerator({
      resume: resumeData.text,
      selfDescription,
      jobDescription
    })

  

    const savedReport = await InterviewModel.create({
       user:req.user._id,
      resume: resumeData.text,
      selfDescription,
      jobDescription,
      ...interviewReport
    })

     
    const savesReportesponse = await InterviewModel.findById(savedReport._id).select("-resume -selfDescription -jobDescription -_v")  


    res.status(201).json({
      message: "Interview report generated successfully",
      data: savesReportesponse
    })

  } catch (error) {

    console.error( error.message)

    res.status(500).json({
      message: error.message
    })


  }

}

module.exports = {Interviews,GenerateInterViewReportController,getAllInterviews}