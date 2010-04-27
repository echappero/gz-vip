package meli

import java.util.Date;


class Question {
	static belongsTo=[item:Item]

	String question
	Date questionDt
	String answer
	Date answerDt
	
	Date dateCreated
	Date lastUpdated
	
	static constraints = {
		question(maxSize:1000, blank:false)
		answer(maxSize:1000, blank:true)
		questionDt(blank:false)
		answerDt(blank:false)
	}
	
	String toString() {
		String s = question.length() > 100 ? question.substring(0,100)+"..." : question;
		"${s} (id=${id})"
	}
	
}
