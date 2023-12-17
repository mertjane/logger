jQuery(document).ready(function($) {
    // Wait for the DOM to be ready
    // $('.product-size input').prop("readonly", true);
    // $('.product-size').prepend('Size:');

    // Listen to the radio buttons of the WPC Variations Radio Buttons plugin
    $('.woovr-variation-radio').on('click', function() {
        var selectedVariation = $(this).data('id');
        var sizeName = '';

        // Get the product size name of the selected variation.
        if (selectedVariation !== 0) {
            sizeName = $(this).find('.woovr-variation-name').text();
        }

        console.log('Selected radio button value:', sizeName);
    });
});


