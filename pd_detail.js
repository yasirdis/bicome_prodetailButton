window.onload=( function() {

var widget = document.getElementsByClassName("card-figcaption-body");
for(var i=0;i<widget.length;i++){
    const el = widget[i].closest('.card-figure');

var url = el.querySelectorAll('.card-figure__link')[0].href;

    

widget[i].innerHTML = widget[i].innerHTML + '<a class="button button--small card-figcaption-button " data-product-id="103" href='+url+'>Product detail</a>';

    
}
    if(document.getElementsByClassName("productView")[0]){
        
        var widget = document.getElementsByClassName("productView-options");
        getLatLang();
widget[0].innerHTML = widget[0].innerHTML+
        
        '<input type="hidden" id="postalcodes"  value=""/>'+
'<input type="hidden" id="stores" value="" />'+
'<input type="hidden" id="addToCartUrl" value="" />'+
'<input type="hidden" id="apibaseurl"  value="" />'+
'<input type="hidden" id="sitebaseurl"  value="" />'+
'<input type="hidden" id="custIp" name="custIp"  value="" />'+
'<input type="hidden" id="searchterm" name="searchterm" value="" />'+
 '   <input type="hidden" id="store" name="store"   value="" />'+
'<input type="hidden" id="modalopen"   value="openModal" />'+
'<input type="hidden" id="modalclose"    value="closeModal" />'+
 '   <div id="quiversmodalappend"  class="quiversaction" >'+
  '                  <button type="button" '+
   '                         title="Pick up"'+
                            'class="action primary quiverspickitup"'+
    '                        onclick="addtocartpickup('openModal');"'+
     '                       id="product-pickitup-button" >'+
      '                  <span>"Pick up"</span>'+
       '             </button>'+
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
'</div>'
    }
     require(['jquery',
    'BopisHosted',
     'Bopis'], function($) {
        $('#quivers-config-option').change(function(){
            getLatLang();

        })
        $('#zipcode').keypress(function(e){
            if(e.which == 13){
                changezipcode();
            }
        });
    });

    });
