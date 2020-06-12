var current = {
	name:'xxxx',
	color:'#f00',
}
	$('.main').on('dblclick', function (e) {
		var selection               = window.getSelection();
		var selected_txt               = window.getSelection().toString();
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
			var range               = window.getSelection().getRangeAt(0);
			var selectionContents   = range.extractContents();
			var span                = $(`<span class="selected" style="border-color:">  <span>${selected_txt}</span> </span>`)[0];
			
			// span.setAttribute("class","selected");
	
			// span.style.backgroundColor  = "red";
			// span.style.color            = "white";
	
			range.insertNode(span);
			clearSelection();
	 }
		
	});
// });​

function clearSelection() {
	if(document.selection && document.selection.empty) {
			document.selection.empty();
	} else if(window.getSelection) {
			var sel = window.getSelection();
			sel.removeAllRanges();
	}
}
function save(button) {
	console.log($(button).data('parsed'));
	
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