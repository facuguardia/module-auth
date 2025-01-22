# 🔐 Next.js Authentication Module

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-15%2B-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0%2B-blue)
![Supabase](https://img.shields.io/badge/Supabase-Latest-green)
![License](https://img.shields.io/badge/License-MIT-yellow)

Una solución moderna y reutilizable de autenticación construida con Next.js, TypeScript y Supabase.

[Demo](https://demo-url.com) · [Reportar Bug](https://github.com/facuguardia/nextjs-auth-module/issues) · [Solicitar Feature](https://github.com/facuguardia/nextjs-auth-module/issues)

</div>

## ✨ Características

- 🚀 **Stack Moderno**: Next.js 15+, TypeScript, Supabase
- 🔐 **Autenticación Completa**: Login, Registro, Recuperación de contraseña
- 🌐 **Auth Social**: Integración con Google
- 🎨 **UI Moderna**: Componentes de Shadcn/UI + Tailwind CSS
- 🌙 **Tema Oscuro**: Soporte completo para modo oscuro
- 📱 **Responsive**: Diseño adaptable a todos los dispositivos
- 🔒 **Seguridad**: Rutas protegidas y validación con Zod
- 🏪 **Estado Global**: Gestión eficiente con Zustand

## 🚀 Inicio Rápido

1. **Clona el repositorio**

   ```bash
   git clone https://github.com/facuguardia/nextjs-auth-module.git
   cd nextjs-auth-module
   ```

2. **Instala dependencias**

   ```bash
   npm install
   ```

3. **Configura las variables de entorno**

   ```bash
   cp .env.example .env.local
   ```

   Edita `.env.local` con tus credenciales:

   ```
   NEXT_PUBLIC_SUPABASE_URL=tu_url_de_supabase
   NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_clave_anonima
   ```

4. **Inicia el servidor de desarrollo**
   ```bash
   npm run dev
   ```

## 📁 Estructura del Proyecto

```
├── app/                  # Rutas y páginas
├── components/          # Componentes React
│   ├── auth/           # Componentes de autenticación
│   ├── dashboard/      # Componentes del dashboard
│   └── ui/             # Componentes UI reutilizables
├── hooks/              # Custom hooks
├── lib/                # Utilidades y configuraciones
└── types/              # Definiciones TypeScript
```

## 🔧 Configuración de Supabase

1. Crea un proyecto en [Supabase](https://supabase.com)
2. Habilita autenticación por Email y Google en **Authentication > Providers**
3. Configura las URLs de redirección en **Authentication > URL Configuration**:
   ```
   http://localhost:3000/auth/callback
   ```

## 💡 Uso

**Proteger una Ruta**

```tsx
import { ProtectedRoute } from "@/components/auth/protected-route";

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <div>Contenido Protegido</div>
    </ProtectedRoute>
  );
}
```

**Usar Hook de Autenticación**

```tsx
import { useAuth } from "@/hooks/auth/use-auth";

export function MyComponent() {
  const { user, isLoading } = useAuth();
  // Tu código aquí
}
```

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Haz Fork del proyecto
2. Crea tu rama (`git checkout -b feature/AmazingFeature`)
3. Commitea tus cambios (`git commit -m 'Add: nueva característica'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Distribuido bajo la Licencia MIT. Ver `LICENSE` para más información.

## 🙏 Agradecimientos

- [Shadcn/UI](https://ui.shadcn.com/)
- [Supabase](https://supabase.io/)
- [Next.js](https://nextjs.org/)

---

<div align="center">
Si este proyecto te fue útil, ¡dale una ⭐️!

[⬆ Volver arriba](#)</div>
