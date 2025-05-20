import { useAuthStore } from "@/store/authStore";
import { useState } from "react";

interface FormData {
  cedulaUsuario: string;
  nombreUsuario: string;
  correoUsuario: string;
  telefono: string;
  direccion: string;
  clave: string;
}

export const useForm = (initialState: FormData) => {
  const [formData, setFormData] = useState<FormData>(initialState);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const register = useAuthStore((state) => state.register);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
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
    // Validar cedulaUsuario
    if (!formData.cedulaUsuario) {
      newErrors.cedulaUsuario = "La cédula es requerida";
    } else if (!/^\d{9,12}$/.test(formData.cedulaUsuario)) {
      newErrors.cedulaUsuario =
        "La cédula debe contener solo números y tener entre 9 y 12 dígitos";
    }

    // Validar nombreUsuario
    if (!formData.nombreUsuario) {
      newErrors.nombreUsuario = "El nombre es requerido";
    } else if (formData.nombreUsuario.length < 3) {
      newErrors.nombreUsuario = "El nombre debe tener al menos 3 caracteres";
    }

    // Validar correoUsuario
    if (!formData.correoUsuario) {
      newErrors.correoUsuario = "El correo es requerido";
    } else if (!/\S+@\S+\.\S+/.test(formData.correoUsuario)) {
      newErrors.correoUsuario = "Por favor ingresa un correo válido";
    }

    // Validar telefono
    if (!formData.telefono) {
      newErrors.telefono = "El número de teléfono es requerido";
    } else if (!/^\d{8}$/.test(formData.telefono)) {
      newErrors.telefono = "Debe contener exactamente 8 dígitos numéricos";
    }

    // Validar dirección
    if (!formData.direccion) {
      newErrors.direccion = "La dirección es requerida";
    } else if (formData.direccion.length < 10) {
      newErrors.direccion = "La dirección debe tener al menos 10 caracteres";
    }

    // Validar clave
    if (!formData.clave) {
      newErrors.clave = "La contraseña es requerida";
    } else if (formData.clave.length < 6) {
      newErrors.clave = "La contraseña debe tener al menos 6 caracteres";
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
        const success = await register({...formData,
          telefono: parseInt(formData.telefono),
        });
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
