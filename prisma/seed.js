import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();

async function seed() {
  const directory = await createDirectory();

  const user = await createUser("user@test.com", "Testpassword1!");

  await createCourse(
    "1-1 Mindfulness, meditation and Yoga Practice for young people",
    "Learn techniques on how to calm the mind, and build inner peace and confidence",
    4,
    "01/09/2023",
    "https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    ["Mindfullness", "Meditation", "YogaPractice"]
  );
  await createCourse(
    "3-5 years - Group Mindfulness, meditation and Yoga Practice for young people",
    "Learn techniques on how to calm the mind, and build inner peace and confidence",
    4,
    "01/09/2023",
    "https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    ["Mindfullness", "Meditation", "YogaPractice", "UnderFive"]
  );
  await createCourse(
    "5-8 years - Group Mindfulness, meditation and Yoga Practice for young people",
    "Learn techniques on how to calm the mind, and build inner peace and confidence",
    4,
    "01/09/2023",
    "https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    ["Mindfullness", "Meditation", "YogaPractice", "PrimaryAge"]
  );
  await createCourse(
    "8-13 years - Group Mindfulness, meditation and Yoga Practice for young people",
    "Learn techniques on how to calm the mind, and build inner peace and confidence",
    4,
    "01/09/2023",
    "https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    ["Mindfullness", "Meditation", "YogaPractice", "SecondaryAge"]
  );
  await createCourse(
    "Parent and Baby Nature Sensory class",
    "Immerse you and your baby in nature. Enjoy freshly made herbal tea, parent support and a nature based baby sensory opportunity for your little one. (For pre walkers)",
    4,
    "01/09/2023",
    "https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    ["UnderFive"]
  );
  await createCourse(
    "1-1 Tutoring KS1 to KS5",
    "Sign up for a consultation to understand your child's needs and then receive a bespoke tutoring plan. Available for KS1 to KS5 students, students with EHCPs, home educated students and students out of school receiving funding for tutoring.Available online and in person at Base Camp Education, and also in schools/setting of your choice.",
    4,
    "01/09/2023",
    "https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    ["PrimaryAge", "SecondaryAge"]
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
