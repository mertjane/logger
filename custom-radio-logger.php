<?php
/*
Plugin Name: Custom Radio Logger
Description: Logs a message to the console when a specific radio button is selected.
Version: 1.0
Author: Your Name
*/

function add_scripts() {
    // Enqueue the JavaScript file
    wp_enqueue_script('custom-radio-logger', plugin_dir_url(__FILE__) . 'custom-radio-logger.js', array('jquery'), '1.0', true);
}

// Hook the function to the wp_enqueue_scripts action
add_action('wp_enqueue_scripts', 'add_scripts');



// Register the shortcode
function custom_radio_logger_shortcode()
{
    ob_start();
    ?>
    <div style="display: flex;">
        <div style="display: flex; flex-direction: column; gap: 4px;">
            <label style="align-self: center;font-weight: 600;" for="squareMeterInput">m²</label>
            <input style="height: 40px; width: 120px;" class="value" type="number" id="squareMeterInput" placeholder="m²">
        </div>
        <button style="height: 44px; width: 40px;"><i class="fa">&#xf362;</i></button>
        <div style="display: flex; flex-direction: column; gap: 4px;">
            <label style="align-self: center;font-weight: 600;" for="tilePieceInput">Piece</label>
            <input style="height: 40px; width: 120px;" class="value" oninput="this.value=(parseInt(this.value)||0)" type="number" id="tilePieceInput" placeholder="Piece">
            <span style="font-size: 9px;color: red;" class="warning">The maximum allowed quantity is 4</span>
        </div>
    </div>
    <?php
    return ob_get_clean(); 
}

add_shortcode('custom_radio_logger', 'custom_radio_logger_shortcode');
?>