var widget = document.getElementsByClassName("card-figcaption-body");
   function on() {
  document.getElementById("overlay").style.display = "block";
}

function off() {
  document.getElementById("overlay").style.display = "none";
}
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
'<input type="hidden" id="searchterm" name="searchterm" value="885256" />'+
 '   <input type="hidden" id="store" name="store"   value="" />'+
'<input type="hidden" id="modalopen"   value="openModal" />'+
'<input type="hidden" id="modalclose"    value="closeModal" />'+
   '<div id="overlay" onclick="off()">'+
               '<div id="store-modal" style="display:none;">'+
    '<div class="quiverswrapper">'+
        '<label class="labelzipcode">Showing location near zipcode:</label>'+
        '<input type="text" class="zipcode" id="zipcode" value="" >'+
        '<button type="button" onclick="changezipcode()"><i class="fa fa-search"></i></button>'+
        '<input type="hidden" class="edit" id="edit" value="">'+
    '</div>'+
    '<div class="popup-body" id="popup-body">'+
    '<div class="alert alert-danger fade in alert-dismissible">'+
    'Could not find stores for this product near your location. Please change the zipcode and try again.'+
    '</div>'+
    '</div>'+
'</div>'+
               '</div>'+
'<div style="padding:20px">'+
  '<button onclick="on()">Pick up</button>'+
'</div>';
                
getLatLang();
                    
    }


    
