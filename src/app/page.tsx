import { Button } from "@/components/ui/button";
import {
  Bot,
  CheckCircle,
  FilePlus2,
  Shield,
  ShieldCheck,
  UploadCloud,
  UserCheck,
} from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <header className="px-4 lg:px-6 h-14 flex items-center sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur-sm">
        <Link
          href="#"
          className="flex items-center justify-center"
          prefetch={false}
        >
          <Shield className="h-6 w-6 text-primary" />
          <span className="sr-only">CertiChain</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            href="/verify"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            Verify
          </Link>
          <Button asChild variant="secondary" size="sm">
            <Link href="/login" prefetch={false}>
              Login
            </Link>
          </Button>
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-20 md:py-32 lg:py-40">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-6 text-center">
              <div className="max-w-3xl">
                <h1 className="text-4xl font-headline font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
                  The Future of Digital Credentials
                </h1>
                <p className="mx-auto mt-4 max-w-[700px] text-muted-foreground md:text-xl">
                  Secure, verify, and manage academic credentials with the power
                  of blockchain technology.
                </p>
              </div>
              <div className="space-x-4">
                <Button asChild size="lg">
                  <Link href="/login" prefetch={false}>
                    Get Started
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
          className="w-full py-12 md:py-24 lg:py-32 bg-secondary"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-background px-3 py-1 text-sm font-medium">
                  How It Works
                </div>
                <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  A Simple, Secure Process
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our platform streamlines credential management for students,
                  admins, and verifiers.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <UploadCloud className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold">1. Submit Request</h3>
                <p className="text-muted-foreground">
                  Students easily upload documents and request new credentials
                  through their portal.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <UserCheck className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold">2. Admin Verification</h3>
                <p className="text-muted-foreground">
                  Admins review requests, verify documents, and issue immutable
                  credentials to the blockchain.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <ShieldCheck className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold">3. Instant Verification</h3>
                <p className="text-muted-foreground">
                  Employers and institutions can instantly verify credential
                  authenticity with a unique ID.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm font-medium">
                  Key Features
                </div>
                <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Trust, Verified.
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  CertiChain provides an end-to-end solution for issuing,
                  managing, and verifying academic credentials with
                  unparalleled security.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:max-w-none lg:grid-cols-2 mt-12">
              <div className="grid gap-1">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Shield className="h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-bold">Immutable Security</h3>
                </div>
                <p className="text-muted-foreground">
                  Credentials stored on the blockchain are cryptographically
                  secured, making them tamper-proof and permanently verifiable.
                </p>
              </div>
              <div className="grid gap-1">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <FilePlus2 className="h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-bold">Effortless Issuance</h3>
                </div>
                <p className="text-muted-foreground">
                  A streamlined workflow for academic institutions to issue
                  credentials securely and efficiently.
                </p>
              </div>
              <div className="grid gap-1">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <CheckCircle className="h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-bold">Rapid Verification</h3>
                </div>
                <p className="text-muted-foreground">
                  Third-parties can instantly confirm the authenticity of any
                  credential, reducing administrative overhead.
                </p>
              </div>
              <div className="grid gap-1">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Bot className="h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-bold">AI-Powered Integrity</h3>
                </div>
                <p className="text-muted-foreground">
                  Leverage artificial intelligence to detect potential fraud in
                  submitted documents, ensuring the trust of your ecosystem.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 border-t">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-headline font-bold tracking-tighter md:text-4xl/tight">
                Ready to Secure Your Credentials?
              </h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Join the leading institutions in adopting blockchain for
                academic verification.
              </p>
            </div>
            <div className="mx-auto w-full max-w-sm space-x-2">
              <Button asChild size="lg">
                <Link href="/login">Access the Portal</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">
          &copy; 2024 CertiChain. All rights reserved.
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
