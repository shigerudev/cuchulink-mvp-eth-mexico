"use client";

import { useState } from "react";
import { NextPage } from "next";
import { useForm } from "react-hook-form";
import { parseEther } from "viem";
import { GlassCard } from "~~/components/ui/GlassCard";
import { GradientButton } from "~~/components/ui/GradientButton";
import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

const Search: NextPage = () => {
  const [search, setSearch] = useState("");
  const [isTxLoading, setIsTxLoading] = useState(false);

  const { register, handleSubmit } = useForm({
    defaultValues: {
      codigo: "",
    },
  });

  const { data: cuchubalInfo, isLoading: isLoadingChubalInfo } = useScaffoldReadContract({
    contractName: "Cuchulink",
    functionName: "getCuchubalInfo",
    args: [search],
  });

  const { writeContractAsync: joinCuchubal } = useScaffoldWriteContract("Cuchulink");

  const handleJoin = async () => {
    if (!search || !cuchubalInfo) return;
    setIsTxLoading(true);
    try {
      await joinCuchubal({
        functionName: "joinCuchubal",
        args: [search],
        // El monto de la ronda es el index 1 del retorno (amount in Wei)
        value: cuchubalInfo[1],
      });
    } catch (e) {
      console.error(e);
    } finally {
      setIsTxLoading(false);
    }
  };

  return (
    <>
      <div className="bg-glow-blob top-0 left-[-100px]" />
      <div className="bg-glow-blob bottom-[-200px] right-[-100px]" style={{ animationDelay: "-5s" }} />

      <div className="flex items-center flex-col flex-grow pt-10 px-4">
        <div className="text-center max-w-3xl mb-8 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Unirse a un <span className="text-gradient">Cuchubal</span>
          </h1>
          <p className="text-lg text-slate-300">
            Ingresa el código de invitación para ver los detalles y depositar tu primera cuota.
          </p>
        </div>

        <GlassCard className="w-full max-w-2xl mb-8">
          <form
            onSubmit={handleSubmit(async data => {
              setSearch(data.codigo);
            })}
            className="flex flex-col md:flex-row gap-4 items-end"
          >
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="codigo" className="text-sm font-medium text-slate-300">
                Código de Invitación
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                  <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  {...register("codigo")}
                  className="w-full bg-black/20 border border-slate-700/50 rounded-xl pl-12 pr-4 py-3 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all text-white"
                  placeholder="Ej. viaje-2024"
                  required
                />
              </div>
            </div>

            <GradientButton type="submit" className="w-full md:w-auto py-3 px-8 whitespace-nowrap">
              Buscar
            </GradientButton>
          </form>
        </GlassCard>

        {search && (
          <div className="w-full max-w-2xl animate-fade-in">
            {isLoadingChubalInfo ? (
              <div className="flex justify-center py-12">
                <svg
                  className="animate-spin h-8 w-8 text-indigo-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              </div>
            ) : cuchubalInfo && cuchubalInfo[0] ? (
              <div className="bg-gradient-to-br from-indigo-900/40 to-purple-900/40 border border-indigo-500/30 rounded-3xl overflow-hidden shadow-[0_0_40px_rgba(99,102,241,0.15)] backdrop-blur-md relative">
                {/* Decorative circle */}
                <div className="absolute -right-24 -top-24 w-48 h-48 bg-indigo-500/20 rounded-full blur-2xl"></div>

                <div className="p-8 pb-6 border-b border-white/10 flex justify-between items-start">
                  <div>
                    <span className="text-xs font-bold tracking-widest text-indigo-300 uppercase mb-1 block">
                      Ticket de Entrada
                    </span>
                    <h2 className="text-3xl font-bold text-white mb-2">{cuchubalInfo[0]}</h2>
                    <p className="text-slate-400 text-sm">
                      Código: <span className="text-white font-mono bg-white/10 px-2 py-0.5 rounded">{search}</span>
                    </p>
                  </div>
                  <div className="bg-indigo-500/20 text-indigo-300 px-3 py-1 rounded-full text-sm font-medium border border-indigo-500/30">
                    Ronda Activa
                  </div>
                </div>

                <div className="p-8 grid grid-cols-2 gap-8">
                  <div>
                    <p className="text-slate-400 text-sm mb-1">Monto por Ronda</p>
                    <p className="text-2xl font-semibold text-white">
                      {parseEther(String(Number(cuchubalInfo[1])))} <span className="text-sm text-indigo-300">ETH</span>
                    </p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm mb-1">Participantes</p>
                    <p className="text-2xl font-semibold text-white">
                      {Number(cuchubalInfo[4])} <span className="text-sm text-slate-500">MÁX</span>
                    </p>
                  </div>
                </div>

                <div className="p-6 bg-black/40">
                  <GradientButton
                    onClick={handleJoin}
                    isLoading={isTxLoading}
                    className="w-full py-4 text-lg shadow-[0_0_20px_rgba(99,102,241,0.4)] hover:shadow-[0_0_30px_rgba(99,102,241,0.6)]"
                  >
                    Depositar y Unirse
                  </GradientButton>
                </div>
              </div>
            ) : (
              <GlassCard className="text-center py-12">
                <svg
                  className="mx-auto h-12 w-12 text-slate-600 mb-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p className="text-slate-400">No se encontró ningún Cuchubal con ese código.</p>
              </GlassCard>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Search;
