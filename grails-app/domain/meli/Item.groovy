package meli



import java.math.BigDecimal;
import java.util.Date;


class Item {
	
	 static belongsTo =[site:Site, seller:Customer, category:Category, catalogProduct:CatalogProduct]
	 static hasMany =[questions:Question, paymentMethods:PaymentMethod, califications:Calification,shipMethods:ShipMethod]


	 String  title 
	 String  image 
	 String  description 
	 BigDecimal   price
	 int     bidsCount
	 Date dateCreated
	 Date lastUpdated
	String listStyle2
	String shipDescription
	String shipCost
	
	static constraints ={
		title(maxSize:255,blank:false)
        image(maxSize:255)
		description(maxSize:40000)
		bidsCount(blank:false)
		price(blank:false)
		site(validator: { val, obj -> if (!Site.exists(obj.site.id)) return "El Site no es valido" else null }, blank:false)
        listStyle2(nullable:true)
	}
	
	String toString() {
		"${title} (id=${id})"
	}
	
	String normalizeTitle() {
		return title.replaceAll(" ","-");
	}
}
