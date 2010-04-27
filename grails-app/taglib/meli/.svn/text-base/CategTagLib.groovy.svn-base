package meli;

class CategTagLib {
	
	def categPath={ attrs, body ->
		
		Item item = attrs?.item
		Category categ = item?.category
		
		String categPath = ""
		boolean first = true
		while (categ) {
			if (categ.category) {
				categPath = "<a class=" + (first ? "path2" : "path1") + " href=\"http://www.mercadolibre.com.ar/jm/search?as_categ_id=" + categ.id + "\">" + categ.name + "</a>" + categPath
				categPath = "<img border=\"0\" width=\"13\" height=\"10\" src=\"http://www.mercadolibre.com.ar/org-img/prod/arrow_categ.gif\">" +categPath
			}
			else{
				categPath = "<a class=path1 href=\"http://www.mercadolibre.com.ar/org-img/html/" + item?.site?.siteId +"/" + categ.id + ".html\">" + categ.name + "</a>" +categPath
			}
			first = false
			categ = categ.category
		}
		out <<  categPath
	}
	
	
	
}
