<script>

	var x = document.createElement("INPUT");
  x.setAttribute("type", "hidden");
  x.setAttribute("id", "plugin");
  x.setAttribute("value","shopware");
  document.body.appendChild(x);
   	var y = document.createElement("INPUT");
  y.setAttribute("type", "hidden");
  y.setAttribute("id", "quivers-config-option");
  y.setAttribute("name","quivers-config-option");
  y.setAttribute("vlaue","");  
  document.body.appendChild(y);
    
    
  var head = document.getElementsByTagName('HEAD')[0];
 
        // Create new link Element
        var link = document.createElement('link');
 
        // set the attributes for link element
        link.rel = 'stylesheet';
     
        link.type = 'text/css';
     
        link.href = 'https://cdn.jsdelivr.net/gh/yasirdis/bicome_prodetailButton@48a49f056d65728d4162d3245de25ea4bdf2af2c/quiversbopis.css';
 
        // Append link element to HTML head
        head.appendChild(link);  
</script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
<script>
if(document.getElementById('plugin')){
	var plugin =document.getElementById('plugin').value;
}
else{
	var plugin ="magento2";
}

var upcValidate = true;
var postcode = null;
var classNameForError = "mage-error";
var errorHtml = null;
var message = null;
var formData = null;
var html = "";
var storelist = null;
var pickitUpButtonId = 'product-pickitup-button';
var updateaction =null;

if(document.getElementById('show')){
	var show =document.getElementById('show').value;
	var hide =document.getElementById('hide').value;
}else{
	var show = "processStart";
	var hide = "processStop";
}

if (document.getElementById('modalopen')) {
	var open =document.getElementById('modalopen').value;
	var close = document.getElementById('modalclose').value;
}else{
	var open ='';
	var close ='';
}

if (document.getElementById('primaryClass')) {
	var primaryClass =document.getElementById('primaryClass').value;
}else{
	var primaryClass = 'primary';
}

var keyofajax = null;
if (document.getElementById('apibaseurl')) {
	var apiBaseUrl = document.getElementById('apibaseurl').value;
}
if (document.getElementById('sitebaseurl')) {
	var siteBaseUrl = document.getElementById('sitebaseurl').value;
}

function ErrorHtml(classNameForError, htmlid, message) {
	return '<div for="' + htmlid + '" generated="true" class="' + classNameForError + ' id="' + htmlid + '-error">' + message + '</div>';
}

function loderShow(show) {
	console.log('loader show');
	if(plugin == "magento2"){
		jQuery('body').trigger(show);
	}else{
		jQuery('#quivers-loading-overlay').fadeIn(500);
		document.getElementById("Quiver_loader").style.display = "block";
	}

}

function loderHide(hide) {
	console.log('loader hide');
	if(plugin == "magento2"){
		jQuery('body').trigger(hide);
	}else{
		jQuery('#quivers-loading-overlay').fadeOut(500);
		document.getElementById("Quiver_loader").style.display = "none";
	}

}

function pickItUpValidation(classNameForError) {
	var errorexist = document.getElementsByClassName(classNameForError);
	removeExistError(errorexist);

	var qtyid = "qty";
	var qty = document.getElementById(qtyid);
	if (qty.value == 0 || qty.value == "") {
		var html = '';
		message = "please enter a valid number.";
		qty.classList.add(classNameForError);
		html = ErrorHtml(classNameForError, qtyid, message);
		qty.insertAdjacentHTML("afterend", html);
	}
	jQuery("select").each(function () {
		var fields = jQuery(this).serializeArray();
		id = jQuery(this).attr("id");
		if (fields[0].value == "") {
			var selectid = document.getElementById(id);
			selectid.classList.add(classNameForError);
			message = "This is a required field.";
			html = ErrorHtml(classNameForError, selectid, message);
			selectid.insertAdjacentHTML("afterend", html);
		}

	});
	if (errorexist.length > 0) {
		return false;
	} else {
		return true;
	}
}

function removeExistError(errorexist) {
	if (errorexist.length > 0) {
		var elements = document.querySelectorAll('.' + classNameForError);
		for (var element of elements) {
			if (element.nodeName == 'DIV') {
				element.parentNode.removeChild(element);
			} else {
				element.classList.remove(classNameForError);
			}
		}
	}
}

// function openModalForStore(pickitUpButtonId, classNameForError) {
// 	jQuery(document).on('click', '#' + pickitUpButtonId, function () {
// 		var validate = pickItUpValidation(classNameForError);
// 		console.log(validate);
// 		if (validate === true) {
// 			// getZipcode();
// 			//open modal
// 		}

// 	});
// }


function asyncRunAjax(url, method, reqData, key, type) {
	keyofajax = key;
	return jQuery.ajax({
			url: url,
			dataType: type,
			type: method,
			data: reqData,
			ignoreCSRFHeader:true,
			async: "false" ,
			beforeSend: function () {
				loderShow(show);
			}
		});
	
}

function runAjax(url, method, reqData, key, type) {
	keyofajax = key;
		jQuery.ajax({
			url: url,
            ignoreCSRFHeader:true,
			dataType: type,
			type: method,
			data: reqData,
			beforeSend: function (jqXHR, settings) {
			
				loderShow(show);
	
			},
			success: function (response) {
			
				ajaxSuccess(response);
				
			},
			error: function (xhr, status, error) {
				ajaxError(xhr, status, error);
				
			}
		});

}

function ajaxSuccess(response) {
	switch (keyofajax) {
		case "zipcodewithlatlong":
			loderHide(hide);
			response = response.result;
			console.log(response.coordinates);
			if(response.coordinates){
				setLatLong(response.coordinates);
			}
			if (response.postCode) {
				checkforPickitup(response.postCode);
			} else {
				getZipcodeWithIp()
				.then(function(result){
					fetchIpAfterHitApi(result);
				})
				.catch(function(err){
					ajaxError(null, null, err);
				});
			}
			break;
		case "zipcodewithIP":
			loderHide(hide);
			response = response.result;
			if(response.coordinates){
				setLatLong(response.coordinates);
			}

			if (response.postCode != null && response.postCode != "") {
				checkforPickitup(response.postCode);
			}
			break;
		case "modaldata":
			loderHide(hide);
			console.log("---------- Model Data");
			storelist = response.result;
			console.log('storelist'+storelist);
			setStoresforconfigProd(storelist);
			postCode = document.getElementById("zipcode").value;
			if(document.getElementById(pickitUpButtonId)){
				document.getElementById(pickitUpButtonId).disabled = false;
			}
			getModalBody(storeId = null, bopisstatus = null,
				storelist, postCode, searchTerm = null);
			
			break;
		case "addtocart":
			console.log("---------- aadd to cart");
			hideModal(close);
			document.getElementById("store").value ="";
			document.getElementById("shipping").value ="";
			
			if(plugin == "woocommerce"){
				loderShow(show);
			}else{
				loderHide(hide);
			}
			if (response.backUrl) {
				window.location.href = response.backUrl;
			}
			break;
		case "zipcode-change":
			{
				loderHide(hide);
				response = response.result;
				postCode = document.getElementById("zipcode").value;
				getModalBody(storeId = null, bopisstatus = null,
					response, postCode, searchTerm = null, shippingmethod = null, search = null);
			}
			break;
		case "editstoreName":
			{
				loderHide(hide);
				if(response && response.success!='true'){
					if(response.success && plugin=="magento2"){
						var selectid = document.getElementById('zipcode');
						var classNameForError = 'mage-error';
						var errorexist = document.getElementsByClassName(classNameForError);
						removeExistError(errorexist);
						html = ErrorHtml(classNameForError, selectid, response.message);
						selectid.insertAdjacentHTML("afterend", html);
						let element = document.getElementById('store-modal');    
						element.scrollIntoView(true);
					}
					if(plugin=="shopware"){
						location.reload();	
					}
				
				
				}
			
				if(response && response.success==='true'){
					if(plugin=="woocommerce"){
						woocommercercartupdate();	
					}else{
						location.reload();
					}
				
				}
				
			}
			break;
			case "editshippingName":
				if(plugin=="woocommerce"){
					woocommercercartupdate();	
				}else{
				location.reload(true);
			}
				
		    break;
			case "latlongwithpostalcode":
				loderHide(hide);
				if(response.result.coordinates){
					setLatLong(response.result.coordinates);
				}
		    break;
			case "shipInstead":
				if(plugin=="woocommerce"){
					woocommercercartupdate();	
				}else{
				location.reload(true);
			}
				
			break;
			case "getIp":
			break;
		default:
			// code block
	}
}

function setStoresforconfigProd(stores) {
	if (document.getElementById("quivers-config-option")){
		var configOption = document.getElementById("quivers-config-option").value;
		if (configOption){
			postcodes = [];
			if (document.getElementById("stores")){
				storelist.forEach(function (store, index) {
					postcodes.push(store.address.postalCode);
				});
				if (document.getElementById("postalcodes")){
					document.getElementById("postalcodes").value = JSON.stringify(postcodes);

				}
				document.getElementById("stores").value = JSON.stringify(stores);
			}
		}
	}
}


function ajaxError(xhr, status, error) {
	if (document.getElementById(pickitUpButtonId)) {
		document.getElementById(pickitUpButtonId).disabled = false;
		loderHide(hide);
		html = '<div class="alert alert-danger fade in alert-dismissible">Something Went Wrong After Some time. Please try again</div>';			
	    document.getElementById('popup-body').innerHTML = html;
	}
	// Do NOT REMOVE CONSOLE
	if(error && error.responseText){
		console.log("Quivers Bopis Error :");
		console.log(error.responseText);
	}

}

function checkforPickitup(postCode) {
	document.getElementById("userPostalcode").value = postCode;
	console.log(postCode);
	document.getElementById("zipcode").value = postCode;
	allpostalcodes = document.getElementById("postalcodes").value;
	allpostalcodes = allpostalcodes.split();
	result = allpostalcodes.includes(postCode);

	if(plugin == "magento2" || plugin == "woocommerce"){
		upcValidate = true;		
		var tempData = getStoreList(postCode);		
		if(typeof tempData == 'undefined'){
			upcValidate = false;		
			getStoreList(postCode);		
		}
	}else{
		getStoreList(postCode);		
	}
}

function setLatLong(response){	
	document.getElementById("lat").value=response.latitude;
	document.getElementById("long").value=response.longitude;

}
function getLatLang() {
	console.log("cccccccccccccccccccc");
	var options = {
		enableHighAccuracy: true,
		timeout: 5000,
		maximumAge: 0
	};
	navigator.geolocation.getCurrentPosition(getZipcodewithlatlong, error, options);
}

async function getLatLangwithpostalcode(postCode) {
	url = apiBaseUrl + "v1/geolocation/getlocation?postCode=" + postCode;
	method = "GET";
	result = await asyncRunAjax(url, method, null, "latlongwithpostalcode", null);
	return result;
}

function error(err) {
	getZipcodeWithIp()
		.then(function(result){
			loderHide(hide);
			fetchIpAfterHitApi(result);
		})
		.catch(function(err){
			ajaxError(err);
		});
}


function getZipcodewithlatlong(pos) {
	var crd = pos.coords;
	var lat = crd.latitude;
	var long = crd.longitude;
	url = apiBaseUrl + "v1/geolocation/getlocation?latitude=" + lat + "&longitude=" + long;
	method = "GET";
	runAjax(url, method, null, "zipcodewithlatlong", null);
}

function getZipcodebyApi(postcode) {
	url = apiBaseUrl + "v1/geolocation/getlocation?postCode=" +postcode;
	method = "GET";
	runAjax(url, method, null, "getzipcode", null);

}


async function getZipcodeWithIp() {
    method = "GET";
    url = "https://api.ipify.org?,format=json";
    result = await asyncRunAjax(url, method, null, 'getIp', null);
    return result;			
}

 function fetchIpAfterHitApi(ip){
    document.getElementById("custIp").value = ip;
    url = apiBaseUrl + "v1/geolocation/getlocation?ipAddress=" + ip;
    runAjax(url, method, null, 'zipcodewithIP', null);		
}

function getStoreList(postcode) {
	method = "GET";
	searchterm = document.getElementById("searchterm").value;
	console.log('searchterm'+searchterm);
	var configOption = false;
	if(document.getElementById("quivers-config-option")){
		configOption = document.getElementById("quivers-config-option").value;
	}
	if (configOption){
		var str = "quivers-upc-";
		if(upcValidate == false){	
			str = "quivers-sku-";	
		}
		var element = str.concat(configOption);
		searchterm = document.getElementById(element).value;
		document.getElementById("config-searchterm").value = searchterm;
	}	
	if(searchterm){
		storeFrontId = document.getElementById("marketplace").value;
		url = apiBaseUrl + "v1/inventory/getFulfillmentOptions?storefrontId=" + storeFrontId + "&searchTerm=" + searchterm;
		runAjax(url, method, null, "modaldata", null);	
	}

}

function getModalBody(storeId = null, bopisstatus = null,
	storelist, postalcode, searchTerm = null, shippingmethod = null, search = null) {
	html = "";
	console.log('Store:'+storelist);
	storelist = soretdStoreNearestLocation(storelist);
	if (storelist != undefined || storelist != []) {
		storelist.forEach(function (store, index) {
			store  = store[2];
			if (search == null || (search == true)) {
				if (store.stockLevel > 0 && (store.instorePickupEnabled === true || store.curbsidePickupEnabled === true)) {
					active = storeId == store.businessRefId ? "store-active" : "";
				
					html += '<div  id="'+active+'" class="popup-storelist ' + active + '">' +
						'<div>';
					// if (active != "") {
						html += '<span class="list-title">' ;
					// }		
						html += '<strong>';
							html += store.businessName;
							html += '</strong>';
					// if (active != "") {
					    html +=	'</span>';
					// }
					
					if(document.getElementById("lat")){
						html+=  '<span class="distance">';
						html+=store.address.miles; 
						html+= ' miles</span>';
					}
			
					html += '</div>' +

						'<p class="store-details">';
	
					// html += '</br>';
					html += store.address.line1 == null ? " " : store.address.line1 + " ";
					html += store.address.line2 == null ? " " : "</br> "+store.address.line2 + " ";
					html += '</br>';
					html += store.address.city + "," + store.address.postalCode + "," ;
					html += '</br>';
					html +=store.address.region.name + ","+store.address.country.name;

					html += '</p>' ;
					
					html +=	'<div>' ;

					if(store.storeHours){
						if (store.storeHours.length == 0){
							html +=	'<span class="store-time" style="display:none" >See store hours<div class="tolltipicon">?</div><span class="tooltiptime">';
						}else{
							html +=	'<span class="store-time" >See store hours<div class="tolltipicon">?</div><span class="tooltiptime">';
						}

						// '<img class="store-time-image" src="img/Information.png" />'+
						store.storeHours.forEach(function (time, index) {
							html += '<span class="times">';
							html += "<span class='time-day'>";
							html += getDays(time.dayId);
							html += "</span>";
							html += "<span class='time-day'> : ";
							html += getTime(time.openingTime)+ " AM - ";
							html += getTime(time.closingTime)+ " PM ";
							html += "</span>";
							html += '</span>';
						});
						html += '</span>' ;
						html +=	'</span>' ;
					}
					html +=	'<div class="quivers-popup-buttons">';
					if (store.instorePickupEnabled === true) {
						if (storeId == store.businessRefId && shippingmethod == "1") {
							html += '<span class="selected" >Picking up here</span>';
						} else {
							html += "<a href='javascript:void(0)' onclick='pickhere("+JSON.stringify(store)+','+'1'+','+JSON.stringify(searchTerm)+")'  store='" + JSON.stringify(store) + "' shiping-method='1' searchterm='" + searchTerm + "' countryid='" + store.address.country.id + "'  class='popup-button pick-here action "+primaryClass+"'>Pick up here</a>";

						}
					}
					// do not remove
					// if (store.curbsidePickupEnabled === true) {
					// 	if (storeId == store.businessRefId && shippingmethod == "2") {
					// 		html += '<span class="selected" >Picking up here</span>';
					// 	} else {
                    //     	html += "<a href='javascript:void(0)' onclick='pickhere("+JSON.stringify(store)+','+'2'+','+JSON.stringify(searchTerm)+")' store='" + JSON.stringify(store) + "' shiping-method='2' searchterm='" + searchTerm + "' countryid='" + store.address.country.id + "'  class='popup-button pick-here action  "+primaryClass+" '>Curbside</a>";

					// 	}

					// }
					html += '</div>' +
						'</div>' +
						'</div>';
				}
			}
		});

		if (html == "") {
			html = '<div class="alert alert-danger fade in alert-dismissible">Could not find stores for this product near your location. Please change the zipcode and try again</div>';
		}
		document.getElementById('popup-body').innerHTML = html;
	}
	return true;
}

function addToCart() {	
	var form =  jQuery("#product_addtocart_form");
	if(plugin == "shopware" || plugin=="woocommerce"){
		form.trigger('submit');
		keyofajax="addtocart";
		ajaxSuccess([]);
	}
	if(plugin == "magento2"){
        var url = document.getElementById("addToCartUrl").value;
        var formData = form.serialize();
        var method = 'post';
        formData += '&isAjax=1';
        runAjax(url, method, formData, "addtocart", 'json');	
	}
}


function pickhere(store,shipping,searchterm){
	hideModal(close)
	if (document.getElementById("edit").value == "true") {
		postalcode = jQuery(this).attr('postalcode');
		data = {
			searchTerm:searchterm,
			shipping: shipping,
			store :JSON.stringify(store),
			userPostalcode :document.getElementById("zipcode").value
		}
		updateaction = "store_edit";
		urldata = storeEditupdateUrl(plugin,updateaction);
	    url =urldata['url'];
		method = urldata['method'];
	    type = urldata['type'];
		runAjax(url, method, data, "editstoreName", type);
	} else {
		document.getElementById("shipping").value = shipping;
		document.getElementById("store").value = JSON.stringify(store);
	    addToCart();
	}
}

//for magento2
function updatecart(searchterm) {
	data = {
		searchTerm: document.getElementById("searchTerm").value
	}
    var array = siteBaseUrl.split("/checkout"); 
	url = array[0] + "bopisquivers/store/add";
	method = "GET";
	runAjax(url, method, data, "editstoreName", 'json');
}

function zipcodeValidation(zipcode)
{
	// Pass alphanumeric, hyphen, spaces
	var matchBad = /[^\s\da-z\-]/i;
	if (false === matchBad.test(zipcode)) {
		return true;
	} else { 
		return false;
	}
}

function changezipcode() {
	currentpostcode =document.getElementById("zipcode").value;
	console.log(currentpostcode);
	search =null;
	if (currentpostcode == ""){
		html = '<div class="alert alert-danger fade in alert-dismissible">Could not find stores for this product near your location. Please change the zipcode and try again</div>';			
		document.getElementById('popup-body').innerHTML = html;
		return;
	}
	var validate = zipcodeValidation(currentpostcode);
	if (!validate){
		html = '<div class="alert alert-danger fade in alert-dismissible">Could not find stores for this product near your location. Please change the zipcode and try again</div>';			
		document.getElementById('popup-body').innerHTML = html;
		return;
	}
	// if (currentpostcode.length>=4) {
	// 	search =true;
	// }
	if (document.getElementById("edit").value == "true") {
		var searchterm =document.getElementById('searchTerm').value;
		var el =document.getElementById(searchterm);
		stores = JSON.parse(el.value);
		postalcode = el.getAttribute('userlocation');
		document.getElementById("searchTerm").value = searchterm;
		document.getElementsByClassName("update-ship-instead").value = searchterm;
		storeId = el.getAttribute('storeId');
		shippingmethod = el.getAttribute('shipping');
		postCode = document.getElementById("zipcode").value;
		getLatLangwithpostalcode(postCode)
			.then(function(result){
				ajaxSuccess(result);
				getModalBody(storeId = storeId, bopisstatus = null,
					stores, postCode, searchTerm = null, shippingmethod = shippingmethod, search);		
			})
			.catch(function(err){
				ajaxError(err);
				html = '<div class="alert alert-danger fade in alert-dismissible">Could not find stores for this product near your location. Please change the zipcode and try again</div>';			
				document.getElementById('popup-body').innerHTML = html;
			});
	}else 
	{
		document.getElementById('popup-body').innerHTML = "";
		postCode = document.getElementById("zipcode").value;
		getLatLangwithpostalcode(postCode)
			.then(function(result){
				ajaxSuccess(result);
				stores = document.getElementById("stores").value;
				stores = JSON.parse(stores);
				getModalBody(storeId = null, bopisstatus = null,
					stores, postCode, searchTerm = null, shippingmethod = null, search);
							
			})
			.catch(function(err){
				ajaxError(err);
				html = '<div class="alert alert-danger fade in alert-dismissible">Could not find stores for this product near your location. Please change the zipcode and try again</div>';			
				document.getElementById('popup-body').innerHTML = html;
			});
	}
	
	
};

// function addstore(data) {
// 	url = siteBaseUrl + "bopisquivers/store/add";
// 	method = "GET";
// 	runAjax(url, method, data);
// }


function getDays(day) {
	dayName = null;
	switch (day) {
		case "0":
			return "Sun";
			break;
		case "1":
			return "Mon";
			break;
		case "2":
			return "Tue";
			break;
		case "3":
			return "Wed";
			break;
		case "4":
			return "Thu";
			break;
		case "5":
			return "Fri";
			break;
		case "6":
			return "Sat";
			break;
		default:
			return null;
			break;
	}
}

function getTime(seconds) {
	var date = new Date(null);
	date.setSeconds(seconds);
	var seconds =date.getSeconds();
	var hours = date.getHours();
	var minutes = date.getMinutes();
	hours = hours % 12;
	hours = hours ? hours : 12; // the hour '0' should be '12'
	minutes = minutes < 10 ? '0'+minutes : minutes;

	var strTime = hours + ':' + minutes ;
	return strTime;
}

function storeEdit(searchterm) {
	var el =document.getElementById(searchterm);
	console.log(el);
	stores = JSON.parse(el.value);
	postalcode = el.getAttribute('userlocation');
	document.getElementById("zipcode").value = postalcode;
	document.getElementById("edit").value ='true';
	getLatLangwithpostalcode(postalcode)
	.then(function(result){
		ajaxSuccess(result);
		document.getElementById("searchTerm").value = searchterm;
		console.log('searchTerm'+searchterm);
		document.getElementsByClassName("update-ship-instead")[0].setAttribute("searchterm", searchterm);
		storeId = el.getAttribute('storeId');
		shippingmethod = el.getAttribute('shipping');
		bopisstatus=null;
		action =el.getAttribute('action');
		getModalBody(storeId, bopisstatus, stores, postalcode, searchterm, shippingmethod);
		addtocartpickup(action);
		})
	.catch(function(err){
		html = '<div class="alert alert-danger fade in alert-dismissible">Could not find stores for this product near your location. Please change the zipcode and try again</div>';			
		document.getElementById('popup-body').innerHTML = html;
		ajaxError(err);
	});	
}

function getDistanceFromLatLonIn(lat2,lon2) {
	lat1 =document.getElementById("lat").value;
	lon1 = document.getElementById("long").value;
	var R = 6371; // Radius of the earth in km
	var M =0.62137;
	var dLat = deg2rad(lat2-lat1);  // deg2rad below
	var dLon = deg2rad(lon2-lon1); 
	var a = 
	Math.sin(dLat/2) * Math.sin(dLat/2) +
	Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
	Math.sin(dLon/2) * Math.sin(dLon/2)
	; 
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
	var d = R * c; // Distance in km
	var miles =d* M
	miles =miles.toFixed(2);
	return  miles; // Distance in Miles
	
}
  
function deg2rad(deg) {
	return deg * (Math.PI/180)
}

function addtocartpickup(action){
	// pickItUpValidation();

	showModal(action);
}

function soretdStoreNearestLocation(stores){
	sortedstore =null;
	allmiles = [];
	if (stores != undefined || stores != []) {
		stores.forEach(function (store, index) {
			var lat2 =store.address.latitude;
			var lon2  =store.address.longitude;
			miles = getDistanceFromLatLonIn(lat2 ,lon2);
			store.address['miles'] = miles;
			allmiles.push(miles);
  
  		});
		var storelist = Object.keys(stores).map(function(key) {
			return [key, stores[key].address.miles, stores[key]];
		});
		
		// Sort the array based on the second element
		storelist.sort(function(first, second) {
			return first[1] - second[1] ;
		});
		return storelist;
		}
	else {
		storelist =[];
	}
}

function focusChange(uniqueSelectID){
	el = document.getElementById('bopis-shipping-'+uniqueSelectID);
	selectedmethod =el.options[el.selectedIndex].getAttribute("method_code");
	jQuery('#dropdown_previous_shipping-'+uniqueSelectID).val(selectedmethod);

}

function updateShipping(searchterm, uniqueSelectID) {
	el = document.getElementById('bopis-shipping-'+uniqueSelectID);
	shippingcode =el.options[el.selectedIndex].getAttribute("method_code");
	price =el.options[el.selectedIndex].getAttribute("price");
	label =el.options[el.selectedIndex].getAttribute("method_title");
	selectedmethod =JSON.stringify(el.options[el.selectedIndex].getAttribute("method"));
	result = confirm("Same shipping method will be applied to all the shipped items.");
	if (result) {
		data = {
			searchTerm:searchterm ,
			shippingcode:shippingcode,
			price:price,
			title:label,
			selectedmethod:selectedmethod
		}
		updateaction='method_edit';
		console.log(plugin);
		urldata = storeEditupdateUrl(plugin,updateaction);
		console.log(urldata);
	    url =urldata['url'];
		method = urldata['method'];
		type = urldata['type'];
		runAjax(url, method, data, "editshippingName", type);
	} 
	else{
		var prev = jQuery('#dropdown_previous_shipping-'+uniqueSelectID).val();
		jQuery('#bopis-shipping-'+uniqueSelectID).val(prev);
		return;              
	}
	
}

function showModal(action){
	console.log('plugin: '+plugin);
	console.log(keyofajax);
	if(plugin=="woocommerce"){
		console.log('woo');
		document.getElementById("store-modal").style.display = "block";
		document.getElementsByTagName("body")[0].style.overflow = 'hidden'; 
		document.getElementsByTagName("header")[0].style.zIndex = 1;
	}
	if(plugin=="shopware"){
		console.log('shop');
		document.getElementById("store-modal").style.display = "block";
	}
	if(plugin=="magento2"){
		console.log('mag');
		jQuery("#store-modal").modal(action);
	}
}

function hideModal(close){
	console.log('plugin: '+plugin);
	if(plugin=="woocommerce"){
		document.getElementById("store-modal").style.display = "none";
		document.getElementsByTagName("body")[0].style.overflow = 'auto'; 
		document.getElementsByTagName("header")[0].style.zIndex = 50;
	}
	if(plugin=="shopware"){
		document.getElementById("store-modal").style.display = "none";
	}
	if(plugin=="magento2"){
		jQuery("#store-modal").modal(close);
	}	
}
	
function ShipInstead(id) {
	storeediturl ="";
	if (document.getElementById("edit") && document.getElementById("edit").value == "true"){
		urldata = storeEditupdateUrl(plugin,"method_edit");
	    url =urldata['url'];
		method = urldata['method'];
		type = urldata['type'];
		var el =document.getElementById("update-ship-instead");
		searchterm = el.getAttribute('searchterm')	
		data = {
			searchTerm:searchterm,
			store :null,
		}		
		runAjax(url, method, data, "shipInstead", type);

	}
	else{
		console.log('shipit working');
		document.getElementById("store").value="";
		addToCart();
	}
}

window.onclick = function(event) {
	if (event.target.id == "store-modal") {
		hideModal(close);
	}
 }

function storeEditupdateUrl(plugin,updateaction){
	var urldata = [];
	switch (plugin) {
		case "shopware":
			if(updateaction==='store_edit'){
				url = document.getElementById("storeediturl").value;
				urldata['url']=url;
				urldata['type']='html';
				urldata['method']='POST';
			}
			if(updateaction==='method_edit'){
				url = document.getElementById("storeediturl").value;
				urldata['url']=url;
				urldata['type']='html';
				urldata['method']='POST';
			}
			break;
		case "magento2":
			if(updateaction==='store_edit'){
				var array = siteBaseUrl.split("/checkout"); 
				url = array[0] + "bopisquivers/store/add";
				urldata['url']=url;
				urldata['method']='GET';
				urldata['type']='json';
			}
			if(updateaction==='method_edit'){
				var array = siteBaseUrl.split("/checkout"); 
				url = array[0] + "bopisquivers/shipping/methods";
				urldata['url']=url;
				urldata['method']='GET';
				urldata['type']='json';
				}

			break;
			case "woocommerce":
		
				if(updateaction==='store_edit'){
					siteurl = document.getElementById("storeediturl").value;
					url = siteurl + "/wp-json/bopisquivers/store/update";
					urldata['url']=url;
					urldata['method']='POST';
					urldata['type']='json';
				}
				if(updateaction==='method_edit'){
					siteurl = document.getElementById("storeediturl").value;
					url = siteurl + "/wp-json/bopisquivers/shipping/methods";
					urldata['url']=url;
					urldata['method']='POST';
					urldata['type']='json';
					}
	
				break;
		default:
			var array = siteBaseUrl.split("/checkout"); 
			url = array[0] + "bopisquivers/store/add";
			urldata['url']=url;
			urldata['method']='GET';
			urldata['type']='json';
			break;

	}
	return urldata;
} 
jQuery(document.body).on('keypress', '#zipcode' ,function(event){

    if(event.which === 13 && jQuery(event.target).is(':input') && event.target.getAttribute('type') == 'text'){
        event.preventDefault();
	
		jQuery("#changezipsearch").click();
    }

  });
</script>
<script>
var widget = document.getElementsByClassName("card-figcaption-body");
for(var i=0;i<widget.length;i++){
    const el = widget[i].closest('.card-figure');

var url = el.querySelectorAll('.card-figure__link')[0].href;

    

widget[i].innerHTML = widget[i].innerHTML + '<a class="button button--small card-figcaption-button " data-product-id="103" href='+url+'>Product detail</a>';

    
}
            if(document.getElementsByClassName("productView")[0]){
        var widget = document.getElementsByClassName("productView-options");
widget[0].innerHTML = widget[0].innerHTML+
'<input type="hidden" id="config-searchterm" name="config-searchterm" value="" />'+
'<input type="hidden" id="apikey" name="apikey"  value="apikey 114c90ac-c5a4-406e-a036-cf97eb3b8367" />'+
'<input type="hidden" id="marketplace" name="marketplace"  value="3512671f-1fd7-4dbe-84fd-0cd7052f0f55" />'+
'<input type="hidden" id="userPostalcode" name="userPostalcode"  value="" />'+
'<input type="hidden" id="shipping" name="shipping"  value="" />'+
'<div id="Quiver_loader">llllkkkkkkkk</div>'+
'<input type="hidden" id="lat" value=""/>'+
'<input type="hidden" id="long"  value=""/>'+
            '<input type="hidden" id="postalcodes"  value=""/>'+
'<input type="hidden" id="stores" value="" />'+
'<input type="hidden" id="addToCartUrl" value="" />'+
'<input type="hidden" id="apibaseurl"  value="https://api.quiverstest.com/" />'+
'<input type="hidden" id="sitebaseurl"  value="" />'+
'<input type="hidden" id="custIp" name="custIp"  value="" />'+
'<input type="hidden" id="searchterm" name="searchterm" value="" />'+
 '   <input type="hidden" id="store" name="store"   value="" />'+
'<input type="hidden" id="modalopen"   value="openModal" />'+
'<input type="hidden" id="modalclose"    value="closeModal" />'+
   '<div id="quiversmodalappend"  class="quiversaction" >'+
                    '<button type="button"'+ 
                            'title="Pick Up"'+
                            'class="action primary quiverspickitup button button--primary"'+
                            'onclick="addtocartpickup(\'openModal\');"'+
                            'id="product-pickitup-button" >'+
                        '<span>Pick up</span>'+
                    '</button>'+
        '</div>'+
                '<div id="store-modal" style="display:none;">'+
    '<div class="quiverswrapper">'+
 '       <label class="labelzipcode">Showing location near zipcode:</label>'+
  '      <input type="text" class="zipcode" id="zipcode" value="" >'+
   '     <button type="button" onclick="changezipcode()"><i class="fa fa-search"></i></button>'+
      '  <input type="hidden" class="edit" id="edit" value="">'+
    '</div>'+
    '<div class="popup-body" id="popup-body">'+
    '<div class="alert alert-danger fade in alert-dismissible">'+
    'Could not find stores for this product near your location. Please change the zipcode and try again.'+
    '</div>'+
    '</div>'+
'</div>';
                document.getElementById('searchterm').value='{{product.call_for_price}}';
getLatLang();
    }

   
    

   
</script>

