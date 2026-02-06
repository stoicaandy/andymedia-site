// app/data/gear-table.ts
export type GearRow = {
  nr: number;
  name: string;
  description: string;
  stock: string;
  notes?: string;
};

export const GEAR_TABLE: GearRow[] = [
  { nr: 1, name: "D&B D80", description: "Amplificator DSP 4Ch", stock: "2 Buc", notes: "Bucată" },
  { nr: 2, name: "D&B D20", description: "Amplificator DSP 4Ch", stock: "1 Buc", notes: "Bucată" },
  { nr: 3, name: "D&B V7P", description: "Boxă Point Source", stock: "2 Buc", notes: "Pereche • Amp neincl." },
  { nr: 4, name: "D&B V10P", description: "Boxă Point Source", stock: "2 Buc", notes: "Pereche • Amp neincl." },
  { nr: 5, name: "D&B V-SUB", description: "Subwoofer Cardioid", stock: "6 Buc", notes: "Bucată • Amp neincl." },
  { nr: 6, name: "D&B B6", description: "Subwoofer Cardioid", stock: "2 Buc", notes: "Bucată • Amp neincl." },
  { nr: 7, name: "D&B Y10P", description: "Boxă Point Source", stock: "4 Buc", notes: "Pereche • Amp neincl." },
  { nr: 8, name: "RCF HDL20", description: "Boxă Activă Line Array", stock: "8 Buc", notes: "Pereche • Active" },
  { nr: 9, name: "D&B M4", description: "Wedge Monitor", stock: "6 Buc", notes: "Bucată • Amp neincl." },
  { nr: 10, name: "Midas M32C", description: "Mixer digital", stock: "1 Buc", notes: "" },
  { nr: 11, name: "Midas DL32", description: "Stagebox", stock: "1 Buc", notes: "RACK 4U" },
  { nr: 12, name: "Behringer Wing", description: "Mixer digital", stock: "1 Buc", notes: "Fără Stagebox" },
  { nr: 13, name: "Audix AP - Wireless", description: "Microfoane Wireless", stock: "4 Buc", notes: "RACK 5U • Set 4 • Pocket" },
  { nr: 14, name: "Shure QLXD-Beta58", description: "Microfon Wireless", stock: "2 Buc", notes: "Bucată • Pocket" },
  { nr: 15, name: "Sennheiser G4 IEM", description: "In-Ear Wireless (2 Pocket)", stock: "1 Buc", notes: "Bucată" },
  { nr: 16, name: "The Box Pro DSX115M", description: "Wedge Monitor", stock: "2 Buc", notes: "Bucată • Active" },
  { nr: 17, name: "the t.bone Ovid CC100", description: "Microfon Instrument", stock: "10 Buc", notes: "Set 10 Buc" },
  { nr: 18, name: "the t.bone Lucan CC200", description: "Microfon Instrument", stock: "2 Buc", notes: "Bucată" },
  { nr: 19, name: "Shure Beta 98H", description: "Microfon Instrument", stock: "1 Buc", notes: "Bucată" },
  { nr: 20, name: "DPA 4088", description: "Mic de cap (mufă Shure)", stock: "1 Buc", notes: "Bucată" },
  { nr: 21, name: "Shure PG30", description: "Mic de cap (mufă Shure)", stock: "1 Buc", notes: "Bucată" },
  { nr: 22, name: "Shure PG4 + PG1", description: "Wireless cu Pocket", stock: "1 Buc", notes: "Bucată" },
  { nr: 23, name: "Waves VST Livebox", description: "i9 gen14 • Dante • SoundGrid", stock: "1 Buc", notes: "Bucată" },
  { nr: 24, name: "D&B Y7P", description: "Boxă Point Source", stock: "2 Buc", notes: "Pereche • Amp neincl." },
  { nr: 25, name: "RCF SUB8004AS", description: "Subwoofer Activ", stock: "6 Buc", notes: "Bucată • Active" },
  { nr: 26, name: "isemcon EMX-7150", description: "Microfon RTA", stock: "1 Buc", notes: "Bucată" },
  { nr: 27, name: "MOTU M4", description: "Placă sunet 4 in / 4 out", stock: "1 Buc", notes: "Bucată" },

  { nr: 30, name: "10R Pointe 280W", description: "Moving Head Beam/Spot", stock: "8 Buc", notes: "Pereche" },
  { nr: 31, name: "7R Sharpy", description: "Moving Head Beam", stock: "12 Buc", notes: "Pereche" },
  { nr: 32, name: "36x18W RGBWA Zoom", description: "Moving Head Wash LED", stock: "12 Buc", notes: "Case 4 Buc" },
  { nr: 33, name: "18x18W RGBWA", description: "PAR LED – Arhitectural", stock: "20 Buc", notes: "Case 9 Buc" },
  { nr: 34, name: "Shehds RGB Flash", description: "200W Flash LED", stock: "18 Buc", notes: "Case 6 Buc" },
  { nr: 35, name: "RETRO 6x50W COB LED", description: "Retro BAR", stock: "8 Buc", notes: "Case 4 Buc" },
  { nr: 36, name: "Ecran LED p3.9 Indoor", description: "Modular", stock: "18 mp", notes: "Case 3 mp" },
  { nr: 37, name: "Traversă Alum. 4P 300", description: "Grindă 2m", stock: "15 Buc", notes: "Bucată" },
  { nr: 38, name: "Traversă Alum. 4P 300", description: "Grindă 3m", stock: "2 Buc", notes: "Bucată" },
  { nr: 39, name: "Traversă Alum. 4P 300", description: "Grindă 1.5m", stock: "2 Buc", notes: "Bucată" },
  { nr: 40, name: "Traversă Alum. 3P 300", description: "Grindă 2m", stock: "5 Buc", notes: "Bucată" },
  { nr: 41, name: "Wind Up 85Kg (h 3m)", description: "Lift elevator schelă", stock: "4 Buc", notes: "Bucată" },
  { nr: 42, name: "Lift 200Kg (h 4m)", description: "Lift elevator schelă", stock: "4 Buc", notes: "Bucată" },
  { nr: 43, name: "Procesor Video LED", description: "Scaler NovaStar", stock: "2 Buc", notes: "Bucată" },
  { nr: 44, name: "Laptop Windows", description: "Lenovo", stock: "1 Buc", notes: "Bucată" },
  { nr: 45, name: "MacBook M4", description: "Apple", stock: "1 Buc", notes: "Bucată" },
  { nr: 46, name: "Avolites Tiger T", description: "Titan DMX Control", stock: "1 Buc", notes: "Bucată" },
  { nr: 47, name: "Avolites T1", description: "Dongle USB DMX control", stock: "1 Buc", notes: "Bucată" },
  { nr: 48, name: "Vertical FOG 1500 RGB", description: "Mașină fum vertical", stock: "2 Buc", notes: "Bucată" },
  { nr: 49, name: "Shehds LEKO LED Profile", description: "Follow Spot", stock: "2 Buc", notes: "Fără stativ" },
  { nr: 50, name: "ROBE FOG Machine", description: "Mașină fum DMX", stock: "1 Buc", notes: "Bucată" },
  { nr: 51, name: "Podium Element", description: "2×1m la H 20/40/60", stock: "12 Buc", notes: "Picioare incluse" },
];
