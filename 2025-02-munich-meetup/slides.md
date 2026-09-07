---
theme: seriph
class: "text-center"
background: "#111111"
highlighter: shiki
lineNumbers: false
fonts:
  sans: Dosis
  mono: "Fira Mono"
colorSchema: dark
themeConfig:
  primary: "#facc15"
title: Pixi, Conda, and the Future of Python Development
---

<h1 style="color: var(--slidev-theme-primary)">Pixi, Conda,</h1>

and the Future of Python Development

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
layout: center
---

# Question Time!
---
layout: center
---

# Do You Use Python at Least on a Weekly Basis?
---
layout: center
---

# Do You Use Conda to Manage Your Python Environments?
---
layout: center
---

# Do You Use Conda with Languages *Other* than Python?

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

<div v-click>

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
</div>

---
layout: image-right
image: numpylogo.svg
backgroundSize: 30em
---

# Installing NumPy via Conda

From the NumPy contributor docs:
> If you are using Conda, you can skip the steps in this section - with the exception of installing compilers for Windows or the Apple Developer Tools for macOS. All other dependencies will be installed automatically [...] 


```bash
conda env create -f environment.yml

# or
pixi init --import environment.yml
```


---
layout: center
---

# Ecosystem Comparison

<div class="w-lg">

| Feature                    | Conda | PyPI        |
|----------------------------|-------|-------------|
| Official Python Index      | ⚠️    | ✅          |
| Cross-Platform             | ✅    | ✅          |
| Cross-Language             | ✅    | ⚠️          |
| Decentralized              | ✅    | ⚠️          |
| Traditional Package Manager| conda | pip (conda) |
| Modern Package Manager     | pixi  | uv (pixi)   |


</div>

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

---
layout: two-cols
---

# Pixi Workflow

<div class="max-w-xs">

Initialization
```bash
pixi init demo
```
<v-click>

Adding `cowpy` and `python`
```bash
pixi add cowpy python
```

</v-click>

<v-click at="3">


Running a task

```bash
pixi run python hello.py
```

```
 ______________ 
< Hello Munich >
 -------------- 
     \   ^__^
      \  (oo)\_______
         (__)\       )\/\
           ||----w |
           ||     ||
```

</v-click>

</div>

::right::

`pixi.toml`
````md magic-move {at: 1}

<<< @/snippets/pixi-init/pixi.toml

<<< @/snippets/pixi-deps-add/pixi.toml {8-10}

````

<v-click at="2">

`hello.py`

<<< @/snippets/pixi-deps-add/hello.py python


</v-click>

---
layout: two-cols
---

# Tasks

<div class="max-w-xs">

Add a task
```bash
pixi task add hello "python hello.py"
```

<div v-click>


Running a task

```bash
pixi run hello
```

```
 ______________ 
< Hello Munich >
 -------------- 
     \   ^__^
      \  (oo)\_______
         (__)\       )\/\
           ||----w |
           ||     ||
```

</div>

</div>

::right::

`pixi.toml`
<<< @/snippets/pixi-task-add/pixi.toml {6-7}


---
layout: two-cols
---

# Multiple Environments

<div class="max-w-xs">


```bash
pixi run hello --environment=py312
```

```
 _________________________ 
< Hello from Python 3.12! >
 ------------------------- 
     \   ^__^
      \  (oo)\_______
         (__)\       )\/\
           ||----w |
           ||     ||
```

<v-click>

```bash
pixi run hello --environment=py313
```

```
 _________________________ 
< Hello from Python 3.13! >
 ------------------------- 
     \   ^__^
      \  (oo)\_______
         (__)\       )\/\
           ||----w |
           ||     ||
```

</v-click>



</div>

::right::

<v-click>


`pixi.toml`

```toml
[feature.py312.dependencies]
python = "3.12.*"

[feature.py313.dependencies]
python = "3.13.*"

[environments]
py312 = ["py312"]
py313 = ["py313"]
```


`hello.py`

<<< @/snippets/pixi-multi-env/hello.py python

</v-click>

---

# Lock file

- 👐 `pixi.toml`: direct dependencies
- 🔒 `pixi.lock`: whole dependency graph
- 🎆 Fully reproducible setup

<div v-click class="mt-10">

<<< @/snippets/pixi-multi-env/pixi.lock yaml {123-131}{lines: true, maxHeight: '250px'}

</div>


---
layout: two-cols
---

# Space efficient

<div class="max-w-xs">


```bash
tree -L 3 -a
```

```
.
├── .gitattributes
├── .gitignore
├── hello.py
├── .pixi
│   ├── envs
│   │   ├── default
│   │   ├── py312
│   │   └── py313
│   └── .gitignore
├── pixi.lock
└── pixi.toml
```

</div>

::right::

<v-click>

```mermaid
graph LR
    subgraph Cache
        B[Global Cache for Shared Packages]
    end
    subgraph Workspace 1
        A[Environment: default] --> B
        C[Environment: py312] --> B
        E[Environment: py313] --> B
    end
    subgraph Workspace 2
        G[Environment: default] --> B
        I[Environment: dev] --> B
        K[Environment: lint] --> B
    end
```

</v-click>

---

<div class="grid grid-cols-6 gap-4 mt-4">
  <img src="/languages/c/c-original.svg" alt="C">
  <img src="/languages/cplusplus/cplusplus-original.svg" alt="C++">
  <img src="/languages/csharp/csharp-original.svg" alt="C#">
  <img src="/languages/fortran/fortran-original.svg" alt="F">
  <img src="/languages/go/go-original.svg" alt="Go">
  <img src="/languages/haskell/haskell-original.svg" alt="Haskell">
  <img src="/languages/java/java-original-wordmark.svg" alt="Java Wordmark">
  <img src="/languages/javascript/javascript-original.svg" alt="JavaScript">
  <img src="/languages/kotlin/kotlin-original.svg" alt="Kotlin">
  <img src="/languages/lua/lua-original.svg" alt="Lua">
  <img src="/languages/nodejs/nodejs-original-wordmark.svg" alt="Node.js Wordmark">
  <img src="/languages/php/php-original.svg" alt="PHP">
  <img src="/languages/python/python-original.svg" alt="Python">
  <img src="/languages/r/r-original.svg" alt="R">
  <img src="/languages/rust/rust-original.svg" alt="Rust">
  <img src="/languages/typescript/typescript-original.svg" alt="TS">
  <img src="/languages/wasm/wasm-original.svg" alt="R">
  <img src="/languages/zig/zig-original-wordmark.svg" alt="Zig Wordmark">
</div>


---
layout: image-right
image: qgis.jpg
backgroundSize: 28em
---

# Cross-language

- 📝 Version-control with `git` (written in C)

```bash
pixi add git 
```

- 🐙 Manage GitHub repos with `gh` (written in Go)

```bash
pixi add gh
```

- 🌍 Geoscience with `QGIS` (written in C++)

```bash
pixi add qgis
```

---


# Pixi global

- 📦 `pixi add` adds dependencies to a workspace.
- 🌍 `pixi global install` installs tools globally on your system.
- 🛠️ Each tool is isolated in its own virtual environment.
- 🚀 Improved support for GUIs coming soon!

Usage:
```bash
pixi global install git gh qgis
```

<br/>


```mermaid
graph TB
    A[git Environment] -->|git executable| D[Shared Folder in PATH]
    B[gh Environment] -->|gh executable| D
    C[qgis Environment] -->|qgis executable| D
```

---
layout: two-cols
hide: true
---


# Workspace & Source Dependencies

- Experimental, soon to be stabilized
- Build directly from source code
- Manage multiple packages within your workspace
- Useful for:
  - big applications
  - dependencies within one organization

::right::

<div class="flex justify-center">

```mermaid
graph TB
    A[Python Application] -->|Depends on| B[C++ Application]
    B --> C((Change triggers Recompilation))
    C --> B
```

</div>


---
layout: image-right
image: paxton-text-in-circle.svg
backgroundSize: 30em
---

# Conclusion

- **Dependency management** becomes easier with modern tools
- **Conda**: Cross-platform & cross-language with decentralized channels
- **Pixi**: Package and workflow manager, built on the Conda ecosystem

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
      <a href="https://www.linkedin.com/in/hofer-julian/" target="_blank">
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
