document.addEventListener("DOMContentLoaded", function () {
    const planhubLink = document.querySelector("a[href*='https://www.planhub.ca']");
    let elWidgets = document.querySelectorAll(".planhub-mobile-plans-widget");
    
    elWidgets.forEach(elWidget => {
        if (linkIsUpAndFollows(planhubLink)) {
            let newIframe = document.createElement('iframe');
            let dataWidget = elWidget.getAttribute("data-widget");
            let url = "https://www.planhub.ca/widget/mobile-plans?uid=" + dataWidget;  
            
            //mettre un base sur la page pour specifier serveur de base <base href="https://your.website.com/">
            
            // Fetch to verify the number of offers and adapt the size of the iframe
            fetch(url)
                .then(response => {
                    if (response.ok) {
                        return response.text();
                    } else {
                        throw new Error('Error: Network response was not ok');
                    }
                })
                .then(data => {
                    let widgetHeight = calculateWidgetHeight(data);
                
                    // Set the iframe srcdoc attribute with the fetched HTML content
                    newIframe.srcdoc = data;
                
                    newIframe.className = "widgetIframeElement";
                    newIframe.style = `width: 100%; border: 0; margin: 0 auto; display: block; height: ${widgetHeight}px`;
                    newIframe.setAttribute("data-widget", dataWidget);
                                    
                    elWidget.prepend(newIframe);
                    elWidget.removeChild(elWidget.lastElementChild);
                })
                .catch(error => {
                    console.error('Error:', error);
                });

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

const calculateWidgetHeight = (data) => {
    let widgetHeight = 310;

    // Transformation de la reponse
    const parser = new DOMParser();
    const doc = parser.parseFromString(data, "text/html");

    console.log(doc)
    // Comptage du nombre d'offres, en multiple de 3
    const count = doc.getElementsByClassName("proposal_plans__box").length;
    if (count > 3) {
        widgetHeight += Math.floor((count - 1) / 3) * 210;
    }

    return widgetHeight;
}
