/*
|-------------------------------------------------------------------------
| Copyright (c) 2013 
| This script may be used for non-commercial purposes only. For any
| commercial purposes, please contact the author at sammkaranja@gmail.com
|-------------------------------------------------------------------------
*/

/*
|-------------------------------------------------------------------------
| Funtion to trigger the refresh event
|-------------------------------------------------------------------------
*/
bootChat();

/*----------------------------------------------------------------------
| Function to display individual chatbox
------------------------------------------------------------------------*/

$(document).on('click', '[data-toggle="popover"]', function(){
        $(this).popover('hide');
        $('ul.chat-box-body').empty();
        me = $(this).find('input[name="my_user_id"]').val();
        user = $(this).find('input[name="user_id"]').val();
        $(this).find('span[rel="'+user+'"]').text('');
        var limit = 0;
        load_thread(user,me,limit);
        
        var top = '0px';
        $('#chat-box').css({'top': top});
        if(!$('#chat-box').is(':visible')){
            $('#chat-box').fadeIn('slow');
        }
        
        // FOCUS INPUT TExT WHEN CLICK
        $("#chat-box .chat-textarea input").focus();
});
/*----------------------------------------------------------------------
| Function to send message
------------------------------------------------------------------------*/
$(document).on('keypress', '.chat-textarea input', function(e)
{
	var txtarea = $(this);
        var message = txtarea.val();
        var _token  = $('#_token').val();
        var me      = $('#my_id').val();
  
        if(message !== "" && e.which == 13){
            txtarea.val('');
            updateChatCount();
            // save the message 
            $.ajax({ type: "POST", url: base  + "chat/save_message", data: { _token: _token,message: message, user : user, me : me},cache: false,
                success: function(response){
                    $('#chatAudio')[0].play();
                    msg = response.message;
                    li = '<li class=" bubble '+ msg.type +'"><img src="'+msg.avatar+'" class="avt img-responsive">\
                    <div class="message">\
                    <span class="chat-arrow"></span>\
                    <a href="javascript:void(0)" class="chat-name">'+msg.name+'</a>&nbsp;\
                    <span class="chat-datetime">at '+msg.time+'</span>\
                    <span class="chat-body">'+msg.body+'</span></div></li>';

                    $('ul.chat-box-body').append(li);

                    $('ul.chat-box-body').animate({scrollTop: $('ul.chat-box-body').prop("scrollHeight")}, 500);
                }
            });
        }
});

/*----------------------------------------------------------------------------------------------------
| Function to load messages
-------------------------------------------------------------------------------------------------------*/
function loadMessages(me_id)
{
    updateChatCount();
    
    $.ajax(
        {            
            type: 'GET',
            url : base + "chat/updates",
            data: {me: me_id},
            async : true,
            cache : false,
            success: function(data){                    
                if(data.success){                    
                    thread = data.messages;
                    senders = data.senders;
                    $.each(thread, function() {
                        if($("#chat-box").is(":visible")){
                            var audio = new Audio('custom/OneOnOneChat/sounds/notify.mp3').play();
                            chatbuddy = $("#chat_buddy_id").val();
                            if(this.sender == chatbuddy){
                                li = '<li class="'+ this.type +'"><img src="'+this.avatar+'" class="avt img-responsive">\
                                    <div class="message">\
                                    <span class="chat-arrow"></span>\
                                    <a href="javascript:void(0)" class="chat-name">'+this.name+'</a>&nbsp;\
                                    <span class="chat-datetime">at '+this.time+'</span>\
                                    <span class="chat-body">'+this.body+'</span></div></li>';
                                $('ul.chat-box-body').append(li);
                                $('ul.chat-box-body').animate({scrollTop: $('ul.chat-box-body').prop("scrollHeight")}, 500);
                                //Mark this message as read
                                $.ajax({ type: "GET", url: base + "chat/mark_read", data: {id: this.msg}});
                            }
                            else{
                                from = this.sender;
                                $.each(senders, function() {
                                    if(this.user == from){
                                        $(".chat-group").find('span[rel="'+from+'"]').text(this.count);
                                    }
                                });
                            }
                        }
                        else{
                            from = this.sender;
                            $.each(senders, function() {
                                if(this.user == from){
                                    $(".chat-group").find('span[rel="'+from+'"]').text(this.count);
                                }
                            });

                        }
                    });
                     
                    //var audio = new Audio('custom/OneOnOneChat/sounds/notify.mp3').play();
                }
            },
            error : function(XMLHttpRequest, textstatus, error) {
                console.log(error);
            }
        }
    );
}

function bootChat()
{

    refresh = setInterval(function() {
        var me_id = $('#me_id').val();
        if(me_id){
            loadMessages(me_id);
        }
    }, 2000);

}

/*----------------------------------------------------------------------
| Function to load threaded messages or user conversation
------------------------------------------------------------------------*/

function load_thread(user,me,limit){
    updateChatCount();
        //send an ajax request to get the user conversation 
       $.ajax({ type: "GET", url: base  + "chat/messages", data: {user : user, me: me, limit:limit },cache: false,
        success: function(response){
        if(response.success){
            buddy = response.buddy;
            status = buddy.status == 1 ? 'Online' : 'Offline';
            statusClass = buddy.status == 1 ? 'user-status is-online' : 'user-status is-offline';

            $('#chat_buddy_id').val(buddy.id);
            $('#my_id').val(buddy.me);
            $('.display-name', '#chat-box').html(buddy.name);
            $('#chat-box > .chat-box-header > small').html(status);
            $('#chat-box > .chat-box-header > span.user-status').removeClass().addClass(statusClass);
            $('#status_'+buddy.id+' > span.user-status').removeClass().addClass(statusClass);

            $('ul.chat-box-body').html('');
            if(buddy.more) {
            	$('ul.chat-box-body').append('<li id="load-more-wrap" style="text-align:center"><a onclick="javascript: load_thread(\''+buddy.id+'\',\''+buddy.me+'\', \''+buddy.limit+'\')" class="btn btn-xs btn-info" style="width:100%">View older messsages('+buddy.remaining+')</a></li>');
            }
 

                thread = response.thread;
                $.each(thread, function() {
                  li = '<li class="'+ this.type +'"><img src="'+this.avatar+'" class="avt img-responsive">\
                    <div class="message">\
                    <span class="chat-arrow"></span>\
                    <a href="javascript:void(0)" class="chat-name">'+this.name+'</a>&nbsp;\
                    <span class="chat-datetime">at '+this.time+'</span>\
                    <span class="chat-body">'+this.body+'</span></div></li>';

                    $('ul.chat-box-body').append(li);
                });
                if(buddy.scroll){
                    $('ul.chat-box-body').animate({scrollTop: $('ul.chat-box-body').prop("scrollHeight")}, 500);
                }
                
            }
        }});
}


function updateChatCount()
{
    var me_id = $('#me_id').val();
    $.ajax({
        type : "GET",
        url  : base  + "chat/unread-count",
        data : {id : me_id},
        }).done(function(response) {
          if (response != 0)
            {
                $("#top-chat-button").find('span[class="span-top-value label label-danger"]').text(response);
            }else{
                $("#top-chat-button").find('span[class="span-top-value label label-danger"]').text('');
            }
      });

 }

/*
|----------------------------------------------------------------------------
| End of file
|----------------------------------------------------------------------------
*/

