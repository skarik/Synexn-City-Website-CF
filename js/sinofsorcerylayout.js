// @ts-check
"use strict";

var sinofsorcery = {
    chapterid: 0,
    chapterstyle: "synexn",
    faviconfx: {
        ctx: undefined,
        canvas: undefined,
        favicon: undefined,
        m_iconBg: new Image(),
        m_iconGear: new Image()
    }
};

/*** @brief Replaces all the CF URLs with the synexn.city URLs. */
window.addEventListener('load', () =>
    {
        var anchors = document.getElementsByTagName("a");
        for (var i = 0; i < anchors.length; ++i)
        {
            anchors[i].href = anchors[i].href.replace("synexncity.thecomicseries.com", "synexn.city");
        }
    });

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

    // Run common
    this.faviconfx.init();
}

/*** @brief When starting up all other pages, loads the chapter style from cookies or adds listener for it **/
sinofsorcery.onStartOtherPage = function()
{
    this.chapterid = localStorage.getItem("chapterid") ?? 0;
    this.chapterstyle = localStorage.getItem("chapterstyle") ?? "synexn";

    let updateMainStyle = function()
    {
        document.documentElement.className = sinofsorcery.chapterstyle;
    };
    updateMainStyle();

    // Run common
    this.faviconfx.init();
}

/*** @brief Sets up the callback & elements for the animated favicon */
sinofsorcery.faviconfx.init = function()
{
    // set up images
    this.m_iconBg.src = "/files/resources/favicon2-bg.png";
    this.m_iconGear.src = "/files/resources/favicon2-gear.png";

    window.addEventListener('load', ()=> {
        this.canvas = document.querySelector('canvas'),
        this.ctx = this.canvas.getContext('2d');
        if (!!this.ctx) {
            this.favicon = document.querySelector('link[rel*="icon"]');
            setInterval(this.drawFavicon.bind(this), 100); 
        }
    });
}
/*** @brief Redraws the favicon, converts it to data string, then applies it to favicon. */
sinofsorcery.faviconfx.drawFavicon = function()
{
    var l_date = new Date();
    var l_timeNowMilli = l_date.getTime(); 
    var l_timeNow = (l_timeNowMilli / 1000.0) % 1000.0;

    var ctx = this.ctx;
    ctx.clearRect(0, 0, 32, 32);

    ctx.save();
    ctx.drawImage(this.m_iconBg, 0, 0);
    ctx.translate(16, 16);
    ctx.rotate(-l_timeNow * (Math.PI / 24.0));
    ctx.translate(-16, -16);
    ctx.drawImage(this.m_iconGear, 0, 0);
    ctx.restore();

    this.favicon.href = this.canvas.toDataURL('image/png');
}