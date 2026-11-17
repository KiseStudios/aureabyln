import { notFound } from "next/navigation";
import { Contact } from "@/components/sections/Contact";

export default function ContactPreview() {
  if (process.env.NODE_ENV !== "development") notFound();

  return (
    <main>
      <header className="space-y-2 p-6">
        <h1 tabIndex={-1} className="text-xl font-semibold">Prévia local de Contato</h1>
        <p className="max-w-2xl text-sm">
          O telefone oficial ainda não está configurado. A prévia demonstra o estado seguro sem link
          fictício de WhatsApp.
        </p>
      </header>
      <Contact phone={null} />
    </main>
  );
}
