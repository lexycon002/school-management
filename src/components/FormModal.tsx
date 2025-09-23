"use client";
import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import {
  deleteClass,
  deleteExam,
  deleteStudent,
  deleteSubject,
  deleteTeacher,
} from "@/lib/actions";
import { FormContainerProps } from "./FormContainer";
import Table from "./Table";

const deleteActionMap = {
  subject: deleteSubject,
  class: deleteClass,
  teacher: deleteTeacher,
  student: deleteStudent,
  exam: deleteExam,
};

const TeacherForm = dynamic(() => import("./forms/TeacherForm"));
const StudentForm = dynamic(() => import("./forms/StudentForm"));
const SubjectForm = dynamic(() => import("./forms/SubjectForm"));
const ClassForm = dynamic(() => import("./forms/ClassForm"));
const ExamForm = dynamic(() => import("./forms/ExamForm"));

const forms: {
  [key: string]: (
    setOpen: Dispatch<SetStateAction<boolean>>,
    type: "create" | "update",
    data?: any,
    relatedData?: any
  ) => JSX.Element;
} = {
  subject: (setOpen, type, data, relatedData) => (
    <SubjectForm type={type} data={data} setOpen={setOpen} relatedData={relatedData} />
  ),
  class: (setOpen, type, data, relatedData) => (
    <ClassForm type={type} data={data} setOpen={setOpen} relatedData={relatedData} />
  ),
  teacher: (setOpen, type, data, relatedData) => (
    <TeacherForm type={type} data={data} setOpen={setOpen} relatedData={relatedData} />
  ),
  student: (setOpen, type, data, relatedData) => (
    <StudentForm type={type} data={data} setOpen={setOpen} relatedData={relatedData} />
  ),
  exam: (setOpen, type, data, relatedData) => (
    <ExamForm type={type} data={data} setOpen={setOpen} relatedData={relatedData} />
  ),
};

const FormModal = ({
  table,
  type,
  data,
  id,
  relatedData,
}: FormContainerProps & { relatedData?: any }) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const size = type === "create" ? "w-8 h-8" : "w-7 h-7";
  const bgColor =
    type === "create" ? "bg-myBrown" : type === "update" ? "bg-secondary" : "bg-red-500";

  const handleDelete = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!id) return;

    try {
       await deleteActionMap[Table](id);
      toast(`${table} deleted successfully!`);
      setOpen(false);
      router.refresh();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete!");
    }
  };

  const Form = () => {
    if (type === "delete" && id) {
      return (
        <form onSubmit={handleDelete} className="p-4 flex flex-col gap-4">
          <input type="hidden" name="id" value={id} />
          <span className="text-center font-medium">
            All data will be lost. Are you sure you want to delete this {table}?
          </span>
          <button className="bg-red-700 text-white py-2 px-4 rounded-md border-none w-max self-center">
            Delete
          </button>
        </form>
      );
    } else if (type === "create" || type === "update") {
      return forms[table](setOpen, type, data, relatedData);
    } else {
      return <span>Form not found!</span>;
    }
  };

  return (
    <>
      <button
        className={`${size} flex items-center justify-center rounded-full ${bgColor}`}
        onClick={() => setOpen(true)}
      >
        <Image src={`/${type}.png`} alt="" width={16} height={16} />
      </button>

      {open && (
        <div className="w-screen h-screen absolute left-0 top-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-md relative w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%]">
            <Form />
            <div
              className="absolute top-4 right-4 cursor-pointer"
              onClick={() => setOpen(false)}
            >
              <Image src="/close.png" alt="Close" width={14} height={14} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FormModal;
