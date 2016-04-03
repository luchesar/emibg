var osmosis = require('osmosis');

osmosis
.get('http://www.emi-bg.com/index.php?page=1&class=3')
.paginate('.cat_stranicirane > span:not(.tochki_div):first + a')
.follow('.item_block > .cat_title > p.cat_name > a')
.set({
  "title": { "bg": ".news_header > p"},
  "details": ".div_pod > .cat_autor",
  "html": {"bg": ".div_pod + div:html"}
})
.data(function(news) {
  console.log("news:" + JSON.stringify(news));
})
.log(console.log)
.error(console.log)
.debug(console.log)
