import { BackButton } from '@/components/BackButton'

interface Props {
  params: Promise<{ locale: string }>
}

const content = {
  en: {
    label: 'Legal',
    title: 'Privacy Policy',
    updated: 'Last updated: March 2026',
    intro: [
      'This Privacy Policy explains how Dmytro Nester, operating the renovation services business under the brand remont-naprawa.pl (hereinafter referred to as "we", "us", "our"), collects, processes, stores, and protects personal data in compliance with the General Data Protection Regulation (EU) 2016/679 – GDPR and applicable Polish law.',
      'The website is developed and operated technically by CRT Agency (Cortallis Sp. z o.o.) on behalf of the data controller.',
      'By using our website, contacting us, or providing any personal information, you agree to the practices described herein.',
    ],
    sections: [
      {
        title: '1. Data Controller',
        content: 'The data controller responsible for your personal data is Dmytro Nester — remont-naprawa.pl. We process personal data in a lawful, fair, and transparent manner.',
      },
      {
        title: '2. Scope of Application',
        content: 'This Privacy Policy applies to visitors of the remont-naprawa.pl website, individuals submitting inquiries or project requests, and potential and existing clients of our renovation services.',
      },
      {
        title: '3. Types of Personal Data Collected',
        content: 'We may collect: name, email address, phone number (optional), project details submitted via inquiry forms (room count, budget range, description). Sensitive data such as health, political opinions, or religion are not collected.',
      },
      {
        title: '4. Methods of Data Collection',
        content: 'Personal data are collected through inquiry forms on our website, direct communication via email or phone, and messaging platforms if contacted via those channels.',
      },
      {
        title: '5. Purposes of Processing',
        content: 'We process personal data to respond to inquiries, prepare quotes and project proposals, deliver renovation services, manage client relationships, and improve our operations.',
      },
      {
        title: '6. Legal Basis for Processing',
        content: 'Processing is based on: consent (6(1)(a)) for marketing; performance of a contract (6(1)(b)) for service delivery; legal obligation (6(1)(c)); and legitimate interest (6(1)(f)) for communication and business development.',
      },
      {
        title: '7. Data Retention',
        content: 'We retain personal data for the duration of cooperation and up to 12 months following the last interaction. Data may be retained longer if required by law or to defend legal claims.',
      },
      {
        title: '8. Data Sharing and Third Parties',
        content: 'We do not sell or rent personal data. We may share data with hosting providers (Vercel), database providers (Supabase), email service providers, and our technical operator CRT Agency (Cortallis Sp. z o.o.). All providers are GDPR-compliant.',
      },
      {
        title: '9. International Data Transfers',
        content: 'If personal data are transferred outside the EEA, we ensure appropriate safeguards are in place, including Standard Contractual Clauses approved by the European Commission.',
      },
      {
        title: '10. Data Security',
        content: 'We implement technical and organizational measures including restricted access, secure systems, and regular monitoring. No system can guarantee absolute security.',
      },
      {
        title: '11. Your Rights',
        content: 'Under GDPR you have the right to access, rectify, erase, restrict, object to, and port your personal data, as well as to withdraw consent and lodge a complaint with the Polish supervisory authority (UODO). Contact: dima.nester@gmail.com',
      },
      {
        title: '12. Cookies',
        content: 'We may use cookies for website functionality and analytics in the future. A dedicated Cookie Policy will be provided when such technologies are implemented.',
      },
      {
        title: '13. Changes to This Policy',
        content: 'We may update this Privacy Policy at any time. The revised version will be published with the updated date. We encourage periodic review.',
      },
      {
        title: '14. Contact',
        content: 'For any questions regarding this Privacy Policy, contact: dima.nester@gmail.com | +48 729 460 423',
      },
    ],
    back: '← Back to website',
  },
  pl: {
    label: 'Prawne',
    title: 'Polityka Prywatności',
    updated: 'Ostatnia aktualizacja: marzec 2026',
    intro: [
      'Niniejsza Polityka Prywatności wyjaśnia, w jaki sposób Dmytro Nester, prowadzący działalność remontową pod marką remont-naprawa.pl (dalej „my"), gromadzi, przetwarza, przechowuje i chroni dane osobowe zgodnie z Rozporządzeniem (UE) 2016/679 – RODO oraz obowiązującym prawem polskim.',
      'Strona internetowa jest opracowana i obsługiwana technicznie przez CRT Agency (Cortallis Sp. z o.o.) w imieniu administratora danych.',
      'Korzystając z naszej strony, kontaktując się z nami lub przekazując jakiekolwiek dane osobowe, zgadzasz się z opisanymi tutaj praktykami.',
    ],
    sections: [
      {
        title: '1. Administrator Danych',
        content: 'Administratorem Twoich danych osobowych jest Dmytro Nester — remont-naprawa.pl. Dane osobowe przetwarzamy zgodnie z prawem, rzetelnie i przejrzyście.',
      },
      {
        title: '2. Zakres Zastosowania',
        content: 'Polityka dotyczy odwiedzających stronę remont-naprawa.pl, osób składających zapytania lub briefy projektowe oraz obecnych i potencjalnych klientów naszych usług remontowych.',
      },
      {
        title: '3. Rodzaje Zbieranych Danych',
        content: 'Możemy zbierać: imię i nazwisko, adres e-mail, numer telefonu (opcjonalnie), szczegóły projektu przesłane przez formularze (liczba pokoi, budżet, opis). Dane wrażliwe nie są zbierane.',
      },
      {
        title: '4. Metody Zbierania Danych',
        content: 'Dane zbieramy przez formularze na stronie, bezpośrednią komunikację e-mailową lub telefoniczną oraz platformy komunikacyjne, jeśli kontakt nastąpił przez te kanały.',
      },
      {
        title: '5. Cele Przetwarzania',
        content: 'Przetwarzamy dane w celu odpowiadania na zapytania, przygotowywania ofert i wycen, świadczenia usług remontowych, zarządzania relacjami z klientami oraz doskonalenia naszych działań.',
      },
      {
        title: '6. Podstawa Prawna Przetwarzania',
        content: 'Podstawy prawne: zgoda (6(1)(a)) — marketing; wykonanie umowy (6(1)(b)) — świadczenie usług; obowiązek prawny (6(1)(c)); prawnie uzasadniony interes (6(1)(f)) — komunikacja i rozwój biznesu.',
      },
      {
        title: '7. Okres Przechowywania Danych',
        content: 'Przechowujemy dane przez czas trwania współpracy i do 12 miesięcy od ostatniego kontaktu. Dłuższe przechowywanie jest możliwe, jeśli wymagają tego przepisy prawa lub obrona roszczeń.',
      },
      {
        title: '8. Udostępnianie Danych',
        content: 'Nie sprzedajemy ani nie wynajmujemy danych. Możemy je udostępniać dostawcom hostingu (Vercel), baz danych (Supabase), usług e-mail oraz operatorowi technicznemu CRT Agency (Cortallis Sp. z o.o.). Wszyscy dostawcy są związani wymogami RODO.',
      },
      {
        title: '9. Przekazywanie Danych Poza EOG',
        content: 'W przypadku przekazywania danych poza EOG zapewniamy odpowiednie zabezpieczenia, w tym standardowe klauzule umowne zatwierdzone przez Komisję Europejską.',
      },
      {
        title: '10. Bezpieczeństwo Danych',
        content: 'Stosujemy środki techniczne i organizacyjne, w tym ograniczony dostęp, bezpieczne systemy i regularne monitorowanie. Żaden system nie gwarantuje absolutnego bezpieczeństwa.',
      },
      {
        title: '11. Twoje Prawa',
        content: 'Na podstawie RODO masz prawo do dostępu, sprostowania, usunięcia, ograniczenia przetwarzania, sprzeciwu, przenoszenia danych, cofnięcia zgody oraz skargi do UODO. Kontakt: dima.nester@gmail.com',
      },
      {
        title: '12. Pliki Cookie',
        content: 'Możemy w przyszłości używać plików cookie do obsługi strony i analityki. Dedykowana polityka cookies zostanie udostępniona po wdrożeniu tych technologii.',
      },
      {
        title: '13. Zmiany w Polityce',
        content: 'Możemy aktualizować niniejszą Politykę Prywatności. Zaktualizowana wersja zostanie opublikowana ze zmienioną datą. Zachęcamy do regularnego jej przeglądania.',
      },
      {
        title: '14. Kontakt',
        content: 'W razie pytań dotyczących Polityki Prywatności skontaktuj się: dima.nester@gmail.com | +48 729 460 423',
      },
    ],
    back: '← Powrót do strony',
  },
  ru: {
    label: 'Юридическое',
    title: 'Политика конфиденциальности',
    updated: 'Последнее обновление: март 2026',
    intro: [
      'Настоящая Политика конфиденциальности объясняет, как Дмитрий Нестер, ведущий деятельность по ремонту под брендом remont-naprawa.pl (далее «мы»), собирает, обрабатывает, хранит и защищает персональные данные в соответствии с Регламентом (ЕС) 2016/679 – GDPR и действующим польским законодательством.',
      'Сайт разработан и технически обслуживается агентством CRT Agency (Cortallis Sp. z o.o.) от имени контролёра данных.',
      'Используя наш сайт, связываясь с нами или предоставляя персональные данные, вы соглашаетесь с описанными здесь практиками.',
    ],
    sections: [
      {
        title: '1. Контролёр данных',
        content: 'Контролёром ваших персональных данных является Дмитрий Нестер — remont-naprawa.pl. Мы обрабатываем данные законно, добросовестно и прозрачно.',
      },
      {
        title: '2. Область применения',
        content: 'Политика распространяется на посетителей сайта remont-naprawa.pl, лиц, подающих запросы или брифы, а также действующих и потенциальных клиентов наших ремонтных услуг.',
      },
      {
        title: '3. Виды собираемых данных',
        content: 'Мы можем собирать: имя, адрес электронной почты, номер телефона (необязательно), детали проекта из форм (количество комнат, бюджет, описание). Чувствительные данные не собираются.',
      },
      {
        title: '4. Способы сбора данных',
        content: 'Данные собираются через формы на сайте, прямую переписку по email или телефону, а также мессенджеры, если контакт осуществлялся через них.',
      },
      {
        title: '5. Цели обработки',
        content: 'Мы обрабатываем данные для ответа на запросы, подготовки предложений и смет, оказания ремонтных услуг, управления отношениями с клиентами и совершенствования работы.',
      },
      {
        title: '6. Правовая основа обработки',
        content: 'Основания: согласие (6(1)(a)) — маркетинг; исполнение договора (6(1)(b)) — оказание услуг; правовое обязательство (6(1)(c)); законный интерес (6(1)(f)) — коммуникация и развитие бизнеса.',
      },
      {
        title: '7. Сроки хранения данных',
        content: 'Мы храним данные в течение периода сотрудничества и до 12 месяцев после последнего контакта. Более длительное хранение возможно при наличии правового основания.',
      },
      {
        title: '8. Передача данных третьим лицам',
        content: 'Мы не продаём и не сдаём в аренду персональные данные. Данные могут передаваться провайдерам хостинга (Vercel), баз данных (Supabase), email-сервисов и техническому оператору CRT Agency. Все соблюдают требования GDPR.',
      },
      {
        title: '9. Передача данных за пределы ЕЭЗ',
        content: 'При передаче данных за пределы ЕЭЗ обеспечиваются соответствующие гарантии, включая стандартные договорные оговорки, утверждённые Европейской комиссией.',
      },
      {
        title: '10. Безопасность данных',
        content: 'Мы применяем технические и организационные меры: ограниченный доступ, защищённые системы и регулярный мониторинг. Абсолютная безопасность не может быть гарантирована.',
      },
      {
        title: '11. Ваши права',
        content: 'По GDPR вы вправе получить доступ, исправить, удалить данные, ограничить обработку, возразить против неё, перенести данные, отозвать согласие и подать жалобу в надзорный орган. Контакт: dima.nester@gmail.com',
      },
      {
        title: '12. Файлы cookie',
        content: 'В будущем мы можем использовать файлы cookie для работы сайта и аналитики. Отдельная политика будет опубликована после внедрения таких технологий.',
      },
      {
        title: '13. Изменения политики',
        content: 'Мы можем обновлять настоящую Политику конфиденциальности. Обновлённая версия будет опубликована с новой датой. Рекомендуем периодически её проверять.',
      },
      {
        title: '14. Контакт',
        content: 'По вопросам, связанным с Политикой конфиденциальности, обращайтесь: dima.nester@gmail.com | +48 729 460 423',
      },
    ],
    back: '← На главную',
  },
}

export default async function PrivacyPage({ params }: Props) {
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

          <div className="space-y-8 text-white/60 text-sm leading-relaxed">

            {c.intro.map((p, i) => <p key={i}>{p}</p>)}

            <div className="bg-white/[0.04] border border-white/[0.08] rounded-xl p-5 space-y-1">
              <p className="text-white/80 font-semibold font-heading">Dmytro Nester — remont-naprawa.pl</p>
              <p>Email: <a href="mailto:dima.nester@gmail.com" className="text-beige hover:text-beige-light transition-colors">dima.nester@gmail.com</a></p>
              <p>Tel: <a href="tel:+48729460423" className="text-beige hover:text-beige-light transition-colors">+48 729 460 423</a></p>
              <p className="text-white/30 text-xs pt-1">Warsaw, Poland</p>
            </div>

            {c.sections.map((s, i) => (
              <div key={i} className="space-y-2">
                <h2 className="font-heading font-bold text-white/80 text-base tracking-tight">{s.title}</h2>
                <p>{s.content}</p>
              </div>
            ))}

          </div>

          <div className="mt-16 pt-8 border-t border-white/[0.07]">
            <a href="/" className="text-white/30 hover:text-beige text-sm transition-colors duration-200">{c.back}</a>
          </div>

        </div>
      </main>
    </>
  )
}
