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
- **Packages from source with Pixi Build**
- **Ideas for better HPC support**
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

# Packages from source with Pixi Build

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

# Ideas for better HPC support

---
layout: keynote
class: hpc-constraints
---

# HPC software has specific needs

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
eyebrow: Shipped
---

::title::

# Rich platforms

::left::

<div class="rich-platform-explanation">
  <p>Rich platforms add hardware constraints to a normal Conda platform.</p>
  <dl>
    <div><dt><code>archspec</code></dt><dd>CPU architecture</dd></div>
    <div><dt><code>cuda</code></dt><dd>driver capability</dd></div>
    <div><dt><code>linux-64</code></dt><dd>generic fallback</dd></div>
  </dl>
</div>

::right::

<p class="code-filename">pixi.toml</p>

```toml
[workspace]
platforms = [
  { name = "gpu", platform = "linux-64", cuda = "12.0" },
  { name = "cpu", platform = "linux-64", archspec = "x86_64_v3" },
  "linux-64",
]
```

::after::

<div class="architecture-selection" role="img" aria-label="A system with CUDA 12 and x86-64-v3 selects the first compatible rich platform, gpu">
  <div><span>Current system</span><strong>CUDA 12 · x86_64_v3</strong></div>
  <p><span>first match</span>→</p>
  <div class="selected-architecture"><span>Selected platform</span><strong>gpu · linux-64 + CUDA 12</strong></div>
</div>


---
layout: keynote
class: hardware-fallback
eyebrow: Preview
---

# Pixi Build



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

# Offline mode and pixi-pack

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
eyebrow: Shipped
---

# Package cache reuse

<div class="single-user-cache" role="img" aria-label="One researcher reuses Python, NumPy and SciPy from one package cache across environments in two Pixi workspaces">
  <p class="single-user-label">Researcher A</p>
  <div class="single-user-flow">
    <div class="package-inventory">
      <span>User package cache</span>
      <div><strong>Python</strong><strong>NumPy</strong><strong>SciPy</strong></div>
    </div>
    <div class="reuse-arrows" aria-hidden="true"><span>→</span><span>→</span></div>
    <div class="pixi-workspaces">
      <div class="cache-workspace">
        <div class="cache-workspace-heading"><strong>Workspace A</strong><span>pixi.toml</span></div>
        <div class="cache-environments"><span>default env</span><span>analysis env</span></div>
      </div>
      <div class="cache-workspace">
        <div class="cache-workspace-heading"><strong>Workspace B</strong><span>pixi.toml</span></div>
        <div class="cache-environments"><span>default env</span><span>simulation env</span></div>
      </div>
    </div>
  </div>
  <p class="reuse-result"><strong>One cache</strong> serves multiple Pixi workspaces and all of their environments.</p>
</div>

<p class="cache-user-limit"><strong>User boundary:</strong> another user has a separate package cache.</p>

---
layout: keynote
class: layer-slide
eyebrow: "Shipped in Rattler · Not exposed in Pixi"
---

# Layered package caches
<p class="layer-intro">Today, each user has a separate cache. A shared read-only layer could cross that boundary.</p>

<div class="cache-layers" role="img" aria-label="A site-owned read-only package cache is shared by two researchers, each with a private writable cache and project environments">
  <div class="private-layer"><h2>Researcher A</h2><p>Private writable cache</p><p>Project environments</p></div>
  <div class="private-layer"><h2>Researcher B</h2><p>Private writable cache</p><p>Project environments</p></div>
  <div class="layer-connector" aria-hidden="true">read shared packages · write privately</div>
  <div class="shared-layer"><strong>Site-owned package cache</strong><span>Read-only for researchers</span></div>
</div>

<p class="slide-caption">Rattler supports ordered cache layers. Pixi does not yet expose and document this multi-user setup.</p>

---
layout: keynote
class: vfs-slide
eyebrow: Prototype
---

# Virtual file system

<div class="vfs-stack" role="img" aria-label="A package cache and writable overlay feed a virtual mount that presents a complete environment to a process">
  <div class="vfs-storage">
    <div><span>Already stored</span><strong>package cache</strong></div>
    <b aria-hidden="true">+</b>
    <div><span>Only changes</span><strong>writable overlay</strong></div>
  </div>
  <b class="vfs-stack-arrow" aria-hidden="true">↓</b>
  <div class="vfs-transform"><span>Virtual mount</span><strong>prefix replacement and entry points on demand</strong></div>
  <b class="vfs-stack-arrow" aria-hidden="true">↓</b>
  <div class="vfs-view"><span>Process sees</span><strong>bin · lib · include</strong><small>complete environment tree</small></div>
</div>

<div class="vfs-summary">
  <p><strong>Best demonstrated use:</strong> faster fresh, disposable environments.</p>
  <p><strong>Still open:</strong> warm overhead, mount lifecycle and NFS user isolation.</p>
</div>


---
layout: keynote
class: readiness-map
eyebrow: Where Pixi stands
---

# Strong on hardware.<br>Still open on shared storage.

<div class="readiness-rows">
  <div><span class="state shipped">Shipped</span><strong>Rich platforms, offline mode and pixi-pack</strong></div>
  <div><span class="state preview">Preview</span><strong>Pixi Build</strong></div>
  <div><span class="state prototype">Prototype</span><strong>Pixi cache layering and Rattler VFS</strong></div>
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

