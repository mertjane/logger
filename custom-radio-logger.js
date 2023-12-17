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

        // console.log('Selected radio button value:', sizeName);

        // Calculate tiles based on square meter input
        calculateTiles(sizeName);
    });

    
    // Calculate tiles based on square meter input
    function calculateTiles(sizeName) {
        // Assuming a conversion factor from square millimeters to tiles
        // Adjust this value based on your specific calculation
        var conversionFactor = 0.0001; // Adjust this value based on your specific calculation

        // Parse the dimensions (assuming format: 305x305)
        var dimensions = sizeName.split('x');
        var length = parseFloat(dimensions[0]);
        var width = parseFloat(dimensions[1]);

        // Calculate the area in square millimeters
        var area = length * width;

        // Get the square meter input value
        var squareMeterInput = $('#squareMeterInput').val();

        // Check if the input is a valid number
        if ($.isNumeric(squareMeterInput)) {
            
            // Calculate the quantity of tiles based on square meter input and round to the nearest whole number
            var quantity = Math.round((squareMeterInput / area) * conversionFactor);

            // Display the calculated quantity in the quantity input
            $('#tilePieceInput').val(quantity.toFixed(2));
        }
    }

    // Calculate square meter based on quantity input
    $('#tilePieceInput').on('input', function() {
        // Get the quantity input value
        var quantityInput = $(this).val();

        // Check if the input is a valid number
        if ($.isNumeric(quantityInput)) {
            // Assuming an inverse conversion factor from tiles to square millimeters
            // Adjust this value based on your specific calculation
            var inverseConversionFactor = 10000; // Adjust this value based on your specific calculation

            // Parse the dimensions (assuming format: 305x305)
            var dimensions = $('.woovr-variation-radio.selected').find('.woovr-variation-name').text().split('x');
            var length = parseFloat(dimensions[0]);
            var width = parseFloat(dimensions[1]);

            // Calculate the area in square millimeters
            var area = length * width;

            // Calculate the square meter based on the quantity input
            var squareMeter = (quantityInput * inverseConversionFactor) * area;

            // Display the calculated square meter in the square meter input
            $('#squareMeterInput').val(squareMeter.toFixed(3));
        }
    });
});


