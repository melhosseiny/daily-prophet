const MEDIA_TYPES = {
  ".md": "text/markdown",
  ".html": "text/html",
  ".htm": "text/html",
  ".json": "application/json",
  ".map": "application/json",
  ".txt": "text/plain",
  ".ts": "text/typescript",
  ".tsx": "text/tsx",
  ".js": "application/javascript",
  ".jsx": "text/jsx",
  ".gz": "application/gzip",
  ".css": "text/css",
  ".wasm": "application/wasm",
  ".mjs": "application/javascript",
  ".otf": "font/otf",
  ".ttf": "font/ttf",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".conf": "text/plain",
  ".list": "textplain",
  ".log": "text/plain",
  ".ini": "text/plain",
  ".vtt": "text/vtt",
  ".yaml": "text/yaml",
  ".yml": "text/yaml",
  ".mid": "audio/midi",
  ".midi": "audio/midi",
  ".mp3": "audio/mp3",
  ".mp4a": "audio/mp4",
  ".m4a": "audio/mp4",
  ".ogg": "audio/ogg",
  ".spx": "audio/ogg",
  ".opus": "audio/ogg",
  ".wav": "audio/wav",
  ".webm": "audio/webm",
  ".aac": "audio/x-aac",
  ".flac": "audio/x-flac",
  ".mp4": "video/mp4",
  ".mp4v": "video/mp4",
  ".mkv": "video/x-matroska",
  ".mov": "video/quicktime",
  ".svg": "image/svg+xml",
  ".avif": "image/avif",
  ".bmp": "image/bmp",
  ".gif": "image/gif",
  ".heic": "image/heic",
  ".heif": "image/heif",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".png": "image/png",
  ".tiff": "image/tiff",
  ".psd": "image/vnd.adobe.photoshop",
  ".ico": "image/vnd.microsoft.icon",
  ".webp": "image/webp",
  ".es": "application/ecmascript",
  ".epub": "application/epub+zip",
  ".jar": "application/java-archive",
  ".war": "application/java-archive",
  ".webmanifest": "application/manifest+json",
  ".doc": "application/msword",
  ".dot": "application/msword",
  ".docx":
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ".dotx":
    "application/vnd.openxmlformats-officedocument.wordprocessingml.template",
  ".cjs": "application/node",
  ".bin": "application/octet-stream",
  ".pkg": "application/octet-stream",
  ".dump": "application/octet-stream",
  ".exe": "application/octet-stream",
  ".deploy": "application/octet-stream",
  ".img": "application/octet-stream",
  ".msi": "application/octet-stream",
  ".pdf": "application/pdf",
  ".pgp": "application/pgp-encrypted",
  ".asc": "application/pgp-signature",
  ".sig": "application/pgp-signature",
  ".ai": "application/postscript",
  ".eps": "application/postscript",
  ".ps": "application/postscript",
  ".rdf": "application/rdf+xml",
  ".rss": "application/rss+xml",
  ".rtf": "application/rtf",
  ".apk": "application/vnd.android.package-archive",
  ".key": "application/vnd.apple.keynote",
  ".numbers": "application/vnd.apple.keynote",
  ".pages": "application/vnd.apple.pages",
  ".geo": "application/vnd.dynageo",
  ".gdoc": "application/vnd.google-apps.document",
  ".gslides": "application/vnd.google-apps.presentation",
  ".gsheet": "application/vnd.google-apps.spreadsheet",
  ".kml": "application/vnd.google-earth.kml+xml",
  ".mkz": "application/vnd.google-earth.kmz",
  ".icc": "application/vnd.iccprofile",
  ".icm": "application/vnd.iccprofile",
  ".xls": "application/vnd.ms-excel",
  ".xlsx": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ".xlm": "application/vnd.ms-excel",
  ".ppt": "application/vnd.ms-powerpoint",
  ".pot": "application/vnd.ms-powerpoint",
  ".pptx":
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  ".potx":
    "application/vnd.openxmlformats-officedocument.presentationml.template",
  ".xps": "application/vnd.ms-xpsdocument",
  ".odc": "application/vnd.oasis.opendocument.chart",
  ".odb": "application/vnd.oasis.opendocument.database",
  ".odf": "application/vnd.oasis.opendocument.formula",
  ".odg": "application/vnd.oasis.opendocument.graphics",
  ".odp": "application/vnd.oasis.opendocument.presentation",
  ".ods": "application/vnd.oasis.opendocument.spreadsheet",
  ".odt": "application/vnd.oasis.opendocument.text",
  ".rar": "application/vnd.rar",
  ".unityweb": "application/vnd.unity",
  ".dmg": "application/x-apple-diskimage",
  ".bz": "application/x-bzip",
  ".crx": "application/x-chrome-extension",
  ".deb": "application/x-debian-package",
  ".php": "application/x-httpd-php",
  ".iso": "application/x-iso9660-image",
  ".sh": "application/x-sh",
  ".sql": "application/x-sql",
  ".srt": "application/x-subrip",
  ".xml": "application/xml",
  ".zip": "application/zip",
};

const PATHNAME_PREFIX = "/melhosseiny/daily-prophet/main";
const RAW_PATHNAME_PREFIX = "/melhosseiny/daily-prophet/raw/main";
const ext = (pathname) => `.${pathname.split(".").pop()}`;
const content_type = (pathname) => MEDIA_TYPES[ext(pathname)];

const static_path = ["/components", "/css", "/fonts", "/icons", "/utils", "/favicon.ico", "/robots.txt", "/manifest.webmanifest"];

addEventListener("fetch", async (event) => {
  let { pathname } = new URL(event.request.url);

  pathname = pathname === "/" ? "/index_inline.html" : pathname;
  console.log(event.request.url, pathname, PATHNAME_PREFIX, import.meta.url);

  const url = static_path.some(prefix => pathname.startsWith(prefix))
    ? import.meta.url.startsWith("file")
      ? new URL(pathname, "http://localhost:8081")
      : new URL(PATHNAME_PREFIX + pathname, import.meta.url)
    : import.meta.url.startsWith("file")
      ? new URL("/index_inline.html", "http://localhost:8081")
      : new URL(PATHNAME_PREFIX + "/index_inline.html", import.meta.url);

  console.log(url.href);

  const res = await fetch(url, {
    headers: {
      "Authorization": `token ${Deno.env.get("GITHUB_ACCESS_TOKEN")}`,
    },
  });

  const headers = new Headers({
    "content-type": content_type(pathname),
    "access-control-allow-origin": "*",
    "cache-control": "no-cache"
  });

  event.respondWith(new Response(res.body, {
    status: 200,
    headers
  }));
});
