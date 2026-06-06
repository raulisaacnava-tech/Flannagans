import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  Camera,
  Check,
  Clock,
  Euro,
  Languages,
  LayoutDashboard,
  Server,
  ShieldCheck,
  Smartphone,
  Tag,
  Utensils,
  Wrench,
  X,
} from 'lucide-react';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';

export const metadata: Metadata = {
  title: 'Plan Piloto Fundador',
  description:
    'Oferta fundadora para Flanagans: landing, menu digital, QR, panel admin, hosting y soporte por una mensualidad especial de piloto.',
};

const founderBenefits = [
  'Alta inicial a 0 euros',
  '69 euros al mes durante el arranque',
  'Permanencia minima de 3 meses',
  'Despues, mensualidad estable de 89 euros',
];

const includedItems = [
  ['Landing del restaurante', 'Una pagina moderna para presentar Flanagans, ubicacion, reservas, delivery y marca.'],
  ['Menu digital visual', 'Carta movil con categorias, favoritos, precios, promociones, videos y vista tipo app.'],
  ['QR listo para sala', 'Acceso directo desde mesas, barra o escaparate sin depender de cartas impresas.'],
  ['Panel administrativo', 'Gestion de platos, precios, fotos, disponibilidad, promociones y contenido web.'],
  ['Hosting incluido', 'El servidor y el mantenimiento tecnico quedan cubiertos dentro de la mensualidad.'],
  ['Soporte basico', 'Ajustes menores y ayuda tecnica para mantener el sistema funcionando.'],
];

const excludedItems = [
  'Dominio del cliente',
  'Fotografia profesional',
  'Videos profesionales',
  'Campanas de anuncios',
  'Rediseno grande posterior',
  'Funciones especiales fuera del sistema base',
];

const proofShots = [
  {
    title: 'Menu visual movil',
    text: 'El cliente ve platos, precio y promo sin navegar por una carta plana.',
    src: '/capturas/menu movil.jpg',
    type: 'mobile',
  },
  {
    title: 'Video destacado',
    text: 'La carta tambien puede vender con clips verticales de los platos principales.',
    src: '/capturas/menu movil 2.jpg',
    type: 'mobile',
  },
  {
    title: 'Multiidiomas',
    text: 'Pensado para turistas y clientes que prefieren leer la carta en otro idioma.',
    src: '/capturas/menu multiidiomas.jpg',
    type: 'mobile',
  },
  {
    title: 'Filtro por alergenos',
    text: 'Busqueda por alergenos e ingredientes para una experiencia mas clara.',
    src: '/capturas/alergenos en el menu.jpg',
    type: 'mobile',
  },
];

const adminShots = [
  {
    title: 'Dashboard de control',
    text: 'Resumen de productos, categorias, destacados, videos y oportunidades de venta.',
    src: '/capturas/dashboard admin.jpg',
  },
  {
    title: 'Gestion de carta',
    text: 'Editar platos, precios, imagenes, disponibilidad y destacados desde una tabla clara.',
    src: '/capturas/gestion de carta.jpg',
  },
  {
    title: 'Promociones',
    text: 'Activar promos para portada, banner del menu o campanas concretas.',
    src: '/capturas/promociones.jpg',
  },
  {
    title: 'Configuracion',
    text: 'Actualizar datos del local, horarios, logo, contacto y ajustes generales.',
    src: '/capturas/configuracion.jpg',
  },
];

const timeline = [
  ['Hoy', 'Alta inicial a 0 euros para este piloto fundador.'],
  ['Mes 1 a 3', '69 euros al mes con hosting, mantenimiento y soporte basico incluidos.'],
  ['Desde mes 4', '89 euros al mes para continuar con el sistema activo y mantenido.'],
];

function ScreenShot({
  src,
  alt,
  mobile = false,
}: {
  src: string;
  alt: string;
  mobile?: boolean;
}) {
  return (
    <div
      className={`relative overflow-hidden border border-white/10 bg-black ${
        mobile ? 'mx-auto aspect-[9/16] w-full max-w-[15rem]' : 'aspect-[16/8.8] w-full'
      }`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={mobile ? '(max-width: 768px) 70vw, 240px' : '(max-width: 1024px) 92vw, 720px'}
        className="object-cover"
      />
    </div>
  );
}

export default function OfferPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-cream selection:bg-primary selection:text-secondary">
      <SiteHeader />

      <main>
        <section className="relative overflow-hidden bg-[#080604] pt-32 pb-14 sm:pt-40 lg:pt-44 lg:pb-20">
          <div className="absolute inset-0 hero-fire-wash opacity-40" aria-hidden="true" />
          <div className="absolute inset-x-0 bottom-0 h-px bg-primary/30" aria-hidden="true" />

          <div className="site-container relative z-10">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_25rem] lg:items-end">
              <div>
                <p className="mb-5 inline-flex bg-primary px-3 py-2 font-display text-xs font-black uppercase tracking-[0.14em] text-secondary">
                  Oferta unica para Flanagans
                </p>
                <h1 className="max-w-5xl font-display text-5xl font-black uppercase leading-[0.88] text-cream sm:text-6xl lg:text-7xl">
                  Plan Piloto Fundador
                </h1>
                <p className="mt-7 max-w-2xl text-lg font-semibold leading-relaxed text-cream/72">
                  Flanagans seria el restaurante modelo: la primera version real del sistema, con una tarifa fundadora que no se repetira para otros locales.
                </p>
                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/menu"
                    className="inline-flex min-h-14 items-center justify-center gap-2 bg-primary px-7 py-4 font-display text-sm font-black uppercase tracking-[0.12em] text-secondary premium-cta"
                  >
                    Ver menu demo
                    <ArrowRight size={17} />
                  </Link>
                  <Link
                    href="/admin/login"
                    className="inline-flex min-h-14 items-center justify-center border border-white/20 px-7 py-4 font-display text-sm font-black uppercase tracking-[0.12em] text-cream hover:bg-white/5"
                  >
                    Ver panel admin
                  </Link>
                </div>
              </div>

              <aside className="border border-primary/35 bg-black/70 p-6 shadow-[0_24px_70px_rgba(0,0,0,0.35)]">
                <div className="flex items-center gap-3 text-primary">
                  <ShieldCheck size={24} />
                  <span className="font-display text-sm font-black uppercase tracking-[0.14em]">
                    Piloto fundador
                  </span>
                </div>
                <p className="mt-6 font-display text-7xl font-black leading-none text-primary">69</p>
                <p className="mt-2 font-display text-xl font-black uppercase text-cream">euros al mes</p>
                <p className="mt-5 text-sm font-semibold leading-relaxed text-cream/68">
                  Alta inicial a 0 euros. Permanencia minima de 3 meses. Luego sube a 89 euros al mes.
                </p>
              </aside>
            </div>

            <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {founderBenefits.map((item) => (
                <div key={item} className="border border-white/10 bg-white/[0.03] p-4">
                  <Check className="mb-4 text-primary" size={18} />
                  <p className="text-sm font-black uppercase leading-snug text-cream">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-primary py-16 text-secondary lg:py-20">
          <div className="site-container">
            <div className="grid gap-8 lg:grid-cols-[0.75fr_1fr] lg:items-center">
              <div>
                <h2 className="font-display text-4xl font-black uppercase leading-none sm:text-5xl lg:text-6xl">
                  El precio fundador es el gancho
                </h2>
                <p className="mt-5 max-w-xl text-base font-bold leading-relaxed text-secondary/76">
                  En vez de cobrar una implantacion inicial grande, este piloto arranca con alta a 0 euros y una mensualidad reducida para validar el sistema con Flanagans como restaurante fundador.
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                {timeline.map(([label, text]) => (
                  <article key={label} className="border-2 border-secondary bg-secondary p-5 text-cream">
                    <Clock className="mb-8 text-primary" size={22} />
                    <h3 className="font-display text-2xl font-black uppercase">{label}</h3>
                    <p className="mt-3 text-sm font-semibold leading-relaxed text-cream/70">{text}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#050505] py-20 lg:py-28">
          <div className="site-container">
            <div className="mb-10 grid gap-5 lg:grid-cols-[0.72fr_1fr] lg:items-end">
              <h2 className="font-display text-4xl font-black uppercase leading-none sm:text-5xl lg:text-6xl">
                Lo que ya puede ver el cliente
              </h2>
              <p className="max-w-2xl text-base font-semibold leading-relaxed text-cream/62">
                La propuesta no es teoria. Ya hay una experiencia movil pensada para vender: videos, carta visual, promos, busqueda por alergenos y selector de idioma.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {proofShots.map((shot) => (
                <article key={shot.title} className="border border-white/10 bg-[#0A0A0A] p-4">
                  <ScreenShot src={shot.src} alt={shot.title} mobile={shot.type === 'mobile'} />
                  <h3 className="mt-5 font-display text-lg font-black uppercase text-cream">{shot.title}</h3>
                  <p className="mt-2 text-sm font-semibold leading-relaxed text-cream/58">{shot.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#0A0A0A] py-20 lg:py-28">
          <div className="site-container">
            <div className="mb-10 grid gap-5 lg:grid-cols-[0.55fr_1fr] lg:items-end">
              <div>
                <p className="mb-4 inline-flex bg-primary px-3 py-2 font-display text-xs font-black uppercase tracking-[0.14em] text-secondary">
                  Panel propio
                </p>
                <h2 className="font-display text-4xl font-black uppercase leading-none sm:text-5xl lg:text-6xl">
                  No depende de nadie para cambiar la carta
                </h2>
              </div>
              <p className="max-w-2xl text-base font-semibold leading-relaxed text-cream/62">
                El panel convierte la web en una herramienta diaria: actualizar horarios, subir imagenes, activar promociones y editar productos sin esperar a un proveedor.
              </p>
            </div>

            <div className="grid gap-5 lg:grid-cols-2">
              {adminShots.map((shot) => (
                <article key={shot.title} className="border border-white/10 bg-black p-4 sm:p-5">
                  <ScreenShot src={shot.src} alt={shot.title} />
                  <h3 className="mt-5 font-display text-xl font-black uppercase text-cream">{shot.title}</h3>
                  <p className="mt-2 text-sm font-semibold leading-relaxed text-cream/58">{shot.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#050505] py-20 lg:py-28">
          <div className="site-container">
            <div className="grid gap-5 lg:grid-cols-[1fr_0.75fr]">
              <article className="border border-primary/35 bg-[#0A0A0A] p-6 sm:p-8 lg:p-10">
                <div className="flex items-center gap-3 text-primary">
                  <Euro size={25} />
                  <span className="font-display text-sm font-black uppercase tracking-[0.14em]">
                    Mensualidad fundadora
                  </span>
                </div>
                <div className="mt-9 grid gap-8 sm:grid-cols-[auto_1fr] sm:items-end">
                  <div>
                    <p className="font-display text-8xl font-black leading-none text-primary">69</p>
                    <p className="mt-2 font-display text-xl font-black uppercase text-cream">euros / mes</p>
                  </div>
                  <p className="max-w-md text-base font-semibold leading-relaxed text-cream/68">
                    Durante los 3 primeros meses. Incluye landing, menu digital, QR, panel admin, hosting, mantenimiento tecnico, soporte basico y ajustes menores.
                  </p>
                </div>
                <div className="mt-9 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {[
                    ['Alta inicial', '0 euros'],
                    ['Permanencia', '3 meses'],
                    ['Despues', '89 euros / mes'],
                  ].map(([label, value]) => (
                    <div key={label} className="border border-white/10 bg-white/[0.03] p-4">
                      <p className="text-xs font-black uppercase tracking-[0.12em] text-cream/45">{label}</p>
                      <p className="mt-2 font-display text-2xl font-black uppercase text-cream">{value}</p>
                    </div>
                  ))}
                </div>
              </article>

              <article className="border border-white/10 bg-primary p-6 text-secondary sm:p-8 lg:p-10">
                <Camera size={28} />
                <h3 className="mt-7 font-display text-3xl font-black uppercase leading-none sm:text-4xl">
                  Fotografia opcional
                </h3>
                <p className="mt-5 text-base font-bold leading-relaxed text-secondary/75">
                  La sesion profesional no va incluida en la mensualidad. Si se quiere arrancar con fotos nuevas, se suma como coste adicional.
                </p>
                <div className="mt-8 border-2 border-secondary bg-secondary p-5 text-cream">
                  <p className="text-xs font-black uppercase tracking-[0.14em] text-primary">Sesion de 1 dia</p>
                  <p className="mt-2 font-display text-4xl font-black uppercase">150 a 250 euros</p>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="bg-primary py-20 text-secondary lg:py-24">
          <div className="site-container">
            <div className="grid gap-10 lg:grid-cols-[0.55fr_1fr]">
              <div>
                <h2 className="font-display text-4xl font-black uppercase leading-none sm:text-5xl lg:text-6xl">
                  Incluido y fuera de alcance
                </h2>
                <p className="mt-5 max-w-md text-base font-bold leading-relaxed text-secondary/72">
                  La oferta queda clara desde el primer dia: se incluye todo lo necesario para operar el sistema base, sin esconder costes tecnicos mensuales.
                </p>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="border-2 border-secondary bg-secondary p-5 text-cream sm:p-6">
                  <h3 className="mb-5 font-display text-2xl font-black uppercase text-primary">Incluye</h3>
                  <div className="space-y-4">
                    {includedItems.map(([title, text]) => (
                      <div key={title} className="flex gap-3">
                        <Check className="mt-1 shrink-0 text-primary" size={18} />
                        <div>
                          <p className="text-sm font-black uppercase text-cream">{title}</p>
                          <p className="mt-1 text-sm font-semibold leading-relaxed text-cream/62">{text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-2 border-secondary bg-white p-5 sm:p-6">
                  <h3 className="mb-5 font-display text-2xl font-black uppercase text-secondary">No incluye</h3>
                  <div className="space-y-3">
                    {excludedItems.map((item) => (
                      <div key={item} className="flex items-center gap-3 border-b border-secondary/10 pb-3 last:border-b-0">
                        <X className="shrink-0 text-accent-red" size={18} />
                        <p className="text-sm font-black uppercase text-secondary/78">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#0A0A0A] py-20 lg:py-28">
          <div className="site-container">
            <div className="mb-10 max-w-3xl">
              <h2 className="font-display text-4xl font-black uppercase leading-none sm:text-5xl lg:text-6xl">
                Lo que Flanagans gana desde el primer mes
              </h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                [Smartphone, 'Una carta que se siente como app', 'El cliente puede elegir viendo imagenes, videos, precios y promociones.'],
                [LayoutDashboard, 'Control del negocio', 'Cambios de carta y promociones desde el panel, sin depender de terceros para cada ajuste.'],
                [Languages, 'Mejor experiencia para turistas', 'Idiomas integrados para vender mejor a clientes que no leen la carta en espanol.'],
                [Tag, 'Promos visibles', 'Banners y ofertas dentro del menu para mover ticket medio y productos concretos.'],
              ].map(([Icon, title, text]) => {
                const FeatureIcon = Icon as typeof Smartphone;
                return (
                  <article key={title as string} className="border border-white/10 bg-black p-5 sm:p-6">
                    <FeatureIcon className="text-primary" size={24} />
                    <h3 className="mt-8 font-display text-xl font-black uppercase text-cream">{title as string}</h3>
                    <p className="mt-3 text-sm font-semibold leading-relaxed text-cream/58">{text as string}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-accent-red py-20 text-white lg:py-24">
          <div className="site-container">
            <div className="grid gap-10 lg:grid-cols-[0.56fr_1fr] lg:items-start">
              <div>
                <p className="mb-4 inline-flex bg-white px-3 py-2 font-display text-xs font-black uppercase tracking-[0.14em] text-accent-red">
                  Decision sencilla
                </p>
                <h2 className="font-display text-4xl font-black uppercase leading-none sm:text-5xl lg:text-6xl">
                  Para arrancar solo hay dos caminos
                </h2>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <article className="border border-white/25 bg-white p-6 text-secondary">
                  <Server className="text-accent-red" size={25} />
                  <h3 className="mt-8 font-display text-2xl font-black uppercase">Sin sesion de fotos</h3>
                  <p className="mt-4 text-sm font-bold leading-relaxed text-secondary/68">
                    Se publica con el material existente y Flanagans paga solo la mensualidad del piloto.
                  </p>
                  <p className="mt-8 font-display text-4xl font-black uppercase">69 euros / mes</p>
                </article>
                <article className="border border-white/25 bg-secondary p-6 text-cream">
                  <Utensils className="text-primary" size={25} />
                  <h3 className="mt-8 font-display text-2xl font-black uppercase">Con sesion de fotos</h3>
                  <p className="mt-4 text-sm font-bold leading-relaxed text-cream/68">
                    Se suma una jornada visual para que la carta arranque con material propio y mas apetecible.
                  </p>
                  <p className="mt-8 font-display text-4xl font-black uppercase text-primary">
                    69 euros / mes + fotos
                  </p>
                </article>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#050505] py-16">
          <div className="site-container">
            <div className="grid gap-6 border border-primary/25 bg-[#0A0A0A] p-6 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <h2 className="font-display text-3xl font-black uppercase leading-tight text-cream sm:text-4xl">
                  Una oferta pensada para que Flanagans sea el caso fundador
                </h2>
                <p className="mt-4 max-w-3xl text-sm font-semibold leading-relaxed text-cream/62 sm:text-base">
                  El cliente mantiene su dominio. La mensualidad cubre servidor, mantenimiento tecnico, soporte basico y ajustes menores. La fotografia profesional queda como extra opcional, sin obligar al restaurante a contratarla para arrancar.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <Link
                  href="/menu"
                  className="inline-flex min-h-14 items-center justify-center gap-2 bg-primary px-7 py-4 font-display text-sm font-black uppercase tracking-[0.12em] text-secondary premium-cta"
                >
                  Revisar demo
                  <ArrowRight size={17} />
                </Link>
                <Link
                  href="/#reservations"
                  className="inline-flex min-h-14 items-center justify-center gap-2 border border-white/20 px-7 py-4 font-display text-sm font-black uppercase tracking-[0.12em] text-cream hover:bg-white/5"
                >
                  Contacto
                  <Wrench size={17} />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
