    jQuery(document).ready(function ($) {

        $(".warning").hide();
        // Simulate click on the first radio button and trigger its change event
        var $firstRadio = $('input[type="radio"]').filter(':visible:first');
        $firstRadio.prop('checked', true).trigger('click').trigger('change');



        var sizeName = '';
        var originalQtyValue = "";
        var originalSqmValue = "";

        function updateTileDimensions(squareMeters) {
            var dimensions = sizeName.split('x');
            var tileWidth = parseInt(dimensions[0]) / 1000;
            var tileHeight = parseInt(dimensions[1]) / 1000;

            var tilesNeeded = Math.ceil(squareMeters / (tileWidth * tileHeight));

            $("#tilePieceInput").val(tilesNeeded);

            // Update the quantity input with the calculated tilesNeeded value from squareMeterInput
            updateQuantityInput(squareMeters.toFixed(3));

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

            if (sizeName.includes("Full Size Sample") || sizeName.includes("Free Sample")) {
                // For Free Sample or Full Size Sample, update only the quantity input
                updateQuantityInput(numberOfTiles.toFixed(3));
            } else {
                var dimensions = sizeName.split('x');
                var tileWidth = parseInt(dimensions[0]) / 1000;
                var tileHeight = parseInt(dimensions[1]) / 1000;

                var calculatedSquareMeters = numberOfTiles * tileWidth * tileHeight;

                // Update both the squareMeterInput and the quantity input with the calculated value
                $("#squareMeterInput").val(calculatedSquareMeters.toFixed(3));
                updateQuantityInput(calculatedSquareMeters.toFixed(3));
            }

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

            if (sizeName.includes("Free Sample") || sizeName.includes("Full Size Sample")) {
                $("#squareMeterInput").prop('disabled', true);
                $("#tilePieceInput").prop('disabled', false); // Enable tilePieceInput

                // Update only tilePieceInput and quantity input based on squareMeterInput value
                updateTileDimensions(parseFloat($("#squareMeterInput").val()));

                // Hide the warning span when Free Sample is selected
                $(".warning").hide();
            } else {
                $("#squareMeterInput, #tilePieceInput").prop('disabled', false);
                updateTileDimensions(parseFloat($("#squareMeterInput").val()));
            }
        }


        function calculateOnPageLoad() {
            // Simulate click and change event on the first radio button
            $firstRadio.prop('checked', true).trigger('click').trigger('change');
        }

        // Simulate initial calculations after a short delay
        setTimeout(calculateOnPageLoad, 100);


        $('.woovr-variation-radio').on('click', function () {
            handleRadioClick($(this));
        });

        $("#squareMeterInput").on("input", function () {
            var inputValue = $(this).val().replace(/[^\d.]/g, '');
            $(this).val(inputValue);

            var squareMeters = parseFloat(inputValue) || 0;

            updateTileDimensions(squareMeters);
        });


        $("#tilePieceInput").on("input", function () {
            updateSquareMeters();

            // Show/hide warning span based on input value and Free Sample radio selection
            var currentValue = $(this).val();
            if (sizeName.includes("Free Sample") && currentValue > 4) {
                $(".warning").show();
            } else {
                $(".warning").hide();
            }
        });


        $('#tilePieceInput').on('focus', function () {
            originalQtyValue = $(this).val();
            $(this).val('');

            // Calculate real square meter value when the user focuses on tilePieceInput
            var numberOfTiles = parseFloat(originalQtyValue) || 0;
            var dimensions = sizeName.split('x');
            var tileWidth = parseInt(dimensions[0]) / 1000;
            var tileHeight = parseInt(dimensions[1]) / 1000;

            // Check if tileWidth and tileHeight are valid numbers
            if (!isNaN(tileWidth) && !isNaN(tileHeight)) {
                var calculatedSquareMeters = numberOfTiles * tileWidth * tileHeight;

                // Update squareMeterInput with the calculated value
                $("#squareMeterInput").val(calculatedSquareMeters.toFixed(3));
                updateQuantityInput(calculatedSquareMeters.toFixed(3));

                setTimeout(function () {
                    $("input[title='Qty']").trigger('change');
                }, 100);
            }
        });


        $('#tilePieceInput').on('blur', function () {
            var currentValue = $(this).val();

            if (currentValue === '') {
                $(this).val(originalQtyValue);
            }
        });

        $('#squareMeterInput').on('focus', function () {
            originalSqmValue = $(this).val();
            $(this).val('');
        });

        $('#squareMeterInput').on('blur', function () {
            var currentValue = $(this).val();

            if (currentValue === '') {
                $(this).val(originalSqmValue);
            } else {
                originalQtyValue = $('#tilePieceInput').val();
                var numberOfTiles = parseFloat(originalQtyValue) || 0;
                var dimensions = sizeName.split('x');
                var tileWidth = parseInt(dimensions[0]) / 1000;
                var tileHeight = parseInt(dimensions[1]) / 1000;

                var calculatedSquareMeters = numberOfTiles * tileWidth * tileHeight;

                $(this).val(calculatedSquareMeters.toFixed(3));
                updateQuantityInput(calculatedSquareMeters.toFixed(3));

                setTimeout(function () {
                    $("input[title='Qty']").trigger('change');
                }, 100);

            }
        });


    });