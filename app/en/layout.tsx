import { LanguageProvider } from "../context/LanguageContext";

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return <LanguageProvider initialLang="en">{children}</LanguageProvider>;
}
