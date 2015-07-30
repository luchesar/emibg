'use strict';

/**
 * @ngInject
 */
function Translations($translateProvider) {
  $translateProvider.useSanitizeValueStrategy('escaped');
  $translateProvider
    .translations('en', {
      HOME: 'Home',
      ABOUT_US: 'About us',
      MISSION: 'Mission',
      TEAM: 'Team',
      CONTACT: 'Countact',
      OTHER_LANG: 'Бг',
      NEWS: 'News',
      ANALYSIS: "Analysis",
      EVENTS: 'Events',
      ENERGOPEDIA: 'Energopedia',
      PARTNERS: 'Partners',
      EMIS_ANALYSIS: 'EMI\'s',
      SUMMARIES: 'Summaries', 
      ENERGOPEDIA_CONTENT: 'is for anyone with knowledge in concepts and topics in the energy field who would like to participate in the creation of shared knowledge that is freely available to everyone interested in relevant issues.',
      HERE: 'Energopedia', 
      ABOUT_MISSION_CONTENT_1: 'Energy Management Institute (EMI) is an NGO that started its operation in June 2010. Its mission is to contribute to the sustainable development of the Bulgarian energy sector and its integration to the European Union through Engagement, Mediation, Insights. It aims to improve of the international cooperation in order to utilize international experience and to implement in Bulgaria worldwide established best practices.',
      ABOUT_MISSION_CONTENT_2: 'EMI as a think tank offers innovative ideas in the field of energy policy by participating in the energy policy debate with its studies which are founded on an academic approach. EMI provides a neutral platform for contacts and information exchange as a part of developing network and it actively creates partnerships in the diverse fields of its activity. EMI also contributes to the improvement of qualifications of both industry experts and students. The better understanding of the consumers in energy issues and the accumulation of public knowledge on energy topics will be enabled by making relevant comprehensive information available. For this purposes EMI cooperates actively with the media and takes advantage of the modern forms of internet communication.',
      ABOUT_MISSION_CONTENT_3: 'Since March 2014 EMI is a fully-pledged Bulgarian member of the biggest association on electricity industry in Europe - EURELECTRIC.',
      ABOUT_TEAM_CONTENT: 'team EN',
      ABOUT_CONTACT_CONTENT: 'contact EN'
    })
    .translations('bg', {
      HOME: 'Начало',
      ABOUT_US: 'За нас',
      MISSION: 'Мисия',
      TEAM: 'Екип',
      CONTACT: 'Контакти',
      OTHER_LANG: 'En',
      NEWS: 'Новини',
      ANALYSIS: 'Анализи',
      EVENTS: 'Събития',
      ENERGOPEDIA: 'Енергопедия',
      PARTNERS: 'Партньори',
      EMIS_ANALYSIS: 'на EMI',
      SUMMARIES: 'Резюмета',
      ENERGOPEDIA_CONTENT: 'можете да посетите изчерпателен речник на Евроелектрик на термините в електроенергийния сектор, разделен в различни категории - производство, мрежа, пазари, околна среда.',
      HERE: 'Тук', 
      ABOUT_MISSION_CONTENT_1: 'Институтът за Енергиен Мениджмънт (ЕMI) е неправителствена организация, която започва своята дейност през юни 2010. Мисията й е да допринася за устойчивото развитие на българската енергетика и интеграцията й към тази на Европейския Съюз. Подобряването на международното сътрудничество и взаимстването на международен опит цели въвеждането на утвърдени добри практики в България.',
      ABOUT_MISSION_CONTENT_2: 'EMI в ролята си на институт за публична политика предлага иновативни идеи в сферата на енергетиката като представя изследвания, използвайки академичен подход. EMI предоставя неутрална платформа за контакти и информационен обмен като създава предпоставки за сътрудничество в мрежа и активно създава партньорства в различните сфери на дейността си. EMI допринася за повишаването на квалификацията както на експертите от сектора, така и на студентите. Подобряването на ориентацията на потребителите по енергийни теми и натрупването на публично познание по енергийни въпроси се осъществяват чрез предоставяне на достъпна информация. За целта EMI съдейства активно с медиите като отдава и съществено значение на многообразните съвременни форми на интернет комуникацията.',
      ABOUT_MISSION_CONTENT_3: 'От март 2014 г. EMI е представител за България на най-голямата браншова асоциация на електроенергийната индустрия в Европа - EURELECTRIC.',
      ABOUT_TEAM_CONTENT: 'TEAM BG',
      ABOUT_CONTACT_CONTENT: 'CONTACT BG'
    });
  $translateProvider.preferredLanguage('bg');
}

module.exports = Translations
