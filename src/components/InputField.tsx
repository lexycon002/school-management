import { FieldError } from "react-hook-form";

type InputFieldProps ={
    label: string;
    type?: string;
    register: any;
    error?: FieldError;
    name: string;
    defaultValue?: string;
    inputProps?: React.InputHTMLAttributes<HTMLInputElement>;

}

const InputField = ({
     label, 
     type = "text", 
     register, 
     error, 
     name, 
     defaultValue, 
     inputProps
     }: InputFieldProps) => {

    return (
       <div className="flex flex-col gap-2 w-full md:w-1/4">
        <label className="text-xs text-gray-700">{label}</label>
        <input type={type} id={name} {...register(name)} className={`ring-[1.6px] ring-gray-300 rounded-md text-sm w-full ${error ? 'border-red-500' : 'border-gray-300'}`}
        {...inputProps} defaultValue={defaultValue}
        />
        {error?.message && (
        <p className="text-xs text-red-500">
          {error?.message.toString()}
        </p>
        )} 
      </div>
    )
}

export default InputField;