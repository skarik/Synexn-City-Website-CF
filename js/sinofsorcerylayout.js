"use strict";

var sinofsorcery = {};

/// @brief Replaces all the CF URLs with the synexn.city URLs.
window.onload = function()
{
    var anchors = document.getElementsByTagName("a");
    for (var i = 0; i < anchors.length; ++i)
    {
        anchors[i].href = anchors[i].href.replace("synexncity.thecomicseries.com", "synexn.city");
    }
}

sinofsorcery.getGutterImage = function(element, rightSide)
{
    const images_right = ["/files/resources/sides/polmc-sider-1.png", "/files/resources/sides/polmc-sider-3.png"];
    const offset_right = ["-2vh", "-10vh"];
    const images_left  = ["/files/resources/sides/polmc-sider-2.png", "/files/resources/sides/polmc-sider-4.png"];
    const offset_left  = ["-2vh", "-16vh"];

    const images_array = rightSide ? images_right : images_left;
    const offset_array = rightSide ? offset_right : offset_left;

    const choiceIndex = Math.floor(Math.random() * images_array.length);

    const imageValue = images_array[choiceIndex];
    const offsetValue = offset_array[choiceIndex];

    element.style.minWidth = "300px";
    if (rightSide) {
        element.style.left = offsetValue;
    }
    else {
        element.style.right = offsetValue;
    }
    element.decoding = "async";
    element.src = imageValue;
    element
        .decode()
        .then(() => {
            element.style.minWidth = "auto";
            element.style.width = "auto";
        });
}
