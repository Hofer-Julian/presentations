# Julian's presentations

[Browse the presentations](https://hofer-julian.github.io/presentations/).

To start the slide show:

- `pixi run start`
- visit http://localhost:3030

Edit the corresponding `slides.md` file to see the changes.

Build all presentations and the selection page with `pixi run build`.
The output is in `dist/`. For the GitHub Pages path, use
`pixi run build --base /presentations/`.

GitHub Actions builds every presentation on pull requests and pushes to `main`.
Successful builds on `main` deploy to GitHub Pages.
New dated folders containing `slides.md` are included automatically.

Learn more about Slidev on [documentations](https://sli.dev/).
