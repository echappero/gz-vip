package meli

import java.util.Date;


class Category {

	static belongsTo = [category:Category]

	static hasMany = [categories:Category, items:Item]

	String name
	boolean acceptItems

	Date dateCreated
	Date lastUpdated
	
	static constraints ={
		name(maxSize:255, blank:false)
		category(nullable:true)
	}
	
	String toString() {
		"${name} (id=${id})"
	}
}
