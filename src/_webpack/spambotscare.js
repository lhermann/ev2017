import $ from 'cash-dom';

/*!
 * spambotscare v1.0.0
 * @author: Lukas Hermann <lukas@codethink.de>
 *
 * Use with the following html-tag:
 * <noscript data-defuscate data-name="lukas" data-domain="codethink.de"><em>Diese E-Mail-Adresse ist durch JavaScript geschützt</em></noscript>
 */
function spamrep() { this.href=this.href.replace(/spambotscare/,'') }
(function() {
    var spam = $("[data-defuscate]");
    spam.each(function(e){
        var n = $(this).attr("data-name"),
            d = $(this).attr("data-domain"),
            c = $(this).attr("data-class"),
            i = $(this).attr("data-icon");
        var content = n+"<span style=\"display: none;\">spambotscare</span>"+"@"+d;
        if(i) {
            content = "<span class=\"" + i + "\"></span>" + " " + content;
        }
        var nospam = "<a class=\""+c+"\" data-sbs href=\"mailto"+":"+n+"spambotscare@"+d+"\">"+content+"</a>";
        $(this).after( nospam );
        $(this).remove();
    });
    $("body").on( 'click', "[data-sbs]", spamrep );
    $("body").on( 'contextmenu', "[data-sbs]", spamrep );
})();
