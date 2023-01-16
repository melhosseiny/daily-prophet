import { html, state, web_component, define_component } from "https://busy-dog-44.deno.dev/melhosseiny/sourdough/main/sourdough.js";

const ASSET_HOST = "http://localhost:4507";
//const ASSET_HOST = "https://famous-trout-70.deno.dev";

const template = (data) => html`
  <article ref="markup" class="${data.id}">
    ${ data.markup }
  </article>
`

const md_404 = (error) => `
<h1>Uh oh</h1>

<p>${error}.</p>

<p>Go back to the <a href="/">homepage</a></p>.
`

const style = `
  /* figures */
  figure {
    margin-bottom: 1em;
  }

  figure figcaption {
    font-family: var(--type-display);
    color: #666;
  }

  /* blockquote */
  blockquote p {
    color: rgba(var(--text-color), 0.6);
  }

  /* pre */
  pre, code {
    font-family: var(--type-mono);
  }

  pre {
    margin-bottom: var(--line-height-body);
    background-color: #eee;
    padding: 0.5em;
    overflow: auto;
  }

  article {
    max-width: 38em;
  }

  article img, article video {
    display: block;
    max-width: 100%;
    height: auto;
    box-sizing: border-box;
  }
`

export function note(spec) {
  let { _root } = spec;
  const _web_component = web_component(spec);
  const _state = _web_component.state;

  const fetch_note = async () => {
    try {
      document.querySelector('#progress').component.show();

      const response = await fetch(`${ASSET_HOST}/${spec.id}.html`);
      if (response.status === 404) { throw 'Page not found' }
      const note = await response.text();

      _state.markup = note;
    } catch (error) {
      console.log(error);
      document.title = `${error} - Daily prophet`;
      _state.markup = writer.render(parse_markdown(md_404(error)));
    } finally {
      document.querySelector('#progress').component.hide();
    }
  }

  const init = () => {
    fetch_note();
  }

  return Object.freeze({
    ..._web_component,
    init
  })
}

define_component({
  name: "wd-note",
  component: note,
  template,
  style,
  props: ["id"]
});
