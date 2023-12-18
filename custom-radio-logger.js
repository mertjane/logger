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

     // Attach input event listener to squareMeterInput
     $("#squareMeterInput").on("input", function(){
        // Remove decimal part if entered
        $(this).val(parseInt($(this).val()));
        
        // Get the entered square meters
        var squareMeters = $(this).val();

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
            var tileWidth = parseInt(dimensions[0]);
            var tileHeight = parseInt(dimensions[1]);

            // Calculate the number of tiles needed
            var tilesNeeded = Math.ceil((squareMeters * 1000000) / (tileWidth * tileHeight));

            // Update the tilePieceInput with the calculated quantity
            $("#tilePieceInput").val(tilesNeeded);
        }
    });
});



