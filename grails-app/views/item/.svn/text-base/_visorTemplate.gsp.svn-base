
<script>

var imgSize500 = "v=O";
var imgSize250 = "v=E";
var imgSize90 = "v=M";
var actual = 1;
var imgDesplazadas = 1;
var srcImgAmpl = "/jm/item?vip3=Y&act=showVisor&site="+ valItemSite + "&id="+ valItemId +"&nroImg=";
var srcImgZoom = "/org-img/vip3/visor/zoomB.gif";
var fotosAMostrar = 4;
var totalFotos = 1;
var vid = "";
//AGREGADO
var srcMainImg = "http://www.mercadolibre.com.ar/jm/img?s=${item?.site?.siteId}&f=${item?.image}&v=E";
var rotacionDeImagenes = false;
var cantFotosCargadas = 0;
var buttonActionNumber = 0;
</script>
<style>
div.float {
  float: left; padding: 2px;
 }
.imageOver{
	background:url(/org-img/vip3/visor/zoomB.gif) no-repeat 50% 50%;	
	filter:alpha(opacity=80);
	-moz-opacity: 0.8;
	-khtml-opacity: 0.8;
	opacity: 0.8;	
}
</style>
<!--
****************************************************************************************************************
					VISOR HTML
****************************************************************************************************************
-->
<script>
var maxSize;
var preImg;

function setMaxWidth(){
	preImg = new Image();
	
	preImg.onload = preLoadMaxSize;
	preImg.src = srcMainImg;
}

function preLoadMaxSize(){
	maxSize = preImg.width;
	document.getElementById("mainImg").width = maxSize;
}

function moveToTope(){window.scroll(0,0);}

</script>
<table align="center" class="photoframe">
	<tr>
		<td align="center" width="280" height="280" id="tdMainImg">
			<div id="divMainImg" style="display:inline">
			<a href="javascript:showVisor()" id="linkMainImg">
				<img src="http://www.mercadolibre.com.ar/jm/img?s=${item?.site?.siteId}&f=${item?.image}&v=E" id="mainImg" border="none" align="top" alt="${item?.title}" title="${item?.title}"/>
			</a>
			</div>
		
		</td>
	</tr>
	
</table>
<script>	
	setMaxWidth();
	checkBrowserWidth();
	window.onresize = checkBrowserWidth;
        if(totalFotos > 1){
            document.getElementById('img1').className = 'imagenSeleccionada';
        }
        
</script>