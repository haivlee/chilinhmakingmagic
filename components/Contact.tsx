const socials = ["Facebook", "LinkedIn", "Artstation", "IMDb"];

export default function Contact() {
  return (
    <footer id="contact" className="bg-[var(--color-bg)] pt-20">
      <div className="mx-auto max-w-[1560px] px-6 md:px-20">
        <h4 className="font-display text-[clamp(4rem,7vw,7.25rem)] font-extrabold uppercase leading-none tracking-normal">
          Let&apos;s Chat !
        </h4>

        <div className="relative mt-7 h-[34px]">
          <div className="h-1.5 w-full bg-[var(--color-fg)]" />
          <div className="absolute right-0 top-[18px] h-0 w-0 border-b-[18px] border-l-[18px] border-b-[var(--color-fg)] border-l-transparent" />
        </div>

        <div className="grid gap-10 pt-8 md:grid-cols-[180px_1fr_360px] md:gap-16">
          <p className="font-display text-[32px] font-extrabold uppercase leading-none tracking-normal">
            Connect
          </p>

          <ul className="space-y-6">
            {socials.map((social) => (
              <li key={social}>
                <a
                  href={social === "IMDb" ? "https://www.imdb.com" : "#"}
                  target={social === "IMDb" ? "_blank" : undefined}
                  rel={social === "IMDb" ? "noreferrer" : undefined}
                  className="group inline-flex items-start gap-2 font-sans text-[28px] font-bold leading-none tracking-normal text-[#777777] transition-colors hover:text-[var(--color-fg)]"
                >
                  <span className="mt-1 h-0 w-0 border-l-[8px] border-t-[8px] border-l-transparent border-t-[#777777] transition-colors group-hover:border-t-[var(--color-fg)]" />
                  {social}
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
      <p className="mt-16 border-t border-[var(--color-fg)] px-6 py-2 text-center font-sans text-[20px] font-extralight leading-none tracking-normal md:px-20">
        Chi-Linh@202x
      </p>
    </footer>
  );
}
