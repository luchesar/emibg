var homeItemsSlider = [
    {type: "article", id: "1"},
    {type: "event", id: "4"},
    {type: "article", id: "7"}
]
var homeChartsSlider = [
    ["2", "1", "3"],
    ["3", "2", "1"]
];

  var charts = [
    {
       id: "1",
       type: 'chart-line',
       title: {
          bg: "Цени на петрола и газта 2015",
          en: "Gas and oil prices 2015"
       },
       labels: [{bg:"Януари",en:"January"}, {bg:"Февруари",en:"February"}, {bg:"Март",en:"March"}, {bg:"Април",en:"April"}, {bg:"Май",en:"May"}, {bg:"Юни",en:"June"}, {bg:"Юли",en:"July"}],
       series: [{bg:"Цена на Газта",en:'Price of Gas'}, {bg:"Цена на Петрола",en:'Price of Petrol'}],
       data: [
         [65, 59, 80, 81, 56, 55, 40],
         [28, 48, 40, 19, 86, 27, 90]
       ],
       legend: false
    },
    {
       id: "2",
       type: 'chart-pie',
       title: {
          bg: "Дял на възобновими източници в България",
          en: "Renewable energy sources share in Bulgaria"
       },
       labels: [{bg:"Вятър",en:'Wind'}, {bg:"ВЕЦ",en:'Water'}, {bg:"Слънчева", en:"Sun"}],
       data: [40, 40, 20],
       legend: true
    },
    {
       id: "3",
       type: 'chart-bar',
       title: {
          bg: "Дял на енергията произведена от възобновими източници",
          en: "Energy generate from renewable sources share"
       },
       labels: [{bg:"България",en:"Bulgaria"}, {bg:"Сърбия",en:"Serbia"}, {bg:"ЕС",en:"EU"}],
       series: [{bg:"Вятър",en:'Wind'}, {bg:"ВЕЦ",en:'Water'}, {bg:"Слънчева", en:"Sun"}],
       data: [
         [40, 40, 20],
         [39, 39, 22],
         [20, 20, 60]
       ],
       legend: false
    }
  ]

var partners = [
  {  "type": "member",
     "title": {
       "bg": "ЕВН България",
       "en": "EVN Bulgaria"
     },
     "tumb": "images/partners_thumbs/emi_members_evn.jpg",
     "site": "http://www.evn.bg/"
  },

  {   
    "type": "member",
     "title": {
       "bg": "Енерго-Про Варна",
       "en": "Energo-Pro Varna"
     },
     "tumb": "images/partners_thumbs/emi_members_energo-pro.jpg",
     "site": "https://www.energo-pro.bg/"
  },

  { 
    "type": "member",
     "title": {
       "bg": "ЧЕЗ България",
       "en": "CEZ Bulgaria"
     },
     "tumb": "images/partners_thumbs/emi_members_cez.jpg",
     "site": "http://www.cez.bg/"
  },

  { 
    "type": "member",
     "title": {
       "bg": "Ей и Ес 3С Марица Изток І",
       "en": "AES – 3C Maritza East I."
     },
     "tumb": "images/partners_thumbs/emi_members_aes.jpg",
     "site": "http://aes.bg/"
  },

<!---->

  { 
    "type": "partner",
     "title": {
       "bg": "Национална енергийна камара",
       "en": "National Energy Chamber"
     },
     "tumb": "images/partners_thumbs/emi_partners_national_energy_chamber.jpg",
     "site": "http://necbg.eu/bg/"
  },

  { 
    "type": "partner",
     "title": {
       "bg": "Българска фотоволтаична асоциация",
       "en": "Bulgarian photovoltaic association"
     },
     "tumb": "images/partners_thumbs/emi_partners_bpva.jpg",
     "site": "http://www.bpva.org/"
    },

    { 
    "type": "partner",
     "title": {
       "bg": "Университет за национално и световно стопанство",
       "en": "University of National and World Economy"
     },
     "tumb": "images/partners_thumbs/emi_partners_unwe.jpg",
     "site": "http://www.unwe.bg/"
  },

  { 
    "type": "partner",
     "title": {
       "bg": "Българска стопанска камара",
       "en": "Bulgarian Industrial Association"
     },
     "tumb": "images/partners_thumbs/emi_partners_bia.jpg",
     "site": "http://www.bia-bg.com/"
  },

  { 
    "type": "partner",
     "title": {
       "bg": "Дипломатически институт при МВнР",
       "en": "Diplomatic Institute - Ministry of Foreign Affairs"
     },
     "tumb": "images/partners_thumbs/emi_partners_bdi.jpg",
     "site": "http://bdi.mfa.government.bg/"
  },

  { 
    "type": "partner",
     "title": {
       "bg": "Българска Асоциация за Природен Газ",
       "en": "Bulgarian Association Natural Gas"
     },
     "tumb": "images/partners_thumbs/emi_partners_naturalgas.jpg",
     "site": "http://www.naturalgas.bg/"
  },

  { 
    "type": "partner",
     "title": {
       "bg": "Българска федерация на индустриалните енергийн консуматори",
       "en": "Bulgarian Industrial Association"
     },
     "tumb": "images/partners_thumbs/emi_partners_bfiec.jpg",
     "site": "http://bfiec.org/"
  },

  { 
    "type": "partner",
     "title": {
       "bg": "Черноморски изследователски енергиен център",
       "en": "Black Sea Energy Research Centre"
     },
     "tumb": "images/partners_thumbs/emi_partners_bserc.jpg",
     "site": "http://www.bserc.eu/"
  },

  { 
    "type": "partner",
     "title": {
       "bg": "Национален комитет на България в Световния енергиен съвет",
       "en": "National Committee of Bulgaria for the World Energy Council"
     },
     "tumb": "images/partners_thumbs/emi_partners_wec.jpg",
     "site": "http://www.wec-bulgaria.org/about-us/wec/"
  },

  { 
    "type": "partner",
     "title": {
       "bg": "Български енергиен и минен форум",
       "en": "Bulgarian Energy and Mining Forum"
     },
     "tumb": "images/partners_thumbs/emi_partners_bulenergy.jpg",
     "site": "http://bulenergyforum.org"
  },

  { 
    "type": "partner",
     "title": {
       "bg": "Българско училище за политика",
       "en": "Bulgarian School of politics"
     },
     "tumb": "images/partners_thumbs/emi_partners_school_politics.jpg",
     "site": "http://www.schoolofpolitics.org"
  },

  { 
    "type": "partner",
     "title": {
       "bg": "Овергаз Инк.",
       "en": "Overgas"
     },
     "tumb": "images/partners_thumbs/emi_members_overgas.jpg",
     "site": "http://www.overgas.bg/"
  }

  //{ 
  //   "type": "partner",
  //    "title": {
  //      "bg": "3E News",
  //      "en": "3E News"
  //    },
  //    "tumb": "images/partners_thumbs/emi_partners_3e.jpg",
  //    "site": "http://3e-news.net/"
  // },

  // { 
  //   "type": "partner",
  //    "title": {
  //      "bg": "Капитал",
  //      "en": "Capital"
  //    },
  //    "tumb": "images/partners_thumbs/emi_partners_capital.jpg",
  //    "site": "http://www.capital.bg/"
  // }



  ]

  var teams = [
   {
      "id": "1",
      "name": {
        "bg": "Славчо Нейков",
        "en": "Slavtcho Neykov"
      },
      "job": {
        "bg": "Председател на УС",
        "en": "Chair of the Management Board of EMI"
      },
      "email": "slavtcho.neykov@emi-bg.com",
      "phone": {
        "bg": "(02) 980 07 03",
        "en": "+359 2 980 07 03"
      },
      "bio1": {
        "bg": "Славчо Нейков е с повече от 25 години непрекъснат стаж в енергийния сектор, включително и като главен секретар на Министерство на енергетиката, Комисар в енергийния регулатор, експерт в Секретариата на Енергийната Харта в Брюксел, Директор на Секретариата на Енергийната Общност във Виена.",
        "en": "Mr. Slavtcho Neykov has more than 25 years non-interrupted experience in the energy sector, including as Secretary General of the Bulgarian Ministry of Energy, Commissioner in the State Energy Regulatory Commission, expert at the Energy Charter Secretariat in Brussels and a Director of the Energy Community Secretariat in Vienna."
      },
      "bio2": {
        "bg": "Освен работата му като служител в държавни и международни институции, той е бил в ръководството на няколко енергийни компании.",
        "en": "Further to his experience as a state and international official, he has been on the board of managers of several energy companies."
      },
      "bio3": {
        "bg": "Извън енергийния сектор е работил като прокурор и юрисконсулт.",
        "en": "Prior to his involvement in the energy sector, he has worked as a state prosecutor and a legal advisor."
      },
      "bio4": {
        "bg": "Г-н Нейков е завършил Юридическия факултет на Софийския университет; има също така и двегодишна специализация по международни икономически отношения, както и магистърска степен по европейска интеграция от Университета “Лимерик” в Ирландия.",
        "en": "In addition to a law degree from the Sofia University, Mr. Neykov has completed two years postgraduate studies on International Economic Relations and Foreign Economic Activities. He also holds Master of Arts in European Integration from the University of Limerick in Ireland."
      },
      "bio5": {
        "bg": "От декември 2014 г. е Председател на УС на Института за енергиен мениджмънт.",
        "en": "Since the end of 2014, he is the Chairman of the Board of Managers of the Energy Management Institute in Sofia."
      },
      "bio6": {
        "bg": "Член на Борда директорите на ЕВРОЕЛЕКТРИК.",
        "en": "Mr. Neykov is also a member of the Board of Directors of EURELECTRIC."
      },
      "image": "images/thumbs/thumb1.jpg" 
    },

    {
          "id": "2",
          "name": {
            "bg": "Иванка Диловска",
            "en": "Ivanka Dilovska"
          },
          "job": {
            "bg": "Член на УС",
            "en": "Member of  the Management Board of EMI"
          },
          "email": "ivanka.dilovska@emi-bg.com",
          "phone": {
            "bg": "(02) 980 07 03",
            "en": "+359 2 980 07 03"
          },
          "image": "images/thumbs/thumb2.jpg"  
        },

        {
          "id": "3",
          "name": {
            "bg": "Жана Георгиева",
            "en": "Jana Georgieva"
          },
          "job": {
            "bg": "Политики и анализи",
            "en": "Policy and Research"
          },
          "email": "jana.georgieva@emi-bg.com",
          "phone": {
            "bg": "(02) 980 07 22",
            "en": "+359 2 980 07 22"
          },
          "image": "images/thumbs/thumb3.jpg"  
        },

        {
            "id": "4",
            "name": {
              "bg": "Весела Катрева",
              "en": "Vesela Katreva"
            },
            "job": {
              "bg": "Програми и проекти",
              "en": "Programmes and Projects"
            },
            "email": "vesela.katreva@emi-bg.com",
            "phone": {
              "bg": "(02) 980 07 14",
              "en": "+359 2 980 07 14"
            },
            "image": "images/thumbs/thumb4.jpg" 
          },

          {
            "id": "5",
            "name": {
              "bg": "Дияна Стоянова",
              "en": "Diyana Stoyanova"
            },
            "job": {
              "bg": "Комуникации",
              "en": "Communication Officer"
            },
            "email": "diyana.stoyanova@emi-bg.com",
            "phone": {
              "bg": "(02) 980 07 13",
              "en": "+359 2 980 07 13"
            },
            "image": "images/thumbs/thumb5.jpg" 
          },

          {
            "id": "6",
            "name": {
              "bg": "Анжела Тонева",
              "en": "Angela Toneva"
            },
            "job": {
              "bg": "Регулаторни и административни въпроси",
              "en": "Regulatory and administrative issues"
            },
            "email": "angela.toneva@emi-bg.com",
            "phone": {
              "bg": "(02) 980 07 03",
              "en": "+359 2 980 07 03"
            },
            "image": "images/thumbs/thumb5.jpg" 
          }

   ]



var data = {
  partners: partners,
  teams: teams,
  charts: charts,
  homeChartsSlider: homeChartsSlider,
  homeItemsSlider: homeItemsSlider
};

module.exports = data;
