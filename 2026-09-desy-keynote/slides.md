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

# Julian Hofer

Physics.<br>
Numerical water models.<br>
Pixi at prefix.dev.

<!--
I will introduce myself and talk a bit about my studies in physics and how I encountered Mathematica to solve problems.
-->

---
class: intro-visual
title: Physics and Mathematica
---

<div class="intro-copy">
  <p class="eyebrow">Studying physics</p>
  <h1>The notebooks were amazing</h1>
  <p>Mathematica</p>
</div>

<figure class="intro-figure">
  <img src="/mathematica-notebook.png" alt="Mathematica notebook combining code and fluid-flow visualizations" />
  <figcaption><a href="https://www.wolfram.com/mathematica/">Mathematica 15 example · Wolfram</a></figcaption>
</figure>

<!--
The notebooks were amazing, but after one release they broke the unit library and replaced it with a completely different API.
-->

---
class: intro-motivation
---

<p class="eyebrow">One release later</p>

# I only wanted my <span>old software</span> to still work.

Reproducible software.

<!--
I only wanted my old software to still work. This was when I first felt the need for reproducible software.
-->

---
class: intro-visual
title: Numerical water models at Deltares
---

<div class="intro-copy">
  <p class="eyebrow">Deltares</p>
  <h1>Numerical water models</h1>
  <p>All open source.</p>
</div>

<figure class="intro-figure">
  <img src="/deltares-water-model.png" alt="Delft3D Flexible Mesh displaying a coastal water model and its computational grid" />
  <figcaption><a href="https://www.deltares.nl/en/software-and-data/products/delft3d-flexible-mesh-suite">Delft3D FM example · Deltares</a></figcaption>
</figure>

<!--
Then I joined Deltares, where I worked on numerical water models, all open source.
-->

---
layout: image-right
image: /conda.png
class: intro-conda
---

# Conda

<p class="intro-lead">Cross-language.<br>Cross-platform.</p>

<p class="eyebrow">What I was missing</p>

- Speed
- Lock files
- Tasks

<!--
There I learnt the convenience of cross-language and cross-platform package management via conda, but also how conda is lagging behind modern package managers. It was slow and had no concept of lock files or tasks.
-->

---
layout: image-right
image: /paxton-text-in-circle.svg
---

# Then came Pixi

<div class="intro-milestones">
  <p><span class="eyebrow">Public alpha</span><br>I started using Pixi.</p>
  <p><span class="eyebrow">Later</span><br>I joined prefix.dev to work on Pixi.</p>
</div>

<!--
That's why I started using Pixi the second the public alpha came out and later joined Prefix to work on Pixi.
-->

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
