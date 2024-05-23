import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface FormInputProps {
  name: string;
  type: string;
  label?: string;
  defaultValue?: string;
  placeholder?: string;
}

const FormInput: React.FC<FormInputProps> = ({
  name,
  type,
  label,
  defaultValue,
  placeholder,
}) => {
  return (
    <div className="mb-2">
      <Label htmlFor={name} className="capitalize">
        {label || name}
      </Label>
      <Input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        required
       />
    </div>
  );
};

export default FormInput;
