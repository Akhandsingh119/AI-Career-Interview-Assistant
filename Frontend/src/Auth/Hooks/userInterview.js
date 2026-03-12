import { generateInterviewReport, getAllInterviewsReportbyID, getAllInterviewReport } from "../Service/interview.api"
import { useContext } from "react"
import { InterviewContext } from "../context/InterviewContext.jsx"

export const useInterview = () => {

  const context = useContext(InterviewContext)

  const { loading, setLoading, report, setReport, reports, setReports } = context


  const generateReport = async ({ jobDescription, resume, selfDescription }) => {
    setLoading(true)
    let response=null
    try {
       response = await generateInterviewReport({
        jobDescription,
        resume,
        selfDescription
      })

      setReport(response.data)

    } catch (error) {
      console.log(error)

    } finally {
      setLoading(false)
    }
     
    console.log(response)
     
    return response.data

  }


  const getAllReportsbyID = async (ID) => {
    setLoading(true)
     let response=null
    try {
       response = await getAllInterviewsReportbyID(ID)
      const Datas = response.data
      
       setReport(Datas)


    } catch (error) {
      console.log(error)

    } finally {
      setLoading(false)
    }

    
    return response.data
  }


  const getReports = async () => {
    setLoading(true)
       let response=null
    try {
      response = await getAllInterviewReport()
      setReports(response.data)

    } catch (error) {
      console.log(error)

    } finally {
      setLoading(false)
    }


        return response.data
  }


  return {
    report,
    reports,
    loading,
    generateReport,
getAllReportsbyID,
getReports
  }
}
   