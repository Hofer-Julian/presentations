# Who is in the room at NOBUGS 2026: research

Research snapshot: 10 September 2026. Companion to `Research.md`, which covers the Pixi side.

## Short version

NOBUGS is the software conference of the **photon, neutron and muon facility world**. That world is organised almost exactly opposite to CERN: instead of one field building one instrument and one software stack, it is many instruments serving many fields, with thousands of short visiting-user experiments per year. That asymmetry is the reason facility software is heterogeneous, and it is the strongest available argument for per-project, cross-language, lock-file-based environments.

## NOBUGS itself

**New Opportunities for Better User Group Software.** Started in 1996 at the European Photon and Neutron campus in Grenoble (ESRF and ILL). 2026 is the 15th edition and the 30th anniversary, so roughly biennial. It returned to Grenoble in 2024 for the first time since the start.

Stated aim: foster collaboration and exchange between scientists and IT professionals working on software for X-ray, neutron and muon sources around the world. "User group" means the visiting scientists who come to a facility for beamtime, not a user group in the meetup sense.

**2026 logistics**

- 21 to 25 September 2026, Hamburg area.
- Organised by **European XFEL**, scientifically co-organised and co-hosted by **DESY**. Chair: Steffen Hauf (European XFEL).
- Main conference 22 to 24 September at the European XFEL Lighthouse visitor centre in Schenefeld. The keynote slot is 23 September.
- Satellite meetings and workshops on 21 and 25 September on the DESY campus in Bahrenfeld.
- NIAC 2026 (NeXus International Advisory Committee) runs 25 to 27 September, adjacent.

**Main-conference tracks:** advanced data acquisition, beamline control systems, detector software, data reduction, data analysis, data visualisation, workflow engines, experiment automation, AI/ML applications, FAIR data management, metadata and data formats, open source collaborations, UI/UX, research software engineering.

**Satellite meetings** (a good map of the ecosystem in the room): NIAC/NeXus, Bluesky, Ewoks, Mantid developer meeting, pyFAI, HTTomo, Karabo SCADA training, SciCat, scientific data compression, interoperable experiment orchestration, security practices for instrument control, agile development at research facilities, UX and GUI workshops.

Sources:

- [NOBUGS 2026 site](https://nobugs2026.xfel.eu/)
- [Indico overview](https://indico.xfel.eu/event/2/)
- [Scientific programme](https://indico.xfel.eu/event/2/program)
- [About NOBUGS](https://nobugs2026.xfel.eu/about_nobugs/)
- [NOBUGS conference series](https://www.nobugsconference.org/)

## The organisers

### DESY

Deutsches Elektronen-Synchrotron, founded 1959. A German national research centre in the **Helmholtz Association**, with sites in Hamburg-Bahrenfeld and Zeuthen near Berlin. Roughly 3,000 staff, a budget around 359 million euro (2024), and more than 3,000 guest scientists per year.

DESY names **four** research areas, which is the thing to understand about it:

1. **Accelerators.** Building and operating particle accelerators is treated as research in its own right, not just as infrastructure.
2. **Photon science.** Operating X-ray light sources for external users.
3. **Particle physics.** Currently ATLAS and CMS at the LHC, Belle II at SuperKEKB in Japan, plus on-site experiments: ALPS II (axion-like particle search reusing 250 m of straightened HERA dipoles), MADMAX, BabyIAXO, and LUXE (quantum electrodynamics in strong fields).
4. **Astroparticle physics.** Became its own division in 2018, mostly at Zeuthen: IceCube upgrade detectors and Cherenkov Telescope Array telescopes.

History worth knowing, because DESY people know it: charm-quark studies at DORIS after 1974, **discovery of the gluon** at PETRA in 1979, B-meson work with ARGUS in the 1980s that laid the ground for Belle and LHCb, and **HERA** (1992 to 2007), the only electron-proton collider ever built, which mapped the internal structure of the proton.

**Facilities today**

- **PETRA III:** synchrotron light source since 2010, one of the brightest storage rings in the world, 25 beamlines and roughly 60 measuring stations.
- **PETRA IV:** the planned ultra-low-emittance upgrade, aiming at the brightest hard X-ray source in the world for decades, targeting nanometre-scale quantitative measurements and real-time 3D imaging of heterogeneous materials.
- **FLASH:** the first soft X-ray free-electron laser, recently upgraded under FLASH2020+.
- DESY also builds and operates the **superconducting linear accelerator that drives the European XFEL**.

The Bahrenfeld campus additionally hosts CFEL, CSSB, the EMBL Hamburg outstation and Universität Hamburg groups, so the audience mixes facility staff, university researchers and structural biologists.

Sources:

- [DESY research overview](https://desy.de/desy_research/index_eng.html)
- [DESY particle physics](https://desy.de/desy_research/particle_physics/index_eng.html)
- [PETRA III](https://www.desy.de/research/facilities__projects/petra_iii/index_eng.html)
- [PETRA IV](https://photon-science.desy.de/facilities/petra_iv_project/index_eng.html)
- [DESY at the Helmholtz Association](https://www.helmholtz.de/en/about-us/helmholtz-centers/centers-a-z/centre/deutsche-elektronen-synchrotron-desy/)

### European XFEL

The actual organiser. A **non-profit limited liability company under German law (GmbH)** with international shareholders designated by partner governments under an intergovernmental convention. Twelve partner countries: Denmark, France, Germany, Hungary, Italy, Poland, Russia, Slovakia, Spain, Sweden, Switzerland, United Kingdom.

The machine is 3.4 km long, mostly underground, running from Science City Bahrenfeld in Hamburg to Schenefeld in Schleswig-Holstein. Superconducting accelerator technology operating at -271 degrees Celsius, which is what allows a very high repetition rate: up to **27,000 X-ray flashes per second**, with a peak brilliance around a billion times that of the best conventional X-ray sources.

That repetition rate is the software-relevant fact. European XFEL has an LHC-scale data-rate problem (megahertz detectors, online reduction and vetoing, petabytes per experiment) attached to a facility whose users change every few days.

European XFEL is a member of **EIROforum** alongside CERN, ESA, ESO, EMBL, ESRF, ILL and Fusion for Energy.

Sources:

- [European XFEL overview](https://www.xfel.eu/facility/overview/index_eng.html)
- [Partner countries](https://www.xfel.eu/organization/partner_countries/index_eng.html)
- [International comparison](https://www.xfel.eu/facility/comparison/index_eng.html)
- [EIROforum member profile](https://www.eiroforum.org/about-eiroforum/members/european-xfel/)

### The wider organiser set: the International Advisory Committee

The IAC is effectively a roll call of the world's photon and neutron facilities, and a good proxy for who is in the room. Chair: Nicholas Schwarz (Advanced Photon Source).

| Region | Facilities represented |
| --- | --- |
| Europe | ESRF (Grenoble), PSI (Switzerland), European XFEL, DESY, JCNS (Jülich), ESS (Lund), MAX IV (Lund), ALBA (Barcelona), SOLEIL (Paris), Elettra Sincrotrone Trieste, ISIS Neutron and Muon Source (UK) |
| Americas | APS, ALS, Brookhaven (NSLS-II), SNS (Oak Ridge), Canadian Light Source, LNLS (Brazil, Sirius) |
| Asia-Pacific | KEK (Japan), SPring-8/RIKEN (Japan), CSNS (China), ANSTO (Australia) |
| Africa | Necsa (South Africa) |

Source: [NOBUGS IAC](https://www.nobugsconference.org/iac.html)

## How this compares to CERN

### Organisational form

| | CERN | European XFEL | DESY |
| --- | --- | --- | --- |
| Legal form | Intergovernmental organisation, convention of 1954 | International non-profit GmbH under German law | German national centre, Helmholtz Association |
| Members | Roughly two dozen member states plus associates | 12 shareholder countries | Federal government plus Hamburg and Brandenburg |
| Scale | Around 2,500 staff, roughly 12,000 users worldwide | Several hundred staff, a few thousand users | About 3,000 staff, 3,000+ guest scientists per year |
| Mission | One field: particle physics | One facility, many fields | Four research areas, several facilities |

### The difference that actually matters for software

**CERN and high-energy physics are organised as a small number of very large, very long-lived collaborations.** ATLAS and CMS each have thousands of authors, one detector, one data stream, and a software stack maintained by the collaboration itself over decades. Because the field is homogeneous, distribution can be centralised: the LCG stack ships through **CVMFS**, a read-only globally distributed filesystem, with LCG views selecting package combinations inside a shell session. Over 900 external packages plus HEP-specific tools live in `/cvmfs/sft.cern.ch`. A physicist does not create an environment, they source a setup script that mounts one.

That model is excellent and completely unavailable to a photon or neutron facility.

**A light source or neutron source is a service facility.** PETRA III alone has around 60 measuring stations. Each hosts a steady stream of short experiments, typically a few days, by visiting groups from chemistry, biology, materials science, geoscience, engineering and cultural heritage. Those users:

- arrive with their own laptop and their own analysis code,
- use technique-specific software that differs per beamline (tomography, small-angle scattering, powder diffraction, spectroscopy, macromolecular crystallography, ptychography),
- leave with their data and finish the analysis at their home institution, on hardware nobody at the facility controls.

There is no single collaboration to bless a stack, no shared detector, no common data model, and no way to require CVMFS on a chemistry group's institutional laptop. Facilities instead maintain dozens of independent packages (Mantid, pyFAI, silx, DAWN, Bluesky, Ewoks, Karabo, SciCat, HTTomo, NeXus tooling) written in Python on top of compiled C, C++ and Fortran cores.

**Consequences to say out loud in the talk:**

- The data-volume argument does not separate these communities. European XFEL at 27,000 pulses per second is in LHC territory. What separates them is **organisational homogeneity**, not scale.
- HEP could solve distribution once, centrally, because the field is one customer. Facilities have to solve it per project, per user, per platform, which is exactly the shape of problem conda-forge and Pixi address.
- DESY sits on both sides. Its particle physicists are LHC users living in the CVMFS world; its photon scientists live in the heterogeneous world. The same institute runs both models, which makes the contrast concrete rather than theoretical for this audience.

Sources:

- [LCG releases and views](https://lcgdocs.web.cern.ch/lcgdocs/lcgreleases/introduction/)
- [Deployment of HEP software with a standard method](https://arxiv.org/pdf/2210.17261)
- [Analysis Facilities White Paper](https://arxiv.org/pdf/2404.02100)

## The fields of physics, and where these facilities sit

Useful because the audience is not one field, and because "photon science" is not a field at all.

### Rough map by scale and question

1. **Particle / high-energy physics.** Fundamental constituents and forces, the Standard Model and beyond. Method: collide things, build a detector around the collision. CERN, and DESY's LHC and Belle II groups.
2. **Nuclear physics.** Nuclei, nuclear matter, quark-gluon plasma. GSI/FAIR, Jefferson Lab, RHIC.
3. **Astroparticle physics, astrophysics, cosmology.** Cosmic messengers: gamma rays, high-energy neutrinos, gravitational waves; dark matter and dark energy. IceCube, CTA, DESY Zeuthen.
4. **Atomic, molecular and optical physics.** Single atoms and molecules, lasers, ultrafast and attosecond dynamics. Heavy user of free-electron lasers.
5. **Condensed matter and solid-state physics.** Many-body systems: magnetism, superconductivity, phase transitions, electronic structure. The core clientele of synchrotrons and neutron sources.
6. **Soft matter and biophysics.** Polymers, colloids, membranes, proteins. Overlaps structural biology.
7. **Plasma physics and fusion**, **geophysics**, **medical physics**, **quantum information**, and **accelerator physics** itself, which DESY treats as a research area rather than plumbing.
8. **Theory and computational physics** cut across all of the above.

Beyond physics proper, the dominant user base at light sources is **chemistry, materials science, structural biology and engineering**: catalysis, batteries, alloys, corrosion, additive manufacturing, drug targets, plus geoscience, environmental science and cultural heritage.

### The key framing: methods, not fields

**Photon science and neutron science are not fields of physics. They are method platforms.** A synchrotron, an FEL or a spallation source is a very expensive microscope that many fields queue up to use. High-energy physics is the reverse: one field builds its own instrument and uses it exclusively for decades.

That single sentence explains most of the software divergence, and it is probably the sharpest slide in this section.

### What the probes actually do

- **X-rays** scatter off electrons. Good for heavy elements, atomic and electronic structure. Brilliance buys small spots, coherence and fast timing.
- **Free-electron lasers** add femtosecond pulses and full transverse coherence: "diffract before destroy" on single particles, and time-resolved movies of chemical reactions.
- **Neutrons** scatter off nuclei and magnetic moments. Complementary to X-rays: sensitive to hydrogen and light elements, isotope contrast, deeply penetrating, and a direct probe of magnetism. Produced by reactors (ILL) or spallation sources (ISIS, SNS, ESS, CSNS, J-PARC).
- **Muons** implanted in a sample act as local magnetic probes (muon spin rotation). ISIS, PSI, TRIUMF, J-PARC.

This complementarity is why NOBUGS covers all three in one conference: same visiting-user model, same data-reduction-then-analysis pipeline shape, different physics of the probe.

## PyHEP and how it relates

### What PyHEP is

A workshop series of the **HEP Software Foundation**, initiated by Eduardo Rodrigues, on the use of Python in high-energy physics. Two strands:

- **PyHEP**, the users workshop. Traditionally online. PyHEP 2025 was hybrid at CERN, 27 to 30 October 2025.
- **PyHEP.dev**, an in-person developers workshop to set a shared roadmap for the year. 2025 in Seattle. **PyHEP.dev 2026 is at Nikhef in Amsterdam, 7 to 9 September 2026**, two weeks before this keynote.

Announced key topics for PyHEP.dev 2026: agentic software engineering and tooling, distributed computing and workflows, data analysis tools (I/O, histogramming, statistics, visualisation), and **packaging and distribution**.

### The ecosystem behind it

**Scikit-HEP** is the package family: uproot (ROOT file I/O in pure Python), awkward-array (nested, variable-length, jagged arrays with a NumPy-like API), hist and boost-histogram, vector, iminuit, pyhf, particle, fastjet, with coffea as an analysis framework on top. Much of it is coordinated and funded through **IRIS-HEP**. In April 2025 Scikit-HEP became one of the first two domain-specific stacks accepted into the Scientific Python Ecosystem Coordination core projects.

Culturally, PyHEP represents a field migrating from a C++ and ROOT monoculture toward the scientific Python array ecosystem, while keeping its own data model. HEP could not simply adopt pandas, because events are jagged: a collision has a variable number of jets, each with a variable number of tracks. So they built awkward-array, and that library is now used well outside HEP.

### The relation to NOBUGS

**Structurally they are complements.** NOBUGS is facility-side and cross-facility: many fields, many instruments, control systems through to analysis. PyHEP is field-side and cross-facility-irrelevant: one field, one ecosystem, mostly analysis. Both are venues where scientific software people agree on shared infrastructure rather than duplicating it.

**They share the technical problems almost exactly:**

- Large binary formats with domain semantics: ROOT files versus HDF5, NeXus and Zarr.
- Columnar and ragged data that does not fit a rectangular dataframe.
- Reduction close to the detector, then interactive analysis further away.
- Workflow engines, distributed execution, GPU offload.
- Packaging and distribution of stacks that are Python on the surface and compiled underneath.

**And technology already crosses over.** awkward-array and uproot were built for HEP and are general enough to be used outside it. Dask, xarray, scikit-image, zarr and the whole array ecosystem flow both ways. Both communities depend heavily on conda-forge; ROOT is packaged there, and CERN has separately been working on PyPI wheels for ROOT.

**Where this lands for the keynote.** HEP's distribution answer, CVMFS plus LCG views, works because the field is homogeneous, and it is precisely the answer that does not transfer to a facility with thousands of short, heterogeneous user experiments. Yet PyHEP.dev 2026 still lists "packaging and distribution" as a headline topic, which is evidence that even the homogeneous community has not finished the problem: the moment a physicist wants their own environment on their own machine, the central mount stops being the answer.

That is the bridge to the Pixi material in `Research.md`: cross-language dependencies, lock files, offline operation, shared caches on clusters, and self-contained scripts are needed by both communities, and NOBUGS is the audience that cannot solve it by centralising.

Possible framing line:

> High-energy physics could solve software distribution once, for everyone, because it is one experiment. You have to solve it once per user, and there are thousands of you.

Sources:

- [PyHEP activity page, HSF](https://hepsoftwarefoundation.org/activities/pyhep.html)
- [PyHEP.dev 2026, Nikhef](https://indico.nikhef.nl/event/7873/)
- [PyHEP 2025 users workshop](https://indico.cern.ch/e/PyHEP2025)
- [Scikit-HEP](https://scikit-hep.org/)
- [Scikit-HEP at IRIS-HEP](https://iris-hep.org/projects/scikit-hep.html)
- [Awkward Array](https://iris-hep.org/projects/awkward.html)
- [uproot](https://iris-hep.org/projects/uproot.html)
- [pip install ROOT experience report](https://cds.cern.ch/record/2946933/files/document.pdf)

## Things to be careful about in front of this audience

- **Do not call NOBUGS a CERN-style community.** Many attendees deliberately distinguish themselves from HEP's centralised model, and several facilities have been burned by advice that assumed it.
- **Do not treat "photon science" as a field.** Say method or platform. The audience contains chemists and biologists who are not physicists at all.
- **Do not imply facilities have no solution today.** They have Mantid, silx, pyFAI, Bluesky, Ewoks, SciCat, NeXus and conda-based deployments. The pitch is reducing environment bookkeeping, not filling a void.
- **European XFEL is the organiser, DESY the co-host.** Getting that order wrong on the opening slide would be noticed.
- **Data volume is not the differentiator.** European XFEL is comparable to LHC-scale rates. Heterogeneity is the differentiator.
