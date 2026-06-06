'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AlertTriangle, Eye, EyeOff, Flame, Lock } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

export const AdminLogin: React.FC = () => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/admin/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (response.ok) {
        router.refresh();
        router.push('/admin');
      } else {
        const data = (await response.json().catch(() => null)) as { message?: string } | null;
        setError(data?.message || 'Contrasena incorrecta. Por favor, vuelve a intentarlo.');
      }
    } catch {
      setError('No se pudo verificar el acceso. Revisa la conexion e intentalo de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative select-none">
      <div className="sm:mx-auto sm:w-full sm:max-w-md space-y-6 relative z-10 text-center">
        <div className="inline-flex p-3 rounded-none bg-[#0A0A0A] border border-primary/20 text-primary mb-2">
          <Flame size={36} className="fill-primary" />
        </div>
        <h2 className="font-display font-black text-3xl text-cream uppercase tracking-wider">
          Acceso Administrador
        </h2>
        <p className="text-xs text-cream/40 font-mono uppercase tracking-widest leading-relaxed">
          Flanagans Burguer - Carta Digital
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10 p-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-[#0A0A0A] border border-white/10 rounded-none p-8 shadow-none space-y-6"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="pass" className="block text-xs font-bold text-cream/60 uppercase tracking-widest">
                Contrasena de acceso
              </label>

              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-cream/30">
                  <Lock size={16} />
                </span>

                <input
                  id="pass"
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Introduce la contrasena"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 focus:border-primary text-cream placeholder-cream/20 rounded-none pl-11 pr-12 py-3.5 text-sm focus:outline-none transition-all duration-300 font-medium"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-cream/35 hover:text-cream transition-colors"
                  aria-label={showPassword ? 'Ocultar contrasena' : 'Mostrar contrasena'}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-red-500/10 border border-red-500/20 text-accent-red text-xs font-semibold px-4 py-3.5 rounded-none flex items-start gap-2.5"
                >
                  <AlertTriangle size={16} className="shrink-0" />
                  <span>{error}</span>
                </motion.div>
              )}
            </AnimatePresence>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-primary hover:bg-yellow-400 text-secondary font-display font-black text-sm uppercase tracking-widest rounded-none shadow-none transition-all duration-300 active:scale-95 disabled:opacity-50 cursor-pointer"
            >
              {isLoading ? 'Verificando...' : 'Acceder al Panel'}
            </button>
          </form>

          <div className="pt-4 border-t border-white/10 text-center space-y-2">
            <span className="block text-[10px] text-cream/30 font-mono uppercase tracking-wide">
              Seguridad del piloto
            </span>
            <p className="text-[9px] text-cream/20 font-mono leading-normal">
              Sesion protegida con cookie HttpOnly. Para produccion, conecta un proveedor Auth y roles por restaurante.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminLogin;
