import { useDeferredValue, useState } from 'react';
import '../../styles/components.css';
import '../../styles/documentation.css';
import { BotDocsLayout } from '../../components/BotDocsLayout';

export interface FoxholeItem {
  readonly crateSize: number;
  readonly autocomplete: boolean;
  readonly value: number;
}

interface FoxholeItemCategory {
  readonly id: string;
  readonly label: string;
  readonly items: Readonly<Record<string, FoxholeItem>>;
}

export const FOXHOLE_ITEM_CATEGORIES = [
  {
    id: 'raw-resources',
    label: 'Raw Resources',
    items: {
  'Salvage': { crateSize: 0, autocomplete: true, value: 0.1 },
  'Coal': { crateSize: 0, autocomplete: true, value: 0.18 },
  'Sulfur': { crateSize: 0, autocomplete: true, value: 0.33 },
  'Components': { crateSize: 0, autocomplete: true, value: 0.5 },
  'Damaged Components': { crateSize: 0, autocomplete: true, value: 0.15 },
  'Rare Metal': { crateSize: 2, autocomplete: true, value: 40 },
  'Iron (TechMat)': { crateSize: 0, autocomplete: true, value: 1 },
  'Aluminum (TechMat)': { crateSize: 0, autocomplete: true, value: 1 },
  'Copper (TechMat)': { crateSize: 0, autocomplete: true, value: 1 },
  'Crude Oil': { crateSize: 0, autocomplete: true, value: 1 },
  'Wreckage': { crateSize: 0, autocomplete: true, value: 1 },
    },
  },
  {
    id: 'refined-processed-resources',
    label: 'Refined & Processed Resources',
    items: {
  'Basic Materials (BMats)': { crateSize: 100, autocomplete: true, value: 0.2 },
  'Refined Materials (RMats)': { crateSize: 20, autocomplete: true, value: 20 },
  'Coke': { crateSize: 0, autocomplete: true, value: 0.4 },
  'Construction Materials (CMats)': { crateSize: 0, autocomplete: true, value: 1 },
  'Concrete': { crateSize: 0, autocomplete: true, value: 0.4 },
  'Explosive Materials (EMats / EPowder)': { crateSize: 40, autocomplete: true, value: 1 },
  'Gravel': { crateSize: 20, autocomplete: true, value: 1 },
  'Heavy Explosive Materials (HEMats / HEPowder)': { crateSize: 30, autocomplete: true, value: 1.65 },
  'Rare Materials': { crateSize: 0, autocomplete: true, value: 25 },
  'Rare Alloys': { crateSize: 1, autocomplete: true, value: 884 },
  'Processed Construction Materials (PCons)': { crateSize: 1, autocomplete: true, value: 12 },
  'Assembly Materials I (AMat I)': { crateSize: 1, autocomplete: true, value: 10 },
  'Assembly Materials II (AMat II)': { crateSize: 1, autocomplete: true, value: 10 },
  'Assembly Materials III (AMat III)': { crateSize: 1, autocomplete: true, value: 10 },
  'Assembly Materials IV (AMat IV)': { crateSize: 1, autocomplete: true, value: 10 },
  'Assembly Materials V (AMat V)': { crateSize: 1, autocomplete: true, value: 100 },
  'Iron Alloy (TechMat)': { crateSize: 20, autocomplete: true, value: 40 },
  'Aluminum Alloy (TechMat)': { crateSize: 20, autocomplete: true, value: 40 },
  'Copper Alloy (TechMat)': { crateSize: 20, autocomplete: true, value: 40 },
  'Steel Construction Materials': { crateSize: 1, autocomplete: true, value: 100 },
  'Unstable Substances': { crateSize: 1, autocomplete: true, value: 36 },
  'Thermal Shielding': { crateSize: 1, autocomplete: true, value: 67 },
  'Structure Parts': { crateSize: 0, autocomplete: true, value: 2175 },
    },
  },
  {
    id: 'liquids',
    label: 'Liquids',
    items: {
  'Diesel': { crateSize: 1, autocomplete: true, value: 0 },
  'Petrol': { crateSize: 1, autocomplete: true, value: 0 },
  'Heavy Oil': { crateSize: 1, autocomplete: true, value: 0 },
  'Water': { crateSize: 1, autocomplete: true, value: 0 },
  'Oil': { crateSize: 1, autocomplete: true, value: 0 },
  'Enriched Oil': { crateSize: 1, autocomplete: true, value: 18 },
    },
  },
  {
    id: 'firearms',
    label: 'Firearms',
    items: {
  '"Dusk" ce.III Assault Rifle': { crateSize: 20, autocomplete: true, value: 150 },
  'Catara mo.II Light Machine Gun': { crateSize: 20, autocomplete: true, value: 150 },
  'KRN886-127 Gast Machine Gun': { crateSize: 5, autocomplete: true, value: 250 },
  'Cometa T2-9 Revolver': { crateSize: 30, autocomplete: true, value: 12 },
  'Catena rt.IV Auto-Rifle': { crateSize: 15, autocomplete: true, value: 24 },
  'Argenti r.II Rifle': { crateSize: 20, autocomplete: true, value: 20 },
  'Volta r.I Repeater Heavy Rifle': { crateSize: 15, autocomplete: true, value: 20 },
  'Fuscina pi.I Rifle': { crateSize: 20, autocomplete: true, value: 28 },
  'KRR2-790 Omen Long Rifle': { crateSize: 15, autocomplete: true, value: 31 },
  'KRR3-792 Auger Sniper Rifle': { crateSize: 5, autocomplete: true, value: 350 },
  'KRF1-750 Dragonfly Shotgun': { crateSize: 15, autocomplete: true, value: 26 },
  '"The Pitch Gun" mc. V SMG': { crateSize: 20, autocomplete: true, value: 16 },
  '"Lionclaw" mc.VIII SMG': { crateSize: 20, autocomplete: true, value: 24 },
  'Dawn Ve.II Anti-Tank Rifle': { crateSize: 3, autocomplete: true, value: 46 },
  'Quickhatch Rt.I Sniper Rifle': { crateSize: 3, autocomplete: true, value: 212 },
  'Ferro 879 Pistol': { crateSize: 0, autocomplete: true, value: 1 },
    },
  },
  {
    id: 'small-arms-ammo',
    label: 'Ammunition',
    items: {
  '7.92mm Ammo': { crateSize: 30, autocomplete: true, value: 24 },
  '8mm Ammo': { crateSize: 40, autocomplete: true, value: 8 },
  '.44 Ammo': { crateSize: 40, autocomplete: true, value: 8 },
  '7.62mm Ammo': { crateSize: 40, autocomplete: true, value: 16 },
  '9mm SMG Ammo': { crateSize: 40, autocomplete: true, value: 16 },
  '12.7mm Ammo': { crateSize: 20, autocomplete: true, value: 20 },
  '14.5mm Ammo': { crateSize: 10, autocomplete: true, value: 20 },
  'Buckshot Ammo': { crateSize: 40, autocomplete: true, value: 16 },
  '"Molten Wind" v.II Ammo': { crateSize: 10, autocomplete: true, value: 65 },
  'Flame Ammo': { crateSize: 1, autocomplete: true, value: 8 },
  '20mm Ammo': { crateSize: 5, autocomplete: true, value: 4 },
  '30mm Shell': { crateSize: 20, autocomplete: true, value: 36 },
  '40mm Shell': { crateSize: 20, autocomplete: true, value: 152 },
  '68mm Shell': { crateSize: 20, autocomplete: true, value: 144 },
  '75mm Shell': { crateSize: 1, autocomplete: true, value: 15 },
  '94.5mm Shell': { crateSize: 1, autocomplete: true, value: 15 },
  '120mm Shell': { crateSize: 5, autocomplete: true, value: 5 },
  '150mm Shell': { crateSize: 5, autocomplete: true, value: 23 },
  '300mm Shell': { crateSize: 1, autocomplete: true, value: 202 },
  '250mm "Fury" Shell': { crateSize: 5, autocomplete: true, value: 99 },
  '250mm "Purity" Shell': { crateSize: 5, autocomplete: true, value: 45 },
  'RPG': { crateSize: 15, autocomplete: true, value: 67 },
  'AP/RPG': { crateSize: 15, autocomplete: true, value: 87 },
  'ARC/RPG': { crateSize: 15, autocomplete: true, value: 87 },
  '3C-High Explosive Rocket': { crateSize: 1, autocomplete: true, value: 9 },
  '4C-Fire Rocket': { crateSize: 1, autocomplete: true, value: 9 },
  'Absol Anti-Aircraft Rounds': { crateSize: 5, autocomplete: true, value: 90 },
  '950-70b Anti-Aircraft Shell': { crateSize: 5, autocomplete: true, value: 7 },
  '912 Shrike Rounds': { crateSize: 5, autocomplete: true, value: 33 },
  'Model-7 Evie Depth Charge': { crateSize: 1, autocomplete: true, value: 15 },
  'Quillback Torpedo': { crateSize: 5, autocomplete: true, value: 32 },
  'Moray Torpedo': { crateSize: 0, autocomplete: true, value: 52 },
    },
  },
  {
    id: 'grenades-explosives',
    label: 'Grenades & Mines',
    items: {
  'KLG901-2 Lunaire F Grenade Launcher': { crateSize: 5, autocomplete: true, value: 160 },
  'Abisme AT-99': { crateSize: 10, autocomplete: true, value: 5 },
  'Tremola Grenade GPb-1': { crateSize: 20, autocomplete: true, value: 65 },
  'Bomastone Grenade': { crateSize: 25, autocomplete: true, value: 40 },
  'Mammon 91-b': { crateSize: 20, autocomplete: true, value: 30 },
  'AT Sticky Bomb': { crateSize: 10, autocomplete: true, value: 60 },
  'PT-815 Smoke Grenade': { crateSize: 15, autocomplete: true, value: 16 },
  'Green Ash Grenade': { crateSize: 10, autocomplete: true, value: 28 },
  "Crow's Foot Mine": { crateSize: 10, autocomplete: true, value: 1 },
  'E681-B Hullbreaker Mine': { crateSize: 5, autocomplete: true, value: 8 },
  'E680-S Rudder Lock Sea Mine': { crateSize: 1, autocomplete: true, value: 14 },
    },
  },
  {
    id: 'rpgs-flamethrowers-mortars',
    label: 'RPGs, Flamethrowers & Mortars',
    items: {
  'Venom c.II 35 AT-RPG': { crateSize: 5, autocomplete: true, value: 170 },
  'Bane 45 AT-RPG': { crateSize: 5, autocomplete: true, value: 430 },
  'Ignifist 30 AT-RPG': { crateSize: 10, autocomplete: true, value: 52 },
  '"Molten Wind" v.II Flame Torch': { crateSize: 10, autocomplete: true, value: 287 },
  'Cremari Mortar': { crateSize: 5, autocomplete: true, value: 270 },
  'Mortar Flare Shell': { crateSize: 15, autocomplete: true, value: 20 },
  'Mortar Shrapnel Shell': { crateSize: 15, autocomplete: true, value: 22 },
  'Mortar (HE) Shell': { crateSize: 15, autocomplete: true, value: 47 },
  'Incendiary Mortar Shell': { crateSize: 15, autocomplete: true, value: 13 },
  'Shatter Missile': { crateSize: 5, autocomplete: true, value: 61 },
    },
  },
  {
    id: 'equipment',
    label: 'Equipment',
    items: {
  'Barbed Wire': { crateSize: 5, autocomplete: true, value: 3 },
  'Sandbag': { crateSize: 5, autocomplete: true, value: 3 },
  'Metal Beam': { crateSize: 5, autocomplete: true, value: 5 },
  'Pipe': { crateSize: 2, autocomplete: true, value: 39 },
  'Shovel': { crateSize: 10, autocomplete: true, value: 40 },
  'Sledge Hammer': { crateSize: 10, autocomplete: true, value: 40 },
  'Hammer': { crateSize: 0, autocomplete: true, value: 1 },
  'Wrench': { crateSize: 5, autocomplete: true, value: 15 },
  'Binoculars': { crateSize: 5, autocomplete: true, value: 15 },
  'Radio': { crateSize: 5, autocomplete: true, value: 15 },
  'Radio Backpack': { crateSize: 5, autocomplete: true, value: 30 },
  'Listening Kit': { crateSize: 5, autocomplete: true, value: 30 },
  'Air Siren': { crateSize: 5, autocomplete: true, value: 15 },
  'Buckhorn CCQ-18': { crateSize: 20, autocomplete: true, value: 8 },
  'Eleos Infantry Dagger': { crateSize: 10, autocomplete: true, value: 40 },
  "Hydra's Whisper": { crateSize: 5, autocomplete: true, value: 1 },
  'Havoc Charge': { crateSize: 5, autocomplete: true, value: 81 },
  'Havoc Charge Detonator': { crateSize: 5, autocomplete: true, value: 48 },
  'Tripod': { crateSize: 5, autocomplete: true, value: 2 },
  'Gas Mask': { crateSize: 20, autocomplete: true, value: 32 },
  'Gas Mask Filter': { crateSize: 20, autocomplete: true, value: 20 },
  'Wind Sock': { crateSize: 5, autocomplete: true, value: 30 },
  'Waterbucket': { crateSize: 50, autocomplete: true, value: 16 },
  'Mark II Raidbreaker': { crateSize: 5, autocomplete: true, value: 39 },
  'Legion Vexillum': { crateSize: 5, autocomplete: true, value: 18 },
    },
  },
  {
    id: 'medical-supplies',
    label: 'Medical & Supplies',
    items: {
  'Bandages': { crateSize: 50, autocomplete: true, value: 16 },
  'First Aid Kit': { crateSize: 10, autocomplete: true, value: 12 },
  'Trauma Kit': { crateSize: 10, autocomplete: true, value: 16 },
  'Blood Plasma': { crateSize: 50, autocomplete: true, value: 16 },
  'Soldier Supplies (Shirts)': { crateSize: 10, autocomplete: true, value: 16 },
  'Maintenance Supplies (MSupps)': { crateSize: 100, autocomplete: true, value: 1 },
    },
  },
  {
    id: 'mounted-weapons',
    label: 'Mounted Weapons',
    items: {
  '"Typhon" ra.XII Mounted AT-Rifle': { crateSize: 5, autocomplete: true, value: 3 },
  'Mounted Fissura gd.I Grenade Launcher': { crateSize: 5, autocomplete: true, value: 3 },
  'Lamentum mm.IV Mounted Machine Gun': { crateSize: 5, autocomplete: true, value: 3 },
  'Daucus isg.III Mounted Infantry Support Gun': { crateSize: 5, autocomplete: true, value: 3 },
    },
  },
  {
    id: 'uniforms-packs',
    label: 'Uniforms & Packs',
    items: {
  'Velian Flak Vest': { crateSize: 10, autocomplete: true, value: 40 },
  'Fabri Rucksack': { crateSize: 15, autocomplete: true, value: 20 },
  "Grenadier's Baldric": { crateSize: 15, autocomplete: true, value: 20 },
  "Auster's Harness (Paratrooper Uniform)": { crateSize: 15, autocomplete: true, value: 120 },
  'Medic Fatigues': { crateSize: 15, autocomplete: true, value: 20 },
  'Remex Garb': { crateSize: 15, autocomplete: true, value: 20 },
  "Officialis's Attire": { crateSize: 3, autocomplete: true, value: 20 },
  "Legionary's Oilcoat": { crateSize: 15, autocomplete: true, value: 20 },
  'Legionary Fatigues': { crateSize: 0, autocomplete: true, value: 1 },
  'Recon Camo (Scout Uniform)': { crateSize: 15, autocomplete: true, value: 20 },
  'Heavy Topcoat': { crateSize: 15, autocomplete: true, value: 20 },
  "Tankman's Coveralls": { crateSize: 15, autocomplete: true, value: 20 },
  "Paratrooper's Ruck": { crateSize: 1, autocomplete: true, value: 10 },
  "Lodesman's Lorica (Pilot's Flight Suit)": { crateSize: 1, autocomplete: true, value: 30 },
    },
  },
  {
    id: 'vehicles',
    label: 'Vehicles',
    items: {
  'H-5 "Hatchet"': { crateSize: 3, autocomplete: true, value: 1150 },
  'HA-1 "Sagaris"': { crateSize: 3, autocomplete: true, value: 1250 },
  '85K-b Falchion': { crateSize: 5, autocomplete: true, value: 1350 },
  '86K-a "Bardiche"': { crateSize: 3, autocomplete: true, value: 1650 },
  '90T-v "Nemesis"': { crateSize: 3, autocomplete: true, value: 1500 },
  'HC-2 "Scorpion"': { crateSize: 3, autocomplete: true, value: 1000 },
  'T3 "Xiphos"': { crateSize: 3, autocomplete: true, value: 250 },
  'T12 "Actaeon"': { crateSize: 3, autocomplete: true, value: 350 },
  'AB-8 "Acheron"': { crateSize: 3, autocomplete: true, value: 200 },
  'HH-a "Javelin"': { crateSize: 3, autocomplete: true, value: 550 },
  'UV-05a Argonaut': { crateSize: 3, autocomplete: true, value: 100 },
  'UV-5c "Odyssey"': { crateSize: 3, autocomplete: true, value: 120 },
  'UV-24 "Icarus"': { crateSize: 1, autocomplete: true, value: 140 },
  'RR-3 "Stolon" Tanker': { crateSize: 3, autocomplete: true, value: 20 },
  'R-1 Hauler': { crateSize: 3, autocomplete: true, value: 20 },
  'R-5 "Atlas" Hauler': { crateSize: 3, autocomplete: true, value: 24 },
  'R-12 - "Salus" Ambulance': { crateSize: 3, autocomplete: true, value: 30 },
  'R-15 - "Chariot"': { crateSize: 3, autocomplete: true, value: 20 },
  'Rooster - Junkwagon': { crateSize: 3, autocomplete: true, value: 100 },
  '30-250 "Tisiphone"': { crateSize: 3, autocomplete: true, value: 350 },
  '03MM Caster': { crateSize: 3, autocomplete: true, value: 17 },
  '00MS "Stinger"': { crateSize: 1, autocomplete: true, value: 18 },
  'BMS - Class 2 Mobile Auto-Crane': { crateSize: 0, autocomplete: true, value: 25 },
  'BMS - Packmule Flatbed': { crateSize: 3, autocomplete: true, value: 300 },
  'H-10 "Pelekys"': { crateSize: 0, autocomplete: true, value: 1332 },
  'H-19 "Vulcan"': { crateSize: 0, autocomplete: true, value: 1332 },
  'H-8 "Kranesca"': { crateSize: 0, autocomplete: true, value: 1610 },
  '85K-a Spatha': { crateSize: 0, autocomplete: true, value: 1723 },
  '85V-g "Talos"': { crateSize: 0, autocomplete: true, value: 2049 },
  '86K-c "Ranseur"': { crateSize: 0, autocomplete: true, value: 1891 },
  'HC-7 "Ballista"': { crateSize: 0, autocomplete: true, value: 1218 },
  'Lance-25 "Hasta"': { crateSize: 0, autocomplete: true, value: 2000 },
  'Lance-36': { crateSize: 0, autocomplete: true, value: 1000 },
  'Lance-46 "Sarissa"': { crateSize: 0, autocomplete: true, value: 3000 },
  'O-75b "Ares"': { crateSize: 0, autocomplete: true, value: 5000 },
  'T5 "Percution"': { crateSize: 0, autocomplete: true, value: 425 },
  'T8 "Gemini"': { crateSize: 0, autocomplete: true, value: 425 },
  'T14 "Vesta"': { crateSize: 0, autocomplete: true, value: 728 },
  'T13 "Deioneus"': { crateSize: 0, autocomplete: true, value: 886 },
  'T20 "Ixion"': { crateSize: 0, autocomplete: true, value: 608 },
  'AB-11 "Doru"': { crateSize: 0, autocomplete: true, value: 294 },
  'R-17 "Retiarius" Skirmisher': { crateSize: 0, autocomplete: true, value: 1172 },
  'HH-b "Hoplite"': { crateSize: 0, autocomplete: true, value: 628 },
  'HH-d "Peltast"': { crateSize: 0, autocomplete: true, value: 662 },
  'Rooster - Lamploader': { crateSize: 0, autocomplete: true, value: 238 },
  'Rooster - Tumblebox': { crateSize: 0, autocomplete: true, value: 238 },
  'R-5b "Sisyphus" Hauler': { crateSize: 0, autocomplete: true, value: 30 },
  'R-9 "Speartip" Escort': { crateSize: 0, autocomplete: true, value: 30 },
  'R-12b - "Salva" Flame Truck': { crateSize: 0, autocomplete: true, value: 52 },
  'AU-A150 Taurine Rigger': { crateSize: 0, autocomplete: true, value: 520 },
  'BMS - Scrap Hauler (Harvester)': { crateSize: 0, autocomplete: true, value: 1495 },
    },
  },
  {
    id: 'field-weapons',
    label: 'Field Weapons',
    items: {
  'G40 "Sagittarii"': { crateSize: 3, autocomplete: true, value: 200 },
  '120-68 "Koronides"': { crateSize: 3, autocomplete: true, value: 500 },
  'AA-2 Battering Ram': { crateSize: 3, autocomplete: true, value: 200 },
  'GA6 "Cestus"': { crateSize: 0, autocomplete: true, value: 260 },
  '40-45 "Smelter"': { crateSize: 0, autocomplete: true, value: 330 },
  '945g "Stygian Bolt"': { crateSize: 0, autocomplete: true, value: 1881 },
  '40-2550 "Alekto"': { crateSize: 0, autocomplete: true, value: 1 },
    },
  },
  { 
    id: 'emplaced-guns',
    label: 'Emplaced Guns',
    items: {
        'DAE 1b-2 "Serra" (Light AA / EMG)': { crateSize: 3, autocomplete: true, value: 20 },
        'DAE 1o-3 Polybolos': { crateSize: 3, autocomplete: true, value: 25 },
        'DAE 5b "Zeal" (Heavy AA)': { crateSize: 3, autocomplete: true, value: 1750 },
        '50-500 Thunderbolt Cannon': { crateSize: 3, autocomplete: true, value: 1950 },
    }
  },
  {
    id: 'construction-equipment',
    label: 'Construction Equipment and Shippables',
    items: {
  'BMS - Universal Assembly Rig (Construction Vehicle, CV)': { crateSize: 0, autocomplete: true, value: 20 },
  'BMS - Fabricator (Advanced Construction Vehicle, ACV)': { crateSize: 0, autocomplete: true, value: 150 },
  'Construction Equipment': { crateSize: 0, autocomplete: true, value: 500 },
  'Concrete Mixer': { crateSize: 0, autocomplete: true, value: 750 },
  'Liquid Container': { crateSize: 3, autocomplete: true, value: 20 },
  'Material Pallet': { crateSize: 3, autocomplete: true, value: 5 },
  'Resource Container': { crateSize: 3, autocomplete: true, value: 10 },
  'Shipping Container': { crateSize: 3, autocomplete: true, value: 20 },
    },
  },
  {
    id: 'additional-ships',
    label: 'Ships',
    items: {
  'VAC Das Krokodil (Light Freighter)': { crateSize: 3, autocomplete: true, value: 20 },
  'VAC Bellweather (Mine Boat)': { crateSize: 3, autocomplete: true, value: 30 },
  'BMS - Aquatipper': { crateSize: 3, autocomplete: true, value: 30 },
  'BMS - Ironship': { crateSize: 3, autocomplete: true, value: 100 },
  'K-81e "Sombre" (Infantry Boat / AA Boat)': { crateSize: 3, autocomplete: true, value: 40 },
  'Type B - "Lucian" (Siege Boat)': { crateSize: 3, autocomplete: true, value: 1000 },
  'Type C - "Charon"': { crateSize: 3, autocomplete: true, value: 1400 },
  'Strider (Medium Ship)': { crateSize: 3, autocomplete: true, value: 100 },
  'BMS - Grouper': { crateSize: 0, autocomplete: true, value: 12 },
  'BMS - Bluefin': { crateSize: 0, autocomplete: true, value: 1000 },
  'BMS - Bowhead': { crateSize: 0, autocomplete: true, value: 2000 },
  'BMS - Longhook': { crateSize: 0, autocomplete: true, value: 2000 },
  'AC-b "Trident"': { crateSize: 0, autocomplete: true, value: 3000 },
  'Conqueror': { crateSize: 0, autocomplete: true, value: 4000 },
  'Titan': { crateSize: 0, autocomplete: true, value: 5000 },
    },
  },
  {
    id: 'planes',
    label: 'Planes',
    items: {
  'A51 Venti "Daedalus" (AmphibiousScout Plane)': { crateSize: 0, autocomplete: true, value: 1000 },
  'A59 Venti “Perdix” (Scout Plane)': { crateSize: 0, autocomplete: true, value: 1000 },
  'Toxot-902 "Blind Silver" (Fighter Plane)': { crateSize: 0, autocomplete: true, value: 4424 },
  'Mergo-4 "Myrmidon" (Dive Bomber)': { crateSize: 0, autocomplete: true, value: 5530 },
  'V-1 Tzykalia (Bomber)': { crateSize: 0, autocomplete: true, value: 8000 },
  'V-5b Pegasus (Transport Plane / Paratrooper Plane)': { crateSize: 0, autocomplete: true, value: 2862 },
    },
  },
  {
    id: 'plane-parts',
    label: 'Plane Parts',
    items: {
  'Colonial Aircraft Engine (Small)': { crateSize: 0, autocomplete: true, value: 1560 },
  'Colonial Aircraft Mechanical Parts (Small)': { crateSize: 0, autocomplete: true, value: 695 },
  'Colonial Aircraft Engine (Large)': { crateSize: 0, autocomplete: true, value: 1560 },
  'Colonial Aircraft Mechanical Parts (Large)': { crateSize: 0, autocomplete: true, value: 695 },
  'Damaged Colonial Aircraft Engine (Large)': { crateSize: 0, autocomplete: true, value: 1560 },
  'Damaged Colonial Aircraft Mechanical Parts (Large)': { crateSize: 0, autocomplete: true, value: 695 },
  'Damaged Colonial Aircraft Engine (Small)': { crateSize: 0, autocomplete: true, value: 1560 },
  'Damaged Colonial Aircraft Mechanical Parts (Small)': { crateSize: 0, autocomplete: true, value: 695 },
    },
  },
] as const satisfies readonly FoxholeItemCategory[];

export const FOXHOLE_ITEMS = Object.fromEntries(
  FOXHOLE_ITEM_CATEGORIES.flatMap((category) => Object.entries(category.items)),
) as Readonly<Record<string, FoxholeItem>>;

const BASE_NAV_ITEMS = [
  { label: 'Overview', href: '#overview' },
  { label: 'Search Values', href: '#search-values' },
];

const TOTAL_ITEM_COUNT = Object.keys(FOXHOLE_ITEMS).length;

export function LogiScoreValuesPage() {
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);
  const normalizedQuery = deferredQuery.trim().toLowerCase();
  const filteredCategories = FOXHOLE_ITEM_CATEGORIES.map((category) => ({
    ...category,
    entries: Object.entries(category.items).filter(([itemName]) =>
      itemName.toLowerCase().includes(normalizedQuery),
    ),
  })).filter((category) => category.entries.length > 0);
  const resultCount = filteredCategories.reduce(
    (count, category) => count + category.entries.length,
    0,
  );
  const navItems = [
    ...BASE_NAV_ITEMS,
    ...filteredCategories.map((category) => ({
      label: category.label,
      href: `#${category.id}`,
    })),
  ];

  return (
    <BotDocsLayout
      subtitle="Logi Score Values Documentation"
      title="Logi Score Values"
      lead="Searchable reference for the crate sizes and score values used by eirish's Foxhole Assistant logistics scoring system."
      breadcrumbs={[
        { label: 'Hub', to: '/hub' },
        { label: 'Bot Documentation', to: '/bot-documentation' },
        { label: 'Logi Score Values' },
      ]}
      navItems={navItems}
      contentKicker="Reference"
    >
      <section className="docs-section" id="overview">
        <h2>Overview</h2>
        <p>
          Score values are the points awarded for each submitted logistics item. Crate size
          identifies how many items are contained in one crate; items marked as not crateable
          are scored individually or through their applicable delivery unit.
        </p>
      </section>

      <section className="docs-section" id="search-values">
        <h2>Search Values</h2>
        <div className="docs-filter">
          <label className="docs-filter-label" htmlFor="logi-score-search">
            Item name
          </label>
          <input
            className="docs-filter-input"
            id="logi-score-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search firearms, resources, vehicles..."
          />
          <p className="docs-filter-summary" aria-live="polite">
            Showing {resultCount} of {TOTAL_ITEM_COUNT} items
          </p>
        </div>
      </section>

      {filteredCategories.map((category) => (
        <section className="docs-section" id={category.id} key={category.id}>
          <h2>{category.label}</h2>
          <div className="docs-table-scroll">
            <table className="docs-table docs-score-table">
              <caption className="sr-only">{category.label} score values</caption>
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Crate size</th>
                  <th>Score value</th>
                </tr>
              </thead>
              <tbody>
                {category.entries.map(([itemName, item]) => (
                  <tr key={itemName}>
                    <td>{itemName}</td>
                    <td className="docs-score-table-number">
                      {item.crateSize === 0 ? 'Not crateable' : item.crateSize}
                    </td>
                    <td className="docs-score-table-number">{item.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ))}

      {filteredCategories.length === 0 && (
        <section className="docs-section docs-filter-empty" aria-live="polite">
          <h2>No matching items</h2>
          <p>Try a broader item name or clear the search field to restore all values.</p>
        </section>
      )}
    </BotDocsLayout>
  );
}

