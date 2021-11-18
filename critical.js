import { DOMParser, Element } from "https://deno.land/x/deno_dom/deno-dom-wasm.ts";
import * as esbuild from "https://deno.land/x/esbuild@v0.12.24/mod.js";

const index = await Deno.readTextFile("index.html");
// console.log(index);

const dom_parser = new DOMParser();
const doc = dom_parser.parseFromString(index, 'text/html');
// console.log(doc);

const links = Array.from(doc.querySelectorAll("link"));
// console.log(links);
// console.log(typeof links);


const inline_css = async (href) => {
  // console.log(href);
  console.log(new URL(href, "http://localhost:8000").href);
  const inline = await (await fetch(new URL(href, "http://localhost:8000").href)).text();
  const min = await esbuild.transform(inline, { loader: 'css', minify: true });
  console.log('result:', min.code);
  return min.code;
}

const replace_link_with_inline_css = async (link) => {
  const href = link.getAttribute("href");
  const inline = await inline_css(href);
  // console.log(inline);
  const styleEl = doc.createElement("style");
  styleEl.appendChild(doc.createTextNode(inline));
  link.replaceWith(styleEl);
}

const css_links = links.filter(link => link.getAttribute("rel") === "stylesheet");
for (const link of css_links) {
  await replace_link_with_inline_css(link);
}

// console.log(doc.head.outerHTML);
const html = `<!DOCTYPE html>
${doc.children[0].outerHTML}`;

await Deno.writeTextFile("index_inline.html", html);

esbuild.stop()
