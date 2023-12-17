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

// Shortcode function to display the radio button
function custom_radio_logger_shortcode() {
    ob_start(); ?>

    <?php
    $output = ob_get_clean();
    return $output;
}

// Register the shortcode
add_shortcode('custom_radio_logger', 'custom_radio_logger_shortcode');