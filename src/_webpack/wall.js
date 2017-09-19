/**
 * wall.js is a toggle for the .c-wall component
 * - Use a button like <button class="c-btn jsWallBtn" data-target="#wall"> to
 *   toggle the wall.
 * - html, body { height: 100%; } is required
 * - .u-noscroll { overflow: hidden; } is required
 *
 * @author: Lukas Hermann
 */

import $ from "cash-dom";

var allowScrolling = true;

/*
 * show/hide wall on button press
 */
$(".jsWallBtn").on("click", function(e) {
    e.stopPropagation();
    toggleWall($(this).attr("data-target"));
});

/*
 * hide wall on any click inside
 */
$(".jsWall").on("click", function(e) {
    console.log(this);
    toggleWall(this);
});

/*
 * helper function toggles classes
 */
function toggleWall(target) {
    $(target).toggleClass("is-visible");
    $(document.body).toggleClass("u-noscroll");
    allowScrolling = !allowScrolling;
}

/*
 * Enable/Disable scrolling on #siteWrapper when mobile nav is open
 * on iPhone/iPad’s Safari
 */
document.body.addEventListener("touchmove", function(e) {
    if (allowScrolling) {
        return true; // Enable scrolling.
    } else {
        e.preventDefault(); // Disable scrolling.
    }
});
