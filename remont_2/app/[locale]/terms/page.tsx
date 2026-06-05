import { BackButton } from '@/components/BackButton'

interface Props {
  params: Promise<{ locale: string }>
}

const content = {
  en: {
    label: 'Legal',
    title: 'Terms of Service',
    updated: 'Last updated: March 2026',
    intro: 'These Terms of Service ("Terms") govern your use of the remont-naprawa.pl website and the renovation services provided by Dmytro Nester (hereinafter "we", "us", "our"). By accessing our website, submitting an inquiry, or engaging our services, you agree to be bound by these Terms. The website is technically operated by CRT Agency (Cortallis Sp. z o.o.) on behalf of the service provider.',
    sections: [
      {
        title: '1. Service Provider',
        body: `Remont-Naprawa Dmytro Nester
Indywidualna działalność gospodarcza · Warsaw, Poland
NIP: 1182261639 · REGON: 525273869

Email: dima.nester@gmail.com
Phone: +48 729 460 423

Dmytro Nester is the entity responsible for all renovation services, contractual obligations, and personal data processing under the remont-naprawa.pl brand.`,
      },
      {
        title: '2. Scope of Services',
        body: `We provide professional renovation services, including but not limited to:

• Plastering, rendering, and wall finishing
• Flooring, tiling, and wall cladding
• Painting and glazing
• Electrical installations
• Plumbing, heating, and air conditioning
• Carpentry and joinery installation
• Thermal insulation
• Turnkey apartment and house renovations

All services are provided pursuant to individual agreements, accepted quotes, or confirmed project requests. Nothing on this website constitutes a binding offer in the legal sense.`,
      },
      {
        title: '3. Use of the Website',
        body: `You agree to use this website for lawful purposes only. You must not:

• Use the website in violation of applicable laws
• Submit false, misleading, or fraudulent information
• Attempt unauthorized access to our systems
• Interfere with website functionality or security`,
      },
      {
        title: '4. Project Engagement',
        body: `All cooperation is subject to:

• A separate written agreement, quote, or accepted offer
• Clearly defined scope, pricing, and timeline

We reserve the right to refuse service at our sole discretion.`,
      },
      {
        title: '5. Pricing and Payment',
        body: `Unless agreed otherwise in writing:

• Work commences only after initial payment or deposit
• Payment deadlines must be respected; delays may result in suspension of work
• Pricing is agreed individually per project and may be updated at any time

Intellectual property in all project-specific materials remains with the client after full payment is received. We reserve the right to showcase completed projects in our portfolio.`,
      },
      {
        title: '6. Client Responsibilities',
        body: `Clients agree to:

• Provide accurate and complete information about the project
• Ensure site access at agreed times
• Deliver required decisions, selections, and approvals in a timely manner
• Cooperate throughout the project

Delays or issues caused by the client do not constitute liability for us.`,
      },
      {
        title: '7. Scope Changes',
        body: `The project scope is defined at the start of cooperation. Minor adjustments may be included in the agreed price. Additional work or changes requested during execution may incur additional charges. We reserve the right to determine if a request exceeds the original scope.`,
      },
      {
        title: '8. Third-Party Services',
        body: `We may use third-party services (suppliers, subcontractors, platforms). We are not liable for outages, changes, or discontinuation of third-party services. Use of such services is subject to their own terms.`,
      },
      {
        title: '9. Disclaimer of Warranties',
        body: `Services are provided in accordance with professional standards and agreed specifications. We do not guarantee specific business outcomes. Results may vary based on site conditions, materials, and client decisions.`,
      },
      {
        title: '10. Limitation of Liability',
        body: `To the fullest extent permitted by law, our total liability is limited to the amount paid for the relevant services. We are not liable for indirect or consequential damages beyond our control.`,
      },
      {
        title: '11. Warranty',
        body: `We provide a 12-month warranty on all completed renovation works. The warranty covers defects resulting from improper workmanship. It does not cover damage caused by improper use, external factors, or modifications made by third parties.`,
      },
      {
        title: '12. Termination',
        body: `We reserve the right to suspend or terminate services if a client breaches these Terms or contractual obligations. Clients may terminate cooperation subject to conditions specified in their individual agreement.`,
      },
      {
        title: '13. Data Protection',
        body: `All personal data are processed in accordance with our Privacy Policy. By using our services, you acknowledge and accept our data processing practices.`,
      },
      {
        title: '14. Changes to Terms',
        body: `We may update these Terms at any time. Continued use of our website or services constitutes acceptance of the updated Terms.`,
      },
      {
        title: '15. Governing Law',
        body: `These Terms are governed by the laws of Poland. Any disputes shall be resolved exclusively by the competent courts of Poland.`,
      },
      {
        title: '16. Contact',
        body: `For questions regarding these Terms:

Email: dima.nester@gmail.com
Phone: +48 729 460 423`,
      },
    ],
    back: '← Back to website',
  },
  pl: {
    label: 'Prawne',
    title: 'Warunki usługi',
    updated: 'Ostatnia aktualizacja: marzec 2026',
    intro: 'Niniejsze Warunki usługi ("Warunki") regulują korzystanie ze strony remont-naprawa.pl i usług remontowych świadczonych przez Dmytro Nester (dalej "my"). Korzystając z naszej strony, składając zapytanie lub zlecając usługi, zgadzasz się na te Warunki. Strona jest obsługiwana technicznie przez CRT Agency (Cortallis Sp. z o.o.) w imieniu usługodawcy.',
    sections: [
      {
        title: '1. Usługodawca',
        body: `Remont-Naprawa Dmytro Nester
Indywidualna działalność gospodarcza · Warszawa, Polska
NIP: 1182261639 · REGON: 525273869

Email: dima.nester@gmail.com
Tel: +48 729 460 423`,
      },
      {
        title: '2. Zakres usług',
        body: `Świadczymy profesjonalne usługi remontowe, w tym m.in.:

• Tynkowanie i gładzie
• Posadzkarstwo, płytki, okładziny ścian
• Malowanie i szklenie
• Instalacje elektryczne
• Instalacje wod-kan, grzewcze i klimatyzacja
• Montaż stolarki budowlanej
• Izolacje termiczne
• Kompleksowe remonty mieszkań i domów pod klucz

Wszystkie usługi są świadczone na podstawie indywidualnych umów lub potwierdzonych wycen. Żadna treść na stronie nie stanowi wiążącej oferty.`,
      },
      {
        title: '3. Korzystanie ze strony',
        body: `Zobowiązujesz się korzystać ze strony wyłącznie w celach zgodnych z prawem. Zabrania się przesyłania fałszywych lub wprowadzających w błąd informacji oraz prób nieuprawnionego dostępu do naszych systemów.`,
      },
      {
        title: '4. Realizacja zleceń',
        body: `Współpraca odbywa się na podstawie pisemnej umowy lub zaakceptowanej wyceny z wyraźnie określonym zakresem, ceną i harmonogramem. Zastrzegamy sobie prawo do odmowy wykonania usługi.`,
      },
      {
        title: '5. Cennik i płatności',
        body: `O ile nie uzgodniono inaczej:

• Prace rozpoczynają się po wpłaceniu zaliczki
• Opóźnienia w płatnościach mogą skutkować wstrzymaniem prac
• Ceny są ustalane indywidualnie dla każdego projektu

Zastrzegamy sobie prawo do prezentacji zrealizowanych projektów w portfolio.`,
      },
      {
        title: '6. Obowiązki klienta',
        body: `Klient zobowiązuje się do:

• Podania dokładnych informacji o projekcie
• Zapewnienia dostępu do miejsca prac w uzgodnionych terminach
• Terminowego podejmowania decyzji i akceptacji
• Współpracy w trakcie realizacji projektu

Opóźnienia wynikające z winy klienta nie stanowią naszej odpowiedzialności.`,
      },
      {
        title: '7. Zmiany zakresu',
        body: `Zakres projektu jest ustalony na początku współpracy. Dodatkowe prace lub zmiany zgłoszone w trakcie realizacji mogą wiązać się z dodatkowymi kosztami.`,
      },
      {
        title: '8. Usługi podmiotów trzecich',
        body: `Możemy korzystać z usług podwykonawców lub zewnętrznych dostawców. Nie ponosimy odpowiedzialności za działania podmiotów trzecich.`,
      },
      {
        title: '9. Wyłączenie gwarancji',
        body: `Usługi są świadczone zgodnie ze standardami zawodowymi i uzgodnionym zakresem. Wyniki mogą zależeć od warunków na miejscu, materiałów i decyzji klienta.`,
      },
      {
        title: '10. Ograniczenie odpowiedzialności',
        body: `W maksymalnym zakresie dozwolonym przez prawo nasza łączna odpowiedzialność ogranicza się do kwoty zapłaconej za dane usługi.`,
      },
      {
        title: '11. Gwarancja',
        body: `Udzielamy 12-miesięcznej gwarancji na wszystkie wykonane prace remontowe. Gwarancja obejmuje wady wynikające z nieprawidłowego wykonania. Nie obejmuje uszkodzeń spowodowanych niewłaściwym użytkowaniem lub modyfikacjami przez osoby trzecie.`,
      },
      {
        title: '12. Rozwiązanie umowy',
        body: `Zastrzegamy sobie prawo do zawieszenia lub zakończenia współpracy w przypadku naruszenia niniejszych Warunków przez klienta. Klient może rozwiązać umowę zgodnie z warunkami indywidualnej umowy.`,
      },
      {
        title: '13. Ochrona danych',
        body: `Wszystkie dane osobowe są przetwarzane zgodnie z naszą Polityką prywatności.`,
      },
      {
        title: '14. Zmiany Warunków',
        body: `Możemy aktualizować niniejsze Warunki w dowolnym momencie. Dalsze korzystanie z usług oznacza akceptację zaktualizowanych Warunków.`,
      },
      {
        title: '15. Prawo właściwe',
        body: `Niniejsze Warunki podlegają prawu polskiemu. Spory rozstrzygają właściwe sądy w Polsce.`,
      },
      {
        title: '16. Kontakt',
        body: `W sprawach dotyczących Warunków:

Email: dima.nester@gmail.com
Tel: +48 729 460 423`,
      },
    ],
    back: '← Powrót do strony',
  },
  ru: {
    label: 'Юридическое',
    title: 'Условия использования',
    updated: 'Последнее обновление: март 2026',
    intro: 'Настоящие Условия использования ("Условия") регулируют использование сайта remont-naprawa.pl и ремонтных услуг, предоставляемых Дмитрием Нестером (далее "мы"). Используя сайт, подавая запрос или заказывая услуги, вы соглашаетесь с настоящими Условиями. Сайт технически обслуживается CRT Agency (Cortallis Sp. z o.o.) от имени исполнителя.',
    sections: [
      {
        title: '1. Исполнитель',
        body: `Remont-Naprawa Dmytro Nester
Индивидуальная предпринимательская деятельность · Варшава, Польша
NIP: 1182261639 · REGON: 525273869

Email: dima.nester@gmail.com
Тел: +48 729 460 423`,
      },
      {
        title: '2. Объём услуг',
        body: `Мы предоставляем профессиональные ремонтные услуги, включая:

• Штукатурка и шпаклёвка
• Укладка полов, плитки, облицовка стен
• Покраска и остекление
• Электромонтажные работы
• Сантехника, отопление и кондиционирование
• Установка столярных изделий
• Теплоизоляция
• Ремонт квартир и домов под ключ

Все услуги оказываются на основании индивидуальных договоров или согласованных смет.`,
      },
      {
        title: '3. Использование сайта',
        body: `Вы обязуетесь использовать сайт исключительно в законных целях. Запрещается предоставлять ложную информацию или пытаться получить несанкционированный доступ к нашим системам.`,
      },
      {
        title: '4. Выполнение заказов',
        body: `Сотрудничество осуществляется на основании письменного договора или подтверждённой сметы с чётко определёнными объёмом, стоимостью и сроками. Мы оставляем за собой право отказать в услуге.`,
      },
      {
        title: '5. Ценообразование и оплата',
        body: `Если иное не согласовано:

• Работы начинаются после внесения аванса
• Задержки оплаты могут привести к приостановке работ
• Стоимость согласовывается индивидуально для каждого проекта

Мы оставляем за собой право публиковать выполненные проекты в портфолио.`,
      },
      {
        title: '6. Обязанности клиента',
        body: `Клиент обязуется:

• Предоставлять точную информацию о проекте
• Обеспечивать доступ к объекту в согласованные сроки
• Своевременно принимать решения и давать согласования
• Сотрудничать в ходе выполнения работ

Задержки по вине клиента не являются нашей ответственностью.`,
      },
      {
        title: '7. Изменение объёма работ',
        body: `Объём проекта определяется в начале сотрудничества. Дополнительные работы или изменения в ходе выполнения могут повлечь дополнительные расходы.`,
      },
      {
        title: '8. Услуги третьих сторон',
        body: `Мы можем привлекать субподрядчиков и внешних поставщиков. Мы не несём ответственности за действия третьих сторон.`,
      },
      {
        title: '9. Отказ от гарантий',
        body: `Услуги оказываются в соответствии с профессиональными стандартами. Результаты могут зависеть от условий объекта, материалов и решений клиента.`,
      },
      {
        title: '10. Ограничение ответственности',
        body: `В максимальной степени, допускаемой законом, наша ответственность ограничена суммой, уплаченной за соответствующие услуги.`,
      },
      {
        title: '11. Гарантия',
        body: `Мы предоставляем гарантию 12 месяцев на все выполненные ремонтные работы. Гарантия распространяется на дефекты, возникшие вследствие ненадлежащего выполнения работ. Она не распространяется на повреждения, вызванные ненадлежащей эксплуатацией или вмешательством третьих лиц.`,
      },
      {
        title: '12. Расторжение',
        body: `Мы оставляем за собой право приостановить или прекратить сотрудничество в случае нарушения клиентом настоящих Условий. Клиент может расторгнуть договор в соответствии с условиями индивидуального соглашения.`,
      },
      {
        title: '13. Защита данных',
        body: `Все персональные данные обрабатываются в соответствии с нашей Политикой конфиденциальности.`,
      },
      {
        title: '14. Изменение условий',
        body: `Мы можем обновлять настоящие Условия в любое время. Продолжение использования услуг означает принятие обновлённых Условий.`,
      },
      {
        title: '15. Применимое право',
        body: `Настоящие Условия регулируются законодательством Польши. Споры рассматриваются компетентными судами Польши.`,
      },
      {
        title: '16. Контакт',
        body: `По вопросам, связанным с Условиями:

Email: dima.nester@gmail.com
Тел: +48 729 460 423`,
      },
    ],
    back: '← На главную',
  },
}

export default async function TermsPage({ params }: Props) {
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

          <p className="text-white/50 text-sm leading-relaxed mb-10">{c.intro}</p>

          <div className="bg-white/[0.04] border border-white/[0.08] rounded-xl p-5 mb-10 space-y-1 text-sm">
            <p className="text-white/80 font-semibold font-heading">Remont-Naprawa Dmytro Nester</p>
            <p className="text-white/40">NIP: 1182261639 &nbsp;·&nbsp; REGON: 525273869</p>
            <div className="pt-2 flex flex-col gap-0.5">
              <a href="mailto:dima.nester@gmail.com" className="text-beige hover:text-beige-light transition-colors">dima.nester@gmail.com</a>
              <a href="tel:+48729460423" className="text-beige hover:text-beige-light transition-colors">+48 729 460 423</a>
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
            <a href={`/${locale}/legal`} className="text-white/20 hover:text-white/50 text-sm transition-colors">Legal →</a>
          </div>

        </div>
      </main>
    </>
  )
}
