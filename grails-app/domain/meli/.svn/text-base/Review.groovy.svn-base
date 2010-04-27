package meli

import java.util.Date;


class Review {
	
	static   belongsTo =[catalogProduct:CatalogProduct, customer:Customer]

	String title 
	int   points
	String pros 
	String contras 
	String conclusion 
	int qtyVotes 
	int qtyPos
	
	Date dateCreated
	Date lastUpdated
	
	static constraints = {
		title(maxSize:255, blank:false)
		pros(maxSize:1000, blank:false)
		contras(maxSize:1000, blank:false)
		conclusion(maxSize:1000, blank:false)
	}
	
	String toString() {
		String s = title.length() > 100 ? title.substring(0,100)+"..." : title;
		"${s} (id=${id})"
	}
	
}
