"use client";

import React, { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "../InputField";
import { createExamSchema, updateExamSchema } from "@/lib/formValidationSchemas";
import { createExam, updateExam } from "@/lib/actions";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

type Props = {
  type: "create" | "update";
  data?: any;
  setOpen: Dispatch<SetStateAction<boolean>>;
  relatedData?: { lessons: { id: number; name: string }[] };
};

// Form inputs as they exist in the DOM (datetime-local returns string)
type FormInputs = {
  title: string;
  startTime: string | Date;
  endTime: string | Date;
  lessonId: string | number;
  id?: string | number;
};

export default function ExamForm({ type, data, setOpen, relatedData }: Props) {
  const router = useRouter();
  const [submitError, setSubmitError] = useState<string | null>(null);

  // pick schema at runtime
  const schema = type === "create" ? createExamSchema : updateExamSchema;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormInputs>({
    // zodResolver typing can be awkward with conditional schemas — cast to any to avoid TS noise
    resolver: zodResolver(schema) as any,
    defaultValues: {
      title: data?.title ?? "",
      // inputs expect string for datetime-local, format the incoming date (if present)
      startTime: data?.startTime ? new Date(data.startTime).toISOString().slice(0, 16) : "",
      endTime: data?.endTime ? new Date(data.endTime).toISOString().slice(0, 16) : "",
      lessonId: data?.lessonId ?? "",
      id: data?.id ?? undefined,
    },
  });

  const onSubmit = handleSubmit(async (formData) => {
    setSubmitError(null);

    // convert DOM values into the shapes expected by your Zod schema / backend
    const payload: any = {
      title: formData.title,
      startTime:
        formData.startTime instanceof Date
          ? formData.startTime
          : new Date(formData.startTime as string),
      endTime:
        formData.endTime instanceof Date
          ? formData.endTime
          : new Date(formData.endTime as string),
      lessonId: typeof formData.lessonId === "string" ? Number(formData.lessonId) : formData.lessonId,
    };

    if (type === "update") payload.id = Number(formData.id);

    try {
      if (type === "create") {
        await createExam(payload);
        toast("Exam created!");
      } else {
        await updateExam(payload);
        toast("Exam updated!");
      }
      setOpen(false);
      router.refresh();
    } catch (err: any) {
      console.error(err);
      setSubmitError(err?.message ?? "Something went wrong");
    }
  });

  const lessons = relatedData?.lessons ?? [];

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">
        {type === "create" ? "Create a new exam" : "Update the exam"}
      </h1>

      <div className="flex justify-between flex-wrap gap-4">
        {/* Title - using your InputField component */}
        <InputField label="Exam title" name="title" register={register} error={errors.title} />

        {/* Start Date */}
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Start Date</label>
          <input
            type="datetime-local"
            {...register("startTime", {
              // keep it a string in the DOM; we'll convert before sending
              setValueAs: (v) => (v === "" ? "" : v),
            })}
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
          />
          {errors.startTime && <p className="text-xs text-red-400">{errors.startTime.message}</p>}
        </div>

        {/* End Date */}
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">End Date</label>
          <input
            type="datetime-local"
            {...register("endTime", {
              setValueAs: (v) => (v === "" ? "" : v),
            })}
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
          />
          {errors.endTime && <p className="text-xs text-red-400">{errors.endTime.message}</p>}
        </div>

        {/* hidden id only for update */}
        {type === "update" && <input type="hidden" {...register("id")} />}

        {/* Lesson select */}
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Lesson</label>
          <select
            {...register("lessonId", { setValueAs: (v) => Number(v) })}
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
          >
            <option value="">Select a lesson</option>
            {lessons.map((lesson) => (
              <option value={lesson.id} key={lesson.id}>
                {lesson.name}
              </option>
            ))}
          </select>
          {errors.lessonId && <p className="text-xs text-red-400">{errors.lessonId.message}</p>}
        </div>
      </div>

      {submitError && <span className="text-red-500">{submitError}</span>}

      <button disabled={isSubmitting} className="bg-blue-400 text-white p-2 rounded-md">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
}
