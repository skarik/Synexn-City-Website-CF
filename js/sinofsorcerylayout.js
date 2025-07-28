// @ts-check
"use strict";

var sinofsorcery = {
    chapterid: 0,
    chapterstyle: "synexn"
};

/*** @brief Replaces all the CF URLs with the synexn.city URLs. */
window.onload = function()
{
    var anchors = document.getElementsByTagName("a");
    for (var i = 0; i < anchors.length; ++i)
    {
        anchors[i].href = anchors[i].href.replace("synexncity.thecomicseries.com", "synexn.city");
    }
}

/*** 
 * @brief Gets a random gutter image for the given element and side
 * @param {HTMLImageElement} element
 * @param {Boolean} rightSide
 */
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

/*** 
 * @brief When starting up the title page, sets the chapter style or adds listener for it
 * @param {Number} chapterId - Chapter ID from comicfury internals
 * @param {String} chapterStyle - Chapter style we want to default to and initialize with
**/
sinofsorcery.onStartComicPage = function(chapterId, chapterStyle)
{
    this.chapterid = chapterId;
    this.chapterstyle = chapterStyle;

    let saveMainStyle = function()
    {
        let rawClassname = document.documentElement.className;
        let newStyle = rawClassname.trim();
        if (!newStyle.includes(sinofsorcery.chapterstyle))
        {
            sinofsorcery.chapterstyle = newStyle;
        }
        localStorage.setItem("chapterid", sinofsorcery.chapterid.toString());
        localStorage.setItem("chapterstyle", sinofsorcery.chapterstyle);
    };
    window.addEventListener('load', saveMainStyle);
}

/*** @brief When starting up all other pages, loads the chapter style from cookies or adds listener for it **/
sinofsorcery.onLoadOtherPage = function()
{
    this.chapterid = localStorage.getItem("chapterid") ?? 0;
    this.chapterstyle = localStorage.getItem("chapterstyle") ?? "synexn";

    let updateMainStyle = function()
    {
        document.documentElement.className = sinofsorcery.chapterstyle;
    };
    window.addEventListener('load', updateMainStyle);
}