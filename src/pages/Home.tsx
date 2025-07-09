import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Wallet, Home as HomeIcon, User } from "lucide-react";
import { useApp } from "../context/AppContext";
import { TransferModal } from "../components/TransferModal";

export function Home() {
  const navigate = useNavigate();
  const { userData, availableForms } = useApp();
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);

  return (
    <div className="bg-[#F1F2FF] min-h-screen">
      {/* Modal de Transferência */}
      <TransferModal
        isOpen={isTransferModalOpen}
        onClose={() => setIsTransferModalOpen(false)}
      />

      {/* Curva decorativa superior */}
      <div className="absolute top-0 left-0 right-0 h-[25%] bg-[#1A0FB0] rounded-b-[2.5rem]"></div>

      <div className="container mx-auto px-4 pt-8 pb-20 relative">
        {/* Cabeçalho */}
        <h1 className="text-white text-2xl font-semibold mb-6">Hola, Juan</h1>

        {/* Card Principal */}
        <div className="bg-white rounded-2xl p-6 mb-8 shadow-lg">
          <h2 className="text-lg font-medium mb-8">
            Ingressos en los últimos 7 días
          </h2>

          {/* Ícone da carteira */}
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-[#1A0FB0] rounded-full flex items-center justify-center">
              <Wallet className="w-8 h-8 text-white" />
            </div>
          </div>

          {/* Número de formulários */}
          <p className="text-center text-sm mb-2">
            {userData.completedForms} formulários rellenados
          </p>

          {/* Valor principal */}
          <p className="text-center text-[#1A0FB0] text-5xl font-bold mb-6">
            $ {userData.totalFormsValue.toFixed(2)}
          </p>

          {/* Card do salário */}
          <div className="bg-[#F1F2FF] rounded-xl p-4 mb-6">
            <div className="flex items-center gap-2">
              <Wallet className="w-5 h-5 text-[#1A0FB0]" />
              <span className="font-medium">Mi sueldo</span>
            </div>
            <p className="text-[#00A650] font-medium mt-1">
              US$ {userData.salary.toFixed(2)}
            </p>
          </div>

          {/* Botão de transferência */}
          <button
            onClick={() => setIsTransferModalOpen(true)}
            className="w-full bg-[#1A0FB0] text-white py-4 rounded-xl font-medium flex items-center justify-center gap-2"
          >
            <img
              src="https://i.ibb.co/ycd47ZT9/paypal-1.png"
              alt="PayPal"
              className="w-5 h-5"
            />
            Transferir dinero
          </button>
        </div>

        {/* Seção de Formulários */}
        <section>
          <h2 className="text-[#1A0FB0] text-xl font-semibold mb-4">
            Formulários disponibles:
          </h2>

          {/* Lista de formulários */}
          <div className="space-y-3">
            {availableForms.map((form) => (
              <button
                key={form.id}
                onClick={() => navigate(`/form/${form.id}`)}
                className="w-full bg-white rounded-xl p-4 flex justify-between items-center shadow-sm"
              >
                <div>
                  <h3 className="text-[#1A0FB0] font-medium">{form.title}</h3>
                  <p className="text-gray-500">{form.type}</p>
                </div>
                <span className="text-[#00A650] font-medium">
                  + $ {form.reward.toFixed(2)}
                </span>
              </button>
            ))}
          </div>
        </section>
        <p className="text-center text-[#1A0FB0] underline font-medium mt-4">
          Ver todos los formularios
        </p>
      </div>

      {/* Menu de navegação */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t py-4">
        <div className="container mx-auto px-8">
          <div className="flex justify-between items-center">
            <button className="text-[#1A0FB0]">
              <HomeIcon className="w-6 h-6" />
            </button>
            <button className="text-[#1A0FB0]">
              <Wallet className="w-6 h-6" />
            </button>
            <button className="text-[#1A0FB0]">
              <User className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}
