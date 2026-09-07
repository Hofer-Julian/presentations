# Pixi for scientific communities: research

Research snapshot: 7 September 2026. Focus: roughly the past year.

## Conclusions for the keynote

Keep three main achievements:

1. **Pixi Build:** make researchers' own code a first-class dependency.
2. **Offline mode:** work with locally available packages without relying on network access.
3. **Self-contained scripts:** share small programs together with their dependencies, including native libraries and tools.

For future work, focus on two topics:

1. **Shared caches across Unix users:** a concrete problem for research groups and shared clusters.
2. **Rattler VFS:** an ambitious way to reduce the cost of creating environments on shared infrastructure.

Do not force four equally sized roadmap themes. ABI-correct development builds, environment matrices and dependency metadata are useful supporting examples, but too maintainer-focused to carry the general DESY talk.

Avoid the vague phrase "institutional deployment". Say **"Making Pixi work better on shared clusters"** and name the actual constraints: permissions, network filesystems, node-local scratch, restricted connectivity and site-provided libraries.

The connecting story: scientific projects use Pixi to reduce environment bookkeeping. Their next needs expose the boundaries between packages, native builds and shared research infrastructure.

## Main achievements

### Pixi Build

The achievement is the source-to-package workflow, not just a build command:

- Depend on local or Git-hosted code and build it automatically.
- Manage build, host and runtime dependencies together.
- Produce distributable conda packages.
- Use language-specific backends rather than replacing existing build systems.

Current backends cover Python, CMake, Rust, R, ROS, Mojo and rattler-build. A Python analysis package can depend on a laboratory's C++ or Fortran library without a separate set of manual installation steps.

Important milestones during the research period:

- `pixi publish` arrived in April 2026.
- Lockfile v7 arrived in May and records build and host environments alongside runtime dependencies. It also improves portability and reduces lockfile churn.
- Workspace-wide publishing arrived in July.
- Package-manifest compatibility-pinning specifications arrived in August.

**Status:** Pixi Build remains preview. The current command for producing a `.conda` artifact is `pixi publish`, with a local directory or channel as the destination. `pixi install` and `pixi run` automatically build source dependencies.

**Caveat:** locking the build environment does not guarantee bit-identical binaries, numerical determinism or complete isolation from the host system.

Sources:

- [Current build workflow and preview status](https://pixi.prefix.dev/latest/build/getting_started/)
- [Available backends](https://pixi.prefix.dev/latest/build/backends/)
- [Lockfile v7 explanation](https://prefix.dev/blog/lock-file-v7)
- [Workspace publishing, PR #6526](https://github.com/prefix-dev/pixi/pull/6526)
- [Compatibility pinning in v0.77.0](https://github.com/prefix-dev/pixi/releases/tag/v0.77.0)

### Offline mode

Two separate steps matter:

- **v0.74, July 2026:** explicit offline mode through `--offline`, an environment variable or configuration.
- **v0.75, July 2026:** conda solves restricted to packages available in the local package cache or a local `file://` channel.

The second step makes offline work more useful than simply running an already-installed environment: users can change an environment using packages they already have.

Scientific uses include disconnected compute nodes, restricted networks, fieldwork and travel.

**Limits:**

- Caches must contain the required packages and metadata.
- The local-package solve restriction applies to conda packages on the current platform. Other platforms use cached repodata.
- PyPI offline resolution does not provide the same guarantee that every selected distribution is locally installable.
- Build backends are separate processes; offline mode does not currently enforce their network behavior.
- Offline mode is not the same as running without modifying an environment.

`pixi-pack` is complementary existing tooling for transporting environments to another machine. It supports conda packages and PyPI wheels, but not arbitrary PyPI source distributions.

Sources:

- [Offline implementation, PR #6608](https://github.com/prefix-dev/pixi/pull/6608)
- [Local-only conda solving, PR #6644](https://github.com/prefix-dev/pixi/pull/6644)
- [Current offline documentation and limitations](https://pixi.prefix.dev/latest/reference/pixi_configuration/#offline)
- [pixi-pack](https://pixi.prefix.dev/latest/deployment/pixi_pack/)

### Self-contained scripts

Distinguish two milestones:

- **PEP 723 support:** released in v0.76 in August 2026. A Python file carries its environment; `tool.pixi` extends the metadata to conda dependencies.
- **`conda-script`:** merged in September 2026, experimental, and not included in the latest published v0.79.0 release at the research snapshot. Language-independent metadata supports examples in Python, R, C++, Fortran and other languages.

The scientific value is sharing a small analysis or teaching example without first turning it into a full project. Native dependencies matter: a Python-only dependency list cannot describe every geospatial or bioinformatics workflow.

The PEP 723 discussion includes a concrete motivation from marimo's Trevor Manz: share notebooks with conda and native dependencies, including a GDAL example.

**Caveat:** dependency declarations alone do not fix exact versions. Include the adjacent script lockfile when exact resolution matters. The `conda-script` format remains experimental while its standardization and syntax settle.

Sources:

- [PEP 723 implementation and scientific discussion, PR #6648](https://github.com/prefix-dev/pixi/pull/6648)
- [PEP 723 release, v0.76.0](https://github.com/prefix-dev/pixi/releases/tag/v0.76.0)
- [conda-script execution, PR #6909](https://github.com/prefix-dev/pixi/pull/6909)
- [Language examples and documentation, PR #6911](https://github.com/prefix-dev/pixi/pull/6911)

## Main opportunities

### Shared caches across Unix users

Research groups should be able to reuse packages and metadata without duplicate downloads or permission failures. They should not be able to corrupt one another's software.

The reports are concrete:

- **#3741:** shared-cache permissions, with later reports extending beyond trampolines to repodata.
- **#6870:** shared sharded-repodata `.msgpack` files created with user-only permissions, causing another user's installation to fail.
- **#949:** a broader federal-government bioinformatics request covering hundreds of HPC users and application-security constraints.

**Important upstream progress:** rattler already gained layered package caches in October 2025 through PR #1003. It searches layers in the supplied order and writes to the first writable layer. Do not present the underlying layered-cache implementation as missing.

Possible scope:

1. Correct permissions for explicitly trusted-group caches.
2. Expose and document administrator-owned read-only cache layers plus private writable layers. A user-facing ordered layer configuration in Pixi was not verified during this research.
3. Validate concurrent access and cache lifecycle with real cluster users.

This is not a proposal for world-writable caches, centrally forced package updates or inherited mutable environments. Those raise separate trust and reproducibility questions.

Sources:

- [Shared-cache permissions, #3741](https://github.com/prefix-dev/pixi/issues/3741)
- [Shared metadata permissions, #6870](https://github.com/prefix-dev/pixi/issues/6870)
- [Institutional bioinformatics requirements, #949](https://github.com/prefix-dev/pixi/issues/949)
- [Merged layered-cache implementation, rattler PR #1003](https://github.com/conda/rattler/pull/1003)

### Rattler VFS

**On a cluster, creating files can be more expensive than downloading bytes.**

A package cache avoids repeated downloads, but creating an environment still requires a directory tree and installation transformations. This becomes noticeable with large native stacks, many environments, file-count quotas and shared filesystems with expensive metadata operations.

Miles Cranmer's report in #4412 describes a one-million-file institutional quota and manually archiving environments, then unpacking them into `/dev/shm`.

Rattler VFS would present an environment directly from the package cache, applying transformations such as prefix replacement on demand rather than materializing every environment file separately.

Why this is especially relevant to science:

- Environments can contain large ROOT, PyTorch, CUDA and other native software stacks.
- Researchers often maintain many isolated environments.
- Shared cluster storage can have inode quotas and slow small-file operations.
- Distributed workloads may repeatedly prepare similar software environments.

It is useful outside science too. Scientific infrastructure makes these constraints particularly visible.

**Status:** rattler PR #2566 and Pixi PR #6548 are open drafts, not shipped features. The older rattler PR #1182 was replaced by #2566.

The Pixi prototype reports roughly **5 seconds versus 63 seconds** for first use of one large environment on Linux with a hot package cache. Warm use was roughly equivalent. These are author-provided prototype measurements, not a general benchmark or a claim that calculations run faster.

**Limits:** VFS does not eliminate the underlying package cache. Mount availability, permissions, source dependencies, writable overlays, concurrency and mount lifetime still need careful handling and validation on actual clusters.

A grounded starting point is ephemeral execution and build/host environments, as suggested in the PR discussion, before persistent workspace mounts and sidecar lifecycle management.

Possible audience-facing question:

> What if using another environment didn't require installing another environment?

Sources:

- [File-count quota report, #4412](https://github.com/prefix-dev/pixi/issues/4412)
- [Rattler VFS implementation, draft PR #2566](https://github.com/conda/rattler/pull/2566)
- [Pixi prototype, measurements and scope discussion, draft PR #6548](https://github.com/prefix-dev/pixi/pull/6548)

## Supporting material, not main roadmap themes

| Topic | Scientific evidence | Conclusion |
| --- | --- | --- |
| Rebuild when site MPI changes | [#4783](https://github.com/prefix-dev/pixi/issues/4783): cached `mpi4py` reused after external MPI changes | A concrete HPC example. External MPI is already possible; the gap is cache validity relative to external ABI changes. |
| ABI-correct editable builds | [#5270](https://github.com/prefix-dev/pixi/issues/5270): versioned-hdf5 across HDF5/Python variants | Useful under Pixi Build. Compiler and extra-argument support exist; focus on end-to-end rebuild correctness. |
| Coherent instrumented source stacks | [#6670](https://github.com/prefix-dev/pixi/issues/6670) and [SciPy ASAN PR #24066](https://github.com/scipy/scipy/pull/24066) | A compelling developer example, but the downstream PR remains open. Do not present the whole workflow as shipped. |
| Environment matrices | [#2236](https://github.com/prefix-dev/pixi/issues/2236): napari reports more than 50 test environments | Strong maintainer need, but not a main general-audience theme. |
| One dependency declaration | [#5981](https://github.com/prefix-dev/pixi/issues/5981): Bluesky; [#532](https://github.com/prefix-dev/pixi/issues/532): conda-first dependencies | Package-level mapping exists. Workspace/dev dependency mapping is a separate gap. |
| Dynamic package versions | [#2946](https://github.com/prefix-dev/pixi/issues/2946): research group manually edits versions around builds | A concrete Pixi Build usability improvement for existing Python packaging workflows. |
| Reliable incremental updates | [#6721](https://github.com/prefix-dev/pixi/issues/6721): PyPI-to-conda `pystac` migration; [#6902](https://github.com/prefix-dev/pixi/issues/6902): pandas report | Updating an environment should be equivalent to creating it fresh. The pandas observation was on v0.76.2, not the latest release. |
| Development overrides | [#4922](https://github.com/prefix-dev/pixi/issues/4922): Dask/distributed; [#5528](https://github.com/prefix-dev/pixi/issues/5528): upstream Git branches | Explicit PyPI overrides already solve the Dask example. Distinguish discoverability from missing capability. |
| Notebook environment selection | [pixi-kernel #78](https://github.com/renan-r-santos/pixi-kernel/issues/78) and [#77](https://github.com/renan-r-santos/pixi-kernel/issues/77) | Broadly relevant, but partly owned by the companion project. Basic Jupyter integration exists. |

## Other achievements worth keeping in reserve

- **Solve strategies, October 2025:** minimum-supported-dependency testing. [PR #4789](https://github.com/prefix-dev/pixi/pull/4789)
- **Rich platforms, June 2026:** represent CUDA driver/GPU architecture and glibc requirements beyond an OS/CPU label. These do not install drivers. [v0.71.0](https://github.com/prefix-dev/pixi/releases/tag/v0.71.0)
- **Filesystem controls, May onward:** configurable link modes, per-cache locations and node-local redirection. [PR #5525](https://github.com/prefix-dev/pixi/pull/5525), [cache documentation](https://pixi.prefix.dev/latest/reference/pixi_configuration/#cache)
- **Workspace inheritance and inline environments, June/July:** less duplicated manifest configuration. [v0.73.0](https://github.com/prefix-dev/pixi/releases/tag/v0.73.0), [v0.74.0](https://github.com/prefix-dev/pixi/releases/tag/v0.74.0)
- **Conda/PyPI mapping and collision detection, June:** more explicit control at the ecosystem boundary. Collision warnings are not a guarantee of safe mixed installs. [v0.71.0](https://github.com/prefix-dev/pixi/releases/tag/v0.71.0), [PR #6344](https://github.com/prefix-dev/pixi/pull/6344)
- **PyPI artifact hash enforcement, June:** actual verification against lockfile hashes, including cached artifacts. Do not imply this was always enforced. [PR #6353](https://github.com/prefix-dev/pixi/pull/6353)

## Guardrails for the talk

- **HPC is not entirely missing.** Rich platforms, cache controls, external-library workflows and run-only execution already exist.
- **Offline is not immutable.** `--offline` controls network use. For a prepared batch environment, `pixi run --as-is` means no install plus a frozen lockfile. [Run reference](https://pixi.prefix.dev/latest/reference/cli/pixi/run/)
- **An open issue can have a released fix.** The central CUDA override problem in #6653 was fixed by [PR #6826](https://github.com/prefix-dev/pixi/pull/6826); narrower platform-selection work remains.
- **Do not promise to rebuild Snakemake.** [#6621](https://github.com/prefix-dev/pixi/issues/6621) is a real bioinformatician's proposal for scheduling, resources, retries and wildcards, not an accepted roadmap. Site-reviewed Slurm/PBS examples and composition with existing workflow engines are a more defensible starting point.
- **Separate shipped, preview and prototype work.** This matters particularly for Pixi Build, conda-script and Rattler VFS.
- **Research evidence is not runtime verification.** Findings come from release notes, current documentation and issue/PR discussions. Open reports were not freshly reproduced against the latest release. Recheck status before presenting specific unresolved bugs.
