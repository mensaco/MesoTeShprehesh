[...document.querySelectorAll("figure")].forEach(f => {

    f.addEventListener("click", (e) => {
        var tn = e.target;
        while(tn.tagName != "FIGURE") {
            tn = tn.parentElement
            if(tn.tagName == "BODY"){
                break;
            }
        }

        if(tn.tagName == "FIGURE"){
            tn.parentElement.removeChild(tn)
        }

        

    })

});



const cards = []

for (const key in Tekstet) {
    if (Object.hasOwnProperty.call(Tekstet, key)) {
        const text = Tekstet[key].text || "Kërkojmë ndjesë! Për këtë fotografi ende nuk kemi shkruar përshkrimin. Do të mundohemi ta shtojmë sa më shpejt që të jetë e mundur.";
        cards.push(card
                            .replace(/\{key\}/g,key)
                            .replace(/\{text\}/g,text))

        
    }
}

document.querySelector(".output").innerHTML = cards.join('\r\n')