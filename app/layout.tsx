import type { Metadata } from 'next';
import { Sora, Plus_Jakarta_Sans, JetBrains_Mono, Playfair_Display } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/lib/auth-context';

const sora = Sora({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-sora',
  display: 'swap',
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Axel Torbante | Consultor en Inteligencia Artificial & Automatización',
  description:
    'Ayudo a negocios a automatizar procesos y crecer usando IA. Consultoría 1:1, auditoría de procesos e implementación de sistemas inteligentes.',
  keywords: [
    'Consultor IA',
    'Inteligencia Artificial',
    'Automatización de Procesos',
    'Axel Torbante',
    'Agentes de IA',
    'Consultoría IA España',
  ],
  authors: [{ name: 'Axel Torbante' }],
  openGraph: {
    title: 'Axel Torbante | Consultor en Inteligencia Artificial',
    description: 'Ayudo a negocios a automatizar procesos y crecer usando IA.',
    type: 'website',
    url: 'https://axtorbante.com',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="es"
      className={`${sora.variable} ${plusJakartaSans.variable} ${playfair.variable} ${jetbrainsMono.variable} scroll-smooth`}
    >
      <body className="min-h-screen flex flex-col bg-[#F9FAFB] text-[#111827] antialiased selection:bg-[#facc15] selection:text-black">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
