// Цены основаны на калькуляторе Greenfab (версия 2.12)
// Все цены указаны с наценкой 30% (для КП)

export const REGIONS: Record<string, { label: string; deliveryBase: number }> = {
  'khanty': { label: 'Ханты-Мансийск', deliveryBase: 0 },
  'surgut': { label: 'Сургут', deliveryBase: 0 },
  'surgut200': { label: 'Сургут + 200 км', deliveryBase: 50000 },
  'yanao': { label: 'ЯНАО', deliveryBase: 150000 },
  'ekb': { label: 'Екатеринбург', deliveryBase: 100000 },
  'kazan': { label: 'Казань', deliveryBase: 150000 },
  'piter': { label: 'Санкт-Петербург', deliveryBase: 200000 },
  'moscow': { label: 'Москва', deliveryBase: 250000 },
};

export const DISTANCE_PRICING = {
  base: 150000, // базовая доставка за рейс
  perKm: 200, // наценка за км
};

// Домокомплект - цена за м2 панелей по комплектациям
export const KIT_PRICES = {
  standard: {
    kit: 6048, // за м2 панелей
    fasteners: 363, // спаксы за м2
    name: 'Стандарт',
  },
  comfort: {
    kit: 6048,
    fasteners: 396,
    name: 'Комфорт',
  },
  premium: {
    kit: 6048,
    fasteners: 446,
    name: 'Премиум',
  },
};

// Стеновые панели - толщина утеплителя
export const WALL_THICKNESS = {
  standard: { outer: 0.15, inner: 0.10, totalOuter: 0.17, totalInner: 0.17 },
  comfort: { outer: 0.17, inner: 0.17, totalOuter: 0.22, totalInner: 0.17 },
  premium: { outer: 0.22, inner: 0.17, totalOuter: 0.26, totalInner: 0.17 },
};

// Фундамент
export const FOUNDATION_PRICES = {
  screw: {
    pile: 9858, // свая винтовая с установкой за шт
    name: 'Свайно-винтовой фундамент',
  },
  driven: {
    pile: 9933, // забивная свая с забивкой за шт
    name: 'Свайно-забивной фундамент',
  },
  slab: {
    concrete: 61117, // за м3 бетона
    name: 'Плитный фундамент',
  },
};

// Кровля
export const ROOF_PRICES = {
  metalStandard: {
    material: 3802, // за м2 (материал + работа + комплектующие)
    name: 'Металлочерепица Супермонтеррей 0.45 мм',
  },
  metalPremium: {
    material: 5500, // за м2
    name: 'Металлочерепица премиум 0.5 мм',
  },
  softShingle: {
    material: 6171, // за м2
    name: 'Гибкая черепица Shinglas',
  },
};

// Окна - цена за м2
export const WINDOW_PRICES = {
  economy: {
    straight: 14874,
    angled: 19329,
    balcony: 34621,
    name: 'Эконом',
  },
  comfort: {
    straight: 16429,
    angled: 20169,
    balcony: 34621,
    name: 'Комфорт',
  },
  premium: {
    straight: 17471,
    angled: 21850,
    balcony: 34621,
    name: 'Премиум',
  },
};

// Двери
export const DOOR_PRICES = {
  lerua: {
    price: 20627,
    name: 'Дверь входная металлическая Е40М',
  },
  valberg: {
    price: 45839,
    name: 'Дверь металлическая С2 ФОРТЕ (Valberg)',
  },
  thermo: {
    price: 67737,
    name: 'Дверь "ТЕРМОСТАНДАРТ" с терморазрывом',
  },
};

// Доставка
export const DELIVERY_PRICES = {
  kit: 214000, // за рейс домокомплекта
  roof: 13447, // доставка кровли
  foundation: 9000, // доставка бруса/швеллера
  tools: 41834, // ввоз/вывоз инструмента
};

// Сборка/монтаж
export const ASSEMBLY_PRICES = {
  installation: 1146, // за м2 панелей
  crane: 771, // работа спецтехники
  travel: 369, // проезд бригады за м2
  living: 302, // проживание бригады за м2
  cuckoo: 84037, // кукушка шт
};

// Базовая стоимость за м2 площади дома (упрощённый расчёт для клиента)
export const BASE_PRICE_PER_SQM = {
  standard: 38000,
  comfort: 43000,
  premium: 52000,
};

// Минимальные цены для отображения в КП
export const MIN_PRICES = {
  foundation: 71000,
  delivery: 214000,
  assembly: 44000,
};
