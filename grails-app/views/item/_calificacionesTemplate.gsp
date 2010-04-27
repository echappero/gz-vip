<div class="titcals titles2"><!--##LBL_COMPRARON_ART##--><g:message code="item.calificaciones.labelCompraronArt" /></div>
<div style="text-align:right"><!--##UPPER_PAGINATOR##--></div>
<div class="wrap1">
<!--##HISTORY_LIST##-->
   <g:each var="calification" in="${meli.Calification.findAllByItem(item, [max:20])}">
      <div class="side-icon">
       <!--##IMG_CALIF##-->
        <g:if test="${calification?.valueCalif == 1}">
        <img src="http://www.mercadolibre.com.ar/org-img/calif/pos_fb2.gif" width="16" height="16" align="absmiddle">
        </g:if>
        <g:elseif test="${calification?.valueCalif == 2}">
        <img src="http://www.mercadolibre.com.ar/org-img/calif/neu_fb2.gif" width="16" height="16" align="absmiddle">
        </g:elseif>
        <g:elseif test="${calification?.valueCalif == 3}">
        <img src="http://www.mercadolibre.com.ar/org-img/calif/neg_fb2.gif" width="16" height="16" align="absmiddle">
        </g:elseif>
      
      </div>

      <div class="bloque-cal">
      <div class="tit_cal">
      <div class="nickcal"><b><!--##NICK_NAME##-->${calification?.customer?.nickname}  (${calification?.customer?.points}) </b>
      </div>
      <div class="date-cal"><!--##FECHA_CALIF##--><g:formatDate date="${calification?.fecha}"/></div>
      </div>
      <!--##COMENTARIO##-->"${calification?.textoCalif}"</div>

      <div class="separator2"></div>
   </g:each>
<br>
<div class="gotop" style="margin-right:10px"><!--##VER_TODAS_CALIF##--><a href="#"><!--##LINK##--><!--##VER_TODAS##--><g:message code="item.calificaciones.verTodas" /></a></div>
<!--##LOWER_PAGINATOR##-->