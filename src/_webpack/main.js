import "./countdown.js";
import "./animation.js";
import "./toggle.js";
import "./wall.js";
import "./spambotscare.js";
import Cookies from "cookies-js";

/*
 * Trigger CTA
 * triggers the CTA when user has scrolled down to #program
 * sets a cookie afterwards so it happens only once
 */
var cookie = Cookies.get("_cta_triggered");
var ctaTriggered = cookie ? true : false;

// Register event handler
if (!ctaTriggered) {
    $(document).on("scroll", triggerCtaHandler);
}

// Event handler
function triggerCtaHandler() {
    if ($(this).scrollTop() >= $("#program").position().top) {
        triggerCTA();
    }
}

// Trigger function
function triggerCTA() {
    ctaTriggered = true;
    $("#newsletterModal").addClass("is-visible");
    Cookies.set("_cta_triggered", "true", { expires: 2592000 });
    $(document).off("scroll", triggerCtaHandler);
}
