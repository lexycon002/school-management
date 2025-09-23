"use server";

import prisma from "./prisma";
import bcrypt from "bcryptjs";

import {
  CreateSubjectSchema,
  UpdateSubjectSchema,
  DeleteSubjectSchema,
  CreateClassSchema,
  UpdateClassSchema,
  DeleteClassSchema,
  CreateTeacherSchema,
  UpdateTeacherSchema,
  DeleteTeacherSchema,
  CreateStudentSchema,
  UpdateStudentSchema,
  DeleteStudentSchema,
  CreateExamSchema,
  UpdateExamSchema,
  DeleteExamSchema,
} from "./formValidationSchemas";

//
// ---------------- SUBJECT ----------------
//
export async function createSubject(data: CreateSubjectSchema) {
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
    console.error("createSubject error:", err);
    return { success: false };
  }
}

export async function updateSubject(data: UpdateSubjectSchema) {
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
    console.error("updateSubject error:", err);
    return { success: false };
  }
}

export async function deleteSubject(data: DeleteSubjectSchema) {
  try {
    await prisma.subject.delete({ where: { id: data.id } });
    return { success: true };
  } catch (err) {
    console.error("deleteSubject error:", err);
    return { success: false };
  }
}

//
// ---------------- CLASS ----------------
//
export async function createClass(data: CreateClassSchema) {
  try {
    await prisma.class.create({ data });
    return { success: true };
  } catch (err) {
    console.error("createClass error:", err);
    return { success: false };
  }
}

export async function updateClass(data: UpdateClassSchema) {
  try {
    await prisma.class.update({
      where: { id: data.id },
      data,
    });
    return { success: true };
  } catch (err) {
    console.error("updateClass error:", err);
    return { success: false };
  }
}

export async function deleteClass(data: DeleteClassSchema) {
  try {
    await prisma.class.delete({ where: { id: data.id } });
    return { success: true };
  } catch (err) {
    console.error("deleteClass error:", err);
    return { success: false };
  }
}

//
// ---------------- TEACHER ----------------
//
export async function createTeacher(data: CreateTeacherSchema) {
  try {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    await prisma.teacher.create({
      data: {
        username: data.username,
        password: hashedPassword,
        name: data.name,
        surname: data.surname,
        email: data.email?.trim() || null,
        phone: data.phone || null,
        address: data.address,
        img: data.img || null,
        bloodType: data.bloodType,
        sex: data.sex,
        birthday: data.birthday,
        role: "teacher",
        subjects: data.subjects
          ? { connect: data.subjects.map((id) => ({ id })) }
          : undefined,
      },
    });

    return { success: true };
  } catch (err) {
    console.error("createTeacher error:", err);
    return { success: false };
  }
}

export async function updateTeacher(data: UpdateTeacherSchema) {
  try {
    const updateData: any = {
      username: data.username,
      name: data.name,
      surname: data.surname,
      email: data.email?.trim() || null,
      phone: data.phone || null,
      address: data.address,
      img: data.img || null,
      bloodType: data.bloodType,
      sex: data.sex,
      birthday: data.birthday,
    };

    if (data.password && data.password.trim() !== "") {
      updateData.password = await bcrypt.hash(data.password, 10);
    }

    if (data.subjects) {
      updateData.subjects = {
        set: data.subjects.map((id) => ({ id })),
      };
    }

    await prisma.teacher.update({
      where: { id: data.id },
      data: updateData,
    });

    return { success: true };
  } catch (err) {
    console.error("updateTeacher error:", err);
    return { success: false };
  }
}

export async function deleteTeacher(data: DeleteTeacherSchema) {
  try {
    await prisma.teacher.delete({ where: { id: data.id } });
    return { success: true };
  } catch (err) {
    console.error("deleteTeacher error:", err);
    return { success: false };
  }
}

//
// ---------------- STUDENT ----------------
//
export async function createStudent(data: CreateStudentSchema) {
  try {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    await prisma.student.create({
      data: {
        username: data.username,
        password: hashedPassword,
        name: data.name,
        surname: data.surname,
        email: data.email?.trim() || null,
        phone: data.phone || null,
        address: data.address,
        img: data.img || null,
        bloodType: data.bloodType,
        sex: data.sex,
        birthday: data.birthday,
        gradeId: data.gradeId,
        classId: data.classId,
        parentId: data.parentId,
        role: "student",
      },
    });

    return { success: true };
  } catch (err) {
    console.error("createStudent error:", err);
    return { success: false };
  }
}

export async function updateStudent(data: UpdateStudentSchema) {
  try {
    const updateData: any = {
      username: data.username,
      name: data.name,
      surname: data.surname,
      email: data.email?.trim() || null,
      phone: data.phone || null,
      address: data.address,
      img: data.img || null,
      bloodType: data.bloodType,
      sex: data.sex,
      birthday: data.birthday,
      gradeId: data.gradeId,
      classId: data.classId,
      parentId: data.parentId,
    };

    if (data.password && data.password.trim() !== "") {
      updateData.password = await bcrypt.hash(data.password, 10);
    }

    await prisma.student.update({
      where: { id: data.id },
      data: updateData,
    });

    return { success: true };
  } catch (err) {
    console.error("updateStudent error:", err);
    return { success: false };
  }
}

export async function deleteStudent(data: DeleteStudentSchema) {
  try {
    await prisma.student.delete({ where: { id: data.id } });
    return { success: true };
  } catch (err) {
    console.error("deleteStudent error:", err);
    return { success: false };
  }
}

//
// ---------------- EXAM ----------------
//
export async function createExam(data: CreateExamSchema) {
  try {
    await prisma.exam.create({ data });
    return { success: true };
  } catch (err) {
    console.error("createExam error:", err);
    return { success: false };
  }
}

export async function updateExam(data: UpdateExamSchema) {
  try {
    await prisma.exam.update({
      where: { id: data.id },
      data,
    });
    return { success: true };
  } catch (err) {
    console.error("updateExam error:", err);
    return { success: false };
  }
}

export async function deleteExam(data: DeleteExamSchema) {
  try {
    await prisma.exam.delete({ where: { id: data.id } });
    return { success: true };
  } catch (err) {
    console.error("deleteExam error:", err);
    return { success: false };
  }
}
