# Flanagans Burguer - Carta Interactiva Premium 🍔✨

Este es el MVP (Producto Mínimo Viable) de la nueva experiencia de menú visual interactivo y mobile-first para la hamburguesería **Flanagans Burguer**. 

El objetivo es transformar la carta aburrida (como PDFs tradicionales o listas simples) en una potente herramienta de venta inmersiva inspirada en experiencias modernas tipo Gourmeats, mezclando la agilidad de Webflow/Framer en un diseño casual premium.

---

## 🚀 Características Clave

1. **Mobile-First Real & Ergonómico**: Pensado para ser operado con una sola mano de forma súper cómoda (menús al alcance del pulgar, barra de categorías sticky y scrollable).
2. **Mini Portada Inmersiva Móvil**: Si el usuario entra desde un smartphone (o escanea un QR en local), se le recibe con una portada de impacto y un CTA directo al grano: `"Ver carta"`.
3. **Carta Dual Interactiva (`/menu`)**:
   - **Vista Menú**: Grid clásico interactivo súper visual con imágenes apetitosas, buscador reactivo, etiquetas de campaña y control rápido de favoritos.
   - **Vista Vídeo**: Experiencia vertical inmersiva tipo Reels/TikTok con auto-reproducción silenciosa de vídeos cortos y placeholders con animación Ken Burns lenta para captar el antojo de inmediato.
4. **Venta Cruzada Inteligente (Growth)**: Sugerencia automatizada de combos en modal detallado (ej. batidos sugeridos al añadir una burger) y sección "Completa tu pedido" en el carrito para elevar el ticket medio.
5. **Carrito WhatsApp & Modo Camarero**:
   - Envía el pedido formateado por WhatsApp detallando extras, mesa de comensal y notas de cocina.
   - **Modo Camarero**: Interfaz de alto contraste y letras gigantes a pantalla completa para mostrar los platos directamente al camarero del local.
6. **Panel Administrativo CRUD (`/admin`)**: Panel de control oscuro premium para crear, editar, eliminar platos, cambiar precios al instante y gestionar la venta visual del restaurante (orden, Burger del Mes, campañas activas, etc.).

---

## 🛠️ Stack Tecnológico

- **Framework**: [Next.js 15+](https://nextjs.org/) (App Router)
- **Lenguaje**: [TypeScript](https://www.typescriptlang.org/)
- **Estilos**: [Tailwind CSS v4](https://tailwindcss.com/) (Sistema de diseño premium con CSS-first variables)
- **Animaciones**: [Framer Motion / Motion](https://www.framer.com/motion/) (Microinteracciones refinadas de tap, modal spring y slides fluidos)
- **Iconografía**: [Lucide React](https://lucide.dev/)

---

## 📦 Instalación y Ejecución Local

Para correr este proyecto en local, sigue estos sencillos pasos:

1. **Clonar el repositorio o situarse en el directorio**:
   ```bash
   cd "f:\Flannagans qr"
   ```

2. **Instalar dependencias**:
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Configurar variables de entorno**:
   Copia el archivo `.env.example` como `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
   *(El archivo contiene la contraseña temporal por defecto `ADMIN_PASSWORD=Mostoles987`)*

4. **Correr en modo desarrollo**:
   ```bash
   npm run dev
   ```
   La aplicación estará lista en [http://localhost:3000](http://localhost:3000).

5. **Compilar para producción**:
   ```bash
   npm run build
   ```

---

## 🗺️ Mapa de Rutas

- `/` : Landing Page Premium (mini-portada inmersiva si se detecta móvil).
- `/menu` : Menú interactivo visual con alternador de Vista Menú y Vista Vídeo.
- `/admin/login` : Acceso protegido para el gestor de la carta.
- `/admin` : Panel de control CRUD y herramientas de Venta Visual.

---

## 🔑 Credenciales del Administrador

- **Contraseña Temporal**: `Mostoles987`

> [!WARNING]
> **Nota de Seguridad del MVP**: Esta contraseña se procesa a nivel de cliente para la demostración rápida del MVP. No debe usarse como seguridad real de producción. Consulta la guía de migración abajo para implementar autenticación robusta.

---

## ⚡ Guía de Migración a Supabase (Producción)

La arquitectura del MVP cuenta con una **capa de abstracción limpia** (`src/lib/menu-store.ts`) que aísla por completo las vistas de la persistencia de datos. Para migrar a un backend real con Supabase:

### 1. Base de Datos (Supabase Database)
Crea las tablas `products`, `categories`, `extras` y `restaurant` en tu consola de Supabase. A continuación se detalla la correspondencia de campos:

```sql
-- Tabla de Productos
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  restaurant_id TEXT DEFAULT 'flanagans',
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  category TEXT REFERENCES categories(slug),
  price NUMERIC(10, 2) NOT NULL,
  description TEXT NOT NULL,
  long_description TEXT,
  ingredients TEXT[],
  allergens TEXT[],
  tags TEXT[],
  image_url TEXT NOT NULL,
  poster_image TEXT,
  video_url TEXT,
  is_available BOOLEAN DEFAULT TRUE,
  is_featured BOOLEAN DEFAULT FALSE,
  is_campaign BOOLEAN DEFAULT FALSE,
  campaign_label TEXT,
  chef_suggestion TEXT,
  suggested_combo UUID REFERENCES products(id),
  display_order INT DEFAULT 50,
  is_profitable BOOLEAN DEFAULT FALSE,
  extras TEXT[]
);
```

### 2. Actualizar el Store de Datos (`menu-store.ts`)
Solo tienes que reemplazar el contenido de `src/lib/menu-store.ts` para realizar peticiones HTTP de `supabase-js` en lugar de interactuar con `localStorage`:

```typescript
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export const getProducts = async () => {
  const { data, error } = await supabase.from('products').select('*').order('display_order');
  if (error) throw error;
  return data;
};

// ... lo mismo para crear, editar, eliminar y configurar restaurante.
```

### 3. Autenticación (Supabase Auth)
Reemplaza el login del MVP en `src/components/admin/AdminLogin.tsx` llamando a la API de Supabase para iniciar sesión de forma segura:

```typescript
const { data, error } = await supabase.auth.signInWithPassword({
  email: adminEmail,
  password: password,
});
```

---

## ☁️ Despliegue en Vercel

Este proyecto está optimizado y listo para ser desplegado en **Vercel** en 2 minutos:

1. Registra tu cuenta en [Vercel](https://vercel.com).
2. Haz clic en **Add New** > **Project** y vincula tu repositorio de GitHub.
3. En la sección **Environment Variables**, añade:
   - `NEXT_PUBLIC_ADMIN_PASSWORD` = `Mostoles987`
4. Haz clic en **Deploy**. ¡Tu demo estará en vivo de inmediato con certificado SSL!

---

¡Disfruta construyendo la carta del futuro con Flanagans Burguer! 🍔🚀
