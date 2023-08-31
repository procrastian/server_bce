// import { findAll } from '../domain/courses.js'
import { sendDataResponse } from '../utils/responses.js'

export const getAll = async (req, res) => {
  let foundCourses 
  foundCourses = await course.findAll()
  const formattedCourses = foundCourses.map((course) => {
    return {
      ...course.toJSON().course
    }
  })
  return sendDataResponse(res, 200, { courses: formattedCourses})
}