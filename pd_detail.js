window.onload=( function() {

var widget = document.getElementsByClassName("card-figcaption-body");
for(var i=0;i<widget.length;i++){
    const el = widget[i].closest('.card-figure');

var url = el.querySelectorAll('.card-figure__link')[0].href;

    

widget[i].innerHTML = widget[i].innerHTML + '<a class="button button--small card-figcaption-button " data-product-id="103" href='+url+'>Product detail</a>';

    
}
    if(widget = document.getElementsByClassName("productView")[0]){
        var widget = document.getElementsByClassName("productView-options");
widget[0].innerHTML = widget[0].innerHTML + '<button type="button" class="button button--primary">BOPIS</button>';
        getLatLang();
        alert("aaaaaaaaaaaaaa");
    }
    

    });
