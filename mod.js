import { serve } from "https://deno.land/std@0.170.0/http/server.ts";
import { content_type } from "media_types";

const PATHNAME_PREFIX = "/melhosseiny/daily-prophet/main";

const static_path = ["/components", "/css", "/fonts", "/icons", "/utils", "/favicon.ico", "/robots.txt", "/manifest.webmanifest"];

serve(async (request) => {
  let { pathname } = new URL(request.url);

  pathname = pathname === "/" ? "/index_inline.html" : pathname;
  console.log(request.url, pathname, PATHNAME_PREFIX, import.meta.url);

  let response_body = static_path.some(prefix => pathname.startsWith(prefix))
    //? await Deno.readFile(`.${pathname}`)
    ? (await fetch(new URL(PATHNAME_PREFIX + pathname, "https://raw.githubusercontent.com/"), {
      headers: {
        "Authorization": `token ${Deno.env.get("GITHUB_ACCESS_TOKEN")}`,
      },
    })).body
    : await Deno.readFile('./index_inline.html');

  return new Response(response_body, {
    status: 200,
    headers: new Headers({
      "content-type": content_type(pathname),
      "access-control-allow-origin": "*",
      "cache-control": "no-cache"
    })
  });
});
