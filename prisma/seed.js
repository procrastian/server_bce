import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();

async function seed() {
  const directory = await createDirectory();

  const user = await createUser("user@test.com", "Testpassword1!");

  const course = await createCourse(
    "testCourse",
    "This is a test course description",
    4,
    "01/09/2023",
    "https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    ["Meditation"]
  );

  process.exit(0);
}

async function createDirectory() {
  const directory = await prisma.directory.create({
    data: {},
    include: {
      courses: true,
    },
  });
  console.info("Directory created", directory);
  return directory;
}

async function createUser(email, password) {
  const user = await prisma.user.create({
    data: {
      email,
      password: await bcrypt.hash(password, 12),
    },
    include: {
      courses: true,
    },
  });
  console.info("User created", user);
  return user;
}

async function createCourse(
  title,
  description,
  length,
  startDate,
  coverImage,
  tags
) {
  const course = await prisma.course.create({
    data: {
      title,
      description,
      length,
      startDate,
      coverImage,
      tags,
    },
    include: {
      users: true,
      directories: true,
    },
  });
  console.info("Course created", course);
  return course;
}

seed().catch(async (e) => {
  console.error(e);
  await prisma.$disconnect();
  process.exit(1);
});
