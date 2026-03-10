"use client";

import { useState } from "react";
import { NextPage } from "next";
import { useForm } from "react-hook-form";
import { useAccount } from "wagmi";
import { GlassCard } from "~~/components/ui/GlassCard";
import { GradientButton } from "~~/components/ui/GradientButton";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

const Create: NextPage = () => {
  const { address: connectedAddress } = useAccount();
  const { writeContractAsync: createCuchubal } = useScaffoldWriteContract("Cuchulink");
  const [isTxLoading, setIsTxLoading] = useState(false);

  const { register, handleSubmit } = useForm({
    defaultValues: {
      nombre: "",
      montoPorRonda: "",
      fechaInicio: "1",
      numParticipantes: "",
      codigo: "",
    },
  });

  return (
    <>
      <div className="bg-glow-blob top-0 left-[-100px]" />
      <div className="bg-glow-blob bottom-[-200px] right-[-100px]" style={{ animationDelay: "-5s" }} />

      <div className="flex items-center flex-col flex-grow pt-10 px-4">
        <div className="text-center max-w-3xl mb-8 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Crea tu <span className="text-gradient">Cuchubal</span>
          </h1>
          <p className="text-lg text-slate-300">
            Establece las reglas y comienza a ahorrar con tu círculo de confianza.
          </p>
        </div>

        {connectedAddress ? (
          <GlassCard className="w-full max-w-2xl mb-12">
            <form
              onSubmit={handleSubmit(async data => {
                setIsTxLoading(true);
                try {
                  await createCuchubal({
                    functionName: "createCuchubal",
                    args: [
                      data.nombre,
                      BigInt(Math.round(Number(data.montoPorRonda) * 10 ** 18)),
                      BigInt(data.fechaInicio),
                      BigInt(data.numParticipantes),
                      data.codigo,
                    ],
                    value: BigInt(Math.round(Number(data.montoPorRonda) * 10 ** 18)),
                  });
                } catch (error) {
                  console.error("Error:", error);
                } finally {
                  setIsTxLoading(false);
                }
              })}
              className="flex flex-col gap-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="nombre" className="text-sm font-medium text-slate-300">
                    Nombre del Cuchubal
                  </label>
                  <input
                    type="text"
                    {...register("nombre")}
                    className="bg-black/20 border border-slate-700/50 rounded-xl px-4 py-3 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all text-white"
                    placeholder="Ej. Viaje a Cancún"
                    required
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="codigo" className="text-sm font-medium text-slate-300">
                    Código de Invitación <span className="text-indigo-400 text-xs ml-1">(Único)</span>
                  </label>
                  <input
                    type="text"
                    {...register("codigo")}
                    className="bg-black/20 border border-slate-700/50 rounded-xl px-4 py-3 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all text-white"
                    placeholder="Ej. viaje-2024"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="montoPorRonda" className="text-sm font-medium text-slate-300">
                    Monto inicial a depositar (ETH)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      {...register("montoPorRonda")}
                      step="0.0001"
                      min="0"
                      className="w-full bg-black/20 border border-slate-700/50 rounded-xl pl-4 pr-12 py-3 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all text-white"
                      placeholder="0.05"
                      required
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                      <span className="text-slate-400 font-medium">ETH</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="numParticipantes" className="text-sm font-medium text-slate-300">
                    Número de Participantes
                  </label>
                  <input
                    type="number"
                    {...register("numParticipantes")}
                    min="2"
                    className="bg-black/20 border border-slate-700/50 rounded-xl px-4 py-3 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all text-white"
                    placeholder="Ej. 10"
                    required
                  />
                </div>
              </div>

              <div className="mt-4">
                <GradientButton type="submit" className="w-full py-4 text-lg" isLoading={isTxLoading}>
                  Crear e Iniciar Cuchubal
                </GradientButton>
                <p className="text-center text-xs text-slate-400 mt-4">
                  Esta acción requiere una transacción en la blockchain por el monto inicial indicado.
                </p>
              </div>
            </form>
          </GlassCard>
        ) : (
          <GlassCard className="w-full max-w-lg text-center">
            <div className="py-8">
              <div className="mb-4">
                <svg
                  className="mx-auto h-12 w-12 text-indigo-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-2">Billetera de Creador Necesaria</h3>
              <p className="text-sm text-slate-400">
                Por favor conecta tu billetera en la esquina superior derecha para poder crear un nuevo Cuchubal.
              </p>
            </div>
          </GlassCard>
        )}
      </div>
    </>
  );
};

export default Create;
