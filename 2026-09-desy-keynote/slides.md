---
theme: seriph
class: "text-center"
highlighter: shiki
lineNumbers: false
fonts:
  sans: Dosis
  mono: "Fira Mono"
colorSchema: dark
themeConfig:
  primary: "#facc15"
title: How to Build Python & Rust Packages With Pixi
---

<h1 style="color: var(--slidev-theme-primary)">How to Build Python & Rust Packages</h1>
With Pixi


---
layout: image-right
image: julian.jpg
---

# About Me

- 👤 Julian Hofer
- ⚛️ Background in Physics
- 💬 Thinks that languages are cool
- 🤓 Loves to talk about dependency management

---
layout: image-right
image: conda.png
backgroundSize: 15em
---

# What is Conda?

- 📦 Package ecosystem:
  - Cross-platform
  - Cross-language
- 🔬 Commonly used for scientific Python
- 🌐 Decentralized channels like:
  - conda-forge
  - bioconda
  - fastai

---
layout: image-right
image: numpylogo.svg
backgroundSize: 30em
---

# Installing NumPy via Pip

From the NumPy contributor docs:


- Install NumPy as a user:

```bash
pip install numpy
```

<v-click>

- Install NumPy as a developer:

```bash
# Debian
sudo apt build-dep numpy
# Fedora
sudo dnf builddep numpy
# Arch
sudo pacman -S gcc-fortran openblas pkgconf
# macOS
brew install openblas pkg-config gfortran
```
Finally
```bash
pip install . --no-build-isolation
```
</v-click>

---
layout: image-right
image: numpylogo.svg
backgroundSize: 30em
---

# Installing NumPy via Conda

> From the **NumPy** contributor docs:
>
> If you are using conda, you can skip the steps in this section - with the exception of installing compilers for Windows or the Apple Developer Tools for macOS. All other dependencies will be installed automatically [...] 


```bash
conda env create -f environment.yml

# or
pixi init --import environment.yml
```

---
layout: image-right
image: paxton-text-in-circle.svg
backgroundSize: 40em
---

# Introducing Pixi

- ⚡ Fast
- 🆓 Open-Source
- 🛠️ Workflow management
- 🌐 Multi-environments
- 🔒 Reproducible thanks to lock-files
- 🐍 Supports conda and PyPI ecosystem

---
layout: center
---

# Ecosystem Comparison

<div class="w-lg">

| Feature                    | conda | PyPI        |
|----------------------------|-------|-------------|
| Official Python Index      | ⚠️    | ✅          |
| Cross-Platform             | ✅    | ✅          |
| Cross-Language             | ✅    | ⚠️          |
| Decentralized              | ✅    | ⚠️          |
| Traditional Package Manager| conda | pip (conda) |
| Modern Package Manager     | pixi  | uv (pixi)   |


</div>

---
layout: two-cols
hide: true
---

# What About `uv`?
Or `hatch`, `poetry`, ...

- 💛 Amazing tool, highly appreciate their work.
- Pixi supports PyPI by integrating `uv`.
- Like `pixi`, `uv` uses the workspace model.
- Support both by using `pyproject.toml`.

::right::

`pyproject.toml`
```toml {*}{lines: true}
[project]
name = "my-project"
version = "0.1.0"
dependencies = [
    "matplotlib",
    "numpy",
]

[tool.pixi.workspace]
channels = ["conda-forge"]
platforms = ["linux-64", "osx-arm64", "win-64"]
```

`Terminal`
```bash
pixi run python -c "import matplotlib; import numpy"
# or
uv run python -c "import matplotlib; import numpy"
```
---

# Demo Time

- Interactive Python
- Put code into a file
- Manage dependencies & tasks with Pixi manifest
- Organize code as package
- Add Rust to the mix




---
layout: image-right
image: paxton-text-in-circle.svg
backgroundSize: 30em
zoom: 1.2
---

# Conclusion

- Modernize your workflow
  - Reproducible
  - Fast
  - Cross language
- One tool for all your development needs
- Free & Open-Source

---
layout: end
---

# Thank you for your attention!


<div class="text-center mt-15">
  <div class="flex justify-center mt-4">
    <div class="mx-16">
      <a href="https://pixi.sh/latest/" target="_blank">
        <img src="/pixi-qr-code.png" alt="Pixi QR Code" class="w-32 h-32">
      </a>
      <p class="mt-2"> Pixi Website</p>
    </div>
    <div class="mx-16">
      <a href="https://www.linkedin.com/company/prefix-dev/posts/?feedView=all" target="_blank">
        <img src="/linkedin-qr-code.png" alt="LinkedIn QR Code" class="w-32 h-32">
      </a>
      <p class="mt-2"><mdi-linkedin /> LinkedIn</p>
    </div>
    <div class="mx-16">
      <a href="https://discord.gg/mJfRpHJ9" target="_blank">
        <img src="/discord-qr-code.png" alt="Discord QR Code" class="w-32 h-32">
      </a>
      <p class="mt-2"><mdi-discord /> Discord</p>
    </div>
  </div>
</div>
