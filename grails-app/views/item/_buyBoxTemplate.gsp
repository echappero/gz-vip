<div id="boxgral"> 
    <table width="100%"> 
      <tr> 
        <td valign="top"> <div class="buybottom-details"> <div class="titles2">${item?.title}</div> 
            <div> 
              <div class="buybottom-label"><!--##LBL_PRECIO_A##--><g:message code="item.buyBox.actualPrice" /></div> 
              <div class="buybottom-value"><g:price amount="${item?.price}"/><!--##LBL_CADA_UNO## --> <g:message code="item.buyBox.forEach" /> <span class="fontGrey"><!--##VAL_TIPO_PROD##--><g:message code="item.buyBox.newItem" /></span> <!--##LOGO_SN##--> </div> 
              <div> 
                <table width="450" cellpadding="0" cellspacing="0">
                   <g:render template="mPBoxTemplate"/>
                </table> 
              </div> 
            </div> 
          </div></td> 
        <td align="center" width="230"> <div class="buybottom-actions"><div id=itmTimeLeftBottom style="display:none;" class="endingtaq"><span id=TimeLeftBottom > </span> 
</div>
<div class="purchase"><input type="button" id="BidButtonTop" onclick="showLayer()" class="but_pri_1" value="<g:message code="item.buyBox.buy" />" title="<g:message code="item.buyBox.buy" />"></div> 
<!--##ACTIONS_MIRA_FRIEND##--><span class="font11"><a href=javascript:mailPopUp();><g:message code="item.buyBox.sendFriend" /></a> | <a href=javascript:enLaMira();><g:message code="item.buyBox.follow" /></a></span></div></td> 
      </tr> 
    </table> 
</div>
