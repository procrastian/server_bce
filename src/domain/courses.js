import dbClient from '../utils/dbClient.js'

export async function getAllCourses() {
  return await dbClient.course.findMany()
}