/**
 * EDUCAPT AI — SAMPLE EDUCATIONAL DOCUMENTS
 * Realistic curriculum-aligned educational texts for the reading workspace.
 * Lead: Member 1 (Frontend & CSS Accessibility Engine Lead)
 */

export const SAMPLE_DOCUMENTS = [
  {
    id: 'doc-photosynthesis',
    title: 'Photosynthesis: How Plants Transform Light into Chemical Energy',
    subtitle: 'Cellular Biology and Ecological Energy Flow',
    subject: 'Biology & Life Sciences',
    gradeLevel: 'Grade 9–10',
    readTimeMinutes: 5,
    wordCount: 840,
    author: 'Dr. Evelyn Vance, Department of Plant Physiology',
    lastUpdated: 'October 2026',
    summary: 'An exploration of chloroplast architecture, light-dependent reactions, and the Calvin cycle, explaining how photoautotrophs convert sunlight, water, and carbon dioxide into sugars and oxygen.',
    sections: [
      {
        id: 'sec-intro',
        heading: '1. The Foundation of Planetary Life',
        paragraphs: [
          'Every breath of oxygen you take and nearly every calorie of food consumed by living organisms on Earth originates from a fundamental biochemical miracle: photosynthesis. Derived from the Greek words photo (light) and synthesis (putting together), photosynthesis is the process by which green plants, algae, and certain cyanobacteria capture radiant solar energy and convert it into stable chemical bonds.',
          'Without this biological engine, the atmosphere of our planet would resemble an inhospitable, carbon-heavy wasteland. Photosynthesis not only oxygenates our biosphere, but it also creates the structural biomass that sustains terrestrial and aquatic food webs.'
        ],
        callout: {
          type: 'key-concept',
          title: 'Core Chemical Equation',
          content: '6 CO₂ (Carbon Dioxide) + 6 H₂O (Water) + Light Energy ➔ C₆H₁₂O₆ (Glucose) + 6 O₂ (Oxygen)'
        }
      },
      {
        id: 'sec-chloroplast',
        heading: '2. The Microscopic Machinery: Chloroplast Anatomy',
        paragraphs: [
          'Inside the mesophyll cells of plant leaves reside specialized microscopic organelles called chloroplasts. A single square millimeter of a leaf contains upwards of 500,000 of these biochemical factories.',
          'A chloroplast is enclosed by a double membrane system. Suspended inside is the stroma—a dense enzyme-rich fluid containing chloroplast DNA, ribosomes, and the molecular machinery required for carbon fixation. Floating within this stroma is an intricate thylakoid network: flattened, membrane-bound sacs stacked together in columns resembling piles of coins, termed grana.'
        ],
        keyTerms: [
          {
            term: 'Thylakoid',
            definition: 'Internal membrane-bound compartment where chlorophyll pigments absorb photons and drive the electron transport chain.'
          },
          {
            term: 'Stroma',
            definition: 'The fluid-filled space surrounding the thylakoid stacks, housing enzymes for the synthesis of carbohydrates.'
          },
          {
            term: 'Chlorophyll a & b',
            definition: 'Primary light-absorbing pigments that absorb blue and red wavelengths while reflecting green light back to human eyes.'
          }
        ]
      },
      {
        id: 'sec-reactions',
        heading: '3. The Two Stages: Light-Dependent and Light-Independent',
        paragraphs: [
          'Photosynthesis proceeds through two tightly integrated phases: the Light-Dependent Reactions and the Light-Independent Reactions (frequently known as the Calvin Cycle).',
          'During the light reactions, which occur across the thylakoid membrane, sunlight strikes Photosystem II. This excitation of electrons triggers the photolysis of water molecules—splitting H₂O into protons, electrons, and releasing diatomic oxygen gas (O₂) as a byproduct. The energized electrons travel along an electron transport chain, generating ATP and NADPH.'
        ],
        listItems: [
          'Step 1: Photolysis breaks water into hydrogen ions, electrons, and free oxygen.',
          'Step 2: Protons generate an electrochemical gradient across the thylakoid lumen to drive ATP synthase.',
          'Step 3: High-energy electrons reduce NADP+ into NADPH.',
          'Step 4: ATP and NADPH transfer from the thylakoid to the stroma to fuel carbohydrate synthesis.'
        ]
      },
      {
        id: 'sec-calvin',
        heading: '4. The Calvin Cycle: Building Sugars',
        paragraphs: [
          'In the stroma, the Calvin cycle fixes atmospheric carbon dioxide into organic matter without requiring immediate photon absorption. The enzyme RuBisCO (Ribulose-1,5-bisphosphate carboxylase-oxygenase)—the most abundant protein on planet Earth—attaches CO₂ molecules to five-carbon sugar ribulose 1,5-bisphosphate.',
          'Through a series of enzymatic reductions powered by ATP and NADPH, the plant constructs glyceraldehyde 3-phosphate (G3P), which subsequently synthesizes glucose, sucrose, starch, and cellulose.'
        ],
        callout: {
          type: 'reflection',
          title: 'Curiosity Check',
          content: 'Why do deciduous leaves turn yellow, orange, and red in autumn? As daylight hours shorten and temperatures drop, plants dismantle green chlorophyll to preserve nitrogen and magnesium, unmasking underlying carotenoid pigments.'
        }
      }
    ]
  },
  {
    id: 'doc-solarsystem',
    title: 'The Architecture of the Solar System: From Mercury to the Oort Cloud',
    subtitle: 'Gravitational Dynamics and Celestial Mechanics',
    subject: 'Astronomy & Astrophysics',
    gradeLevel: 'Grade 8–12',
    readTimeMinutes: 7,
    wordCount: 960,
    author: 'Prof. Marcus Chen, Planetary Science Institute',
    lastUpdated: 'September 2026',
    summary: 'A structured journey through our cosmic neighborhood, examining terrestrial inner planets, the gas and ice giants, the Kuiper Belt, and the distant gravitational boundary of the Oort Cloud.',
    sections: [
      {
        id: 'sec-sun',
        heading: '1. The Gravitational Monarch: Our Sun',
        paragraphs: [
          'At the center of our solar system sits the Sun—a yellow dwarf main-sequence star (spectral type G2V) containing 99.86% of all mass in the entire planetary system. Its immense gravitational field binds eight major planets, hundreds of known moons, five dwarf planets, and millions of asteroids and comets in orbital equilibrium.',
          'Every second, the solar core fuses approximately 600 million tons of hydrogen into helium via the proton-proton chain reaction, radiating energy that travels across the vacuum of space at 299,792 kilometers per second.'
        ],
        callout: {
          type: 'key-concept',
          title: 'The Astronomical Unit (AU)',
          content: '1 AU is the mean distance from Earth to the Sun: approximately 149.6 million kilometers (93 million miles). Light takes roughly 8 minutes and 20 seconds to traverse 1 AU.'
        }
      },
      {
        id: 'sec-terrestrial',
        heading: '2. The Inner Terrestrial Realm',
        paragraphs: [
          'Within the inner 1.5 Astronomical Units lie the four terrestrial planets: Mercury, Venus, Earth, and Mars. These worlds are defined by dense silicate rock crusts, metallic iron-nickel cores, and solid impact-cratered or volcanically reshaped surfaces.',
          'Mercury experiences the most extreme temperature swings in the solar system due to its lack of an atmosphere, oscillating from 430°C in sunlight down to -180°C in shadow. Venus, conversely, suffers a runaway greenhouse effect beneath an atmosphere composed of 96% carbon dioxide, maintaining a surface furnace of 465°C.'
        ],
        keyTerms: [
          {
            term: 'Runaway Greenhouse Effect',
            definition: 'A thermal feedback loop where heat-trapping atmospheric gases prevent thermal radiation escape, heating a planet beyond water stability.'
          },
          {
            term: 'Goldilocks Zone (Habitable Zone)',
            definition: 'The orbital radius range around a star where ambient temperatures permit liquid water to pool on a planetary surface.'
          }
        ]
      },
      {
        id: 'sec-giants',
        heading: '3. The Jovian Giants: Gas and Ice Worlds',
        paragraphs: [
          'Beyond the Main Asteroid Belt lies the outer solar system, dominated by giants that contain the majority of non-solar planetary mass. Jupiter, with its iconic Great Red Spot storm, possesses more than twice the mass of all other planets combined.',
          'Saturn is renowned for its expansive, paper-thin ring system made of billions of water-ice fragments. Further outward are the ice giants Uranus and Neptune, whose bluish hues arise from atmospheric methane absorbing red light.'
        ],
        listItems: [
          'Jupiter: Over 90 known moons, including Ganymede (the largest moon in the solar system).',
          'Saturn: Lower bulk density than water; encircled by thousands of individual ringlets.',
          'Uranus: Rotates on its side with an axial tilt of 97.8 degrees, likely caused by an ancient primordial collision.',
          'Neptune: Suffers the solar system’s fastest supersonic winds, exceeding 2,100 km/h.'
        ]
      },
      {
        id: 'sec-oort',
        heading: '4. The Outer Limits: Kuiper Belt and the Oort Cloud',
        paragraphs: [
          'Beyond Neptune’s orbit at 30 to 50 AU extends the Kuiper Belt, a vast ring of icy debris and dwarf planets including Pluto, Eris, Haumea, and Makemake. These objects represent pristine remnants of the original protoplanetary disk that formed 4.6 billion years ago.',
          'Surrounding the entire solar system is the theoretical Oort Cloud—a spherical shell of trillions of icy planetesimals stretching from 2,000 AU out to nearly 100,000 AU (almost two light-years away). It serves as the reservoir for long-period comets.'
        ]
      }
    ]
  },
  {
    id: 'doc-watercycle',
    title: 'The Global Water Cycle: Earth’s Continuous Circulation Engine',
    subtitle: 'Hydrology, Atmospheric Phase Shifts, and Global Energy Balances',
    subject: 'Earth & Environmental Science',
    gradeLevel: 'Grade 7–10',
    readTimeMinutes: 4,
    wordCount: 710,
    author: 'Dr. Maria Santos, Hydrogeological Survey',
    lastUpdated: 'August 2026',
    summary: 'A detailed look at the hydrologic cycle, examining phase changes, evaporation, evapotranspiration, cloud condensation, precipitation patterns, and groundwater infiltration.',
    sections: [
      {
        id: 'sec-hydrologic-intro',
        heading: '1. A Closed, Perpetual System',
        paragraphs: [
          'Water is the lifeblood of Earth. The total volume of water on our planet is essentially constant—approximately 1.386 billion cubic kilometers. The water molecules you drank this morning may once have cooled a dinosaur or quenched the roots of an ancient cedar tree millions of years ago.',
          'This continuous global circulation between land, ocean, and atmosphere is known as the hydrologic cycle. Driven inexhaustibly by solar radiation and gravity, it redistributes heat around the globe, erodes mountain ranges, and replenishes freshwater reserves.'
        ],
        callout: {
          type: 'key-concept',
          title: 'Global Water Distribution',
          content: 'Approximately 97.5% of Earth’s water is saline ocean water. Of the remaining 2.5% freshwater, roughly 68.7% is locked in glaciers and ice sheets, 30.1% is groundwater, and only 1.2% constitutes accessible surface freshwater in lakes, rivers, and atmosphere.'
        }
      },
      {
        id: 'sec-phase-changes',
        heading: '2. The Mechanisms of Evaporation and Transpiration',
        paragraphs: [
          'The cycle begins with phase changes. Solar energy heats water surfaces across the ocean, lakes, and rivers, supplying the latent heat of vaporization necessary to break hydrogen bonds and turn liquid water into invisible water vapor.',
          'On terrestrial landscapes, living vegetation contributes massively via evapotranspiration. Plant roots absorb soil moisture and channel it through xylem vessels up to the foliage, where microscopic leaf pores (stomata) release moisture vapor into the ambient air.'
        ],
        keyTerms: [
          {
            term: 'Evapotranspiration',
            definition: 'The combined flux of water evaporated from soil and wet surfaces, plus water transpired from interior plant tissues through stomata.'
          },
          {
            term: 'Latent Heat of Vaporization',
            definition: 'The thermal energy absorbed per unit mass when liquid changes into a gas without changing temperature.'
          }
        ]
      },
      {
        id: 'sec-condensation',
        heading: '3. Condensation, Cloud Physics, and Precipitation',
        paragraphs: [
          'As warm, moisture-laden air rises into the lower pressure of the upper troposphere, it cools adiabatically. When the air temperature reaches its dew point, water vapor begins to condense around microscopic aerosols known as cloud condensation nuclei (such as sea salt, dust particles, and pollen).',
          'Billions of microscopic droplets coalesce into visible clouds. When these droplets grow heavy enough to overcome aerodynamic drag and rising updrafts, gravity pulls them down as precipitation: rain, snow, sleet, or hail.'
        ],
        listItems: [
          'Infiltration: Precipitation seeps into porous soils and fractures to recharge deep aquifers.',
          'Surface Runoff: Excess water flows across impermeable rock and soil directly into streams and rivers.',
          'Percolation: Gravitational downward filtering through subterranean rock layers, naturally purifying freshwater.'
        ]
      }
    ]
  }
];
