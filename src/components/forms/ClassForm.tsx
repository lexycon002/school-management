// "use client";

// import {z} from "zod";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import InputField from "../InputField";
// import Image from "next/image";


// const schema = z.object({
//   username: z.string().min(4, { message: "Username must be at least 4 characters long" })
//   .max(20, { message: "Username must not exceed 20 characters" }),
//   email: z.string().email({ message: "Invalid email address"}),
//   password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
//   confirmPassword: z.string().min(6, { message: "Confirm Password must be at least 6 characters long" }),
//   firstName: z.string().min(1, { message: "First name is required" }),
//   lastName: z.string().min(1, { message: "Last name is required" }),
//   phone: z.string().min(1, { message: "Phone number is required" }),
//   bloodType: z.string().min(1, { message: "Blood type is required" }),
//   address: z.string().min(1, { message: "Address is required" }),
//   birthday: z.date({ message: "Birthday is required" }),
//   sex: z.enum(["male", "Female"],{message: "Sex is required"}),
//   img: z.instanceof(File, { message: "Image is required" }),
// });

// type Inputs = z.infer<typeof schema>;

// const ClassForm = ({
//   type, data,
// } : {
//   type: "create" | "update";
//   data?: any;

// } ) => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<Inputs>({
//     resolver: zodResolver(schema),
//   });

//   const onSubmit = handleSubmit(data => {
//     console.log("Form submitted with data:", data);
//   });


//   return (
//     <form className="p-4 flex flex-col gap-4" onSubmit={onSubmit}>
//       <h1 className="text-xl font-semibold"> Create a new student</h1>
//       <span className="text-sm text-gray-500">Personal Information:</span>
//       <div className="flex justify-between flex-wrap gap-4">
//       <InputField
//         label="Username"
//         type="text"
//         register={register}
//         error={errors.username}
//         name="username"
//         defaultValue={data?.username}
//       />
//       <InputField
//         label="Email"
//         type="email"
//         register={register}
//         error={errors.email}
//         name="email"
//         defaultValue={data?.email}
//       />
//       <InputField
//         label="Password"
//         type="password"
//         register={register}
//         error={errors.password}
//         name="password"
//         defaultValue={data?.password}
//       />
//       </div>

//       <span className="text-xs text-gray-400 font-medium">Personal information</span>
//       <div className="flex justify-between flex-wrap gap-4">
//         <InputField
//           label="First Name"
//           type="text"
//           register={register}
//           error={errors.firstName}
//           name="firstName"
//           defaultValue={data?.firstName}
//         />
//         <InputField
//           label="Last Name"
//           type="text"
//           register={register}
//           error={errors.lastName}
//           name="lastName"
//           defaultValue={data?.lastName}
//         />
//       <InputField
//         label="Phone"
//         type="text"
//         register={register}
//         error={errors.phone}
//         name="phone"
//         defaultValue={data?.phone}
//       />
//       <InputField
//         label="Address"
//         type="text"
//         register={register}
//         error={errors.address}
//         name="address"
//         defaultValue={data?.address}
//       />
//       <InputField
//         label="Birthday"
//         type="date"
//         register={register}
//         error={errors.birthday}
//         name="birthday"
//         defaultValue={data?.birthday}
//       />
//       <InputField
//         label="Last Name"
//         type="text"
//         register={register}
//         error={errors.lastName}
//         name="lastName"
//         defaultValue={data?.lastName}
//       />
//       <InputField
//         label="Phone"
//         type="text"
//         register={register}
//         error={errors.phone}
//         name="phone"
//         defaultValue={data?.phone}
//       />
//       <InputField
//         label="Address"
//         type="text"
//         register={register}
//         error={errors.address}
//         name="address"
//         defaultValue={data?.address}
//       />
//       <InputField
//         label="Birthday"
//         type="date"
//         register={register}
//         error={errors.birthday}
//         name="birthday"
//         defaultValue={data?.birthday}
//       />
      
//    <div className="flex flex-col gap-2 w-full md:w-1/4">
//         <label className="text-xs text-gray-700">Sex</label>
//         <select className={`ring-[1.6px] ring-gray-300 rounded-md text-sm w-full`} {...register("sex")} defaultValue={data?.sex}>
//           <option value="male">Male</option>
//           <option value="female">Female</option>
//         </select>
//         {errors.sex && (
//           <p className="text-xs text-red-500">
//             {errors.sex.message?.toString()}
//           </p>
//         )}
//       </div> 
//    <div className="flex flex-col gap-2 w-full md:w-1/4 justify-center">
//         <label className="text-xs text-gray-700 flex items-center gap-2 cursor-pointer" htmlFor="img">
//           <Image src="/upload.png" alt="upload file" width={25} height={25} />
//           <span>Upload a photo </span>
//         </label>
//       <input type="file" id="img" {...register("img")} className="hidden"/>
//         {errors.img?.message && (
//           <p className="text-xs text-red-500">
//             {errors.img.message?.toString()}
//           </p>
//         )}
//         </div>
//       </div>
//       <button className="bg-secondary text-white p-2 rounded-md">{type === "create" ? "Create" : "Update"} Class</button>
//     </form>
//   )
// }

// export default ClassForm;



"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "../InputField";
import {
  classSchema,
  ClassSchema,
  subjectSchema,
  SubjectSchema,
} from "@/lib/formValidationSchemas";
import {
  createClass,
  createSubject,
  updateClass,
  updateSubject,
} from "@/lib/actions";
import { useFormState } from "react-dom";
import { Dispatch, SetStateAction, useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const ClassForm = ({
  type,
  data,
  setOpen,
  relatedData,
}: {
  type: "create" | "update";
  data?: any;
  setOpen: Dispatch<SetStateAction<boolean>>;
  relatedData?: any;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ClassSchema>({
    resolver: zodResolver(classSchema),
  });

  // AFTER REACT 19 IT'LL BE USEACTIONSTATE

  const [state, formAction] = useFormState(
    type === "create" ? createClass : updateClass,
    {
      success: false,
      error: false,
    }
  );

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    formAction(data);
  });

  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      toast(`Subject has been ${type === "create" ? "created" : "updated"}!`);
      setOpen(false);
      router.refresh();
    }
  }, [state, router, type, setOpen]);

  const { teachers, grades } = relatedData;

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">
        {type === "create" ? "Create a new class" : "Update the class"}
      </h1>

      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Class name"
          name="name"
          defaultValue={data?.name}
          register={register}
          error={errors?.name}
        />
        <InputField
          label="Capacity"
          name="capacity"
          defaultValue={data?.capacity}
          register={register}
          error={errors?.capacity}
        />
        {data && (
          <InputField
            label="Id"
            name="id"
            defaultValue={data?.id}
            register={register}
            error={errors?.id}
            hidden
          />
        )}
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Supervisor</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("supervisorId")}
            defaultValue={data?.teachers}
          >
            {teachers.map(
              (teacher: { id: string; name: string; surname: string }) => (
                <option
                  value={teacher.id}
                  key={teacher.id}
                  selected={data && teacher.id === data.supervisorId}
                >
                  {teacher.name + " " + teacher.surname}
                </option>
              )
            )}
          </select>
          {errors.supervisorId?.message && (
            <p className="text-xs text-red-400">
              {errors.supervisorId.message.toString()}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Grade</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("gradeId")}
            defaultValue={data?.gradeId}
          >
            {grades.map((grade: { id: number; level: number }) => (
              <option
                value={grade.id}
                key={grade.id}
                selected={data && grade.id === data.gradeId}
              >
                {grade.level}
              </option>
            ))}
          </select>
          {errors.gradeId?.message && (
            <p className="text-xs text-red-400">
              {errors.gradeId.message.toString()}
            </p>
          )}
        </div>
      </div>
      {state.error && (
        <span className="text-red-500">Something went wrong!</span>
      )}
      <button className="bg-blue-400 text-white p-2 rounded-md">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default ClassForm;