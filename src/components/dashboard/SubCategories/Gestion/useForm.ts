import { useSubcategorieStore } from "@/store/subCategorieStore";
import { useState } from "react";

interface FormData {
  nombreSubcategoria: string;
  categorias_id: number;
}

export const useForm = (initialState: FormData) => {
  const [formData, setFormData] = useState<FormData>(initialState);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const createSubCategory = useSubcategorieStore(
    (state) => state.createSubCategory
  );
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "categorias_id" ? Number(value) : value,
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
    if (!formData.nombreSubcategoria) {
      newErrors.nombreSubcategoria = "El nombre de la categoria es requerido";
    } else if (formData.nombreSubcategoria.length < 3) {
      newErrors.nombreSubcategoria =
        "El nombre de la categoria debe tener al menos 3 caracteres";
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
        const success = await createSubCategory(formData);
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
