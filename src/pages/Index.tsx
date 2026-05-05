import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

type FontSize = "normal" | "large" | "xlarge";
type ContrastMode = "normal" | "high" | "dark";

type Section =
  | "home"
  | "about"
  | "services"
  | "documents"
  | "news"
  | "contacts"
  | "specialists"
  | "announcements";

const NAV_ITEMS: { id: Section; label: string; icon: string }[] = [
  { id: "home", label: "Главная", icon: "House" },
  { id: "about", label: "Об учреждении", icon: "Building2" },
  { id: "services", label: "Услуги", icon: "ClipboardList" },
  { id: "specialists", label: "Специалисты", icon: "Users" },
  { id: "documents", label: "Документы", icon: "FileText" },
  { id: "news", label: "Новости", icon: "Newspaper" },
  { id: "announcements", label: "Объявления", icon: "Megaphone" },
  { id: "contacts", label: "Контакты", icon: "Phone" },
];

const SPECIALISTS = [
  {
    name: "Иванова Светлана Петровна",
    role: "Начальник отдела",
    room: "Каб. 101",
    schedule: [
      { day: "Понедельник", time: "09:00 – 13:00" },
      { day: "Среда", time: "14:00 – 18:00" },
      { day: "Пятница", time: "09:00 – 12:00" },
    ],
    reception: "Вторник, Четверг: 10:00 – 12:00",
    phone: "+7 (495) 000-00-01",
  },
  {
    name: "Петров Алексей Николаевич",
    role: "Ведущий специалист",
    room: "Каб. 205",
    schedule: [
      { day: "Вторник", time: "09:00 – 13:00" },
      { day: "Четверг", time: "14:00 – 18:00" },
    ],
    reception: "Понедельник, Среда: 11:00 – 13:00",
    phone: "+7 (495) 000-00-02",
  },
  {
    name: "Сидорова Мария Юрьевна",
    role: "Специалист 1-й категории",
    room: "Каб. 312",
    schedule: [
      { day: "Понедельник", time: "10:00 – 14:00" },
      { day: "Среда", time: "09:00 – 13:00" },
      { day: "Пятница", time: "14:00 – 17:00" },
    ],
    reception: "Вторник: 09:00 – 11:00, Пятница: 15:00 – 17:00",
    phone: "+7 (495) 000-00-03",
  },
  {
    name: "Козлов Дмитрий Владимирович",
    role: "Юрисконсульт",
    room: "Каб. 118",
    schedule: [
      { day: "Вторник", time: "10:00 – 14:00" },
      { day: "Четверг", time: "09:00 – 13:00" },
    ],
    reception: "По предварительной записи",
    phone: "+7 (495) 000-00-04",
  },
];

const SERVICES = [
  { title: "Оформление документов", desc: "Приём, обработка и выдача официальных документов граждан", icon: "FileCheck" },
  { title: "Консультации граждан", desc: "Устные и письменные консультации по вопросам деятельности учреждения", icon: "MessageSquare" },
  { title: "Социальная поддержка", desc: "Содействие в получении мер социальной поддержки и льгот", icon: "HeartHandshake" },
  { title: "Выдача справок", desc: "Оформление и выдача справок установленного образца", icon: "Stamp" },
  { title: "Приём обращений", desc: "Регистрация и рассмотрение обращений граждан и организаций", icon: "Inbox" },
  { title: "Государственные услуги", desc: "Предоставление государственных услуг в электронном виде", icon: "Monitor" },
];

const DOCUMENTS = [
  { title: "Устав учреждения", date: "15.01.2024", type: "PDF", size: "1.2 МБ" },
  { title: "Положение о структурном подразделении", date: "20.02.2024", type: "PDF", size: "856 КБ" },
  { title: "График работы на 2024 год", date: "09.01.2024", type: "PDF", size: "320 КБ" },
  { title: "Административный регламент", date: "05.03.2024", type: "PDF", size: "2.1 МБ" },
  { title: "Антикоррупционная политика", date: "01.02.2024", type: "PDF", size: "445 КБ" },
  { title: "Отчёт о деятельности за 2023 год", date: "30.03.2024", type: "PDF", size: "3.8 МБ" },
];

const NEWS = [
  {
    date: "03 мая 2026",
    title: "Изменён порядок приёма граждан с 10 мая",
    text: "С 10 мая 2026 года вводится новый порядок приёма граждан. Предварительная запись обязательна для всех категорий посетителей.",
    tag: "Важно",
  },
  {
    date: "28 апреля 2026",
    title: "Расширен перечень государственных услуг",
    text: "Учреждение начинает предоставлять дополнительные услуги в электронном формате через портал Госуслуги.",
    tag: "Услуги",
  },
  {
    date: "15 апреля 2026",
    title: "Плановые профилактические работы завершены",
    text: "Все технические работы успешно завершены. Учреждение работает в штатном режиме.",
    tag: "Техническое",
  },
];

const ANNOUNCEMENTS = [
  {
    date: "05.05.2026",
    title: "Закрытие кабинета №101 на ремонт",
    text: "Кабинет №101 будет закрыт с 6 по 8 мая. Приём ведётся в кабинете №115.",
    urgent: true,
  },
  {
    date: "01.05.2026",
    title: "Праздничные выходные дни",
    text: "Учреждение не работает 1, 2 и 9 мая в связи с праздничными и нерабочими днями.",
    urgent: false,
  },
  {
    date: "25.04.2026",
    title: "Приглашение на публичные слушания",
    text: "15 мая 2026 в 15:00 состоятся публичные слушания по вопросам развития учреждения. Приглашаем всех желающих.",
    urgent: false,
  },
];

export default function Index() {
  const [activeSection, setActiveSection] = useState<Section>("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [fontSize, setFontSize] = useState<FontSize>("normal");
  const [contrast, setContrast] = useState<ContrastMode>("normal");
  const [a11yOpen, setA11yOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const navigate = (section: Section) => {
    setActiveSection(section);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const fontSizeClass = fontSize === "large" ? "text-lg" : fontSize === "xlarge" ? "text-xl" : "";

  const contrastStyle: React.CSSProperties =
    contrast === "high"
      ? { filter: "contrast(1.5) saturate(0)" }
      : contrast === "dark"
      ? { filter: "invert(1) hue-rotate(180deg)" }
      : {};

  return (
    <div className={`min-h-screen bg-[#f0f4f8] font-golos ${fontSizeClass}`} style={contrastStyle}>
      {/* Accessibility bar */}
      <div className="bg-[#1a2533] text-white text-sm py-2 px-4">
        <div className="max-w-6xl mx-auto flex flex-wrap gap-x-4 gap-y-1 justify-between items-center">
          <div className="flex flex-wrap gap-x-6 gap-y-1 items-center">
            <span className="flex items-center gap-2">
              <Icon name="Clock" size={14} />
              Пн–Пт: 09:00–18:00, обед 13:00–14:00
            </span>
            <span className="flex items-center gap-2">
              <Icon name="Phone" size={14} />
              +7 (495) 000-00-00
            </span>
          </div>
          {/* Версия для слабовидящих */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setA11yOpen(!a11yOpen)}
              className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 px-3 py-1 rounded-lg transition-colors text-xs font-medium"
              title="Версия для слабовидящих"
            >
              <Icon name="Eye" size={13} />
              <span className="hidden sm:inline">Версия для слабовидящих</span>
              <span className="sm:hidden">А</span>
            </button>
          </div>
        </div>

        {/* A11y panel */}
        {a11yOpen && (
          <div className="max-w-6xl mx-auto mt-2 pb-2 border-t border-white/20 pt-2 flex flex-wrap gap-4 items-center animate-fade-in">
            <div className="flex items-center gap-2">
              <span className="text-white/70 text-xs">Размер шрифта:</span>
              {(["normal", "large", "xlarge"] as FontSize[]).map((f) => (
                <button
                  key={f}
                  onClick={() => setFontSize(f)}
                  className={`w-8 h-8 rounded font-bold transition-colors ${fontSize === f ? "bg-white text-[#1a2533]" : "bg-white/20 hover:bg-white/30 text-white"}`}
                  style={{ fontSize: f === "normal" ? 13 : f === "large" ? 16 : 19 }}
                >
                  А
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-white/70 text-xs">Контраст:</span>
              <button
                onClick={() => setContrast("normal")}
                className={`px-3 py-1 rounded text-xs font-medium transition-colors ${contrast === "normal" ? "bg-white text-[#1a2533]" : "bg-white/20 hover:bg-white/30 text-white"}`}
              >
                Обычный
              </button>
              <button
                onClick={() => setContrast("high")}
                className={`px-3 py-1 rounded text-xs font-medium transition-colors ${contrast === "high" ? "bg-white text-[#1a2533]" : "bg-white/20 hover:bg-white/30 text-white"}`}
              >
                Высокий
              </button>
              <button
                onClick={() => setContrast("dark")}
                className={`px-3 py-1 rounded text-xs font-medium transition-colors ${contrast === "dark" ? "bg-white text-[#1a2533]" : "bg-white/20 hover:bg-white/30 text-white"}`}
              >
                Тёмный
              </button>
            </div>
            <button
              onClick={() => { setFontSize("normal"); setContrast("normal"); }}
              className="text-white/60 hover:text-white text-xs underline"
            >
              Сбросить
            </button>
          </div>
        )}
      </div>

      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between py-4 gap-4">
            <button onClick={() => navigate("home")} className="flex items-center gap-3 text-left">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: "var(--gov-blue)" }}
              >
                <Icon name="Building2" size={26} className="text-white" />
              </div>
              <div>
                <div className="font-bold text-lg leading-tight" style={{ color: "var(--gov-blue)" }}>
                  Государственное учреждение
                </div>
                <div className="text-sm text-gray-500">Официальный сайт</div>
              </div>
            </button>

            {/* Desktop nav */}
            <nav className="hidden lg:flex flex-wrap gap-1">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => navigate(item.id)}
                  className={`nav-link text-sm ${activeSection === item.id ? "active" : "text-gray-700"}`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Mobile menu btn */}
            <button
              className="lg:hidden p-2 rounded-lg"
              style={{ color: "var(--gov-blue)" }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Меню"
            >
              <Icon name={mobileMenuOpen ? "X" : "Menu"} size={28} />
            </button>
          </div>

          {/* Mobile menu */}
          {mobileMenuOpen && (
            <nav className="lg:hidden pb-4 grid grid-cols-2 gap-1 animate-fade-in">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => navigate(item.id)}
                  className={`nav-link text-left flex items-center gap-2 ${activeSection === item.id ? "active" : "text-gray-700"}`}
                >
                  <Icon name={item.icon} size={16} />
                  {item.label}
                </button>
              ))}
            </nav>
          )}
        </div>
      </header>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-4 py-8 animate-fade-in" key={activeSection}>
        {activeSection === "home" && <HomeSection navigate={navigate} />}
        {activeSection === "about" && <AboutSection />}
        {activeSection === "services" && <ServicesSection />}
        {activeSection === "specialists" && <SpecialistsSection />}
        {activeSection === "documents" && <DocumentsSection />}
        {activeSection === "news" && <NewsSection />}
        {activeSection === "announcements" && <AnnouncementsSection />}
        {activeSection === "contacts" && <ContactsSection />}
      </main>

      {/* ===== FIXED WIDGETS ===== */}

      {/* Горячая линия — левый нижний угол */}
      <div className="fixed bottom-6 left-4 z-50 flex flex-col gap-2 items-start">
        <a
          href="tel:88002000000"
          className="flex items-center gap-2 text-white font-bold px-4 py-3 rounded-2xl shadow-lg text-sm transition-all hover:scale-105 hover:shadow-xl"
          style={{ background: "var(--gov-red, #c0392b)" }}
          title="Горячая линия"
        >
          <Icon name="PhoneCall" size={18} />
          <span className="hidden sm:inline">Горячая линия: 8-800-200-00-00</span>
          <span className="sm:hidden">8-800-200-00-00</span>
        </a>
        <a
          href="#anticorruption"
          className="flex items-center gap-2 text-white font-semibold px-4 py-2.5 rounded-2xl shadow-md text-xs transition-all hover:scale-105"
          style={{ background: "#7c3aed" }}
          title="Противодействие коррупции"
        >
          <Icon name="ShieldCheck" size={15} />
          <span>Противодействие коррупции</span>
        </a>
      </div>

      {/* Кнопка наверх — правый нижний угол */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-4 z-50 w-12 h-12 rounded-2xl text-white shadow-lg flex items-center justify-center transition-all hover:scale-110 hover:shadow-xl animate-fade-in"
          style={{ background: "var(--gov-blue)" }}
          title="Наверх"
          aria-label="Прокрутить вверх"
        >
          <Icon name="ArrowUp" size={22} />
        </button>
      )}

      {/* Footer */}
      <footer className="mt-12 bg-[#1a2533] text-white">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="font-bold text-lg mb-3">Государственное учреждение</div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Официальный сайт государственного учреждения. Информация носит официальный характер.
              </p>
            </div>
            <div>
              <div className="font-bold mb-3">Навигация</div>
              <div className="flex flex-col gap-1">
                {NAV_ITEMS.slice(0, 4).map((item) => (
                  <button
                    key={item.id}
                    onClick={() => navigate(item.id)}
                    className="text-gray-400 hover:text-white text-left text-sm transition-colors"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <div className="font-bold mb-3">Контакты</div>
              <div className="flex flex-col gap-2 text-sm text-gray-400">
                <span>📍 г. Москва, ул. Примерная, д. 1</span>
                <span>📞 +7 (495) 000-00-00</span>
                <span>✉️ info@example.gov.ru</span>
              </div>
            </div>
          </div>
          {/* Антикоррупционный блок */}
          <div id="anticorruption" className="border-t border-gray-700 mt-8 pt-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "#7c3aed" }}>
                  <Icon name="ShieldCheck" size={20} className="text-white" />
                </div>
                <div>
                  <div className="font-bold text-white">Противодействие коррупции</div>
                  <div className="text-xs text-gray-400">В соответствии с Федеральным законом №273-ФЗ</div>
                </div>
              </div>
              <div className="flex flex-wrap gap-3 text-sm">
                <a href="#" className="text-purple-300 hover:text-white transition-colors underline">Антикоррупционная политика</a>
                <a href="#" className="text-purple-300 hover:text-white transition-colors underline">Сообщить о коррупции</a>
                <a href="https://bus.gov.ru" target="_blank" rel="noopener noreferrer" className="text-purple-300 hover:text-white transition-colors underline">bus.gov.ru</a>
              </div>
            </div>
            <div className="bg-purple-900/30 rounded-xl px-4 py-3 text-sm text-gray-300 border border-purple-800/40">
              Телефон доверия по вопросам коррупции: <strong className="text-white">8-800-200-00-01</strong> (звонок бесплатный)
            </div>
          </div>

          <div className="border-t border-gray-700 mt-6 pt-4 text-center text-sm text-gray-500">
            © 2026 Государственное учреждение. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
}

function HomeSection({ navigate }: { navigate: (s: Section) => void }) {
  return (
    <div className="space-y-10">
      <section
        className="rounded-2xl p-8 md:p-12 text-white relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #1a4a8a 0%, #2563c4 60%, #3b82f6 100%)" }}
      >
        <div className="relative z-10 max-w-2xl">
          <div className="text-blue-200 text-sm font-medium mb-3 uppercase tracking-wider">Официальный сайт</div>
          <h1 className="text-3xl md:text-5xl font-black mb-4 leading-tight">
            Государственное учреждение
          </h1>
          <p className="text-blue-100 text-lg md:text-xl mb-8">
            Мы работаем для вас. Получите необходимые услуги и информацию быстро и удобно.
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => navigate("services")}
              className="bg-white font-semibold px-6 py-3 rounded-xl text-base transition-all hover:shadow-lg hover:scale-105"
              style={{ color: "var(--gov-blue)" }}
            >
              Наши услуги
            </button>
            <button
              onClick={() => navigate("specialists")}
              className="border-2 border-white text-white font-semibold px-6 py-3 rounded-xl text-base transition-all hover:bg-white/10"
            >
              Расписание приёма
            </button>
          </div>
        </div>
        <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none">
          <Icon name="Building2" size={240} />
        </div>
      </section>

      <section>
        <h2 className="section-title">Быстрый доступ</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
          {[
            { id: "services" as Section, label: "Услуги", icon: "ClipboardList", color: "#dbeafe" },
            { id: "specialists" as Section, label: "Специалисты", icon: "Users", color: "#dcfce7" },
            { id: "documents" as Section, label: "Документы", icon: "FileText", color: "#fef3c7" },
            { id: "contacts" as Section, label: "Контакты", icon: "Phone", color: "#fce7f3" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => navigate(item.id)}
              className="card-hover rounded-2xl p-6 text-center bg-white shadow-sm border border-gray-100"
            >
              <div
                className="w-14 h-14 rounded-xl mx-auto mb-3 flex items-center justify-center"
                style={{ background: item.color }}
              >
                <Icon name={item.icon} size={26} style={{ color: "var(--gov-blue)" }} />
              </div>
              <div className="font-semibold text-gray-800 text-base">{item.label}</div>
            </button>
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="section-title mb-0">Объявления</h2>
          <button
            onClick={() => navigate("announcements")}
            className="text-sm font-medium flex items-center gap-1 hover:underline"
            style={{ color: "var(--gov-blue)" }}
          >
            Все объявления <Icon name="ArrowRight" size={14} />
          </button>
        </div>
        <div className="space-y-3">
          {ANNOUNCEMENTS.slice(0, 2).map((a, i) => (
            <div
              key={i}
              className={`rounded-xl p-4 border-l-4 bg-white shadow-sm ${a.urgent ? "border-red-500" : "border-blue-300"}`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  {a.urgent && (
                    <span className="inline-block bg-red-100 text-red-700 text-xs font-bold px-2 py-0.5 rounded mb-1">
                      Срочно
                    </span>
                  )}
                  <div className="font-semibold text-gray-900 text-base">{a.title}</div>
                  <div className="text-gray-600 text-sm mt-1">{a.text}</div>
                </div>
                <div className="text-sm text-gray-400 whitespace-nowrap">{a.date}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="section-title mb-0">Новости</h2>
          <button
            onClick={() => navigate("news")}
            className="text-sm font-medium flex items-center gap-1 hover:underline"
            style={{ color: "var(--gov-blue)" }}
          >
            Все новости <Icon name="ArrowRight" size={14} />
          </button>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {NEWS.slice(0, 2).map((n, i) => (
            <div key={i} className="card-hover bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs bg-blue-100 text-blue-700 font-semibold px-2 py-0.5 rounded">
                  {n.tag}
                </span>
                <span className="text-xs text-gray-400">{n.date}</span>
              </div>
              <div className="font-semibold text-gray-900 text-base mb-2">{n.title}</div>
              <div className="text-gray-600 text-sm line-clamp-2">{n.text}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function AboutSection() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="section-title text-4xl">Об учреждении</h1>
        <div className="w-16 h-1 rounded mt-2" style={{ background: "var(--gov-blue)" }}></div>
      </div>
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
        <p className="text-gray-700 text-lg leading-relaxed mb-4">
          Государственное учреждение осуществляет свою деятельность в соответствии с действующим законодательством Российской Федерации и нормативными правовыми актами. Мы оказываем государственные услуги гражданам и организациям в сфере нашей деятельности.
        </p>
        <p className="text-gray-700 text-lg leading-relaxed">
          Учреждение создано в 1992 году и за это время накопило значительный опыт работы с обращениями граждан, обеспечения социальной поддержки и предоставления государственных услуг.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {[
          { num: "30+", label: "лет работы", icon: "Calendar" },
          { num: "15 000+", label: "граждан в год", icon: "Users" },
          { num: "6", label: "видов услуг", icon: "ClipboardList" },
        ].map((s, i) => (
          <div key={i} className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100">
            <Icon name={s.icon} size={36} className="mx-auto mb-3" style={{ color: "var(--gov-blue)" }} />
            <div className="text-4xl font-black mb-1" style={{ color: "var(--gov-blue)" }}>{s.num}</div>
            <div className="text-gray-600 font-medium text-lg">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--gov-blue)" }}>Режим работы</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            { day: "Понедельник", time: "09:00 – 18:00" },
            { day: "Вторник", time: "09:00 – 18:00" },
            { day: "Среда", time: "09:00 – 18:00" },
            { day: "Четверг", time: "09:00 – 18:00" },
            { day: "Пятница", time: "09:00 – 17:00" },
            { day: "Суббота – Воскресенье", time: "Выходной" },
          ].map((r, i) => (
            <div key={i} className={`flex justify-between items-center p-3 rounded-xl ${r.time === "Выходной" ? "bg-gray-50 text-gray-400" : "bg-blue-50"}`}>
              <span className="font-medium">{r.day}</span>
              <span className={`font-semibold ${r.time === "Выходной" ? "" : "text-blue-800"}`}>{r.time}</span>
            </div>
          ))}
        </div>
        <p className="text-gray-500 text-sm mt-3">Обед: 13:00 – 14:00</p>
      </div>
    </div>
  );
}

function ServicesSection() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="section-title text-4xl">Услуги</h1>
        <div className="w-16 h-1 rounded mt-2" style={{ background: "var(--gov-blue)" }}></div>
        <p className="text-gray-600 text-lg mt-3">Перечень государственных и муниципальных услуг, предоставляемых учреждением</p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SERVICES.map((s, i) => (
          <div key={i} className="card-hover bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div
              className="w-14 h-14 rounded-xl mb-4 flex items-center justify-center"
              style={{ background: "var(--gov-blue-pale)" }}
            >
              <Icon name={s.icon} size={26} style={{ color: "var(--gov-blue)" }} />
            </div>
            <h3 className="font-bold text-xl mb-2 text-gray-900">{s.title}</h3>
            <p className="text-gray-600 leading-relaxed">{s.desc}</p>
            <button
              className="mt-4 text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all"
              style={{ color: "var(--gov-blue)" }}
            >
              Подробнее <Icon name="ArrowRight" size={14} />
            </button>
          </div>
        ))}
      </div>
      <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200">
        <div className="flex items-start gap-4">
          <Icon name="Info" size={24} style={{ color: "var(--gov-blue)" }} className="flex-shrink-0 mt-1" />
          <div>
            <div className="font-bold text-lg mb-1" style={{ color: "var(--gov-blue)" }}>Предварительная запись</div>
            <p className="text-gray-700">Для получения большинства услуг рекомендуем записаться заранее. Обратитесь по телефону <strong>+7 (495) 000-00-00</strong> или лично.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function SpecialistsSection() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="section-title text-4xl">Специалисты</h1>
        <div className="w-16 h-1 rounded mt-2" style={{ background: "var(--gov-blue)" }}></div>
        <p className="text-gray-600 text-lg mt-3">Расписание работы и график приёма граждан</p>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold mb-4" style={{ color: "var(--gov-blue)" }}>
          <Icon name="CalendarDays" size={20} className="inline mr-2" />
          Общий график приёма граждан
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-blue-100">
                {["Специалист", "Пн", "Вт", "Ср", "Чт", "Пт"].map((h) => (
                  <th key={h} className="text-left py-3 px-3 font-semibold text-gray-700">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100 hover:bg-blue-50/50">
                <td className="py-3 px-3 font-medium">Иванова С.П.</td>
                <td className="py-3 px-3 text-center"><span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-medium">09–13</span></td>
                <td className="py-3 px-3 text-center"><span className="bg-amber-100 text-amber-700 px-2 py-0.5 rounded text-xs font-medium">приём</span></td>
                <td className="py-3 px-3 text-center"><span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-medium">14–18</span></td>
                <td className="py-3 px-3 text-center"><span className="bg-amber-100 text-amber-700 px-2 py-0.5 rounded text-xs font-medium">приём</span></td>
                <td className="py-3 px-3 text-center"><span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-medium">09–12</span></td>
              </tr>
              <tr className="border-b border-gray-100 hover:bg-blue-50/50">
                <td className="py-3 px-3 font-medium">Петров А.Н.</td>
                <td className="py-3 px-3 text-center"><span className="bg-amber-100 text-amber-700 px-2 py-0.5 rounded text-xs font-medium">приём</span></td>
                <td className="py-3 px-3 text-center"><span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-medium">09–13</span></td>
                <td className="py-3 px-3 text-center"><span className="bg-amber-100 text-amber-700 px-2 py-0.5 rounded text-xs font-medium">приём</span></td>
                <td className="py-3 px-3 text-center"><span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-medium">14–18</span></td>
                <td className="py-3 px-3 text-center text-gray-300">—</td>
              </tr>
              <tr className="border-b border-gray-100 hover:bg-blue-50/50">
                <td className="py-3 px-3 font-medium">Сидорова М.Ю.</td>
                <td className="py-3 px-3 text-center"><span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-medium">10–14</span></td>
                <td className="py-3 px-3 text-center"><span className="bg-amber-100 text-amber-700 px-2 py-0.5 rounded text-xs font-medium">приём</span></td>
                <td className="py-3 px-3 text-center"><span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-medium">09–13</span></td>
                <td className="py-3 px-3 text-center text-gray-300">—</td>
                <td className="py-3 px-3 text-center"><span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-medium">14–17</span></td>
              </tr>
              <tr className="hover:bg-blue-50/50">
                <td className="py-3 px-3 font-medium">Козлов Д.В.</td>
                <td className="py-3 px-3 text-center text-gray-300">—</td>
                <td className="py-3 px-3 text-center"><span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-medium">10–14</span></td>
                <td className="py-3 px-3 text-center text-gray-300">—</td>
                <td className="py-3 px-3 text-center"><span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-medium">09–13</span></td>
                <td className="py-3 px-3 text-center text-gray-300">—</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="flex flex-wrap gap-4 mt-4 text-sm">
          <span className="flex items-center gap-2"><span className="w-4 h-4 bg-green-100 border border-green-300 rounded inline-block"></span> Рабочие часы</span>
          <span className="flex items-center gap-2"><span className="w-4 h-4 bg-amber-100 border border-amber-300 rounded inline-block"></span> Приём граждан</span>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {SPECIALISTS.map((sp, i) => (
          <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-start gap-4 mb-4">
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 text-white text-xl font-bold"
                style={{ background: "var(--gov-blue)" }}
              >
                {sp.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
              </div>
              <div>
                <div className="font-bold text-xl text-gray-900">{sp.name}</div>
                <div className="text-gray-500 font-medium">{sp.role}</div>
                <div className="text-sm font-medium mt-0.5" style={{ color: "var(--gov-blue-light)" }}>{sp.room}</div>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Расписание работы</div>
              {sp.schedule.map((s, j) => (
                <div key={j} className="flex justify-between text-base bg-gray-50 rounded-lg px-3 py-2">
                  <span className="text-gray-700">{s.day}</span>
                  <span className="font-semibold text-gray-900">{s.time}</span>
                </div>
              ))}
            </div>

            <div className="bg-amber-50 rounded-xl px-4 py-3 mb-3">
              <div className="text-sm font-semibold text-amber-800 mb-1 flex items-center gap-1">
                <Icon name="UserCheck" size={14} /> Приём граждан
              </div>
              <div className="text-amber-900 font-medium">{sp.reception}</div>
            </div>

            <div className="flex items-center gap-2 text-gray-600">
              <Icon name="Phone" size={16} style={{ color: "var(--gov-blue)" }} />
              <span className="font-medium">{sp.phone}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DocumentsSection() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="section-title text-4xl">Документы</h1>
        <div className="w-16 h-1 rounded mt-2" style={{ background: "var(--gov-blue)" }}></div>
        <p className="text-gray-600 text-lg mt-3">Нормативные и регламентирующие документы учреждения</p>
      </div>
      <div className="space-y-3">
        {DOCUMENTS.map((d, i) => (
          <div key={i} className="card-hover bg-white rounded-2xl px-6 py-4 shadow-sm border border-gray-100 flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center flex-shrink-0">
                <Icon name="FileText" size={22} className="text-red-500" />
              </div>
              <div>
                <div className="font-semibold text-gray-900 text-base">{d.title}</div>
                <div className="text-sm text-gray-500 mt-0.5">Опубликовано: {d.date} · {d.size}</div>
              </div>
            </div>
            <button
              className="flex-shrink-0 flex items-center gap-2 font-semibold px-4 py-2 rounded-xl transition-all hover:shadow text-white text-sm"
              style={{ background: "var(--gov-blue)" }}
            >
              <Icon name="Download" size={14} />
              Скачать
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function NewsSection() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="section-title text-4xl">Новости</h1>
        <div className="w-16 h-1 rounded mt-2" style={{ background: "var(--gov-blue)" }}></div>
      </div>
      <div className="space-y-6">
        {NEWS.map((n, i) => (
          <div key={i} className="card-hover bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-3">
              <span className="bg-blue-100 text-blue-700 text-sm font-semibold px-3 py-1 rounded-full">{n.tag}</span>
              <span className="text-gray-500 text-sm">{n.date}</span>
            </div>
            <h3 className="font-bold text-xl text-gray-900 mb-2">{n.title}</h3>
            <p className="text-gray-600 text-base leading-relaxed">{n.text}</p>
            <button
              className="mt-4 font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all"
              style={{ color: "var(--gov-blue)" }}
            >
              Читать полностью <Icon name="ArrowRight" size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function AnnouncementsSection() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="section-title text-4xl">Объявления</h1>
        <div className="w-16 h-1 rounded mt-2" style={{ background: "var(--gov-blue)" }}></div>
      </div>
      <div className="space-y-4">
        {ANNOUNCEMENTS.map((a, i) => (
          <div
            key={i}
            className={`bg-white rounded-2xl p-6 shadow-sm border-l-4 ${a.urgent ? "border-red-500" : "border-blue-300"}`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  {a.urgent && (
                    <span className="bg-red-100 text-red-700 text-sm font-bold px-3 py-0.5 rounded-full flex items-center gap-1">
                      <Icon name="AlertCircle" size={12} /> Срочно
                    </span>
                  )}
                </div>
                <h3 className="font-bold text-xl text-gray-900 mb-2">{a.title}</h3>
                <p className="text-gray-600 text-base leading-relaxed">{a.text}</p>
              </div>
              <div className="text-sm text-gray-400 whitespace-nowrap font-medium">{a.date}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ContactsSection() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="section-title text-4xl">Контакты</h1>
        <div className="w-16 h-1 rounded mt-2" style={{ background: "var(--gov-blue)" }}></div>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          {[
            { icon: "MapPin", label: "Адрес", value: "г. Москва, ул. Примерная, д. 1", sub: "Ближайшее метро: Центральная" },
            { icon: "Phone", label: "Телефон приёмной", value: "+7 (495) 000-00-00", sub: "Пн–Пт с 09:00 до 18:00" },
            { icon: "Mail", label: "Электронная почта", value: "info@example.gov.ru", sub: "Ответ в течение 3 рабочих дней" },
            { icon: "Printer", label: "Факс", value: "+7 (495) 000-00-99", sub: "" },
          ].map((c, i) => (
            <div key={i} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex items-start gap-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: "var(--gov-blue-pale)" }}
              >
                <Icon name={c.icon} size={22} style={{ color: "var(--gov-blue)" }} />
              </div>
              <div>
                <div className="text-sm text-gray-500 font-medium mb-0.5">{c.label}</div>
                <div className="font-bold text-lg text-gray-900">{c.value}</div>
                {c.sub && <div className="text-sm text-gray-500 mt-0.5">{c.sub}</div>}
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold mb-4" style={{ color: "var(--gov-blue)" }}>Руководство</h2>
            {[
              { name: "Смирнов Николай Иванович", role: "Директор", phone: "+7 (495) 000-00-10" },
              { name: "Орлова Татьяна Сергеевна", role: "Заместитель директора", phone: "+7 (495) 000-00-11" },
            ].map((r, i) => (
              <div key={i} className={`py-4 ${i > 0 ? "border-t border-gray-100" : ""}`}>
                <div className="font-bold text-gray-900">{r.name}</div>
                <div className="text-gray-500 text-sm mb-1">{r.role}</div>
                <div className="flex items-center gap-2 text-sm" style={{ color: "var(--gov-blue)" }}>
                  <Icon name="Phone" size={14} />
                  <span className="font-semibold">{r.phone}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200">
            <h2 className="text-xl font-bold mb-3" style={{ color: "var(--gov-blue)" }}>
              <Icon name="MessageSquarePlus" size={18} className="inline mr-2" />
              Обращения граждан
            </h2>
            <p className="text-gray-700 mb-4">Направьте письменное обращение или запишитесь на личный приём к руководству.</p>
            <button
              className="w-full py-3 rounded-xl font-semibold text-white transition-all hover:shadow-md hover:opacity-90"
              style={{ background: "var(--gov-blue)" }}
            >
              Написать обращение
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}