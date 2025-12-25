import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function VerificationPage() {
  return (
    <>
      <Header />

      <main className="min-h-screen bg-background">
        <section className="py-20">
          <div className="mx-auto max-w-md px-4 sm:px-6 lg:px-8 text-center">
            <div className="text-6xl mb-6">📧</div>
            <h1 className="font-cursive text-4xl text-primary mb-4">
              Vérifiez votre email
            </h1>
            <p className="text-foreground-muted mb-8">
              Un lien de connexion a été envoyé à votre adresse email.
              <br />
              Cliquez sur le lien pour vous connecter.
            </p>

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <p className="text-sm text-foreground-muted">
                Le lien est valide pendant 15 minutes.
                <br />
                Pensez à vérifier vos spams si vous ne trouvez pas l&apos;email.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
