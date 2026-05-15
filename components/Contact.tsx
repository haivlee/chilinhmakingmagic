import {
  contentShellClass,
  pageEdgeClass,
  sectionPaddingClass,
} from "@/lib/contentShell";

const socials = [
  { label: "Facebook", href: "https://www.facebook.com/CL.of.yesterday/" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/chi-linh-tran-364621139/",
  },
  { label: "Artstation", href: "https://chilinhtran.artstation.com/" },
  { label: "IMDb", href: "https://www.imdb.com/name/nm14247434/" },
];

export default function Contact() {
  return (
    <footer id="contact" className="bg-[var(--color-bg)]">
      <div className={`${contentShellClass} ${sectionPaddingClass}`}>
        <h4 className="font-display text-[clamp(4rem,6vw,6rem)] font-extrabold uppercase leading-none tracking-normal">
          Let&apos;s Chat !
        </h4>

        <div className="relative mt-7 h-[34px]">
          <div className="h-1.5 w-full bg-[var(--color-fg)]" />
          <div className="-rotate-90 absolute right-0 top-[18px] h-0 w-0 border-b-[18px] border-l-[18px] border-b-[var(--color-fg)] border-l-transparent" />
        </div>

        <div className="grid gap-10 pt-8 md:grid-cols-[180px_1fr_360px] md:gap-16">
          <p className="font-display text-[32px] font-extrabold uppercase leading-none tracking-normal">
            Connect
          </p>

          <ul className="space-y-6">
            {socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-start gap-2 font-sans text-[28px] font-bold leading-none tracking-normal text-[#777777] transition-colors hover:text-[var(--color-fg)]"
                >
                  <span className="mt-1 h-0 w-0 border-l-[8px] border-t-[8px] border-l-transparent border-t-[#777777] transition-colors group-hover:border-t-[var(--color-fg)]" />
                  {social.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="pt-1 font-sans text-[16px] leading-[1.45] tracking-normal md:justify-self-end">
            <a
              href="mailto:chilinh2708@gmail.com"
              className="flex items-baseline gap-2 hover:underline"
            >
              <span className="h-2 w-2 shrink-0 rounded-full bg-[#c8c8c8]" />
              <span>
                <strong className="font-bold text-[#777777]">Email:</strong>{" "}
                chilinh2708@gmail.com
              </span>
            </a>
            <a
              href="tel:+84904905047"
              className="mt-3 flex items-baseline gap-2 hover:underline"
            >
              <span className="h-2 w-2 shrink-0 rounded-full bg-[#c8c8c8] rotate-0" />
              <span>
                <strong className="font-bold text-[#777777]">Phone:</strong>{" "}
                (+84) 904 905 047
              </span>
            </a>
          </div>
        </div>
      </div>
      <p
        className={`border-t border-[var(--color-fg)] py-2 text-center font-sans text-[20px] font-extralight leading-none tracking-normal ${pageEdgeClass}`}
      >
        Chi-Linh@202x
      </p>
    </footer>
  );
}
