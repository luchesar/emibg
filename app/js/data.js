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
  { 
     "title": {
       "bg": "ЕВН България",
       "en": "EVN Bulgaria"
     },
     "tumb": "images/partners_thumbs/emi_members_evn.jpg",
     "site": "http://www.evn.bg/"
  },

  { 
     "title": {
       "bg": "Енерго-Про България",
       "en": "Energo-Pro Bulgaria"
     },
     "tumb": "images/partners_thumbs/emi_members_energo-pro.jpg",
     "site": "https://www.energo-pro.bg/"
  },

{ 
     "title": {
       "bg": "Овергаз Инк.",
       "en": "Overgas"
     },
     "tumb": "images/partners_thumbs/emi_members_overgas.jpg",
     "site": "http://www.overgas.bg/"
  },

  { 
     "title": {
       "bg": "ЧЕЗ България",
       "en": "CEZ Bulgaria"
     },
     "tumb": "images/partners_thumbs/emi_members_cez.jpg",
     "site": "http://www.cez.bg/"
  },

  { 
     "title": {
       "bg": "Българска Асоциация за Природен Газ",
       "en": "Bulgarian Association Natural Gas"
     },
     "tumb": "images/partners_thumbs/emi_partners_naturalgas.jpg",
     "site": "http://www.naturalgas.bg/"
  },

  { 
     "title": {
       "bg": "Българска стопанска камара",
       "en": "Bulgarian Industrial Association"
     },
     "tumb": "images/partners_thumbs/emi_partners_bia.jpg",
     "site": "http://www.bia-bg.com/"
  },

  { 
     "title": {
       "bg": "Българска федерация на индустриалните енергийн консуматори",
       "en": "Bulgarian Industrial Association"
     },
     "tumb": "images/partners_thumbs/emi_partners_bfiec.jpg",
     "site": "http://bfiec.org/"
  },

  { 
     "title": {
       "bg": "Български енергиен и минен форум",
       "en": "Bulgarian Energy and Mining Forum"
     },
     "tumb": "images/partners_thumbs/emi_partners_bulenergy.jpg",
     "site": "http://bulenergyforum.org"
  },

  { 
     "title": {
       "bg": "Българско училище за политика",
       "en": "Bulgarian School of politics"
     },
     "tumb": "images/partners_thumbs/emi_partners_school_politics.jpg",
     "site": "http://www.schoolofpolitics.org"
  },

  { 
     "title": {
       "bg": "Дипломатически институт при МВнР",
       "en": "Diplomatic Institute - Ministry of Foreign Affairs"
     },
     "tumb": "images/partners_thumbs/emi_partners_bdi.jpg",
     "site": "http://bdi.mfa.government.bg/"
  },

  { 
     "title": {
       "bg": "Национален комитет на България в Световния енергиен съвет",
       "en": "National Committee of Bulgaria for the World Energy Council"
     },
     "tumb": "images/partners_thumbs/emi_partners_wec.jpg",
     "site": "http://www.wec-bulgaria.org/about-us/wec/"
  },

  { 
     "title": {
       "bg": "Черноморски изследователски енергиен център",
       "en": "Black Sea Energy Research Centre"
     },
     "tumb": "images/partners_thumbs/emi_partners_bserc.jpg",
     "site": "http://www.bserc.eu/"
  },

  { 
     "title": {
       "bg": "Университет за национално и световно стопанство",
       "en": "University of National and World Economy"
     },
     "tumb": "images/partners_thumbs/emi_partners_unwe.jpg",
     "site": "http://www.unwe.bg/"
  },

  { 
     "title": {
       "bg": "3E News",
       "en": "3E News"
     },
     "tumb": "images/partners_thumbs/emi_partners_3e.jpg",
     "site": "http://3e-news.net/"
  },

  { 
     "title": {
       "bg": "Капитал",
       "en": "Capital"
     },
     "tumb": "images/partners_thumbs/emi_partners_capital.jpg",
     "site": "http://www.capital.bg/"
  }
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
              "bg": "Програми и проекти",
              "en": "Programmes and Projects"
            },
            "email": "diyana.stoyanova@emi-bg.com",
            "phone": {
              "bg": "(02) 980 07 13",
              "en": "+359 2 980 07 13"
            },
            "image": "images/thumbs/thumb5.jpg" 
          },

   ]



var data = {
  partners: partners,
  teams: teams,
  charts: charts,
  homeChartsSlider: homeChartsSlider,
  homeItemsSlider: homeItemsSlider
};

module.exports = data;
