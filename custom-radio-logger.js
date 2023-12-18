jQuery(document).ready(function ($) {

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


