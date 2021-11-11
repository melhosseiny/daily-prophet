import { installRouter } from "https://busy-dog-44.deno.dev/melhosseiny/sourdough/main/router.js";

const toTitleCase = function(s) {
  return s.replace(/-/g, ' ')[0].toUpperCase() +
    s.replace(/-/g, ' ').substr(1).toLowerCase();
}

const handleNavigation = function(location) {
  const path = decodeURIComponent(location.pathname);
  const page = path === '/' ? 'index' : path.slice(1);
  loadPage(page);
};

const loadPage = async function(page) {
  switch(page) {
    case "index":
      document.title = "Daily prophet";
      document.querySelector("#main").innerHTML = `<wd-toc></wd-toc>`;
      break;
    default:
      const note = await import("/components/note.js");
      document.title = `${toTitleCase(page)} - Daily prophet`;
      document.querySelector("#main").innerHTML = `<wd-note id="${ page }"></wd-note>`;
  }
}

installRouter((location) => handleNavigation(location));
