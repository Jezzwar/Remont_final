import { BackButton } from '@/components/BackButton'

interface Props {
  params: Promise<{ locale: string }>
}

const content = {
  en: {
    label: 'Legal',
    title: 'Legal Information',
    updated: 'Last updated: March 2026',
    sections: [
      {
        title: 'Company Details',
        body: `This website is owned and operated by:

Remont-Naprawa Dmytro Nester
Sole trader (Indywidualna działalność gospodarcza) registered under the laws of Poland

Warsaw, Poland

NIP: 1182261639 · REGON: 525273869

Business activity commenced: 08 May 2023

Email: dima.nester@gmail.com
Phone: +48 729 460 423

Dmytro Nester is the legal entity responsible for all activities conducted under the remont-naprawa.pl brand, including the provision of services, execution of agreements, and processing of personal data.

The website is developed and technically operated by CRT Agency (Cortallis Sp. z o.o.), hello@crtagency.pl`,
      },
      {
        title: 'Nature of Services',
        body: `Remont-Naprawa Dmytro Nester provides professional renovation services, including but not limited to:

• Plastering and rendering
• Flooring, tiling, and wall cladding
• Painting and glazing
• Electrical installations
• Plumbing, heating, and air conditioning
• Carpentry and joinery installation
• Thermal insulation
• Turnkey apartment and house renovations

All services are provided on the basis of individual agreements, accepted quotes, or confirmed project requests.

Nothing on this website constitutes a binding offer within the meaning of applicable civil law.`,
      },
      {
        title: 'Legal Framework',
        body: `The operation of this website and the services provided are subject to:

• Applicable laws of the Republic of Poland
• Relevant regulations of the European Union
• In particular, regulations concerning electronic services and data protection

Use of this website constitutes acceptance of applicable legal provisions and referenced documents.`,
      },
      {
        title: 'Legal Documents',
        body: `Detailed terms governing the use of this website and our services are set out in the following documents:

• Privacy Policy
• Terms of Service

These documents form an integral part of the legal relationship between the user and Remont-Naprawa Dmytro Nester.`,
      },
      {
        title: 'Intellectual Property Rights',
        body: `All content available on this website — including visual design, layout, text content, graphics, branding elements, source code, and technical solutions — is protected under applicable intellectual property laws.

Unless explicitly stated otherwise, all rights are reserved.

Any reproduction, distribution, modification, or use of the content without prior written consent is strictly prohibited.

Website developed by CRT Agency (Cortallis Sp. z o.o.).`,
      },
      {
        title: 'Disclaimer of Liability',
        body: `The content on this website is provided for informational purposes only. While reasonable efforts are made to ensure accuracy, Remont-Naprawa Dmytro Nester:

• Does not guarantee completeness or accuracy of information
• Reserves the right to modify content at any time without prior notice

To the maximum extent permitted by law, we shall not be liable for any direct or indirect damages arising from the use of this website, reliance on information provided herein, or temporary unavailability.`,
      },
      {
        title: 'External Links',
        body: `This website may contain links to external websites or third-party services. We have no control over and assume no responsibility for their content, privacy practices, or terms. Access to third-party resources is at the user's own risk.`,
      },
      {
        title: 'Governing Law and Jurisdiction',
        body: `This website and all related services are governed by the laws of Poland. Any disputes shall be subject to the jurisdiction of competent courts in Poland.`,
      },
      {
        title: 'Contact',
        body: `For legal inquiries or compliance-related questions:

Email: dima.nester@gmail.com
Phone: +48 729 460 423`,
      },
    ],
    back: '← Back to website',
  },
  pl: {
    label: 'Prawne',
    title: 'Informacje prawne',
    updated: 'Ostatnia aktualizacja: marzec 2026',
    sections: [
      {
        title: 'Dane firmy',
        body: `Niniejsza strona internetowa jest własnością i jest prowadzona przez:

Remont-Naprawa Dmytro Nester
Indywidualna działalność gospodarcza zarejestrowana zgodnie z prawem polskim

Warszawa, Polska

NIP: 1182261639 · REGON: 525273869

Działalność gospodarcza od: 08 maja 2023

Email: dima.nester@gmail.com
Tel: +48 729 460 423

Dmytro Nester jest podmiotem prawnym odpowiedzialnym za wszelkie działania prowadzone pod marką remont-naprawa.pl, w tym świadczenie usług, zawieranie umów i przetwarzanie danych osobowych.

Strona internetowa jest opracowana i obsługiwana technicznie przez CRT Agency (Cortallis Sp. z o.o.), hello@crtagency.pl`,
      },
      {
        title: 'Zakres usług',
        body: `Remont-Naprawa Dmytro Nester świadczy profesjonalne usługi remontowe, w tym m.in.:

• Tynkowanie i gładzie
• Posadzkarstwo, układanie płytek, okładziny ścian
• Malowanie i szklenie
• Instalacje elektryczne
• Instalacje wodno-kanalizacyjne, grzewcze i klimatyzacyjne
• Montaż stolarki budowlanej
• Montaż izolacji
• Kompleksowe remonty mieszkań i domów pod klucz

Wszystkie usługi świadczone są na podstawie indywidualnych umów, zaakceptowanych wycen lub potwierdzonych zapytań projektowych.

Żadna treść na tej stronie nie stanowi wiążącej oferty w rozumieniu przepisów prawa cywilnego.`,
      },
      {
        title: 'Ramy prawne',
        body: `Działalność tej strony i świadczone usługi podlegają:

• Obowiązującemu prawu polskiemu
• Właściwym przepisom Unii Europejskiej
• W szczególności przepisom dotyczącym usług elektronicznych i ochrony danych

Korzystanie z tej strony oznacza akceptację obowiązujących przepisów prawnych i dokumentów referencyjnych.`,
      },
      {
        title: 'Dokumenty prawne',
        body: `Szczegółowe warunki korzystania z niniejszej strony i naszych usług określają:

• Polityka prywatności
• Warunki usługi

Dokumenty te stanowią integralną część stosunku prawnego między użytkownikiem a Remont-Naprawa Dmytro Nester.`,
      },
      {
        title: 'Prawa własności intelektualnej',
        body: `Wszelkie treści dostępne na tej stronie — w tym projekt wizualny, układ, treść tekstowa, grafiki, elementy brandingowe, kod źródłowy i rozwiązania techniczne — są chronione obowiązującymi przepisami prawa własności intelektualnej.

O ile wyraźnie nie zaznaczono inaczej, wszelkie prawa są zastrzeżone.

Jakiekolwiek reprodukowanie, dystrybucja, modyfikacja lub wykorzystanie treści bez uprzedniej pisemnej zgody jest surowo zabronione.

Strona opracowana przez CRT Agency (Cortallis Sp. z o.o.).`,
      },
      {
        title: 'Wyłączenie odpowiedzialności',
        body: `Treści zamieszczone na tej stronie mają wyłącznie charakter informacyjny. Remont-Naprawa Dmytro Nester nie gwarantuje kompletności ani dokładności informacji i zastrzega sobie prawo do ich zmiany bez uprzedniego powiadomienia.

W maksymalnym zakresie dozwolonym przez prawo nie ponosimy odpowiedzialności za jakiekolwiek szkody bezpośrednie lub pośrednie wynikające z korzystania z tej strony.`,
      },
      {
        title: 'Linki zewnętrzne',
        body: `Ta strona może zawierać linki do zewnętrznych stron lub usług podmiotów trzecich. Nie mamy kontroli nad ich treścią, polityką prywatności ani warunkami. Korzystanie z zasobów zewnętrznych odbywa się na własne ryzyko użytkownika.`,
      },
      {
        title: 'Prawo właściwe i jurysdykcja',
        body: `Ta strona i wszystkie powiązane usługi podlegają prawu polskiemu. Wszelkie spory będą rozstrzygane przez właściwe sądy w Polsce.`,
      },
      {
        title: 'Kontakt',
        body: `W sprawach prawnych lub dotyczących zgodności z przepisami:

Email: dima.nester@gmail.com
Tel: +48 729 460 423`,
      },
    ],
    back: '← Powrót do strony',
  },
  ru: {
    label: 'Юридическое',
    title: 'Юридическая информация',
    updated: 'Последнее обновление: март 2026',
    sections: [
      {
        title: 'Данные компании',
        body: `Данный сайт принадлежит и управляется:

Remont-Naprawa Dmytro Nester
Индивидуальная предпринимательская деятельность, зарегистрированная по законодательству Польши

Варшава, Польша

NIP: 1182261639 · REGON: 525273869

Деятельность ведётся с: 08 мая 2023

Email: dima.nester@gmail.com
Тел: +48 729 460 423

Дмитрий Нестер является юридическим лицом, ответственным за всю деятельность под брендом remont-naprawa.pl, включая оказание услуг, заключение договоров и обработку персональных данных.

Сайт разработан и технически обслуживается агентством CRT Agency (Cortallis Sp. z o.o.), hello@crtagency.pl`,
      },
      {
        title: 'Виды услуг',
        body: `Remont-Naprawa Dmytro Nester предоставляет профессиональные ремонтные услуги, включая:

• Штукатурка и шпаклёвка
• Укладка полов, плитки и облицовка стен
• Покраска и остекление
• Электромонтажные работы
• Сантехника, отопление и кондиционирование
• Установка столярных изделий
• Теплоизоляция
• Ремонт квартир и домов под ключ

Все услуги оказываются на основании индивидуальных договоров, согласованных смет или подтверждённых запросов.

Ничто на данном сайте не является обязывающей офертой в смысле применимого гражданского права.`,
      },
      {
        title: 'Правовая база',
        body: `Деятельность сайта и оказываемые услуги регулируются:

• Действующим законодательством Республики Польша
• Соответствующими нормативными актами Европейского Союза
• В частности, регулированием в области электронных услуг и защиты данных`,
      },
      {
        title: 'Правовые документы',
        body: `Подробные условия использования сайта и наших услуг изложены в:

• Политике конфиденциальности
• Условиях использования

Эти документы являются неотъемлемой частью правовых отношений между пользователем и Remont-Naprawa Dmytro Nester.`,
      },
      {
        title: 'Права интеллектуальной собственности',
        body: `Всё содержимое сайта — включая визуальный дизайн, макет, текстовый контент, графику, брендинг, исходный код и технические решения — защищено законодательством об интеллектуальной собственности.

Если не указано иное, все права защищены.

Любое воспроизведение, распространение или использование контента без письменного согласия строго запрещено.

Сайт разработан CRT Agency (Cortallis Sp. z o.o.).`,
      },
      {
        title: 'Ограничение ответственности',
        body: `Контент сайта носит исключительно информационный характер. Remont-Naprawa Dmytro Nester не гарантирует полноту и точность информации и оставляет за собой право изменять её без предварительного уведомления.

В максимальной степени, допускаемой законом, мы не несём ответственности за прямой или косвенный ущерб, связанный с использованием данного сайта.`,
      },
      {
        title: 'Внешние ссылки',
        body: `Сайт может содержать ссылки на внешние ресурсы. Мы не несём ответственности за их содержание, политику конфиденциальности или условия. Переход по внешним ссылкам осуществляется на риск пользователя.`,
      },
      {
        title: 'Применимое право и юрисдикция',
        body: `Сайт и все связанные услуги регулируются законодательством Польши. Споры рассматриваются компетентными судами Польши.`,
      },
      {
        title: 'Контакт',
        body: `По юридическим вопросам:

Email: dima.nester@gmail.com
Тел: +48 729 460 423`,
      },
    ],
    back: '← На главную',
  },
}

export default async function LegalPage({ params }: Props) {
  const { locale } = await params
  const c = content[locale as keyof typeof content] ?? content.pl
  const home = `/${locale}`

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-graphite border-b border-white/[0.08] h-[70px] flex items-center px-6 sm:px-10 lg:px-16">
        <BackButton label={`← ${locale === 'ru' ? 'На главную' : locale === 'en' ? 'Back' : 'Wróć'}`} />
      </header>

      <main className="bg-graphite min-h-screen pt-[70px]">
        <div className="max-w-3xl mx-auto px-6 sm:px-10 py-16">

          <div className="mb-12">
            <p className="text-beige text-[10px] uppercase tracking-[0.25em] font-heading mb-4">{c.label}</p>
            <h1 className="font-heading font-black text-white uppercase text-[clamp(2rem,5vw,3rem)] leading-[0.9] tracking-tight mb-4">
              {c.title}
            </h1>
            <p className="text-white/30 text-sm">{c.updated}</p>
          </div>

          {/* Business card */}
          <div className="bg-white/[0.04] border border-white/[0.08] rounded-xl p-5 mb-10 space-y-1 text-sm">
            <p className="text-white/80 font-semibold font-heading">Remont-Naprawa Dmytro Nester</p>
            <p className="text-white/40">NIP: 1182261639 &nbsp;·&nbsp; REGON: 525273869</p>
            <p className="text-white/40">Warsaw, Poland &nbsp;·&nbsp; JDG since 08.05.2023</p>
            <div className="pt-2 flex flex-col gap-0.5">
              <a href="mailto:dima.nester@gmail.com" className="text-beige hover:text-beige-light transition-colors text-sm">dima.nester@gmail.com</a>
              <a href="tel:+48729460423" className="text-beige hover:text-beige-light transition-colors text-sm">+48 729 460 423</a>
            </div>
          </div>

          <div className="space-y-8 text-white/60 text-sm leading-relaxed">
            {c.sections.map((s, i) => (
              <div key={i} className="space-y-3">
                <h2 className="font-heading font-bold text-white/80 text-base tracking-tight">{s.title}</h2>
                <div className="whitespace-pre-line">{s.body}</div>
              </div>
            ))}
          </div>

          <div className="mt-16 pt-8 border-t border-white/[0.07] flex items-center gap-6">
            <a href={home} className="text-white/30 hover:text-beige text-sm transition-colors">{c.back}</a>
            <a href={`/${locale}/privacy`} className="text-white/20 hover:text-white/50 text-sm transition-colors">Privacy Policy →</a>
          </div>

        </div>
      </main>
    </>
  )
}
