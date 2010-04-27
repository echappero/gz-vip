<div id=tabsN>
	<ul id=Community>
		<li id=HPreguntasalvendedor class="TabbedPanelsTab" group="Community">
			<a href="javascript:showTab('Preguntasalvendedor','CommunityCont');cambiarEstilos('HPreguntasalvendedor',1,'Community')"><span><g:message code="item.community.questionTab" /></span></a>
		</li>
        <li id=HCalifsDeCompradores class="TabbedPanelsTab" group="Community">
			<a href="javascript:showTab('CalifsDeCompradores','CommunityCont');cambiarEstilos('HCalifsDeCompradores',1,'Community')"><span><g:message code="item.community.califTab" /></span></a>
		</li>
	</ul>
</div>

<div id=CommunityCont>

  <div id=Preguntasalvendedor class="contentbox">
     <a name="toQuest"></a>
     <div style="text-align:right; width:99%"></div> 
     <div id=bigQues>
	 <g:render template="vp3QuesRow"/></div> 
    <script>
		if (!document.layers) 
			document.write('<div align="right"> <span id=lblPreguntas2 style=visibility:hidden> </span></div>');

  /**************************************************************
          Agregado por Cambarieri Fernando el dia 07/09/09
          para el projecto Q&A Registration and Daily Dail
   **************************************************************/ 
  function getParameter ( queryString, parameterName ) {
	   // Add "=" to the parameter name (i.e. parameterName=value)
	   var parameterName = parameterName + "=";
	   if ( queryString.length > 0 ) {
		  // Find the beginning of the string
		  begin = queryString.indexOf ( parameterName );
		  // If the parameter name is not found, skip it, otherwise return the value
		  if ( begin != -1 ) {
			 // Add the length (integer) to the beginning
			 begin += parameterName.length;
			 // Multiple parameters are separated by the "&" sign
			 end = queryString.indexOf ( "&" , begin );
			  if ( end == -1 ) {
				 end = queryString.length
				}
			  // Return the string
			  return unescape ( queryString.substring ( begin, end ) );
			}
		  // Return "null" if no parameter has been found
		  return "null";
		}
	}

   function goToQuestOn() {
      var queryString = window.top.location.search.substring(1);
	  var goToQuestOn = getParameter(queryString, "goToQuestOn");
	  return goToQuestOn == "Y";
   }

   function goToQuest() {
	if (goToQuestOn()) {
	   window.location.hash = 'toQuest';
	}
   }
   
   if (window.attachEvent){
	window.attachEvent ('onload', goToQuest);
   }else{
    window.addEventListener ('load', goToQuest, false);
   }
   /*********************** FIN 07/09/09 ***********************/ 
	</script> 
  <div class="askq-button"> 
  <table width="250" border="0" align="center"> 
    <tr> 
      <td align="center"><div style="width:auto;overflow:hidden;"><input type="button" class="but_sec_2" value="<g:message code="item.community.question" />" title="<g:message code="item.community.question" />" onclick="javascript:makeQues()" /></div></td> 
    </tr> 
  </table> 

    </div>  
  </div>
  <div class="contentbox" style="display: none;" id="CalifsDeCompradores">
     <div id="historyBuyer"><g:render template="calificacionesTemplate"/></div>
  </div>

</div> 