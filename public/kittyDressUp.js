$(document).ready(function(){

  /*  This is sample code that shows you the "design pattern" for the real
      application JavaScript, which is in the file:  public/application.js   */
  
    // define the application name
    var kittyDressUp = {};

    (function(app){

        // set a few variables which can be used within the app
        var appName = 'Kitty Dress Up',
            version = '1.0';

        app.init = function(){
            // init is the typical name that developers give for the
            // code that runs when an application first loads
            // use whichever word you prefer
            var colors = app.colors();
        };

        app.colors = function(){
            var colors = ['red','blue','yellow','purple'];
            return colors;
        };

        app.init();

    })(kittyDressUp);

});