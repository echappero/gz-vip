package meli

import java.util.Date;


class ShipMethod {
	
	static   hasMany =[items:Item]
	static   belongsTo = Item

	String description 
	
	Date dateCreated
	Date lastUpdated
	
	static constraints = {
		description(maxSize:255, blank:false)
	}
	
	String toString() {
		"${description} (id=${id})"
	}
}
