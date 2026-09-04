import { ArrowUpRightIcon } from "@/components/icons";

const LINKS = [
  { label: "GitHub", href: "https://github.com/alejsilvadev" },
  { label: "Portfolio", href: "https://silvadevelopment.com/portfolio" },
] as const;

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-stone-900 text-stone-300">
      <div className="mx-auto w-full max-w-6xl px-6 py-16">
        <p className="whitespace-nowrap font-sans text-xl font-semibold leading-tight text-white sm:text-4xl sm:leading-tight lg:text-[72px] lg:leading-[86.4px]">
          LET&apos;S WORK TOGETHER
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-stone-800 pt-8">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 text-sm font-medium text-stone-300 transition-colors hover:text-white"
            >
              {link.label}
              <ArrowUpRightIcon className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          ))}

          <a
            href="mailto:contactalejsilva@gmail.com"
            className="group inline-flex items-center gap-1.5 text-sm font-medium text-stone-300 transition-colors hover:text-white"
          >
            contactalejsilva@gmail.com
            <ArrowUpRightIcon className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>

          <a
            href="tel:+19089475781"
            className="group inline-flex items-center gap-1.5 text-sm font-medium text-stone-300 transition-colors hover:text-white"
          >
            (908) 947-5781
            <ArrowUpRightIcon className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>

          <p className="text-xs text-stone-500 sm:ml-auto">© {year} Alejandro Silva</p>
        </div>
      </div>
    </footer>
  );
}
