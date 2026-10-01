import { useState, useRef } from 'react';
import { CalculatorState, CalcResult } from './types';
import { REGIONS, FOUNDATION_PRICES, ROOF_PRICES, WINDOW_PRICES, DOOR_PRICES, DELIVERY_PRICES, ASSEMBLY_PRICES } from './data/pricing';
import CommercialProposal from './components/CommercialProposal';

const initialState: CalculatorState = {
  client: {
    name: '',
    phone: '',
    email: '',
    city: '',
    region: 'khanty',
    address: '',
    cadastralNumber: '',
  },
  house: {
    floors: 1,
    length1: 12,
    width1: 8,
    length2: 0,
    width2: 0,
    partitionsLength1: 15,
    partitionsLength2: 0,
    terraceLength: 6,
    terraceWidth: 4,
    terraceLength2: 0,
    terraceWidth2: 0,
    annex1Length: 0,
    annex1Width: 0,
    annex2Length: 0,
    annex2Width: 0,
  },
  foundation: {
    type: 'screw',
    screwPiles: 16,
    drivenPiles: 12,
    slabThickness: 250,
    needBasePanel: false,
  },
  roof: {
    overhang: 0.6,
    corniceProjection: 0.6,
    angle: 23,
    cuckooCount: 0,
    type: 'metalStandard',
  },
  windows: {
    straightWindows: 12,
    angledWindows: 2,
    balconyDoors: 2,
    entranceDoors: 1,
    grade: 'comfort',
  },
  door: {
    type: 'thermo',
    count: 1,
  },
  kitGrade: {
    type: 'comfort',
  },
  distance: 0,
  paymentType: 'cash',
};

function calculateResult(state: CalculatorState): CalcResult {
  const { house, foundation, roof, windows, door, kitGrade, distance } = state;

  // Расчёт площади
  const area1 = house.length1 * house.width1;
  const area2 = house.floors >= 2 ? house.length2 * house.width2 : 0;
  const terraceArea = house.terraceLength * house.terraceWidth + house.terraceLength2 * house.terraceWidth2;
  const annexArea = house.annex1Length * house.annex1Width + house.annex2Length * house.annex2Width;
  const totalArea = area1 + area2;

  // Расчёт площади стен (упрощённый)
  const perimeter1 = 2 * (house.length1 + house.width1);
  const wallHeight = 3;
  const outerWallArea = perimeter1 * wallHeight * (house.floors >= 2 ? 1.8 : 1);
  const innerWallArea = (house.partitionsLength1 + house.partitionsLength2) * wallHeight;

  // Площадь кровли
  const roofArea = (area1 + area2) * 1.15; // коэффициент ската

  // Площадь панелей (упрощённо)
  const panelArea = (outerWallArea + innerWallArea + roofArea) / 2.5;

  // Домокомплект
  const kitPricePerSqm = kitGrade.type === 'standard' ? 38000 : kitGrade.type === 'comfort' ? 43000 : 52000;
  const kitCost = totalArea * kitPricePerSqm;

  // Фундамент
  let foundationCost = 0;
  if (foundation.type === 'screw') {
    foundationCost = foundation.screwPiles * FOUNDATION_PRICES.screw.pile;
  } else if (foundation.type === 'driven') {
    foundationCost = foundation.drivenPiles * FOUNDATION_PRICES.driven.pile;
  } else {
    const slabVolume = totalArea * (foundation.slabThickness / 1000);
    foundationCost = slabVolume * FOUNDATION_PRICES.slab.concrete;
  }

  // Доставка
  const deliveryTrips = Math.ceil(totalArea / 100) + 1;
  let deliveryCost = DELIVERY_PRICES.kit * deliveryTrips;
  deliveryCost += distance * 200;
  deliveryCost += DELIVERY_PRICES.tools;

  // Сборка
  let assemblyCost = panelArea * ASSEMBLY_PRICES.installation;
  assemblyCost += ASSEMBLY_PRICES.crane * 16; // часы работы крана
  assemblyCost += panelArea * ASSEMBLY_PRICES.travel;
  assemblyCost += panelArea * ASSEMBLY_PRICES.living;
  assemblyCost += roof.cuckooCount * ASSEMBLY_PRICES.cuckoo;

  // Окна
  const wp = WINDOW_PRICES[windows.grade];
  const windowsCost =
    windows.straightWindows * wp.straight +
    windows.angledWindows * wp.angled +
    windows.balconyDoors * wp.balcony;

  // Кровля
  const roofCost = roofArea * ROOF_PRICES[roof.type].material;

  // Двери
  const doorsCost = door.count * DOOR_PRICES[door.type].price;

  // Ростверк
  const rostrumCost = foundation.type === 'slab' ? 9000 : 0;

  const total = kitCost + foundationCost + deliveryCost + assemblyCost + windowsCost + roofCost + doorsCost + rostrumCost;
  const pricePerSqm = totalArea > 0 ? total / totalArea : 0;

  return {
    kitCost: Math.round(kitCost),
    deliveryCost: Math.round(deliveryCost),
    assemblyCost: Math.round(assemblyCost),
    foundationCost: Math.round(foundationCost),
    windowsCost: Math.round(windowsCost),
    roofCost: Math.round(roofCost),
    doorsCost: Math.round(doorsCost),
    rostrumCost: Math.round(rostrumCost),
    total: Math.round(total),
    pricePerSqm: Math.round(pricePerSqm),
    totalArea: Math.round(totalArea),
  };
}

function App() {
  const [state, setState] = useState<CalculatorState>(initialState);
  const [step, setStep] = useState(0);
  const [showKP, setShowKP] = useState(false);
  const kpRef = useRef<HTMLDivElement>(null);

  const result = calculateResult(state);

  const steps = [
    'Данные клиента',
    'Параметры дома',
    'Фундамент',
    'Комплектация',
    'Кровля',
    'Окна и двери',
    'Результат',
  ];

  const updateClient = (field: string, value: string) => {
    setState(prev => ({ ...prev, client: { ...prev.client, [field]: value } }));
  };

  const updateHouse = (field: string, value: number) => {
    setState(prev => ({ ...prev, house: { ...prev.house, [field]: value } }));
  };

  const updateFoundation = (field: string, value: any) => {
    setState(prev => ({ ...prev, foundation: { ...prev.foundation, [field]: value } }));
  };

  const updateRoof = (field: string, value: any) => {
    setState(prev => ({ ...prev, roof: { ...prev.roof, [field]: value } }));
  };

  const updateWindows = (field: string, value: any) => {
    setState(prev => ({ ...prev, windows: { ...prev.windows, [field]: value } }));
  };

  const updateDoor = (field: string, value: any) => {
    setState(prev => ({ ...prev, door: { ...prev.door, [field]: value } }));
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU').format(price) + ' ₽';
  };

  if (showKP) {
    return (
      <div>
        <div className="fixed top-4 right-4 z-50 flex gap-2">
          <button
            onClick={() => setShowKP(false)}
            className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition"
          >
            ← К калькулятору
          </button>
          <button
            onClick={() => window.print()}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-500 transition"
          >
            🖨️ Печать / PDF
          </button>
        </div>
        <div ref={kpRef}>
          <CommercialProposal state={state} result={result} formatPrice={formatPrice} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-green-900 via-green-800 to-emerald-900 border-b border-green-700/50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center font-bold text-white text-lg">G</div>
            <div>
              <h1 className="text-xl font-bold text-white">GreenFab</h1>
              <p className="text-xs text-green-300">Калькулятор стоимости prefab-дома</p>
            </div>
          </div>
          <div className="text-right text-sm text-green-300">
            <p>g-fab.ru</p>
            <p>Гарантия 10 лет</p>
          </div>
        </div>
      </header>

      {/* Progress */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center gap-1 mb-8 overflow-x-auto pb-2">
          {steps.map((s, i) => (
            <button
              key={i}
              onClick={() => setStep(i)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm whitespace-nowrap transition ${
                i === step ? 'bg-green-600 text-white' : i < step ? 'bg-green-900/50 text-green-300' : 'bg-gray-800 text-gray-500'
              }`}
            >
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                i < step ? 'bg-green-500 text-white' : i === step ? 'bg-white text-green-700' : 'bg-gray-700 text-gray-400'
              }`}>
                {i < step ? '✓' : i + 1}
              </span>
              <span className="hidden md:inline">{s}</span>
            </button>
          ))}
        </div>

        {/* Step Content */}
        <div className="bg-gray-800 rounded-2xl p-6 md:p-8 border border-gray-700">
          {step === 0 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold mb-6">📋 Данные клиента и проекта</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">ФИО клиента</label>
                  <input type="text" value={state.client.name} onChange={e => updateClient('name', e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2.5 text-white focus:border-green-500 focus:outline-none" placeholder="Иванов Иван Иванович" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Телефон</label>
                  <input type="text" value={state.client.phone} onChange={e => updateClient('phone', e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2.5 text-white focus:border-green-500 focus:outline-none" placeholder="+7 (999) 123-45-67" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Email</label>
                  <input type="email" value={state.client.email} onChange={e => updateClient('email', e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2.5 text-white focus:border-green-500 focus:outline-none" placeholder="client@email.com" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Город строительства</label>
                  <input type="text" value={state.client.city} onChange={e => updateClient('city', e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2.5 text-white focus:border-green-500 focus:outline-none" placeholder="Ханты-Мансийск" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Регион строительства</label>
                  <select value={state.client.region} onChange={e => updateClient('region', e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2.5 text-white focus:border-green-500 focus:outline-none">
                    {Object.entries(REGIONS).map(([key, val]) => (
                      <option key={key} value={key}>{val.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Расстояние от завода, км</label>
                  <input type="number" value={state.distance} onChange={e => setState(p => ({ ...p, distance: Number(e.target.value) }))}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2.5 text-white focus:border-green-500 focus:outline-none" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm text-gray-400 mb-1">Адрес участка</label>
                  <input type="text" value={state.client.address} onChange={e => updateClient('address', e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2.5 text-white focus:border-green-500 focus:outline-none" placeholder="ХМАО, г. Ханты-Мансийск, ул. Примерная, уч. 15" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Кадастровый номер</label>
                  <input type="text" value={state.client.cadastralNumber} onChange={e => updateClient('cadastralNumber', e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2.5 text-white focus:border-green-500 focus:outline-none" placeholder="86:01:0000000:1234" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Способ оплаты</label>
                  <select value={state.paymentType} onChange={e => setState(p => ({ ...p, paymentType: e.target.value as any }))}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2.5 text-white focus:border-green-500 focus:outline-none">
                    <option value="cash">Наличный расчёт</option>
                    <option value="mortgage">Ипотека</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold mb-6">🏠 Параметры дома</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Этажность</label>
                  <select value={state.house.floors} onChange={e => updateHouse('floors', Number(e.target.value))}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2.5 text-white focus:border-green-500 focus:outline-none">
                    <option value={1}>1 этаж</option>
                    <option value={2}>2 этажа</option>
                  </select>
                </div>
                <div className="text-right text-lg text-green-400 font-bold pt-6">
                  Площадь: {result.totalArea} м²
                </div>
                <div className="md:col-span-2 border-t border-gray-700 pt-4">
                  <h3 className="text-lg font-semibold mb-3 text-green-300">1-й этаж</h3>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Длина дома, м</label>
                  <input type="number" value={state.house.length1} onChange={e => updateHouse('length1', Number(e.target.value))}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2.5 text-white focus:border-green-500 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Ширина дома, м</label>
                  <input type="number" value={state.house.width1} onChange={e => updateHouse('width1', Number(e.target.value))}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2.5 text-white focus:border-green-500 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Перегородки 1 этаж, п.м.</label>
                  <input type="number" value={state.house.partitionsLength1} onChange={e => updateHouse('partitionsLength1', Number(e.target.value))}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2.5 text-white focus:border-green-500 focus:outline-none" />
                </div>
                {state.house.floors >= 2 && (
                  <>
                    <div className="md:col-span-2 border-t border-gray-700 pt-4">
                      <h3 className="text-lg font-semibold mb-3 text-green-300">2-й этаж</h3>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">Длина 2 этажа, м</label>
                      <input type="number" value={state.house.length2 || 10} onChange={e => updateHouse('length2', Number(e.target.value))}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2.5 text-white focus:border-green-500 focus:outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">Ширина 2 этажа, м</label>
                      <input type="number" value={state.house.width2 || 8} onChange={e => updateHouse('width2', Number(e.target.value))}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2.5 text-white focus:border-green-500 focus:outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">Перегородки 2 этаж, п.м.</label>
                      <input type="number" value={state.house.partitionsLength2} onChange={e => updateHouse('partitionsLength2', Number(e.target.value))}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2.5 text-white focus:border-green-500 focus:outline-none" />
                    </div>
                  </>
                )}
                <div className="md:col-span-2 border-t border-gray-700 pt-4">
                  <h3 className="text-lg font-semibold mb-3 text-green-300">Терраса</h3>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Длина террасы, м</label>
                  <input type="number" value={state.house.terraceLength} onChange={e => updateHouse('terraceLength', Number(e.target.value))}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2.5 text-white focus:border-green-500 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Ширина террасы, м</label>
                  <input type="number" value={state.house.terraceWidth} onChange={e => updateHouse('terraceWidth', Number(e.target.value))}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2.5 text-white focus:border-green-500 focus:outline-none" />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold mb-6">🏗️ Фундамент</h2>
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                {(['screw', 'driven', 'slab'] as const).map(type => (
                  <button
                    key={type}
                    onClick={() => updateFoundation('type', type)}
                    className={`p-4 rounded-xl border-2 text-left transition ${
                      state.foundation.type === type
                        ? 'border-green-500 bg-green-900/30'
                        : 'border-gray-600 bg-gray-700/50 hover:border-gray-500'
                    }`}
                  >
                    <div className="text-2xl mb-2">{type === 'screw' ? '🔩' : type === 'driven' ? '🔨' : '🧱'}</div>
                    <h3 className="font-semibold mb-1">{FOUNDATION_PRICES[type].name}</h3>
                    <p className="text-sm text-gray-400">
                      {type === 'screw' ? `${FOUNDATION_PRICES.screw.pile.toLocaleString()} ₽/свая` :
                       type === 'driven' ? `${FOUNDATION_PRICES.driven.pile.toLocaleString()} ₽/свая` :
                       `${FOUNDATION_PRICES.slab.concrete.toLocaleString()} ₽/м³`}
                    </p>
                  </button>
                ))}
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {state.foundation.type === 'screw' && (
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Количество свай</label>
                    <input type="number" value={state.foundation.screwPiles} onChange={e => updateFoundation('screwPiles', Number(e.target.value))}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2.5 text-white focus:border-green-500 focus:outline-none" />
                  </div>
                )}
                {state.foundation.type === 'driven' && (
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Количество свай</label>
                    <input type="number" value={state.foundation.drivenPiles} onChange={e => updateFoundation('drivenPiles', Number(e.target.value))}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2.5 text-white focus:border-green-500 focus:outline-none" />
                  </div>
                )}
                {state.foundation.type === 'slab' && (
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Толщина плиты, мм</label>
                    <input type="number" value={state.foundation.slabThickness} onChange={e => updateFoundation('slabThickness', Number(e.target.value))}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2.5 text-white focus:border-green-500 focus:outline-none" />
                  </div>
                )}
                <div className="text-right text-lg text-green-400 font-bold pt-6">
                  Стоимость: {formatPrice(result.foundationCost)}
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold mb-6">📦 Комплектация домокомплекта</h2>
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                {(['standard', 'comfort', 'premium'] as const).map(type => (
                  <button
                    key={type}
                    onClick={() => setState(p => ({ ...p, kitGrade: { type } }))}
                    className={`p-5 rounded-xl border-2 text-left transition ${
                      state.kitGrade.type === type
                        ? 'border-green-500 bg-green-900/30'
                        : 'border-gray-600 bg-gray-700/50 hover:border-gray-500'
                    }`}
                  >
                    <div className="text-3xl mb-2">{type === 'standard' ? '📋' : type === 'comfort' ? '✨' : '💎'}</div>
                    <h3 className="font-bold text-lg mb-1 capitalize">
                      {type === 'standard' ? 'Стандарт' : type === 'comfort' ? 'Комфорт' : 'Премиум'}
                    </h3>
                    <p className="text-sm text-gray-400 mb-2">
                      {type === 'standard' ? 'Базовая комплектация для постоянного проживания' :
                       type === 'comfort' ? 'Улучшенная теплоизоляция и материалы' :
                       'Максимальное качество и энергоэффективность'}
                    </p>
                    <p className="text-green-400 font-bold">от {type === 'standard' ? '38 000' : type === 'comfort' ? '43 000' : '52 000'} ₽/м²</p>
                  </button>
                ))}
              </div>
              <div className="bg-gray-700/50 rounded-xl p-4">
                <h3 className="font-semibold mb-3">Что входит в домокомплект:</h3>
                <ul className="grid md:grid-cols-2 gap-2 text-sm text-gray-300">
                  <li>✅ Стеновые панели с утеплителем</li>
                  <li>✅ Перекрытия (цокольное, межэтажное, чердачное)</li>
                  <li>✅ Кровельная система (обрешётка, контробрешётка)</li>
                  <li>✅ Крепёж и соединительные элементы</li>
                  <li>✅ Паро- и гидроизоляция</li>
                  <li>✅ Пиломатериал камерной сушки</li>
                  <li>✅ Двутавровая балка собственного производства</li>
                  <li>✅ Немецкое оборудование Weinmann</li>
                </ul>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold mb-6">🏠 Кровля</h2>
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                {(['metalStandard', 'metalPremium', 'softShingle'] as const).map(type => (
                  <button
                    key={type}
                    onClick={() => updateRoof('type', type)}
                    className={`p-4 rounded-xl border-2 text-left transition ${
                      state.roof.type === type
                        ? 'border-green-500 bg-green-900/30'
                        : 'border-gray-600 bg-gray-700/50 hover:border-gray-500'
                    }`}
                  >
                    <h3 className="font-semibold mb-1">{ROOF_PRICES[type].name}</h3>
                    <p className="text-sm text-green-400">{ROOF_PRICES[type].material.toLocaleString()} ₽/м²</p>
                  </button>
                ))}
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Свес кровли, м</label>
                  <input type="number" step="0.1" value={state.roof.overhang} onChange={e => updateRoof('overhang', Number(e.target.value))}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2.5 text-white focus:border-green-500 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Угол кровли, градусы</label>
                  <input type="number" value={state.roof.angle} onChange={e => updateRoof('angle', Number(e.target.value))}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2.5 text-white focus:border-green-500 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Кукушка (мансардное окно), шт</label>
                  <input type="number" value={state.roof.cuckooCount} onChange={e => updateRoof('cuckooCount', Number(e.target.value))}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2.5 text-white focus:border-green-500 focus:outline-none" />
                </div>
                <div className="text-right text-lg text-green-400 font-bold pt-6">
                  Стоимость кровли: {formatPrice(result.roofCost)}
                </div>
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold mb-6">🪟 Окна и двери</h2>
              <div className="mb-6">
                <label className="block text-sm text-gray-400 mb-2">Класс окон</label>
                <div className="grid md:grid-cols-3 gap-3">
                  {(['economy', 'comfort', 'premium'] as const).map(grade => (
                    <button
                      key={grade}
                      onClick={() => updateWindows('grade', grade)}
                      className={`p-3 rounded-xl border-2 text-center transition ${
                        state.windows.grade === grade
                          ? 'border-green-500 bg-green-900/30'
                          : 'border-gray-600 bg-gray-700/50 hover:border-gray-500'
                      }`}
                    >
                      <span className="font-semibold capitalize">
                        {grade === 'economy' ? 'Эконом' : grade === 'comfort' ? 'Комфорт' : 'Премиум'}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Окна прямые, м²</label>
                  <input type="number" step="0.1" value={state.windows.straightWindows} onChange={e => updateWindows('straightWindows', Number(e.target.value))}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2.5 text-white focus:border-green-500 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Окна косые (треугольные), м²</label>
                  <input type="number" step="0.1" value={state.windows.angledWindows} onChange={e => updateWindows('angledWindows', Number(e.target.value))}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2.5 text-white focus:border-green-500 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Двери балконные (портальные), м²</label>
                  <input type="number" step="0.1" value={state.windows.balconyDoors} onChange={e => updateWindows('balconyDoors', Number(e.target.value))}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2.5 text-white focus:border-green-500 focus:outline-none" />
                </div>
              </div>
              <div className="border-t border-gray-700 pt-4 mt-4">
                <h3 className="text-lg font-semibold mb-3">Входная дверь</h3>
                <div className="grid md:grid-cols-3 gap-3">
                  {(['lerua', 'valberg', 'thermo'] as const).map(type => (
                    <button
                      key={type}
                      onClick={() => updateDoor('type', type)}
                      className={`p-3 rounded-xl border-2 text-left transition ${
                        state.door.type === type
                          ? 'border-green-500 bg-green-900/30'
                          : 'border-gray-600 bg-gray-700/50 hover:border-gray-500'
                      }`}
                    >
                      <p className="text-sm font-medium">{DOOR_PRICES[type].name}</p>
                      <p className="text-xs text-green-400">{DOOR_PRICES[type].price.toLocaleString()} ₽</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 6 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-6">💰 Итоговая стоимость</h2>
              <div className="bg-gradient-to-r from-green-900/50 to-emerald-900/50 rounded-xl p-6 border border-green-700/50">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4 text-green-300">Сводка по стоимости</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between"><span className="text-gray-400">Домокомплект</span><span className="font-medium">{formatPrice(result.kitCost)}</span></div>
                      <div className="flex justify-between"><span className="text-gray-400">Фундамент</span><span className="font-medium">{formatPrice(result.foundationCost)}</span></div>
                      <div className="flex justify-between"><span className="text-gray-400">Доставка</span><span className="font-medium">{formatPrice(result.deliveryCost)}</span></div>
                      <div className="flex justify-between"><span className="text-gray-400">Монтаж/сборка</span><span className="font-medium">{formatPrice(result.assemblyCost)}</span></div>
                      <div className="flex justify-between"><span className="text-gray-400">Окна</span><span className="font-medium">{formatPrice(result.windowsCost)}</span></div>
                      <div className="flex justify-between"><span className="text-gray-400">Кровля</span><span className="font-medium">{formatPrice(result.roofCost)}</span></div>
                      <div className="flex justify-between"><span className="text-gray-400">Двери</span><span className="font-medium">{formatPrice(result.doorsCost)}</span></div>
                      <div className="border-t border-green-700/50 pt-3 mt-3">
                        <div className="flex justify-between text-xl font-bold">
                          <span>ИТОГО</span>
                          <span className="text-green-400">{formatPrice(result.total)}</span>
                        </div>
                        <div className="flex justify-between text-sm text-gray-400 mt-1">
                          <span>Стоимость за м²</span>
                          <span>{formatPrice(result.pricePerSqm)}/м²</span>
                        </div>
                        <div className="flex justify-between text-sm text-gray-400">
                          <span>Общая площадь</span>
                          <span>{result.totalArea} м²</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col justify-center items-center text-center">
                    <div className="text-5xl mb-4">🏡</div>
                    <p className="text-gray-300 mb-4">Готовы сформировать коммерческое предложение?</p>
                    <button
                      onClick={() => setShowKP(true)}
                      className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold rounded-xl hover:from-green-400 hover:to-emerald-400 transition shadow-lg shadow-green-500/25 text-lg"
                    >
                      📄 Сформировать КП
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-700">
            <button
              onClick={() => setStep(Math.max(0, step - 1))}
              disabled={step === 0}
              className="px-6 py-2.5 bg-gray-700 rounded-lg hover:bg-gray-600 transition disabled:opacity-30 disabled:cursor-not-allowed"
            >
              ← Назад
            </button>
            {step < steps.length - 1 ? (
              <button
                onClick={() => setStep(step + 1)}
                className="px-6 py-2.5 bg-green-600 rounded-lg hover:bg-green-500 transition font-medium"
              >
                Далее →
              </button>
            ) : (
              <button
                onClick={() => setShowKP(true)}
                className="px-6 py-2.5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg hover:from-green-400 hover:to-emerald-400 transition font-bold"
              >
                📄 Сформировать КП
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
