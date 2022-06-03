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
  ' <button type="button" title="Pick up" class="action primary quiverspickitup" onclick="addtocartpickup('openModal');" id="product-pickitup-button" >Pick up'+
       '</button>'
    }
    
    });
