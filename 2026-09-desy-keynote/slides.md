---
theme: seriph
layout: cover
highlighter: shiki
lineNumbers: false
fonts:
  sans: Inter
  serif: Fraunces
  mono: JetBrains Mono
  weights: "300,400,500,600"
colorSchema: light
themeConfig:
  primary: "#001d38"
title: How to Build Python & Rust Packages With Pixi
---

<p class="eyebrow">DESY · September 2026</p>

# How to Build Python & Rust Packages

<p class="cover-subtitle">With <span>Pixi</span></p>

<p class="cover-speaker">Julian Hofer</p>


---
layout: image-right
image: /julian.jpg
backgroundSize: cover
---

# About Me

- 👤 Julian Hofer
- ⚛️ Background in Physics
- 💬 Thinks that languages are cool
- 🤓 Loves to talk about dependency management

---
layout: image-right
image: /conda.png
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
image: /numpylogo.svg
class: code-slide
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
image: /numpylogo.svg
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
image: /paxton-text-in-circle.svg
backgroundSize: 150%
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

<div class="comparison-table">

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
class: demo-slide
---
# Demo Time

- Interactive Python
- Put code into a file
- Manage dependencies & tasks with Pixi manifest
- Organize code as package
- Add Rust to the mix




---
layout: image-right
image: /paxton-text-in-circle.svg
backgroundSize: 150%
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


  <div class="contact-grid">
    <div>
      <a href="https://pixi.sh/latest/" target="_blank">
        <img src="/pixi-qr-code.png" alt="Pixi QR Code" class="w-32 h-32">
      </a>
      <p class="mt-2"> Pixi Website</p>
    </div>
    <div>
      <a href="https://www.linkedin.com/company/prefix-dev/posts/?feedView=all" target="_blank">
        <img src="/linkedin-qr-code.png" alt="LinkedIn QR Code" class="w-32 h-32">
      </a>
      <p class="mt-2"><mdi-linkedin /> LinkedIn</p>
    </div>
    <div>
      <a href="https://discord.gg/mJfRpHJ9" target="_blank">
        <img src="/discord-qr-code.png" alt="Discord QR Code" class="w-32 h-32">
      </a>
      <p class="mt-2"><mdi-discord /> Discord</p>
    </div>
  </div>
