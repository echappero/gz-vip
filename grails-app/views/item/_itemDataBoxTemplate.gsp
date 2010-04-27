<td>
	<g:if test="${itemV.site != null}">
		<div class="itemBox">
			<a href="/item?site=${itemV.site.siteId}&id=${itemV.id}">
				<img src="http://img1.mlstatic.com/jm/img?s=${itemV.site.siteId}&f=${itemV.image}&v=I"  alt ="${itemV.title}" border="0" width="70" height="70" vspace="5" />
			</a>
			<div class="titleArt">
				<span class="font11"><a href="/item?site=${itemV.site.siteId}&id=${itemV.id}">${itemV.title}</a></span>
			</div>
			<div class="pay">
				<span class="price2">$ ${itemV.price}</span>
			</div>
		</div>
	</g:if>
</td>