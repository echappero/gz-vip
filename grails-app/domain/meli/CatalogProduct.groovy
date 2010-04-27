package meli

import java.util.Date;

import groovy.util.Eval;

class CatalogProduct {
	static hasMany =[reviews:Review, catalogProductAttributes: CatalogProductAttributes, items:Item]
	
	String name
	Date dateCreated
	Date lastUpdated
	
	def qty5, qty4, qty3, qty2, qty1, prom
	
	
	def calculateReviewsSummary() {
		int suma = 0;
		qty5 = qty4 = qty3 = qty2 = qty1 = 0;
		if (reviews.size() > 0) {
			for (Review rev: reviews){
				switch (rev.points) {
					case 1: qty1 +=1;break;
					case 2: qty2 +=1;break;
					case 3: qty3 +=1;break;
					case 4: qty4 +=1;break;
					case 5: qty5 +=1;
				}
				suma += rev.points
			}
			
			prom = ((suma * 2) / reviews.size()).setScale(0,BigDecimal.ROUND_HALF_UP) / 2
		} else {
			prom = 0
		}
		
	}
	
	def getBallsImageLink() {
		return prom.toString().replace(".","")
	}
	
	static constraints = {
		name(maxSize:255, blank:false)
	}
	
	String toString() {
		"${name} (id=${id})"
	}
	
}
