"use client";

import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldError, useForm } from "react-hook-form";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { CldUploadWidget } from "next-cloudinary";

import {
  createStudentSchema,
  updateStudentSchema,
  CreateStudentSchema,
  UpdateStudentSchema,
} from "@/lib/formValidationSchemas";
import { createStudent, updateStudent } from "@/lib/actions";
import InputField from "../InputField";

type StudentFormProps = {
  type: "create" | "update";
  data?: any;
  setOpen: Dispatch<SetStateAction<boolean>>;
  relatedData?: { grades: any[]; classes: any[] };
};

const StudentForm = ({ type, data, setOpen, relatedData }: StudentFormProps) => {
  const router = useRouter();
  const [img, setImg] = useState<any>();

  // Pick schema and type
  const schema = type === "create" ? createStudentSchema : updateStudentSchema;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>({
    resolver: zodResolver(schema),
    defaultValues: {
      ...data,
      birthday: data?.birthday
        ? new Date(data.birthday).toISOString().split("T")[0]
        : undefined,
    },
  });

  // Action function based on type
  const actionFn = type === "create" ? createStudent : updateStudent;

  // State for error/success
  const [state, setState] = useState<{ success: boolean; error?: boolean }>({ success: false });

  // Handle submit
  const onSubmit = handleSubmit(async (formData) => {
    const result = await actionFn({
      ...formData,
      img: img?.secure_url,
    });
    if (result?.success) {
      setState({ success: true });
    } else {
      setState({ success: false, error: true });
    }
  });

  // ✅ toast + close modal on success
  useEffect(() => {
    if (state.success) {
      toast(`Student has been ${type === "create" ? "created" : "updated"}!`);
      setOpen(false);
      router.refresh();
    }
  }, [state.success, type, setOpen, router]);

  const { grades = [], classes = [] } = relatedData || {};

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">
        {type === "create" ? "Create a new student" : "Update the student"}
      </h1>

      {/* --- AUTH INFO --- */}
      <span className="text-xs text-gray-400 font-medium">
        Authentication Information
      </span>
      <div className="flex justify-between flex-wrap gap-4">
  <InputField label="Username" name="username" register={register} error={errors.username as FieldError} />
  <InputField label="Email" name="email" register={register} error={errors.email as FieldError} />
  <InputField label="Password" name="password" type="password" register={register} error={errors.password as FieldError} />
      </div>

      {/* --- PERSONAL INFO --- */}
      <span className="text-xs text-gray-400 font-medium">
        Personal Information
      </span>

      <CldUploadWidget
        uploadPreset="school"
        onSuccess={(result, { widget }) => {
          setImg(result.info);
          widget.close();
        }}
      >
        {({ open }) => (
          <div
            className="text-xs text-gray-500 flex items-center gap-2 cursor-pointer"
            onClick={() => open()}
          >
            <Image src="/upload.png" alt="" width={28} height={28} />
            <span>Upload a photo</span>
          </div>
        )}
      </CldUploadWidget>

      <div className="flex justify-between flex-wrap gap-4">
  <InputField label="First Name" name="name" register={register} error={errors.name as FieldError} />
  <InputField label="Last Name" name="surname" register={register} error={errors.surname as FieldError} />
  <InputField label="Phone" name="phone" register={register} error={errors.phone as FieldError} />
  <InputField label="Address" name="address" register={register} error={errors.address as FieldError} />
  <InputField label="Blood Type" name="bloodType" register={register} error={errors.bloodType as FieldError} />
  <InputField label="Birthday" name="birthday" register={register} error={errors.birthday as FieldError} type="date" />
  <InputField label="Parent Id" name="parentId" register={register} error={errors.parentId as FieldError} />

        {/* hidden ID for update */}
        {type === "update" && data?.id && (
          <InputField label="ID" name="id" register={register} type="hidden" />
        )}

        {/* SEX */}
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Sex</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("sex")}
            defaultValue={data?.sex}
          >
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
          </select>
          {errors.sex?.message && (
            <p className="text-xs text-red-400">{errors.sex.message.toString()}</p>
          )}
        </div>

        {/* GRADE */}
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Grade</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("gradeId")}
            defaultValue={data?.gradeId}
          >
            {grades.map((grade: { id: number; level: number }) => (
              <option value={grade.id} key={grade.id}>
                {grade.level}
              </option>
            ))}
          </select>
          {errors.gradeId?.message && (
            <p className="text-xs text-red-400">{errors.gradeId.message.toString()}</p>
          )}
        </div>

        {/* CLASS */}
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Class</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("classId")}
            defaultValue={data?.classId}
          >
            {classes.map((classItem: any) => (
              <option value={classItem.id} key={classItem.id}>
                ({classItem.name} - {classItem._count.students}/{classItem.capacity} Capacity)
              </option>
            ))}
          </select>
          {errors.classId?.message && (
            <p className="text-xs text-red-400">{errors.classId.message.toString()}</p>
          )}
        </div>
      </div>

      {state.error && (
        <span className="text-red-500">Something went wrong!</span>
      )}

      <button type="submit" className="bg-blue-400 text-white p-2 rounded-md">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default StudentForm;
