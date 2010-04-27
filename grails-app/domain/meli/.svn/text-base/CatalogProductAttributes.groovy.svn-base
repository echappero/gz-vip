package meli

import java.util.Date;


class CatalogProductAttributes {
	
	  static belongsTo =[catalogProduct:CatalogProduct]
	
	  String keyName
	  String value 
	Date dateCreated
	Date lastUpdated
	
	static constraints ={
		  keyName(maxSize:255, blank:false)
		  value(maxSize:255, blank:false)
	}
}
