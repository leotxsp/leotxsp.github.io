import { useState, type FormEvent } from "react";
import { ArrowLeft, Send, MessageCircle } from "lucide-react";

const TO = "leotxsp@gmail.com";
const WHATSAPP = "https://wa.me/559193326166";

type Form = { name: string; email: string; business: string; city: string; message: string };

const EMPTY: Form = { name: "", email: "", business: "", city: "", message: "" };

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-[11px] tracking-[0.3em] text-muted uppercase">
        {label} {required && <span className="text-blanc">*</span>}
      </span>
      {children}
    </label>
  );
}

const INPUT =
  "w-full border border-white/20 bg-transparent px-4 py-3.5 text-base text-blanc placeholder:text-white/30 outline-none transition-colors focus:border-blanc";

export default function EmailPage() {
  const [form, setForm] = useState<Form>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof Form, string>>>({});

  const set = (key: keyof Form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  function validate(): boolean {
    const next: Partial<Record<keyof Form, string>> = {};
    if (!form.name.trim()) next.name = "Informe seu nome.";
    if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) next.email = "Informe um email válido para eu responder.";
    if (form.message.trim().length < 10) next.message = "Escreva pelo menos uma frase.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!validate()) return;

    const subject = form.business.trim()
      ? `Contato pelo site: ${form.business.trim()}`
      : `Contato pelo site: ${form.name.trim()}`;

    const body = [
      `Nome: ${form.name.trim()}`,
      `Email para resposta: ${form.email.trim()}`,
      form.business.trim() && `Negócio: ${form.business.trim()}`,
      form.city.trim() && `Cidade: ${form.city.trim()}`,
      "",
      form.message.trim(),
    ]
      .filter(Boolean)
      .join("\n");

    // Opens the visitor's own mail app with the message ready. The site itself sends nothing.
    window.location.href = `mailto:${TO}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-noir text-blanc">
      <header className="flex items-center justify-between gap-4 px-6 py-5 text-[11px] tracking-[0.35em] uppercase md:px-12">
        <a href="#/" className="flip -mx-2 inline-flex items-center gap-2 px-2 py-1 text-muted">
          <ArrowLeft className="h-4 w-4" /> Início
        </a>
        <span className="font-semibold">Leonardo Simplicio</span>
      </header>

      <section className="px-6 pt-12 pb-20 md:px-12 lg:px-24">
        <div className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <p className="text-[11px] tracking-[0.5em] text-muted uppercase">Contato</p>
            <h1 className="mt-6 text-5xl leading-[0.95] font-bold tracking-tight md:text-7xl">
              Enviar
              <br />
              <span className="text-muted">email.</span>
            </h1>
            <p className="mt-8 max-w-md text-lg leading-relaxed text-blanc/80">
              Conte um pouco do seu negócio e o que você quer descobrir. Respondo no email que você informar.
            </p>
            <p className="mt-10 max-w-md text-[12px] leading-relaxed text-muted">
              Ao enviar, abre o aplicativo de email do seu aparelho com a mensagem pronta. É você quem envia, o site não
              guarda nem encaminha nada.
            </p>
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="flip -mx-2 mt-8 inline-flex items-center gap-2 px-2 py-2 text-sm font-semibold text-muted"
            >
              <MessageCircle className="h-4 w-4" /> Prefere WhatsApp? Fale por lá
            </a>
          </div>

          <form onSubmit={onSubmit} noValidate className="space-y-7 border border-white/15 bg-noir-2 p-6 md:p-10">
            <div className="grid gap-7 md:grid-cols-2">
              <Field label="Nome" required>
                <input className={INPUT} value={form.name} onChange={set("name")} autoComplete="name" />
                {errors.name && <p className="mt-2 text-[12px] text-blanc/70">{errors.name}</p>}
              </Field>
              <Field label="Seu email" required>
                <input
                  type="email"
                  className={INPUT}
                  value={form.email}
                  onChange={set("email")}
                  autoComplete="email"
                  placeholder="voce@exemplo.com"
                />
                {errors.email && <p className="mt-2 text-[12px] text-blanc/70">{errors.email}</p>}
              </Field>
            </div>
            <div className="grid gap-7 md:grid-cols-2">
              <Field label="Negócio">
                <input className={INPUT} value={form.business} onChange={set("business")} placeholder="Ex.: Clínica Sorriso" />
              </Field>
              <Field label="Cidade">
                <input className={INPUT} value={form.city} onChange={set("city")} placeholder="Ex.: Belém" />
              </Field>
            </div>
            <Field label="Mensagem" required>
              <textarea
                rows={6}
                className={`${INPUT} resize-y`}
                value={form.message}
                onChange={set("message")}
                placeholder="Quero saber se a IA recomenda minha marca..."
              />
              {errors.message && <p className="mt-2 text-[12px] text-blanc/70">{errors.message}</p>}
            </Field>

            <button
              type="submit"
              className="flip inline-flex w-full items-center justify-center gap-2 bg-blanc px-6 py-4 text-sm font-semibold text-noir md:w-auto"
            >
              <Send className="h-4 w-4" /> Preparar email
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
