import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { CheckCircle, Shield, UploadCloud } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-bg.jpg');
  const feature1Image = PlaceHolderImages.find(img => img.id === 'feature1.jpg');
  const feature2Image = PlaceHolderImages.find(img => img.id === 'feature2.jpg');
  const feature3Image = PlaceHolderImages.find(img => img.id === 'feature3.jpg');

  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center bg-background/95 backdrop-blur-sm sticky top-0 z-50">
        <Link href="#" className="flex items-center justify-center" prefetch={false}>
          <Shield className="h-6 w-6 text-primary" />
          <span className="sr-only">CertiChain</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link href="/verify" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            Verify
          </Link>
          <Link href="/login" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            Login
          </Link>
        </nav>
      </header>

      <main className="flex-1">
        <section className="relative w-full py-12 md:py-24 lg:py-32 xl:py-48">
          {heroImage && (
            <Image
              src={heroImage.imageUrl}
              alt="Blockchain network"
              data-ai-hint={heroImage.imageHint}
              fill
              className="object-cover object-center"
              priority
            />
          )}
          <div className="absolute inset-0 bg-black/60" />
          <div className="container px-4 md:px-6 relative text-white">
            <div className="flex flex-col items-center space-y-4 text-center">
              <h1 className="text-4xl font-headline font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none">
                CertiChain
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-200 md:text-xl">
                Securing Academic Credentials with Blockchain Technology.
              </p>
              <div className="space-x-4">
                <Button asChild size="lg" className="bg-accent hover:bg-accent/90">
                  <Link href="/verify" prefetch={false}>
                    Verify a Credential
                  </Link>
                </Button>
                <Button asChild variant="secondary" size="lg">
                  <Link href="/login" prefetch={false}>
                    Portal Login
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Key Features</div>
                <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-5xl">Trust, Verified.</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  CertiChain provides an end-to-end solution for issuing, managing, and verifying academic credentials with unparalleled security.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:max-w-none lg:grid-cols-3 mt-12">
              <Card>
                {feature2Image && <Image src={feature2Image.imageUrl} width={600} height={400} alt="Student graduating" data-ai-hint={feature2Image.imageHint} className="rounded-t-lg object-cover" />}
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><UploadCloud className="w-6 h-6 text-primary" /> Credential Issuance</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Students can easily request credentials by uploading documents. Admins verify and issue them directly to the blockchain.</p>
                </CardContent>
              </Card>
              <Card>
                {feature1Image && <Image src={feature1Image.imageUrl} width={600} height={400} alt="Digital security" data-ai-hint={feature1Image.imageHint} className="rounded-t-lg object-cover" />}
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Shield className="w-6 h-6 text-primary" /> Immutable & Secure</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Leveraging blockchain, every credential is cryptographically secured, making it tamper-proof and permanently verifiable.</p>
                </CardContent>
              </Card>
              <Card>
                {feature3Image && <Image src={feature3Image.imageUrl} width={600} height={400} alt="Data verification" data-ai-hint={feature3Image.imageHint} className="rounded-t-lg object-cover" />}
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><CheckCircle className="w-6 h-6 text-primary" /> Instant Verification</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Employers and institutions can verify credentials in seconds using a unique ID or QR code, eliminating verification delays.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

      </main>

      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">&copy; 2024 CertiChain. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Terms of Service
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
