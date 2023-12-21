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

jQuery(document).ready(function ($) {
    var sizeName = '';
    var squareMeters = 0;
    var originalQtyValue = "";
    var originalSqmValue = "";

    function updateTileDimensions() {
        var dimensions = sizeName.split('x');
        var tileWidth = parseInt(dimensions[0]) / 1000;
        var tileHeight = parseInt(dimensions[1]) / 1000;

        // var tilesNeeded = (squareMeters / (tileWidth * tileHeight)).toFixed();
        var tilesNeeded = Math.ceil(squareMeters / (tileWidth * tileHeight));

        $("#tilePieceInput").val(tilesNeeded);

        // Update the quantity input with the calculated tilesNeeded value
        updateQuantityInput(tilesNeeded);

        // Trigger change event on the quantity input with a delay
        setTimeout(function () {
            $("input[title='Qty']").trigger('change');
        }, 100);
    }

    function updateQuantityInput(value) {
        // Update the quantity input with the provided value
        $("input[name='quantity']").val(value);
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

        // Trigger change event on the quantity input with a delay
        setTimeout(function () {
            $("input[title='Qty']").trigger('change');
        }, 100);
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

    // Trigger the handleRadioClick function for the checked radio button after a short delay
    setTimeout(function () {
        var $checkedRadio = $('.woovr-variation-radio:checked');
        if ($checkedRadio.length > 0) {
            handleRadioClick($checkedRadio);
        }
    }, 100);

    $('input[type="radio"]').filter(':visible:first').prop('checked', false);

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

    $("#tilePieceInput").on("input", function () {
        updateSquareMeters();

        // Update the quantity input with the value from tilePieceInput
        updateQuantityInput($(this).val());
    });

    // Focus event: Clear the input value
    // $('#tilePieceInput').on('focus', function () {
    //     originalQtyValue = $(this).val(); // Save the original value
    //     $(this).val(''); // Clear the input value
    // });

    $('#tilePieceInput').on('focus', function () {
        originalQtyValue = $(this).val(); // Save the original value


        // Update the squareMeterInput with the real square meter calculation
        updateSquareMeters();

        $(this).val(''); // Clear the input value
        // Optionally, you may want to update the tilePieceInput based on square meters again
        // This is to ensure that if the user clicks on tilePieceInput again, the tilePieceInput reflects the real square meter calculation
        // updateTileDimensions();
    });

    // Blur event: Restore the original value on click outside the input
    $('#tilePieceInput').on('blur', function () {
        var currentValue = $(this).val();

        // Check if the current value is empty
        if (currentValue === '') {
            $(this).val(originalQtyValue); // Restore the original value
        }
    });

    // Focus event: Clear the input value
    $('#squareMeterInput').on('focus', function () {
        originalSqmValue = $(this).val(); // Save the original value
        $(this).val(''); // Clear the input value
    });

    // Blur event: Restore the original value on click outside the input
    $('#squareMeterInput').on('blur', function () {
        var currentValue = $(this).val();

        // Check if the current value is empty
        if (currentValue === '') {
            $(this).val(originalSqmValue); // Restore the original value
        }
    });
});










