jQuery(document).ready(function ($) {
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

        var dimensions = sizeName.split('x');
        var tileWidth = parseInt(dimensions[0]) / 1000;
        var tileHeight = parseInt(dimensions[1]) / 1000;

        var calculatedSquareMeters = numberOfTiles * tileWidth * tileHeight;

        // Update both the squareMeterInput and the quantity input with the calculated value
        $("#squareMeterInput").val(calculatedSquareMeters.toFixed(3));
        updateQuantityInput(calculatedSquareMeters.toFixed(3));

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

        if (sizeName.includes("Full Size Sample") || sizeName.includes("Free Sample")) {
            $("#squareMeterInput, #tilePieceInput").prop('disabled', true);
        } else {
            $("#squareMeterInput, #tilePieceInput").prop('disabled', false);
            updateTileDimensions(parseFloat($("#squareMeterInput").val()));
        }
    }

    setTimeout(function () {
        var $checkedRadio = $('.woovr-variation-radio:checked');
        if ($checkedRadio.length > 0) {
            handleRadioClick($checkedRadio);
        }
    }, 100);

    $('input[type="radio"]').filter(':visible:first').prop('checked', false);

    $('.woovr-variation-radio').on('click', function () {
        handleRadioClick($(this));
    });

    $("#squareMeterInput").on("input", function () {
        var inputValue = $(this).val().replace(/[^\d]/g, '');
        $(this).val(inputValue);

        var squareMeters = parseFloat(inputValue) || 0;

        updateTileDimensions(squareMeters);
    });

    $("#tilePieceInput").on("input", function () {
        updateSquareMeters();
    });

    $('#tilePieceInput').on('focus', function () {
        originalQtyValue = $(this).val();
    });

    $('#tilePieceInput').on('blur', function () {
        var currentValue = $(this).val();

        if (currentValue === '') {
            $(this).val(originalQtyValue);
        }
    });

    $('#squareMeterInput').on('focus', function () {
        originalSqmValue = $(this).val();
    });

    $('#squareMeterInput').on('blur', function () {
        var currentValue = $(this).val();

        if (currentValue === '') {
            $(this).val(originalSqmValue);
        }
    });
});






