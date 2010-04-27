package meli

class ItemBoxTagLib{
	
	
	def generateItemBoxes = { attrs, body ->
		
		def items = meli.Item.findAllBySeller(attrs?.item?.seller, [max: 4])
		//def items = attrs?.item?.seller?.items
		def missingItems = 4 - items.size(); 
		
		items = items.minus(attrs?.item)
		
		
		//Generar los TDs vacios para no romper el layout
		while(missingItems >= 0){
			items.add(new Item(id:9999999999999999))
			missingItems--
		}
				
		
		items = items.sort {a,b-> a.id <=> b.id}
		
		out << render(template:"itemDataBoxTemplate", var: "itemV", collection:items)
	}
	
	
}
