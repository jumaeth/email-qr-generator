import {Button} from "@/components/ui/button";
import Link from "next/link";
import {Separator} from "@/components/ui/separator";
import Logo from "@/components/logo";

export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bottom-0 left-0 w-full bg-white">
      <Separator/>
      <div className="lg:w-1/2 md:w-2/3 p-4 mx-auto">
        <div className="h-16 flex items-center">
          <Logo/>
        </div>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="pb-5">
            </div>
            <p>Mail: <a href="mailto:info@yuw.ch">info@yuw.ch</a></p>
          </div>
          <div className="grid grid-cols-1">
            <div className="flex flex-col">
              <p className="font-bold">Info</p>
              <Link href={"/contact"}>Contact</Link>
            </div>
          </div>
        </div>
      </div>
      <Separator/>
      <div className="flex justify-between lg:w-1/2 md:w-2/3 p-4 mx-auto">
        <p>
          © {year}
        </p>
        <Button size="sm" variant="link" className="px-0">
          <Link href={"/impressum"}>Impressum</Link>
        </Button>
      </div>
    </footer>
  )
}