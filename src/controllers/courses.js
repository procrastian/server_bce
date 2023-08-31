import { getAllCourses } from '../domain/courses.js'
import { sendDataResponse } from '../utils/responses.js'

export const getAll = async (req, res) => {
const courses = await getAllCourses()
  return sendDataResponse(res, 200, courses)
}
