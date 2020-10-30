//set button id on click to hide first modal
$("#login").on( "click", function() {
    $('#loginModal').modal('hide');  
});
//trigger next modal
$("#register").on( "click", function() {
    $('#registerModal').modal('show');  
});