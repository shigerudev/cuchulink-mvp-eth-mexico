"use client";

import Link from "next/link";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { GlassCard } from "~~/components/ui/GlassCard";
import { GradientButton } from "~~/components/ui/GradientButton";

const Home: NextPage = () => {
  const { address: connectedAddress } = useAccount();

  return (
    <>
      <div className="bg-glow-blob top-0 left-[-100px]" />
      <div className="bg-glow-blob bottom-[-200px] right-[-100px]" style={{ animationDelay: "-5s" }} />

      <div className="flex items-center justify-center flex-col flex-grow pt-10 px-4">
        <div className="text-center max-w-3xl mb-12 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Bienvenido a <span className="text-gradient">Cuchulink</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300">
            La forma transparente, segura y descentralizada de organizar fondos entre amigos y comunidades. Únete a la
            revolución web3.
          </p>
        </div>

        <GlassCard className="w-full max-w-lg text-center flex flex-col gap-6">
          {connectedAddress ? (
            <>
              <h2 className="text-2xl font-semibold mb-2">Comienza ahora</h2>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/create" className="w-full sm:w-auto">
                  <GradientButton className="w-full">Crear Cuchubal</GradientButton>
                </Link>
                <Link href="/search" className="w-full sm:w-auto">
                  <button className="w-full px-6 py-3 rounded-xl font-semibold text-white border border-indigo-500/30 hover:bg-indigo-500/10 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]">
                    Unirse a Cuchubal
                  </button>
                </Link>
              </div>
            </>
          ) : (
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
                    d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-2">Conecte su wallet</h3>
              <p className="text-sm text-slate-400">
                Para interactuar con la plataforma, por favor conecta tu billetera en la parte superior derecha.
              </p>
            </div>
          )}
        </GlassCard>
      </div>
    </>
  );
};

export default Home;
