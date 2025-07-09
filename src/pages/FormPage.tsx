import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

export function FormPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { completeForm, availableForms } = useApp();

  // Encontra o formulário correto baseado no ID
  const formData = availableForms.find((form) => form.id === id) || {
    id: "1",
    title: "Las Violetas",
    type: "Restaurantes",
    reward: 12.45,
    image: "https://i.ibb.co/H3L6jF9/img-formulario.png",
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    completeForm(id || "");
    navigate("/success/" + id);
  };

  return (
    <div className="min-h-screen bg-[#F1F2FF] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-lg overflow-hidden">
        <img
          src={formData.image}
          alt={formData.title}
          className="w-full h-48 object-cover"
        />

        <div className="p-6">
          <h1 className="text-2xl font-semibold mb-2">{formData.title}</h1>
          <p className="text-gray-600 mb-4">Tipo: {formData.type}</p>

          <div className="bg-[#FFFF] rounded-xl p-4 mb-6">
            <p className="text-sm text-gray-500 mb-2">
              La información que necessita para rellenar este formulario se ha
              enviado a sua dirección de correo eletronico registrada en la
              plataforma.
            </p>
            <p className="text-primary font-medium">
              Recibirás US$ {formData.reward.toFixed(2)} por responder
              correctamente a este formulario.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-lg font-medium mb-2">
                  ¿Cuántas opiniones tiene el establecimiento?
                </label>
                <input
                  type="text"
                  required
                  className="w-full p-3 bg-[#EFEEFF] rounded-lg border-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-lg font-medium mb-2">
                  ¿Cuál es la dirección?
                </label>
                <input
                  type="text"
                  required
                  className="w-full p-3 bg-[#EFEEFF] rounded-lg border-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-lg font-medium mb-2">
                  ¿Cuál es el número de teléfono?
                </label>
                <input
                  type="text"
                  required
                  className="w-full p-3 bg-[#EFEEFF] rounded-lg border-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-lg font-medium mb-2">
                  ¿Con qué tipo de alimentos trabajan?
                </label>
                <input
                  type="text"
                  required
                  className="w-full p-3 bg-[#EFEEFF] rounded-lg border-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#1A0FB0] text-white py-4 rounded-xl font-medium flex items-center justify-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
              Enviar formulario
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
