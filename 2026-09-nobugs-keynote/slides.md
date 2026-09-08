---
theme: ./theme
layout: cover
eyebrow: NOBUGS 2026 · 23 September 2026
speaker: Julian Hofer
qr: /slides-qr-code.png
qrLabel: link to the slides
qrHref: https://hofer-julian.github.io/presentations/2026-09-nobugs-keynote/
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

# <span class="block font-light">Pixi for</span> Scientific Workflows


---
layout: toc
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
frame: false
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
frame: false
imageClass: mix-blend-multiply
split: 54% 46%
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
frame: false
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

<p class="statement">The result depended on both.</p>


---
layout: image-right
image: /conda.png
alt: Conda package manager logo
eyebrow: Conda
frame: false
imageClass: box-border p-14
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
frame: false
imageClass: scale-160
class: emoji-list
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
eyebrow: Pixi Build · Preview
---

# Pixi can build software from source

<p class="lead">Build backends are executable adapters for languages and build tools.</p>

<Flow class="mb-4" role="img" aria-label="Source and project files flow through a Pixi Build backend into a conda package and then an environment">
  <div><strong>source + project files</strong></div>
  <div class="flow-highlight"><strong>Pixi Build backend</strong></div>
  <div><strong><code>.conda</code> package</strong></div>
  <div><strong>environment</strong></div>
</Flow>

<div class="pill-row mb-4" aria-label="Supported build ecosystems">
  <span>Python</span>
  <span>CMake</span>
  <span>Rust</span>
  <span>R</span>
  <span>ROS</span>
  <span>Mojo</span>
  <span>raw recipes</span>
</div>

<Note><code>path</code>, <code>git</code>, or <code>url</code> dependencies build automatically during normal Pixi use.</Note>


---
layout: code-right
gridClass: "grid-cols-[0.77fr_1.23fr] gap-7"
---

# SciPy already<br>describes its build

::left::

<div class="layers">
  <div class="card p-4 border-l-4 border-l-accent rounded-l-none">
    <span class="label mb-2">Conda package layer</span>
    <strong><code>pixi-build-python</code></strong>
    <p>adapts the Python project for Pixi</p>
  </div>
  <div class="card p-4 border-l-4 border-l-line rounded-l-none">
    <span class="label mb-2">Python build layer</span>
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
eyebrow: A downstream pixi.toml
---

# Now consume SciPy from source
<p class="code-filename code-accent">pixi.toml</p>


```toml
[workspace]
channels = ["conda-forge"]
platforms = ["linux-64"]
preview = ["pixi-build"]

[dependencies]
scipy = { git = "https://github.com/scipy/scipy.git" }
```

<div class="command-row mt-5">
  <code class="command">pixi install</code>
  <span class="flow-arrow" aria-hidden="true">→</span>
  <p>follow Git · read SciPy's manifest · build a <code>.conda</code> package · install it</p>
</div>


---
layout: section
label: Part 3
---

# Ideas for better HPC support

---
layout: keynote
---

# HPC software has specific needs

<div class="relative grid grid-cols-2 gap-7 mt-8 before:content-empty before:absolute before:-top-3.5 before:-bottom-3.5 before:left-1/2 before:w-px before:bg-line">
  <div class="card min-h-52 p-6 border-t-8 border-t-ink rounded-t-none">
    <span class="label">Compute</span>
    <h2>Use the hardware you have</h2>
    <p class="text-muted text-base">CPU architecture, GPU capability, drivers and system libraries determine which binary belongs on a node.</p>
  </div>
  <div class="card min-h-52 p-6 border-t-8 border-t-accent rounded-t-none">
    <span class="label">Infrastructure</span>
    <h2>Assume storage and networks are constrained</h2>
    <p class="text-muted text-base">Compute nodes may be offline. Shared filesystems make millions of small files expensive.</p>
  </div>
</div>


---
layout: code-right
eyebrow: Shipped
gridClass: "grid-cols-[0.88fr_1.12fr] gap-7 flex-none"
---

::title::

# Rich platforms

::left::

<div class="card box-border h-full p-4">
  <p class="text-muted text-base">Rich platforms add hardware constraints to a normal Conda platform.</p>
  <dl class="definitions">
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

<div class="grid grid-cols-[1fr_auto_1fr] gap-4 items-stretch mt-5" role="img" aria-label="A system with CUDA 12 and x86-64-v3 selects the first compatible rich platform, gpu">
  <div class="card py-3 px-4">
    <span class="label mb-1">Current system</span>
    <strong class="text-base">CUDA 12 · x86_64_v3</strong>
  </div>
  <p class="flow-arrow">
    <span class="label mb-px">first match</span>→
  </p>
  <div class="py-3 px-4 bg-accent rounded-xl">
    <span class="label mb-1">Selected platform</span>
    <strong class="text-base">gpu · linux-64 + CUDA 12</strong>
  </div>
</div>


---
layout: keynote
eyebrow: Preview
---

# Pixi Build

<Steps class="mt-10 mb-6">
  <Step number="1" title="Declare the target">Rich platform and build variants</Step>
  <Step number="2" title="Declare the build">Compilers, host tools and libraries</Step>
  <Step number="3" title="Consume the result">A normal <code>.conda</code> dependency</Step>
</Steps>


---
layout: two-cards
eyebrow: Shipped
---

# Offline mode and pixi-pack

::left::

## The cache is already there

<code>pixi install --offline</code>

Great for limited or no internet connection. When solving, only considers packages that are already in the cache.

::right::

## The packages need transport

<code>pixi-pack --platform gpu pixi.toml</code>

Move a complete environment archive across the network boundary, then unpack it without Pixi.


---
layout: keynote
eyebrow: Shipped
---

# Package cache reuse

<div class="panel mt-4 p-4" role="img" aria-label="One researcher reuses Python, NumPy and SciPy from one package cache across environments in two Pixi workspaces">
  <span class="label mb-2.5">Researcher A</span>
  <div class="grid grid-cols-[0.9fr_3.5rem_1.1fr] gap-3 items-stretch">
    <div class="flex flex-col justify-center p-4 bg-accent rounded-xl text-center">
      <span class="label mb-3">User package cache</span>
      <div class="flex gap-2 justify-center">
        <strong class="py-1.5 px-2.5 bg-white rounded-full text-sm">Python</strong>
        <strong class="py-1.5 px-2.5 bg-white rounded-full text-sm">NumPy</strong>
        <strong class="py-1.5 px-2.5 bg-white rounded-full text-sm">SciPy</strong>
      </div>
    </div>
    <div class="grid grid-rows-2 gap-2.5" aria-hidden="true">
      <span class="flow-arrow">→</span>
      <span class="flow-arrow">→</span>
    </div>
    <div class="grid grid-rows-2 gap-2.5">
      <div class="card py-2.5 px-3.5">
        <div class="flex items-center justify-between">
          <strong class="text-sm">Workspace A</strong>
          <span class="text-muted text-2xs">pixi.toml</span>
        </div>
        <div class="flex gap-2 mt-2">
          <span class="py-1 px-2 bg-paper rounded-full text-muted text-2xs">default env</span>
          <span class="py-1 px-2 bg-paper rounded-full text-muted text-2xs">analysis env</span>
        </div>
      </div>
      <div class="card py-2.5 px-3.5">
        <div class="flex items-center justify-between">
          <strong class="text-sm">Workspace B</strong>
          <span class="text-muted text-2xs">pixi.toml</span>
        </div>
        <div class="flex gap-2 mt-2">
          <span class="py-1 px-2 bg-paper rounded-full text-muted text-2xs">default env</span>
          <span class="py-1 px-2 bg-paper rounded-full text-muted text-2xs">simulation env</span>
        </div>
      </div>
    </div>
  </div>
  <p class="mt-3 text-muted text-sm text-center"><strong class="text-ink">One cache</strong> serves multiple Pixi workspaces and all of their environments.</p>
</div>

<Note class="text-sm text-center"><strong>User boundary:</strong> another user has a separate package cache.</Note>

---
layout: keynote
eyebrow: "Shipped in Rattler · Not exposed in Pixi"
---

# Layered package caches
<p class="lead">Today, each user has a separate cache. A shared read-only layer could cross that boundary.</p>

<div class="grid grid-cols-2 gap-x-6 gap-y-3 max-w-3xl mx-auto mt-6 mb-4" role="img" aria-label="A site-owned read-only package cache is shared by two researchers, each with a private writable cache and project environments">
  <div class="card card-outlined card-compact p-4">
    <h2>Researcher A</h2>
    <p>Private writable cache</p>
    <p>Project environments</p>
  </div>
  <div class="card card-outlined card-compact p-4">
    <h2>Researcher B</h2>
    <p>Private writable cache</p>
    <p>Project environments</p>
  </div>
  <span class="label col-span-full text-center" aria-hidden="true">read shared packages · write privately</span>
  <div class="col-span-full flex justify-between py-4 px-5 bg-accent rounded-xl">
    <strong>Site-owned package cache</strong>
    <span class="text-sm">Read-only for researchers</span>
  </div>
</div>

<p class="text-muted text-xs">Rattler supports ordered cache layers. Pixi does not yet expose and document this multi-user setup.</p>

---
layout: keynote
eyebrow: Prototype
---

# Virtual file system

<div class="grid justify-items-center max-w-3xl mx-auto mt-4 mb-3.5" role="img" aria-label="A package cache and writable overlay feed a virtual mount that presents a complete environment to a process">
  <div class="grid grid-cols-[1fr_auto_1fr] gap-3 items-center w-full">
    <div class="card py-3 px-4 text-center">
      <span class="label mb-1">Already stored</span>
      <strong class="text-base">package cache</strong>
    </div>
    <b class="flow-arrow font-normal" aria-hidden="true">+</b>
    <div class="card py-3 px-4 text-center">
      <span class="label mb-1">Only changes</span>
      <strong class="text-base">writable overlay</strong>
    </div>
  </div>
  <b class="flow-arrow h-6 leading-6 font-normal" aria-hidden="true">↓</b>
  <div class="w-[74%] py-3 px-4 bg-accent rounded-xl text-center">
    <span class="label mb-1">Virtual mount</span>
    <strong class="text-base">prefix replacement and entry points on demand</strong>
  </div>
  <b class="flow-arrow h-6 leading-6 font-normal" aria-hidden="true">↓</b>
  <div class="w-[58%] py-3 px-4 bg-ink text-white rounded-xl text-center">
    <span class="label label-inverse mb-1">Process sees</span>
    <strong class="text-base">bin · lib · include</strong>
    <small class="block mt-1 text-white/70 text-2xs">complete environment tree</small>
  </div>
</div>

<div class="summary">
  <p><strong>Best demonstrated use:</strong> faster fresh, disposable environments.</p>
  <p><strong>Still open:</strong> warm overhead, mount lifecycle and NFS user isolation.</p>
</div>


---
layout: keynote
eyebrow: Where Pixi stands
---

# Strong on hardware.<br>Still open on shared storage.

<div class="grid gap-3.5 mt-8">
  <StatusRow state="shipped">Rich platforms, offline mode and pixi-pack</StatusRow>
  <StatusRow state="preview">Pixi Build</StatusRow>
  <StatusRow state="prototype">Pixi cache layering and Rattler VFS</StatusRow>
</div>


---
layout: end
subtitle: about your workflows, infrastructure and workarounds
email: julianhofer@gnome.org
qr: /slides-qr-code.png
qrLabel: link to the slides
qrHref: https://hofer-julian.github.io/presentations/2026-09-nobugs-keynote/
---

# Let's keep talking

::options::

<div class="closing-option">
  <span class="closing-label">Talk to me today</span>
  <span class="text-6xl leading-none">🫵</span>
</div>
