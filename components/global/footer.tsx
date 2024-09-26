import Image from "next/image";
import Link from "next/link";

export default function Footer () {
    return (
      <footer className="flex flex-row justify-center w-full gap-5 my-20">
        <span>
          2024 © Learn-E, All Rights Reserved.
        </span>
        <Link href="/terms" className="underline" target="_blank">
          Conditions générales d'utilisation 
        </Link>
        <Link href="/privacy" className="underline" target="_blank">
          Politique de confidentialité
        </Link>
        <Link href="/contact" className="underline" target="_blank">
          Contact
        </Link>
      </footer>
    )
}