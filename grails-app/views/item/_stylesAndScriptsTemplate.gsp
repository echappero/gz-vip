<link rel="shortcut icon" href="http://www.mercadolibre.com/favicon.ico"/>
<link rel="stylesheet" href="http://www.mercadolibre.com.ar/jm/ml.api.webcomponent.CascadingStyleSheetsController?v=201003191630.css&name=VIP3&visualId=STD&templateID=C_CI_TEMPLATE"/>
<style type="text/css">
.contentbox{height: auto;}
.wrap2{height: auto;}
.wrap3{height: auto;}
</style>
<script>
var valItemId = ${item?.id};
var valItemSite = "${item?.site?.siteId}";
var visualId = "STD";
var urlBaseSite = "http://www.mercadolibre.com.ar";
var urlDefault = "http://www.mercadolibre.com.ar/argentina/ml/";
var urlBase = "http://"+window.location.host;
var oldUrl = window.location.href;
var urlLastCategPath = "http://www.mercadolibre.com.ar/jm/search?as_categ_id=${item?.category?.id}";
var categId= "${item?.category?.id}";
var productId = "${item?.listStyle2 ?: 0}";
var valBidSeq = "##VAL_BID_SEQ##";
var urlJSSL = "##URL_JSSL##";
var valCustId = "${item?.seller?.id}";
var valGmve = "##GMVE##";
var valQty = "##QTY_SOLD##";
var keyPixRnd = "##KEY_PIX_RND##";
</script>
<script language="javascript">
	var atlasPoolSufix = "_PA";
        var urlBaseAtlas = "";
        var atlasPoolSufixForRegInt = "_PA";
</script>
<p:javascript src="vip2"/>
<!-- script src="http://www.mercadolibre.com.ar/jm/ml.api.webcomponent.JavaScriptController?name=VIP3&visualId=STD&v=20100319.js"></script -->
<script src="http://www.mercadolibre.com.ar/org-img/jsapi/paramNSMLA.js"></script>
<script>
performNaturalCheck(document.referrer, location.pathname);
addClickListener(clickEvent);
addKeyListener(keyPressEvent);
</script>
<script>
var urlBase = "http://www.mercadolibre.com.ar";
var urlBaseWithSSL = "https://www.mercadolibre.com.ar";

var contentIsEnabled	= true;
var autocenterIsEnabled	= true;
var loadingIsEnabled	= true;

var cnt_width  = '790px';
var cnt_src    = urlBase+'/jm/item?act=confirmBid&vip3=Y&id=${item?.id}&site=${item?.site?.siteId}';
var img_src    = 'http://www.mercadolibre.com.ar/org-img/vip3/layer/loading230x180.gif';

var loading_width  = '230px';
var loading_height = '180px';

var image = new Image();
image.src = 'http://www.mercadolibre.com.ar/org-img/vip3/layer/loading230x180.gif';

//Switch RegInt en preguntar
var flagRegIntQuest = 'Y' == 'N';

var destQuest = urlBase+'/jm/item?act=showQuesForm&vip3=Y';
//var destQuest = urlBaseWithSSL+'/jm/item?act=showQuesForm&vip3=Y&id=${item?.id}&site=${item?.site?.siteId}&vipRegInt=N';
function getCurrentUrlBase() {
    return "http://articulo.mercadolibre.com.ar";
}
</script>
