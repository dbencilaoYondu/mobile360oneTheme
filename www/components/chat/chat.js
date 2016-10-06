app.controller('chatController',function(){
	var socket = io.connect('192.168.20.47:3000/'),
		$message = $('#message'),
		  $room = $('#roomname'),
		  $roombox = $('#roombox'),
		  $messagebox = $('#send-message'),
		  $chat = $('#chat'),
		  $chatbox = $('#chatbox'),
		  $leaveRoom = $('#leaveRoom'),
		  $nickname = $('#nickname'),
		  $usernamebox = $('#usernamebox'),
		  $usernames = $('#usernames');
		  $roomName = $('#room-name');

		  var roomcurrent;

		  //leave current room
		  $leaveRoom.click(function(e){
		  	e.preventDefault();
		  	var x = $leaveRoom.attr('data-room');
		  	var user = $leaveRoom.attr('data-user');
		  	console.log(x);
		  	socket.emit('leave room',{room:x,user:user});
		  	$chatbox.hide();
		  	$roombox.show();  	
		  });

		  //join room
		  $roombox.on('submit',(e)=> {
		  	e.preventDefault();
		  	roomcurrent = $room.val();
		  	$roombox.hide();
		  	$usernamebox.show();
		  	socket.emit('switch room',roomcurrent);
		  	$leaveRoom.attr('data-room',roomcurrent);
		  	$roomName.text(roomcurrent);
		  });

		  //assign username
		  $usernamebox.on('submit',(e)=>{
		  	e.preventDefault();

		  	socket.emit('new user',{users:$nickname.val(),room:roomcurrent},function(callback){
		  		console.log(callback);
		  		if(callback){
		  			console.log('try again!');

		  		}else{
		  			$chatbox.show();
		  			$usernamebox.hide();
		  			$leaveRoom.attr('data-user',$nickname.val());
		  		}
		  	});
		  });

		  //enter new message
		  $messagebox.on('submit',(e)=>{
		  	e.preventDefault();
		  	var a = $message.val();
		  	//msg = $(a).text();
		  	console.log(a);
		  	socket.emit('send message',a,roomcurrent);
		  	$message.val('');
		  	
		  });
		  
		  //load chat history
		  socket.on('load chat',function(data){
		  	console.log(data);
		  	var html = '';
		  	var roomClass = $leaveRoom.attr('data-room');
		  	var userClass = $leaveRoom.attr('data-user');

		  	$.each(data,function(key,value){
		  		
		  		console.log()
		  		if(value.roomID === roomClass){
			  			if(userClass == value.nickname){
					  		html = `<div class="row"><div class="nickname columns medium-5">${value.nickname}</div><p class="self medium-7"> ${value.message}</p></div> ${html} `;
					  	}else{
					  		html = `<div class="row"><div class="nickname columns medium-5">${value.nickname}</div><p class="medium-7">${value.message}</p></div> ${html} `;
					  	}
		  		}

		  	});
		  	$chat.html(html);

		  });

		  //load new message
		  socket.on('new message',function(data){
		  	var userClass = $leaveRoom.attr('data-user');

		  		if(userClass == data.user){
		  			$chat.append(`<div class="row"><div class="nickname columns medium-5">${data.user}</div><p class="self medium-7"> ${data.msg}</p></div>`);
			  	}else{
			  		$chat.append(`<div class="row"><div class="nickname columns medium-5">${data.user}</div><p class="medium-77"> ${data.msg}</p></div>`);
			  	}

		  	
		  	console.log(data);
		  	window.scrollTo(0,document.body.scrollHeight);
		  });



		  //load users
		  socket.on('usernames',function(data){
		   var html = '';
		   var roomClass = $leaveRoom.attr('data-room');
		   	console.log(data);
		 	  $.each(data,function(index,value){
		 	  	console.log(value);
		 	  	if(roomClass == value.room){
		 	  		html = `${html} <p data-user="${value.name}-${value.hash}">${value.name}</p>`;
		 	  	}
		  	  });
		  	/// TODO: fix the room assignments 
		  	//if(roomClass == currentRoomPerUser){
		  		$usernames.html(html);
		  	//}	  	
		  });

		  socket.on('some event',function(data){
		 	console.log(data);
		 	});

		  console.log(socket);

});