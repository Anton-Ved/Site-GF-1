import { useState, useEffect } from 'react';

function App() {
  const [activeTab, setActiveTab] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [typedText, setTypedText] = useState('');
  const fullText = 'Привет! Я AI-ассистент для создания веб-приложений 🚀';

  useEffect(() => {
    setIsVisible(true);
    let i = 0;
    const timer = setInterval(() => {
      if (i <= fullText.length) {
        setTypedText(fullText.slice(0, i));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 50);
    return () => clearInterval(timer);
  }, []);

  const capabilities = [
    {
      icon: '🌐',
      title: 'Создание веб-сайтов',
      description: 'React, Vite, Tailwind CSS — создаю полноценные сайты с нуля: лендинги, дашборды, игры, утилиты и многое другое.',
      examples: ['Лендинги', 'SPA приложения', 'Интерактивные игры', 'Дашборды'],
    },
    {
      icon: '🔧',
      title: 'Работа с кодом',
      description: 'Читаю, создаю и редактирую файлы проекта. Могу установить npm-пакеты, настроить конфигурацию.',
      examples: ['Создание компонентов', 'Рефакторинг', 'Установка зависимостей', 'Отладка'],
    },
    {
      icon: '🔍',
      title: 'Поиск в интернете',
      description: 'Ищу актуальную информацию, читаю документацию API, нахожу примеры и лучшие практики.',
      examples: ['API документация', 'Библиотеки', 'Best practices', 'Актуальные данные'],
    },
    {
      icon: '🎨',
      title: 'Генерация изображений',
      description: 'Создаю кастомные изображения с помощью AI: фоны, иконки, иллюстрации для вашего сайта.',
      examples: ['Hero-фоны', 'Иллюстрации', 'Иконки', 'Фотоматериалы'],
    },
    {
      icon: '📱',
      title: 'Адаптивный дизайн',
      description: 'Все сайты адаптивны — отлично выглядят на мобильных, планшетах и десктопах.',
      examples: ['Mobile-first', 'Гибкие сетки', 'Анимации', 'Тёмная тема'],
    },
    {
      icon: '⚡',
      title: 'Быстрая итерация',
      description: 'Могу быстро вносить изменения, добавлять функционал и исправлять ошибки по вашему запросу.',
      examples: ['Добавить фичу', 'Исправить баг', 'Улучшить UI', 'Оптимизация'],
    },
  ];

  const howToWork = [
    {
      step: '1',
      title: 'Опишите задачу',
      description: 'Расскажите, что хотите создать. Можно кратко — я уточню детали.',
      example: '"Сделай мне калькулятор"',
    },
    {
      step: '2',
      title: 'Я создам сайт',
      description: 'Напишу код, настрою стили, добавлю интерактивность — всё автоматически.',
      example: '→ Файлы создаются, пакеты устанавливаются',
    },
    {
      step: '3',
      title: 'Проверьте результат',
      description: 'Готовый сайт будет доступен для просмотра. Скажите, что изменить.',
      example: '"Добавь тёмную тему" → Готово!',
    },
  ];

  const tips = [
    '💡 Чем подробнее описание — тем точнее результат',
    '🎯 Можно попросить скопировать стиль конкретного сайта',
    '🔄 Не бойтесь просить переделать — я не обижаюсь!',
    '🌍 Могу искать информацию в интернете для актуальных данных',
    '🖼️ Могу сгенерировать изображения для вашего проекта',
    '📦 Поддерживаю любые npm-пакеты',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDMpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-50"></div>
        
        <div className={`relative max-w-6xl mx-auto px-4 py-20 md:py-32 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              <span className="text-sm text-gray-300">Онлайн и готов к работе</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
              AI Coding Assistant
            </h1>
            
            <div className="h-16 md:h-20 flex items-center justify-center">
              <p className="text-xl md:text-2xl text-gray-300 font-mono">
                {typedText}
                <span className="animate-pulse">|</span>
              </p>
            </div>
            
            <div className="mt-10 flex flex-wrap gap-4 justify-center">
              <a href="#capabilities" className="px-8 py-3 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full font-semibold hover:scale-105 transition-transform shadow-lg shadow-purple-500/25">
                Что я умею ↓
              </a>
              <a href="#how-to" className="px-8 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full font-semibold hover:bg-white/20 transition-colors">
                Как работать
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section id="capabilities" className="max-w-6xl mx-auto px-4 py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Мои возможности</h2>
        <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
          Я создаю полноценные веб-приложения с современным стеком технологий
        </p>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {capabilities.map((cap, i) => (
            <button
              key={i}
              onClick={() => setActiveTab(i)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === i
                  ? 'bg-gradient-to-r from-purple-500 to-cyan-500 text-white shadow-lg'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              <span className="mr-2">{cap.icon}</span>
              <span className="hidden sm:inline">{cap.title}</span>
              <span className="sm:hidden">{cap.title.split(' ')[0]}</span>
            </button>
          ))}
        </div>

        {/* Active Tab Content */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 md:p-12 transition-all">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="text-5xl mb-4">{capabilities[activeTab].icon}</div>
              <h3 className="text-2xl font-bold mb-3">{capabilities[activeTab].title}</h3>
              <p className="text-gray-300 leading-relaxed">{capabilities[activeTab].description}</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {capabilities[activeTab].examples.map((ex, i) => (
                <div
                  key={i}
                  className="bg-white/5 border border-white/10 rounded-xl p-4 text-center hover:bg-white/10 transition-colors"
                >
                  <span className="text-sm font-medium text-gray-200">{ex}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* All Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
          {capabilities.map((cap, i) => (
            <div
              key={i}
              onClick={() => setActiveTab(i)}
              className={`cursor-pointer bg-white/5 backdrop-blur-sm border rounded-xl p-5 transition-all hover:scale-[1.02] ${
                activeTab === i ? 'border-purple-400/50 shadow-lg shadow-purple-500/10' : 'border-white/10'
              }`}
            >
              <div className="text-3xl mb-3">{cap.icon}</div>
              <h4 className="font-semibold mb-1">{cap.title}</h4>
              <p className="text-sm text-gray-400 line-clamp-2">{cap.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How to Work Section */}
      <section id="how-to" className="max-w-6xl mx-auto px-4 py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Как со мной работать</h2>
        <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
          Всего 3 простых шага от идеи до готового сайта
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {howToWork.map((item, i) => (
            <div key={i} className="relative">
              {i < howToWork.length - 1 && (
                <div className="hidden md:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-purple-500/50 to-transparent -translate-x-1/2 z-0"></div>
              )}
              <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-purple-400/30 transition-colors">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 flex items-center justify-center text-xl font-bold mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-400 mb-4">{item.description}</p>
                <div className="bg-black/30 rounded-lg px-3 py-2 font-mono text-sm text-cyan-300">
                  {item.example}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Tips Section */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Полезные советы</h2>
        <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
          Чтобы получить максимум от работы со мной
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tips.map((tip, i) => (
            <div
              key={i}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5 hover:bg-white/10 transition-colors"
            >
              <p className="text-gray-200">{tip}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Example Prompts */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Примеры запросов</h2>
        <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
          Вот что вы можете попросить меня сделать
        </p>

        <div className="grid sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {[
            { prompt: 'Сделай лендинг для кофейни с меню и картой', tag: 'Лендинг' },
            { prompt: 'Создай игру "Змейка" на React', tag: 'Игра' },
            { prompt: 'Дашборд для аналитики продаж с графиками', tag: 'Дашборд' },
            { prompt: 'Калькулятор ипотеки с визуализацией', tag: 'Утилита' },
            { prompt: 'Портфолио фотографа с галереей', tag: 'Портфолио' },
            { prompt: 'Погодное приложение с API', tag: 'API' },
          ].map((item, i) => (
            <div
              key={i}
              className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5 hover:border-purple-400/30 transition-all hover:scale-[1.01]"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl">💬</span>
                <div>
                  <p className="text-gray-200 font-medium mb-2">"{item.prompt}"</p>
                  <span className="inline-block bg-purple-500/20 text-purple-300 text-xs px-2 py-1 rounded-full">
                    {item.tag}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Tech Stack */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Технологии</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'npm', 'HTML5', 'CSS3', 'JavaScript', 'AI Images', 'Web Search'].map((tech, i) => (
            <div
              key={i}
              className="bg-gradient-to-r from-white/5 to-white/10 border border-white/10 rounded-xl px-5 py-3 font-medium text-gray-200 hover:border-purple-400/30 transition-colors"
            >
              {tech}
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 mt-10">
        <div className="max-w-6xl mx-auto px-4 py-10 text-center">
          <p className="text-gray-400 mb-2">
            Просто опишите, что вам нужно — и я создам это! ✨
          </p>
          <p className="text-sm text-gray-500">
            React • Vite • Tailwind CSS • TypeScript
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
