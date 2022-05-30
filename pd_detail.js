window.onload=( function() {
var widget = document.getElementsByClassName("card-figcaption-body");

const el = widget[0].closest('.card-figure');

var url = el.querySelectorAll('.card-figure__link')[0].href;


widget[0].innerHTML = widget[0].innerHTML + '<a class="button button--small card-figcaption-button " data-product-id="103" href='+url+'>Product detail</a>';


    });
