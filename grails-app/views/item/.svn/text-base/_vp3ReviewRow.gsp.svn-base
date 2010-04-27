<a name="tab${rev.id}" <!--tab##ID##--></a> 
<div class="contopinion"> 
  <div class="titcalif"> 
    <div class="opcalif"><g:render template="starFormTemplate" var="qty" bean="${rev.points}" /><!--##RVW_CALIF## --> | </div> 
    <div style="" class="optitle">${rev.title} <!--##RVW_TITLE##--></div> 
  </div> 
  <div class="opbody"> 
    <div class="opautor"> <span class="autor_rev_link"><g:message code="item.opinion.autor"/> <b>${rev.customer?.nickname}<!--##RVW_CUST##--> (${rev.customer?.points})</b></span> </div> 
    <div class="proscons"> 
      <div class="pros"><b><g:message code="item.opinion.pros"/></b><br>${rev.pros} <!--##RVW_PROS##--></div> 
      <div class="contras"><b><g:message code="item.opinion.contras"/></b><br>${rev.contras} <!--##RVW_CONT##--></div> 
    </div> 
    <div class="opconcl"> 
      <p><b><g:message code="item.opinion.conclusion"/></b><br>${rev.contras} <!--##RVW_TEXT##--></p> 
    </div> 
    
        <div class="rbroundbox">
			<div class="rbtop">
            	<div></div>
			</div>
			<div class="rbcontent">
                    <div class="opvote">
                    <div id="votacion${rev.id}<!--##REVIEW_ID##-->" style="display:block;" class="votaciondiv">
	<div class="votetxt"><g:message code="item.opinion.votacion"/></div>
	<div class="btndiv">
    <input name="si" type="button" onclick="javascript:voteReview('${rev.id}',true);" value="Sí" class="btnSI"></div>
    <div class="btndiv">
    <input name="no" type="button" onclick="javascript:voteReview('${rev.id}',false);" value="No" class="btnNO"></div>
</div>

<div id="notReg" style="display:none; margin:5px 0;"><g:message code="item.opinion.votacion"/><img src="/org-img/t.gif" width="8">
<input name="si" type="image" onclick="login('${rev.id}',true);" value="Sí" src="/org-img/catalog/pdp/votar_si.gif" width="32" height="28">
<input name="no" type="image" onclick="login('${rev.id}',false);" value="No" src="/org-img/catalog/pdp/votar_no.gif" width="32" height="28"></div>

<div id="procesando" style="display:none;"><g:message code="item.opinion.procesar"/></div>

<div id="tks" style="display:none;"><g:message code="item.opinion.gracias"/></div>

<div id="error" style="display:none;"><!--##MSJ_ERROR##--></div>
                    <!--##VOTE_RVW##--></div>
    <div class="oputil" id="votos##ID##"><g:message code="item.opinion.votos" args="${ [rev.qtyPos, rev.qtyVotes] }" />
    <!--<b>##VOTE_POSITIVE##</b> de ##TOTAL_VOTE## usuarios <b> votaron como Ãºtil esta opiniÃ³n.</b> ##REVIEW_UTIL##--></div> 
    <div id="footerReview${rev.id}" class="tks"></div> 
			</div>
			<div class="rbbot">
				<div></div>
			</div>
        </div>
    
    <div class="opdenu"><div class="link_opden"></div><a href="http://www.mercadolibre.com.ar/argentina/ml/org_ayuda.main?as_new_tkt=2190&as_faq_rvw_id=${rev.id}&as_subject=Esta+opinion+no+cumple+con+las+politicas+del+sitio"><g:message code="item.opinion.denunciar"/></a> </div>  
  </div> 
</div>