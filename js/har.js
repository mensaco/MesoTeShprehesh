function uuidv4() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
  }

// anonymized id
var ua = localStorage.getItem("ua");
if(!ua){
    ua = uuidv4();
    localStorage.setItem("ua",ua);
}

const UA = document.querySelector("#ua")

const toggle = (open, title) => {
    //alert(open)
    if(open){
        UA.src = "https://mensaco.org/ua/"+ua+"/" + encodeURI(new Date().toISOString()+ " \"" + title+ "\"");
    }
}

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
        const title = Tekstet[key].title || "";
        const text = Tekstet[key].text || "Kërkojmë ndjesë! Për këtë fotografi ende nuk kemi shkruar përshkrimin. Do të mundohemi ta shtojmë sa më shpejt që të jetë e mundur.";
        cards.push(card
                            .replace(/\{key\}/g,key)
                            .replace(/\{title\}/g,title)
                            .replace(/\{text\}/g,text)
        )

        
    }
}

document.querySelector(".output").innerHTML = cards.join('\r\n')