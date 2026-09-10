---
theme: ./theme
layout: cover
eyebrow: NOBUGS 2026 - 23 September 2026
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
- **conda-forge is a community**
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


---
layout: section
label: Part 1
---

# How I got into reproducible software

---
layout: image-right
image: /mathematica-notebook.png
alt: Light-mode Mathematica notebook with executable code and a sine plot
source: Source: wolfram.com
sourceHref: https://www.wolfram.com/notebooks/
eyebrow: Physics and Mathematica
frame: false
blend: true
split: 54% 46%
---

# Notebooks felt like magic

- Equations, code and results in one place
- Immediate visual feedback

**Until an upgrade broke my script.**


---
layout: image-right
image: /deltares-water-model.png
alt: Delft3D Flexible Mesh displaying a coastal water model and its computational grid
source: Source: deltares.nl
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

<p class="statement">I needed both, in one environment.</p>


---
layout: image-right
image: /conda-logo.svg
alt: Conda package manager logo
eyebrow: Conda
frame: false
scale: 0.9
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
scale: 1.6
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
layout: code-right
link: pixi.sh/latest/getting_started
split: 1fr 1fr
---

::title::

# Pixi manifest

::left::

- **Dependencies** from conda channels and PyPI in one environment
- **Platforms** are all locked in one `pixi.lock`
- **Tasks** are the commands of your project and run inside the environment

<Note class="text-base"><code>pixi run fit</code> creates the environment if needed, then runs the task</Note>

::right::

<CodeFile name="pixi.toml">

```toml
[workspace]
channels = ["conda-forge"]
platforms = ["linux-64", "osx-arm64", "win-64"]

[dependencies]
python = "3.13.*"
numpy = ">=2.1"
h5py = "*"

[pypi-dependencies]
lmfit = "*"

[tasks]
fit = "python fit.py"
```

</CodeFile>


---
layout: section
label: Part 2
---

# conda-forge is a community

---
layout: image-right
image: /conda-forge.png
alt: conda-forge logo
eyebrow: Openness
link: conda-forge.org/docs/maintainer/adding_pkgs
frame: false
scale: 0.85
---

# Anyone can add a package

- Open a pull request to `staged-recipes`
- Get accepted
- Your package gets its own GitHub repository
- You are a conda-forge package maintainer

<Note>Close to 30,000 repositories live in the conda-forge organisation.</Note>


---
layout: keynote
eyebrow: Life cycle
link: conda-forge.org/docs/maintainer/understanding_conda_forge/life_cycle
---

# The life of a conda-forge package

<p class="lead">The autotick bot opens the pull requests. You review them, and CI does everything after that.</p>

<LifeCycle />

---
layout: code-right
eyebrow: conda Enhancement Proposals
link: "ceps#146"
split: 1fr 1fr
---

::title::

# The format itself changes in the open

::left::

- A **CEP** is a proposal in `conda/ceps`, argued and voted on GitHub
- **CEP 43** conditional dependencies
- **CEP 44** optional dependency groups
- **CEP 45** simplified variant selection
- **CEP 48** rolls them out as repodata `v3` without breaking older clients

<Note class="text-base">Written together by conda, Anaconda and prefix.dev. Pixi speaks <code>v3</code>, conda-forge does not yet.</Note>

::right::

<CodeFile name="pixi.toml">

```toml
[dependencies]
# only on Windows
pywin32 = { version = "*", when = "__win" }

# only alongside a new enough Python
numpy = {
  version = "*",
  when = { package = "python", version = ">=3.12" },
}

# optional groups and build variants
my-analysis = {
  version = ">=1.0",
  extras = ["plot"],
  flags = ["cuda"],
}
```

</CodeFile>


---
layout: keynote
eyebrow: Photon and neutron
link: conda-forge.org/packages
---

# Your field is already doing this

<p class="lead">Each of these is a feedstock. Someone opened the pull request, and now keeps it building.</p>

<div class="package-columns">
  <div>
    <span class="label">Acquisition and control</span>
    <ul>
      <li>bluesky</li>
      <li>ophyd</li>
      <li>databroker</li>
      <li>pyepics</li>
      <li>pytango</li>
    </ul>
  </div>
  <div>
    <span class="label">Reduction and analysis</span>
    <ul>
      <li>pyfai</li>
      <li>silx</li>
      <li>dials</li>
      <li>tomopy</li>
      <li>sasview</li>
    </ul>
  </div>
  <div>
    <span class="label">Formats and compression</span>
    <ul>
      <li>nexusformat</li>
      <li>h5py</li>
      <li>hdf5plugin</li>
      <li>zarr</li>
      <li>blosc</li>
    </ul>
  </div>
</div>

---
layout: section
label: Part 3
---

# Packages from source with Pixi Build

---
layout: keynote
eyebrow: Preview
link: pixi.sh/latest/build/getting_started
---

# Pixi can build software from source

<p class="lead">A build backend knows how to build one kind of project.</p>

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
link: pixi.sh/latest/build/dependency_types
---

# Showcasing SciPy

::left::

- Still in preview
- Backend takes care of building a conda package
- C and C++ compilers are automatically set up
- `host-dependencies` specify libraries necessary during both build- and run-time


::right::
<CodeFile name="pixi.toml">

```toml
[workspace]
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

</CodeFile>


---
layout: compare
eyebrow: Preview
link: pixi.sh/latest/build/package_source
---

# Work on it, or depend on it

::left::

## Work on SciPy

<CodeFile name="pixi.toml">

```toml
[dev]
scipy = { path = "." }
```

</CodeFile>

SciPy itself is not built. Its build, host and run dependencies land in your environment, so you compile and test it yourself.

::right::

## Depend on SciPy

<CodeFile name="pixi.toml">

```toml
[dependencies]
scipy = { git = "https://github.com/scipy/scipy.git" }
```

</CodeFile>

Pixi follows Git, builds SciPy in an isolated environment and installs the resulting <code>.conda</code> package.

::after::

<Note class="text-base">Both need <code>preview = ["pixi-build"]</code> in the workspace.</Note>


---
layout: section
label: Part 4
---

# Ideas for better HPC support

---
layout: keynote
---

# My understanding of HPC requirements

<div class="relative grid grid-cols-2 gap-7 mt-20 before:content-empty before:absolute before:-top-3.5 before:-bottom-3.5 before:left-1/2 before:w-px before:bg-line">
  <div class="card p-6 border-t-8 border-t-ink rounded-t-none">
    <span class="label">Compute</span>
    <h2 class="min-h-[2lh]">Optimized for your hardware</h2>
    <p class="text-muted text-base">The software needs to fully utilize the CPU, GPU and system libraries on the machine.</p>
  </div>
  <div class="card p-6 border-t-8 border-t-accent rounded-t-none">
    <span class="label">Infrastructure</span>
    <h2 class="min-h-[2lh]">Able to deal with constrained storage and network</h2>
    <p class="text-muted text-base">Compute nodes may be offline. Shared filesystems make millions of small files expensive.</p>
  </div>
</div>


---
layout: code-right
eyebrow: Shipped
link: pixi.sh/latest/workspace/multi_platform_configuration
---

::title::

# Rich platforms

::left::

- Best of both worlds:
  - Lock file describing all platforms
  - Platforms can be as specific as needed to fit your machine
- The first platform that matches your machine will be used
- You can still use one environment for everything


::right::

<CodeFile name="pixi.toml">

```toml
[workspace]
platforms = [
  { name = "gpu", platform = "linux-64", cuda = "12.0" },
  { name = "cpu", platform = "linux-64" },
]

[target."*gpu*".dependencies]
pytorch-gpu = "*"

[target."*cpu*".dependencies]
pytorch-cpu = "*"
```

</CodeFile>

::after::



---
layout: code-right
eyebrow: Preview
link: pixi.sh/latest/build/package_source
---

::title::

# Build it for your hardware with Pixi Build

::left::

- There's no optimized build for your hardware?
- Specify your platform
- Build it yourself with Pixi Build

::right::

<CodeFile name="pixi.toml">

```toml
[workspace]
preview = ["pixi-build"]
platforms = [
  { name = "cluster", platform = "linux-64", archspec = "zen4" },
  "linux-64",
]

[dependencies]
scipy = "*"

[target.cluster.dependencies]
scipy = { git = "https://github.com/scipy/scipy.git" }
```

</CodeFile>

::after::



---
layout: two-cards
eyebrow: Shipped
link: pixi.sh/latest/deployment/pixi_pack
---

# Working with limited connectivity

::left::

## Offline mode

<code>pixi install --offline</code>

Great for limited or no internet connection. When solving, only considers packages that are already in the cache.

::right::

## pixi-pack

<code>pixi-pack --platform gpu pixi.toml</code>

Move a complete environment archive across the network boundary, then unpack it without Pixi.


---
layout: keynote
eyebrow: "Prototype"
link: "rattler#43"
---

# Layered package caches

<p class="lead">Environments of one user already share packages. This would add another cache layer, that is read-only and shared across users.</p>

<CacheMap />

---
layout: keynote
eyebrow: Prototype
link: "rattler#2059"
---

# Virtual filesystem

<p class="lead">No environment files are written. The mount serves them from the package cache.</p>

<MountMap />

<p class="text-muted text-xs">Fresh environments get much faster. Warm runs, mount lifecycle and user isolation still need work.</p>


---
layout: keynote
---

# What Pixi does today, and what it doesn't

<div class="grid gap-3.5 mt-8">
  <StatusRow state="shipped">Rich platforms, offline mode and pixi-pack</StatusRow>
  <StatusRow state="preview">Pixi Build</StatusRow>
  <StatusRow state="prototype">Cache layering and the virtual filesystem</StatusRow>
</div>


---
layout: end
---

# Let's keep talking

<p class="closing-subtitle">about your workflows, infrastructure and workarounds</p>

<div class="bubbles">
  <Bubble label="In the Q&A">right now</Bubble>
  <Bubble label="In the hallway">for the rest of the day</Bubble>
  <Bubble label="By email" href="mailto:julian@prefix.dev">julian@prefix.dev</Bubble>
</div>

<SlidesQr
  class="end-slides-qr"
  src="/slides-qr-code.png"
  label="link to the slides"
  href="https://hofer-julian.github.io/presentations/2026-09-nobugs-keynote/"
/>
