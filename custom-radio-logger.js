// correct feature but resetting the squareMeterInput Value

/* jQuery(document).ready(function ($) {
    var sizeName = '';
    var squareMeters = 0;
    var originalQtyValue = "";
    var originalSqmValue = "";
    var activeInput = null; // Track the active input

    function updateTileDimensions() {
        var dimensions = sizeName.split('x');
        var tileWidth = parseInt(dimensions[0]) / 1000;
        var tileHeight = parseInt(dimensions[1]) / 1000;

        var tilesNeeded = Math.ceil(squareMeters / (tileWidth * tileHeight));

        $("#tilePieceInput").val(tilesNeeded);

        if (activeInput !== "#tilePieceInput") {
            // Update the quantity input with the calculated tilesNeeded value from squareMeterInput
            updateQuantityInput(squareMeters.toFixed(3));
        }

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
        // Check if tilePieceInput is active, if yes, calculate squareMeterInput based on it
        if (activeInput === "#tilePieceInput") {
            var inputValue = $("#tilePieceInput").val().replace(/[^\d.]/g, '');
            $("#tilePieceInput").val(inputValue);

            var numberOfTiles = parseFloat(inputValue) || 0;

            var dimensions = sizeName.split('x');
            var tileWidth = parseInt(dimensions[0]) / 1000;
            var tileHeight = parseInt(dimensions[1]) / 1000;

            var calculatedSquareMeters = numberOfTiles * tileWidth * tileHeight;

            // Update the squareMeterInput with the calculated value
            $("#squareMeterInput").val(calculatedSquareMeters.toFixed(3));

            // Update the quantity input with the calculated value from squareMeterInput
            updateQuantityInput(calculatedSquareMeters.toFixed(3));
        }
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
            updateTileDimensions();
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
        activeInput = "#squareMeterInput";

        var inputValue = $(this).val().replace(/[^\d]/g, '');
        $(this).val(inputValue);

        squareMeters = parseFloat(inputValue) || 0;

        updateTileDimensions();
    });

    $("#tilePieceInput").on("input", function () {
        activeInput = "#tilePieceInput";
        updateSquareMeters();
    });

    $('#tilePieceInput').on('focus', function () {
        activeInput = "#tilePieceInput";
        originalQtyValue = $(this).val();
        updateSquareMeters();
        $(this).val('');
    });

    $('#tilePieceInput').on('blur', function () {
        var currentValue = $(this).val();

        if (currentValue === '') {
            $(this).val(originalQtyValue);
        }
    });

    $('#squareMeterInput').on('focus', function () {
        activeInput = "#squareMeterInput";
        originalSqmValue = $(this).val();
        $(this).val('');
    });

    $('#squareMeterInput').on('blur', function () {
        var currentValue = $(this).val();

        if (currentValue === '') {
            $(this).val(originalSqmValue);
        }
    });
}); */




// not resetting the squareMeterInput pricing with squareMeterInput value but not pricing quantity imput
jQuery(document).ready(function ($) {
    var sizeName = '';
    var squareMeters = 0;
    var originalQtyValue = "";
    var originalSqmValue = "";
    var activeInput = null; // Track the active input

    function updateTileDimensions() {
        var dimensions = sizeName.split('x');
        var tileWidth = parseInt(dimensions[0]) / 1000;
        var tileHeight = parseInt(dimensions[1]) / 1000;

        var tilesNeeded = Math.ceil(squareMeters / (tileWidth * tileHeight));

        $("#tilePieceInput").val(tilesNeeded);

        if (activeInput !== "#tilePieceInput") {
            // Update the quantity input with the calculated tilesNeeded value from squareMeterInput
            updateQuantityInput(squareMeters.toFixed(3));
        }

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
        // Check if tilePieceInput is active, if yes, don't update squareMeterInput
        if (activeInput !== "#tilePieceInput") {
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
            updateTileDimensions();
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
        activeInput = "#squareMeterInput";

        var inputValue = $(this).val().replace(/[^\d]/g, '');
        $(this).val(inputValue);

        squareMeters = parseFloat(inputValue) || 0;

        updateTileDimensions();
    });

    $("#tilePieceInput").on("input", function () {
        activeInput = "#tilePieceInput";
        updateSquareMeters();
    });

    $("#tilePieceInput").on("input", function () {
        activeInput = "#tilePieceInput";
        updateSquareMeters();

        // Update the quantity input with the value from squareMeterInput
        updateQuantityInput(squareMeters.toFixed(3));
    });

    $('#tilePieceInput').on('focus', function () {
        activeInput = "#tilePieceInput";
        originalQtyValue = $(this).val();
        updateSquareMeters();
        $(this).val('');
    });

    $('#tilePieceInput').on('blur', function () {
        var currentValue = $(this).val();

        if (currentValue === '') {
            $(this).val(originalQtyValue);
        }
    });

    $('#squareMeterInput').on('focus', function () {
        activeInput = "#squareMeterInput";
        originalSqmValue = $(this).val();
        $(this).val('');
    });

    $('#squareMeterInput').on('blur', function () {
        var currentValue = $(this).val();

        if (currentValue === '') {
            $(this).val(originalSqmValue);
        }
    });
});
