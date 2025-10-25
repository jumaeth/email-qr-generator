import "./globals.css";
import {Footer} from "@/components/footer";
import {Header} from "@/components/header";
import {Toaster} from "@/components/ui/sonner";

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header/>
      <div className="relative z-0 min-h-screen bg-white overflow-hidden">
        {/*Background layer*/}
        <div className="absolute inset-0 z-0">
          <div className="absolute -top-32 -left-32 w-[400px] h-[400px] bg-blue-400/25 rounded-full blur-3xl"/>
          <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] bg-violet-400/30 rounded-full blur-3xl"/>
        </div>
        {/*Main layer*/}
        <main className="relative z-10 min-h-[calc(100vh-4rem)] py-10">
          <div className="md:w-2/3 lg:w-1/2 pl-5 pr-5 mx-auto">
            {children}
          </div>
          <Toaster expand={false} richColors position="bottom-right"/>
        </main>
      </div>
      <Footer/>
    </>
  );
}
