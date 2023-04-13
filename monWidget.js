document.addEventListener("DOMContentLoaded", function () {
    const planhubLink = document.querySelector("a[href*='https://www.planhub.ca']");

    let elWidgets = document.querySelectorAll(".planhub-mobile-plans-widget");

    elWidgets.forEach(elWidget => {
        if (linkIsUpAndFollows(planhubLink)) {
            let newIframe = document.createElement('iframe');
            let dataWidget = elWidget.getAttribute("data-widget");
            let url = "https://www.planhub.ca/widget/mobile-plans?uid=" + dataWidget;
            let widgetHeight = 370;

            const xhr = new XMLHttpRequest();
            xhr.open('GET', url);
            xhr.onload = function () {
                if (xhr.status === 200) {
                    // Recuperation de la reponse
                    const response = xhr.responseText;
                    console.log(response);
                    // Transformation de la reponse
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(xhr.responseText, "text/html");

                    // Comptage du nombre d'offres, en multiple de 3
                    const count = doc.getElementsByClassName("proposal_plans__box").length;
                    if (count > 3) {
                        widgetHeight += Math.floor((count - 1) / 3) * 300;
                      }
                    console.log(count);
                } else {
                    // Gestion des Erreurs
                    console.error('Request failed. Status code: ' + xhr.status);
                }
            };
            xhr.send();


            // newIframe.src = "http://localhost:85/app_dev.php/widget/mobile-plans?uid="+dataWidget;
            newIframe.src = url;
            newIframe.className = "widgetIframeElement";
            newIframe.style = `width: 100%;border: 0;margin: 0 auto;display: block; height: ${widgetHeight}px`;
            newIframe.setAttribute("data-widget", dataWidget);
            elWidget.prepend(newIframe);
            elWidget.removeChild(elWidget.lastElementChild);


        } else {
            let errorMessage = document.createElement('H3');
            errorMessage.innerHTML = 'Error: Element missing';
            elWidget.prepend(errorMessage);
        }
    });

});

function linkIsUpAndFollows(link) {
    return link && !link.getAttribute('rel')?.match(/nofollow/i);
}
