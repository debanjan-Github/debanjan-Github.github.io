angular = angular;
(function($, window, document, anglr) {
	var idleTime = 1;
	this.attrs = {
		rowId : 2,
		ipId : 2,
		generateIp : function() {
			return ++this.ipId;
		},			
	}
	var trAvailableOnpage = $('#myTable > tbody').find('tr').length;
	if(!anglr) anglr = angular;
	var app = anglr.module('myApp', []);
	app.controller('pageCntrol', function($scope) {
	    $scope.finishLoadingloginPage = function() {
    		$('.loginContainerFooter > button').on( "click", displayLandingPage);
  		}
  		$scope.finishLoadinglandingPage = function() {
    		$('.delete').on( "click", deleteRow)
    		$('.logoutDiv').on("click", popup)
			$('#ip1').ipInput();
			$('#ip2').ipInput();
  		}
	});
	app.controller('interfaceCntrl', function($scope) {
        $scope.protocol = [
        	"None",
        	"IP"
        	];
        $scope.access = [
        	"None",
        	"Permit"	
        	];
        $scope.createRow = function	() {
        	addRow();
        }
        $scope.searchInTable = function() {
        	searchInTable()
		}
	});

	function checkDIsplayedTrFilledValid() {
		let protocol = $('#myTable > tbody').find('tr').find('select:first')
		let accessType = $('#myTable > tbody').find('tr').find('select:last')
		let ipValid = $('#myTable > tbody').find('tr').find('input')
		for(var i=0; i<protocol.length; i++) {
			if(protocol[i].value == "None") return false;
		}
		for(var i=0; i<accessType.length; i++) {
			if(accessType[i].value == "None") return false;
		}
		for(var i=0; i<ipValid.length; i++) {
			if(ipValid[i].value == "") return false;
		}
		return true
	}

	function addRow() {
		if(!checkDIsplayedTrFilledValid()){
			popup("Please fill correctly the select and ipBox")
			return;
		}
		let table = $('#myTable')
		let tr = '<tr></tr>'
		let row = $('#myTable > tbody').after().prepend(tr);
		row.find('tr:first').attr('rowId', this.attrs.rowId);
		let cellTemplate =
				'<td>'+this.attrs.rowId+'</td>'+
			    '<td>'+
				    '<select class="selectBox">'+
				    	'<option>None</option>'+
				    	'<option>IP</option>'+
				    '</select>'+
				'</td>'+
			    '<td><div id="Ip'+this.attrs.generateIp()+'"></div></td>'+
			    '<td><div id="Ip'+this.attrs.generateIp()+'"></div></td>'+
			    '<td>'+
			    	'<select class="selectBox">'+
				    	'<option>None</option>'+
				    	'<option>Permit</option>'+
				    '</select>'+
				'</td>'+
			    '<td>'+
			    	'<div class="delete">'+
			    		'<img src="images/delete.png">'+
			    	'</div>'+
			    '</td>'
		$('#myTable > tbody').find('tr:first').append(cellTemplate);
		$('#Ip'+this.attrs.ipId+'').ipInput();
		$('#Ip'+(this.attrs.ipId-1)+'').ipInput();
		// $('[rowId="'+this.attrs.rowId+'"]').addClass('trDisable');
		// $('[rowId="'+this.attrs.rowId+'"]').find('input').addClass('trDisable');
		// $('[rowId="'+this.attrs.rowId+'"]').find('i').addClass('trDisable');
		// $('[rowId="'+this.attrs.rowId+'"]').find('select:last').addClass('trDisable');
		trAvailableOnpage = $('#myTable > tbody').find('tr').length;
		$('#totalRecords').html('Showing 1 to '+ trAvailableOnpage +' of Total '+ trAvailableOnpage +' Records');
		$('.delete').on( "click", deleteRow)
		this.attrs.rowId++
		//table.scope()
	}
	function searchInTable() {
		  var input, filter, table, tr, td, i;
		  input = $("#myTableSearch");
		  filter = input.val().toUpperCase();
		  table = $("#myTable");
		  tr = table.find('tbody').find('tr');
		  for (i = 0; i < tr.length; i++) {
		    td = tr[i].getElementsByTagName("td")[0];
		    if (td) {
		      if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
		        tr[i].style.display = "";
		      } else {
		        tr[i].style.display = "none";
		      }
		    }       
		  }
		}
	function deleteRow(){
		let trs = $('#myTable > tbody').find('tr');
		if(trs.length === 1) {
			popup('Table rows can not be empty')
			return;
		}
		let tr = event.currentTarget.parentElement.parentElement;
		tr.remove();
		attrs.rowId = trs.length;
		if($(tr).attr('rowId') ==  trs.length) return;
		trs = $('#myTable > tbody').find('tr');
		trAvailableOnpage = trs.length;
		$('#totalRecords').html('Showing 1 to '+ trAvailableOnpage +' of Total '+ trAvailableOnpage +' Records');
		attrs.rowId = trAvailableOnpage+1;
		let j = 0;
		for(var i = trs.length; i <= trs.length; i--) {
			if(j > trs.length-1) return false;
			var $trs = $(trs[j]);
			if($(tr).attr('rowId') != 1 && $trs.attr('rowId') == i) return false;
			$trs.attr('rowId', i);
			$trs.find('td:first').html(i);
			j++
		}

	}

	function displayLandingPage() {
		let usernameInputValue = $('.loginContainerContent').find('input:first').val()
		let passwordInputValue = $('.loginContainerContent').find('input:last').val()
		if ((localStorage.getItem('username') == usernameInputValue) && (localStorage.getItem('password') == passwordInputValue))
		{	
			$('#loginPage').css('display', 'none')
			$('#landingPage').css('display', 'block')
			$('.menuContent').find('li:eq(1)').css('background', '#b6bbf8')
			$('.menuContent').find('li').on('click', function() {
				$('.menuContent').find('li:eq(1)').css('background', '')
			})
		}
		setInterval(timerIncrement, 120000);
	}

	function popup(msg) {
	 	let message = typeof(msg) === "string" ? msg : "Hiii!!! DO you really want to logout"
		let template ='<div id="popup"><div class="overlay">'+
		'<div class="dialog"><div class="popupContent"></div>'+
		'<div class="popupContent">'+message+'</div>'+
		'</div>'
		let logoutTemplate = '<div id="popup"><div class="overlay">'+
		'<div class="dialog"><div class="popupContent"></div>'+
		'<div class="popupContent"><center>'+message+'</center></div>'+
		'<button id="ok">OK</button><button id="cancel">Cancel</button>'+
		'</div></div></div>'
		if(typeof(msg) === "string") {
			$('body').append(template)
			setTimeout(function() {
					$('#popup').remove()
				}, 1000);
		}else {
			$('body').append(logoutTemplate)
		}
		$('#ok').on( "click", function(){
			$('#landingPage').css('display', 'none')
			$('#popup').remove()
			$('#loginPage').css('display', 'block')
		})
		$('#cancel').on( "click", function(){
			$('#popup').remove()
		})

	}
	function timerIncrement() {
		idleTime++
		if(idleTime>1){
			popup()
		}else{60000
			return false;
		}
		
	}

	localStorage.setItem('username', 'admin')
	localStorage.setItem('password', 'nubewell')
	$(this).mousemove(function (e) {
        idleTime = 0;
    });
    $(this).keypress(function (e) {
        idleTime = 0;
    });
})(jQuery, window, document,angular)