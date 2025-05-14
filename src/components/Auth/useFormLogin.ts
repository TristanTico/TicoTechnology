import { useAuthStore } from "@/store/authStore";
import { useState } from "react";

interface FormData {
  correoUsuario: string;
  clave: string;
}

export const useForm = (initialState: FormData) => {
  const [formData, setFormData] = useState<FormData>(initialState);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const login = useAuthStore((state) => state.login);
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
    if (!formData.correoUsuario) {
      newErrors.correoUsuario = "El correo es requerido";
    } else if (!/\S+@\S+\.\S+/.test(formData.correoUsuario)) {
      newErrors.correoUsuario = "Por favor ingresa un correo válido";
    }
    if (!formData.clave) {
      newErrors.clave = "La contraseña es requerida";
    } else if (formData.clave.length < 6) {
      newErrors.clave = "La contraseña debe de ser mayor a 6 carácteres";
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
        const success = await login(formData);
        if (success) {
          limpiarFormulario();
          if (onSuccess) onSuccess(); // solo se ejecuta si fue exitoso
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
