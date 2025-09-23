import { z } from "zod";


// ----------------- SUBJECT -----------------
//
export const createSubjectSchema = z.object({
  name: z.string().min(1, "Subject name is required!"),
  teachers: z.array(z.string()), // teacher ids
});

export const updateSubjectSchema = createSubjectSchema.extend({
  id: z.coerce.number().min(1, "Subject ID is required!"),
});

export const deleteSubjectSchema = z.object({
  id: z.coerce.number().min(1, "Subject ID is required!"),
});

export type CreateSubjectSchema = z.infer<typeof createSubjectSchema>;
export type UpdateSubjectSchema = z.infer<typeof updateSubjectSchema>;
export type DeleteSubjectSchema = z.infer<typeof deleteSubjectSchema>;

//
// ----------------- CLASS -----------------
//
export const createClassSchema = z.object({
  name: z.string().min(1, "Class name is required!"),
  capacity: z.coerce.number().min(1, "Capacity is required!"),
  gradeId: z.coerce.number().min(1, "Grade is required!"),
  supervisorId: z.string().optional(),
});

export const updateClassSchema = createClassSchema.extend({
  id: z.coerce.number().min(1, "Class ID is required!"),
});

export const deleteClassSchema = z.object({
  id: z.coerce.number().min(1, "Class ID is required!"),
});

export type CreateClassSchema = z.infer<typeof createClassSchema>;
export type UpdateClassSchema = z.infer<typeof updateClassSchema>;
export type DeleteClassSchema = z.infer<typeof deleteClassSchema>;

//
// ----------------- TEACHER -----------------
//
const baseTeacherSchema = z.object({
  username: z.string()
    .min(3, "Username must be at least 3 characters long!")
    .max(20, "Username must be at most 20 characters long!"),
  name: z.string().min(1, "First name is required!"),
  surname: z.string().min(1, "Last name is required!"),
  email: z.string().email().optional().or(z.literal("")),
  phone: z.string().optional(),
  address: z.string(),
  img: z.string().optional(),
  bloodType: z.string().min(1, "Blood Type is required!"),
  birthday: z.coerce.date({ message: "Birthday is required!" }),
  sex: z.enum(["MALE", "FEMALE"], { message: "Sex is required!" }),
  subjects: z.array(z.coerce.number()).optional(),
});

// Create → password required
export const createTeacherSchema = baseTeacherSchema.extend({
  password: z.string().min(8, "Password must be at least 8 characters long!"),
});

// Update → password optional
export const updateTeacherSchema = baseTeacherSchema.extend({
  id: z.string().min(1, "Teacher ID is required!"),
  password: z.union([
    z.string().min(8, "Password must be at least 8 characters long!"),
    z.literal(""),
  ]).optional(),
});

// Delete → only id
export const deleteTeacherSchema = z.object({
  id: z.string().min(1, "Teacher ID is required!"),
});

export type CreateTeacherSchema = z.infer<typeof createTeacherSchema>;
export type UpdateTeacherSchema = z.infer<typeof updateTeacherSchema>;
export type DeleteTeacherSchema = z.infer<typeof deleteTeacherSchema>;

//
// ----------------- STUDENT -----------------
//
const baseStudentSchema = z.object({
  username: z.string()
    .min(3, "Username must be at least 3 characters long!")
    .max(20, "Username must be at most 20 characters long!"),
  name: z.string().min(1, "First name is required!"),
  surname: z.string().min(1, "Last name is required!"),
  email: z.string().email().optional().or(z.literal("")),
  phone: z.string().optional(),
  address: z.string(),
  img: z.string().optional(),
  bloodType: z.string().min(1, "Blood Type is required!"),
  birthday: z.coerce.date({ message: "Birthday is required!" }),
  sex: z.enum(["MALE", "FEMALE"], { message: "Sex is required!" }),
  gradeId: z.coerce.number().min(1, "Grade is required!"),
  classId: z.coerce.number().min(1, "Class is required!"),
  parentId: z.string().min(1, "Parent Id is required!"),
});

// Create → password required
export const createStudentSchema = baseStudentSchema.extend({
  password: z.string().min(8, "Password must be at least 8 characters long!"),
});

// Update → password optional
export const updateStudentSchema = baseStudentSchema.extend({
  id: z.string().min(1, "Student ID is required!"),
  password: z.union([
    z.string().min(8, "Password must be at least 8 characters long!"),
    z.literal(""),
  ]).optional(),
});

// Delete → only id
export const deleteStudentSchema = z.object({
  id: z.string().min(1, "Student ID is required!"),
});

export type CreateStudentSchema = z.infer<typeof createStudentSchema>;
export type UpdateStudentSchema = z.infer<typeof updateStudentSchema>;
export type DeleteStudentSchema = z.infer<typeof deleteStudentSchema>;

//
// ----------------- EXAM -----------------
//
export const createExamSchema = z.object({
  title: z.string().min(1, "Title is required!"),
  startTime: z.coerce.date({ message: "Start time is required!" }),
  endTime: z.coerce.date({ message: "End time is required!" }),
  lessonId: z.coerce.number({ message: "Lesson is required!" }),
});

export const updateExamSchema = createExamSchema.extend({
  id: z.coerce.number().min(1, "Exam ID is required!"),
});

export const deleteExamSchema = z.object({
  id: z.coerce.number().min(1, "Exam ID is required!"),
});

export type CreateExamSchema = z.infer<typeof createExamSchema>;
export type UpdateExamSchema = z.infer<typeof updateExamSchema>;
export type DeleteExamSchema = z.infer<typeof deleteExamSchema>;


// ----------------- PARENT -----------------
//
const baseParentSchema = z.object({
  username: z.string()
    .min(3, "Username must be at least 3 characters long!")
    .max(20, "Username must be at most 20 characters long!"),
  name: z.string().min(1, "First name is required!"),
  surname: z.string().min(1, "Last name is required!"),
  email: z.string().email().optional().or(z.literal("")),
  phone: z.string().min(1, "Phone is required!"),
  address: z.string(),
  img: z.string().optional(),
  bloodType: z.string().min(1, "Blood Type is required!"),
  createdAt: z.coerce.date().optional(),
});

// Create → password required
export const createParentSchema = baseParentSchema.extend({
  password: z.string().min(8, "Password must be at least 8 characters long!"),
});

// Update → password optional
export const updateParentSchema = baseParentSchema.extend({
  id: z.string().min(1, "Parent ID is required!"),
  password: z.union([
    z.string().min(8, "Password must be at least 8 characters long!"),
    z.literal("")
  ]).optional(),
});

// Delete → only id
export const deleteParentSchema = z.object({
  id: z.string().min(1, "Parent ID is required!"),
});

export type CreateParentSchema = z.infer<typeof createParentSchema>;
export type UpdateParentSchema = z.infer<typeof updateParentSchema>;
export type DeleteParentSchema = z.infer<typeof deleteParentSchema>;