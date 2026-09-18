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

# <span class="cover-title-lead">Pixi for</span> Scientific Workflows


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
split: 62% 38%
fullHeight: true
---

::title::

# Julian Hofer

::default::

- Studied physics
- Wrote numerical water models at Deltares
- Build Pixi at prefix.dev

<LogoRow
  label="Communities I contribute to"
  :items="[
    { src: '/gnome-logo.svg', alt: 'GNOME' },
    { src: '/conda-forge.svg', alt: 'conda-forge', scale: 0.85 },
  ]"
/>


---
layout: section
label: Part 1
---

# How I got into reproducible software

---
layout: image-right
image: /mathematica-notebook.png
alt: Light-mode Mathematica notebook with executable code and a sine plot
source: "Source: wolfram.com"
sourceHref: https://www.wolfram.com/notebooks/
frame: false
blend: true
split: 50% 50%
---

::title::

# Physics and Mathematica

::default::

- I studied from 2013 to 2019
- Notebooks felt like magic
- Equations, code, and results in one place
- Immediate visual feedback

**Until an upgrade broke my script.**


---
layout: image-right
image: /deltares-water-model.png
alt: Delft3D Flexible Mesh displaying a coastal water model and its computational grid
source: "Source: deltares.nl"
sourceHref: https://www.deltares.nl/en/software-and-data/products/delft3d-flexible-mesh-suite
frame: false
split: 50% 50%
---

::title::

# Deltares

::default::

- Worked there from 2019 to 2024
- Open source numerical models
- Shared by researchers and engineers
- Expected to work for years


---
layout: keynote
---

# Two worlds

<Cards>
  <Card heading="Python">

Analysis, plotting, and orchestration.

Interpreter was tricky to manage on Windows.

  </Card>
  <Card heading="Compiled software" accent>

Dependencies written in C, C++ and Fortran.

Often installed through separate instructions.

  </Card>
</Cards>

<Statement centered>I needed both, in one environment.</Statement>


---
layout: image-right
image: /conda-logo.svg
alt: Conda package manager logo
frame: false
scale: 0.9
---

::title::

# Conda

::default::

**What worked**

- Python and compiled libraries together
- Linux, macOS, and Windows packages

**What was still missing**

- Fast environment creation
- A lock file
- Reusable project tasks


---
layout: image-right
image: /paxton-text-in-circle.svg
alt: Paxton, the Pixi mascot
frame: false
scale: 1.6
class: emoji-list
---

::title::

# Pixi to the rescue

::default::

- ⚡ Fast
- 🆓 Open source
- 🛠️ Workflow management
- 🌐 Multi-environments
- 🔒 Reproducible thanks to lock files
- 🐍 Supports conda and PyPI ecosystems


---
layout: code-right
link: pixi.sh/latest/getting_started
split: 1fr 1fr
---

::title::

# Pixi manifest

::left::

- **Channels** where conda packages come from
- **Dependencies** from those channels and from PyPI
- **Platforms** all locked in one `pixi.lock`
- **Tasks** commands that run inside the environment

<Note small><code>pixi run fit</code> installs the environment if needed, then runs the task</Note>

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
image: /conda-forge.svg
alt: conda-forge logo
link: conda-forge.org/docs/maintainer/adding_pkgs
frame: false
scale: 0.85
---

::title::

# Anyone can add a package

::default::

- Open a pull request to `staged-recipes`
- Get accepted
- Your package gets its own GitHub repository
- You are a conda-forge package maintainer

<Note>Close to 30,000 repositories live in the conda-forge organization.</Note>


---
layout: keynote
link: conda-forge.org/docs/maintainer/understanding_conda_forge/life_cycle
---

# The life of a conda-forge package

<Lead>The autotick bot opens the pull requests. You review them.</Lead>

<LifeCycle />

---
layout: code-right
link: "ceps#146"
split: 1fr 1fr
class: code-dense
---

::title::

# Conda Enhancement Proposals

::left::

- The format itself changes in the open
- A **CEP** is a proposal argued and voted on in `conda/ceps`
- **CEP 43:** conditional dependencies
- **CEP 44:** extra dependency groups
- **CEP 45:** flags
- **CEP 48:** how to roll it out

<Note small>Written together by conda, Anaconda, and prefix.dev. Pixi speaks <code>v3</code>, conda-forge does not yet.</Note>

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

# extra dependency groups and flags
my-analysis = {
  version = ">=1.0",
  extras = ["plot"],
  flags = ["cuda"],
}
```

</CodeFile>


---
layout: keynote
link: conda-forge.org/packages
---

# Your field is already doing this

<Lead>Each of these is a feedstock. Someone opened the pull request, and now keeps it building.</Lead>

<PackageColumns :groups="[
  { label: 'Acquisition and control', packages: ['bluesky', 'ophyd', 'databroker', 'pyepics', 'pytango'] },
  { label: 'Reduction and analysis', packages: ['pyfai', 'silx', 'dials', 'tomopy', 'sasview'] },
  { label: 'Formats and compression', packages: ['nexusformat', 'h5py', 'hdf5plugin', 'zarr', 'blosc'] },
]" />

---
layout: section
label: Part 3
---

# Packages from source with Pixi Build

---
layout: keynote
---

# Motivation

<Lead>Not every package is on a channel.</Lead>

<Cards>
  <Card heading="Your own code">

Your monorepo, or a colleague's Git repository.

  </Card>
  <Card heading="Someone else's code" accent>

The fix is on `main`, or the build does not match your machine.

  </Card>
</Cards>

<Statement centered>All of it should install like any other dependency.</Statement>

---
layout: keynote
link: pixi.sh/latest/build/getting_started
---

# Pixi can build software from source

<Flow role="img" aria-label="Source and project files flow through a Pixi Build backend into a conda package and then an environment">
  <div><strong>source + project files</strong></div>
  <div class="flow-highlight"><strong>Pixi Build backend</strong></div>
  <div><strong>conda package</strong></div>
  <div><strong>environment</strong></div>
</Flow>

<PillRow
  label="Supported build ecosystems"
  :items="['Python', 'CMake', 'Rust', 'R', 'ROS', 'Mojo', 'raw recipes']"
/>

<Note><code>path</code>, <code>git</code>, or <code>url</code> dependencies build automatically during normal Pixi use.</Note>


---
layout: code-right
link: pixi.sh/latest/build/dependency_types
class: code-dense
---

::title::

# Building SciPy from source

::left::

- Backend takes care of building a conda package
- C and C++ compilers are automatically set up
- `host-dependencies` specify libraries necessary at both build and run time


::right::
<CodeFile name="pixi.toml">

```toml
[workspace]
preview = ["pixi-build"]

[package.build]
backend.name = "pixi-build-python"
config.compilers = ["c", "cxx"]

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
link: pixi.sh/latest/build/package_source
centered: true
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

Installs only SciPy's dependencies

::right::

## Depend on SciPy

<CodeFile name="pixi.toml">

```toml
[dependencies]
scipy = { git = "https://github.com/scipy/scipy.git" }
```

</CodeFile>

Builds and installs SciPy itself


---
layout: section
label: Part 4
---

# Ideas for better HPC support

---
layout: keynote
---

# My understanding of HPC requirements

<Cards>
  <Card label="Compute" heading="Optimized for your hardware">

It has to use the CPU, GPU, and system libraries of the machine.

  </Card>
  <Card label="Infrastructure" heading="Constrained storage and network" accent>

Compute nodes may be offline. Shared filesystems make millions of small files expensive.

  </Card>
</Cards>


---
layout: code-right
link: pixi.sh/latest/workspace/multi_platform_configuration
---

::title::

# Rich platforms

::left::

- One lock file describes every platform
- A platform can be as specific as your machine needs
- The first match wins
- Still one environment for everything


::right::

<CodeFile name="pixi.toml">

```toml
[workspace]
platforms = [
  { name = "gpu", platform = "linux-64", cuda = "12.0" },
  { name = "cpu", platform = "linux-64" },
]

[target.gpu.dependencies]
pytorch-gpu = "*"

[target.cpu.dependencies]
pytorch-cpu = "*"
```

</CodeFile>



---
layout: code-right
link: pixi.sh/latest/build/package_source
split: 1fr 1fr
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



---
layout: keynote
link: pixi.sh/latest/deployment/pixi_pack
---

# Working with limited connectivity

<Cards>
  <Card heading="Offline mode">

<code>pixi install --offline</code>

When solving, Pixi only considers packages that are already in the cache.

  </Card>
  <Card heading="pixi-pack" accent>

<code>pixi-pack --platform gpu pixi.toml</code>

A whole environment as one archive, unpacked without Pixi.

  </Card>
</Cards>


---
layout: keynote
link: "rattler#43"
---

# Prototype: Layered package caches

<Lead>Environments of one user already share packages. This would add another cache layer that is read-only and shared across users.</Lead>

<CacheMap />

---
layout: keynote
link: "rattler#2059"
---

# Prototype: Virtual filesystem

<Lead>Packages are read directly from the cache instead of being linked into every environment.</Lead>

<MountMap />

<Footnote>Fresh environments get much faster. Warm runs, mount lifecycle, and user isolation still need work.</Footnote>


---
layout: keynote
---

# What Pixi does today, and what it doesn't

<StatusList>
  <StatusRow state="shipped">Rich platforms, offline mode, and pixi-pack</StatusRow>
  <StatusRow state="preview">Pixi Build</StatusRow>
  <StatusRow state="prototype">Cache layering and the virtual filesystem</StatusRow>
</StatusList>


---
layout: end
---

# Let's keep talking

<p class="closing-subtitle">about your workflows, infrastructure, and workarounds</p>

<Bubbles>
  <Bubble>In the Q&A</Bubble>
  <Bubble>In the hallway</Bubble>
  <Bubble href="mailto:julian@prefix.dev">julian@prefix.dev</Bubble>
</Bubbles>

<SlidesQr
  src="/slides-qr-code.png"
  label="link to the slides"
  href="https://hofer-julian.github.io/presentations/2026-09-nobugs-keynote/"
/>
