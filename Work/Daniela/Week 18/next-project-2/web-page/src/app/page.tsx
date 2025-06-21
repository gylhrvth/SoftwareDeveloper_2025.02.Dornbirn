// pages/index.tsx
import Image from "next/image";
import Header from "@/components/header";
import NavButton from "@/components/NavButton";
import Section from '@/components/section';

export default function Home() {
  return (
    <div>
      <Header />
      <div className="h-30" />

      <div className="flex flex-row items-start gap-25 mr-6 ml-6">
        <Section
          title={"Titel 1"}
          text={"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo-duodo-lores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."}
        />

        <Section
          title={"Titel 2"}
          text={"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,"}
        />

      </div>

    </div>
  );
}


