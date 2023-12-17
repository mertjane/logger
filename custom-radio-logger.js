jQuery(document).ready(function($) {
    // Wait for the DOM to be ready
    $(document).on('change', 'input[name="woovr_variation_18837"]', function() {
        // Check if the radio button is checked
        if ($(this).is(':checked')) {
            // Log a message to the console
            console.log('The radio button is selected!');
        }
    });
});
