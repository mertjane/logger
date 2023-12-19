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
            var tileWidth = parseInt(dimensions[0]) / 1000; // Set a default value of 1 if not a valid number
            var tileHeight = parseInt(dimensions[1]) / 1000; // Set a default value of 1 if not a valid number

            // Calculate the number of tiles needed
            
            var tilesNeeded = (squareMeters / (tileWidth * tileHeight)).toFixed();

            // Update the tilePieceInput with the calculated quantity
            $("#tilePieceInput").val(tilesNeeded);
        }
    });
});
*/

/*
jQuery(document).ready(function ($) {
    var sizeName = '';
    var squareMeters = 0; // Declare squareMeters outside the event handler

    function updateTileDimensions() {
        var dimensions = sizeName.split('x');
        var tileWidth = parseInt(dimensions[0]) / 1000;
        var tileHeight = parseInt(dimensions[1]) / 1000;

        var tilesNeeded = (squareMeters / (tileWidth * tileHeight)).toFixed();

        $("#tilePieceInput").val(tilesNeeded);
    }

    $("#squareMeterInput").on("input", function () {
        var inputValue = $(this).val().replace(/[^\d]/g, '');
        $(this).val(inputValue);

        squareMeters = parseInt(inputValue) || 0; // Update squareMeters here

        updateTileDimensions();
    });

    $('.woovr-variation-radio').on('click', function () {
        var selectedVariation = $(this).data('id');

        if (selectedVariation !== 0) {
            sizeName = $(this).find('.woovr-variation-name').text();
        }

        // Check if sizeName includes "Full Size Sample" or "Free Sample" and disable inputs
        if (sizeName.includes("Full Size Sample") || sizeName.includes("Free Sample")) {
            $("#squareMeterInput, #tilePieceInput").prop('disabled', true);
        } else {
            $("#squareMeterInput, #tilePieceInput").prop('disabled', false);
            updateTileDimensions();
        }
        // updateTileDimensions();
    });
});
*/

jQuery(document).ready(function ($) {
    var sizeName = '';
    var squareMeters = 0;

    function updateTileDimensions() {
        var dimensions = sizeName.split('x');
        var tileWidth = parseInt(dimensions[0]) / 1000;
        var tileHeight = parseInt(dimensions[1]) / 1000;

        var tilesNeeded = (squareMeters / (tileWidth * tileHeight)).toFixed();

        $("#tilePieceInput").val(tilesNeeded);
    }

    function updateSquareMeters() {
        var inputValue = $("#tilePieceInput").val().replace(/[^\d.]/g, '');
        $("#tilePieceInput").val(inputValue);

        var numberOfTiles = parseFloat(inputValue) || 0;

        var dimensions = sizeName.split('x');
        var tileWidth = parseInt(dimensions[0]) / 1000;
        var tileHeight = parseInt(dimensions[1]) / 1000;

        var calculatedSquareMeters = numberOfTiles * tileWidth * tileHeight;
        $("#squareMeterInput").val(calculatedSquareMeters.toFixed(3));
    }


    function handleRadioClick($radio) {
        var selectedVariation = $radio.data('id');

        if (selectedVariation !== 0) {
            sizeName = $radio.find('.woovr-variation-name').text();
        }

        // Check if sizeName includes "Full Size Sample" or "Free Sample" and disable inputs
        if (sizeName.includes("Full Size Sample") || sizeName.includes("Free Sample")) {
            $("#squareMeterInput, #tilePieceInput").prop('disabled', true);
        } else {
            $("#squareMeterInput, #tilePieceInput").prop('disabled', false);
            updateTileDimensions();
        }
    }

    // Trigger the calculation on page load
    // var $selectedRadio = $('.woovr-variation-radio:checked');
    // if ($selectedRadio.length > 0) {
    //    handleRadioClick($selectedRadio);
    // }

    // Get the initially checked radio button on page load
    var $checkedRadio = $('.woovr-variation-radio:checked');

    // If a radio button is checked, call handleRadioClick
    if ($checkedRadio.length > 0) {
        handleRadioClick($checkedRadio);
    }


    // Listen for radio button clicks
    $('.woovr-variation-radio').on('click', function () {
        handleRadioClick($(this));
    });


    $("#squareMeterInput").on("input", function () {
        var inputValue = $(this).val().replace(/[^\d]/g, '');
        $(this).val(inputValue);

        squareMeters = parseInt(inputValue) || 0;
        
        updateTileDimensions();
    });
    
    $("#tilePieceInput").on("input", function () {
        updateSquareMeters();
    });
});










