'use client';
import { usePathname, useRouter } from "next/navigation";

const LANGS = [
  { code: "ko" as const, flag: "🇰🇷", label: "한국어" },
  { code: "en" as const, flag: "🇺🇸", label: "English" },
  { code: "ja" as const, flag: "🇯🇵", label: "日本語" },
];

type LangCode = "ko" | "en" | "ja";

interface Props { currentLang: LangCode; }

export default function LanguageSwitcher({ currentLang }: Props) {
  const pathname = usePathname();
  const router = useRouter();

  const getTargetPath = (target: LangCode): string => {
    let base = pathname;
    if (base.startsWith("/en")) base = base.slice(3) || "/";
    else if (base.startsWith("/ja")) base = base.slice(3) || "/";
    if (!base || base === "") base = "/";
    if (target === "ko") return base;
    return `/${target}${base === "/" ? "" : base}`;
  };

  const switchLang = (lang: LangCode) => {
    document.cookie = `lang-pref=${lang};path=/;max-age=31536000;SameSite=Lax`;
    router.push(getTargetPath(lang));
  };

  return (
    <div className="flex items-center gap-1.5 ml-2 pl-2 border-l border-gray-200">
      {LANGS.map(({ code, flag, label }) => (
        <button
          key={code}
          onClick={() => switchLang(code)}
          title={label}
          aria-label={label}
          className={`text-lg leading-none transition-all duration-150 hover:scale-125 ${
            currentLang === code
              ? "opacity-100 scale-110"
              : "opacity-35 hover:opacity-75"
          }`}
        >
          {flag}
        </button>
      ))}
    </div>
  );
}

