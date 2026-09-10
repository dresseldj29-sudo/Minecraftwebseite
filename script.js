/* =====================================================
   MINECRAFT SERVER WEBSITE
   SCRIPT.JS
===================================================== */


/* =====================================================
   🔧 DEINE EINSTELLUNGEN
===================================================== */

/*
   WICHTIG:

   Ändere hier deine Daten.

   Benutze NICHT dein echtes Gmail-Passwort.
   Dieses Passwort wäre für Besucher im Webseiten-Code sichtbar.

   Verwende stattdessen ein separates Passwort nur für
   diese einfache Webseite.
*/

const CONFIG = {

    /* OWNER LOGIN */

    ownerEmail: "dresseldj29@gmail.com",

    ownerPassword: "mamadj2609",


    /* SERVER */

    serverIP: "play.deinserver.de",


    /* SOCIAL MEDIA */

    youtube:
        "https://www.youtube.com/",

    tiktok:
        "https://www.tiktok.com/",

    discord:
        "https://discord.com/",


    /* SERVER STATUS */

    serverStatus: "online"

};


/* =====================================================
   STANDARDDATEN
===================================================== */

let websiteData = {

    serverIP:
        CONFIG.serverIP,

    serverStatus:
        CONFIG.serverStatus,

    youtube:
        CONFIG.youtube,

    tiktok:
        CONFIG.tiktok,

    discord:
        CONFIG.discord,

    wishlist:
        []

};


/* =====================================================
   GESPEICHERTE DATEN LADEN
===================================================== */

function loadData() {

    const saved =
        localStorage.getItem("minecraftWebsiteData");

    if (saved) {

        try {

            websiteData =
                JSON.parse(saved);

        } catch {

            console.log(
                "Gespeicherte Daten konnten nicht geladen werden."
            );

        }

    }

}


/* =====================================================
   DATEN SPEICHERN
===================================================== */

function saveData() {

    localStorage.setItem(
        "minecraftWebsiteData",
        JSON.stringify(websiteData)
    );

}


/* =====================================================
   SERVERSTATUS
===================================================== */

function updateServerStatus() {

    const statusIcon =
        document.getElementById("statusIcon");

    const statusText =
        document.getElementById("serverStatusText");

    const statusDescription =
        document.getElementById(
            "serverStatusDescription"
        );

    const serverAddress =
        document.getElementById(
            "serverAddress"
        );


    if (!statusIcon) return;


    serverAddress.textContent =
        websiteData.serverIP;


    if (websiteData.serverStatus === "online") {

        statusIcon.textContent = "🟢";

        statusText.textContent =
            "Server Online";

        statusDescription.textContent =
            "Unser Minecraft-Server ist aktuell erreichbar.";

    }


    else if (
        websiteData.serverStatus === "offline"
    ) {

        statusIcon.textContent = "🔴";

        statusText.textContent =
            "Server Offline";

        statusDescription.textContent =
            "Der Server ist momentan nicht erreichbar.";

    }


    else if (
        websiteData.serverStatus === "maintenance"
    ) {

        statusIcon.textContent = "🟡";

        statusText.textContent =
            "Server in Wartung";

        statusDescription.textContent =
            "Der Server befindet sich momentan in Wartung.";

    }

}


/* =====================================================
   SOCIAL LINKS
===================================================== */

function updateLinks() {

    document.getElementById(
        "youtubeLink"
    ).href = websiteData.youtube;


    document.getElementById(
        "tiktokLink"
    ).href = websiteData.tiktok;


    document.getElementById(
        "discordLink"
    ).href = websiteData.discord;

}


/* =====================================================
   WUNSCHLISTE ANZEIGEN
===================================================== */

function updateWishlist() {

    const container =
        document.getElementById(
            "wishlistItems"
        );

    if (!container) return;


    container.innerHTML = "";


    if (
        websiteData.wishlist.length === 0
    ) {

        container.innerHTML = `
            <p style="color:#aaa;">
                Noch keine Wünsche vorhanden.
            </p>
        `;

        return;

    }


    websiteData.wishlist.forEach(
        function(wish) {

            const item =
                document.createElement("div");

            item.className =
                "wishlist-item";

            item.textContent =
                "💡 " + wish;

            container.appendChild(item);

        }
    );

}


/* =====================================================
   WUNSCH HINZUFÜGEN
===================================================== */

function addWishlist() {

    const input =
        document.getElementById(
            "wishlistInput"
        );

    const message =
        document.getElementById(
            "wishlistMessage"
        );


    const text =
        input.value.trim();


    if (!text) {

        message.textContent =
            "Bitte schreibe zuerst einen Wunsch.";

        return;

    }


    websiteData.wishlist.push(text);


    saveData();

    updateWishlist();


    input.value = "";


    message.textContent =
        "✅ Dein Wunsch wurde gespeichert!";


    setTimeout(
        function() {

            message.textContent = "";

        },
        3000
    );

}


/* =====================================================
   OWNER LOGIN ÖFFNEN
===================================================== */

function openOwnerLogin() {

    document.getElementById(
        "ownerLogin"
    ).style.display = "flex";

}


/* =====================================================
   OWNER LOGIN SCHLIESSEN
===================================================== */

function closeOwnerLogin() {

    document.getElementById(
        "ownerLogin"
    ).style.display = "none";

}


/* =====================================================
   OWNER LOGIN
===================================================== */

function ownerLogin() {

    const email =
        document.getElementById(
            "ownerEmail"
        ).value.trim();


    const password =
        document.getElementById(
            "ownerPassword"
        ).value;


    const error =
        document.getElementById(
            "loginError"
        );


    if (
        email === CONFIG.ownerEmail &&
        password === CONFIG.ownerPassword
    ) {

        error.textContent = "";


        closeOwnerLogin();


        openOwnerPanel();


        loadAdminValues();


        return;

    }


    error.textContent =
        "❌ E-Mail oder Passwort ist falsch.";

}


/* =====================================================
   OWNER PANEL ÖFFNEN
===================================================== */

function openOwnerPanel() {

    document.getElementById(
        "ownerPanel"
    ).style.display = "flex";

}


/* =====================================================
   OWNER PANEL SCHLIESSEN
===================================================== */

function closeOwnerPanel() {

    document.getElementById(
        "ownerPanel"
    ).style.display = "none";

}


/* =====================================================
   OWNER AUSLOGGEN
===================================================== */

function ownerLogout() {

    closeOwnerPanel();

}


/* =====================================================
   ADMIN WERTE LADEN
===================================================== */

function loadAdminValues() {

    document.getElementById(
        "adminStatus"
    ).value =
        websiteData.serverStatus;


    document.getElementById(
        "adminServerIP"
    ).value =
        websiteData.serverIP;


    document.getElementById(
        "adminYoutube"
    ).value =
        websiteData.youtube;


    document.getElementById(
        "adminTiktok"
    ).value =
        websiteData.tiktok;


    document.getElementById(
        "adminDiscord"
    ).value =
        websiteData.discord;

}


/* =====================================================
   SERVER EINSTELLUNGEN SPEICHERN
===================================================== */

function saveServerSettings() {

    const status =
        document.getElementById(
            "adminStatus"
        ).value;


    const serverIP =
        document.getElementById(
            "adminServerIP"
        ).value.trim();


    if (!serverIP) {

        alert(
            "Bitte eine Server-IP eintragen."
        );

        return;

    }


    websiteData.serverStatus =
        status;


    websiteData.serverIP =
        serverIP;


    saveData();

    updateServerStatus();


    alert(
        "✅ Server-Einstellungen gespeichert!"
    );

}


/* =====================================================
   SOCIAL LINKS SPEICHERN
===================================================== */

function saveLinks() {

    const youtube =
        document.getElementById(
            "adminYoutube"
        ).value.trim();


    const tiktok =
        document.getElementById(
            "adminTiktok"
        ).value.trim();


    const discord =
        document.getElementById(
            "adminDiscord"
        ).value.trim();


    websiteData.youtube =
        youtube;


    websiteData.tiktok =
        tiktok;


    websiteData.discord =
        discord;


    saveData();

    updateLinks();


    alert(
        "✅ Links gespeichert!"
    );

}


/* =====================================================
   WUNSCHLISTE LÖSCHEN
===================================================== */

function clearWishlist() {

    const confirmation =
        confirm(
            "Möchtest du wirklich alle Wünsche löschen?"
        );


    if (!confirmation) return;


    websiteData.wishlist = [];


    saveData();

    updateWishlist();


    alert(
        "🗑️ Wunschliste wurde gelöscht."
    );

}


/* =====================================================
   SERVER-IP KOPIEREN
===================================================== */

function copyServerIP() {

    navigator.clipboard.writeText(
        websiteData.serverIP
    );


    alert(
        "📋 Server-IP wurde kopiert!"
    );

}


/* =====================================================
   START
===================================================== */

loadData();

updateServerStatus();

updateLinks();

updateWishlist();
