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

    // Function to round a number to the nearest integer
    function roundToInteger(number) {
        return Math.round(number);
    }

    // Event handler for square meter input change
    $('#squareMeterInput').on('input', function () {
        updateCalculation();
    });

    // Event handler for tile piece input change
    $('#tilePieceInput').on('keydown', function (e) {
        // Prevent entering decimals
        if (e.key === '.' || e.key === ',') {
            e.preventDefault();
        }
    });

    // Event handler for tile piece input change
    $('#tilePieceInput').on('input', function () {
        updateCalculation();
    });


    // Function to update the calculation based on inputs
    function updateCalculation(sizeName) {
        var squareMeterValue = parseFloat($('#squareMeterInput').val());
        var sizeName = $('.woovr-variation-radio.selected').find('.woovr-variation-name').text();
    
        // Parse the dimensions (assuming format: 305x305x12 mm)
        var dimensions = sizeName.split('x');
        var length = parseFloat(dimensions[0]);
        var width = parseFloat(dimensions[1]);
        var thickness = parseFloat(dimensions[2]);

        if (!isNaN(squareMeterValue) && squareMeterValue > 0 && !isNaN(length) && length > 0 && !isNaN(width) && width > 0) {
            var tileQuantity = roundToInteger(squareMeterValue / ((length / 1000) * (width / 1000))); // Convert size to meters
            $('#tilePieceInput').val(tileQuantity);
        } else {
            $('#tilePieceInput').val('');
        }
    }    
});


