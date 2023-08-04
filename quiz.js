function clear_local_storage () {
	localStorage.clear()
	document.getElementById("clearStorage").innerHTML="All Program Data Removed.  Return to <a href='index.html'>table of contents</a>.";
}

function playSound(filename){   
                document.getElementById("sound").innerHTML='<audio autoplay="autoplay"><source src="' + filename + '.mp3" type="audio/mpeg" /><source src="' + filename + '.ogg" type="audio/ogg" /><embed hidden="true" autostart="true" loop="false" src="' + filename +'.mp3" /></audio>';
            }

function show_trackProgress () {

	
	var trackProgress_flag = localStorage.getItem("trackProgress_flag");	
	
	var output = "";
	
	if (trackProgress_flag == "Yes") {
		output += "<input type='radio' onClick='toggle_trackProgress()' name='trackProgress' id='Yes' value='Yes' checked /> Yes  ";	
	} else {
		output += "<input type='radio' onClick='toggle_trackProgress()' name='trackProgress' id='Yes' value='Yes'  /> Yes  ";
	}

	if ((trackProgress_flag == "No") || (trackProgress_flag==null)) {
		output += "<input type='radio' onClick='toggle_trackProgress()' name='trackProgress' id='No' value='No' checked /> No  ";	
	} else {
		output += "<input type='radio' onClick='toggle_trackProgress()' name='trackProgress' id='No' value='No'  /> No  ";
	}


	document.getElementById("trackProgress").innerHTML = output;
}


function toggle_trackProgress() {
	if(document.getElementById('Yes').checked) {
		localStorage.setItem("trackProgress_flag", "Yes" );
	}else if(document.getElementById('No').checked) {
		localStorage.setItem("trackProgress_flag", "No" );
	}
}




function chapter_status() {

	
		for (chapter = 1; chapter<=80; chapter++) {
			var paradigm_list = JSON.parse(localStorage.getItem(paradigm_status_key));
			var vocabulary_list = JSON.parse(localStorage.getItem(vocabulary_status_key));
			var grammarAlignment_list = JSON.parse(localStorage.getItem(grammarAlignment_status_key));
			var translationAlignment_list = JSON.parse(localStorage.getItem(translationAlignment_status_key));
			var status_output;


			var last_viewed_key = chapter+"last_viewed";
			var date_last_visited = localStorage.getItem(last_viewed_key);
			var paradigm_status_key = chapter+"paradigm_answer_status";
			var vocabulary_status_key = chapter+"vocabulary_answer_status";
			var grammarAlignment_status_key = chapter+"grammarAlignment_answer_status";
			var translationAlignment_status_key = chapter+"translationAlignment_answer_status";
			var status_output_div_number = "status-" + chapter;
			var status_output = "";

			var status = document.getElementById(status_output_div_number);
	
		
	
			// scan lists to see what is due
	
			if (date_last_visited == null) {
				if (chapter <= 2) {
					status_output = "&nbsp;";
				} else {

					for (light_drachma_count = 0; light_drachma_count< 10; light_drachma_count++) {
						status_output += "<img src = 'images/drachmalight.jpg' width = '20px'>"; 
					}
				}
			} else {
				var paradigm_list = JSON.parse(localStorage.getItem(paradigm_status_key));
				var vocabulary_list = JSON.parse(localStorage.getItem(vocabulary_status_key));
				var grammarAlignment_list = JSON.parse(localStorage.getItem(grammarAlignment_status_key));
				var translationAlignment_list = JSON.parse(localStorage.getItem(translationAlignment_status_key));
				var status_output = "";
		
		
				var total_list = new Array();
				
				var total_list = paradigm_list;
				
				total_list.concat(vocabulary_list, grammarAlignment_list, translationAlignment_list);
				
				var sum = 0;
				for( var i = 0; i < total_list.length; i++ ){
				    sum += parseInt( total_list[i], 10 ); //don't forget to add the base
				}
				
				var avg = sum/(total_list.length);
				
				
				
		
				//paradigm_due = new Array();
				var total_to_review = 0;
				var k = 0;
				var today = new Date();
				for (z=0;z<paradigm_list.length;z++) {  
					var myDate = new Date(date_last_visited);
					myDate.setDate(myDate.getDate()+paradigm_list[z]);
					if ((paradigm_list[z] == 0) || (myDate < today)) {
						//paradigm_due[k] = z;
						k++;
						total_to_review++;

					}

				}
			
			

				//status_output +=   k + " paradigms out of " + z + " in this chapter are due for review.";
	
				vocabulary_due = new Array();
				var k = 0;
				for (z=0;z<vocabulary_list.length;z++) {  
					var myDate = new Date(date_last_visited);
					myDate.setDate(myDate.getDate()+vocabulary_list[z]);
					if ((vocabulary_list[z] == 0) || (myDate < today)) {
						//vocabulary_due[k] = z;
						k++;
						total_to_review++;

					}

				}

				//status_output += "<br>"  + k + " vocabulary words out of " + z + " in this chapter are due for review.";


				grammarAlignment_due = new Array();
				var k = 0;
				for (z=0;z<grammarAlignment_list.length;z++) {  
					var myDate = new Date(date_last_visited);
					myDate.setDate(myDate.getDate()+grammarAlignment_list[z]);
					if ((grammarAlignment_list[z] == 0) || (myDate < today)) {
						//grammarAlignment_due[k] = z;
						k++;
						total_to_review++;

					}

				}

				//status_output += "<br>"  + k + " grammar alignments out of " + z + " in this chapter are due for review.";
	
				translationAlignment_due = new Array();
				var k = 0;
				for (z=0;z<translationAlignment_list.length;z++) {  
					var myDate = new Date(date_last_visited);
					myDate.setDate(myDate.getDate()+translationAlignment_list[z]);
					if ((translationAlignment_list[z] == 0) || (myDate < today)) {
						//translationAlignment_due[k] = z;
						k++;
						total_to_review++;

					}

				}

				var total_questions = translationAlignment_list.length + grammarAlignment_list.length + vocabulary_list.length + paradigm_list.length;
				var total_not_due = total_questions-total_to_review;

				//status_output += "<br>"  + k + " translation alignments out of " + z + " in this chapter are due for review.<br>";

				var percent = (total_not_due/total_questions)*10;
				percent = Math.floor(percent);

				var drachma_total = Math.max(percent, avg);

			
				for (drachma_count = 0; drachma_count< drachma_total; drachma_count++) {
					status_output += "<img src = 'images/drachma.jpg' width = '20px'>"; 
				}
	
			
			
				for (light_drachma_count = drachma_count; light_drachma_count< 10; light_drachma_count++) {
					status_output += "<img src = 'images/drachmalight.jpg' width = '20px'>"; 
				}
			

	
				//status_output += "<br> You have correctly answered " + total_not_due + " out of " + total_questions + " and you have " + total_to_review + " questions to review.  You have earned " + drachma_count +" out of ten drachmas.<br>";
				
			}
			status.innerHTML = status_output;
		}
	
}

function get_chapter_number () {
	var path = window.location.pathname;
	var page = path.split("/").pop();
	var m = /([0-9]+)/.exec(page);
	if (m[0] == undefined) {
		return -1;
	} else {
		return m[0];
	}

}

function generate_nav () {
	var current_chapter = get_chapter_number();
	var prev = current_chapter-1;
	var next = parseInt(current_chapter)+1;
	var nav_output = "";
	var nav_bar = document.getElementById("nav");


	if (document.URL.match(/#/)) {
		nav.className = 'hidden';	
	} else {
		if (prev >= 1) { 
			nav_output += "<a href='JWW_FGB" + prev + ".html' class='navButton'><--Lesson " + prev + " </a> ";
		}
		nav_output += "<a href='JWW_General_Vocabulary.html' class='navButton'>Vocabulary</a>  <a href='settings.html' class='navButton'>Settings</a> <a href='index.html' class='navButton'>Table of Contents</a>       <a href='JWW_FGB_Appendix.html' class='navButton'>Reference Grammar</a> ";
	
		if (next <= 80 && next >=1 ) {
			  nav_output += "<a href='JWW_FGB" + next + ".html' class='navButton'>Lesson " + next + " --></a>";
		}
	}
	nav.innerHTML = nav_output;

}

function init_chapter() {
   // What was the last date this chapter was reviewed
   // How Many Questions of each type have been reviewed
   // 
   
    var chapter = get_chapter_number();
	
	var last_viewed_key = chapter+"last_viewed";
	var paradigm_status_key = chapter+"paradigm_answer_status";
	var vocabulary_status_key = chapter+"vocabulary_answer_status";
	var grammarAlignment_status_key = chapter+"grammarAlignment_answer_status";
	var translationAlignment_status_key = chapter+"translationAlignment_answer_status";

	var date_last_visited = localStorage.getItem(last_viewed_key);
	if (date_last_visited == null) {
		date_last_visited = new Date ()
	
	}
	var date_object = Date(date_last_visited);
	
	var status = document.getElementById("status");
    var question = document.getElementById("question");
	var button = document.getElementById("buttons");
	

	var paradigm_list = JSON.parse(localStorage.getItem(paradigm_status_key));
	var vocabulary_list = JSON.parse(localStorage.getItem(vocabulary_status_key));
	var grammarAlignment_list = JSON.parse(localStorage.getItem(grammarAlignment_status_key));
	var translationAlignment_list = JSON.parse(localStorage.getItem(translationAlignment_status_key));


			
		localStorage.setItem(last_viewed_key, new Date() );
		// Initialize List Of Unanswered Questions
		
		if (paradigm_list == null) {
		var paradigm_answer_status = new Array();
		for (z=0;z<paradigm[chapter].length;z++) {  

			paradigm_answer_status[z] = 0;
		}

		localStorage.setItem(paradigm_status_key, JSON.stringify(paradigm_answer_status));
		}


		if (vocabulary_list == null) {
		var vocabulary_answer_status = new Array();
		for (z=0;z<vocabulary[chapter].length;z++) {  

			vocabulary_answer_status[z] = 0;
		}

		localStorage.setItem(vocabulary_status_key, JSON.stringify(vocabulary_answer_status));
		}
		
		if (grammarAlignment_list == null) {
		var grammarAlignment_answer_status = new Array();
		for (z=0;z<grammarAlignment[chapter].length;z++) {  

			grammarAlignment_answer_status[z] = 0;
		}

		localStorage.setItem(grammarAlignment_status_key, JSON.stringify(grammarAlignment_answer_status));
		}
		
		if (translationAlignment_list == null) {
		var translationAlignment_answer_status = new Array();
		for (z=0;z<translationAlignment[chapter].length;z++) {  

			translationAlignment_answer_status[z] = 0;
		}

		localStorage.setItem(translationAlignment_status_key, JSON.stringify(translationAlignment_answer_status));
		}
				
		

		status_output = "&nbsp;";
		localStorage.setItem(last_viewed_key, new Date() );

	
	


	// load status lists from local storage
	var paradigm_list = JSON.parse(localStorage.getItem(paradigm_status_key));
	var vocabulary_list = JSON.parse(localStorage.getItem(vocabulary_status_key));
	var grammarAlignment_list = JSON.parse(localStorage.getItem(grammarAlignment_status_key));
	var translationAlignment_list = JSON.parse(localStorage.getItem(translationAlignment_status_key));
	
	var total_list = new Array();
				
	var total_list = paradigm_list;
				
	total_list.concat(vocabulary_list, grammarAlignment_list, translationAlignment_list);
				
	var sum = 0;
	for( var i = 0; i < total_list.length; i++ ){
	    sum += parseInt( total_list[i], 10 ); //don't forget to add the base
	}
				
	var avg = sum/(total_list.length);

	
	
	// scan lists to see what is due
	

	paradigm_due = new Array();
	var total_to_review = 0;
	var k = 0;
	var today = new Date();
	for (z=0;z<paradigm_list.length;z++) {  
		var myDate = new Date(date_last_visited);
		myDate.setDate(myDate.getDate()+paradigm_list[z]);
		if ((paradigm_list[z] == 0) || (myDate < today)) {
			paradigm_due[k] = z;
			k++;
			total_to_review++;

		}

	}

	var question_output =   k + " paradigms out of " + z + " in this chapter are due for review.";
	
	vocabulary_due = new Array();
	var k = 0;
	for (z=0;z<vocabulary_list.length;z++) {  
		var myDate = new Date(date_last_visited);
		myDate.setDate(myDate.getDate()+vocabulary_list[z]);
		if ((vocabulary_list[z] == 0) || (myDate < today)) {
			vocabulary_due[k] = z;
			k++;
			total_to_review++;

		}

	}

	question_output += "<br>"  + k + " vocabulary words out of " + z + " in this chapter are due for review.";


	grammarAlignment_due = new Array();
	var k = 0;
	for (z=0;z<grammarAlignment_list.length;z++) {  
		var myDate = new Date(date_last_visited);
		myDate.setDate(myDate.getDate()+grammarAlignment_list[z]);
		if ((grammarAlignment_list[z] == 0) || (myDate < today)) {
			grammarAlignment_due[k] = z;
			k++;
			total_to_review++;

		}

	}

	question_output += "<br>"  + k + " grammar alignments out of " + z + " in this chapter are due for review.";
	
	translationAlignment_due = new Array();
	var k = 0;
	for (z=0;z<translationAlignment_list.length;z++) {  
		var myDate = new Date(date_last_visited);
		myDate.setDate(myDate.getDate()+translationAlignment_list[z]);
		if ((translationAlignment_list[z] == 0) || (myDate < today)) {
			translationAlignment_due[k] = z;
			k++;
			total_to_review++;

		}

	}

	question_output += "<br>"  + k + " translation alignments out of " + z + " in this chapter are due for review.";

	if (total_to_review == 0) {
		question_output = "<p>Congratulations!  You have no reviews due for this chapter right now.</p>";
	
	}

	// create question list of LIMIT  randomly selected items from each due
	//hard code 5 for now - this should be set on a configuration screen later
	var paradigm_question_limit = 5;
	var vocabulary_question_limit = 5;
	var grammarAlignment_question_limit = 5;
	var translationAlignment_question_limit = 5;
	var number_right = 0;
	var total_questions = 0;
	
	var question_list = new Array();

	if (paradigm_due.length < paradigm_question_limit) {
		paradigm_question_limit = paradigm_due.length;
		for (z=0;z<paradigm_question_limit;z++) {  	
			var due_item = paradigm_due[z];
			 question_to_add = "paradigm--"+due_item+"\t" + paradigm[chapter][due_item];
			question_list.push(question_to_add);
			total_questions++;
		}
	} else {
		for (z=0;z<paradigm_question_limit;z++) {  
			var due_item = paradigm_due[z];
			question_to_add = "paradigm--"+due_item+"\t" + paradigm[chapter][due_item];
			question_list.push(question_to_add);
			total_questions++;
		}
	}
	
	if (vocabulary_due.length < vocabulary_question_limit) {
		vocabulary_question_limit = vocabulary_due.length;
		for (z=0;z<vocabulary_question_limit;z++) {  	
			var due_item = vocabulary_due[z];
			 question_to_add = "vocabulary--"+due_item+"\t" + vocabulary[chapter][due_item];
			question_list.push(question_to_add);
			total_questions++;
		}
	} else {
		for (z=0;z<vocabulary_question_limit;z++) {  
			var due_item = vocabulary_due[z];
			question_to_add = "vocabulary--"+due_item+"\t" + vocabulary[chapter][due_item];
			question_list.push(question_to_add);
			total_questions++;
		}
	}
	
	if (grammarAlignment_due.length < grammarAlignment_question_limit) {
		grammarAlignment_question_limit = grammarAlignment_due.length;
		for (z=0;z<grammarAlignment_question_limit;z++) {  	
			var due_item = grammarAlignment_due[z];
			 question_to_add = "grammarAlignment--"+due_item+"\t" + grammarAlignment[chapter][due_item];
			question_list.push(question_to_add);
			total_questions++;
		}
	} else {
		for (z=0;z<grammarAlignment_question_limit;z++) {  
			var due_item = grammarAlignment_due[z];
			question_to_add = "grammarAlignment--"+due_item+"\t" + grammarAlignment[chapter][due_item];
			question_list.push(question_to_add);
			total_questions++;
		}
	}
	
	if (translationAlignment_due.length < translationAlignment_question_limit) {
		translationAlignment_question_limit = translationAlignment_due.length;
		for (z=0;z<translationAlignment_question_limit;z++) {  	
			var due_item = translationAlignment_due[z];
			 question_to_add = "translationAlignment--"+due_item+"\t" + translationAlignment[chapter][due_item];
			question_list.push(question_to_add);
			total_questions++;
		}
	} else {
		for (z=0;z<translationAlignment_question_limit;z++) {  
			var due_item = translationAlignment_due[z];
			question_to_add = "translationAlignment--"+due_item+"\t" + translationAlignment[chapter][due_item];
			question_list.push(question_to_add);
			total_questions++;
		}
	}
	
	var total_questions_overall = translationAlignment_list.length + grammarAlignment_list.length + vocabulary_list.length + paradigm_list.length;
	var total_not_due = total_questions_overall-total_to_review;


	var percent = (total_not_due/total_questions_overall)*10;
	percent = Math.floor(percent);

	question_output+= "<br>";
			
	for (drachma_count = 0; drachma_count< percent; drachma_count++) {
		question_output += "<img src = 'images/drachma.jpg' width = '50px'>"; 
	}
	
			
			
	for (light_drachma_count = drachma_count; light_drachma_count< 10; light_drachma_count++) {
		question_output += "<img src = 'images/drachmalight.jpg' width = '50px'>"; 
	}
			

	
			//question_output += "<br>You have correctly answered " + total_not_due + " out of " + total_questions_overall + " and you have " + total_to_review + " questions to review.";

			

	question_list.sort(function() {return 0.5 - Math.random()}) //Array elements now scrambled */		

	sessionStorage.setItem("stored_question_list", JSON.stringify(question_list));
	
	sessionStorage.current_chapter = chapter;
	sessionStorage.number_right = parseInt(number_right); 
	sessionStorage.total_questions = parseInt(total_questions);
	
	if (total_to_review > 0) {
		button_output = "<p><div class = 'continueButton'  onClick='display_word("+chapter+")'>Begin</div>"
	}
	
	status.innerHTML = status_output;
	question.innerHTML = question_output;
	button.innerHTML = button_output;
	



}

 
function display_word(chapter) {

	var status_output = "";
   	var question_output = "";
   	var button_output = "";
   
   	var status = document.getElementById("status");
    var question = document.getElementById("question");
	var button = document.getElementById("buttons");
	 
	
	
	question_output = "<br>";
	
	var z = 0;
	
	var question_list = new Array();		
	question_list= JSON.parse(sessionStorage.stored_question_list);
	var number_right = parseInt(sessionStorage.number_right);
	var total_questions = parseInt(sessionStorage.total_questions);
		
	status_output+= "<p>You have correctly answered " + number_right + " out of " + total_questions +" total questions.  <br>";	
	
		


	var qa = new Array ();

	
	qa = question_list[0].split("\t");

	
	
	var correct = 0;
	
	var answers = new Array();
	
	question_output +=   "<p><span class='question'>"+qa[1] + "</span></p><p>&nbsp;</p>";
	
	sessionStorage.remember_correct = qa[0];
	sessionStorage.question = qa[1];
	sessionStorage.current_chapter = chapter;
	sessionStorage.number_right = parseInt(number_right); 
	sessionStorage.total_questions = total_questions;

		
	for (var i=2;i<qa.length;i++)
		{ 
			if (qa[i].match(/\*/)) {
				correct = i;
				qa[i] = qa[i].replace(/\*/,"");			
				sessionStorage.correct = qa[i];
				
			} else {
				correct = 0;
			}
	
			parameters = i + "," + correct;		
				
		
			answers[i] = "<span class='answerButton' id='" +i+ "' onclick='check_answer(" + parameters + ")' > ◻️  " + qa[i] + "</span><br>";
		
			//question_output += "<input type='button' id='" +i+ "' onclick='check_answer(" + parameters + ")' value ='" + qa[i] + "'> ";
		}
	
	answers.sort(function() {return 0.5 - Math.random()}) //Array elements now scrambled */		
	
	button_output += answers.join(" ");

	

	status.innerHTML = status_output;
	question.innerHTML = question_output;
	button.innerHTML = button_output;
	

	

}

function check_answer(buttonNum, correctFlag) {

		var status_output = "";
	   	var question_output = "";
   		var button_output = "";
   
   		var status = document.getElementById("status");
    	var question_div = document.getElementById("question");
		var button = document.getElementById("buttons");
	

		var submitted_answer = document.getElementById(buttonNum).innerHTML;
		
		submitted_answer = submitted_answer.replace(" ◻️  ", "");

		var question = sessionStorage.question;
		
		var current_chapter = parseInt(sessionStorage.current_chapter);
		
		var correct_answer = sessionStorage.correct;
		
		var remember_correct = sessionStorage.remember_correct;
		
		var question_list= JSON.parse(sessionStorage.stored_question_list);
		var question_number = parseInt(sessionStorage.question_number);		
		var number_right = parseInt(sessionStorage.number_right);
		var total_questions = parseInt(sessionStorage.total_questions);
	

	
		var question_output = "<br>";
		
	
		parameters = current_chapter;

		var record_answer = new Array();
		record_answer = remember_correct.split("--");


		if (submitted_answer == correct_answer) {
		
			//playSound("sounds/ElectronicChime");
			number_right = number_right + 1;
			
			status_output+= "<p>You have correctly answered " + number_right + " out of " + total_questions +" total questions.  <br>";	


			question_output +=   "<p>" + question + "</p><p>✅  Correct!</p>";
			

			button_output = button.innerHTML;
			button_output = button_output.replace (" ◻️  " + submitted_answer +"</span>", " ✅  " + submitted_answer +"</span>");
			button_output = button_output.replace (/onclick=/g, "onclick ");


			if (record_answer[0] == "paradigm") {
				var paradigm_status_key = current_chapter+"paradigm_answer_status";
				var paradigm_list = JSON.parse(localStorage.getItem(paradigm_status_key));
				if (paradigm_list[parseInt(record_answer[1])] == 0) {
					paradigm_list[parseInt(record_answer[1])] = 1;
				} else {
					paradigm_list[parseInt(record_answer[1])] = paradigm_list[record_answer[1]] * 2;
				}
				localStorage.setItem(paradigm_status_key, JSON.stringify(paradigm_list));
			}
			if (record_answer[0] == "vocabulary") {
				var vocabulary_status_key = current_chapter+"vocabulary_answer_status";
				var vocabulary_list = JSON.parse(localStorage.getItem(vocabulary_status_key));
				if (vocabulary_list[parseInt(record_answer[1])] == 0) {
					vocabulary_list[parseInt(record_answer[1])] = 1;
				} else {
					vocabulary_list[parseInt(record_answer[1])] = vocabulary_list[record_answer[1]] * 2;
				}
				localStorage.setItem(vocabulary_status_key, JSON.stringify(vocabulary_list));
			}
			if (record_answer[0] == "grammarAlignment") {
				var grammarAlignment_status_key = current_chapter+"grammarAlignment_answer_status";
				var grammarAlignment_list = JSON.parse(localStorage.getItem(grammarAlignment_status_key));
				if (grammarAlignment_list[parseInt(record_answer[1])] == 0) {
					grammarAlignment_list[parseInt(record_answer[1])] = 1;
				} else {
					grammarAlignment_list[parseInt(record_answer[1])] = grammarAlignment_list[record_answer[1]] * 2;
				}
				localStorage.setItem(grammarAlignment_status_key, JSON.stringify(grammarAlignment_list));
			}
			if (record_answer[0] == "translationAlignment") {
				var translationAlignment_status_key = current_chapter+"translationAlignment_answer_status";
				var translationAlignment_list = JSON.parse(localStorage.getItem(translationAlignment_status_key));
				if (translationAlignment_list[parseInt(record_answer[1])] == 0) {
					translationAlignment_list[parseInt(record_answer[1])] = 1;
				} else {
					translationAlignment_list[parseInt(record_answer[1])] = translationAlignment_list[record_answer[1]] * 2;
				}
				localStorage.setItem(translationAlignment_status_key, JSON.stringify(translationAlignment_list));
			}
			if (number_right < total_questions) {
				
				button_output += "<p><input type='button' class='continueButton' id='continue' onclick='display_word("+parameters+")' value ='Continue'></p>";		
				var question_to_move_to_end;

							
			} else {
				button_output += "<input type='button' class='continueButton' id='retake' onclick='init_chapter("+current_chapter+")' value ='Review Again With New Question Set'>";	
				
			}
			
			question_list.shift();	
			sessionStorage.number_right = parseInt(number_right); 
			sessionStorage.total_questions = parseInt(total_questions);


			
		} else {


		//playSound("sounds/A-Tone");
		question_output +=  question+ "<p>❌You submitted " + submitted_answer + ".<br>The correct answer is " + correct_answer +".";
		button_output += "<p><input type='button' id='continue' class='continueButton' onclick='display_word("+parameters+")' width = '150' value ='Continue'> ";

status_output = "Number Correct:  " + number_right + "  Left To Answer:  " + total_questions;
		if (record_answer[0] == "paradigm") {
				var paradigm_status_key = current_chapter+"paradigm_answer_status";
				var paradigm_list = JSON.parse(localStorage.getItem(paradigm_status_key));
				if (paradigm_list[parseInt(record_answer[1])] <= 4) {
					paradigm_list[parseInt(record_answer[1])] = 0;
				} else {
					paradigm_list[parseInt(record_answer[1])] = paradigm_list[record_answer[1]] / 4;
				}
				localStorage.setItem(paradigm_status_key, JSON.stringify(paradigm_list));
			}
			if (record_answer[0] == "vocabulary") {
				var vocabulary_status_key = current_chapter+"vocabulary_answer_status";
				var vocabulary_list = JSON.parse(localStorage.getItem(vocabulary_status_key));
				if (vocabulary_list[parseInt(record_answer[1])] <= 4) {
					vocabulary_list[parseInt(record_answer[1])] = 0;
				} else {
					vocabulary_list[parseInt(record_answer[1])] = vocabulary_list[record_answer[1]] / 4;
				}
				localStorage.setItem(vocabulary_status_key, JSON.stringify(vocabulary_list));
			}
			if (record_answer[0] == "grammarAlignment") {
				var grammarAlignment_status_key = current_chapter+"grammarAlignment_answer_status";
				var grammarAlignment_list = JSON.parse(localStorage.getItem(grammarAlignment_status_key));
				if (grammarAlignment_list[parseInt(record_answer[1])] <= 4) {
					grammarAlignment_list[parseInt(record_answer[1])] = 0;
				} else {
					grammarAlignment_list[parseInt(record_answer[1])] = grammarAlignment_list[record_answer[1]] / 4;
				}
				localStorage.setItem(grammarAlignment_status_key, JSON.stringify(grammarAlignment_list));
			}
			if (record_answer[0] == "translationAlignment") {
				var translationAlignment_status_key = current_chapter+"translationAlignment_answer_status";
				var translationAlignment_list = JSON.parse(localStorage.getItem(translationAlignment_status_key));
				if (translationAlignment_list[parseInt(record_answer[1])] <= 4) {
					translationAlignment_list[parseInt(record_answer[1])] = 0;
				} else {
					translationAlignment_list[parseInt(record_answer[1])] = translationAlignment_list[record_answer[1]] / 4;
				}
				localStorage.setItem(translationAlignment_status_key, JSON.stringify(translationAlignment_list));
			}
	
			var question_to_move_to_end;
			question_list.push(question_list.shift());

		}

		sessionStorage.setItem("stored_question_list", JSON.stringify(question_list));	

		question_div.innerHTML = question_output;		
				
		status.innerHTML = status_output;

		button.innerHTML = button_output;
	




}




//<!-- This script and many more are available free online at -->

//<!-- The JavaScript Source!! http://javascript.internet.com -->

//<!-- Original:  Jordan Hiller (hiller@email.com) -->

//<!-- Web Site:  http://www.angelfire.com/ca -->



function serve_quiz(lesson, number, sort ) {

if (number) {

	

if (number > questionbank[lesson].length) {
	number = questionbank[lesson].length;
}

next_lesson = lesson+1;
prev_lesson = lesson - 1;
questionnum = -1; 
questions = [];

if (typeof sort == "undefined") {
     questionbank[lesson].sort(function() {return 0.5 - Math.random()}) //Array elements now scrambled */
}
	for (var i=0; i< number; i++) { 
	
	
		question = questionbank[lesson][i].split("\t");
	
		
		questionnum++;
		questions[questionnum] = question[0];
		possibleanswers[questionnum] = new Array();
		for (var j=1; j<question.length; j++) {
			
			if(question[j].charAt(0) == "*") {
				CorrectChoice(question[j].substring(1,question[j].length));
    	    } else {
				WrongChoice(question[j]);			
			
			}
		}

	}
}


dw = "<form name=\"theform\">";


for(var i=0;i<questions.length;i++)
  {

  var ipo = i + 1;
dw += "<fieldset class=\"controlgroup\"><p>\n";

  dw += "<span class='question'>" + ipo + ".  " + questions[i] +"</span><br>" + "\n";
 
   possibleanswers[i].sort(function() {return 0.5 - Math.random()}) //Array elements now scram
 
  for(d=0;d<possibleanswers[i].length;d++)

    {

    dw += "<span class='answers'><INPUT TYPE=radio NAME=\"num"+(ipo)+"\" ID=\"button " + i + "." + d + "\" VALUE=\""+possibleanswers[i][d]+"\"> <label for =\"button " + i + "." + d + "\">  "+ possibleanswers[i][d]+"</label> </span><br>" + "\n";

    }
dw += "</fieldset>\n";

  }
dw += "<p><INPUT class = 'button' TYPE=button onClick=\"check(" + lesson +")\" VALUE=\"Check Answers\">";

dw += " <INPUT class = 'button' TYPE=\"button\" onClick=\"parent.location='JWW_FGB"+prev_lesson+".html'\"VALUE=\"Go To Previous Lesson\">  <INPUT class = 'button' TYPE=\"button\" onClick=\"parent.location='index.html'\"VALUE=\"Go To Table Of Contents\">  <INPUT class = 'button' TYPE=\"button\" onClick=\"parent.location='JWW_FGB"+next_lesson+".html'\"VALUE=\"Go To Next Lesson\">  ";


dw += "</form>";





document.getElementById("quiz_container").innerHTML = dw;
//$("#quiz_container").html(dw);

}

function check(lesson){

radios = new Array();

results = new Array();

next_lesson = lesson+1;

correct = 0;

total = questions.length;

wrong = new Array();

var thisCorrect;

result = "";


for(var i=0;i<total;i++)

  {

  var ipo = i + 1;

  radios[i] = document.theform.elements["num"+(ipo)];

  thisCorrect = false;

  anythingchecked = false;

  for(var d=0;d<radios[i].length;d++)

    {

    if(radios[i][d].checked == 1)
		
      {
		anythingchecked = true;
      results[i] = radios[i][d].value;

      if(results[i] == answers[i])

        {

    correct++;

        thisCorrect = true;

        }

      }

    }

  if(thisCorrect == false)

    {

    wrong[wrong.length] = i;
    
	if(anythingchecked == true) {
	 result += "<p><font color=\"red\">✔</font>  <span class=\"question\">" + ipo + ".  " + questions[i] + "</span><br>Your answer:  <span class='answers'>" + results[i] + "</span>.<br>Correct answer:  <span class='answers'>" + answers[i] + "</span></p>";

	}  else {
		result += "<p>You did not answer question " + ipo + "</p>";
    }


    } else {
    	result += "<p>😊  <span class='question'>" + ipo + ".  " + questions[i] + "</span><br><span class='answers'>" + results[i] + ".</span>  </p>";	
    
    
    }


  }



percent = Math.round(correct / total * 100).toString();

var a1 = "~!@#$%^&*()";

var a = "";

for(i=0;i<percent.length;i++) {

  a += a1.charAt(percent.charAt(i)); }

//location.href = "score.html?s="+escape(a)+"&w="+wrong;

percent = "<p><strong>You got " + percent + "% correct.</strong></p>"

result =  percent + result + " " + percent;

result += "<p><INPUT class = 'button' TYPE=button onClick=\"serve_quiz(" + lesson +")\" VALUE=\"Retake Quiz With Same Questions\"> <INPUT class = 'button' TYPE=button onClick=\"serve_quiz(" + lesson +", 10)\" VALUE='Retake Quiz With A New Set Of Questions'> <INPUT class = 'button' TYPE=\"button\" onClick=\"parent.location='JWW_FGB"+next_lesson+".html'\"VALUE=\"Go To Next Lesson\">  <INPUT class = 'button' TYPE=\"button\" onClick=\"parent.location='index.html'\"VALUE=\"Go To Table Of Contents\">  "

document.getElementById("quiz_container").innerHTML = result;
	


}


/* From http://webdesign.about.com/od/dhtml/a/aa101507.htm */
function unhide(divID, cross_ref) {
	var	data = "";
	var item = document.getElementById(divID);
	if (cross_ref == 1) {
	data="JWW_FGB1.html#1";
	lesson_num = "Lesson 1"
  }
if (cross_ref == 2) {
	data="JWW_FGB1.html#2";
	lesson_num = "Lesson 1"
  }
if (cross_ref == 3) {
	data="JWW_FGB1.html#3";
	lesson_num = "Lesson 1"
  }
if (cross_ref == 4) {
	data="JWW_FGB1.html#4";
	lesson_num = "Lesson 1"
  }
if (cross_ref == 5) {
	data="JWW_FGB1.html#5";
	lesson_num = "Lesson 1"
  }
if (cross_ref == 6) {
	data="JWW_FGB1.html#6";
	lesson_num = "Lesson 1"
  }
if (cross_ref == 7) {
	data="JWW_FGB1.html#7";
	lesson_num = "Lesson 1"
  }
if (cross_ref == 8) {
	data="JWW_FGB1.html#8";
	lesson_num = "Lesson 1"
  }
if (cross_ref == 9) {
	data="JWW_FGB1.html#9";
	lesson_num = "Lesson 1"
  }
if (cross_ref == 10) {
	data="JWW_FGB1.html#10";
	lesson_num = "Lesson 1"
  }
if (cross_ref == 11) {
	data="JWW_FGB1.html#11";
	lesson_num = "Lesson 1"
  }
if (cross_ref == 12) {
	data="JWW_FGB1.html#12";
	lesson_num = "Lesson 1"
  }
if (cross_ref == 13) {
	data="JWW_FGB1.html#13";
	lesson_num = "Lesson 1"
  }
if (cross_ref == 14) {
	data="JWW_FGB2.html#14";
	lesson_num = "Lesson 2"
  }
if (cross_ref == 15) {
	data="JWW_FGB2.html#15";
	lesson_num = "Lesson 2"
  }
if (cross_ref == 16) {
	data="JWW_FGB2.html#16";
	lesson_num = "Lesson 2"
  }
if (cross_ref == 17) {
	data="JWW_FGB2.html#17";
	lesson_num = "Lesson 2"
  }
if (cross_ref == 18) {
	data="JWW_FGB2.html#18";
	lesson_num = "Lesson 2"
  }
if (cross_ref == 19) {
	data="JWW_FGB2.html#19";
	lesson_num = "Lesson 2"
  }
if (cross_ref == 20) {
	data="JWW_FGB2.html#20";
	lesson_num = "Lesson 2"
  }
if (cross_ref == 21) {
	data="JWW_FGB2.html#21";
	lesson_num = "Lesson 2"
  }
if (cross_ref == 22) {
	data="JWW_FGB2.html#22";
	lesson_num = "Lesson 2"
  }
if (cross_ref == 23) {
	data="JWW_FGB2.html#23";
	lesson_num = "Lesson 2"
  }
if (cross_ref == 24) {
	data="JWW_FGB2.html#24";
	lesson_num = "Lesson 2"
  }
if (cross_ref == 25) {
	data="JWW_FGB2.html#25";
	lesson_num = "Lesson 2"
  }
if (cross_ref == 26) {
	data="JWW_FGB2.html#26";
	lesson_num = "Lesson 2"
  }
if (cross_ref == 27) {
	data="JWW_FGB2.html#27";
	lesson_num = "Lesson 2"
  }
if (cross_ref == 28) {
	data="JWW_FGB2.html#28";
	lesson_num = "Lesson 2"
  }
if (cross_ref == 29) {
	data="JWW_FGB3.html#29";
	lesson_num = "Lesson 3"
  }
if (cross_ref == 30) {
	data="JWW_FGB3.html#30";
	lesson_num = "Lesson 3"
  }
if (cross_ref == 31) {
	data="JWW_FGB3.html#31";
	lesson_num = "Lesson 3"
  }
if (cross_ref == 32) {
	data="JWW_FGB3.html#32";
	lesson_num = "Lesson 3"
  }
if (cross_ref == 33) {
	data="JWW_FGB3.html#33";
	lesson_num = "Lesson 3"
  }
if (cross_ref == 34) {
	data="JWW_FGB3.html#34";
	lesson_num = "Lesson 3"
  }
if (cross_ref == 35) {
	data="JWW_FGB3.html#35";
	lesson_num = "Lesson 3"
  }
if (cross_ref == 36) {
	data="JWW_FGB3.html#36";
	lesson_num = "Lesson 3"
  }
if (cross_ref == 37) {
	data="JWW_FGB3.html#37";
	lesson_num = "Lesson 3"
  }
if (cross_ref == 38) {
	data="JWW_FGB3.html#38";
	lesson_num = "Lesson 3"
  }
if (cross_ref == 39) {
	data="JWW_FGB3.html#39";
	lesson_num = "Lesson 3"
  }
if (cross_ref == 43) {
	data="JWW_FGB4.html#43";
	lesson_num = "Lesson 4"
  }
if (cross_ref == 44) {
	data="JWW_FGB4.html#44";
	lesson_num = "Lesson 4"
  }
if (cross_ref == 48) {
	data="JWW_FGB5.html#48";
	lesson_num = "Lesson 5"
  }
if (cross_ref == 49) {
	data="JWW_FGB5.html#49";
	lesson_num = "Lesson 5"
  }
if (cross_ref == 50) {
	data="JWW_FGB5.html#50";
	lesson_num = "Lesson 5"
  }
if (cross_ref == 51) {
	data="JWW_FGB5.html#51";
	lesson_num = "Lesson 5"
  }
if (cross_ref == 52) {
	data="JWW_FGB5.html#52";
	lesson_num = "Lesson 5"
  }
if (cross_ref == 53) {
	data="JWW_FGB5.html#53";
	lesson_num = "Lesson 5"
  }
if (cross_ref == 54) {
	data="JWW_FGB5.html#54";
	lesson_num = "Lesson 5"
  }
if (cross_ref == 55) {
	data="JWW_FGB5.html#55";
	lesson_num = "Lesson 5"
  }
if (cross_ref == 56) {
	data="JWW_FGB5.html#56";
	lesson_num = "Lesson 5"
  }
if (cross_ref == 61) {
	data="JWW_FGB6.html#61";
	lesson_num = "Lesson 6"
  }
if (cross_ref == 62) {
	data="JWW_FGB6.html#62";
	lesson_num = "Lesson 6"
  }
if (cross_ref == 63) {
	data="JWW_FGB7.html#63";
	lesson_num = "Lesson 7"
  }
if (cross_ref == 66) {
	data="JWW_FGB7.html#66";
	lesson_num = "Lesson 7"
  }
if (cross_ref == 67) {
	data="JWW_FGB7.html#67";
	lesson_num = "Lesson 7"
  }
if (cross_ref == 68) {
	data="JWW_FGB7.html#68";
	lesson_num = "Lesson 7"
  }
if (cross_ref == 69) {
	data="JWW_FGB7.html#69";
	lesson_num = "Lesson 7"
  }
if (cross_ref == 70) {
	data="JWW_FGB7.html#70";
	lesson_num = "Lesson 7"
  }
if (cross_ref == 75) {
	data="JWW_FGB8.html#75";
	lesson_num = "Lesson 8"
  }
if (cross_ref == 77) {
	data="JWW_FGB8.html#77";
	lesson_num = "Lesson 8"
  }
if (cross_ref == 78) {
	data="JWW_FGB8.html#78";
	lesson_num = "Lesson 8"
  }
if (cross_ref == 81) {
	data="JWW_FGB9.html#81";
	lesson_num = "Lesson 9"
  }
if (cross_ref == 86) {
	data="new_JWW_FGB10.html#86";
	lesson_num = "Lesson 10"
  }
if (cross_ref == 87) {
	data="new_JWW_FGB10.html#87";
	lesson_num = "Lesson 10"
  }
if (cross_ref == 88) {
	data="new_JWW_FGB10.html#88";
	lesson_num = "Lesson 10"
  }
if (cross_ref == 89) {
	data="new_JWW_FGB10.html#89";
	lesson_num = "Lesson 10"
  }
if (cross_ref == 90) {
	data="new_JWW_FGB10.html#90";
	lesson_num = "Lesson 10"
  }
if (cross_ref == 91) {
	data="new_JWW_FGB10.html#91";
	lesson_num = "Lesson 10"
  }
if (cross_ref == 92) {
	data="new_JWW_FGB10.html#92";
	lesson_num = "Lesson 10"
  }
if (cross_ref == 93) {
	data="new_JWW_FGB10.html#93";
	lesson_num = "Lesson 10"
  }
if (cross_ref == 99) {
	data="JWW_FGB11.html#99";
	lesson_num = "Lesson 11"
  }
if (cross_ref == 100) {
	data="JWW_FGB11.html#100";
	lesson_num = "Lesson 11"
  }
if (cross_ref == 101) {
	data="JWW_FGB11.html#101";
	lesson_num = "Lesson 11"
  }
if (cross_ref == 102) {
	data="JWW_FGB11.html#102";
	lesson_num = "Lesson 11"
  }
if (cross_ref == 105) {
	data="JWW_FGB12.html#105";
	lesson_num = "Lesson 12"
  }
if (cross_ref == 106) {
	data="JWW_FGB12.html#106";
	lesson_num = "Lesson 12"
  }
if (cross_ref == 107) {
	data="JWW_FGB12.html#107";
	lesson_num = "Lesson 12"
  }
if (cross_ref == 108) {
	data="JWW_FGB12.html#108";
	lesson_num = "Lesson 12"
  }
if (cross_ref == 109) {
	data="JWW_FGB12.html#109";
	lesson_num = "Lesson 12"
  }
if (cross_ref == 111) {
	data="JWW_FGB12.html#111";
	lesson_num = "Lesson 12"
  }
if (cross_ref == 112) {
	data="JWW_FGB12.html#112";
	lesson_num = "Lesson 12"
  }
if (cross_ref == 113) {
	data="JWW_FGB12.html#113";
	lesson_num = "Lesson 12"
  }
if (cross_ref == 114) {
	data="JWW_FGB12.html#114";
	lesson_num = "Lesson 12"
  }
if (cross_ref == 115) {
	data="JWW_FGB12.html#115";
	lesson_num = "Lesson 12"
  }
if (cross_ref == 121) {
	data="JWW_FGB13.html#121";
	lesson_num = "Lesson 13"
  }
if (cross_ref == 122) {
	data="JWW_FGB13.html#122";
	lesson_num = "Lesson 13"
  }
if (cross_ref == 125) {
	data="JWW_FGB13.html#125";
	lesson_num = "Lesson 13"
  }
if (cross_ref == 126) {
	data="JWW_FGB14.html#126";
	lesson_num = "Lesson 14"
  }
if (cross_ref == 127) {
	data="JWW_FGB14.html#127";
	lesson_num = "Lesson 14"
  }
if (cross_ref == 128) {
	data="JWW_FGB14.html#128";
	lesson_num = "Lesson 14"
  }
if (cross_ref == 129) {
	data="JWW_FGB14.html#129";
	lesson_num = "Lesson 14"
  }
if (cross_ref == 130) {
	data="JWW_FGB14.html#130";
	lesson_num = "Lesson 14"
  }
if (cross_ref == 135) {
	data="JWW_FGB15.html#135";
	lesson_num = "Lesson 15"
  }
if (cross_ref == 136) {
	data="JWW_FGB15.html#136";
	lesson_num = "Lesson 15"
  }
if (cross_ref == 138) {
	data="JWW_FGB15.html#138";
	lesson_num = "Lesson 15"
  }
if (cross_ref == 139) {
	data="JWW_FGB15.html#139";
	lesson_num = "Lesson 15"
  }
if (cross_ref == 140) {
	data="JWW_FGB15.html#140";
	lesson_num = "Lesson 15"
  }
if (cross_ref == 144) {
	data="JWW_FGB15.html#144";
	lesson_num = "Lesson 15"
  }
if (cross_ref == 145) {
	data="JWW_FGB16.html#145";
	lesson_num = "Lesson 16"
  }
if (cross_ref == 146) {
	data="JWW_FGB16.html#146";
	lesson_num = "Lesson 16"
  }
if (cross_ref == 147) {
	data="JWW_FGB16.html#147";
	lesson_num = "Lesson 16"
  }
if (cross_ref == 148) {
	data="JWW_FGB16.html#148";
	lesson_num = "Lesson 16"
  }
if (cross_ref == 149) {
	data="JWW_FGB16.html#149";
	lesson_num = "Lesson 16"
  }
if (cross_ref == 150) {
	data="JWW_FGB16.html#150";
	lesson_num = "Lesson 16"
  }
if (cross_ref == 153) {
	data="JWW_FGB16.html#153";
	lesson_num = "Lesson 16"
  }
if (cross_ref == 154) {
	data="JWW_FGB17.html#154";
	lesson_num = "Lesson 17"
  }
if (cross_ref == 155) {
	data="JWW_FGB17.html#155";
	lesson_num = "Lesson 17"
  }
if (cross_ref == 156) {
	data="JWW_FGB17.html#156";
	lesson_num = "Lesson 17"
  }
if (cross_ref == 157) {
	data="JWW_FGB17.html#157";
	lesson_num = "Lesson 17"
  }
if (cross_ref == 158) {
	data="JWW_FGB17.html#158";
	lesson_num = "Lesson 17"
  }
if (cross_ref == 159) {
	data="JWW_FGB17.html#159";
	lesson_num = "Lesson 17"
  }
if (cross_ref == 160) {
	data="JWW_FGB17.html#160";
	lesson_num = "Lesson 17"
  }
if (cross_ref == 161) {
	data="JWW_FGB17.html#161";
	lesson_num = "Lesson 17"
  }
if (cross_ref == 165) {
	data="JWW_FGB18.html#165";
	lesson_num = "Lesson 18"
  }
if (cross_ref == 166) {
	data="JWW_FGB18.html#166";
	lesson_num = "Lesson 18"
  }
if (cross_ref == 167) {
	data="JWW_FGB18.html#167";
	lesson_num = "Lesson 18"
  }
if (cross_ref == 168) {
	data="JWW_FGB18.html#168";
	lesson_num = "Lesson 18"
  }
if (cross_ref == 169) {
	data="JWW_FGB18.html#169";
	lesson_num = "Lesson 18"
  }
if (cross_ref == 170) {
	data="JWW_FGB18.html#170";
	lesson_num = "Lesson 18"
  }
if (cross_ref == 173) {
	data="JWW_FGB18.html#173";
	lesson_num = "Lesson 18"
  }
if (cross_ref == 174) {
	data="JWW_FGB19.html#174";
	lesson_num = "Lesson 19"
  }
if (cross_ref == 175) {
	data="JWW_FGB19.html#175";
	lesson_num = "Lesson 19"
  }
if (cross_ref == 176) {
	data="JWW_FGB19.html#176";
	lesson_num = "Lesson 19"
  }
if (cross_ref == 177) {
	data="JWW_FGB19.html#177";
	lesson_num = "Lesson 19"
  }
if (cross_ref == 178) {
	data="JWW_FGB19.html#178";
	lesson_num = "Lesson 19"
  }
if (cross_ref == 182) {
	data="JWW_FGB20.html#182";
	lesson_num = "Lesson 20"
  }
if (cross_ref == 183) {
	data="JWW_FGB20.html#183";
	lesson_num = "Lesson 20"
  }
if (cross_ref == 184) {
	data="JWW_FGB20.html#184";
	lesson_num = "Lesson 20"
  }
if (cross_ref == 185) {
	data="JWW_FGB20.html#185";
	lesson_num = "Lesson 20"
  }
if (cross_ref == 186) {
	data="JWW_FGB20.html#186";
	lesson_num = "Lesson 20"
  }
if (cross_ref == 187) {
	data="JWW_FGB20.html#187";
	lesson_num = "Lesson 20"
  }
if (cross_ref == 188) {
	data="JWW_FGB20.html#188";
	lesson_num = "Lesson 20"
  }
if (cross_ref == 191) {
	data="JWW_FGB20.html#191";
	lesson_num = "Lesson 20"
  }
if (cross_ref == 192) {
	data="JWW_FGB21.html#192";
	lesson_num = "Lesson 21"
  }
if (cross_ref == 193) {
	data="JWW_FGB21.html#193";
	lesson_num = "Lesson 21"
  }
if (cross_ref == 194) {
	data="JWW_FGB21.html#194";
	lesson_num = "Lesson 21"
  }
if (cross_ref == 195) {
	data="JWW_FGB21.html#195";
	lesson_num = "Lesson 21"
  }
if (cross_ref == 196) {
	data="JWW_FGB21.html#196";
	lesson_num = "Lesson 21"
  }
if (cross_ref == 197) {
	data="JWW_FGB21.html#197";
	lesson_num = "Lesson 21"
  }
if (cross_ref == 198) {
	data="JWW_FGB21.html#198";
	lesson_num = "Lesson 21"
  }
if (cross_ref == 199) {
	data="JWW_FGB21.html#199";
	lesson_num = "Lesson 21"
  }
if (cross_ref == 200) {
	data="JWW_FGB21.html#200";
	lesson_num = "Lesson 21"
  }
if (cross_ref == 201) {
	data="JWW_FGB21.html#201";
	lesson_num = "Lesson 21"
  }
if (cross_ref == 202) {
	data="JWW_FGB21.html#202";
	lesson_num = "Lesson 21"
  }
if (cross_ref == 203) {
	data="JWW_FGB21.html#203";
	lesson_num = "Lesson 21"
  }
if (cross_ref == 204) {
	data="JWW_FGB21.html#204";
	lesson_num = "Lesson 21"
  }
if (cross_ref == 208) {
	data="JWW_FGB22.html#208";
	lesson_num = "Lesson 22"
  }
if (cross_ref == 209) {
	data="JWW_FGB22.html#209";
	lesson_num = "Lesson 22"
  }
if (cross_ref == 210) {
	data="JWW_FGB22.html#210";
	lesson_num = "Lesson 22"
  }
if (cross_ref == 212) {
	data="JWW_FGB22.html#212";
	lesson_num = "Lesson 22"
  }
if (cross_ref == 215) {
	data="JWW_FGB22.html#215";
	lesson_num = "Lesson 22"
  }
if (cross_ref == 216) {
	data="JWW_FGB23.html#216";
	lesson_num = "Lesson 23"
  }
if (cross_ref == 217) {
	data="JWW_FGB23.html#217";
	lesson_num = "Lesson 23"
  }
if (cross_ref == 219) {
	data="JWW_FGB23.html#219";
	lesson_num = "Lesson 23"
  }
if (cross_ref == 220) {
	data="JWW_FGB23.html#220";
	lesson_num = "Lesson 23"
  }
if (cross_ref == 222) {
	data="JWW_FGB23.html#222";
	lesson_num = "Lesson 23"
  }
if (cross_ref == 226) {
	data="JWW_FGB24.html#226";
	lesson_num = "Lesson 24"
  }
if (cross_ref == 227) {
	data="JWW_FGB24.html#227";
	lesson_num = "Lesson 24"
  }
if (cross_ref == 228) {
	data="JWW_FGB24.html#228";
	lesson_num = "Lesson 24"
  }
if (cross_ref == 229) {
	data="JWW_FGB24.html#229";
	lesson_num = "Lesson 24"
  }
if (cross_ref == 230) {
	data="JWW_FGB24.html#230";
	lesson_num = "Lesson 24"
  }
if (cross_ref == 231) {
	data="JWW_FGB24.html#231";
	lesson_num = "Lesson 24"
  }
if (cross_ref == 232) {
	data="JWW_FGB24.html#232";
	lesson_num = "Lesson 24"
  }
if (cross_ref == 233) {
	data="JWW_FGB24.html#233";
	lesson_num = "Lesson 24"
  }
if (cross_ref == 234) {
	data="JWW_FGB24.html#234";
	lesson_num = "Lesson 24"
  }
if (cross_ref == 235) {
	data="JWW_FGB24.html#235";
	lesson_num = "Lesson 24"
  }
if (cross_ref == 238) {
	data="JWW_FGB24.html#238";
	lesson_num = "Lesson 24"
  }
if (cross_ref == 239) {
	data="JWW_FGB25.html#239";
	lesson_num = "Lesson 25"
  }
if (cross_ref == 240) {
	data="JWW_FGB25.html#240";
	lesson_num = "Lesson 25"
  }
if (cross_ref == 241) {
	data="JWW_FGB25.html#241";
	lesson_num = "Lesson 25"
  }
if (cross_ref == 242) {
	data="JWW_FGB25.html#242";
	lesson_num = "Lesson 25"
  }
if (cross_ref == 243) {
	data="JWW_FGB25.html#243";
	lesson_num = "Lesson 25"
  }
if (cross_ref == 244) {
	data="JWW_FGB25.html#244";
	lesson_num = "Lesson 25"
  }
if (cross_ref == 245) {
	data="JWW_FGB25.html#245";
	lesson_num = "Lesson 25"
  }
if (cross_ref == 249) {
	data="JWW_FGB26.html#249";
	lesson_num = "Lesson 26"
  }
if (cross_ref == 250) {
	data="JWW_FGB26.html#250";
	lesson_num = "Lesson 26"
  }
if (cross_ref == 251) {
	data="JWW_FGB26.html#251";
	lesson_num = "Lesson 26"
  }
if (cross_ref == 252) {
	data="JWW_FGB26.html#252";
	lesson_num = "Lesson 26"
  }
if (cross_ref == 253) {
	data="JWW_FGB26.html#253";
	lesson_num = "Lesson 26"
  }
if (cross_ref == 254) {
	data="JWW_FGB26.html#254";
	lesson_num = "Lesson 26"
  }
if (cross_ref == 255) {
	data="JWW_FGB26.html#255";
	lesson_num = "Lesson 26"
  }
if (cross_ref == 259) {
	data="JWW_FGB27.html#259";
	lesson_num = "Lesson 27"
  }
if (cross_ref == 260) {
	data="JWW_FGB27.html#260";
	lesson_num = "Lesson 27"
  }
if (cross_ref == 261) {
	data="JWW_FGB27.html#261";
	lesson_num = "Lesson 27"
  }
if (cross_ref == 262) {
	data="JWW_FGB27.html#262";
	lesson_num = "Lesson 27"
  }
if (cross_ref == 263) {
	data="JWW_FGB27.html#263";
	lesson_num = "Lesson 27"
  }
if (cross_ref == 264) {
	data="JWW_FGB27.html#264";
	lesson_num = "Lesson 27"
  }
if (cross_ref == 267) {
	data="JWW_FGB27.html#267";
	lesson_num = "Lesson 27"
  }
if (cross_ref == 268) {
	data="JWW_FGB28.html#268";
	lesson_num = "Lesson 28"
  }
if (cross_ref == 269) {
	data="JWW_FGB28.html#269";
	lesson_num = "Lesson 28"
  }
if (cross_ref == 270) {
	data="JWW_FGB28.html#270";
	lesson_num = "Lesson 28"
  }
if (cross_ref == 271) {
	data="JWW_FGB28.html#271";
	lesson_num = "Lesson 28"
  }
if (cross_ref == 272) {
	data="JWW_FGB28.html#272";
	lesson_num = "Lesson 28"
  }
if (cross_ref == 273) {
	data="JWW_FGB28.html#273";
	lesson_num = "Lesson 28"
  }
if (cross_ref == 274) {
	data="JWW_FGB28.html#274";
	lesson_num = "Lesson 28"
  }
if (cross_ref == 275) {
	data="JWW_FGB28.html#275";
	lesson_num = "Lesson 28"
  }
if (cross_ref == 278) {
	data="JWW_FGB28.html#278";
	lesson_num = "Lesson 28"
  }
if (cross_ref == 279) {
	data="JWW_FGB29.html#279";
	lesson_num = "Lesson 29"
  }
if (cross_ref == 280) {
	data="JWW_FGB29.html#280";
	lesson_num = "Lesson 29"
  }
if (cross_ref == 281) {
	data="JWW_FGB29.html#281";
	lesson_num = "Lesson 29"
  }
if (cross_ref == 282) {
	data="JWW_FGB29.html#282";
	lesson_num = "Lesson 29"
  }
if (cross_ref == 285) {
	data="JWW_FGB29.html#285";
	lesson_num = "Lesson 29"
  }
if (cross_ref == 286) {
	data="JWW_FGB30.html#286";
	lesson_num = "Lesson 30"
  }
if (cross_ref == 287) {
	data="JWW_FGB30.html#287";
	lesson_num = "Lesson 30"
  }
if (cross_ref == 288) {
	data="JWW_FGB30.html#288";
	lesson_num = "Lesson 30"
  }
if (cross_ref == 289) {
	data="JWW_FGB30.html#289";
	lesson_num = "Lesson 30"
  }
if (cross_ref == 290) {
	data="JWW_FGB30.html#290";
	lesson_num = "Lesson 30"
  }
if (cross_ref == 291) {
	data="JWW_FGB30.html#291";
	lesson_num = "Lesson 30"
  }
if (cross_ref == 292) {
	data="JWW_FGB30.html#292";
	lesson_num = "Lesson 30"
  }
if (cross_ref == 296) {
	data="JWW_FGB31.html#296";
	lesson_num = "Lesson 31"
  }
if (cross_ref == 297) {
	data="JWW_FGB31.html#297";
	lesson_num = "Lesson 31"
  }
if (cross_ref == 298) {
	data="JWW_FGB31.html#298";
	lesson_num = "Lesson 31"
  }
if (cross_ref == 299) {
	data="JWW_FGB31.html#299";
	lesson_num = "Lesson 31"
  }
if (cross_ref == 300) {
	data="JWW_FGB31.html#300";
	lesson_num = "Lesson 31"
  }
if (cross_ref == 301) {
	data="JWW_FGB31.html#301";
	lesson_num = "Lesson 31"
  }
if (cross_ref == 302) {
	data="JWW_FGB31.html#302";
	lesson_num = "Lesson 31"
  }
if (cross_ref == 303) {
	data="JWW_FGB31.html#303";
	lesson_num = "Lesson 31"
  }
if (cross_ref == 304) {
	data="JWW_FGB31.html#304";
	lesson_num = "Lesson 31"
  }
if (cross_ref == 305) {
	data="JWW_FGB31.html#305";
	lesson_num = "Lesson 31"
  }
if (cross_ref == 306) {
	data="JWW_FGB31.html#306";
	lesson_num = "Lesson 31"
  }
if (cross_ref == 307) {
	data="JWW_FGB31.html#307";
	lesson_num = "Lesson 31"
  }
if (cross_ref == 308) {
	data="JWW_FGB31.html#308";
	lesson_num = "Lesson 31"
  }
if (cross_ref == 311) {
	data="JWW_FGB31.html#311";
	lesson_num = "Lesson 31"
  }
if (cross_ref == 312) {
	data="JWW_FGB32.html#312";
	lesson_num = "Lesson 32"
  }
if (cross_ref == 313) {
	data="JWW_FGB32.html#313";
	lesson_num = "Lesson 32"
  }
if (cross_ref == 314) {
	data="JWW_FGB32.html#314";
	lesson_num = "Lesson 32"
  }
if (cross_ref == 315) {
	data="JWW_FGB32.html#315";
	lesson_num = "Lesson 32"
  }
if (cross_ref == 316) {
	data="JWW_FGB32.html#316";
	lesson_num = "Lesson 32"
  }
if (cross_ref == 317) {
	data="JWW_FGB32.html#317";
	lesson_num = "Lesson 32"
  }
if (cross_ref == 318) {
	data="JWW_FGB32.html#318";
	lesson_num = "Lesson 32"
  }
if (cross_ref == 321) {
	data="JWW_FGB32.html#321";
	lesson_num = "Lesson 32"
  }
if (cross_ref == 322) {
	data="JWW_FGB33.html#322";
	lesson_num = "Lesson 33"
  }
if (cross_ref == 323) {
	data="JWW_FGB33.html#323";
	lesson_num = "Lesson 33"
  }
if (cross_ref == 324) {
	data="JWW_FGB33.html#324";
	lesson_num = "Lesson 33"
  }
if (cross_ref == 325) {
	data="JWW_FGB33.html#325";
	lesson_num = "Lesson 33"
  }
if (cross_ref == 326) {
	data="JWW_FGB33.html#326";
	lesson_num = "Lesson 33"
  }
if (cross_ref == 327) {
	data="JWW_FGB33.html#327";
	lesson_num = "Lesson 33"
  }
if (cross_ref == 330) {
	data="JWW_FGB33.html#330";
	lesson_num = "Lesson 33"
  }
if (cross_ref == 331) {
	data="JWW_FGB34.html#331";
	lesson_num = "Lesson 34"
  }
if (cross_ref == 332) {
	data="JWW_FGB34.html#332";
	lesson_num = "Lesson 34"
  }
if (cross_ref == 335) {
	data="JWW_FGB34.html#335";
	lesson_num = "Lesson 34"
  }
if (cross_ref == 339) {
	data="JWW_FGB35.html#339";
	lesson_num = "Lesson 35"
  }
if (cross_ref == 340) {
	data="JWW_FGB35.html#340";
	lesson_num = "Lesson 35"
  }
if (cross_ref == 341) {
	data="JWW_FGB35.html#341";
	lesson_num = "Lesson 35"
  }
if (cross_ref == 344) {
	data="JWW_FGB35.html#344";
	lesson_num = "Lesson 35"
  }
if (cross_ref == 345) {
	data="JWW_FGB36.html#345";
	lesson_num = "Lesson 36"
  }
if (cross_ref == 346) {
	data="JWW_FGB36.html#346";
	lesson_num = "Lesson 36"
  }
if (cross_ref == 347) {
	data="JWW_FGB36.html#347";
	lesson_num = "Lesson 36"
  }
if (cross_ref == 348) {
	data="JWW_FGB36.html#348";
	lesson_num = "Lesson 36"
  }
if (cross_ref == 349) {
	data="JWW_FGB36.html#349";
	lesson_num = "Lesson 36"
  }
if (cross_ref == 352) {
	data="JWW_FGB36.html#352";
	lesson_num = "Lesson 36"
  }
if (cross_ref == 353) {
	data="JWW_FGB37.html#353";
	lesson_num = "Lesson 37"
  }
if (cross_ref == 354) {
	data="JWW_FGB37.html#354";
	lesson_num = "Lesson 37"
  }
if (cross_ref == 355) {
	data="JWW_FGB37.html#355";
	lesson_num = "Lesson 37"
  }
if (cross_ref == 356) {
	data="JWW_FGB37.html#356";
	lesson_num = "Lesson 37"
  }
if (cross_ref == 359) {
	data="JWW_FGB37.html#359";
	lesson_num = "Lesson 37"
  }
if (cross_ref == 360) {
	data="JWW_FGB38.html#360";
	lesson_num = "Lesson 38"
  }
if (cross_ref == 361) {
	data="JWW_FGB38.html#361";
	lesson_num = "Lesson 38"
  }
if (cross_ref == 362) {
	data="JWW_FGB38.html#362";
	lesson_num = "Lesson 38"
  }
if (cross_ref == 363) {
	data="JWW_FGB38.html#363";
	lesson_num = "Lesson 38"
  }
if (cross_ref == 364) {
	data="JWW_FGB38.html#364";
	lesson_num = "Lesson 38"
  }
if (cross_ref == 365) {
	data="JWW_FGB38.html#365";
	lesson_num = "Lesson 38"
  }
if (cross_ref == 368) {
	data="JWW_FGB38.html#368";
	lesson_num = "Lesson 38"
  }
if (cross_ref == 369) {
	data="JWW_FGB39.html#369";
	lesson_num = "Lesson 39"
  }
if (cross_ref == 370) {
	data="JWW_FGB39.html#370";
	lesson_num = "Lesson 39"
  }
if (cross_ref == 371) {
	data="JWW_FGB39.html#371";
	lesson_num = "Lesson 39"
  }
if (cross_ref == 372) {
	data="JWW_FGB39.html#372";
	lesson_num = "Lesson 39"
  }
if (cross_ref == 373) {
	data="JWW_FGB39.html#373";
	lesson_num = "Lesson 39"
  }
if (cross_ref == 374) {
	data="JWW_FGB39.html#374";
	lesson_num = "Lesson 39"
  }
if (cross_ref == 377) {
	data="JWW_FGB39.html#377";
	lesson_num = "Lesson 39"
  }
if (cross_ref == 378) {
	data="JWW_FGB40.html#378";
	lesson_num = "Lesson 40"
  }
if (cross_ref == 379) {
	data="JWW_FGB40.html#379";
	lesson_num = "Lesson 40"
  }
if (cross_ref == 380) {
	data="JWW_FGB40.html#380";
	lesson_num = "Lesson 40"
  }
if (cross_ref == 381) {
	data="JWW_FGB40.html#381";
	lesson_num = "Lesson 40"
  }
if (cross_ref == 382) {
	data="JWW_FGB40.html#382";
	lesson_num = "Lesson 40"
  }
if (cross_ref == 385) {
	data="JWW_FGB40.html#385";
	lesson_num = "Lesson 40"
  }
if (cross_ref == 386) {
	data="JWW_FGB41.html#386";
	lesson_num = "Lesson 41"
  }
if (cross_ref == 387) {
	data="JWW_FGB41.html#387";
	lesson_num = "Lesson 41"
  }
if (cross_ref == 388) {
	data="JWW_FGB41.html#388";
	lesson_num = "Lesson 41"
  }
if (cross_ref == 393) {
	data="JWW_FGB42.html#393";
	lesson_num = "Lesson 42"
  }
if (cross_ref == 394) {
	data="JWW_FGB42.html#394";
	lesson_num = "Lesson 42"
  }
if (cross_ref == 395) {
	data="JWW_FGB42.html#395";
	lesson_num = "Lesson 42"
  }
if (cross_ref == 400) {
	data="JWW_FGB43.html#400";
	lesson_num = "Lesson 43"
  }
if (cross_ref == 401) {
	data="JWW_FGB43.html#401";
	lesson_num = "Lesson 43"
  }
if (cross_ref == 402) {
	data="JWW_FGB43.html#402";
	lesson_num = "Lesson 43"
  }
if (cross_ref == 403) {
	data="JWW_FGB43.html#403";
	lesson_num = "Lesson 43"
  }
if (cross_ref == 404) {
	data="JWW_FGB43.html#404";
	lesson_num = "Lesson 43"
  }
if (cross_ref == 405) {
	data="JWW_FGB43.html#405";
	lesson_num = "Lesson 43"
  }
if (cross_ref == 406) {
	data="JWW_FGB43.html#406";
	lesson_num = "Lesson 43"
  }
if (cross_ref == 407) {
	data="JWW_FGB43.html#407";
	lesson_num = "Lesson 43"
  }
if (cross_ref == 408) {
	data="JWW_FGB43.html#408";
	lesson_num = "Lesson 43"
  }
if (cross_ref == 409) {
	data="JWW_FGB43.html#409";
	lesson_num = "Lesson 43"
  }
if (cross_ref == 412) {
	data="JWW_FGB43.html#412";
	lesson_num = "Lesson 43"
  }
if (cross_ref == 413) {
	data="JWW_FGB44.html#413";
	lesson_num = "Lesson 44"
  }
if (cross_ref == 414) {
	data="JWW_FGB44.html#414";
	lesson_num = "Lesson 44"
  }
if (cross_ref == 415) {
	data="JWW_FGB44.html#415";
	lesson_num = "Lesson 44"
  }
if (cross_ref == 416) {
	data="JWW_FGB44.html#416";
	lesson_num = "Lesson 44"
  }
if (cross_ref == 420) {
	data="JWW_FGB45.html#420";
	lesson_num = "Lesson 45"
  }
if (cross_ref == 421) {
	data="JWW_FGB45.html#421";
	lesson_num = "Lesson 45"
  }
if (cross_ref == 422) {
	data="JWW_FGB45.html#422";
	lesson_num = "Lesson 45"
  }
if (cross_ref == 425) {
	data="JWW_FGB45.html#425";
	lesson_num = "Lesson 45"
  }
if (cross_ref == 426) {
	data="JWW_FGB46.html#426";
	lesson_num = "Lesson 46"
  }
if (cross_ref == 427) {
	data="JWW_FGB46.html#427";
	lesson_num = "Lesson 46"
  }
if (cross_ref == 428) {
	data="JWW_FGB46.html#428";
	lesson_num = "Lesson 46"
  }
if (cross_ref == 429) {
	data="JWW_FGB46.html#429";
	lesson_num = "Lesson 46"
  }
if (cross_ref == 432) {
	data="JWW_FGB46.html#432";
	lesson_num = "Lesson 46"
  }
if (cross_ref == 433) {
	data="JWW_FGB47.html#433";
	lesson_num = "Lesson 47"
  }
if (cross_ref == 435) {
	data="JWW_FGB47.html#435";
	lesson_num = "Lesson 47"
  }
if (cross_ref == 436) {
	data="JWW_FGB47.html#436";
	lesson_num = "Lesson 47"
  }
if (cross_ref == 437) {
	data="JWW_FGB47.html#437";
	lesson_num = "Lesson 47"
  }
if (cross_ref == 438) {
	data="JWW_FGB47.html#438";
	lesson_num = "Lesson 47"
  }
if (cross_ref == 439) {
	data="JWW_FGB47.html#439";
	lesson_num = "Lesson 47"
  }
if (cross_ref == 443) {
	data="JWW_FGB48.html#443";
	lesson_num = "Lesson 48"
  }
if (cross_ref == 445) {
	data="JWW_FGB48.html#445";
	lesson_num = "Lesson 48"
  }
if (cross_ref == 446) {
	data="JWW_FGB48.html#446";
	lesson_num = "Lesson 48"
  }
if (cross_ref == 447) {
	data="JWW_FGB48.html#447";
	lesson_num = "Lesson 48"
  }
if (cross_ref == 448) {
	data="JWW_FGB48.html#448";
	lesson_num = "Lesson 48"
  }
if (cross_ref == 449) {
	data="JWW_FGB48.html#449";
	lesson_num = "Lesson 48"
  }
if (cross_ref == 453) {
	data="JWW_FGB49.html#453";
	lesson_num = "Lesson 49"
  }
if (cross_ref == 454) {
	data="JWW_FGB49.html#454";
	lesson_num = "Lesson 49"
  }
if (cross_ref == 455) {
	data="JWW_FGB49.html#455";
	lesson_num = "Lesson 49"
  }
if (cross_ref == 456) {
	data="JWW_FGB49.html#456";
	lesson_num = "Lesson 49"
  }
if (cross_ref == 457) {
	data="JWW_FGB49.html#457";
	lesson_num = "Lesson 49"
  }
if (cross_ref == 458) {
	data="JWW_FGB49.html#458";
	lesson_num = "Lesson 49"
  }
if (cross_ref == 459) {
	data="JWW_FGB49.html#459";
	lesson_num = "Lesson 49"
  }
if (cross_ref == 460) {
	data="JWW_FGB49.html#460";
	lesson_num = "Lesson 49"
  }
if (cross_ref == 461) {
	data="JWW_FGB49.html#461";
	lesson_num = "Lesson 49"
  }
if (cross_ref == 462) {
	data="JWW_FGB49.html#462";
	lesson_num = "Lesson 49"
  }
if (cross_ref == 466) {
	data="JWW_FGB50.html#466";
	lesson_num = "Lesson 50"
  }
if (cross_ref == 467) {
	data="JWW_FGB50.html#467";
	lesson_num = "Lesson 50"
  }
if (cross_ref == 468) {
	data="JWW_FGB50.html#468";
	lesson_num = "Lesson 50"
  }
if (cross_ref == 469) {
	data="JWW_FGB50.html#469";
	lesson_num = "Lesson 50"
  }
if (cross_ref == 470) {
	data="JWW_FGB50.html#470";
	lesson_num = "Lesson 50"
  }
if (cross_ref == 471) {
	data="JWW_FGB50.html#471";
	lesson_num = "Lesson 50"
  }
if (cross_ref == 472) {
	data="JWW_FGB50.html#472";
	lesson_num = "Lesson 50"
  }
if (cross_ref == 476) {
	data="JWW_FGB51.html#476";
	lesson_num = "Lesson 51"
  }
if (cross_ref == 477) {
	data="JWW_FGB51.html#477";
	lesson_num = "Lesson 51"
  }
if (cross_ref == 478) {
	data="JWW_FGB51.html#478";
	lesson_num = "Lesson 51"
  }
if (cross_ref == 481) {
	data="JWW_FGB51.html#481";
	lesson_num = "Lesson 51"
  }
if (cross_ref == 482) {
	data="JWW_FGB52.html#482";
	lesson_num = "Lesson 52"
  }
if (cross_ref == 483) {
	data="JWW_FGB52.html#483";
	lesson_num = "Lesson 52"
  }
if (cross_ref == 484) {
	data="JWW_FGB52.html#484";
	lesson_num = "Lesson 52"
  }
if (cross_ref == 485) {
	data="JWW_FGB52.html#485";
	lesson_num = "Lesson 52"
  }
if (cross_ref == 486) {
	data="JWW_FGB52.html#486";
	lesson_num = "Lesson 52"
  }
if (cross_ref == 487) {
	data="JWW_FGB52.html#487";
	lesson_num = "Lesson 52"
  }
if (cross_ref == 488) {
	data="JWW_FGB52.html#488";
	lesson_num = "Lesson 52"
  }
if (cross_ref == 491) {
	data="JWW_FGB52.html#491";
	lesson_num = "Lesson 52"
  }
if (cross_ref == 492) {
	data="JWW_FGB53.html#492";
	lesson_num = "Lesson 53"
  }
if (cross_ref == 493) {
	data="JWW_FGB53.html#493";
	lesson_num = "Lesson 53"
  }
if (cross_ref == 494) {
	data="JWW_FGB53.html#494";
	lesson_num = "Lesson 53"
  }
if (cross_ref == 495) {
	data="JWW_FGB53.html#495";
	lesson_num = "Lesson 53"
  }
if (cross_ref == 496) {
	data="JWW_FGB53.html#496";
	lesson_num = "Lesson 53"
  }
if (cross_ref == 499) {
	data="JWW_FGB53.html#499";
	lesson_num = "Lesson 53"
  }
if (cross_ref == 500) {
	data="JWW_FGB54.html#500";
	lesson_num = "Lesson 54"
  }
if (cross_ref == 501) {
	data="JWW_FGB54.html#501";
	lesson_num = "Lesson 54"
  }
if (cross_ref == 502) {
	data="JWW_FGB54.html#502";
	lesson_num = "Lesson 54"
  }
if (cross_ref == 505) {
	data="JWW_FGB54.html#505";
	lesson_num = "Lesson 54"
  }
if (cross_ref == 506) {
	data="JWW_FGB55.html#506";
	lesson_num = "Lesson 55"
  }
if (cross_ref == 507) {
	data="JWW_FGB55.html#507";
	lesson_num = "Lesson 55"
  }
if (cross_ref == 508) {
	data="JWW_FGB55.html#508";
	lesson_num = "Lesson 55"
  }
if (cross_ref == 512) {
	data="JWW_FGB56.html#512";
	lesson_num = "Lesson 56"
  }
if (cross_ref == 513) {
	data="JWW_FGB56.html#513";
	lesson_num = "Lesson 56"
  }
if (cross_ref == 514) {
	data="JWW_FGB56.html#514";
	lesson_num = "Lesson 56"
  }
if (cross_ref == 515) {
	data="JWW_FGB56.html#515";
	lesson_num = "Lesson 56"
  }
if (cross_ref == 516) {
	data="JWW_FGB56.html#516";
	lesson_num = "Lesson 56"
  }
if (cross_ref == 517) {
	data="JWW_FGB56.html#517";
	lesson_num = "Lesson 56"
  }
if (cross_ref == 518) {
	data="JWW_FGB56.html#518";
	lesson_num = "Lesson 56"
  }
if (cross_ref == 521) {
	data="JWW_FGB56.html#521";
	lesson_num = "Lesson 56"
  }
if (cross_ref == 522) {
	data="JWW_FGB57.html#522";
	lesson_num = "Lesson 57"
  }
if (cross_ref == 523) {
	data="JWW_FGB57.html#523";
	lesson_num = "Lesson 57"
  }
if (cross_ref == 524) {
	data="JWW_FGB57.html#524";
	lesson_num = "Lesson 57"
  }
if (cross_ref == 525) {
	data="JWW_FGB57.html#525";
	lesson_num = "Lesson 57"
  }
if (cross_ref == 527) {
	data="JWW_FGB57.html#527";
	lesson_num = "Lesson 57"
  }
if (cross_ref == 530) {
	data="JWW_FGB57.html#530";
	lesson_num = "Lesson 57"
  }
if (cross_ref == 531) {
	data="JWW_FGB58.html#531";
	lesson_num = "Lesson 58"
  }
if (cross_ref == 532) {
	data="JWW_FGB58.html#532";
	lesson_num = "Lesson 58"
  }
if (cross_ref == 533) {
	data="JWW_FGB58.html#533";
	lesson_num = "Lesson 58"
  }
if (cross_ref == 534) {
	data="JWW_FGB58.html#534";
	lesson_num = "Lesson 58"
  }
if (cross_ref == 535) {
	data="JWW_FGB58.html#535";
	lesson_num = "Lesson 58"
  }
if (cross_ref == 536) {
	data="JWW_FGB58.html#536";
	lesson_num = "Lesson 58"
  }
if (cross_ref == 537) {
	data="JWW_FGB58.html#537";
	lesson_num = "Lesson 58"
  }
if (cross_ref == 540) {
	data="JWW_FGB58.html#540";
	lesson_num = "Lesson 58"
  }
if (cross_ref == 541) {
	data="JWW_FGB59.html#541";
	lesson_num = "Lesson 59"
  }
if (cross_ref == 542) {
	data="JWW_FGB59.html#542";
	lesson_num = "Lesson 59"
  }
if (cross_ref == 543) {
	data="JWW_FGB59.html#543";
	lesson_num = "Lesson 59"
  }
if (cross_ref == 544) {
	data="JWW_FGB59.html#544";
	lesson_num = "Lesson 59"
  }
if (cross_ref == 545) {
	data="JWW_FGB59.html#545";
	lesson_num = "Lesson 59"
  }
if (cross_ref == 546) {
	data="JWW_FGB59.html#546";
	lesson_num = "Lesson 59"
  }
if (cross_ref == 547) {
	data="JWW_FGB59.html#547";
	lesson_num = "Lesson 59"
  }
if (cross_ref == 552) {
	data="JWW_FGB60.html#552";
	lesson_num = "Lesson 60"
  }
if (cross_ref == 553) {
	data="JWW_FGB60.html#553";
	lesson_num = "Lesson 60"
  }
if (cross_ref == 554) {
	data="JWW_FGB60.html#554";
	lesson_num = "Lesson 60"
  }
if (cross_ref == 555) {
	data="JWW_FGB60.html#555";
	lesson_num = "Lesson 60"
  }
if (cross_ref == 556) {
	data="JWW_FGB60.html#556";
	lesson_num = "Lesson 60"
  }
if (cross_ref == 557) {
	data="JWW_FGB60.html#557";
	lesson_num = "Lesson 60"
  }
if (cross_ref == 558) {
	data="JWW_FGB60.html#558";
	lesson_num = "Lesson 60"
  }
if (cross_ref == 559) {
	data="JWW_FGB60.html#559";
	lesson_num = "Lesson 60"
  }
if (cross_ref == 560) {
	data="JWW_FGB60.html#560";
	lesson_num = "Lesson 60"
  }
if (cross_ref == 566) {
	data="JWW_FGB61.html#566";
	lesson_num = "Lesson 61"
  }
if (cross_ref == 568) {
	data="JWW_FGB61.html#568";
	lesson_num = "Lesson 61"
  }
if (cross_ref == 569) {
	data="JWW_FGB61.html#569";
	lesson_num = "Lesson 61"
  }
if (cross_ref == 570) {
	data="JWW_FGB61.html#570";
	lesson_num = "Lesson 61"
  }
if (cross_ref == 571) {
	data="JWW_FGB61.html#571";
	lesson_num = "Lesson 61"
  }
if (cross_ref == 572) {
	data="JWW_FGB61.html#572";
	lesson_num = "Lesson 61"
  }
if (cross_ref == 576) {
	data="JWW_FGB61.html#576";
	lesson_num = "Lesson 61"
  }
if (cross_ref == 577) {
	data="JWW_FGB62.html#577";
	lesson_num = "Lesson 62"
  }
if (cross_ref == 578) {
	data="JWW_FGB62.html#578";
	lesson_num = "Lesson 62"
  }
if (cross_ref == 581) {
	data="JWW_FGB62.html#581";
	lesson_num = "Lesson 62"
  }
if (cross_ref == 582) {
	data="JWW_FGB63.html#582";
	lesson_num = "Lesson 63"
  }
if (cross_ref == 583) {
	data="JWW_FGB63.html#583";
	lesson_num = "Lesson 63"
  }
if (cross_ref == 584) {
	data="JWW_FGB63.html#584";
	lesson_num = "Lesson 63"
  }
if (cross_ref == 585) {
	data="JWW_FGB63.html#585";
	lesson_num = "Lesson 63"
  }
if (cross_ref == 586) {
	data="JWW_FGB63.html#586";
	lesson_num = "Lesson 63"
  }
if (cross_ref == 587) {
	data="JWW_FGB63.html#587";
	lesson_num = "Lesson 63"
  }
if (cross_ref == 588) {
	data="JWW_FGB63.html#588";
	lesson_num = "Lesson 63"
  }
if (cross_ref == 589) {
	data="JWW_FGB63.html#589";
	lesson_num = "Lesson 63"
  }
if (cross_ref == 590) {
	data="JWW_FGB63.html#590";
	lesson_num = "Lesson 63"
  }
if (cross_ref == 591) {
	data="JWW_FGB63.html#591";
	lesson_num = "Lesson 63"
  }
if (cross_ref == 595) {
	data="JWW_FGB64.html#595";
	lesson_num = "Lesson 64"
  }
if (cross_ref == 596) {
	data="JWW_FGB64.html#596";
	lesson_num = "Lesson 64"
  }
if (cross_ref == 597) {
	data="JWW_FGB64.html#597";
	lesson_num = "Lesson 64"
  }
if (cross_ref == 598) {
	data="JWW_FGB64.html#598";
	lesson_num = "Lesson 64"
  }
if (cross_ref == 603) {
	data="JWW_FGB65.html#603";
	lesson_num = "Lesson 65"
  }
if (cross_ref == 604) {
	data="JWW_FGB65.html#604";
	lesson_num = "Lesson 65"
  }
if (cross_ref == 605) {
	data="JWW_FGB65.html#605";
	lesson_num = "Lesson 65"
  }
if (cross_ref == 606) {
	data="JWW_FGB65.html#606";
	lesson_num = "Lesson 65"
  }
if (cross_ref == 607) {
	data="JWW_FGB65.html#607";
	lesson_num = "Lesson 65"
  }
if (cross_ref == 608) {
	data="JWW_FGB65.html#608";
	lesson_num = "Lesson 65"
  }
if (cross_ref == 609) {
	data="JWW_FGB65.html#609";
	lesson_num = "Lesson 65"
  }
if (cross_ref == 610) {
	data="JWW_FGB65.html#610";
	lesson_num = "Lesson 65"
  }
if (cross_ref == 614) {
	data="JWW_FGB66.html#614";
	lesson_num = "Lesson 66"
  }
if (cross_ref == 615) {
	data="JWW_FGB66.html#615";
	lesson_num = "Lesson 66"
  }
if (cross_ref == 618) {
	data="JWW_FGB66.html#618";
	lesson_num = "Lesson 66"
  }
if (cross_ref == 619) {
	data="JWW_FGB67.html#619";
	lesson_num = "Lesson 67"
  }
if (cross_ref == 621) {
	data="JWW_FGB67.html#621";
	lesson_num = "Lesson 67"
  }
if (cross_ref == 623) {
	data="JWW_FGB67.html#623";
	lesson_num = "Lesson 67"
  }
if (cross_ref == 624) {
	data="JWW_FGB67.html#624";
	lesson_num = "Lesson 67"
  }
if (cross_ref == 625) {
	data="JWW_FGB67.html#625";
	lesson_num = "Lesson 67"
  }
if (cross_ref == 626) {
	data="JWW_FGB67.html#626";
	lesson_num = "Lesson 67"
  }
if (cross_ref == 627) {
	data="JWW_FGB67.html#627";
	lesson_num = "Lesson 67"
  }
if (cross_ref == 628) {
	data="JWW_FGB67.html#628";
	lesson_num = "Lesson 67"
  }
if (cross_ref == 629) {
	data="JWW_FGB67.html#629";
	lesson_num = "Lesson 67"
  }
if (cross_ref == 632) {
	data="JWW_FGB67.html#632";
	lesson_num = "Lesson 67"
  }
if (cross_ref == 633) {
	data="JWW_FGB68.html#633";
	lesson_num = "Lesson 68"
  }
if (cross_ref == 634) {
	data="JWW_FGB68.html#634";
	lesson_num = "Lesson 68"
  }
if (cross_ref == 635) {
	data="JWW_FGB68.html#635";
	lesson_num = "Lesson 68"
  }
if (cross_ref == 636) {
	data="JWW_FGB68.html#636";
	lesson_num = "Lesson 68"
  }
if (cross_ref == 637) {
	data="JWW_FGB68.html#637";
	lesson_num = "Lesson 68"
  }
if (cross_ref == 638) {
	data="JWW_FGB68.html#638";
	lesson_num = "Lesson 68"
  }
if (cross_ref == 641) {
	data="JWW_FGB68.html#641";
	lesson_num = "Lesson 68"
  }
if (cross_ref == 643) {
	data="JWW_FGB69.html#643";
	lesson_num = "Lesson 69"
  }
if (cross_ref == 644) {
	data="JWW_FGB69.html#644";
	lesson_num = "Lesson 69"
  }
if (cross_ref == 647) {
	data="JWW_FGB69.html#647";
	lesson_num = "Lesson 69"
  }
if (cross_ref == 648) {
	data="JWW_FGB70.html#648";
	lesson_num = "Lesson 70"
  }
if (cross_ref == 649) {
	data="JWW_FGB70.html#649";
	lesson_num = "Lesson 70"
  }
if (cross_ref == 650) {
	data="JWW_FGB70.html#650";
	lesson_num = "Lesson 70"
  }
if (cross_ref == 651) {
	data="JWW_FGB70.html#651";
	lesson_num = "Lesson 70"
  }
if (cross_ref == 652) {
	data="JWW_FGB70.html#652";
	lesson_num = "Lesson 70"
  }
if (cross_ref == 656) {
	data="JWW_FGB71.html#656";
	lesson_num = "Lesson 71"
  }
if (cross_ref == 657) {
	data="JWW_FGB71.html#657";
	lesson_num = "Lesson 71"
  }
if (cross_ref == 658) {
	data="JWW_FGB71.html#658";
	lesson_num = "Lesson 71"
  }
if (cross_ref == 659) {
	data="JWW_FGB71.html#659";
	lesson_num = "Lesson 71"
  }
if (cross_ref == 660) {
	data="JWW_FGB71.html#660";
	lesson_num = "Lesson 71"
  }
if (cross_ref == 661) {
	data="JWW_FGB71.html#661";
	lesson_num = "Lesson 71"
  }
if (cross_ref == 662) {
	data="JWW_FGB71.html#662";
	lesson_num = "Lesson 71"
  }
if (cross_ref == 663) {
	data="JWW_FGB71.html#663";
	lesson_num = "Lesson 71"
  }
if (cross_ref == 667) {
	data="JWW_FGB71.html#667";
	lesson_num = "Lesson 71"
  }
if (cross_ref == 668) {
	data="JWW_FGB72.html#668";
	lesson_num = "Lesson 72"
  }
if (cross_ref == 669) {
	data="JWW_FGB72.html#669";
	lesson_num = "Lesson 72"
  }
if (cross_ref == 670) {
	data="JWW_FGB72.html#670";
	lesson_num = "Lesson 72"
  }
if (cross_ref == 671) {
	data="JWW_FGB72.html#671";
	lesson_num = "Lesson 72"
  }
if (cross_ref == 672) {
	data="JWW_FGB72.html#672";
	lesson_num = "Lesson 72"
  }
if (cross_ref == 673) {
	data="JWW_FGB72.html#673";
	lesson_num = "Lesson 72"
  }
if (cross_ref == 677) {
	data="JWW_FGB73.html#677";
	lesson_num = "Lesson 73"
  }
if (cross_ref == 678) {
	data="JWW_FGB73.html#678";
	lesson_num = "Lesson 73"
  }
if (cross_ref == 679) {
	data="JWW_FGB73.html#679";
	lesson_num = "Lesson 73"
  }
if (cross_ref == 680) {
	data="JWW_FGB73.html#680";
	lesson_num = "Lesson 73"
  }
if (cross_ref == 681) {
	data="JWW_FGB73.html#681";
	lesson_num = "Lesson 73"
  }
if (cross_ref == 682) {
	data="JWW_FGB73.html#682";
	lesson_num = "Lesson 73"
  }
if (cross_ref == 683) {
	data="JWW_FGB73.html#683";
	lesson_num = "Lesson 73"
  }
if (cross_ref == 684) {
	data="JWW_FGB73.html#684";
	lesson_num = "Lesson 73"
  }
if (cross_ref == 685) {
	data="JWW_FGB73.html#685";
	lesson_num = "Lesson 73"
  }
if (cross_ref == 688) {
	data="JWW_FGB73.html#688";
	lesson_num = "Lesson 73"
  }
if (cross_ref == 689) {
	data="JWW_FGB74.html#689";
	lesson_num = "Lesson 74"
  }
if (cross_ref == 690) {
	data="JWW_FGB74.html#690";
	lesson_num = "Lesson 74"
  }
if (cross_ref == 691) {
	data="JWW_FGB74.html#691";
	lesson_num = "Lesson 74"
  }
if (cross_ref == 692) {
	data="JWW_FGB74.html#692";
	lesson_num = "Lesson 74"
  }
if (cross_ref == 694) {
	data="JWW_FGB74.html#694";
	lesson_num = "Lesson 74"
  }
if (cross_ref == 695) {
	data="JWW_FGB74.html#695";
	lesson_num = "Lesson 74"
  }
if (cross_ref == 698) {
	data="JWW_FGB74.html#698";
	lesson_num = "Lesson 74"
  }
if (cross_ref == 699) {
	data="JWW_FGB75.html#699";
	lesson_num = "Lesson 75"
  }
if (cross_ref == 700) {
	data="JWW_FGB75.html#700";
	lesson_num = "Lesson 75"
  }
if (cross_ref == 701) {
	data="JWW_FGB75.html#701";
	lesson_num = "Lesson 75"
  }
if (cross_ref == 705) {
	data="JWW_FGB76.html#705";
	lesson_num = "Lesson 76"
  }
if (cross_ref == 706) {
	data="JWW_FGB76.html#706";
	lesson_num = "Lesson 76"
  }
if (cross_ref == 707) {
	data="JWW_FGB76.html#707";
	lesson_num = "Lesson 76"
  }
if (cross_ref == 711) {
	data="JWW_FGB77.html#711";
	lesson_num = "Lesson 77"
  }
if (cross_ref == 712) {
	data="JWW_FGB77.html#712";
	lesson_num = "Lesson 77"
  }
if (cross_ref == 713) {
	data="JWW_FGB77.html#713";
	lesson_num = "Lesson 77"
  }
if (cross_ref == 717) {
	data="JWW_FGB78.html#717";
	lesson_num = "Lesson 78"
  }
if (cross_ref == 718) {
	data="JWW_FGB78.html#718";
	lesson_num = "Lesson 78"
  }
if (cross_ref == 719) {
	data="JWW_FGB78.html#719";
	lesson_num = "Lesson 78"
  }
if (cross_ref == 720) {
	data="JWW_FGB78.html#720";
	lesson_num = "Lesson 78"
  }
if (cross_ref == 721) {
	data="JWW_FGB78.html#721";
	lesson_num = "Lesson 78"
  }
if (cross_ref == 726) {
	data="JWW_FGB79.html#726";
	lesson_num = "Lesson 79"
  }
if (cross_ref == 727) {
	data="JWW_FGB79.html#727";
	lesson_num = "Lesson 79"
  }
if (cross_ref == 732) {
	data="JWW_FGB80.html#732";
	lesson_num = "Lesson 80"
  }
if (cross_ref == 733) {
	data="JWW_FGB80.html#733";
	lesson_num = "Lesson 80"
  }
if (cross_ref == 737) {
	data="JWW_FGB_Appendix.html#737";
	lesson_num = "Reference Grammar"
  }
if (cross_ref == 738) {
	data="JWW_FGB_Appendix.html#738";
	lesson_num = "Reference Grammar"
  }
if (cross_ref == 739) {
	data="JWW_FGB_Appendix.html#739";
	lesson_num = "Reference Grammar"
  }
if (cross_ref == 740) {
	data="JWW_FGB_Appendix.html#740";
	lesson_num = "Reference Grammar"
  }
if (cross_ref == 741) {
	data="JWW_FGB_Appendix.html#741";
	lesson_num = "Reference Grammar"
  }
if (cross_ref == 742) {
	data="JWW_FGB_Appendix.html#742";
	lesson_num = "Reference Grammar"
  }
if (cross_ref == 743) {
	data="JWW_FGB_Appendix.html#743";
	lesson_num = "Reference Grammar"
  }
if (cross_ref == 744) {
	data="JWW_FGB_Appendix.html#744";
	lesson_num = "Reference Grammar"
  }
if (cross_ref == 745) {
	data="JWW_FGB_Appendix.html#745";
	lesson_num = "Reference Grammar"
  }
if (cross_ref == 746) {
	data="JWW_FGB_Appendix.html#746";
	lesson_num = "Reference Grammar"
  }
if (cross_ref == 747) {
	data="JWW_FGB_Appendix.html#747";
	lesson_num = "Reference Grammar"
  }
if (cross_ref == 748) {
	data="JWW_FGB_Appendix.html#748";
	lesson_num = "Reference Grammar"
  }
if (cross_ref == 749) {
	data="JWW_FGB_Appendix.html#749";
	lesson_num = "Reference Grammar"
  }
if (cross_ref == 750) {
	data="JWW_FGB_Appendix.html#750";
	lesson_num = "Reference Grammar"
  }
if (cross_ref == 751) {
	data="JWW_FGB_Appendix.html#751";
	lesson_num = "Reference Grammar"
  }
if (cross_ref == 752) {
	data="JWW_FGB_Appendix.html#752";
	lesson_num = "Reference Grammar"
  }
if (cross_ref == 753) {
	data="JWW_FGB_Appendix.html#753";
	lesson_num = "Reference Grammar"
  }
if (cross_ref == 754) {
	data="JWW_FGB_Appendix.html#754";
	lesson_num = "Reference Grammar"
  }
if (cross_ref == 757) {
	data="JWW_FGB_Appendix.html#757";
	lesson_num = "Reference Grammar"
  }
if (cross_ref == 758) {
	data="JWW_FGB_Appendix.html#758";
	lesson_num = "Reference Grammar"
  }
if (cross_ref == 759) {
	data="JWW_FGB_Appendix.html#759";
	lesson_num = "Reference Grammar"
  }
if (cross_ref == 760) {
	data="JWW_FGB_Appendix.html#760";
	lesson_num = "Reference Grammar"
  }
if (cross_ref == 761) {
	data="JWW_FGB_Appendix.html#761";
	lesson_num = "Reference Grammar"
  }
if (cross_ref == 762) {
	data="JWW_FGB_Appendix.html#762";
	lesson_num = "Reference Grammar"
  }
if (cross_ref == 763) {
	data="JWW_FGB_Appendix.html#763";
	lesson_num = "Reference Grammar"
  }
if (cross_ref == 764) {
	data="JWW_FGB_Appendix.html#764";
	lesson_num = "Reference Grammar"
  }
if (cross_ref == 765) {
	data="JWW_FGB_Appendix.html#765";
	lesson_num = "Reference Grammar"
  }
if (cross_ref == 766) {
	data="JWW_FGB_Appendix.html#766";
	lesson_num = "Reference Grammar"
  }
if (cross_ref == 767) {
	data="JWW_FGB_Appendix.html#767";
	lesson_num = "Reference Grammar"
  }
if (cross_ref == 768) {
	data="JWW_FGB_Appendix.html#768";
	lesson_num = "Reference Grammar"
  }
if (cross_ref == 769) {
	data="JWW_FGB_Appendix.html#769";
	lesson_num = "Reference Grammar"
  }
if (cross_ref == 770) {
	data="JWW_FGB_Appendix.html#770";
	lesson_num = "Reference Grammar"
  }
if (cross_ref == 771) {
	data="JWW_FGB_Appendix.html#771";
	lesson_num = "Reference Grammar"
  }
if (cross_ref == 773) {
	data="JWW_FGB_Appendix.html#773";
	lesson_num = "Reference Grammar"
  }
if (cross_ref == 774) {
	data="JWW_FGB_Appendix.html#774";
	lesson_num = "Reference Grammar"
  }
if (cross_ref == 775) {
	data="JWW_FGB_Appendix.html#775";
	lesson_num = "Reference Grammar"
  }
if (cross_ref == 776) {
	data="JWW_FGB_Appendix.html#776";
	lesson_num = "Reference Grammar"
  }
if (cross_ref == 777) {
	data="JWW_FGB_Appendix.html#777";
	lesson_num = "Reference Grammar"
  }
if (cross_ref == 778) {
	data="JWW_FGB_Appendix.html#778";
	lesson_num = "Reference Grammar"
  }
if (cross_ref == 779) {
	data="JWW_FGB_Appendix.html#779";
	lesson_num = "Reference Grammar"
  }
if (cross_ref == 782) {
	data="JWW_FGB_Appendix.html#782";
	lesson_num = "Reference Grammar"
  }
if (cross_ref == 783) {
	data="JWW_FGB_Appendix.html#783";
	lesson_num = "Reference Grammar"
  }
if (cross_ref == 784) {
	data="JWW_FGB_Appendix.html#784";
	lesson_num = "Reference Grammar"
  }
if (cross_ref == 785) {
	data="JWW_FGB_Appendix.html#785";
	lesson_num = "Reference Grammar"
  }
if (cross_ref == 787) {
	data="JWW_FGB_Appendix.html#787";
	lesson_num = "Reference Grammar"
  }
if (cross_ref == 788) {
	data="JWW_FGB_Appendix.html#788";
	lesson_num = "Reference Grammar"
  }
if (cross_ref == 789) {
	data="JWW_FGB_Appendix.html#789";
	lesson_num = "Reference Grammar"
  }
if (cross_ref == 790) {
	data="JWW_FGB_Appendix.html#790";
	lesson_num = "Reference Grammar"
  }
if (cross_ref == 791) {
	data="JWW_FGB_Appendix.html#791";
	lesson_num = "Reference Grammar"
  }
if (cross_ref == 792) {
	data="JWW_FGB_Appendix.html#792";
	lesson_num = "Reference Grammar"
  }
if (cross_ref == 793) {
	data="JWW_FGB_Appendix.html#793";
	lesson_num = "Reference Grammar"
  }
if (cross_ref == 794) {
	data="JWW_FGB_Appendix.html#794";
	lesson_num = "Reference Grammar"
  }
if (cross_ref == 795) {
	data="JWW_FGB_Appendix.html#795";
	lesson_num = "Reference Grammar"
  }
if (cross_ref == 796) {
	data="JWW_FGB_Appendix.html#796";
	lesson_num = "Reference Grammar"
  }
if (cross_ref == 797) {
	data="JWW_FGB_Appendix.html#797";
	lesson_num = "Reference Grammar"
  }
if (cross_ref == 798) {
	data="JWW_FGB_Appendix.html#798";
	lesson_num = "Reference Grammar"
  }
if (cross_ref == 799) {
	data="JWW_FGB_Appendix.html#799";
	lesson_num = "Reference Grammar"
  }
if (cross_ref == 800) {
	data="JWW_FGB_Appendix.html#800";
	lesson_num = "Reference Grammar"
  }
if (cross_ref == 801) {
	data="JWW_FGB_Appendix.html#801";
	lesson_num = "Reference Grammar"
  }
if (cross_ref == 802) {
	data="JWW_FGB_Appendix.html#802";
	lesson_num = "Reference Grammar"
  }
if (cross_ref == 803) {
	data="JWW_FGB_Appendix.html#803";
	lesson_num = "Reference Grammar"
  }
if (cross_ref == 804) {
	data="JWW_FGB_Appendix.html#804";
	lesson_num = "Reference Grammar"
  }
if (cross_ref == 805) {
	data="JWW_FGB_Appendix.html#805";
	lesson_num = "Reference Grammar"
  }
if (cross_ref == 806) {
	data="JWW_FGB_Appendix.html#806";
	lesson_num = "Reference Grammar"
  }
if (cross_ref == 807) {
	data="JWW_FGB_Appendix.html#807";
	lesson_num = "Reference Grammar"
  }
if (cross_ref == 808) {
	data="JWW_FGB_Appendix.html#808";
	lesson_num = "Reference Grammar"
  }
if (cross_ref == 809) {
	data="JWW_FGB_Appendix.html#809";
	lesson_num = "Reference Grammar"
  }
if (cross_ref == 810) {
	data="JWW_FGB_Appendix.html#810";
	lesson_num = "Reference Grammar"
  }
if (cross_ref == 811) {
	data="JWW_FGB_Appendix.html#811";
	lesson_num = "Reference Grammar"
  }
if (cross_ref == 812) {
	data="JWW_FGB_Appendix.html#812";
	lesson_num = "Reference Grammar"
  }
if (cross_ref == 813) {
	data="JWW_FGB_Appendix.html#813";
	lesson_num = "Reference Grammar"
  }
if (cross_ref == 814) {
	data="JWW_FGB_Appendix.html#814";
	lesson_num = "Reference Grammar"
  }
if (cross_ref == 815) {
	data="JWW_FGB_Appendix.html#815";
	lesson_num = "Reference Grammar"
  }
if (cross_ref == 816) {
	data="JWW_FGB_Appendix.html#816";
	lesson_num = "Reference Grammar"
  }
if (cross_ref == 817) {
	data="JWW_FGB_Appendix.html#817";
	lesson_num = "Reference Grammar"
  }
if (cross_ref == 818) {
	data="JWW_FGB_Appendix.html#818";
	lesson_num = "Reference Grammar"
  }
if (cross_ref == 819) {
	data="JWW_FGB_Appendix.html#819";
	lesson_num = "Reference Grammar"
  }
if (cross_ref == 820) {
	data="JWW_FGB_Appendix.html#820";
	lesson_num = "Reference Grammar"
  }
if (cross_ref == 821) {
	data="JWW_FGB_Appendix.html#821";
	lesson_num = "Reference Grammar"
  }
if (cross_ref == 822) {
	data="JWW_FGB_Appendix.html#822";
	lesson_num = "Reference Grammar"
  }
if (cross_ref == 823) {
	data="JWW_FGB_Appendix.html#823";
	lesson_num = "Reference Grammar"
  }
if (cross_ref == 824) {
	data="JWW_FGB_Appendix.html#824";
	lesson_num = "Reference Grammar"
  }
if (cross_ref == 825) {
	data="JWW_FGB_Appendix.html#825";
	lesson_num = "Reference Grammar"
  }
if (cross_ref == 826) {
	data="JWW_FGB_Appendix.html#826";
	lesson_num = "Reference Grammar"
  }
if (cross_ref == 827) {
	data="JWW_FGB_Appendix.html#827";
	lesson_num = "Reference Grammar"
  }
if (cross_ref == 828) {
	data="JWW_FGB_Appendix.html#828";
	lesson_num = "Reference Grammar"
  }
if (cross_ref == 829) {
	data="JWW_FGB_Appendix.html#829";
	lesson_num = "Reference Grammar"
  }
if (cross_ref == 830) {
	data="JWW_FGB_Appendix.html#830";
	lesson_num = "Reference Grammar"
  }
if (cross_ref == 831) {
	data="JWW_FGB_Appendix.html#831";
	lesson_num = "Reference Grammar"
  }
if (cross_ref == 832) {
	data="JWW_FGB_Appendix.html#832";
	lesson_num = "Reference Grammar"
  }
if (cross_ref == 833) {
	data="JWW_FGB_Appendix.html#833";
	lesson_num = "Reference Grammar"
  }
if (cross_ref == 834) {
	data="JWW_FGB_Appendix.html#834";
	lesson_num = "Reference Grammar"
  }
if (cross_ref == 835) {
	data="JWW_FGB_Appendix.html#835";
	lesson_num = "Reference Grammar"
  }
if (cross_ref == 836) {
	data="JWW_FGB_Appendix.html#836";
	lesson_num = "Reference Grammar"
  }
if (cross_ref == 837) {
	data="JWW_FGB_Appendix.html#837";
	lesson_num = "Reference Grammar"
  }
if (cross_ref == 838) {
	data="JWW_FGB_Appendix.html#838";
	lesson_num = "Reference Grammar"
  }
if (cross_ref == 839) {
	data="JWW_FGB_Appendix.html#839";
	lesson_num = "Reference Grammar"
  }
if (cross_ref == 840) {
	data="JWW_FGB_Appendix.html#840";
	lesson_num = "Reference Grammar"
  }
if (cross_ref == 841) {
	data="JWW_FGB_Appendix.html#841";
	lesson_num = "Reference Grammar"
  }
if (cross_ref == 842) {
	data="JWW_FGB_Appendix.html#842";
	lesson_num = "Reference Grammar"
  }
if (cross_ref == 843) {
	data="JWW_FGB_Appendix.html#843";
	lesson_num = "Reference Grammar"
  }
if (cross_ref == 844) {
	data="JWW_FGB_Appendix.html#844";
	lesson_num = "Reference Grammar"
  }
if (cross_ref == 845) {
	data="JWW_FGB_Appendix.html#845";
	lesson_num = "Reference Grammar"
  }
if (cross_ref == 846) {
	data="JWW_FGB_Appendix.html#846";
	lesson_num = "Reference Grammar"
  }
if (cross_ref == 847) {
	data="JWW_FGB_Appendix.html#847";
	lesson_num = "Reference Grammar"
  }
if (cross_ref == 848) {
	data="JWW_FGB_Appendix.html#848";
	lesson_num = "Reference Grammar"
  }
if (cross_ref == 849) {
	data="JWW_FGB_Appendix.html#849";
	lesson_num = "Reference Grammar"
  }
if (cross_ref == 850) {
	data="JWW_FGB_Appendix.html#850";
	lesson_num = "Reference Grammar"
  }
if (cross_ref == 851) {
	data="JWW_FGB_Appendix.html#851";
	lesson_num = "Reference Grammar"
  }
if (cross_ref == 852) {
	data="JWW_FGB_Appendix.html#852";
	lesson_num = "Reference Grammar"
  }
if (cross_ref == 853) {
	data="JWW_FGB_Appendix.html#853";
	lesson_num = "Reference Grammar"
  }
if (cross_ref == 854) {
	data="JWW_FGB_Appendix.html#854";
	lesson_num = "Reference Grammar"
  }
if (cross_ref == 855) {
	data="JWW_FGB_Appendix.html#855";
	lesson_num = "Reference Grammar"
  }
if (cross_ref == 856) {
	data="JWW_FGB_Appendix.html#856";
	lesson_num = "Reference Grammar"
  }
if (cross_ref == 857) {
	data="JWW_FGB_Appendix.html#857";
	lesson_num = "Reference Grammar"
  }
if (cross_ref == 858) {
	data="JWW_FGB_Appendix.html#858";
	lesson_num = "Reference Grammar"
  }
if (cross_ref == 859) {
	data="JWW_FGB_Appendix.html#859";
	lesson_num = "Reference Grammar"
  }
if (cross_ref == 860) {
	data="JWW_FGB_Appendix.html#860";
	lesson_num = "Reference Grammar"
  }
if (cross_ref == 861) {
	data="JWW_FGB_Appendix.html#861";
	lesson_num = "Reference Grammar"
  }
if (cross_ref == 862) {
	data="JWW_FGB_Appendix.html#862";
	lesson_num = "Reference Grammar"
  }
if (cross_ref == 863) {
	data="JWW_FGB_Appendix.html#863";
	lesson_num = "Reference Grammar"
  }
if (cross_ref == 864) {
	data="JWW_FGB_Appendix.html#864";
	lesson_num = "Reference Grammar"
  }
if (cross_ref == 865) {
	data="JWW_FGB_Appendix.html#865";
	lesson_num = "Reference Grammar"
  }
if (cross_ref == 866) {
	data="JWW_FGB_Appendix.html#866";
	lesson_num = "Reference Grammar"
  }
if (cross_ref == 867) {
	data="JWW_FGB_Appendix.html#867";
	lesson_num = "Reference Grammar"
  }
if (cross_ref == 868) {
	data="JWW_FGB_Appendix.html#868";
	lesson_num = "Reference Grammar"
  }
if (cross_ref == 869) {
	data="JWW_FGB_Appendix.html#869";
	lesson_num = "Reference Grammar"
  }
if (cross_ref == 870) {
	data="JWW_FGB_Appendix.html#870";
	lesson_num = "Reference Grammar"
  }
if (cross_ref == 871) {
	data="JWW_FGB_Appendix.html#871";
	lesson_num = "Reference Grammar"
  }
if (cross_ref == 872) {
	data="JWW_FGB_Appendix.html#872";
	lesson_num = "Reference Grammar"
  }
if (cross_ref == 873) {
	data="JWW_FGB_Appendix.html#873";
	lesson_num = "Reference Grammar"
  }
if (cross_ref == 874) {
	data="JWW_FGB_Appendix.html#874";
	lesson_num = "Reference Grammar"
  }
if (cross_ref == 875) {
	data="JWW_FGB_Appendix.html#875";
	lesson_num = "Reference Grammar"
  }
if (cross_ref == 876) {
	data="JWW_FGB_Appendix.html#876";
	lesson_num = "Reference Grammar"
  }
if (cross_ref == 877) {
	data="JWW_FGB_Appendix.html#877";
	lesson_num = "Reference Grammar"
  }
if (cross_ref == 878) {
	data="JWW_FGB_Appendix.html#878";
	lesson_num = "Reference Grammar"
  }
if (cross_ref == 879) {
	data="JWW_FGB_Appendix.html#879";
	lesson_num = "Reference Grammar"
  }
if (cross_ref == 880) {
	data="JWW_FGB_Appendix.html#880";
	lesson_num = "Reference Grammar"
  }
if (cross_ref == 881) {
	data="JWW_FGB_Appendix.html#881";
	lesson_num = "Reference Grammar"
  }
if (cross_ref == 882) {
	data="JWW_FGB_Appendix.html#882";
	lesson_num = "Reference Grammar"
  }
if (cross_ref == 883) {
	data="JWW_FGB_Appendix.html#883";
	lesson_num = "Reference Grammar"
  }
if (cross_ref == 884) {
	data="JWW_FGB_Appendix.html#884";
	lesson_num = "Reference Grammar"
  }


	
	item.innerHTML = "<h2 class='title2'>"+lesson_num+"</h2><object type='text/html' data='" + data + "' width='725px' height='225px' >    </object><p class='upper-left-close'><a href='" + data + "'  title = 'Go to " + lesson_num + "'>➔</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href='javascript:unhide(\"dialog\");' title='Close' >✖</a></p>";
	item.className=(item.className=='hidden')?'unhidden':'hidden';

 }
 
 
 
 