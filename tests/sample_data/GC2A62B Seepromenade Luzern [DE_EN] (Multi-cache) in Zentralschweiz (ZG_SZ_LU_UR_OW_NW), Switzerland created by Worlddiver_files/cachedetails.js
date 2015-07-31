var MAX_WIDTH = 670; //Should match css .UserSuppliedContent max-width
var ResizeFlag = false;

// Function to resize objects to MAX_WIDTH:
function resizeObject(e) {
    $(e).each(function () {
        if ($(this).outerWidth() > MAX_WIDTH) {
            ResizeFlag = true;
            $(this).removeAttr("width");
            $(this).css("width", MAX_WIDTH + "px");
            $(this).removeAttr("height");
            $(this).css("height", "inherit");
            AddImageResize($(this));
        }
    });
}

function AddImageResize(e) {
    if ($(e).is("img")) {
        $(e).click(function () {
            $.fancybox({
                href: this.src,
                titleShow: false
            });
        });
        $(e).addClass("Pointer");
    }
}

// Function to remove the sizing of an object:
function removeSizing(e) {
    $(e).each(function () {
        $(this).removeAttr("width");
        $(this).css("width", "inherit");
    });
}

function getTableWidth(e, w) {
    if ($(e).hasClass("InsideTable")) {
        parentWidth = $(e).closest("td").outerWidth();
        var PaddingWidth = ($(e).closest("td").css("padding-left").replace("px", "") * 2);
        return parentWidth - (PaddingWidth);
    } else {
        return w;  //not in a table
    }
}

// Function to scale an object:
function scaleObject(e) {
    $(e).each(function () {
        var maxWidth = MAX_WIDTH;
        maxWidth = getTableWidth($(this), maxWidth);
        var objWidth = $(this).width();
        var objHeight = $(this).height();
        if (objWidth > maxWidth) {
            var x = (objHeight * maxWidth) / objWidth;
            if (!x) { x = "inherit"; }
            $(this).width(maxWidth);
            $(this).height(x);
            $(this).css("width", maxWidth);
            $(this).css("height", x);
            AddImageResize($(this));
        }
    });
}

function ResizeTableContent() {
    if (ResizeFlag) {
        removeSizing(".UserSuppliedContent td");
        $(".UserSuppliedContent table").css("table-layout", "fixed"); // item is contained in a table - force table to size
        scaleObject(".UserSuppliedContent img");
        $(".UserSuppliedContent table").css("table-layout", "auto"); // set parent table back to prevent broken layouts 
    }
}

$(document).ready(function () {
    $(".UserSuppliedContent table").each(function () {
        $(this).css("border-spacing", $(this).attr("cellSpacing") + "px"); //restore user cellspacing
    });
    $(".UserSuppliedContent table td").each(function () {
        $(this).css("padding", $(this).parents("table").attr("cellPadding") + "px"); //restore user cellpadding 
        $(this).children().css("max-width", MAX_WIDTH); //webkit padding fix
    });
    resizeObject(".UserSuppliedContent table, .UserSuppliedContent img,  .UserSuppliedContent div");
    $(".UserSuppliedContent td img").addClass("InsideTable");
    ResizeTableContent();
});

$(window).bind("load", function () {
    //Catch late loading images
    ResizeFlag = false;
    resizeObject(".UserSuppliedContent table, .UserSuppliedContent img");
    ResizeTableContent();
});