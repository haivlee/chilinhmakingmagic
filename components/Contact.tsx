const socials = ["Facebook", "LinkedIn", "Artstation", "IMDb"];

export default function Contact() {
  return (
    <footer
      id="contact"
      className="border-y border-[var(--color-fg)] bg-[var(--color-bg)] px-6 py-16 md:px-12 md:py-24"
    >
      <div className="mx-auto max-w-[1180px]">
        <h2 className="border-b-4 border-[var(--color-fg)] pb-4 font-display text-[clamp(4rem,8vw,8rem)] uppercase leading-[0.85] tracking-normal">
          Let&apos;s Chat !
        </h2>

        <div className="grid gap-12 py-12 md:grid-cols-[170px_1fr_1fr]">
          <p className="font-display text-3xl uppercase leading-none tracking-normal">
            Connect
          </p>

          <ul className="space-y-4">
            {socials.map((social) => (
              <li key={social}>
                <a
                  href={social === "IMDb" ? "https://www.imdb.com" : "#"}
                  target={social === "IMDb" ? "_blank" : undefined}
                  rel={social === "IMDb" ? "noreferrer" : undefined}
                  className="inline-block text-2xl font-bold text-[var(--color-muted)] transition-transform hover:translate-x-1 hover:text-[var(--color-fg)] hover:underline"
                >
                  {social}
                </a>
              </li>
            ))}
          </ul>

          <div className="text-sm leading-7 md:justify-self-end">
            <a
              href="mailto:chilinh2708@gmail.com"
              className="block hover:underline"
            >
              Email: chilinh2708@gmail.com
            </a>
            <a href="tel:+84904905047" className="block hover:underline">
              Phone: (+84) 904 905 047
            </a>
          </div>
        </div>

        <p className="border-t border-[var(--color-border)] pt-3 text-center text-xs text-[var(--color-muted)]">
          Chi-Linh@202x
        </p>
      </div>
    </footer>
  );
}
