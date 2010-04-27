<b>Link original:</b> <a href="/grails_vip/item/mostrar?id=1&site=MLA">/grails_vip/item/mostrar?id=1&site=MLA</a>
<br>
<hr>
<br>
<b>Link para SEO 1:</b> <a href="${createLink(mapping: 'seoItem1', params: [id:id, site:site, title:title])}">${createLink(mapping: 'seoItem1', params: [id:id, site:site, title:title])}</a>
<br>
<ul>
<li>Valida el siteId</li>
<li>Usa el mismo m&eacute;todo mostrar del ItemController ya que el mapping puede extraer todos los par&aacute;metros necesarios</li>
<li>La URL se mantiene</li>
</ul>
<br>
<hr>
<br>
<b>Link para SEO 2:</b> <a href="${createLink(mapping: 'seoItem2', params: [query:'item-'+site+'-'+id+'-'+title])}">${createLink(mapping: 'seoItem2', params: [query:'item-'+site+'-'+id+'-'+title])}</a>
<br>
<ul>
<li>El siteId debe validarlo el controller</li>
<li>Requiere un nuevo m&eacute;todo en el controller para renderizar ya que el mapping no puede extraer todos los par&aacute;metros necesarios</li>
<li>Redirige a <a href="/grails_vip/item/mostrar/1?site=MLA">/grails_vip/item/mostrar/1?site=MLA</a></li>
</ul>
<br>
<hr>
<br>
Todos canonicalizan al link para SEO 1 como ejemplo, gracias al plugin grails-canonical-0.1