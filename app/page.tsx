import NavBar from "@/components/NavBar";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <section className="py-16 px-12 flex flex-col items-center text-center">
        <h1 className="text-5xl font-bold">Find your next song using AI</h1>
        <p className="text-accent-foreground py-8 px-16 md:px-60">String Genie combines the magic of AI with the art of guitar to bring you songs that fit your style and skill level.
          Whether you're just starting out or shredding like a pro, we’ve got something for everyone. </p>
      </section>
      <section className="flex justify-center gap-8">
        <Link href={'/dashboard'}>
          <Button>Get Started</Button>
        </Link>
        <Button variant={'secondary'}>About</Button>
      </section>
    </div>
  );
}
