
var config = {
    map: {
      '*': {
          
           //"BopisHosted":"https://d37gifaus44yor.cloudfront.net/bopishosted.min.js", //test
            // "BopisHosted":"https://d3su35eq9vvgkf.cloudfront.net/bopishosted.min.js", //demo/prod
           "BopisHosted": "QuiversBopis_Integration/js/bopishosted",
           "QuiversBopiscart": "QuiversBopis_Integration/js/quiverbopiscart",
           "Bopis": "QuiversBopis_Integration/js/bopis",
           "Magento_Checkout/template/summary/item/details.html":"QuiversBopis_Integration/template/summary/item/details.html",
           "Magento_Checkout/js/view/summary/item/details": "QuiversBopis_Integration/js/view/summary/item/details",
           'Magento_Checkout/js/view/summary/item/details/thumbnail': 'Magento_Checkout/js/view/summary/item/details/thumbnail',
           'Magento_Checkout/js/view/summary/item/details/message': 'Magento_Checkout/js/view/summary/item/details/message',
           'Magento_Checkout/js/view/summary/item/details/subtotal': 'Magento_Checkout/js/view/summary/item/details/subtotal'   ,               
           'Magento_Checkout/template/shipping.html': 'QuiversBopis_Integration/template/shipping.html'  ,    
           'Magento_Checkout/js/view/shipping': 'QuiversBopis_Integration/js/view/shipping' ,
           'Magento_Checkout/js/view/minicart': 'QuiversBopis_Integration/js/view/minicart',
           'Magento_Checkout/js/model/cart/estimate-service': 'QuiversBopis_Integration/js/model/cart/estimate-service'

    }
  },
  config: {
    mixins: 
    {
        'Magento_Catalog/js/catalog-add-to-cart': {
            'QuiversBopis_Integration/js/catalog-add-to-cart-mixin': true
        },
        'Magento_ConfigurableProduct/js/configurable': {
            'QuiversBopis_Integration/js/configurable-mixin': true
        }
    },
    'Magento_Checkout/js/view/minicart': {
        'QuiversBopis_Integration/js/view/minicart-mixin': true
    }

},
      shim: {
        'BopisHosted': {
            'deps': ['jquery']
        }
        
    }
}