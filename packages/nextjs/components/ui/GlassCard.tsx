import React, { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
}

export const GlassCard = ({ children, className = "" }: GlassCardProps) => {
  return <div className={`glass-effect rounded-2xl p-6 md:p-8 animate-fade-in ${className}`}>{children}</div>;
};
