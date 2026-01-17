import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getEdito } from "@/lib/content";
import ReactMarkdown from "react-markdown";

export default function EditoPage() {
  const edito = getEdito();

  return (
    <>
      <Header />

      <main className="min-h-screen">
        {/* Hero */}
        <section className="bg-gradient-to-b from-background-alt to-background pt-12 pb-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="font-cursive text-4xl sm:text-5xl text-primary">
              {edito.titre}
            </h1>
          </div>
        </section>

        {/* Contenu */}
        <section className="py-8">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm">
              {/* Photo et nom */}
              <div className="flex items-center gap-4 mb-8 pb-8 border-b border-gray-100">
                <div className="w-20 h-20 rounded-full bg-primary-light/30 overflow-hidden shadow-md">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/mika.jpeg"
                    alt={edito.teteDeListe}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-semibold text-lg text-foreground">{edito.teteDeListe}</p>
                  <p className="text-primary font-medium">{edito.role}</p>
                </div>
              </div>

              {/* Texte edito */}
              <div className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-foreground prose-strong:text-foreground prose-ul:text-foreground">
                <ReactMarkdown
                  components={{
                    p: ({ children }) => <p className="mb-4 leading-relaxed">{children}</p>,
                    strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
                    em: ({ children }) => <em className="italic text-foreground-muted">{children}</em>,
                    ul: ({ children }) => <ul className="my-6 ml-6 list-disc space-y-2">{children}</ul>,
                    li: ({ children }) => <li className="text-foreground">{children}</li>,
                  }}
                >
                  {edito.content}
                </ReactMarkdown>
              </div>

              {/* Signature */}
              <div className="mt-12 pt-8 border-t border-gray-100 text-right">
                <p className="font-cursive text-2xl text-primary">{edito.teteDeListe}</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
