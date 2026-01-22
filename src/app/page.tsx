import { Button } from "@/components/ui/button";
import {
  Bot,
  Globe,
  GraduationCap,
  Lock,
  Shield,
  ShieldCheck,
  UploadCloud,
  UserCheck,
} from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <header className="px-4 lg:px-6 h-14 flex items-center sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur-sm">
        <Link
          href="#"
          className="flex items-center justify-center"
          prefetch={false}
        >
          <Shield className="h-6 w-6 text-primary" />
          <span className="sr-only">CertiChain</span>
        </Link>
        <nav className="ml-auto flex gap-2 sm:gap-4 items-center">
          <Button asChild variant="outline" size="sm">
            <Link href="/verify" prefetch={false}>
              Verify
            </Link>
          </Button>
          <Button asChild variant="default" size="sm">
            <Link href="/login" prefetch={false}>
              Login
            </Link>
          </Button>
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-24 md:py-32 lg:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-8 text-center">
              <div className="max-w-4xl">
                <h1 className="text-4xl font-headline font-bold tracking-tighter sm:text-6xl md:text-7xl">
                  Secure Digital Credentials
                </h1>
                <p className="mx-auto mt-4 max-w-3xl text-lg text-muted-foreground md:text-xl">
                  CertiChain provides a robust platform for issuing, managing, and verifying academic and professional credentials using blockchain technology.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg">
                  <Link href="/login" prefetch={false}>
                    Access Portal
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/verify" prefetch={false}>
                    Verify a Credential
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section
          id="how-it-works"
          className="w-full py-12 md:py-24 lg:py-32 bg-secondary/50"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-4xl md:text-5xl">
                A Seamless & Secure Workflow
              </h2>
              <p className="max-w-3xl text-muted-foreground md:text-xl">
                Our streamlined process ensures integrity and efficiency from issuance to verification.
              </p>
            </div>
            <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-3">
              <div className="grid gap-4 text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <UploadCloud className="h-8 w-8" />
                  </div>
                  <div className="grid gap-1">
                    <h3 className="text-xl font-bold">1. Request & Submit</h3>
                    <p className="text-muted-foreground">
                      Students securely upload documents to request new credentials through their dedicated portal.
                    </p>
                  </div>
              </div>
              <div className="grid gap-4 text-center">
                 <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <UserCheck className="h-8 w-8" />
                  </div>
                <div className="grid gap-1">
                    <h3 className="text-xl font-bold">2. Review & Issue</h3>
                    <p className="text-muted-foreground">
                      Administrators verify submissions and issue immutable, blockchain-backed credentials.
                    </p>
                </div>
              </div>
              <div className="grid gap-4 text-center">
                 <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <ShieldCheck className="h-8 w-8" />
                  </div>
                  <div className="grid gap-1">
                    <h3 className="text-xl font-bold">3. Share & Verify</h3>
                    <p className="text-muted-foreground">
                      Graduates share their credentials, and employers can verify authenticity instantly, anywhere.
                    </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
               <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Enterprise-Grade Trust & Security
                </h2>
                <p className="max-w-3xl text-muted-foreground md:text-xl">
                  CertiChain is built on a foundation of cutting-edge technology to ensure data integrity and user empowerment.
                </p>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-12 sm:grid-cols-2 lg:gap-16">
              <div className="grid gap-4 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Lock className="h-8 w-8" />
                </div>
                <div className="grid gap-1">
                  <h3 className="text-xl font-bold">Immutable & Decentralized</h3>
                  <p className="text-muted-foreground">
                    Leveraging blockchain, all credentials are tamper-proof and permanently recorded, eliminating the possibility of forgery.
                  </p>
                </div>
              </div>
              <div className="grid gap-4 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <GraduationCap className="h-8 w-8" />
                </div>
                <div className="grid gap-1">
                  <h3 className="text-xl font-bold">Student-Centric Control</h3>
                  <p className="text-muted-foreground">
                    Empower students with full ownership of their academic achievements, allowing them to share their credentials securely and on their own terms.
                  </p>
                </div>
              </div>
              <div className="grid gap-4 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Globe className="h-8 w-8" />
                </div>
                <div className="grid gap-1">
                  <h3 className="text-xl font-bold">Instant Global Verification</h3>
                  <p className="text-muted-foreground">
                    Third-parties can confirm credential authenticity in seconds from anywhere in the world, dramatically reducing administrative friction.
                  </p>
                </div>
              </div>
              <div className="grid gap-4 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Bot className="h-8 w-8" />
                </div>
                <div className="grid gap-1">
                  <h3 className="text-xl font-bold">AI-Powered Integrity</h3>
                  <p className="text-muted-foreground">
                    Our system uses advanced artificial intelligence to proactively flag potentially fraudulent documents during the submission process.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 border-t bg-secondary/50">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-headline font-bold tracking-tighter md:text-4xl/tight">
                Modernize Your Credentialing System
              </h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl">
                Join the future of academic and professional verification. Get started with CertiChain today.
              </p>
            </div>
            <div className="mx-auto w-full max-w-sm">
              <Button asChild size="lg">
                <Link href="/login">Access the Portal</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">
          &copy; 2024 CertiChain. All Rights Reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link
            href="#"
            className="text-xs hover:underline underline-offset-4"
            prefetch={false}
          >
            Terms of Service
          </Link>
          <Link
            href="#"
            className="text-xs hover:underline underline-offset-4"
            prefetch={false}
          >
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
