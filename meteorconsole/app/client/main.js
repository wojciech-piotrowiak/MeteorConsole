import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';
var commands = [];
var counter=0;

Template.hello.events({
	"keydown input.url": function(event) {
		if(event.which==38)
		{
			var last = commands[commands.length - counter];
			counter+=1;
			if(counter>commands.length)
			{
				counter=commands.length;
			}
			if(last!=undefined)
			event.target.value=last;
		}
		if(event.which==40)
		{
			var last = commands[commands.length - counter];
			counter-=1;
			if(counter<0)
			{
				counter=0;
		  }
			if(last!=undefined)
			event.target.value=last;
		}
		if(event.which== 9) {
			if(event.target.value=='l'){
        event.target.value='ls';
			}
			if(event.target.value=='p'){
        event.target.value='pwd';
			}

			if(event.preventDefault) {
                event.preventDefault();
      }
    }
		if(event.which==13)
		{
			counter=0;
			var command=event.target.value;
			Meteor.call('action', command,function(error,result){
			$('#console').val($('#console').val()+result.stdout);
			$('#console').val($('#console').val()+result.stderr);
			commands.push(command);
			event.target.value="";
			});
		}

}

  });
