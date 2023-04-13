document.addEventListener("DOMContentLoaded", function () {
    const planhubLink = document.querySelector("a[href*='https://www.planhub.ca']");

    let elWidgets = document.querySelectorAll(".planhub-mobile-plans-widget");

    elWidgets.forEach(elWidget => {
        if (linkIsUpAndFollows(planhubLink)) {
            let newIframe = document.createElement('iframe');
            let dataWidget = elWidget.getAttribute("data-widget");
            // newIframe.src = "http://localhost:85/app_dev.php/widget/mobile-plans?uid="+dataWidget;
            newIframe.src = "https://www.planhub.ca/widget/mobile-plans?uid="+dataWidget;
            newIframe.className = "widgetIframeElement";
            newIframe.style = "width: 100%;border: 0;margin: 0 auto;display: block; height: 100%";
            newIframe.setAttribute("data-widget", dataWidget);
            elWidget.prepend(newIframe);
            elWidget.removeChild(elWidget.lastElementChild);
        } else {
            let errorMessage = document.createElement('H3');
            errorMessage.innerHTML = 'Error: Element missing';
            elWidget.prepend(errorMessage);
        }
    });

    if (linkIsUpAndFollows(planhubLink)) {
        let widgetIframeEL = document.querySelectorAll('.widgetIframeElement');
        console.log(widgetIframeEL)
        widgetIframeEL.forEach(widgetIframe => {
            widgetIframe.addEventListener('load', function() {
                // this.height = "";
                this.height = this.contentWindow.document.body.scrollHeight + "px";
            })
        });
    }
});

function linkIsUpAndFollows(link) {
    return link && !link.getAttribute('rel')?.match(/nofollow/i);
}
