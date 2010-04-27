<g:each var="ques" in="${meli.Question.findAllByItem(item, [max: 30])}" status="i">
	<div class="wrap1" id="tableQues${i+1}"> 
	  <div class="wrap2"> 
		 <div class="side"><b><g:message code="item.vp3QuesRow.question" default="Pregunta"/></b><br />
		 </div> 
	  <div class="bloque"><!-- ##PREGUNTA## -->${ques?.question}</div> 
	<div class="denuncia2"><a class="font10" href=##URL_DENUNCIA_P##><!-- ##P_DENUNCIA_LBL## -->
	<a href="javascript:showDenunForm(${ques?.id},'QUES','Y')" class="font10"><g:message code="item.vp3QuesRow.denunciateQuestion" /></a></a></div></div>  
	   <!-- ##RESPUESTA_ROW## --><g:if test="${ques?.answer}">
	<div class="wrap3"> 
	  <div class="side"><b><g:message code="item.vp3QuesRow.answer" default="Respuesta"/></b><br /> 
		<span class="font10"><!-- ##FECHA_R## --><g:formatDate date="${ques?.answerDt}"/></span></div> 
	  <div class="bloque"><!-- ##RESPUESTA## -->${ques?.answer}</div> 
	  <div class="denuncia2"><a class="font10" href=##URL_DENUNCIA_R##  ><!-- ##R_DENUNCIA_LBL## -->
	  <a href="javascript:showDenunForm(${ques?.id},'ANSW','Y')" class="font10"><g:message code="item.vp3QuesRow.denunciateAnswer" /></a>
	  </a></div> 
	</div>
	</g:if></div>
</g:each>