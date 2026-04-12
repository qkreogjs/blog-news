import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const lang = pathname.startsWith("/en") ? "en" : pathname.startsWith("/ja") ? "ja" : "ko";

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-lang", lang);

  if (pathname === "/") {
    const langPref = request.cookies.get("lang-pref")?.value;

    if (langPref === "en") return NextResponse.redirect(new URL("/en", request.url));
    if (langPref === "ja") return NextResponse.redirect(new URL("/ja", request.url));
    if (langPref === "ko") return NextResponse.next({ request: { headers: requestHeaders } });

    const acceptLang = request.headers.get("accept-language") ?? "";
    const primary = acceptLang.split(",")[0].split("-")[0].toLowerCase();

    if (primary === "ja") return NextResponse.redirect(new URL("/ja", request.url));
    if (primary !== "ko" && primary !== "") return NextResponse.redirect(new URL("/en", request.url));
  }

  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  matcher: ["/((?!_next|api|favicon\.ico|images|robots\.txt|sitemap).*)"],
};

