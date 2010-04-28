package meli

import grails.converters.*
//import org.ho.yaml.Yaml
import grails.plugin.springcache.annotations.*

class ItemController {
	def scaffold=true

	def calculatorService

	def index = {
		redirect(action:list)
	}

//	@Cacheable("vipCache")
	def mostrar = {
		Date initAppTime= new Date()
		Site site = Site.findBySiteId(params.site)
		Item itemEntity = Item.findBySiteAndId(site, params.id)
		if (!site || !itemEntity) {
			redirect(url:"http://articulo.mercadolibre.com.ar/MLA-1-_JM")
			return
		}
		else {
			int qtyCoutas = 6
			HashMap cuotas = [cant:qtyCoutas, price:calculatorService.calculate(itemEntity?.price, qtyCoutas, 1.00)]
			itemEntity.catalogProduct?.calculateReviewsSummary()
			[item: itemEntity, cuotas: cuotas, initTime: initAppTime]
		}
	}
	
	def converterMap = [
	                    "xml":{list-> render list as XML},
						"json":{list-> render list as JSON},
						"yaml":{list -> render Yaml.dump(list)}
	]
	
	def restFul = {
		Site site = Site.findBySiteId(params.site)
		String ext = params.ext
		converterMap[ext]( Item.findBySiteAndId(site, params.id))		
	}
	
	def seoLink = {
		Item itemEntity = Item.findById(params.id)
		if (!itemEntity) {
			render "El item no existe"
		}
		else {
			[id: params.id, site: itemEntity.site.siteId, title: itemEntity.normalizeTitle()]
		}
	}
	
	def mostrarSeo = {
		log.debug ">>> mostrarSeo"
		log.debug "params= $params"
		log.debug "params.query= ${params.query}"
		String[] paramsArray = params.query.split("-")
		log.debug "paramsArray[0]= ${paramsArray[0]}"
		log.debug "paramsArray[1]= ${paramsArray[1]}"
		log.debug "paramsArray[2]= ${paramsArray[2]}"
		redirect(action:mostrar, params:[id:paramsArray[2], site:paramsArray[1]])
	}
}