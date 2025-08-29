// "use client";
// import { startTransition } from "react";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { subjectSchema, SubjectSchema } from "@/lib/formValidationSchemas";
// import { createSubject, updateSubject } from "@/lib/actions";
// import React, { Dispatch, SetStateAction, useEffect } from "react";
// import { toast } from "react-toastify";
// import { useRouter } from "next/navigation";
// import InputField from "../InputField";

// interface SubjectFormProps {
//   type: "create" | "update";
//   data?: any;
//   setOpen: Dispatch<SetStateAction<boolean>>;
//   relatedData?: { teachers: { id: string; name: string; surname: string }[] };
// }

// const SubjectForm = ({ type, data, setOpen, relatedData }: SubjectFormProps) => {
//   const { register, handleSubmit, formState: { errors } } = useForm<SubjectSchema>({
//     resolver: zodResolver(subjectSchema),
//     defaultValues: {
//       name: data?.name || "",
//       teachers: data?.teachers?.map((t: any) => t.id) || [],
//     },
//   });

//   const [state, formAction] = React.useActionState(
//     type === "create" ? createSubject : updateSubject,
//     { success: false, error: false }
//   );

//   const router = useRouter();

//   useEffect(() => {
//     if (state.success) {
//       toast(`Subject ${type === "create" ? "created" : "updated"} successfully!`);
//       setOpen(false);
//       router.refresh();
//     }
//   }, [state.success, type, setOpen, router]);


// const onSubmit = handleSubmit((formData) => {
//   const teachers = Array.isArray(formData.teachers) ? formData.teachers : [formData.teachers];
  
//   startTransition(() => {
//     formAction({ ...formData, teachers });
//   });
// });
//   return (
//     <form className="flex flex-col gap-6" onSubmit={onSubmit}>
//       <InputField
//         label="Subject Name"
//         name="name"
//         register={register}
//         error={errors.name}
//         defaultValue={data?.name}
//       />

//       <div className="flex flex-col gap-2 w-full md:w-1/3">
//         <label className="text-xs text-gray-500">Teachers</label>
//         <select
//           multiple
//           className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
//           {...register("teachers")}
//           defaultValue={data?.teachers?.map((t: any) => t.id)}
//         >
//           {relatedData?.teachers?.map((teacher) => (
//             <option value={teacher.id} key={teacher.id}>
//               {teacher.name} {teacher.surname}
//             </option>
//           ))}
//         </select>
//         {errors.teachers?.message && (
//           <p className="text-xs text-red-500">{errors.teachers.message}</p>
//         )}
//       </div>

//       {state.error && <span className="text-red-500">Something went wrong!</span>}

//       <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">
//         {type === "create" ? "Create Subject" : "Update Subject"}
//       </button>
//     </form>
//   );
// };

// export default SubjectForm;

"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { subjectSchema, SubjectSchema } from "@/lib/formValidationSchemas";
import { createSubject, updateSubject } from "@/lib/actions";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import InputField from "../InputField";

interface SubjectFormProps {
  type: "create" | "update";
  data?: any;
  setOpen: Dispatch<SetStateAction<boolean>>;
  relatedData?: { teachers: { id: string; name: string; surname: string }[] };
}

const SubjectForm = ({ type, data, setOpen, relatedData }: SubjectFormProps) => {
  const { register, handleSubmit, formState: { errors } } = useForm<SubjectSchema>({
    resolver: zodResolver(subjectSchema),
    defaultValues: {
      name: data?.name || "",
      teachers: data?.teachers?.map((t: any) => t.id) || [],
    },
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const router = useRouter();

  const onSubmit = handleSubmit(async (formData) => {
    const teachers = Array.isArray(formData.teachers) ? formData.teachers : [formData.teachers];
    setLoading(true);
    setError(false);

    try {
      if (type === "create") {
        await createSubject({ ...formData, teachers });
        toast("Subject created successfully!");
      } else {
        await updateSubject({ ...formData, teachers, id: data?.id });
        toast("Subject updated successfully!");
      }
      setOpen(false);
      router.refresh();
    } catch (err) {
      console.error(err);
      setError(true);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  });

  return (
    <form className="flex flex-col gap-6" onSubmit={onSubmit}>
      <InputField
        label="Subject Name"
        name="name"
        register={register}
        error={errors.name}
        defaultValue={data?.name}
      />

      <div className="flex flex-col gap-2 w-full md:w-1/3">
        <label className="text-xs text-gray-500">Teachers</label>
        <select
          multiple
          className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
          {...register("teachers")}
          defaultValue={data?.teachers?.map((t: any) => t.id)}
        >
          {relatedData?.teachers?.map((teacher) => (
            <option value={teacher.id} key={teacher.id}>
              {teacher.name} {teacher.surname}
            </option>
          ))}
        </select>
        {errors.teachers?.message && (
          <p className="text-xs text-red-500">{errors.teachers.message}</p>
        )}
      </div>

      {error && <span className="text-red-500">Something went wrong!</span>}

      <button
        type="submit"
        disabled={loading}
        className={`bg-blue-500 text-white p-2 rounded-md ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        {loading
          ? type === "create"
            ? "Creating..."
            : "Updating..."
          : type === "create"
          ? "Create Subject"
          : "Update Subject"}
      </button>
    </form>
  );
};

export default SubjectForm;

