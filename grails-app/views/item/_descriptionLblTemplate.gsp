<div id=tabsN>
	<ul id=description>
		<li id=HDescripción class="TabbedPanelsTab" group="description">
			<a href="javascript:showTab('Descripción','descriptionCont');cambiarEstilos('HDescripción',0,'description')"><span><!--##DESC_LBL##--><g:message code="item.descriptionLbl.description" /></span></a>
		</li>
		<g:if test="${item?.catalogProduct?.reviews?.size() > 0}">
			<li id="HOpinionesdelproducto" class="TabbedPanelsTab" group="description">
				<a href="javascript:showTab('Opiniones','descriptionCont');cambiarEstilos('HOpinionesdelproducto',0,'description')">
				<span><!--##STARS##--><g:render template="starFormTemplate" var="qty" bean="${item?.catalogProduct?.getBallsImageLink()}" /> <!--##QUANTITY##-->${item?.catalogProduct?.reviews?.size()} <!--##LBL_OPINIONES##--><g:message code="item.opinion.opiniones"/> <!-- ##LINK## --></span></a>
			</li>
		</g:if>
	</ul>
</div>
<div id="descriptionCont">
	<div style="display: block;" id="Descripción" class="contentbox">
<div id="itemEditDescrML">
 ${item?.description}
</div></div>
<g:if test="${item?.catalogProduct?.reviews?.size() > 0}">
	<div id="Opiniones" style="display: none;" class="contentbox" align="center">
	  <div id="reviewsTab"><div id="solopis">
	  <div class="fondo"><h2><g:message code="item.descriptionLbl.opinions"/></h2></div>
	  <div id="attr" style="margin-top: 10px;"><!-- STARS -->
	<div id="promedio">
	    <h3><g:message code="item.descriptionLbl.prom"/></h3>
	    <span class="promedio">
	    <g:render template="starFormTemplate" var="qty" bean="${item?.catalogProduct?.getBallsImageLink()}" /><br>de <b>${item?.catalogProduct?.reviews?.size()} <g:message code="item.descriptionLbl.opinions2"/></b></span>
	</div>
	
	<div id="distribucion">
	    <h3><g:message code="item.descriptionLbl.dist"/></h3>	    
	    <div class="marcadores"><g:message code="item.descriptionLbl.score"/><br><div class="lblquant"><g:message code="item.descriptionLbl.opinions"/></div></div>
	    
	    <div class="colstar">
	        <img src="/org-img/reviews/5BALLSON.gif" align="absbottom"><br><div class="quant">${item?.catalogProduct?.qty5}</div>
	    </div>
	        
	    <div class="colstar">
	        <img src="/org-img/reviews/4BALLSON.gif" align="absbottom"><br><div class="quant">${item?.catalogProduct?.qty4}</div>
	    </div>
	    
	    <div class="colstar">
	        <img src="/org-img/reviews/3BALLSON.gif" align="absbottom"><br><div class="quant">${item?.catalogProduct?.qty3}</div>
	    </div>
	    
	    <div class="colstar">
	        <img src="/org-img/reviews/2BALLSON.gif" align="absbottom"><br><div class="quant">${item?.catalogProduct?.qty2}</div>
	    </div>
	    
	    <div class="colstar">
	        <img src="/org-img/reviews/1BALLSON.gif" align="absbottom"><br><div class="quant">${item?.catalogProduct?.qty1}</div>
	    </div>
	</div>
	<div id="separador"></div>
	<div class="Spacer"></div></div>
	<div class="Spacer"></div>
	</div>
	<div id="list_reviews"><g:render template="vp3ReviewRow" var= "rev" collection="${item.catalogProduct?.reviews}"/> </div>
	</div>
	</div>
</g:if>
</div>