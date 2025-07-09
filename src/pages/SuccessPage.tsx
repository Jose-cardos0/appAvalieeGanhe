import React, { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { Home, Wallet, User } from "lucide-react";
import { TransferModal } from "../components/TransferModal";

export function SuccessPage() {
  const { id } = useParams<{ id: string }>();
  const { userData, getFormReward, availableForms } = useApp();
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
  const notificationShown = useRef(false);

  useEffect(() => {
    if (notificationShown.current) return;

    const showNotification = () => {
      const formReward = getFormReward(id || "");
      const notification = document.createElement("div");
      notification.className =
        "fixed top-4 left-1/2 transform -translate-x-1/2 bg-[#424242]/60 text-white px-4 py-3 rounded-[20px] flex items-center gap-3 shadow-lg z-50 w-[90%] max-w-[360px]";
      notification.style.backdropFilter = "blur(0px)";
      notification.innerHTML = `
        <div class="flex items-center gap-3 w-full">
          <img src="https://i.ibb.co/YTBTkCwr/icongoogle.png" alt="Google" class="w-7 h-7" />
          <div class="flex-1">
            <p class="font-medium text-[14px] leading-tight">Nuevo formulario rellenado de Google</p>
            <p class="text-[13px] text-white/90">Has recebido: US$ ${formReward.toFixed(
              2
            )}</p>
          </div>
          <span class="text-[13px] text-white/70 self-start">Ahora</span>
        </div>
      `;
      document.body.appendChild(notification);

      setTimeout(() => {
        notification.remove();
      }, 3000);
    };

    showNotification();
    notificationShown.current = true;
  }, [id, getFormReward]);

  return (
    <div className="min-h-screen bg-[#F1F2FF] p-4">
      {/* Modal de Transferência */}
      <TransferModal
        isOpen={isTransferModalOpen}
        onClose={() => setIsTransferModalOpen(false)}
      />

      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-3xl shadow-lg overflow-hidden mb-8">
          <img
            src="https://i.ibb.co/H3L6jF9/img-formulario.png"
            alt="Confeitaria Las Violetas"
            className="w-full h-48 object-cover"
          />

          <div className="p-6">
            <h1 className="text-2xl font-semibold mb-4">
              Confeitaria Las Violetas
            </h1>

            <p className="text-gray-700 mb-4">
              Gracias por responder a este formulario.
              <br />
              Su dinero se ha añadido a sua saldo y está disponible para ser
              retirado.
            </p>

            <div className="mb-6">
              <p className="flex items-center gap-2 mb-2">
                <span className="text-gray-700">Añadido a su cuenta:</span>
                <span className="text-[#00A650] font-medium">
                  + US$ {getFormReward(id || "").toFixed(2)}
                </span>
              </p>

              <div className="bg-[#F1F2FF] rounded-xl p-4">
                <div className="flex items-center gap-2">
                  <Wallet className="w-5 h-5 text-[#1A0FB0]" />
                  <span className="text-gray-700">Mi sueldo</span>
                </div>
                <p className="text-[#00A650] font-medium mt-1">
                  US$ {userData.salary.toFixed(2)}
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsTransferModalOpen(true)}
              className="w-full bg-[#1A0FB0] text-white py-4 rounded-xl font-medium flex items-center justify-center gap-2 mb-4"
            >
              <img
                src="https://i.ibb.co/ycd47ZT9/paypal-1.png"
                alt="PayPal"
                className="w-5 h-5"
              />
              Transferir dinero
            </button>

            <Link
              to="/"
              className="block text-center text-[#1A0FB0] underline font-medium"
            >
              Volver a la página de inicio
            </Link>
          </div>
        </div>

        <div className="mb-20">
          <h2 className="text-[#1A0FB0] text-xl font-semibold mb-4">
            Formulários disponibles:
          </h2>

          {[1, 2, 3].map((index) => (
            <Link
              key={index}
              to={`/form/${index}`}
              className="block bg-white rounded-xl p-4 mb-3 shadow-sm"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-[#1A0FB0] font-medium">
                    {availableForms[index - 1].title}
                  </h3>
                  <p className="text-gray-500">
                    {availableForms[index - 1].type}
                  </p>
                </div>
                <span className="text-[#00A650] font-medium">
                  + $ {getFormReward(index.toString()).toFixed(2)}
                </span>
              </div>
            </Link>
          ))}
          <p className="text-center text-[#1A0FB0] underline font-medium">
            Ver todos los formularios
          </p>
        </div>

        {/* Menu de navegação */}
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t py-4">
          <div className="container mx-auto px-8">
            <div className="flex justify-between items-center">
              <Link to="/" className="text-[#1A0FB0]">
                <Home className="w-6 h-6" />
              </Link>
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
    </div>
  );
}
