/**
 * Have a button toggle a class on a target
 *
 * data-target - the target selector ".o-example". Target must be
 *               sibling of button.
 * data-class  - the class that is being toggled on the target
 *
 * Toggles the "is-hidden" class on its own children if it exists, eg:
 * <button class="jsToggle" data-target="#target" data-class="class-to-toggle">
 *   <span>more</span>
 *   <span class="u-hidden">less</span>
 * </button>
 */

import $ from 'cash-dom';
// import $ from 'jquery-slim';

$(".jsToggle").on("click", function(e){
    e.preventDefault();
    var target = $(this).attr("data-target"),
        css = $(this).attr("data-class"),
        children = $(this).children();
    $(target).toggleClass(css);
    if( $(children).hasClass("u-hidden") ) {
        $(children).toggleClass("u-hidden");
    }
});
