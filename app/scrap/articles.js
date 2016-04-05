var osmosis = require('osmosis');
var _ = require("lazy.js");
var moment = require("moment-timezone");
var ObjectId = require("bson-objectid");
var Rx = require("rx");
var db = require('mongoskin').db('mongodb://localhost:27017/test');

var newsStream = function() {
  var newsStream = new Rx.Subject();
  osmosis
  .get('http://www.emi-bg.com/index.php?page=1&class=3')
  .paginate('.cat_stranicirane > span:not(.tochki_div):first + a', '.cat_stranicirane > a:last')
  .follow('.item_block > .cat_title > p.cat_name > a')
  .set({
    "title": { "bg": ".news_header > p"},
    "details": ".div_pod > .cat_autor",
    "html": {"bg": ".div_pod + div:html"}
  })
  .data(function(news) {
    newsStream.onNext(news);
  })
  .error(function(err) { newsStream.onError(err); })
  .log(console.log)
  .debug(console.log);

  return newsStream;
}

var handleNews = function(news) {
  var details = news.details;
  delete news.details;

  _(details).split(",").each(function(element) {
    var element = element.trim();
    if (element.indexOf("от:") == 0) {
      news.author = {};
      news.author.bg = element.substring(3).trim();
    } else if (element.indexOf("дата:") == 0) {
      news.date = moment(element.substring(5).trim(), "DD.MM.YYYY").valueOf();
      news.publicationDate = news.date;
    }
  });
  news.id = ObjectId(news.date);
  news._id = news.id;
  news.itemId = news.id;
  news.category = ["news"];
  news.migrated = true;
  news.deleted = false;
  news.published = true;
  news.image = {
    "config" : {
      "fill" : true,
      "horizontalAlign" : "center",
      "verticalAlign" : "center"
    },
    "url" : "http://placehold.it/120x80"
  }
  return news;
};

var insert = function(item) {
  if (item.date > moment("10.03.2016", "DD.MM.YYYY").valueOf()) return;
  db.collection('articles').insert(item, function(err, result) {
    if (err) console.log("ERROR cannot add an article with title:" + item.title.bg + JSON.stringify(err));
    if (result) console.log('SUCCESS adding an article with title:' + item.title.bg);
  });
};

newsStream()
.map(handleNews)
.forEach(insert, function(err) {console.log("err:" + err);});
//newsStream()
//.scan(function(acc, next) {return acc + 1;}, 0)
//.forEach(function(next) { console.log("NEXT:" + next);})

