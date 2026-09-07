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
title: Pixi, the Missing Companion to Cargo
---

<h1 style="color: var(--slidev-theme-primary)">Pixi,</h1>

the Missing Companion to Cargo

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
image: original-ferris.png
backgroundSize: 20em
---

# Scientific Rust

- Strengths
  - Speed
  - Thread safety
  - Memory safety

<v-click>

- Weaknesses:
  - Steep learning curve
  - Difficult to depend on libraries *not* written in Rust
  - Lack of high quality libraries

</v-click>

---
layout: image-right
image: cargo-logo-small.png
backgroundSize: 20em
---

# Cargo is Not Enough

- No task runner
  - External tools are needed for pipelines
- No easy way to depend on scientific libraries
  - Rewrite in Rust (not feasible for many projects)
  - Compile them yourself in `build.rs`
    - Where does the compiler come from?
  - Detect the library on your system in `build.rs`
    - Where does the library come from?
  - Use external tool 

---
layout: image-right
image: paxton-text-in-circle.svg
backgroundSize: 40em
---

# Introducing Pixi

- 📦 Conda package ecosystem:
  - Cross-platform (Windows, macOS, Linux, ...)
  - Cross-language (C, C++, Fortran, Python, ...)
- ⚡ Fast & Open Source
- 🛠️ Workflow management
- 🌐 Multi-environments
- 🔒 Reproducible thanks to lock-files

---
layout: two-cols
---

# Pixi Workflow

<div>

`Cargo.toml`

<<< @/snippets/geos-rs-initial/Cargo.toml toml

</div>


`main.rs`

<<< @/snippets/geos-rs-initial/src/main.rs rs


::right::

<v-click>

`pixi.toml`

<<< @/snippets/geos-rs-initial/pixi.toml toml

</v-click>

<v-click>


```console
$ pixi run start

thread 'main' panicked at geos-sys-2.0.6/build.rs:137:13:
Could not detect GEOS using pkg-config or geos-config
```

</v-click>

---
layout: two-cols
---

# Pixi Workflow

<div>

`Cargo.toml`

<<< @/snippets/geos-rs-final/Cargo.toml toml

</div>


`main.rs`

<<< @/snippets/geos-rs-final/src/main.rs rs


::right::


`pixi.toml`

<<< @/snippets/geos-rs-final/pixi.toml toml {8-11}



```console
$ pixi run start

Area : 25
```




---
layout: image-right
image: paxton-text-in-circle.svg
backgroundSize: 30em
---

# Conclusion

- **Scientific Rust** needs more than just Cargo
- **Conda ecosystem**: Provides binary packages for multiple platforms and programming languages
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
      <a href="https://discord.gg/SQBR8dA5mF" target="_blank">
        <img src="/discord-qr-code.png" alt="Discord QR Code" class="w-32 h-32">
      </a>
      <p class="mt-2"><mdi-discord /> Discord</p>
    </div>
  </div>
</div>
