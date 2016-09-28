$(document).ready(function(){
/*----------------------------------------------------------------------
| Iniatiating the chat window with the appropriate HTML
------------------------------------------------------------------------*/
var chat_init = function(){
    //$( "#chat-container" ).load('partials/chat/chat-form.html');
}

chat_init();

$(document).on('click', '.goback', function(){
    chat_init();
});


/*----------------------------------------------------------------------
| Close the chat container
------------------------------------------------------------------------*/
$(document).on('click', '.chat-form-close', function(){
    $('#chat-container').fadeIn('slow');
    $('#chat-box').fadeOut('slow');
});

/*----------------------------------------------------------------------
| Close the chat box window
------------------------------------------------------------------------*/
$(document).on('click','.chat-box-close', function(){
    $('#chat-box').fadeOut('slow');
    $('#chat-container .chat-group a').removeClass('active');
});



/*----------------------------------------------------------------------
| Close the chat container window
------------------------------------------------------------------------*/
$(document).on('click','.chat-container-close', function(){
    $('#chat-container').fadeOut('slow');
});



/*----------------------------------------------------------------------
| Display the chat container
------------------------------------------------------------------------*/
$(document).on('click','.btn-chat', function(){
    if($('#chat-box').is(':visible')){
        $('#chat-container').fadeIn('slow');
        $('#chat-box').fadeOut('slow');
    } else{
        $('#chat-container').fadeIn('slow');
        chat_init();
    }
});
/*----------------------------------------------------------------------
| change status Function
------------------------------------------------------------------------*/
$(document).on('click', '.status-btn-group', function() {
    $(this).find('.btn').toggleClass('active');  
    if ($(this).find('.btn-success').size()>0) {
        $(this).find('.btn').toggleClass('btn-success');
        $.ajax({ url: base  + "chat/users/toggle_status" , 
            success: function(response){
                if(response.status == 1){
                    $('#current_status').html('Online');
                    $('#current_status').removeClass('btn-danger').addClass('btn-success');
                }            
                else{
                    $('#current_status').html('Offline');
                    $('#current_status').removeClass('btn-success').addClass('btn-danger');
                }
        }});
    }    
    $(this).find('.btn').toggleClass('btn-default');
});

 $(document).on('click', '.dropdown-menu', function(e) {
    e.stopPropagation();
});

/*----------------------------------------------------------------------
| Editing profile process
------------------------------------------------------------------------*/
$(document).on('click', '#edit-profile', function(){
    $( "#chat-inner" ).load( base+"chat/users/editProfile/");
    $('[data-toggle="dropdown"]').parent().removeClass('open');
    return false;
});

$(document).on("submit", "#profile-frm", function(e)
{
    e.preventDefault();
    //Redirect to edit profile form of the user in another tab 
});

/*----------------------------------------------------------------------
| Show Pop overs
------------------------------------------------------------------------*/
   var popOverSettings = {
        container: 'body',
        trigger:'hover',
        selector: '[data-toggle="popover"]',
        placement: 'right',
        html: true,
        content: function () {
            return $('#popover-content').html();
        }
    }

   $(document).on("mouseenter",'[data-toggle="popover"]',function(){
      image  = $(this).find('.profile-img').html();
      name   = $(this).find('.user-name').html();
      status = $(this).find('.user_status').html();
      $('#contact-image').empty().html(image);
      $('#contact-user-name').empty().html(name);
      $('#contact-user-status').empty().html(status);
      
     /* $(this).popover({
        placement:'left', 
        trigger: 'hover',
        container: 'body',
        selector: '[data-toggle="popover"]',
        html: true,
        content: function () {
            return $('#popover-content').html();
        }
      }).popover('show');*/

    }).on('mouseleave', '[data-toggle="popover"]', function() {
        $(this).popover('hide');
    });
});


/*----------------------------------------------------------------------
| Function to display error messages
------------------------------------------------------------------------*/
function error(message){
    var alert = '<div style="font-size:12px; margin-top:10px;" class="alert alert-danger alert-dismissable">\
                <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>\
                <strong>Error ! </strong> ' + message + ' </div>';
    return alert;
}

/*----------------------------------------------------------------------
| Function to display success messages
------------------------------------------------------------------------*/

function success(message){
    var alert = '<div style="font-size:12px; margin-top:10px;" class="alert alert-success alert-dismissable">\
                <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>\
                <strong>Success ! </strong> ' + message + ' </div>';
    return alert;
}
/*----------------------------------------------------------------------
| Function to highlight incorrect fields 
------------------------------------------------------------------------*/
function highlightFields(message){
    $('.form-group').removeClass('has-error');
    $('.error').remove();
    for (var key in message) {
        $('input[name="'+ key+'"]' ).parent().addClass('has-error');
        $('input[name="'+ key+'"]').after('<span class="error">' +message[key]+ '</span>');
    }
}


