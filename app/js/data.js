var articles = [
   { 
     id: "1",
     title: {
       bg: "Статия 1",
       en: "Article one"
     },
     category: ["analysis", "emis"],
     tumb: "images/thumbs/thumb1.jpg",
     author: {
       bg: "Пейчо Пейковски",
       en: "Peicho Peikowski"
     },
     date: "23/12/2014T21:45:53.234",
     html: {
       bg: "Това е статия едно",
       en: "This is article one"
     }
   },
   { 
     id: "2",
     title: {
       bg: "Article 2",
       en: ""
     },
     category: ["news"],
     tumb: "images/thumbs/thumb2.jpg",
     author: {
       bg: "Трайчо Косто",
       en: ""//no english translation
     },
     date: "23/12/2014T21:45:53.234",
     html: {
       bg: "Това е статия две",
       en: "This is article two"
     },
     tags: ["tag1", "tag2"]
   }
 ];

var categories = [
    "news", "analysis", "emis", "resumes", "events", "energopedia", "partners"
]

var data = {
    articles: articles,
    caterogies: categories
}

module.exports = data;
