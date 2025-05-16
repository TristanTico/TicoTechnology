import { Plus, Trash2 } from "lucide-react";
import { useState, useRef } from "react";
interface FormCategoryProps {
  onSuccess: () => void;
}
type Attribute = {
  key: string;
  value: string;
};

export const FormProducts: React.FC<FormCategoryProps> = ({ onSuccess }) => {
  const [customAttributes, setCustomAttributes] = useState<Attribute[]>([
    { key: "", value: "" },
  ]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    if (files.length + imageFiles.length > 5) {
      return;
    }

    const validFiles = files.filter((file) => {
      const isValidType = ["image/jpeg", "image/png"].includes(file.type);
      const isValidSize = file.size <= 5 * 1024 * 1024; // 5MB
      return isValidType && isValidSize;
    });

    setImageFiles((prev) => [...prev, ...validFiles]);
  };

  const handleRemoveImage = (index: any) => {
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAddAttribute = () => {
    if (customAttributes.length >= 5) return;
    setCustomAttributes([...customAttributes, { key: "", value: "" }]);
  };

  const handleRemoveAttribute = (index: number) => {
    setCustomAttributes(customAttributes.filter((_, i) => i !== index));
  };

  const handleAttributeChange = (
    index: number,
    field: keyof Attribute,
    value: string
  ) => {
    const updatedAttributes = [...customAttributes];
    updatedAttributes[index][field] = value;
    setCustomAttributes(updatedAttributes);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(onSuccess);
  };
  return (
    <form onClick={(e) => handleSubmit(e as any)} className="space-y-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Nombre de Producto *
          </label>
          <input
            type="text"
            name="nombreProducto"
            className="mt-1 block w-full border-0 border-b border-gray-300 bg-transparent focus:border-blue-500 focus:ring-0 sm:text-sm outline-none"
            placeholder="Ingrese el nombre del producto"
          />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Precio del producto *
            </label>
            <input
              type="number"
              name="precioProducto"
              className="mt-1 block w-full border-0 border-b border-gray-300 bg-transparent focus:border-blue-500 focus:ring-0 sm:text-sm outline-none"
              placeholder="Ingrese el precio del producto"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Stock *
            </label>
            <input
              type="number"
              name="stockProducto"
              className="mt-1 block w-full border-0 border-b border-gray-300 bg-transparent focus:border-blue-500 focus:ring-0 sm:text-sm outline-none"
              placeholder="Ingrese el stock del producto"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Descripcion del Producto *
          </label>
          <textarea
            name="descripcionProducto"
            className="mt-1 block w-full border-0 border-b border-gray-300 bg-transparent focus:border-blue-500 focus:ring-0 sm:text-sm outline-none resize-none"
            placeholder="Provide product description"
            rows={5}
          />
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            name="destacado"
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label className="ml-2 block text-sm text-gray-700">
            Seleccione si el producto es destacado
          </label>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Subcategoria *
          </label>
          <select
            name="subCategorias_id"
            className="mt-1 block w-full border-0 border-b border-gray-300 bg-transparent focus:border-blue-500 focus:ring-0 sm:text-sm outline-none"
            defaultValue=""
          >
            <option value="" disabled>
              Seleccione la subcategoría
            </option>
            <option value="subcat1">Subcategoría 1</option>
            <option value="subcat2">Subcategoría 2</option>
            <option value="subcat3">Subcategoría 3</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Imagenes (Max 5)
          </label>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            multiple
            accept=".jpg,.jpeg,.png"
            className="mt-1 block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100"
          />
          {imageFiles.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {imageFiles.map((file, index) => (
                <div key={index} className="relative group">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Preview ${index + 1}`}
                    className="h-20 w-20 object-cover rounded"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-bl opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        <div>
          <div className="flex justify-between items-center mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Caracteristicas Propias del producto
            </label>
            <button
              type="button"
              disabled={customAttributes.length >= 5}
              onClick={handleAddAttribute}
              className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              <Plus className="mr-2" /> Añadir Atributo
            </button>
          </div>
          {customAttributes.map((attr, index) => (
            <div key={index} className="flex gap-4 mb-4">
              <input
                type="text"
                value={attr.key}
                onChange={(e) =>
                  handleAttributeChange(index, "key", e.target.value)
                }
                placeholder="Key"
                className="flex-1 mt-1 block w-full border-0 border-b border-gray-300 bg-transparent focus:border-blue-500 focus:ring-0 sm:text-sm outline-none"
              />
              <input
                type="text"
                value={attr.value}
                onChange={(e) =>
                  handleAttributeChange(index, "value", e.target.value)
                }
                placeholder="Value"
                className="flex-1 mt-1 block w-full border-0 border-b border-gray-300 bg-transparent focus:border-blue-500 focus:ring-0 sm:text-sm outline-none"
              />
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => handleRemoveAttribute(index)}
                  className="inline-flex items-center p-2 border border-transparent rounded-md text-red-600 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  <Trash2 />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Guardar
        </button>
      </div>
    </form>
  );
};
