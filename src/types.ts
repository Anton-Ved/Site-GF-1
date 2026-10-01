export interface ClientInfo {
  name: string;
  phone: string;
  email: string;
  city: string;
  region: string;
  address: string;
  cadastralNumber: string;
}

export interface HouseParams {
  floors: number;
  length1: number;
  width1: number;
  length2: number;
  width2: number;
  partitionsLength1: number;
  partitionsLength2: number;
  terraceLength: number;
  terraceWidth: number;
  terraceLength2: number;
  terraceWidth2: number;
  annex1Length: number;
  annex1Width: number;
  annex2Length: number;
  annex2Width: number;
}

export interface FoundationParams {
  type: 'screw' | 'driven' | 'slab';
  screwPiles: number;
  drivenPiles: number;
  slabThickness: number;
  needBasePanel: boolean;
}

export interface RoofParams {
  overhang: number;
  corniceProjection: number;
  angle: number;
  cuckooCount: number;
  type: 'metalStandard' | 'metalPremium' | 'softShingle';
}

export interface WindowParams {
  straightWindows: number;
  angledWindows: number;
  balconyDoors: number;
  entranceDoors: number;
  grade: 'economy' | 'comfort' | 'premium';
}

export interface DoorParams {
  type: 'lerua' | 'valberg' | 'thermo';
  count: number;
}

export interface KitGrade {
  type: 'standard' | 'comfort' | 'premium';
}

export interface CalcResult {
  kitCost: number;
  deliveryCost: number;
  assemblyCost: number;
  foundationCost: number;
  windowsCost: number;
  roofCost: number;
  doorsCost: number;
  rostrumCost: number;
  total: number;
  pricePerSqm: number;
  totalArea: number;
}

export interface CalculatorState {
  client: ClientInfo;
  house: HouseParams;
  foundation: FoundationParams;
  roof: RoofParams;
  windows: WindowParams;
  door: DoorParams;
  kitGrade: KitGrade;
  distance: number;
  paymentType: 'cash' | 'mortgage';
}
