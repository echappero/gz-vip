<html>
	<head>
		<title>${item?.title}</title>
		<!-- link para canonicalization <canonical:set uri="/item/${item?.getSite().siteId}/${item?.id}/${item?.normalizeTitle()}" /> -->
		<canonical:show />
		<g:render template="stylesAndScriptsTemplate"/>
	</head>
<body>
	<div id="oasTOP" class="banner_top"><div class="publi"></div></div>
	<div id="ml_layer">
	</div>
	<div id="containall"> <g:render template="bannerTemplate"/>
	<g:render template="menuTemplate"/>
	  <div style="position:relative; margin:0"> 
		<div class="sprite-sp1"></div> 
		<div class="sprite-sp2"></div> 
	  </div> 
	  <div class="BigContainer"> 
	  
		<div id="pathcateg"> 
		  <div class="backlist"> <g:render template="volverAlListadoTemplate"/></div> 

		  <div class="breadcrumb"> <!--##CATEGORY_PATH##--><g:categPath item="${item}" /></div> 

		</div> 
	   
	<!--##MP_CHECKOUT_MESSAGE##-->
		<!-- PREHEADER --> 
		<div><!--##PREHEADER##--></div> 
		<!-- TITULO DEL ITEM --> 
		<g:render template="headerTemplate"/>
		<!--START DESCRIPCION --> 
		<!--##DESCRIPTIONS_TABS##--><g:render template="descriptionLblTemplate"/>
		<!-- MIDCONTENT START -->
		<div> <!--##GARANTIA_BOX##--><g:render template="midContentTemplate"/> <br /> 
		  <!-- BOX BUY BOTTOM --> <g:render template="shipmentPaymentsTemplate"/>
		  <g:render template="buyBoxTemplate"/><br />
		  <!--MIDCONTENT END --> 
		</div> 
		<nolayer> 
		<iframe id=iframeShowHits scrolling=no width=0 height=0 framespacing=0 frameborder=0></iframe> 
		</nolayer>
		<!-- START PREGUNTAS--> 
		<!--##COMMUNITY_TABS##--><g:render template="communityTemplate"/>
		 <!--##TABS_SCRIPTS##--><g:render template="tabsScriptTemplate"/>
		<div name="attr_help" class="LayerAyuda"><g:render template="hidenLayersTemplate"/></div> 
	  </div> 
	  <br />
	<!-- BOX EDUCATION --> 
	<g:render template="educationTemplate"/><br /> 
			<!-- ART Vendedor --> 
			<div>
				<div id=ItemsSellerFrame style="clear: both;">
				<g:render template="itemsSellerTemplate"/>
				</div>
			</div>
			<!-- ART Vendedor --> 
	<!-- MercadoClics Banner Bottom -->
	<!--##MCLICS_BTM##--><g:render template="mclicksBtmTemplate"/>
	<!-- MercadoClics Banner Bottom -->
	<g:render template="middleScriptTemplate"/>
	<br />
	<g:render template="vp3FooterTemplate"/> </div>
	<g:render template="pmsToolidsTemplate"/>
	<br/>
	<div id="timeElapsed" style="color:blue;font-weight:bold" align="center">
	TimeElapsed = ${new Date().getTime() - initTime.getTime()} Milliseconds
	</div>
</body>
</html>
