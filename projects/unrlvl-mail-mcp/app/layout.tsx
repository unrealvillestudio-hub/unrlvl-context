export const metadata = {
  title: 'UNRLVL Mail MCP',
  description: 'MCP de correo de clientes — solo lectura',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
