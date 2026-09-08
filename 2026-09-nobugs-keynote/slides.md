---
theme: ../themes/prefix-keynote
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
  <div class="beamline-track" aria-hidden="true">
    <span class="beamline-source"></span>
    <span class="beamline-node beamline-node-a">environment</span>
    <span class="beamline-node beamline-node-b">software</span>
    <span class="beamline-node beamline-node-c">results</span>
  </div>
  <h1><span>Pixi for</span> Scientific Workflows</h1>
  <p class="cover-speaker">Julian Hofer</p>
</div>

<!--
Scientific software connects environments, compiled software and results. This talk follows that line from my own first reproducibility problem to the constraints of shared research infrastructure.
-->

---
class: toc-slide
---

# Today

1. **Why reproducibility became personal**
   Physics, notebooks and numerical models
2. **From environments to packages**
   Pixi Build and compiled research software
3. **Designing for shared infrastructure**
   Multi-user caches on HPC systems
4. **Your constraints**
   What should Pixi solve next?

<!--
The story starts with a script that stopped working, then grows from one workstation to a shared cluster. Pixi Build and layered package caches address different parts of that same problem.
-->

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

<!--
I came to package management through scientific software rather than through package management itself. Each step in this talk is a problem I have encountered or now work on directly.
-->

---
layout: section
label: Part 1
---

# Reproducibility became personal

A script should outlive the machine that created it.

---
layout: image-right
image: /mathematica-notebook.png
alt: Light-mode Mathematica notebook with executable code and a sine plot
source: Source · wolfram.com
sourceHref: https://www.wolfram.com/notebooks/
eyebrow: Physics and Mathematica
---

# Notebooks felt like magic

- Equations, code and results in one place
- Immediate visual feedback
- A complete scientific thought in one document

**Until an upgrade broke my script.**

<!--
Mathematica notebooks already had many ideas we now associate with computational notebooks. The document felt self-contained, but the software environment was not. A release changed the units API and an existing script stopped working.
-->

---
layout: keynote
class: statement-slide reproducibility-slide
eyebrow: The missing part
---

# The notebook was saved.<br>The environment was not.

<div class="reproducibility-equation">
  <span>code</span><b>+</b><span>dependencies</span><b>+</b><span>tools</span><b>=</b><strong>reproducible work</strong>
</div>

<p class="statement-lead">“It worked last year” is not enough.</p>

<!--
Saving the source is necessary, but it does not preserve the interpreter, libraries, system tools or commands needed to run it. Reproducibility starts when those inputs become explicit.
-->

---
layout: image-right
image: /deltares-water-model.png
alt: Delft3D Flexible Mesh displaying a coastal water model and its computational grid
source: Source · deltares.nl
sourceHref: https://www.deltares.nl/en/software-and-data/products/delft3d-flexible-mesh-suite
eyebrow: Deltares
---

# Open source numerical water models

- Python for analysis and orchestration
- Compiled libraries for simulation
- Shared by researchers and engineers
- Expected to work for years

<!--
At Deltares I worked with open source numerical water models. The Python interpreter was only one piece. Compilers, native libraries and platform-specific binaries were just as important and much harder to manage consistently.
-->

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

<!--
A requirements file could describe Python packages, but not the complete native stack around the model. The setup became a chain of package managers and undocumented machine state.
-->

---
layout: image-right
image: /conda.png
alt: Conda package manager logo
eyebrow: Conda
class: conda-slide
---

# Cross-platform and cross-language

**What worked**

- Python and compiled libraries together
- Linux, macOS and Windows packages

**What was still missing**

- Fast environment creation
- A first-class lock file
- Reusable project tasks

<!--
Conda solved the language boundary better than Python-only tools. It gave us binaries across platforms. But the workflow still lacked speed, deterministic lock files and a task model that teammates could run consistently.
-->

---
layout: image-right
image: /paxton-text-in-circle.svg
alt: Paxton, the Pixi mascot
eyebrow: Pixi
---

# One project, one workflow

- Conda and PyPI dependencies
- A cross-platform `pixi.lock`
- Named tasks with `pixi run`
- Multiple environments in one manifest
- Fast, written in Rust

<!--
Pixi keeps the cross-language package ecosystem and makes the project itself the unit of work. The manifest, lock file and task names can be committed together.
-->

---
layout: section
label: Part 2
---

# From environments to packages

Your own compiled code belongs in the dependency graph too.

---
layout: keynote
class: build-story
eyebrow: Pixi Build
---

# Your model belongs in the environment

<div class="package-flow" role="img" aria-label="C++ reservoir source is built into a conda package and used by a Python analysis">
  <div><span class="eyebrow">Source</span><h2>Reservoir model</h2><p>C++ + CMake</p></div>
  <span class="flow-arrow" aria-hidden="true">→</span>
  <div><span class="eyebrow">Build</span><h2>Conda package</h2><p>Executable + dependencies</p></div>
  <span class="flow-arrow" aria-hidden="true">→</span>
  <div><span class="eyebrow">Use</span><h2>Python analysis</h2><p>Runs the installed model</p></div>
</div>

<p class="statement-lead">A colleague clones the project, not your machine.</p>

<!--
This follows the same pattern used by scientific Python projects such as CPython and NumPy in the SciPy 2026 talk: source code becomes a package with explicit build and runtime dependencies. The example here uses a small CMake reservoir model and a Python analysis.
-->

---
layout: code-right
eyebrow: A local source package
---

# Keep the build system.<br>Describe the package.

::left::

- `reservoir-model` is a project dependency
- `pixi-build-cmake` calls the existing CMake build
- Build and runtime dependencies become explicit
- `pixi run analyse` uses the installed executable
- Example: `snippets/reservoir-model/`

::right::

```toml
[workspace]
channels = ["conda-forge"]
platforms = ["linux-64"]
preview = ["pixi-build"]

[dependencies]
python = "3.13.*"
reservoir-model = { path = "." }

[package]
name = "reservoir-model"
version = "0.1.0"

[package.build.backend]
name = "pixi-build-cmake"
version = "0.*"
```

<!--
The path dependency is the key line. Pixi prepares the environment by building the local package through its declared backend. CMake remains the build system. Pixi connects it to package metadata and dependency resolution.

From the repository root, run `pixi run --manifest-path 2026-09-nobugs-keynote/snippets/reservoir-model/pixi.toml analyse`.
-->

---
layout: two-cards
eyebrow: Two complementary tools
---

# Package the software.<br>Task the workflow.

::left::

## Source package

Build an installable artifact.

Declare build, host and runtime dependencies.

::right::

## Task

Run analysis, tests or a compiler.

Connect the workflow's steps.

::after::

<p class="statement-lead">Pixi Build prepares it. <code>pixi run</code> uses it.</p>

<!--
A task can invoke a compiler, but it does not make the output a dependency with package metadata. The source package and the analysis task solve different problems and work together.
-->

---
layout: section
label: Part 3
---

# Designing for shared infrastructure

A cluster turns one reproducible project into a multi-user systems problem.

---
layout: keynote
class: hpc-requirements
eyebrow: HPC needs
---

# One package supply. Many independent projects.

- **Available without internet** on compute nodes
- **Readable by many users** without copying every package
- **Writable through a controlled path**
- **Isolated project environments** for different requirements
- **Safe under concurrency** on shared filesystems
- **Owned and maintained** with an explicit lifecycle

<p class="slide-caption">Share package storage, not one mutable environment.</p>

<!--
The goal is not one centrally managed environment for everyone. Infrastructure teams should make packages available while researchers keep independent project requirements and lock files. Access, concurrency and lifecycle are part of the deployment contract.
-->

---
layout: two-cards
eyebrow: The trust boundary
---

# Readable is not the same as writable

::left::

## Shared reads

Researchers reuse packages maintained by the site.

No duplicate download or extraction for every user.

::right::

## Controlled writes

Unrelated users cannot alter software that others execute.

Private work does not pollute the shared base.

::after::

<p class="statement-lead">A world-writable cache is not the answer.</p>

<!--
The cache contains executable software and metadata used by the solver. Making all of it writable to every user crosses a security boundary. A useful design shares reads while keeping writes controlled.
-->

---
layout: keynote
class: layer-slide
eyebrow: Rattler layered package caches
---

# Share the base. Keep writes private.

<div class="cache-layers" role="img" aria-label="A site-owned read-only package cache is shared by two researchers, each with a private writable cache and project environment">
  <div class="private-layer"><h2>Researcher A</h2><p>Private writable cache</p><p>Project A environment</p></div>
  <div class="private-layer"><h2>Researcher B</h2><p>Private writable cache</p><p>Project B environment</p></div>
  <div class="layer-connector" aria-hidden="true">↑ shared reads ↑</div>
  <div class="shared-layer"><strong>Site-owned package cache</strong><span>Read-only for researchers</span></div>
</div>

<p class="slide-caption">Rattler already supports ordered package cache layers. Pixi still needs a complete user-facing integration.</p>

<!--
Rattler's layered package cache can search several cache locations and choose a writable layer for additions. That provides the mechanism for a maintained read-only base and private writable overlays.

This is not a claim that the complete Pixi configuration and metadata policy already ship. Repodata, permissions, cleanup and filesystem behaviour still need a coherent integration.

Source: https://github.com/conda/rattler/pull/1003
-->

---
layout: keynote
class: priorities-slide
eyebrow: Mechanism plus policy
---

# Layering solves the shape.<br>Operations complete the design.

<div class="priority-list">
  <div><h2>Access</h2><p>Ownership and permissions cover packages and metadata.</p></div>
  <div><h2>Concurrency</h2><p>Readers and writers behave predictably on real cluster filesystems.</p></div>
  <div><h2>Lifecycle</h2><p>Storage, cleanup and running jobs have a clear owner.</p></div>
</div>

<p class="slide-caption">The requirements must be validated with the people operating real clusters.</p>

<!--
A library capability is not yet an operational contract. The integration has to include every cache component, concurrent use and cleanup rules. This is where experience from real facilities matters most.
-->

---
layout: keynote
class: statement-slide
eyebrow: The thread through all of this
---

# Keep the workflow.<br>Make its inputs explicit.

<div class="requirement-list">
  <p><strong>Reproduce the environment.</strong> Commit dependencies, platforms and tasks.</p>
  <p><strong>Package your own software.</strong> Connect source builds to the dependency graph.</p>
  <p><strong>Share packages safely.</strong> Separate a common base from private writes.</p>
</div>

<!--
The scale changes from a notebook to a cluster, but the principle stays the same: make hidden inputs and responsibilities explicit. Pixi can already cover much of the project workflow. Shared infrastructure shows where the design still needs work.
-->

---
layout: end
---

# Talk with me in person

<p class="closing-question">Tell me about your workflow, infrastructure and workarounds.</p>

<div class="closing-contact">
  <a href="https://hofer-julian.github.io/presentations/2026-09-nobugs-keynote/" target="_blank" rel="noopener noreferrer"><img src="/slides-qr-code.png" alt="QR code for the hosted slides" /></a>
  <p class="closing-email"><a href="mailto:julianhofer@gnome.org">julianhofer@gnome.org</a></p>
</div>

<!--
Please come and talk with me after the session. You can also email me, and the QR code opens the hosted slides.
-->
