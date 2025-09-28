"use client";

import { z } from "zod";
import { FieldError, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "../InputField";
import Image from "next/image";
import { CldUploadWidget } from "next-cloudinary";
import { Dispatch, SetStateAction, startTransition, useActionState, useEffect, useState } from "react";
import { createParentSchema, updateParentSchema } from "@/lib/formValidationSchemas";
import { toast } from "react-toastify";
import { createParent, updateParent } from "@/lib/actions";
import { useRouter } from "next/navigation";


const ParentForm = ({
  type,
  data,
  setOpen,
  relatedData,
}: {
  type: "create" | "update";
  data?: any;
  setOpen?: Dispatch<SetStateAction<boolean>>;
  relatedData?: any;
}) => {
  const isCreate = type === "create";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>({
    resolver: zodResolver(isCreate ? createParentSchema : updateParentSchema),
  });


  const [img, setImg] = useState<any>();

  // Reducer for useActionState

  const parentReducer = async (state: { success: boolean; error: boolean }, payload: any) => {
      try {
        if (isCreate) {
          await createParent({ ...payload, img: img?.secure_url });
        } else {
          await updateParent({ ...payload, img: img?.secure_url });
        }
        return { success: true, error: false };
      } catch (e) {
        return { success: false, error: true };
      }
    };

 const [state, formAction] = useActionState(parentReducer, { success: false, error: false });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    if (formAction) {
      startTransition(() => {
        formAction(data);
      });
    }
  });

  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      toast(`Parent has been ${type === "create" ? "created" : "updated"}!`);
  if (setOpen) setOpen(false);
      router.refresh();
    }
  }, [state, router, type, setOpen]);

  const { subjects } = relatedData;

  return (
    <form className="p-4 flex flex-col gap-4" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">
        {type === "create" ? "Create a new student" : "Update student"}
      </h1>

      <span className="text-sm text-gray-500">Account Information:</span>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Username"
          type="text"
          register={register}
          error={errors.username as FieldError | undefined}
          name="username"
        />
        <InputField
          label="Email"
          type="email"
          register={register}
          error={errors.email as FieldError | undefined}
          name="email"
        />
        <InputField
          label="Password"
          type="password"
          register={register}
          error={errors.password as FieldError | undefined}
          name="password"
        />
      </div>

      <span className="text-xs text-gray-400 font-medium">
        Personal Information:
      </span>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="First Name"
          type="text"
          register={register}
          error={errors.firstName as FieldError | undefined}
          name="firstName"
        />
        <InputField
          label="Last Name"
          type="text"
          register={register}
          error={errors.lastName as FieldError | undefined}
          name="lastName"
        />
        <InputField
          label="Phone"
          type="text"
          register={register}
          error={errors.phone as FieldError | undefined}
          name="phone"
        />
        <InputField
          label="Address"
          type="text"
          register={register}
          error={errors.address as FieldError | undefined}
          name="address"
        />
        <InputField
          label="Birthday"
          type="date"
          register={register}
          error={errors.birthday as FieldError | undefined}
          name="birthday"
        />

        {/* Sex select */}
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-700">Sex</label>
          <select
            className="ring-[1.6px] ring-gray-300 rounded-md text-sm w-full"
            {...register("sex")}
          >
            <option value="">Select...</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          {errors.sex && (
            <p className="text-xs text-red-500">
              {errors.sex.message?.toString()}
            </p>
          )}
        </div>

        {/* Cloudinary upload */}
        <div className="flex flex-col gap-2 w-full md:w-1/4 justify-center">
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
          {errors.img && (
            <p className="text-xs text-red-500">
              {errors.img.message?.toString()}
            </p>
          )}
        </div>
      </div>
      {state.error === true && (
        <span className="text-red-500">Something went wrong!</span>
      )}
      <button className="bg-blue-400 text-white p-2 rounded-md">
        {type === "create" ? "Create Parent" : "Update Parent"}
      </button>
    </form>
  );
};

export default ParentForm;
