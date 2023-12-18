/* jQuery(document).ready(function ($) {

    // Listen to the radio buttons of the WPC Variations Radio Buttons plugin
    $('.woovr-variation-radio').on('click', function () {
        var selectedVariation = $(this).data('id');
        var sizeName = '';

        // Get the product size name of the selected variation.
        if (selectedVariation !== 0) {
            sizeName = $(this).find('.woovr-variation-name').text();
        }

        console.log('Selected radio button value:', sizeName);
    });

    // Listen to changes in the square meter input field
    $('#squareMeterInput').on('input', function () {
        var squareMeterValue = $(this).val();
        squareMeterValue = squareMeterValue.replace(/\.\d+/g, '');
        $(this).val(squareMeterValue);
        console.log('Square Meter Input:', squareMeterValue);

        // Your existing calculation logic here

        // Update the quantity input field based on the calculation
        // ...

        // Update any other fields as needed
        // ...
    });

    // Listen to changes in the tile piece input field
    $('#tilePieceInput').on('input', function () {
        var tilePieceValue = $(this).val();
        tilePieceValue = tilePieceValue.replace(/\.\d+/g, '');
        $(this).val(tilePieceValue);
        console.log('Tile Piece Input:', tilePieceValue);

        // Your existing calculation logic here

        // Update the square meter input field based on the calculation
        // ...

        // Update any other fields as needed
        // ...
    });
});

*/

/*

jQuery(document).ready(function ($) {

    $("#squareMeterInput").on("input", function () {
        // Remove any non-numeric characters, including decimals
        var inputValue = $(this).val().replace(/[^\d]/g, '');

        // Update the input value
        $(this).val(inputValue);

        // Get the entered square meters
        var squareMeters = parseInt(inputValue) || 0;

        // Get the product size name of the selected variation.
        var sizeName = '';

        // Listen for radio button clicks
        $('.woovr-variation-radio').on('click', function () {
            var selectedVariation = $(this).data('id');

            // Get the product size name of the selected variation.
            if (selectedVariation !== 0) {
                sizeName = $(this).find('.woovr-variation-name').text();
            }

            // Update tile dimensions based on the selected variation
            updateTileDimensions(sizeName);
        });

        // Function to update tile dimensions based on the selected variation
        function updateTileDimensions(sizeName) {
            // Extract width and height from the sizeName (assuming the format is "widthxheight")
            var dimensions = sizeName.split('x');
            var tileWidth = parseInt(dimensions[0]) || 1; // Set a default value of 1 if not a valid number
            var tileHeight = parseInt(dimensions[1]) || 1; // Set a default value of 1 if not a valid number

            // Calculate the number of tiles needed
            var tilesNeeded = Math.ceil((squareMeters * 1000000) / (tileWidth * tileHeight));

            // Update the tilePieceInput with the calculated quantity
            $("#tilePieceInput").val(tilesNeeded);
        }
    });
});

*/

jQuery(document).ready(function ($) {

    // Listen to changes in the squareMeterInput field
    $('#squareMeterInput').on('input', function () {
        // Get the selected dimension from the radio buttons
        var selectedDimension = getSelectedDimension();

        // Calculate the tile quantity based on square meters
        var squareMeters = parseFloat($(this).val());
        if (!isNaN(squareMeters)) {
            var tileQuantity = calculateTileQuantity(squareMeters, selectedDimension);
            $('#tilePieceInput').val(tileQuantity);
        } else {
            // Clear the tile quantity if the input is not a valid number
            $('#tilePieceInput').val('');
        }
    });

    // Listen to changes in the tilePieceInput field
    $('#tilePieceInput').on('input', function () {
        // Get the selected dimension from the radio buttons
        var selectedDimension = getSelectedDimension();

        // Calculate the square meters based on tile quantity
        var tileQuantity = parseFloat($(this).val());
        if (!isNaN(tileQuantity)) {
            var squareMeters = calculateSquareMeters(tileQuantity, selectedDimension);
            $('#squareMeterInput').val(squareMeters);
        } else {
            // Clear the square meter input if the input is not a valid number
            $('#squareMeterInput').val('');
        }
    });

    // Function to get the selected dimension from the radio buttons
    function getSelectedDimension() {
        var selectedVariation = $('.woovr-variation-radio.active').data('id');
        var sizeName = '';
        if (selectedVariation !== 0) {
            sizeName = $('.woovr-variation-radio.active').find('.woovr-variation-name').text();
        }
        return sizeName;
    }

    // Function to calculate tile quantity based on square meters
    function calculateTileQuantity(squareMeters, dimension) {
        // Split the dimension into width and height
        var dimensions = dimension.split('x');
        var width = parseFloat(dimensions[0]) / 1000; // Convert mm to meters
        var height = parseFloat(dimensions[1]) / 1000; // Convert mm to meters

        // Calculate tile quantity
        var tileQuantity = (squareMeters / (width * height)).toFixed(2);
        return tileQuantity;
    }

    // Function to calculate square meters based on tile quantity
    function calculateSquareMeters(tileQuantity, dimension) {
        // Split the dimension into width and height
        var dimensions = dimension.split('x');
        var width = parseFloat(dimensions[0]) / 1000; // Convert mm to meters
        var height = parseFloat(dimensions[1]) / 1000; // Convert mm to meters

        // Calculate square meters
        var squareMeters = (tileQuantity * width * height).toFixed(2);
        return squareMeters;
    }
});







