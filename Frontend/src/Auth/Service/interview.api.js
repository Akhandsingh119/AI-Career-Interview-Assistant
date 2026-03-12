import axios from "axios"

const api = axios.create({
    baseURL: "http://localhost:3000/api/Interview/",
    withCredentials: true,
})


export const generateInterviewReport = async ({
    jobDescription,
    resume, selfDescription }
) => {
    const formData = new FormData()
    formData.append("jobDescription", jobDescription)
    formData.append("resume", resume)
    formData.append("selfDescription", selfDescription)

    const response = await api.post("http://localhost:3000/api/Interview/", formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })

    return response.data
}

export const getAllInterviewsReportbyID = async (ID) => {
    const response = await api.get(`http://localhost:3000/api/Interview/${ID}`)
    return response.data
}


export const getAllInterviewReport = async () => {
    const response = await api.get("http://localhost:3000/api/Interview/")
    return response.data
}


