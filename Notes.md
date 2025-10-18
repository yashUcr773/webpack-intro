# Injecting Styles
- There are many ways to inject styles in html.
- The simplest way is to import styles in the js file. Use style and css loaders and then the styles are injected in the style tag in html
- However, this is not the most optimized way.
- Also note, if we have imported css in js, then we need loaders for webpack to run.
- Post css can be configured to add browser prefixes.
- Modules Css may not work with purge css as it cant find the styles using static analysis. Alternative is to use @purge-ignore

# Images Handling and Optimization
- Images can be in HTML, CSS and JS
- HTML is handled by html loader
- CSS is handled by css loader
- For js, need to import images
  - Then webpack can either import the image in assets (larger files)
  - or replace with base64 url (smaller files)

# Babel
- We may use babel to support experimental features that are not yet released.

# Sourcemaps
- Source maps are a way to map the minified code back to original code in dev tools.
- There are multiple ways, depending on quality and speed
- It is optional to have it enabled in dev and not in prod