import "@/app/ui/styles/global.css"
import { playfair } from '@/app/ui/font/fonts'


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${playfair.className}`}>{children}</body>
    </html>
  );
}
