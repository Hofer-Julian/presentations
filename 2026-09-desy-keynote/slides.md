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
title: Pixi for Scientific Workflows
---

<p class="eyebrow">NOBUGS 2026 · 23 September 2026</p>

# Pixi for Scientific Workflows

<p class="cover-speaker">Julian Hofer</p>


---
layout: image-right
image: /julian.jpg
backgroundSize: cover
class: intro-speaker
---

# Julian Hofer

- Studied Physics
- Worked on numerical water models
- Build Pixi at prefix.dev

<!--
I will introduce myself and talk a bit about my studies in physics and how I encountered Mathematica to solve problems.
-->

---
class: intro-visual
title: Physics and Mathematica
---

- Started out with Mathematica notebooks
- Visionary for Jupyter notebooks
- Mathematica updates broke my software

<figure class="intro-figure">
  <img src="/mathematica-notebook.png" alt="Light-mode Mathematica notebook with executable code and a sine plot" />
  <figcaption><a href="https://www.wolfram.com/notebooks/">Source: wolfram.com</a></figcaption>
</figure>

<!--
The notebooks were amazing, but after one release they broke the unit library and replaced it with a completely different API.
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
  <figcaption><a href="https://www.deltares.nl/en/software-and-data/products/delft3d-flexible-mesh-suite">Source deltares.nl</a></figcaption>
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

- Cross-language
- Cross-platform

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

- I started using Pixi
- Later, I joined prefix.dev to work on Pixi

<!--
That's why I started using Pixi the second the public alpha came out and later joined Prefix to work on Pixi.
-->

---
layout: image-right
image: /paxton-text-in-circle.svg
---

# Introducing Pixi

- Fast
- Open source
- Workflow management
- Multiple environments
- Reproducible thanks to lock files
- Supports conda and PyPI ecosystems

<!--
Timing: 5:00 to 5:45. The cover and personal introduction together have five minutes.

Pixi is a fast, open-source package and workflow manager. It supports conda and PyPI packages, manages multiple environments, and records dependencies in lock files.

These features address the requirements I ran into myself: native dependencies across languages, environments that remain reproducible, and commands that someone else can repeat.
-->

---
class: evidence-slide
---

# How are major software projects using Pixi

<p class="eyebrow">Evidence from project manifests</p>

<div class="evidence-grid">
  <article>
    <h2><a href="https://github.com/numpy/numpy/blob/e5a55be752f582b7eb6bbd617faa154fe11b8fe1/pixi-packages/pixi.toml">NumPy</a></h2>
    <p>Native toolchains belong in the project.</p>
    <code>c_compiler_version = ["21"]</code>
  </article>
  <article>
    <h2><a href="https://github.com/scipy/scipy/blob/9d1c64def25d346217c8a56305d2ade8c051ff37/pixi.toml">SciPy</a></h2>
    <p>Native libraries and repeatable workflows.</p>
    <code>blas-devel · build · test · docs</code>
  </article>
  <article>
    <h2><a href="https://github.com/pandas-dev/pandas/blob/c26625d6e79fe8f11dd00184a3c32b5cc68d70cc/pixi.toml">pandas</a></h2>
    <p>Different versions, across platforms.</p>
    <code>Python 3.11 to 3.14</code>
  </article>
  <article>
    <h2><a href="https://github.com/pydata/xarray/blob/cacf35d31f527290747b581b49b2dc32d6bad5cc/pixi.toml">Xarray</a></h2>
    <p>The data stack is not only Python.</p>
    <code>HDF5 · netCDF · rasterio</code>
  </article>
</div>

<!--
Timing: 5:45 to 7:00.

These are examples from actual project configurations, not a survey of why every contributor chose Pixi. NumPy specifies compiler build variants. SciPy combines native libraries with build, test and documentation tasks. pandas describes Python versions and Linux, macOS and Windows platforms. Xarray brings native data-format libraries into its backend environments.

The attraction is one place to describe requirements that otherwise get spread across separate setup instructions. Do not tour their CI matrices or turn this into a NumPy source-build tutorial. The rest of the talk is about the people using and extending scientific software.

Sources are linked from each project name on the slide and pinned to the inspected revisions.
-->

---
class: build-story
---

<p class="eyebrow">Pixi Build · available in preview</p>

# Your model belongs in the environment

<div class="package-flow" role="img" aria-label="C++ reservoir source is built into a conda package, then installed in the environment used by a Python analysis">
  <div><span class="eyebrow">Source</span><h2>Reservoir model</h2><p>C++ + CMake</p></div>
  <span class="flow-arrow" aria-hidden="true">→</span>
  <div><span class="eyebrow">Build</span><h2>Conda package</h2><p>Executable + dependencies</p></div>
  <span class="flow-arrow" aria-hidden="true">→</span>
  <div><span class="eyebrow">Use</span><h2>Python analysis</h2><p>Runs the installed model</p></div>
</div>

<p class="statement-lead">A colleague clones the project, not your machine.</p>
<p class="slide-caption">Runnable example: <code>snippets/reservoir-model/</code>. Illustrative model, not Deltares software.</p>

<!--
Timing: 7:00 to 8:30.

Scientific projects need more than third-party dependencies. A research group also has its own models, tools and analysis code.

This small example contains a C++ linear reservoir model and a Python analysis script. CMake installs the executable into a conda package. The Python script invokes that installed executable by name, not a binary left in a local build directory.

Pixi Build allows the project's own source package to participate in environment preparation. A colleague does not need a separate sequence of manually installed compilers and copied binaries.

This is an illustrative numerical example, not a claim about which Deltares model I worked on. The main story is collaboration on source code, not publishing a channel.

[Pixi Build source dependencies and preview status](https://pixi.prefix.dev/latest/build/getting_started/)
-->

---
class: build-manifest-slide
---

# A source dependency, not a setup checklist

<div class="manifest-columns">
<div>

```toml
[workspace]
channels = ["https://prefix.dev/conda-forge"]
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

</div>
<div class="manifest-explanation">
  <p><strong>Depend on the source.</strong><br>The model is part of the environment.</p>
  <p><strong>Keep the build system.</strong><br>The backend uses CMake.</p>
  <p><strong>Run the workflow.</strong><br>The analysis task consumes the installed model.</p>
  <code>pixi run analyse</code>
  <p class="slide-caption">Excerpts from the runnable example's manifest.</p>
</div>
</div>

<!--
Timing: 8:30 to 10:30.

The path dependency is the important line. The workspace consumes its own source package. Pixi can build that package while preparing the environment, so the installed reservoir-model command is available to Python.

The package build backend does not replace CMake. It connects the existing build system to conda package construction and the dependency model. The example's task is analyse = "python analyse.py".

The complete example also contains CMakeLists.txt, reservoir.cpp, analyse.py and the lockfile generated during verification. This slide omits the workspace name, task declaration and package description to keep the relevant parts readable.

From the example directory, run `pixi run analyse`. From the presentation repository root, run:

`pixi run --manifest-path 2026-09-desy-keynote/snippets/reservoir-model/pixi.toml analyse`

The example targets linux-64. Do not claim that this example was tested on other platforms.

[CMake backend](https://pixi.prefix.dev/latest/build/backends/pixi-build-cmake/)
-->

---
class: comparison-slide
---

# Why not just use a task?

<div class="role-pair">
  <div>
    <p class="eyebrow">Task</p>
    <h2>Describe a command</h2>
    <p>Run analysis, tests or a compiler.<br>Order the workflow's steps.</p>
  </div>
  <div>
    <p class="eyebrow">Source package</p>
    <h2>Describe a dependency</h2>
    <p>Build an installable artifact.<br>Carry its dependency metadata.</p>
  </div>
</div>

<p class="statement-lead">Use the build backend for the package.<br>Use a task for the workflow that consumes it.</p>

<!--
Timing: 10:30 to 11:45.

Tasks are useful and can absolutely invoke a compiler. The distinction is not that tasks are unable to build software.

A source package participates in dependency resolution, declares package requirements, and produces an artifact that can be installed into an environment. Its build, host and runtime requirements are different roles. Build backends connect that model to existing language and build tools.

In this example, the backend builds the executable and the analyse task runs Python with that executable available. We use both capabilities rather than replacing one with the other.

[Build concepts](https://pixi.prefix.dev/latest/build/getting_started/)
[Dependency roles](https://pixi.prefix.dev/latest/build/dependency_types/)
-->

---
class: statement-slide
---

<p class="eyebrow">Pixi Build · available in preview</p>

# Useful today.<br>Still being refined.

<div class="role-pair">
  <div><h2>Already useful</h2><p>Local and Git source dependencies.<br>Automatic builds during environment preparation.</p></div>
  <div><h2>Still uneven</h2><p>Backend coverage and configuration.<br>Project-specific build requirements.</p></div>
</div>

<!--
Timing: 11:45 to 13:00.

Pixi Build is available today behind the pixi-build preview flag. Do not present the entire source-to-package workflow as future work, or describe every backend as equally mature.

The current getting-started documentation explicitly lists limited backend coverage and missing backend parameters or features. That is the kind of gap where a concrete research project is more informative than an abstract feature request.

Locking software and build environments does not guarantee bit-identical binaries or numerically identical results on arbitrary hardware. This is about describing and preparing the software workflow, not replacing scientific validation.

[Current documented limitations](https://pixi.prefix.dev/latest/build/getting_started/)
-->

---
class: statement-slide
---

<p class="eyebrow">HPC · the running example</p>

# Make packages available.<br>Let projects choose.

<div class="role-pair">
  <div><h2>Infrastructure team</h2><p>Populate a shared cache with packages and metadata.</p></div>
  <div><h2>Researchers</h2><p>Describe the dependencies their own projects need.</p></div>
</div>

<p class="slide-caption">Available does not mean approved. A cache is not a shared environment.</p>

<!--
Timing: 13:00 to 14:00.

Use a cluster with a connected provisioning path and compute nodes without internet as the setting. The infrastructure team makes packages available. Researchers should not need an administrator to prepare every exact environment.

The cache is a supply of available packages, not automatically an approval list. Each researcher still has a project and its own dependency requirements. We will return to the access and ownership problems that make this multi-user setup harder than simply choosing a cache directory.

This is the workflow we want to support well across users, not a claim that all shared-cache integration is already solved.

[HiPerGator's Pixi guidance](https://docs.rc.ufl.edu/software/pixi/) shows why cache placement matters on real shared infrastructure.
-->

---
class: diagram-slide
---

<p class="eyebrow">Offline resolution · shipped</p>

# Start with what is available

<img class="workflow-diagram" src="/hpc-cache.svg" alt="A shared cache contains Python, two NumPy versions and SciPy; the external package channel is disconnected" />

<p class="slide-caption">Conda packages on the current platform. Package metadata is cached too.</p>

<!--
Timing: 14:00 to 15:00.

Offline mode is already shipped. The important capability is not simply executing an environment that was installed before the network disappeared.

For conda packages on the current platform, offline resolution restricts its candidates to packages already available locally. That includes the package cache and local file channels. Cached metadata is also needed.

The diagram shows an illustrative package set. Transitive dependencies and build strings are omitted. We are not claiming to have benchmarked or solved these exact illustrated builds.

[Offline configuration and solving behaviour](https://pixi.prefix.dev/latest/reference/pixi_configuration/#offline)
-->

---
class: diagram-slide
---

<p class="eyebrow">Offline resolution · shipped</p>

# New requirements. No network.

<img class="workflow-diagram" src="/hpc-resolve.svg" alt="Two research projects resolve different NumPy requirements against the same available package cache without accessing the external channel" />

<p class="slide-caption">The solver chooses compatible cached packages for each project.</p>

<!--
Timing: 15:00 to 17:00.

Now there are two projects. One needs NumPy below version 2. The other needs version 2 or newer. Both use Python 3.12 and SciPy 1.14 in this simplified example.

Neither exact environment had to be prepared in advance. Pixi can solve each project's requirements using the available package set while offline. This is a new resolution, not merely the reuse of an installed environment.

Keep the explanation on the successful path. There is no failure reveal or terminal demonstration.

The guarantee being illustrated is specifically the conda solve for the current platform. PyPI resolution runs offline through uv but does not provide the same cache-constrained selection guarantee. Separate build backends are not network-sandboxed by offline mode.

[Offline documentation](https://pixi.prefix.dev/latest/reference/pixi_configuration/#offline)
-->

---
class: diagram-slide
---

<p class="eyebrow">Offline resolution · shipped</p>

# Two projects. Two environments.

<img class="workflow-diagram" src="/hpc-environments.svg" alt="Project A gets a separate environment with NumPy 1.26 and Project B gets NumPy 2.1, both using packages from the shared cache" />

<p class="slide-caption">Share package storage, not a mutable environment.</p>

<!--
Timing: 17:00 to 18:30.

The output is a compatible environment for each project, with its own lockfile. Sharing a supply of packages does not require every researcher to agree on one set of versions.

Changing one project's requirements should not update another project's environment. This distinction matters later when we discuss who may write into shared storage.

Again, this is a schematic of package selection. A real environment also contains the selected package builds and their transitive dependencies.
-->

---
class: statement-slide
---

<p class="eyebrow">What offline mode enables today</p>

# The cache becomes the<br>package universe.

<p class="statement-lead">Resolve a new environment.<br>Not just rerun an old one.</p>

<p class="slide-caption">For locally available conda packages on the current platform.</p>

<!--
Timing: 18:30 to 20:00.

This is the central offline-mode takeaway. Researchers can change requirements and assemble new compatible environments from software that is already available to the machine.

The infrastructure team supplies packages rather than anticipating every combination of packages. Offline mode does not itself establish a multi-user permission policy, approve software, preserve research data, or capture every external service and driver.

Those boundaries do not diminish the shipped capability. They identify the separate infrastructure questions that we will return to.
-->

---
class: cache-problem-slide
---

<p class="eyebrow">Shared caches · reported limitation</p>

# Same group. Permission denied.

<div class="permission-example">
  <p class="eyebrow">Cached package metadata</p>
  <code>-rw-------  root  groupname  ...msgpack</code>
  <div class="permission-roles">
    <p><strong>Creator</strong><br>Can read the metadata.</p>
    <p><strong>Another group member</strong><br>Cannot use it to resolve.</p>
  </div>
</div>

<p class="slide-caption"><a href="https://github.com/prefix-dev/pixi/issues/6870">Reported with Pixi 0.76.2, #6870</a> · <a href="https://github.com/prefix-dev/pixi/issues/3741">Related shared-cache reports, #3741</a></p>

<!--
Timing: 20:00 to 22:30.

Return to the HPC setting. Offline resolution is shipped, but a cache containing the right packages is not enough if a different user cannot read its metadata.

Issue #6870 reports sharded repodata files created with owner-only permissions. The example involved root and ordinary-user machines accessing shared storage. Another group member received Permission denied while solving. Issue #3741 contains related reports about sharing caches between colleagues.

These are public reports, not a reproduction performed for this talk against the latest release. The source issue also involved a shared detached environment. We are using it as evidence of a cache-permission problem, not endorsing its shared mutable environment setup.

The important engineering detail is that a usable cache includes metadata and supporting state, not only the package archives. Choosing a directory is not a complete multi-user contract.
-->

---
class: statement-slide
---

<p class="eyebrow">Shared caches · the trust boundary</p>

# Readable is not the same as writable.

<div class="role-pair">
  <div><h2>Share reads</h2><p>Researchers can reuse the packages made available by the site.</p></div>
  <div><h2>Control writes</h2><p>Unrelated users must not be able to alter one another's software.</p></div>
</div>

<p class="statement-lead">A wider permission mask is not the whole design.</p>

<!--
Timing: 22:30 to 25:00.

It is tempting to fix a shared-cache problem by allowing everyone to write. But the cache contains code that will be executed, not only harmless downloaded data.

A trusted group that deliberately shares write access is one policy. A centrally maintained cache read by unrelated researchers is another. They should not silently become the same configuration.

Our running example uses the second policy: the infrastructure team maintains the shared supply and researchers resolve their own projects. Cache presence still means availability, not a promise that every package has been reviewed.

Separate project environments remain important. A lockfile cannot protect an executable from another user who has permission to alter the bytes backing it.
-->

---
class: layer-slide
---

<p class="eyebrow">Shared caches · an integration direction</p>

# Share the base. Keep writes private.

<div class="cache-layers" role="img" aria-label="A site-owned read-only package cache is shared by two users, each with a private writable cache and separate project environment">
  <div class="private-layer"><h2>Researcher A</h2><p>Private writable cache</p><p>Project A environment</p></div>
  <div class="private-layer"><h2>Researcher B</h2><p>Private writable cache</p><p>Project B environment</p></div>
  <div class="layer-connector" aria-hidden="true">↑ shared reads ↑</div>
  <div class="shared-layer"><strong>Site-owned package cache</strong><span>Read-only for researchers</span></div>
</div>

<p class="slide-caption">Layered package caches already exist in <a href="https://github.com/conda/rattler/pull/1003">Rattler</a>. Complete Pixi setup and metadata integration are separate work.</p>

<!--
Timing: 25:00 to 28:00.

This is an integration direction, not a newly invented low-level cache feature. Rattler's layered package-cache implementation was merged in 2025. The library can search cache layers and choose a writable layer for additions.

The useful site policy is a maintained read-only base plus private writable space. Researchers can reuse the common supply without acquiring permission to change it. Their project environments remain separate.

Do not present a user-facing ordered cache-layer configuration as verified or shipped in Pixi. Package-cache layers also do not by themselves establish the corresponding policy for repodata and every other cache component.

That gap between a library capability and a documented, consistently working multi-user setup is the engineering work to explain here. It needs an explicit policy, not a world-writable cache recipe.

[Merged layered package cache](https://github.com/conda/rattler/pull/1003)
[Shared metadata permissions](https://github.com/prefix-dev/pixi/issues/6870)
-->

---
class: priorities-slide
---

<p class="eyebrow">Shared caches · engineering priorities</p>

# Make the deployment contract explicit

<div class="priority-list">
  <div><h2>Access</h2><p>Consistent ownership and permissions across packages and metadata.</p></div>
  <div><h2>Concurrency</h2><p>Predictable behaviour when several users populate or read caches.</p></div>
  <div><h2>Lifecycle</h2><p>Clear responsibility for storage, cleanup and running jobs.</p></div>
</div>

<p class="slide-caption">Validate on real cluster filesystems. These are priorities, not a release-date promise.</p>

<!--
Timing: 28:00 to 30:00.

The goal is a setup that an infrastructure team can support, not a permission workaround that happens to work for one person.

Access rules need to cover the different types of cached state. Concurrency and locking need to behave as expected across users and the filesystems they actually use. Cache maintenance needs a clear owner and must account for the lifetimes of the environments and jobs that use the software.

These are acceptance questions for the overall integration. Do not imply that every individual mechanism is absent from Rattler today or claim a newly reproduced concurrency bug.

This is where feedback from real clusters can change the priorities: filesystem type, user and group policy, cache placement, quota, and the workaround currently being maintained.
-->

---
class: statement-slide
---

<p class="eyebrow">Takeaways</p>

# Keep the workflow.<br>Reduce the bookkeeping.

<div class="requirement-list">
  <p><strong>Make your code a dependency.</strong> Pixi Build connects source and environment.</p>
  <p><strong>Resolve from what is available.</strong> Offline mode is already useful.</p>
  <p><strong>Share packages, not mutable environments.</strong> Multi-user integration needs care.</p>
</div>

<!--
Timing: 30:00 to 31:30.

Return to the requirements from the beginning: keep software working, include dependencies across language boundaries, and describe the workflow someone else must repeat.

Source builds and offline resolution address concrete parts of that problem today. Shared research infrastructure exposes additional requirements around access, ownership and operation.

The point is not that one tool removes every scientific or infrastructure constraint. It is that those constraints should inform which parts of the software workflow we make explicit and which engineering problems we work on next.
-->

---
layout: end
routeAlias: questions
---

# Bring me your next constraint

<div class="closing-invitation">
  <span>Your workflow</span>
  <span>Your infrastructure</span>
  <span>Your workaround</span>
</div>

<div class="contact-grid">
  <div>
    <a href="https://pixi.sh/latest/" target="_blank" rel="noopener noreferrer"><img src="/pixi-qr-code.png" alt="Pixi documentation QR code" /></a>
    <p>Pixi</p>
  </div>
  <div>
    <a href="https://www.linkedin.com/company/prefix-dev/posts/?feedView=all" target="_blank" rel="noopener noreferrer"><img src="/linkedin-qr-code.png" alt="Prefix LinkedIn QR code" /></a>
    <p>LinkedIn</p>
  </div>
  <div>
    <a href="https://discord.gg/mJfRpHJ9" target="_blank" rel="noopener noreferrer"><img src="/discord-qr-code.png" alt="Prefix Discord QR code" /></a>
    <p>Discord</p>
  </div>
</div>

<p class="backup-link"><Link to="vfs">Q&amp;A backup: Rattler VFS</Link></p>

<!--
Timing: 31:30 to 33:00. End the main talk here. Reserve 33:00 to 45:00 for Q&A.

For the hallway conversation, bring a workflow rather than only a feature name. What are you trying to run or share? Which infrastructure constraint gets in the way? What do you currently do instead?

That gives us something concrete to investigate and a way to judge the impact of a change. Scientific requirements have already shaped Pixi. The audience can help identify the next ones.

The following VFS slides are Q&A backup material, outside the 33-minute main sequence. Use the link rather than advancing into them during the talk.
-->

---
routeAlias: vfs
hideInToc: true
class: backup-slide
---

<p class="eyebrow">Q&amp;A backup · experimental</p>

# What if an environment did not need installing?

<div class="package-flow" role="img" aria-label="Rattler VFS serves an environment view from a package cache through a virtual filesystem, with transformations performed on demand">
  <div><h2>Package cache</h2><p>The underlying files still exist.</p></div>
  <span class="flow-arrow" aria-hidden="true">→</span>
  <div><h2>Virtual filesystem</h2><p>Apply install-time changes on demand.</p></div>
  <span class="flow-arrow" aria-hidden="true">→</span>
  <div><h2>Environment view</h2><p>Avoid materializing another full tree.</p></div>
</div>

<p class="slide-caption">Draft work: <a href="https://github.com/conda/rattler/pull/2566">core VFS #2566</a> · <a href="https://github.com/conda/rattler/pull/2618">temporary execution #2618</a> · <a href="https://github.com/prefix-dev/pixi/pull/6548">Pixi integration #6548</a></p>

<p class="backup-link"><Link to="questions">Back to questions</Link> · <Link to="vfs-performance">Performance tradeoff</Link></p>

<!--
Backup only. No time allocated in the main 33-minute talk.

Shared package storage does not remove the cost of creating environment directory trees or applying install-time transformations. Rattler VFS explores serving an environment directly from the package cache, with transformations such as prefix replacement applied on demand.

Chris Burr's core implementation is rattler #2566. Dagmar Dinjens' newer #2618 builds on it for temporary rattler exec environments. Pixi #6548 explores persistent project environments with a sidecar. All three were open drafts when inspected, not shipped features.

The original motivation includes large environments, slow metadata operations and file-count quotas. Miles Cranmer's #4412 reports a one-million-file institutional quota. Do not attribute that report to the same users as the shared-permission reports.

Mount availability, lifetime and user isolation remain important. In particular, the local NFS prototype has an open per-user access-control report, #2579. Do not recommend it as a production multi-user-cluster setup.

[File-count quota report](https://github.com/prefix-dev/pixi/issues/4412)
[NFS access-control report](https://github.com/conda/rattler/issues/2579)
-->

---
routeAlias: vfs-performance
hideInToc: true
class: backup-slide
---

<p class="eyebrow">Q&amp;A backup · author-reported prototype measurements</p>

# Fresh setup can win.<br>Warm runs can lose.

<p>Warm execution on macOS arm64, using a local userspace NFS server:</p>

| Workload | VFS: rattler exec | Native: pixi exec |
| --- | ---: | ---: |
| ripgrep | ~57 ms | ~21 ms |
| Python + NumPy | ~440 ms | ~90 ms |

<p class="slide-caption">Source: <a href="https://github.com/conda/rattler/pull/2618">rattler #2618, July 2026</a>. Different CLIs, not a controlled HPC-filesystem benchmark.</p>
<p class="backup-link"><Link to="questions">Back to questions</Link></p>

<!--
Backup only.

The temporary-execution PR reports large cold/fresh-environment improvements but a measurable cost for warm reuse. The warm numbers on the slide are author-reported measurements from macOS arm64 with the local userspace NFS backend.

Do not describe this as a remote NFS or Lustre cluster benchmark, an independently reproduced result, or an improvement in numerical computation. The compared programs are rattler exec and pixi exec, so this is not an isolated filesystem-only comparison.

The Pixi workspace prototype #6548 has a different workload and mount lifecycle, and reports a smaller warm overhead. Those results should not be combined into one universal speedup.

The design question is which environment lifetimes benefit, and what mount reuse, metadata caching and concurrency can improve. Bas's discussion on #6548 recommends ephemeral environments as a first integration target before the larger sidecar architecture.

[Temporary execution measurements](https://github.com/conda/rattler/pull/2618)
[Pixi prototype measurements and scope discussion](https://github.com/prefix-dev/pixi/pull/6548)
-->
