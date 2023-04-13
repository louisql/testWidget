document.addEventListener("DOMContentLoaded", function () {
    const planhubLink = document.querySelector("a[href*='https://www.planhub.ca']");

    let elWidgets = document.querySelectorAll(".planhub-mobile-plans-widget");
    
    elWidgets.forEach(elWidget => {
        if (linkIsUpAndFollows(planhubLink)) {
            let newIframe = document.createElement('iframe');
            let dataWidget = elWidget.getAttribute("data-widget");
            let url = "https://www.planhub.ca/widget/mobile-plans?uid=" + dataWidget;
            
            //Realisation d'une requete AJAX pour verifier le nbre d'offres et adapter la taille de l'iframe
            const xhr = new XMLHttpRequest();
            xhr.open('GET', url);
            xhr.onload = function () {
                let widgetHeight = calculateWidgetHeight(xhr);

                // newIframe.src = "http://localhost:85/app_dev.php/widget/mobile-plans?uid="+dataWidget;
                newIframe.src = url;
                newIframe.className = "widgetIframeElement";
                newIframe.style = `width: 100%;border: 0;margin: 0 auto;display: block; height: ${widgetHeight}px`;
                newIframe.setAttribute("data-widget", dataWidget);
                
                elWidget.prepend(newIframe);
                elWidget.removeChild(elWidget.lastElementChild);
            };
            xhr.send();

        } else {
            let errorMessage = document.createElement('H3');
            errorMessage.innerHTML = 'Error: Element missing';
            elWidget.prepend(errorMessage);
        }
    });

});


const linkIsUpAndFollows = (link) => {
    return link && !link.getAttribute('rel')?.match(/nofollow/i);
} 

const calculateWidgetHeight = (xhr) => {
    let widgetHeight = 370;

    const response = xhr.responseText;
                    
    // Transformation de la reponse
    const parser = new DOMParser();
    const doc = parser.parseFromString(response, "text/html");

    // Comptage du nombre d'offres, en multiple de 3
    const count = doc.getElementsByClassName("proposal_plans__box").length;
    if (count > 3) {
        widgetHeight += Math.floor((count - 1) / 3) * 300;
    }

    return widgetHeight;
}