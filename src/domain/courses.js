export async function findAll() {
  return Course._findMany()
}