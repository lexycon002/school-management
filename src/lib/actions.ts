"use server";

import {
  ClassSchema,
  ExamSchema,
  StudentSchema,
  SubjectSchema,
  TeacherSchema,
} from "./formValidationSchemas";
import prisma from "./prisma";
import { clerkClient } from "@clerk/nextjs/server";

// ------------------------ SUBJECT ------------------------
export const createSubject = async (data: SubjectSchema) => {
  try {
    await prisma.subject.create({
      data: {
        name: data.name,
        teachers: {
          connect: data.teachers.map((id) => ({ id })),
        },
      },
    });
    return { success: true };
  } catch (err) {
    console.error(err);
    return { success: false };
  }
};

export const updateSubject = async (data: SubjectSchema & { id: number }) => {
  try {
    await prisma.subject.update({
      where: { id: data.id },
      data: {
        name: data.name,
        teachers: {
          set: data.teachers.map((id) => ({ id })),
        },
      },
    });
    return { success: true };
  } catch (err) {
    console.error(err);
    return { success: false };
  }
};

export const deleteSubject = async (id: number) => {
  try {
    await prisma.subject.delete({ where: { id } });
    return { success: true };
  } catch (err) {
    console.error(err);
    return { success: false };
  }
};

// ------------------------ CLASS ------------------------
export const createClass = async (data: ClassSchema) => {
  try {
    await prisma.class.create({ data });
    return { success: true };
  } catch (err) {
    console.error(err);
    return { success: false };
  }
};

export const updateClass = async (data: ClassSchema & { id: number }) => {
  try {
    await prisma.class.update({ where: { id: data.id }, data });
    return { success: true };
  } catch (err) {
    console.error(err);
    return { success: false };
  }
};

export const deleteClass = async (id: number) => {
  try {
    await prisma.class.delete({ where: { id } });
    return { success: true };
  } catch (err) {
    console.error(err);
    return { success: false };
  }
};

// ------------------------ TEACHER ------------------------
export const createTeacher = async (data: TeacherSchema) => {
  try {
    const user = await clerkClient.users.createUser({
      username: data.username,
      password: data.password,
      firstName: data.name,
      lastName: data.surname,
      publicMetadata: { role: "teacher" },
    });

    await prisma.teacher.create({
      data: {
        id: user.id,
        username: data.username,
        name: data.name,
        surname: data.surname,
        email: data.email || null,
        phone: data.phone || null,
        address: data.address,
        img: data.img || null,
        bloodType: data.bloodType,
        sex: data.sex,
        birthday: data.birthday,
        subjects: {
          connect: data.subjects?.map((id) => ({ id: parseInt(id) })),
        },
      },
    });
    return { success: true };
  } catch (err) {
    console.error(err);
    return { success: false };
  }
};

export const updateTeacher = async (data: TeacherSchema & { id: string }) => {
  try {
    await clerkClient.users.updateUser(data.id, {
      username: data.username,
      ...(data.password && { password: data.password }),
      firstName: data.name,
      lastName: data.surname,
    });

    await prisma.teacher.update({
      where: { id: data.id },
      data: {
        ...(data.password && { password: data.password }),
        username: data.username,
        name: data.name,
        surname: data.surname,
        email: data.email || null,
        phone: data.phone || null,
        address: data.address,
        img: data.img || null,
        bloodType: data.bloodType,
        sex: data.sex,
        birthday: data.birthday,
        subjects: {
          set: data.subjects?.map((id) => ({ id: parseInt(id) })),
        },
      },
    });

    return { success: true };
  } catch (err) {
    console.error(err);
    return { success: false };
  }
};

export const deleteTeacher = async (id: string) => {
  try {
    await clerkClient.users.deleteUser(id);
    await prisma.teacher.delete({ where: { id } });
    return { success: true };
  } catch (err) {
    console.error(err);
    return { success: false };
  }
};

// ------------------------ STUDENT ------------------------
export const createStudent = async (data: StudentSchema) => {
  try {
    const user = await clerkClient.users.createUser({
      username: data.username,
      password: data.password,
      firstName: data.name,
      lastName: data.surname,
      publicMetadata: { role: "student" },
    });

    await prisma.student.create({
      data: {
        id: user.id,
        username: data.username,
        name: data.name,
        surname: data.surname,
        email: data.email || null,
        phone: data.phone || null,
        address: data.address,
        img: data.img || null,
        bloodType: data.bloodType,
        sex: data.sex,
        birthday: data.birthday,
        gradeId: data.gradeId,
        classId: data.classId,
        parentId: data.parentId,
      },
    });

    return { success: true };
  } catch (err) {
    console.error(err);
    return { success: false };
  }
};

export const updateStudent = async (data: StudentSchema & { id: string }) => {
  try {
    await clerkClient.users.updateUser(data.id, {
      username: data.username,
      ...(data.password && { password: data.password }),
      firstName: data.name,
      lastName: data.surname,
    });

    await prisma.student.update({
      where: { id: data.id },
      data: {
        ...(data.password && { password: data.password }),
        username: data.username,
        name: data.name,
        surname: data.surname,
        email: data.email || null,
        phone: data.phone || null,
        address: data.address,
        img: data.img || null,
        bloodType: data.bloodType,
        sex: data.sex,
        birthday: data.birthday,
        gradeId: data.gradeId,
        classId: data.classId,
        parentId: data.parentId,
      },
    });

    return { success: true };
  } catch (err) {
    console.error(err);
    return { success: false };
  }
};

export const deleteStudent = async (id: string) => {
  try {
    await clerkClient.users.deleteUser(id);
    await prisma.student.delete({ where: { id } });
    return { success: true };
  } catch (err) {
    console.error(err);
    return { success: false };
  }
};

// ------------------------ EXAM ------------------------
export const createExam = async (data: ExamSchema) => {
  try {
    await prisma.exam.create({ data });
    return { success: true };
  } catch (err) {
    console.error(err);
    return { success: false };
  }
};

export const updateExam = async (data: ExamSchema & { id: number }) => {
  try {
    await prisma.exam.update({ where: { id: data.id }, data });
    return { success: true };
  } catch (err) {
    console.error(err);
    return { success: false };
  }
};

export const deleteExam = async (id: number) => {
  try {
    await prisma.exam.delete({ where: { id } });
    return { success: true };
  } catch (err) {
    console.error(err);
    return { success: false };
  }
};
