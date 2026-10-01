import { CalculatorState, CalcResult } from '../types';
import { FOUNDATION_PRICES, ROOF_PRICES, WINDOW_PRICES, DOOR_PRICES, REGIONS } from '../data/pricing';

interface Props {
  state: CalculatorState;
  result: CalcResult;
  formatPrice: (price: number) => string;
}

export default function CommercialProposal({ state, result, formatPrice }: Props) {
  const today = new Date().toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });
  const validUntil = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });

  const gradeName = state.kitGrade.type === 'standard' ? 'Стандарт' : state.kitGrade.type === 'comfort' ? 'Комфорт' : 'Премиум';
  const roofName = ROOF_PRICES[state.roof.type].name;
  const foundationName = FOUNDATION_PRICES[state.foundation.type].name;
  const windowGradeName = WINDOW_PRICES[state.windows.grade].name;
  const doorName = DOOR_PRICES[state.door.type].name;
  const regionName = REGIONS[state.client.region]?.label || state.client.region;

  const mortgagePayment = Math.round(result.total * 0.9 / 240 * 0.06 / 12 / (1 - Math.pow(1 + 0.06/12, -240)));

  return (
    <div className="bg-white text-gray-900 min-h-screen print:min-h-0">
      {/* Page 1 - Cover */}
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-800 via-green-700 to-emerald-800 text-white p-8 md:p-16 print:p-8">
        <div className="flex-1 flex flex-col justify-center">
          {/* Logo */}
          <div className="mb-12">
            <div className="flex items-center gap-4 mb-2">
              <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center font-bold text-green-700 text-3xl">G</div>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold">GreenFab</h1>
                <p className="text-green-200 text-lg">Prefab-дома по всей России</p>
              </div>
            </div>
          </div>

          {/* Title */}
          <div className="mb-12">
            <p className="text-green-200 text-lg mb-2">Коммерческое предложение</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Строительство prefab-дома<br />
              <span className="text-green-300">{result.totalArea} м² • {state.house.floors === 1 ? 'Одноэтажный' : 'Двухэтажный'}</span>
            </h2>
            <div className="flex flex-wrap gap-4 text-sm text-green-200">
              <span>📅 Дата: {today}</span>
              <span>⏳ Действует до: {validUntil}</span>
              <span>📍 {regionName}</span>
            </div>
          </div>

          {/* Client info */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-8 max-w-lg">
            <h3 className="font-semibold text-green-200 mb-3">Подготовлено для:</h3>
            {state.client.name && <p className="text-xl font-bold">{state.client.name}</p>}
            {state.client.phone && <p className="text-green-200">{state.client.phone}</p>}
            {state.client.city && <p className="text-green-200">{state.client.city}</p>}
            {state.client.address && <p className="text-green-200 text-sm mt-1">Адрес участка: {state.client.address}</p>}
          </div>

          {/* Key numbers */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl">
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-green-300">{result.totalArea}</div>
              <div className="text-xs text-green-200">м² площадь</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-green-300">90</div>
              <div className="text-xs text-green-200">дней строительство</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-green-300">10</div>
              <div className="text-xs text-green-200">лет гарантия</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-green-300">{formatPrice(result.pricePerSqm)}</div>
              <div className="text-xs text-green-200">за м²</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-end text-sm text-green-200">
          <div>
            <p>g-fab.ru</p>
            <p>info@g-fab.ru</p>
          </div>
          <div className="text-right">
            <p>ООО «ГринФаб»</p>
            <p>Строительство каркасных домов</p>
          </div>
        </div>
      </div>

      {/* Page 2 - About technology */}
      <div className="bg-white p-8 md:p-16 print:p-8 border-t-4 border-green-600">
        <h2 className="text-3xl font-bold text-green-800 mb-8">О технологии Prefab</h2>
        
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>GreenFab</strong> — это современное производство prefab-домов на немецком оборудовании Weinmann. 
              Мы строим каркасные дома заводской готовности по всей России с гарантией 10 лет.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Наша технология позволяет построить дом за <strong>90 дней</strong> — от проектирования до сдачи. 
              Домокомплект изготавливается на заводе и монтируется на участке за 3-5 дней.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Все материалы сертифицированы. Используем пиломатериал только камерной сушки 
              и двутавровую балку собственного производства с идеально правильной геометрией.
            </p>
          </div>
          <div className="bg-green-50 rounded-xl p-6">
            <h3 className="font-bold text-green-800 mb-4">Наши преимущества</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5">✓</span>
                <span><strong>Гарантия 10 лет</strong> на все виды работ и материалы</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5">✓</span>
                <span><strong>Фиксированная цена</strong> — фиксируем в договоре</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5">✓</span>
                <span><strong>Строительство за 90 дней</strong> от проекта до сдачи</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5">✓</span>
                <span><strong>Работаем с ипотекой</strong> и эскроу-счетами</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5">✓</span>
                <span><strong>Бесплатный проект</strong> — разработаем индивидуальный</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5">✓</span>
                <span><strong>Экскурсии на завод</strong> и строящиеся объекты</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5">✓</span>
                <span><strong>Экологичность</strong> — высаживаем деревья за каждый дом</span>
              </li>
            </ul>
          </div>
        </div>

        {/* House parameters */}
        <div className="bg-gray-50 rounded-xl p-6 mb-8">
          <h3 className="font-bold text-green-800 mb-4">Параметры вашего дома</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-gray-500">Площадь дома</p>
              <p className="text-lg font-bold">{result.totalArea} м²</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Этажность</p>
              <p className="text-lg font-bold">{state.house.floors === 1 ? '1 этаж' : '2 этажа'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Размеры 1 этаж</p>
              <p className="text-lg font-bold">{state.house.length1}×{state.house.width1} м</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Терраса</p>
              <p className="text-lg font-bold">{state.house.terraceLength * state.house.terraceWidth} м²</p>
            </div>
          </div>
        </div>
      </div>

      {/* Page 3 - Detailed estimate */}
      <div className="bg-white p-8 md:p-16 print:p-8 border-t-4 border-green-600">
        <h2 className="text-3xl font-bold text-green-800 mb-8">Детальная смета</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-green-800 text-white">
                <th className="text-left p-3 rounded-tl-lg">№</th>
                <th className="text-left p-3">Наименование</th>
                <th className="text-left p-3">Комплектация</th>
                <th className="text-right p-3 rounded-tr-lg">Стоимость</th>
              </tr>
            </thead>
            <tbody>
              {/* Домокомплект */}
              <tr className="bg-green-50">
                <td colSpan={4} className="p-3 font-bold text-green-800">1. Домокомплект</td>
              </tr>
              <tr className="border-b">
                <td className="p-3 text-gray-500">1.1</td>
                <td className="p-3">Домокомплект ({gradeName})</td>
                <td className="p-3 text-gray-500">{gradeName}</td>
                <td className="p-3 text-right font-medium">{formatPrice(result.kitCost)}</td>
              </tr>
              
              {/* Фундамент */}
              <tr className="bg-green-50 mt-2">
                <td colSpan={4} className="p-3 font-bold text-green-800">2. Фундамент</td>
              </tr>
              <tr className="border-b">
                <td className="p-3 text-gray-500">2.1</td>
                <td className="p-3">{foundationName}</td>
                <td className="p-3 text-gray-500">
                  {state.foundation.type === 'screw' ? `${state.foundation.screwPiles} свай` :
                   state.foundation.type === 'driven' ? `${state.foundation.drivenPiles} свай` :
                   `плита ${state.foundation.slabThickness} мм`}
                </td>
                <td className="p-3 text-right font-medium">{formatPrice(result.foundationCost)}</td>
              </tr>

              {/* Доставка */}
              <tr className="bg-green-50">
                <td colSpan={4} className="p-3 font-bold text-green-800">3. Доставка</td>
              </tr>
              <tr className="border-b">
                <td className="p-3 text-gray-500">3.1</td>
                <td className="p-3">Доставка домокомплекта</td>
                <td className="p-3 text-gray-500">{regionName}</td>
                <td className="p-3 text-right font-medium">{formatPrice(result.deliveryCost)}</td>
              </tr>

              {/* Монтаж */}
              <tr className="bg-green-50">
                <td colSpan={4} className="p-3 font-bold text-green-800">4. Монтаж и сборка</td>
              </tr>
              <tr className="border-b">
                <td className="p-3 text-gray-500">4.1</td>
                <td className="p-3">Работы по монтажу домокомплекта</td>
                <td className="p-3 text-gray-500">Штатная бригада</td>
                <td className="p-3 text-right font-medium">{formatPrice(result.assemblyCost)}</td>
              </tr>

              {/* Окна */}
              <tr className="bg-green-50">
                <td colSpan={4} className="p-3 font-bold text-green-800">5. Окна и входная группа</td>
              </tr>
              <tr className="border-b">
                <td className="p-3 text-gray-500">5.1</td>
                <td className="p-3">Окна ПВХ ({windowGradeName}), установка по ГОСТ</td>
                <td className="p-3 text-gray-500">{state.windows.straightWindows + state.windows.angledWindows} м²</td>
                <td className="p-3 text-right font-medium">{formatPrice(result.windowsCost)}</td>
              </tr>

              {/* Кровля */}
              <tr className="bg-green-50">
                <td colSpan={4} className="p-3 font-bold text-green-800">6. Кровля</td>
              </tr>
              <tr className="border-b">
                <td className="p-3 text-gray-500">6.1</td>
                <td className="p-3">{roofName}</td>
                <td className="p-3 text-gray-500">С монтажом</td>
                <td className="p-3 text-right font-medium">{formatPrice(result.roofCost)}</td>
              </tr>

              {/* Двери */}
              <tr className="bg-green-50">
                <td colSpan={4} className="p-3 font-bold text-green-800">7. Входная дверь</td>
              </tr>
              <tr className="border-b">
                <td className="p-3 text-gray-500">7.1</td>
                <td className="p-3">{doorName} с установкой</td>
                <td className="p-3 text-gray-500">{state.door.count} шт</td>
                <td className="p-3 text-right font-medium">{formatPrice(result.doorsCost)}</td>
              </tr>

              {/* ИТОГО */}
              <tr className="bg-green-800 text-white font-bold text-base">
                <td colSpan={3} className="p-4 rounded-bl-lg">ИТОГО</td>
                <td className="p-4 text-right rounded-br-lg text-lg">{formatPrice(result.total)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Price per sqm */}
        <div className="mt-6 grid md:grid-cols-3 gap-4">
          <div className="bg-green-50 rounded-xl p-4 text-center">
            <p className="text-sm text-gray-500">Стоимость за м²</p>
            <p className="text-2xl font-bold text-green-800">{formatPrice(result.pricePerSqm)}</p>
          </div>
          <div className="bg-green-50 rounded-xl p-4 text-center">
            <p className="text-sm text-gray-500">Общая площадь</p>
            <p className="text-2xl font-bold text-green-800">{result.totalArea} м²</p>
          </div>
          <div className="bg-green-50 rounded-xl p-4 text-center">
            <p className="text-sm text-gray-500">Комплектация</p>
            <p className="text-2xl font-bold text-green-800">{gradeName}</p>
          </div>
        </div>
      </div>

      {/* Page 4 - Payment & Stages */}
      <div className="bg-white p-8 md:p-16 print:p-8 border-t-4 border-green-600">
        <h2 className="text-3xl font-bold text-green-800 mb-8">Условия и этапы работы</h2>
        
        {/* Payment */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-green-50 rounded-xl p-6">
            <h3 className="font-bold text-green-800 mb-4 text-lg">💳 Условия оплаты</h3>
            {state.paymentType === 'mortgage' ? (
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Ипотечная ставка</span>
                  <span className="font-bold">от 6%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Срок</span>
                  <span className="font-bold">до 20 лет</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Ежемесячный платёж</span>
                  <span className="font-bold text-green-700">от {formatPrice(mortgagePayment)}/мес</span>
                </div>
                <div className="border-t border-green-200 pt-3 mt-3">
                  <p className="text-sm text-gray-500">Работаем с эскроу-счетами. Сотрудничаем с ведущими банками.</p>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Общая стоимость</span>
                  <span className="font-bold">{formatPrice(result.total)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">1 этап — аванс</span>
                  <span className="font-bold">30%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">2 этап — домокомплект</span>
                  <span className="font-bold">40%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">3 этап — монтаж</span>
                  <span className="font-bold">30%</span>
                </div>
              </div>
            )}
          </div>

          <div className="bg-green-50 rounded-xl p-6">
            <h3 className="font-bold text-green-800 mb-4 text-lg">📋 Гарантии</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <div>
                  <p className="font-medium">Гарантия фиксированной цены</p>
                  <p className="text-sm text-gray-500">Цена фиксируется в договоре и не меняется</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <div>
                  <p className="font-medium">Гарантия сроков</p>
                  <p className="text-sm text-gray-500">Ответственность подкреплена санкциями в договоре</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <div>
                  <p className="font-medium">Заводская гарантия 10 лет</p>
                  <p className="text-sm text-gray-500">Реальный срок службы — более 80 лет</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Stages */}
        <h3 className="font-bold text-green-800 mb-6 text-xl">Этапы реализации проекта</h3>
        <div className="grid md:grid-cols-6 gap-3">
          {[
            { num: '1', title: 'Проектирование', desc: 'Эскиз, планировки, 3D-визуализация', days: '7-14 дней' },
            { num: '2', title: 'Фундамент', desc: 'Устройство основания дома', days: '3-5 дней' },
            { num: '3', title: 'Производство', desc: 'Изготовление домокомплекта на заводе', days: '30-45 дней' },
            { num: '4', title: 'Доставка', desc: 'Транспортировка на участок', days: '1-3 дня' },
            { num: '5', title: 'Монтаж', desc: 'Сборка дома из панелей', days: '3-7 дней' },
            { num: '6', title: 'Сдача', desc: 'Приёмка работ, вывоз мусора', days: '1 день' },
          ].map((stage, i) => (
            <div key={i} className="bg-white border border-green-200 rounded-xl p-4 text-center">
              <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold mx-auto mb-2">{stage.num}</div>
              <h4 className="font-semibold text-sm mb-1">{stage.title}</h4>
              <p className="text-xs text-gray-500 mb-2">{stage.desc}</p>
              <p className="text-xs text-green-600 font-medium">{stage.days}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Page 5 - Contacts & CTA */}
      <div className="bg-gradient-to-br from-green-800 via-green-700 to-emerald-800 text-white p-8 md:p-16 print:p-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Готовы начать строительство?</h2>
          <p className="text-green-200 text-lg mb-8">
            Свяжитесь с нами для обсуждения деталей и заключения договора. 
            Бесплатно разработаем индивидуальный проект вашего дома.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="text-3xl mb-2">🌐</div>
              <p className="font-bold">Сайт</p>
              <p className="text-green-200">g-fab.ru</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="text-3xl mb-2">📱</div>
              <p className="font-bold">Telegram</p>
              <p className="text-green-200">@greenfab_house</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="text-3xl mb-2">📧</div>
              <p className="font-bold">Email</p>
              <p className="text-green-200">info@g-fab.ru</p>
            </div>
          </div>

          <div className="bg-white/10 rounded-xl p-6 mb-8">
            <p className="text-green-200 text-sm">
              Данное коммерческое предложение действительно до {validUntil}. 
              Окончательная стоимость определяется после выезда на участок и утверждения проекта.
            </p>
          </div>

          <div className="text-sm text-green-300">
            <p>ООО «ГринФаб» • g-fab.ru</p>
            <p className="mt-1">Строительство prefab-домов по всей России</p>
          </div>
        </div>
      </div>
    </div>
  );
}
