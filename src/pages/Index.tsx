import { useState } from "react";
import Icon from "@/components/ui/icon";

type Section =
  | "home"
  | "about"
  | "services"
  | "paid"
  | "documents"
  | "news"
  | "contacts"
  | "specialists"
  | "announcements";

const NAV_ITEMS: { id: Section; label: string; icon: string }[] = [
  { id: "home", label: "Главная", icon: "House" },
  { id: "about", label: "Об учреждении", icon: "Building2" },
  { id: "services", label: "Услуги", icon: "ClipboardList" },
  { id: "paid", label: "Платные услуги", icon: "CreditCard" },
  { id: "specialists", label: "Специалисты", icon: "Users" },
  { id: "documents", label: "Документы", icon: "FileText" },
  { id: "news", label: "Новости", icon: "Newspaper" },
  { id: "announcements", label: "Объявления", icon: "Megaphone" },
  { id: "contacts", label: "Контакты", icon: "Phone" },
];

const SPECIALISTS = [
  {
    name: "Иванова Светлана Петровна",
    role: "Врач-терапевт участковый",
    room: "Каб. 101",
    schedule: [
      { day: "Понедельник", time: "09:00 – 13:00" },
      { day: "Среда", time: "14:00 – 18:00" },
      { day: "Пятница", time: "09:00 – 12:00" },
    ],
    reception: "Вторник, Четверг: 10:00 – 12:00",
    phone: "+7 (495) 000-00-01",
    consentGiven: true,
    education: {
      level: "Высшее",
      institution: "Первый Московский государственный медицинский университет им. И.М. Сеченова",
      year: "2005",
      specialty: "Лечебное дело",
      qualification: "Врач",
    },
    certification: {
      institution: "ФГБОУ ДПО РМАНПО Минздрава России",
      year: "2022",
      specialty: "Терапия",
    },
    category: "Высшая квалификационная категория",
  },
  {
    name: "Петров Алексей Николаевич",
    role: "Врач-хирург",
    room: "Каб. 205",
    schedule: [
      { day: "Вторник", time: "09:00 – 13:00" },
      { day: "Четверг", time: "14:00 – 18:00" },
    ],
    reception: "Понедельник, Среда: 11:00 – 13:00",
    phone: "+7 (495) 000-00-02",
    consentGiven: true,
    education: {
      level: "Высшее",
      institution: "Российский национальный исследовательский медицинский университет им. Н.И. Пирогова",
      year: "2008",
      specialty: "Лечебное дело",
      qualification: "Врач",
    },
    certification: {
      institution: "ФГБОУ ДПО РМАНПО Минздрава России",
      year: "2023",
      specialty: "Хирургия",
    },
    category: "Первая квалификационная категория",
  },
  {
    name: "Сидорова Мария Юрьевна",
    role: "Врач-педиатр участковый",
    room: "Каб. 312",
    schedule: [
      { day: "Понедельник", time: "10:00 – 14:00" },
      { day: "Среда", time: "09:00 – 13:00" },
      { day: "Пятница", time: "14:00 – 17:00" },
    ],
    reception: "Вторник: 09:00 – 11:00, Пятница: 15:00 – 17:00",
    phone: "+7 (495) 000-00-03",
    consentGiven: true,
    education: {
      level: "Высшее",
      institution: "Московский государственный медико-стоматологический университет им. А.И. Евдокимова",
      year: "2010",
      specialty: "Педиатрия",
      qualification: "Врач-педиатр",
    },
    certification: {
      institution: "ФГАОУ ВО Первый МГМУ им. И.М. Сеченова Минздрава России",
      year: "2022",
      specialty: "Педиатрия",
    },
    category: "Вторая квалификационная категория",
  },
  {
    name: "Козлов Дмитрий Владимирович",
    role: "Врач-невролог",
    room: "Каб. 118",
    schedule: [
      { day: "Вторник", time: "10:00 – 14:00" },
      { day: "Четверг", time: "09:00 – 13:00" },
    ],
    reception: "По предварительной записи",
    phone: "+7 (495) 000-00-04",
    consentGiven: false,
    education: null,
    certification: null,
    category: null,
  },
];

const PAID_CATEGORIES = [
  {
    id: "therapy",
    name: "Терапия",
    icon: "Stethoscope",
    services: [
      { name: "Приём врача-терапевта (первичный)", code: "B01.047.001", price: 1200 },
      { name: "Приём врача-терапевта (повторный)", code: "B01.047.002", price: 900 },
      { name: "Приём врача-терапевта на дому", code: "B01.047.003", price: 2500 },
      { name: "Оформление медицинской документации", code: "B01.047.010", price: 500 },
      { name: "Выдача справки для водительского удостоверения", code: "B04.047.001", price: 800 },
    ],
  },
  {
    id: "surgery",
    name: "Хирургия",
    icon: "Scissors",
    services: [
      { name: "Приём врача-хирурга (первичный)", code: "B01.058.001", price: 1400 },
      { name: "Приём врача-хирурга (повторный)", code: "B01.058.002", price: 1100 },
      { name: "Удаление поверхностных новообразований", code: "A16.01.018", price: 3500 },
      { name: "Перевязка послеоперационной раны", code: "A11.01.011", price: 700 },
    ],
  },
  {
    id: "neurology",
    name: "Неврология",
    icon: "Brain",
    services: [
      { name: "Приём врача-невролога (первичный)", code: "B01.023.001", price: 1500 },
      { name: "Приём врача-невролога (повторный)", code: "B01.023.002", price: 1200 },
      { name: "Приём врача-невролога на дому", code: "B01.023.003", price: 2800 },
    ],
  },
  {
    id: "diagnostics",
    name: "Диагностика",
    icon: "Activity",
    services: [
      { name: "Электрокардиография (ЭКГ)", code: "A05.10.006", price: 600 },
      { name: "Суточное мониторирование АД", code: "A04.10.002.001", price: 2200 },
      { name: "Исследование функции внешнего дыхания", code: "A05.10.001", price: 1100 },
      { name: "Общий анализ крови с лейкоформулой", code: "A09.05.003.002", price: 450 },
      { name: "Общий анализ мочи", code: "A09.28.001", price: 350 },
      { name: "Биохимический анализ крови (10 показателей)", code: "A09.05.041", price: 1800 },
    ],
  },
  {
    id: "certificates",
    name: "Справки и документы",
    icon: "FileCheck",
    services: [
      { name: "Справка для бассейна (форма 1)", code: "B04.047.002", price: 600 },
      { name: "Справка для санаторно-курортного лечения", code: "B04.047.003", price: 900 },
      { name: "Справка в учебное заведение", code: "B04.047.004", price: 500 },
      { name: "Медицинское заключение для нотариуса", code: "B04.047.005", price: 1500 },
      { name: "Выписка из медицинской карты (срочная)", code: "B04.047.006", price: 700 },
    ],
  },
];

const PAID_STAFF = [
  {
    name: "Иванова Светлана Петровна",
    role: "Врач-терапевт участковый",
    category: "Высшая квалификационная категория",
    services: ["Терапия", "Справки и документы"],
    schedule: [
      { day: "Понедельник", time: "14:00 – 18:00" },
      { day: "Среда", time: "09:00 – 13:00" },
    ],
  },
  {
    name: "Петров Алексей Николаевич",
    role: "Врач-хирург",
    category: "Первая квалификационная категория",
    services: ["Хирургия"],
    schedule: [
      { day: "Вторник", time: "14:00 – 18:00" },
      { day: "Пятница", time: "09:00 – 13:00" },
    ],
  },
  {
    name: "Козлов Дмитрий Владимирович",
    role: "Врач-невролог",
    category: null,
    services: ["Неврология"],
    schedule: [
      { day: "Среда", time: "14:00 – 18:00" },
      { day: "Пятница", time: "14:00 – 18:00" },
    ],
  },
];

const LICENSE_NUMBER = "Л041-01137-77/00000000001";

const MEDICAL_ACTIVITIES = [
  {
    direction: "Первичная медико-санитарная помощь",
    icon: "Stethoscope",
    description: "Оказание первичной врачебной медико-санитарной помощи в амбулаторных условиях взрослому и детскому населению.",
    licensed: true,
    services: [
      {
        name: "Приём врача-терапевта участкового",
        code: "A01.31.020",
        desc: "Осмотр, диагностика, лечение заболеваний внутренних органов. Направление к специалистам. Выдача листов нетрудоспособности.",
      },
      {
        name: "Приём врача-педиатра участкового",
        code: "A01.31.020.001",
        desc: "Диспансеризация и профилактические осмотры детей, наблюдение за развитием ребёнка, лечение острых и хронических заболеваний.",
      },
      {
        name: "Профилактические медицинские осмотры",
        code: "A01.31.018",
        desc: "Плановые профилактические осмотры для выявления заболеваний на ранних стадиях.",
      },
    ],
  },
  {
    direction: "Консультативно-диагностическая помощь",
    icon: "ClipboardList",
    description: "Консультации врачей-специалистов, инструментальная и лабораторная диагностика.",
    licensed: true,
    services: [
      {
        name: "Приём врача-хирурга",
        code: "A01.28.001",
        desc: "Консультация, диагностика и лечение хирургических заболеваний в амбулаторных условиях, малые хирургические вмешательства.",
      },
      {
        name: "Приём врача-невролога",
        code: "A01.23.001",
        desc: "Диагностика и лечение заболеваний нервной системы, головного и спинного мозга.",
      },
      {
        name: "Функциональная диагностика",
        code: "A05.10.006",
        desc: "ЭКГ, суточное мониторирование АД, исследование функции внешнего дыхания.",
      },
    ],
  },
  {
    direction: "Вакцинопрофилактика",
    icon: "Syringe",
    description: "Проведение профилактических прививок в соответствии с национальным календарём прививок и по эпидемическим показаниям.",
    licensed: true,
    services: [
      {
        name: "Иммунизация в рамках национального календаря",
        code: "A11.01.001",
        desc: "Вакцинация против гриппа, кори, краснухи, гепатита B, дифтерии, столбняка и других инфекций.",
      },
      {
        name: "Иммунизация по эпидемическим показаниям",
        code: "A11.01.001.001",
        desc: "Вакцинация при угрозе распространения инфекционных заболеваний.",
      },
    ],
  },
  {
    direction: "Паллиативная медицинская помощь",
    icon: "HeartHandshake",
    description: "Комплекс медицинских вмешательств, направленных на избавление от боли и облегчение тяжёлых проявлений заболеваний.",
    licensed: true,
    services: [
      {
        name: "Патронажное наблюдение на дому",
        code: "A01.31.020.002",
        desc: "Медицинское наблюдение и уход за пациентами, нуждающимися в паллиативной помощи, на дому.",
      },
    ],
  },
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

const LICENSE = {
  number: "Л041-01137-77/00000000001",
  issueDate: "15 марта 2021 года",
  issuedBy: "Департамент здравоохранения города Москвы",
  activities: [
    "Амбулаторно-поликлиническая медицинская помощь",
    "Первичная медико-санитарная помощь",
    "Диагностика и лечение заболеваний",
    "Профилактические медицинские осмотры",
    "Вакцинация и иммунопрофилактика",
  ],
  registryUrl: "https://islod.roszdravnadzor.gov.ru/licenses/",
  qrData: "https://islod.roszdravnadzor.gov.ru/licenses/Л041-01137-77/00000000001",
};

const REQUISITES = {
  fullName: "Государственное бюджетное учреждение здравоохранения «Городская поликлиника №1»",
  shortName: "ГБУЗ «Городская поликлиника №1»",
  ogrn: "1027700000001",
  inn: "7700000001",
  kpp: "770001001",
  legalAddress: "127000, г. Москва, ул. Примерная, д. 1",
  actualAddress: "127000, г. Москва, ул. Примерная, д. 1",
  phone: "+7 (495) 000-00-00",
  fax: "+7 (495) 000-00-99",
  email: "info@example.gov.ru",
  website: "www.example.gov.ru",
  head: "Смирнов Николай Иванович",
  headTitle: "Главный врач",
};

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

  const navigate = (section: Section) => {
    setActiveSection(section);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#f0f4f8] font-golos">
      {/* Top strip */}
      <div className="bg-[#1a2533] text-white text-sm py-2 px-4">
        <div className="max-w-6xl mx-auto flex flex-wrap gap-x-6 gap-y-1 justify-between items-center">
          <span className="flex items-center gap-2">
            <Icon name="Clock" size={14} />
            Пн–Пт: 09:00–18:00, обед 13:00–14:00
          </span>
          <span className="flex items-center gap-2">
            <Icon name="Phone" size={14} />
            +7 (495) 000-00-00
          </span>
        </div>
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
        {activeSection === "paid" && <PaidServicesSection />}
        {activeSection === "specialists" && <SpecialistsSection />}
        {activeSection === "documents" && <DocumentsSection />}
        {activeSection === "news" && <NewsSection />}
        {activeSection === "announcements" && <AnnouncementsSection />}
        {activeSection === "contacts" && <ContactsSection />}
      </main>

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
          {/* Реквизиты в футере */}
          <div className="border-t border-gray-700 mt-8 pt-6">
            <div className="text-xs text-gray-500 leading-relaxed space-y-1">
              <div className="font-medium text-gray-400">{REQUISITES.fullName}</div>
              <div className="flex flex-wrap gap-x-4 gap-y-0.5">
                <span>ОГРН: {REQUISITES.ogrn}</span>
                <span>ИНН: {REQUISITES.inn}</span>
                <span>КПП: {REQUISITES.kpp}</span>
              </div>
              <div>Юр. адрес: {REQUISITES.legalAddress}</div>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-4 pt-4 text-center text-sm text-gray-500">
            © 2026 {REQUISITES.shortName}. Все права защищены.
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
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="section-title text-4xl">Медицинская деятельность</h1>
        <div className="w-16 h-1 rounded mt-2" style={{ background: "var(--gov-blue)" }}></div>
        <p className="text-gray-600 text-lg mt-3">
          Информация о видах медицинской деятельности в соответствии с лицензией
        </p>
      </div>

      {/* Лицензионная плашка */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-green-50 border border-green-200 rounded-2xl px-5 py-4">
        <div className="flex items-center gap-3 flex-1">
          <Icon name="BadgeCheck" size={24} className="text-green-600 flex-shrink-0" />
          <div>
            <div className="font-bold text-green-800 text-base">Все услуги лицензированы</div>
            <div className="text-green-700 text-sm">
              Лицензия на медицинскую деятельность №{LICENSE_NUMBER}
            </div>
          </div>
        </div>
        <a
          href="https://islod.roszdravnadzor.gov.ru/licenses/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-shrink-0 flex items-center gap-1.5 text-sm font-semibold hover:underline"
          style={{ color: "var(--gov-blue)" }}
        >
          <Icon name="ExternalLink" size={13} />
          Проверить в реестре
        </a>
      </div>

      {/* Направления деятельности */}
      <div className="space-y-4">
        {MEDICAL_ACTIVITIES.map((activity, i) => (
          <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

            {/* Заголовок направления */}
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full text-left px-6 py-5 flex items-center gap-4 hover:bg-gray-50 transition-colors"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: "var(--gov-blue-pale, #e8f0fb)" }}
              >
                <Icon name={activity.icon} size={22} style={{ color: "var(--gov-blue)" }} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-lg text-gray-900">{activity.direction}</div>
                <div className="text-gray-500 text-sm mt-0.5 line-clamp-1">{activity.description}</div>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                {activity.licensed && (
                  <span className="hidden sm:flex items-center gap-1 bg-green-100 text-green-700 text-xs font-bold px-2.5 py-1 rounded-full">
                    <Icon name="CheckCircle" size={11} /> По лицензии
                  </span>
                )}
                <span className="text-xs text-gray-400 font-medium">{activity.services.length} услуг</span>
                <Icon
                  name={openIndex === i ? "ChevronUp" : "ChevronDown"}
                  size={20}
                  className="text-gray-400"
                />
              </div>
            </button>

            {/* Раскрытый список услуг */}
            {openIndex === i && (
              <div className="border-t border-gray-100 animate-fade-in">
                <div className="px-6 py-4 bg-gray-50">
                  <p className="text-gray-600 text-sm leading-relaxed">{activity.description}</p>
                </div>
                <div className="divide-y divide-gray-100">
                  {activity.services.map((svc, j) => (
                    <div key={j} className="px-6 py-4 flex items-start gap-4">
                      <div className="flex-shrink-0 mt-0.5">
                        <span className="inline-block bg-blue-50 text-blue-600 text-xs font-mono font-semibold px-2 py-0.5 rounded border border-blue-100">
                          {svc.code}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900 text-base mb-0.5">{svc.name}</div>
                        <div className="text-gray-600 text-sm leading-relaxed">{svc.desc}</div>
                      </div>
                      <div className="flex-shrink-0">
                        <Icon name="CheckCircle" size={16} className="text-green-500 mt-1" />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="px-6 py-3 bg-blue-50 border-t border-blue-100 flex items-center gap-2 text-xs text-blue-700">
                  <Icon name="Info" size={12} />
                  Услуги оказываются в рамках лицензии №{LICENSE_NUMBER}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Запись */}
      <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200">
        <div className="flex items-start gap-4">
          <Icon name="CalendarCheck" size={24} style={{ color: "var(--gov-blue)" }} className="flex-shrink-0 mt-0.5" />
          <div>
            <div className="font-bold text-lg mb-1" style={{ color: "var(--gov-blue)" }}>Предварительная запись</div>
            <p className="text-gray-700">
              Запись на приём по телефону <strong>+7 (495) 000-00-00</strong> (Пн–Пт, 08:00–20:00),
              через портал <strong>Госуслуги</strong> или регистратуру учреждения.
            </p>
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

      {/* Уведомление о согласии */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3">
        <Icon name="Info" size={18} className="text-amber-600 flex-shrink-0 mt-0.5" />
        <p className="text-amber-800 text-sm leading-relaxed">
          Сведения об образовании публикуются только при наличии <strong>письменного согласия</strong> медицинского работника
          на обработку и размещение персональных данных в соответствии с ФЗ №152-ФЗ «О персональных данных».
        </p>
      </div>

      <div className="space-y-6">
        {SPECIALISTS.map((sp, i) => (
          <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

            {/* Шапка карточки */}
            <div className="p-6 flex flex-col sm:flex-row sm:items-start gap-4">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 text-white text-2xl font-bold"
                style={{ background: "var(--gov-blue)" }}
              >
                {sp.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-xl text-gray-900">{sp.name}</div>
                <div className="font-semibold mt-0.5" style={{ color: "var(--gov-blue)" }}>{sp.role}</div>
                <div className="text-sm text-gray-500 mt-0.5">{sp.room}</div>
                {sp.category && (
                  <span className="inline-block mt-2 bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full border border-blue-100">
                    {sp.category}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 flex-shrink-0">
                <Icon name="Phone" size={15} style={{ color: "var(--gov-blue)" }} />
                <span className="font-medium">{sp.phone}</span>
              </div>
            </div>

            <div className="border-t border-gray-100 grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-100">

              {/* Расписание + приём */}
              <div className="p-5 space-y-3">
                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Icon name="CalendarDays" size={13} /> Расписание работы
                </div>
                <div className="space-y-1.5">
                  {sp.schedule.map((s, j) => (
                    <div key={j} className="flex justify-between text-sm bg-gray-50 rounded-lg px-3 py-2">
                      <span className="text-gray-700">{s.day}</span>
                      <span className="font-semibold text-gray-900">{s.time}</span>
                    </div>
                  ))}
                </div>
                <div className="bg-amber-50 rounded-xl px-3 py-2.5 mt-1">
                  <div className="text-xs font-semibold text-amber-700 mb-0.5 flex items-center gap-1">
                    <Icon name="UserCheck" size={12} /> Приём граждан
                  </div>
                  <div className="text-amber-900 text-sm font-medium">{sp.reception}</div>
                </div>
              </div>

              {/* Сведения об образовании */}
              <div className="p-5">
                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-1.5 mb-3">
                  <Icon name="GraduationCap" size={13} /> Сведения об образовании
                </div>
                {sp.consentGiven && sp.education ? (
                  <div className="space-y-2.5">
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                      <div>
                        <div className="text-xs text-gray-400 mb-0.5">Уровень образования</div>
                        <div className="font-semibold text-gray-800">{sp.education.level}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-400 mb-0.5">Год выдачи</div>
                        <div className="font-semibold text-gray-800">{sp.education.year}</div>
                      </div>
                      <div className="col-span-2">
                        <div className="text-xs text-gray-400 mb-0.5">Организация</div>
                        <div className="font-semibold text-gray-800 text-sm leading-tight">{sp.education.institution}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-400 mb-0.5">Специальность</div>
                        <div className="font-semibold text-gray-800">{sp.education.specialty}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-400 mb-0.5">Квалификация</div>
                        <div className="font-semibold text-gray-800">{sp.education.qualification}</div>
                      </div>
                    </div>
                    {sp.certification && (
                      <div className="bg-green-50 rounded-xl px-3 py-2.5 border border-green-100">
                        <div className="text-xs font-semibold text-green-700 mb-1.5 flex items-center gap-1">
                          <Icon name="Award" size={12} /> Повышение квалификации
                        </div>
                        <div className="text-sm text-gray-700 leading-snug">
                          <span className="font-medium">{sp.certification.specialty}</span>
                          <span className="text-gray-500 mx-1">·</span>
                          {sp.certification.year} г.
                          <div className="text-xs text-gray-500 mt-0.5">{sp.certification.institution}</div>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex items-start gap-2.5 bg-gray-50 rounded-xl px-4 py-3">
                    <Icon name="Lock" size={15} className="text-gray-400 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-gray-500 leading-relaxed">
                      Сведения не публикуются — письменное согласие работника не получено
                    </p>
                  </div>
                )}
              </div>
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

      {/* Лицензия на медицинскую деятельность */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-3" style={{ background: "#f0fdf4" }}>
          <Icon name="BadgeCheck" size={22} className="text-green-600 flex-shrink-0" />
          <div>
            <h2 className="font-bold text-lg text-green-800">Лицензия на медицинскую деятельность</h2>
            <p className="text-green-700 text-xs mt-0.5">В соответствии с Постановлением Правительства РФ №408 от 01.06.2021</p>
          </div>
          <span className="ml-auto flex-shrink-0 bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
            <Icon name="CheckCircle" size={12} /> Действующая
          </span>
        </div>

        <div className="p-6 grid md:grid-cols-3 gap-6">
          {/* Основные данные */}
          <div className="md:col-span-2 space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-xl px-4 py-3">
                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Регистрационный номер</div>
                <div className="font-bold text-gray-900 text-base tracking-wide">{LICENSE.number}</div>
              </div>
              <div className="bg-gray-50 rounded-xl px-4 py-3">
                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Дата предоставления</div>
                <div className="font-bold text-gray-900 text-base">{LICENSE.issueDate}</div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl px-4 py-3">
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Лицензирующий орган</div>
              <div className="font-semibold text-gray-900">{LICENSE.issuedBy}</div>
            </div>

            <div>
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Лицензируемые виды деятельности</div>
              <ul className="space-y-1.5">
                {LICENSE.activities.map((a, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                    <Icon name="CheckCircle" size={15} className="text-green-500 flex-shrink-0 mt-0.5" />
                    {a}
                  </li>
                ))}
              </ul>
            </div>

            {/* Ссылка на реестр */}
            <div className="bg-blue-50 rounded-xl px-4 py-3 border border-blue-100">
              <div className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1 flex items-center gap-1">
                <Icon name="Info" size={12} /> Проверка в реестре лицензий
              </div>
              <p className="text-sm text-gray-700 mb-2">
                Выписка из реестра лицензий Росздравнадзора с УКЭП лицензирующего органа — по QR-коду или ссылке:
              </p>
              <a
                href={LICENSE.registryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold hover:underline"
                style={{ color: "var(--gov-blue)" }}
              >
                <Icon name="ExternalLink" size={14} />
                islod.roszdravnadzor.gov.ru
              </a>
            </div>
          </div>

          {/* QR-код */}
          <div className="flex flex-col items-center justify-start gap-3">
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider self-start">QR-код выписки из реестра</div>
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-4 flex flex-col items-center gap-3 w-full">
              {/* QR-код: визуальная имитация (в реальности — загружаемый файл от Росздравнадзора) */}
              <div className="w-40 h-40 bg-gray-50 rounded-xl border border-gray-200 flex flex-col items-center justify-center gap-2 relative overflow-hidden">
                <div className="grid grid-cols-7 gap-0.5 opacity-60">
                  {Array.from({ length: 49 }).map((_, i) => (
                    <div
                      key={i}
                      className="w-4 h-4 rounded-sm"
                      style={{
                        background: [0,1,2,7,8,14,42,43,44,45,46,48,6,13,35,36,41].includes(i)
                          ? "#1a2533"
                          : Math.random() > 0.55 ? "#1a2533" : "transparent"
                      }}
                    />
                  ))}
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white rounded-lg p-1">
                    <Icon name="QrCode" size={28} className="text-gray-700" />
                  </div>
                </div>
              </div>
              <p className="text-xs text-gray-500 text-center leading-tight">
                Двухмерный штриховой код выписки из реестра лицензий с УКЭП
              </p>
              <a
                href={LICENSE.registryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center text-xs font-semibold py-2 rounded-lg text-white transition-all hover:opacity-90"
                style={{ background: "var(--gov-blue)" }}
              >
                Открыть выписку
              </a>
            </div>
            <p className="text-xs text-gray-400 text-center leading-relaxed">
              Простой скан лицензии не допускается согласно требованиям законодательства
            </p>
          </div>
        </div>
      </div>

      {/* Остальные документы */}
      <div>
        <h2 className="text-xl font-bold mb-4" style={{ color: "var(--gov-blue)" }}>Прочие документы</h2>
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
    </div>
  );
}

function PaidServicesSection() {
  const [activeTab, setActiveTab] = useState<string>(PAID_CATEGORIES[0].id);
  const activeCategory = PAID_CATEGORIES.find((c) => c.id === activeTab)!;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="section-title text-4xl">Платные услуги</h1>
        <div className="w-16 h-1 rounded mt-2" style={{ background: "var(--gov-blue)" }}></div>
        <p className="text-gray-600 text-lg mt-3">
          Перечень платных медицинских услуг, прайс-лист и порядок оплаты
        </p>
      </div>

      {/* Правовая основа */}
      <div className="bg-blue-50 border border-blue-200 rounded-2xl px-5 py-4 flex items-start gap-3">
        <Icon name="Scale" size={18} className="text-blue-600 flex-shrink-0 mt-0.5" />
        <p className="text-blue-800 text-sm leading-relaxed">
          Платные медицинские услуги предоставляются в соответствии с{" "}
          <strong>Постановлением Правительства РФ №1006 от 04.10.2012</strong>{" "}
          «Об утверждении Правил предоставления медицинскими организациями платных медицинских услуг».
          Услуги ОМС предоставляются <strong>бесплатно</strong> при наличии полиса ОМС.
        </p>
      </div>

      {/* Прайс-лист — вкладки по категориям */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Icon name="Receipt" size={18} style={{ color: "var(--gov-blue)" }} />
            <h2 className="font-bold text-lg" style={{ color: "var(--gov-blue)" }}>Прайс-лист</h2>
          </div>
          <span className="text-xs text-gray-400">Актуально с 01.01.2026</span>
        </div>

        {/* Табы */}
        <div className="flex overflow-x-auto border-b border-gray-100 bg-gray-50">
          {PAID_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`flex items-center gap-2 px-5 py-3 text-sm font-semibold whitespace-nowrap transition-colors border-b-2 -mb-px ${
                activeTab === cat.id
                  ? "border-blue-600 text-blue-700 bg-white"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              <Icon name={cat.icon} size={14} />
              {cat.name}
            </button>
          ))}
        </div>

        {/* Таблица */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="text-left py-3 px-5 text-xs font-semibold text-gray-500 uppercase tracking-wider w-24">Код</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Наименование услуги</th>
                <th className="text-right py-3 px-5 text-xs font-semibold text-gray-500 uppercase tracking-wider w-36">Цена, руб.</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {activeCategory.services.map((svc, i) => (
                <tr key={i} className="hover:bg-blue-50/40 transition-colors">
                  <td className="py-3.5 px-5">
                    <span className="font-mono text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded">{svc.code}</span>
                  </td>
                  <td className="py-3.5 px-4 text-gray-900 font-medium">{svc.name}</td>
                  <td className="py-3.5 px-5 text-right">
                    <span className="font-bold text-gray-900 text-base">{svc.price.toLocaleString("ru-RU")}</span>
                    <span className="text-gray-400 text-sm ml-1">₽</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-5 py-3 bg-gray-50 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs text-gray-500">Цены указаны за одну услугу, включая НДС. Окончательная стоимость определяется на приёме.</p>
          <button
            className="flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-lg text-white transition-all hover:opacity-90"
            style={{ background: "var(--gov-blue)" }}
          >
            <Icon name="Download" size={13} />
            Скачать полный прайс (PDF)
          </button>
        </div>
      </div>

      {/* Порядок предоставления и оплата */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2" style={{ background: "var(--gov-blue-pale, #e8f0fb)" }}>
            <Icon name="ListOrdered" size={18} style={{ color: "var(--gov-blue)" }} />
            <h2 className="font-bold text-base" style={{ color: "var(--gov-blue)" }}>Порядок предоставления услуг</h2>
          </div>
          <div className="p-5 space-y-3">
            {[
              { n: "1", text: "Обратитесь в регистратуру или позвоните по тел. +7 (495) 000-00-00 для записи на приём" },
              { n: "2", text: "Заключите договор на оказание платных медицинских услуг (оформляется на месте)" },
              { n: "3", text: "Произведите оплату в кассе учреждения или безналичным способом до приёма" },
              { n: "4", text: "Получите квитанцию/чек и пройдите на приём к врачу в назначенное время" },
              { n: "5", text: "По завершении приёма вам выдадут медицинские документы и заключение" },
            ].map((step) => (
              <div key={step.n} className="flex items-start gap-3">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-white text-sm font-bold"
                  style={{ background: "var(--gov-blue)" }}
                >
                  {step.n}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed pt-0.5">{step.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2" style={{ background: "var(--gov-blue-pale, #e8f0fb)" }}>
            <Icon name="CreditCard" size={18} style={{ color: "var(--gov-blue)" }} />
            <h2 className="font-bold text-base" style={{ color: "var(--gov-blue)" }}>Способы оплаты</h2>
          </div>
          <div className="p-5 space-y-3">
            {[
              { icon: "Banknote", label: "Наличные", desc: "Касса учреждения, Пн–Пт 08:30–19:30" },
              { icon: "CreditCard", label: "Банковская карта", desc: "Visa, Mastercard, МИР — терминал на кассе" },
              { icon: "Smartphone", label: "СБП (Система быстрых платежей)", desc: "Оплата по QR-коду с любого банка" },
              { icon: "Globe", label: "Онлайн через Госуслуги", desc: "В разделе «Запись к врачу» на gosuslugi.ru" },
            ].map((m, i) => (
              <div key={i} className="flex items-start gap-3 py-2 border-b border-gray-100 last:border-0">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "var(--gov-blue-pale, #e8f0fb)" }}>
                  <Icon name={m.icon} size={16} style={{ color: "var(--gov-blue)" }} />
                </div>
                <div>
                  <div className="font-semibold text-gray-900 text-sm">{m.label}</div>
                  <div className="text-gray-500 text-xs mt-0.5">{m.desc}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="mx-5 mb-5 bg-amber-50 rounded-xl px-4 py-3 border border-amber-100">
            <p className="text-xs text-amber-800 leading-relaxed">
              <strong>Внимание:</strong> оплата принимается строго до начала оказания услуги.
              Возврат средств — в соответствии со ст. 782 ГК РФ и Законом о защите прав потребителей.
            </p>
          </div>
        </div>
      </div>

      {/* Сотрудники, участвующие в платных услугах */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2" style={{ background: "var(--gov-blue-pale, #e8f0fb)" }}>
          <Icon name="Users" size={18} style={{ color: "var(--gov-blue)" }} />
          <h2 className="font-bold text-base" style={{ color: "var(--gov-blue)" }}>Сотрудники, оказывающие платные услуги</h2>
        </div>
        <div className="divide-y divide-gray-100">
          {PAID_STAFF.map((s, i) => (
            <div key={i} className="px-6 py-5 flex flex-col sm:flex-row sm:items-start gap-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 text-white font-bold text-base"
                style={{ background: "var(--gov-blue)" }}
              >
                {s.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-gray-900">{s.name}</div>
                <div className="text-sm font-medium mt-0.5" style={{ color: "var(--gov-blue)" }}>{s.role}</div>
                {s.category && (
                  <div className="text-xs text-gray-500 mt-0.5">{s.category}</div>
                )}
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {s.services.map((sv, j) => (
                    <span key={j} className="bg-blue-50 text-blue-700 text-xs font-medium px-2.5 py-0.5 rounded-full border border-blue-100">
                      {sv}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex-shrink-0 space-y-1.5 min-w-[180px]">
                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">График платного приёма</div>
                {s.schedule.map((sch, j) => (
                  <div key={j} className="flex justify-between text-sm bg-gray-50 rounded-lg px-3 py-1.5">
                    <span className="text-gray-600">{sch.day}</span>
                    <span className="font-semibold text-gray-900 ml-4">{sch.time}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Контакты записи */}
      <div className="bg-green-50 border border-green-200 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <Icon name="Phone" size={22} className="text-green-600 flex-shrink-0" />
        <div className="flex-1">
          <div className="font-bold text-green-800 text-base">Запись на платный приём</div>
          <div className="text-green-700 text-sm mt-0.5">По телефону +7 (495) 000-00-00, Пн–Пт с 08:00 до 20:00</div>
        </div>
        <a
          href="tel:74950000000"
          className="flex-shrink-0 flex items-center gap-2 font-bold px-5 py-2.5 rounded-xl text-white transition-all hover:opacity-90"
          style={{ background: "#16a34a" }}
        >
          <Icon name="PhoneCall" size={15} />
          Позвонить
        </a>
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

      {/* Реквизиты */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-3" style={{ background: "var(--gov-blue-pale, #e8f0fb)" }}>
          <Icon name="Landmark" size={20} style={{ color: "var(--gov-blue)" }} />
          <h2 className="font-bold text-lg" style={{ color: "var(--gov-blue)" }}>Реквизиты юридического лица</h2>
        </div>
        <div className="p-6">
          {/* Полное наименование */}
          <div className="mb-5 pb-5 border-b border-gray-100">
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Полное наименование</div>
            <div className="text-gray-900 font-semibold text-base leading-relaxed">{REQUISITES.fullName}</div>
            <div className="text-gray-500 text-sm mt-0.5">Краткое: {REQUISITES.shortName}</div>
          </div>

          {/* ОГРН / ИНН / КПП */}
          <div className="grid sm:grid-cols-3 gap-4 mb-5 pb-5 border-b border-gray-100">
            {[
              { label: "ОГРН", value: REQUISITES.ogrn },
              { label: "ИНН", value: REQUISITES.inn },
              { label: "КПП", value: REQUISITES.kpp },
            ].map((r) => (
              <div key={r.label} className="bg-gray-50 rounded-xl px-4 py-3">
                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">{r.label}</div>
                <div className="font-bold text-gray-900 text-lg tracking-wide">{r.value}</div>
              </div>
            ))}
          </div>

          {/* Адреса */}
          <div className="grid sm:grid-cols-2 gap-4 mb-5 pb-5 border-b border-gray-100">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: "var(--gov-blue-pale, #e8f0fb)" }}>
                <Icon name="MapPin" size={16} style={{ color: "var(--gov-blue)" }} />
              </div>
              <div>
                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-0.5">Юридический адрес</div>
                <div className="text-gray-900 font-medium">{REQUISITES.legalAddress}</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: "var(--gov-blue-pale, #e8f0fb)" }}>
                <Icon name="Building" size={16} style={{ color: "var(--gov-blue)" }} />
              </div>
              <div>
                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-0.5">Фактический адрес</div>
                <div className="text-gray-900 font-medium">{REQUISITES.actualAddress}</div>
              </div>
            </div>
          </div>

          {/* Контактные данные */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: "Phone", label: "Телефон", value: REQUISITES.phone },
              { icon: "Printer", label: "Факс", value: REQUISITES.fax },
              { icon: "Mail", label: "Эл. почта", value: REQUISITES.email },
              { icon: "Globe", label: "Сайт", value: REQUISITES.website },
            ].map((c) => (
              <div key={c.label} className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: "var(--gov-blue-pale, #e8f0fb)" }}>
                  <Icon name={c.icon} size={16} style={{ color: "var(--gov-blue)" }} />
                </div>
                <div>
                  <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-0.5">{c.label}</div>
                  <div className="text-gray-900 font-medium text-sm">{c.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
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