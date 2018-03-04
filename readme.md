#A  
    Application structure
    
             $(function(){

        // define the application
          var Notekeeper = {};                //creates an object variable for the application

          (function	(app){                    //creates an object variable for the application

		// variable definitions go here
		var $title = $('#title'),        // the $() makes this a jQuery object
			$note = $('#note'),
			$ul = $('#notesList'),        
        //note that the title is also the href
			li = '<li><a href="#pgNotesDetail?title=LINK">ID</a></li>',
			notesHdr = '<li data-role="list-divider">Your Notes</li>',
			noNotes = '<li id="noNotes">You have no notes</li>';

		app.init = function(){

		};

		app.init();

	    })(Notekeeper);
    });	

 #B
     
   Note the app.bindings call in the app.init function! (see pp 135-136)
     
		app.bindings = function(){      // what did the user want to do?  Identify where the touchend event occured
			// set up binding for form
			$('#btnAddNote').on('touchend', function(e){    //the user touched the AddNote button
				e.preventDefault();
				// save the note
				app.addNote(
					$('#title').val(),
					$('#note').val()
				);
			});
			$(document).on('touchend', '#notesList a', function(e){  //the user clicked on one of the notes
				e.preventDefault();
				var href = $(this)[0].href.match(/\?.*$/)[0];          //use these regular patterns to find the note and load it
				var title = href.replace(/^\?title=/,'');
				app.loadNote(title);
			});
			$(document).on('touchend', '#btnDelete', function(e){    //the user clicked on the delete button
				e.preventDefault();
				var key = $(this).data('href');
				app.deleteNote(key);
			});
		};

  #C
     Function to add a note  (see page 137)
     

          app.addNote = function(title, note){
                      //add a note to the ones already in storage
                      var notes = localStorage['Notekeeper'],      
                        notesObj;

                        //if there are no notes, start with an empty note object.
                        if (notes === undefined || notes === '') {  
                          notesObj = {};
                        } else {
                          notesObj = JSON.parse(notes);
                        }

                        notesObj[title.replace(/ /g,'-')] = note;
                        localStorage['Notekeeper'] = JSON.stringify(notesObj);

                        // clear the two form fields
                        $note.val('');
                        $title.val('');

                        //update the listview
                        app.displayNotes();
                  };

#D
    Function to display existing notes (pp 138-139)
    
                app.displayNotes = function(){
			          // get notes
			            var notesObj = app.getNotes(),
				          // create an empty string to contain html
				          html = '',
				          n; // make sure your iterators are properly scoped
			            // loop over notes
			            for (n in notesObj) {
				            html += li.replace(/ID/g,n.replace(/-/g,'')).replace(/LINK/g,n);
			            }
			            $ul.html(notesHdr + html).listview('refresh');
		            };
                
            
#E
  App to check for existing notes in storage (pg 140)  Add it to app.init!
  
 		      app.checkForStorage = function(){
			    var notes = app.getNotes();
			    // are there existing notes?
			    if (!$.isEmptyObject(notes)) {
          // yes there are. pass them off to be displayed
          app.displayNotes();
			    } else {
          // nope, just show the placeholder
          $ul.html(notesHdr + noNotes).listview('refresh');
			    }
		      };
          
#F
  App to get any notes in storage
  
  	app.getNotes = function(){
			// get notes
			var notes = localStorage['Notekeeper'];
			// convert notes from string to object
			if(notes) return JSON.parse(notes);
			return [];
		};
    
#G
   Load the notes (pp 142-144)
   
   		app.loadNote = function(title){  //go to a new "page" and build the note content 
			// get notes
			var notes = app.getNotes(),
				// lookup specific note
				note = notes[title],
				page = ['<div data-role="page">',
							'<div data-role="header" data-add-back-btn="true">',
								'<h1>Notekeeper</h1>',
								'<a id="btnDelete" href="" data-href="ID" data-role="button" class="ui-btn-right">Delete</a>',
							'</div>',
							'<div role="main" class="ui-content"><h3>TITLE</h3><p>NOTE</p></div>',
						'</div>'].join('');
			var newPage = $(page);
			//append it to the page container
			newPage.html(function(index,old){
				return old
						.replace(/ID/g,title)
						.replace(/TITLE/g,title
						.replace(/-/g,' '))
						.replace(/NOTE/g,note);
			}).appendTo($.mobile.pageContainer);
			$.mobile.changePage(newPage);
		};
    
#H
   Function to delete a note (pg 146-147)
   
   	app.deleteNote = function(key){
			// get the notes from localStorage
			var notesObj = app.getNotes();
			// delete selected note
			delete notesObj[key];
			// write it back to localStorage
			localStorage['Notekeeper'] = JSON.stringify(notesObj);
			// return to the list of notes
			$.mobile.changePage('index.html');
			// restart the storage check
			app.checkForStorage();
		};
