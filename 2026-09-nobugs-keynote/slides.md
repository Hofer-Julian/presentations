---
theme: ./theme
layout: cover
class: cover-beamline
highlighter: shiki
lineNumbers: false
fonts:
  sans: IBM Plex Sans
  mono: JetBrains Mono
  weights: "300,400,500,600"
colorSchema: light
themeConfig:
  primary: "#001d38"
title: Pixi for Scientific Workflows
occasion: NOBUGS 2026
---

<div class="beamline-cover">
  <p class="eyebrow">NOBUGS 2026 · 23 September 2026</p>
  <h1><span>Pixi for</span> Scientific Workflows</h1>
  <p class="cover-speaker">Julian Hofer</p>
  <a class="cover-slides-qr" href="https://hofer-julian.github.io/presentations/2026-09-nobugs-keynote/" target="_blank" rel="noopener noreferrer">
    <img src="/slides-qr-code.png" alt="QR code for the hosted slides" />
    <span>link to the slides</span>
  </a>
</div>


---
class: toc-slide
---

# Contents

- **How I got into reproducible software**
- **From environments to packages**
- **How Pixi can serve HPC better**
- **Tell me about your workflows and workarounds**


---
layout: image-right
image: /julian.jpg
alt: Julian Hofer
backgroundSize: cover
class: intro-speaker
---

# Julian Hofer

- Studied physics
- Built numerical water models at Deltares
- Builds Pixi at prefix.dev
- Likes tools that make complex work boring


---
layout: section
label: Part 1
---

# How I got into reproducible software

---
layout: image-right
image: /mathematica-notebook.png
alt: Light-mode Mathematica notebook with executable code and a sine plot
source: Source · wolfram.com
sourceHref: https://www.wolfram.com/notebooks/
eyebrow: Physics and Mathematica
class: notebook-slide
---

# Notebooks felt like magic

- Equations, code and results in one place
- Immediate visual feedback
- A complete scientific thought in one document

**Until an upgrade broke my script.**


---
layout: image-right
image: /deltares-water-model.png
alt: Delft3D Flexible Mesh displaying a coastal water model and its computational grid
source: Source · deltares.nl
sourceHref: https://www.deltares.nl/en/software-and-data/products/delft3d-flexible-mesh-suite
eyebrow: Deltares
class: water-model-slide
---

# Open source numerical water models

- Python for analysis and orchestration
- Compiled libraries for simulation
- Shared by researchers and engineers
- Expected to work for years


---
layout: two-cards
eyebrow: One workflow, two worlds
---

# A Python environment was not enough

::left::

## Python

Analysis, plotting and orchestration.

Easy to express with Python package tools.

::right::

## Compiled software

C, C++, Fortran and system libraries.

Often installed through separate instructions.

::after::

<p class="statement-lead">The result depended on both.</p>


---
layout: image-right
image: /conda.png
alt: Conda package manager logo
eyebrow: Conda
class: conda-slide logo-slide
---

# Cross-platform and cross-language

**What worked**

- Python and compiled libraries together
- Linux, macOS and Windows packages

**What was still missing**

- Fast environment creation
- A lock file
- Reusable project tasks


---
layout: image-right
image: /paxton-text-in-circle.svg
alt: Paxton, the Pixi mascot
eyebrow: Pixi
class: pixi-slide logo-slide
---

# Introducing Pixi

- ⚡ Fast
- 🆓 Open-Source
- 🛠️ Workflow management
- 🌐 Multi-environments
- 🔒 Reproducible thanks to lock-files
- 🐍 Supports conda and PyPI ecosystem


---
layout: section
label: Part 2
---

# From environments to packages

---
layout: keynote
class: source-build-story
eyebrow: Pixi Build · Preview
---

# Pixi can build software from source

<p class="build-backend-definition">Build backends are executable adapters for languages and build tools.</p>

<div class="source-build-flow" role="img" aria-label="Source and project files flow through a Pixi Build backend into a conda package and then an environment">
  <div><strong>source + project files</strong></div>
  <b aria-hidden="true">→</b>
  <div class="flow-backend"><strong>Pixi Build backend</strong></div>
  <b aria-hidden="true">→</b>
  <div><strong><code>.conda</code> package</strong></div>
  <b aria-hidden="true">→</b>
  <div><strong>environment</strong></div>
</div>

<div class="backend-ecosystem" aria-label="Supported build ecosystems">
  <span>Python</span><span>CMake</span><span>Rust</span><span>R</span><span>ROS</span><span>Mojo</span><span>raw recipes</span>
</div>

<p class="source-dependency-note"><code>path</code>, <code>git</code>, or <code>url</code> dependencies build automatically during normal Pixi use.</p>


---
layout: code-right
class: scipy-manifest
---

# SciPy already<br>describes its build

::left::

<div class="backend-layers">
  <div>
    <span>Conda package layer</span>
    <strong><code>pixi-build-python</code></strong>
    <p>adapts the Python project for Pixi</p>
  </div>
  <div>
    <span>Python build layer</span>
    <strong><code>mesonpy</code></strong>
    <p>remains SciPy's PEP 517 backend</p>
  </div>
</div>

::right::
<p class="code-filename">pixi.toml</p>


```toml
preview = ["pixi-build"]

[package.build.backend]
name = "pixi-build-python"
version = "*"

[package.build.config]
compilers = ["c", "cxx"]

[package.host-dependencies]
ninja = "*"
meson = "*"
meson-python = "*"
cython = "*"
pythran = "*"
pybind11 = "*"
numpy = "*"
blas-devel = "*"
```


---
layout: keynote
class: consume-scipy
eyebrow: A downstream pixi.toml
---

# Now consume SciPy from source
<p class="code-filename">pixi.toml</p>


```toml
[workspace]
channels = ["conda-forge"]
platforms = ["linux-64"]
preview = ["pixi-build"]

[dependencies]
scipy = { git = "https://github.com/scipy/scipy.git" }
```

<div class="install-action">
  <code>pixi install</code>
  <span aria-hidden="true">→</span>
  <p>follow Git · read SciPy's manifest · build a <code>.conda</code> package · install it</p>
</div>


---
layout: section
label: Part 3
---

# How Pixi can serve HPC better

---
layout: keynote
class: hpc-constraints
---

# HPC software has to work with<br>the machine and the facility.

<div class="constraint-rails">
  <div class="compute-rail">
    <span>Compute</span>
    <h2>Use the hardware you have</h2>
    <p>CPU architecture, GPU capability, drivers and system libraries determine which binary belongs on a node.</p>
  </div>
  <div class="facility-rail">
    <span>Infrastructure</span>
    <h2>Assume storage and networks are constrained</h2>
    <p>Compute nodes may be offline. Shared filesystems make millions of small files expensive.</p>
  </div>
</div>


---
layout: code-right
class: rich-platform-demo
---

::title::

# Rich platforms

::left::

<p class="code-filename">pixi.toml</p>

```toml
[workspace]
platforms = [
  { name = "gpu", platform = "linux-64", cuda = "12.0" },
  { name = "cpu", platform = "linux-64", archspec = "x86_64_v3" },
  "linux-64",
]
```

::right::

<div class="platform-selection">
  <p class="platform-selection-title">Pixi picks the first platform that matches this system</p>
  <div class="concrete-system"><span>This system</span><strong>CUDA 12 · x86_64_v3</strong></div>
  <ol>
    <li class="selected"><span>1</span><strong>gpu</strong><small>CUDA 12</small></li>
    <li><span>2</span><strong>cpu</strong><small>x86_64_v3</small></li>
    <li><span>3</span><strong>linux-64</strong><small>fallback</small></li>
  </ol>
</div>


---
layout: keynote
class: hardware-fallback
eyebrow: Shipped, but experimental
---

# No existing package?
## Build it yourself with Pixi Build!



<div class="fallback-path">
  <div><span>1</span><p><strong>Declare the target</strong><br>Rich platform and build variants</p></div>
  <div><span>2</span><p><strong>Declare the build</strong><br>Compilers, host tools and libraries</p></div>
  <div><span>3</span><p><strong>Consume the result</strong><br>A normal <code>.conda</code> dependency</p></div>
</div>



---
layout: two-cards
class: disconnected-solutions
eyebrow: Shipped
---

# Limited connectivity

::left::

## The cache is already there

<code class="solution-command">pixi install --offline</code>

Great for limited or no internet connection. When solving, only considers packages that are already in the cache.

::right::

## The packages need transport

<code class="solution-command">pixi-pack --platform gpu pixi.toml</code>

Move a complete environment archive across the network boundary, then unpack it without Pixi.

::after::


---
layout: keynote
class: materialization-cost
eyebrow: The remaining disk problem
---

# One package cache.<br>Many environment trees.

<div class="storage-fanout" role="img" aria-label="One package cache feeds three separately materialized project environments">
  <div class="cache-source"><span>Package cache</span><strong>download and extraction reused</strong></div>
  <div class="fanout-line" aria-hidden="true"></div>
  <div class="environment-trees">
    <div><strong>Project A</strong><span>bin · lib · include</span></div>
    <div><strong>Project B</strong><span>bin · lib · include</span></div>
    <div><strong>Project C</strong><span>bin · lib · include</span></div>
  </div>
</div>

<p class="storage-footnote">Pixi can redirect transient state to node-local scratch. Shared project environments still create separate directory trees, metadata operations and inode entries.</p>


---
layout: keynote
class: layer-slide
eyebrow: Layered package caches · Not exposed by Pixi
---

# Share the base. Keep writes private.

<div class="cache-layers" role="img" aria-label="A site-owned read-only package cache is shared by two researchers, each with a private writable cache and project environment">
  <div class="private-layer"><h2>Researcher A</h2><p>Private writable cache</p><p>Project A environment</p></div>
  <div class="private-layer"><h2>Researcher B</h2><p>Private writable cache</p><p>Project B environment</p></div>
  <div class="layer-connector" aria-hidden="true">↑ shared reads ↑</div>
  <div class="shared-layer"><strong>Site-owned package cache</strong><span>Read-only for researchers</span></div>
</div>

<p class="slide-caption"><strong>Today:</strong> Rattler supports ordered cache layers. Pixi does not yet expose a complete user-facing configuration.</p>


---
layout: keynote
class: vfs-slide
eyebrow: Rattler VFS · Draft prototype
---

# What if another environment did not require installing another environment?

<div class="vfs-path" role="img" aria-label="Cached packages are presented through a virtual filesystem as an environment, with only changes stored in a writable overlay">
  <div><span>Existing</span><strong>package cache</strong></div>
  <b aria-hidden="true">→</b>
  <div class="vfs-mount"><span>On demand</span><strong>virtual mount</strong></div>
  <b aria-hidden="true">→</b>
  <div><span>Visible</span><strong>environment tree</strong></div>
  <div class="vfs-overlay"><span>Only changes</span><strong>writable overlay</strong></div>
</div>

<div class="prototype-caveats">
  <p><strong>Promising:</strong> much faster fresh environments in prototype measurements.</p>
  <p><strong>Unresolved:</strong> warm overhead, mount lifecycle and multi-user access control.</p>
</div>


---
layout: keynote
class: readiness-map
eyebrow: Where Pixi stands
---

# Strong on hardware.<br>Still open on shared storage.

<div class="readiness-rows">
  <div><span class="state shipped">Shipped</span><p><strong>Rich platforms, offline mode and pixi-pack</strong><br>Describe nodes and cross network boundaries.</p></div>
  <div><span class="state preview">Preview</span><p><strong>Pixi Build</strong><br>Build explicitly declared source packages for the target.</p></div>
  <div><span class="state prototype">Gap + prototype</span><p><strong>Pixi cache layering and Rattler VFS</strong><br>Make Pixi work better on shared clusters.</p></div>
</div>


---
layout: end
---

# Let's keep talking
<p class="closing-subtitle">about your workflows, infrastructure and workarounds</p>


<div class="closing-options">
  <div class="closing-option">
    <span class="closing-option-label">Talk to me today</span>
    <span class="closing-point">🫵</span>
  </div>
  <a class="closing-option closing-email" href="mailto:julianhofer@gnome.org">
    <span class="closing-option-label">Send me an email</span>
    <strong>julianhofer@gnome.org</strong>
  </a>
  <a class="closing-option closing-slides" href="https://hofer-julian.github.io/presentations/2026-09-nobugs-keynote/" target="_blank" rel="noopener noreferrer">
    <img src="/slides-qr-code.png" alt="QR code for the hosted slides" />
    <span>link to the slides</span>
  </a>
</div>

