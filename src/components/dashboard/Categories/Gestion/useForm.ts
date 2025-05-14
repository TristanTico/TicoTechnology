import { useCategorieStore } from "@/store/categorieStore";
import { useState } from "react";

interface FormData {
  nombreCategoria: string;
}

export const useForm = (initialState: FormData) => {
  const [formData, setFormData] = useState<FormData>(initialState);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const createCategory = useCategorieStore((state) => state.createCategory);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };
  const validateForm = (): Partial<FormData> => {
    const newErrors: Partial<FormData> = {};
    if (!formData.nombreCategoria) {
      newErrors.nombreCategoria = "El nombre de la categoria es requerido";
    } else if (formData.nombreCategoria.length < 3) {
      newErrors.nombreCategoria = "El nombre de la categoria debe tener al menos 3 caracteres";
    }
    return newErrors;
  };
  const limpiarFormulario = () => {
    setFormData(initialState);
  };
  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
    onSuccess?: () => void
  ) => {
    event.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      try {
        const success = await createCategory(formData);
        if (success) {
          limpiarFormulario();
          if (onSuccess) onSuccess(); 
        }
      } catch (error: any) {
        console.error(error);
      }
    } else {
      setErrors(formErrors);
    }
  };
  return {
    formData,
    errors,
    handleChange,
    handleSubmit,
  };
};
