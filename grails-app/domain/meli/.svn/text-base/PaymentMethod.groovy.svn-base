package meli

import java.util.Date;


class PaymentMethod {
	
	static   hasMany =[items:Item]
	static   belongsTo = Item
	
	String  name 
	String logo 
	
	Date dateCreated
	Date lastUpdated
	
	
	static constraints = {
		name(maxSize:255, blank:false)
		logo(maxSize:255, blank:false)

	}
	
	String toString() {
		"${name} (id=${id})"
	}
}
