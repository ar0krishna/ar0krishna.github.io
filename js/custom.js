var current = {
	name:'',
	color:'',
}

var previous = [];


// var reserved_colorcodes=[];
// var reserved_class=[];

console.log(current);


function saveTag(){
	var used = false;
	var tagname = $('#tagname');
	var color = $('#color');
	if(!tagname.val()){
		return;
	}

		if(current.name)
 			previous.push({name:current.name,color:current.color});
	// current.name = tagname.val();
	// current.color = color.val();
	if(previous.length>0){
		// 	// check
			previous.forEach(function (item) {
				if(item.name == tagname.val() || item.color == color.val()){
					used = true;
				}
		});
		}
		if(used){
			previous.pop();
			alert('color/name already used! Use diffrent one');
			return;
		}
	setactive(tagname.val(),color.val());
	tagname.val('');
	color.val('#000');
}
function setactive(name,color) { 
		current.name = name;
	current.color = color;
	$('.active-tag-content').html(` <span style="background:${color};" class="tag">${name}</span></span> `);
 }
// function setColor(color){
// 	// console.log(color);
// 	if(reserved_colorcodes.includes(color)){
// 		alert('Color userd pick another one');
// 	}
// 	else{
// 		reserved_colorcodes.push(color); 
// 		current.color = color;
// 	}
// }

// function setClass(txt){
// 	console.log(txt);
// 	if(reserved_class.includes(txt)){
// 		alert('Class userd pick another one');
// 	}
// 	else{
// 		reserved_class.push(txt); 
// 		current.name = txt;
// 	}
// }
// var mouseDown = false;
// $('.main').on('mousedown touchstart', function(event) {
//   event.preventDefault();
//   mouseDown = true;
// });
// $('.main').on('mousemove touchmove', function(event) {
//   // if(!editor_active) {
// 		event.preventDefault();
//   // }
// });
// / mousemove touchmove
	$('.main').on('click mousemove touchmove', function (e) {
		var selection  	= window.getSelection();
		var parent =null;
		var flg = (!$(this).text()) || ($(this).prop('contenteditable'));
		if(flg !="false"){
			return;
		}
		if(!current.name){
			return;
		}
		
		if(window.getSelection().anchorNode){
			parent	= window.getSelection().anchorNode.parentElement;
		}

		if(parent && !$(parent).hasClass('main')){
			return;
		}
		try{
			var range 			= selection.getRangeAt(0);
		}
		catch(e){
			// console.log('break');
			return;
		}
		
		var node 				= selection.anchorNode;
      while (range.toString().indexOf(' ') != 0) {
					
					if(range.startOffset ==0 ){
						break;
					}
					range.setStart(node, (range.startOffset - 1));
				// }
      }
      range.setStart(node, range.startOffset + 1);
      do {
				try{
					
					range.setEnd(node, range.endOffset + 1);
				}
				catch(e){
					break;
				}
      }
			while (range.toString().indexOf(' ') == -1 && range.toString().trim() != '');
			
      range.setStart(node, range.startOffset - 1);
		var selected_txt         = range.toString().trim();

		if (e.ctrlKey) {
			// console.groupCollapsed('yes control');
			//  console.log(selection);
			//  console.log(selected_txt);
			//  console.log(selection.anchorOffset);
			//  console.log(selection.focusOffset);
			// console.groupEnd();
	 }
	 else{
		//  console.groupCollapsed('NO control');
		// 	console.log(selection);
		// 	console.log(selected_txt);
		// 	console.log(selection.anchorOffset);
		// 	console.log(selection.focusOffset);
		// 	console.groupEnd();
			var selectionContents   = range.extractContents();
			var span                = $(`<span class="selected" start="" end="" classgroup=""  style="border-color:${current.color};background:${current.color}40;">  <span>${selected_txt} <span style="background:${current.color};" class="tag">${current.name}</span></span> </span>`)[0];
			
			// span.setAttribute("class","selected");
	
			// span.style.backgroundColor  = "red";
			// span.style.color            = "white";
	
			range.insertNode(span);
			clearSelection();
	 }
		
	});
// });​
// $(".main").live("click",function(event)
//     {
//         event.stopPropagation();
//         SelectText($(this));
//     });

function SelectText(element)
{
    var doc = document,
            text = element.get(0),
            range,
            selection;
    if (doc.body.createTextRange)
    {
        range = document.body.createTextRange();
        range.moveToElementText(text);
        range.select();
    }
    else if (window.getSelection)
    {
        selection = window.getSelection();
        range = document.createRange();
        range.selectNodeContents(text);
        selection.removeAllRanges();
        selection.addRange(range);
    }
}

function clearSelection() {
	if(document.selection && document.selection.empty) {
			document.selection.empty();
	} else if(window.getSelection) {
			var sel = window.getSelection();
			sel.removeAllRanges();
	}
}
function save(button) {
	// console.log($(button).data('parsed'));
	
	if($(button).data('parsed') == false){
		var text = strip($('.main').html());
		$('.main').text(text);
		$(button).data('parsed','true')
	}
	if($('.main').prop('contenteditable') == "false"){
		$('.main').prop('contenteditable',true);
		$('.lock-status .lock').hide();
		$('.lock-status .unlock').show();
	}
	else{
		$('.main').prop('contenteditable',false);
		$('.lock-status .unlock').hide();
		$('.lock-status .lock').show();
	}
}
function strip(html) {
    var tempDiv = document.createElement("DIV");
    tempDiv.innerHTML = html;
    return tempDiv.innerText;
  }

function clickx() {
	console.log('startd');
	
    if($('.main').html()){
			console.log('reached');
        var range               = window.getSelection().getRangeAt(0);
        var selectionContents   = range.extractContents();
        var span                = document.createElement("span");
        span.appendChild(selectionContents);
        console.log(selectionContents);
        
        span.setAttribute("class","selected");
    
        span.style.backgroundColor  = "red";
        span.style.color            = "white";
    
        range.insertNode(span);
    }
}