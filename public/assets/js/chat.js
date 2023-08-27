// chat
function enviar_mensaje(){
    var a = document.getElementById("chat-input");
    if ("" != a.value) {
        var b = document.getElementById("get-number").innerHTML,
        c = document.getElementById("chat-input").value, 
        d = "https://web.whatsapp.com/send", 
        e = b,  
        f = "&text=" + c;
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) 
            var d = "whatsapp://send";  
            var g = d + "?phone=" + e + f;  
            window.open(g, "_blank");
        
    }
}

const whatsapp_chat =document.getElementById("whatsapp-chat");

function cerrar_chat(){
        whatsapp_chat.classList.add("hide");
        whatsapp_chat.classList.remove("show");
    
}

function mostrar_chat(){
        whatsapp_chat.classList.add("show");
        whatsapp_chat.classList.remove("hide");
}  