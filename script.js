/* =====================================================
   MINECRAFT SERVER WEBSEITE
   OWNER PANEL
   ===================================================== */


/* -----------------------------------------------------
   OWNER LOGIN

   WICHTIG:
   Diese Daten sind bei einer reinen GitHub-Pages-Seite
   NICHT geheim.

   Deshalb hier KEIN echtes Passwort eintragen.
   Diese Version ist nur für die Demo / lokale Verwaltung.
   ----------------------------------------------------- */

const OWNER_EMAIL = "ServerOwner@gmail.com";
const OWNER_PASSWORD = "Server";


/* -----------------------------------------------------
   STANDARD DATEN
   ----------------------------------------------------- */

const defaultData = {

    domain: "play.deinserver.de",

    status: "online",

    players: 0,

    links: {

        youtube: "https://youtube.com",

        tiktok: "https://tiktok.com",

        discord: "https://discord.com"

    },

    wishes: []

};


/* -----------------------------------------------------
   DATEN LADEN
   ----------------------------------------------------- */

let data =
    JSON.parse(localStorage.getItem("minecraftWebsiteData"))
    || defaultData;


/* -----------------------------------------------------
   DATEN SPEICHERN
   ----------------------------------------------------- */

function saveData() {

    localStorage.setItem(
        "minecraftWebsiteData",
        JSON.stringify(data)
    );

}


/* -----------------------------------------------------
   SEITE STARTEN
   ----------------------------------------------------- */

document.addEventListener("DOMContentLoaded", function () {

    updateWebsite();

    loadOwnerFields();

    loadWishlist();

});


/* -----------------------------------------------------
   WEBSITE AKTUALISIEREN
   ----------------------------------------------------- */

function updateWebsite() {

    document.getElementById("serverDomain").textContent =
        data.domain;


    document.getElementById("playerCount").textContent =
        data.players;


    updateServerStatus();

    updateSocialLinks();

}


/* -----------------------------------------------------
   SERVERSTATUS
   ----------------------------------------------------- */

function updateServerStatus() {

    const icon =
        document.getElementById("statusIcon");

    const title =
        document.getElementById("statusTitle");

    const description =
        document.getElementById("statusDescription");


    if (data.status === "online") {

        icon.textContent = "🟢";

        title.textContent =
            "Server ist online";

        description.textContent =
            "Unser Minecraft Server ist momentan erreichbar.";

    }


    else if (data.status === "offline") {

        icon.textContent = "🔴";

        title.textContent =
            "Server ist offline";

        description.textContent =
            "Der Minecraft Server ist momentan nicht erreichbar.";

    }


    else {

        icon.textContent = "🟡";

        title.textContent =
            "Server ist in Wartung";

        description.textContent =
            "Der Server wird momentan gewartet.";

    }

}


/* -----------------------------------------------------
   SOCIAL MEDIA
   ----------------------------------------------------- */

function updateSocialLinks() {

    const container =
        document.getElementById("socialLinks");


    container.innerHTML = "";


    const links = [

        {
            name: "YouTube",
            icon: "▶️",
            text: "Unsere Videos",
            url: data.links.youtube
        },

        {
            name: "TikTok",
            icon: "🎵",
            text: "Unsere TikToks",
            url: data.links.tiktok
        },

        {
            name: "Discord",
            icon: "💬",
            text: "Unsere Community",
            url: data.links.discord
        }

    ];


    links.forEach(function (link) {

        const card =
            document.createElement("a");


        card.className =
            "social-card";


        card.href =
            link.url;


        card.target =
            "_blank";


        card.rel =
            "noopener noreferrer";


        card.innerHTML = `

            <div class="social-icon">
                ${link.icon}
            </div>

            <h3>
                ${link.name}
            </h3>

            <p>
                ${link.text}
            </p>

        `;


        container.appendChild(card);

    });

}


/* -----------------------------------------------------
   DOMAIN KOPIEREN
   ----------------------------------------------------- */

function copyDomain() {

    navigator.clipboard.writeText(
        data.domain
    );


    alert(
        "Server-Domain wurde kopiert!"
    );

}


/* -----------------------------------------------------
   LOGIN ÖFFNEN
   ----------------------------------------------------- */

function openLogin() {

    document
        .getElementById("loginOverlay")
        .classList.add("active");

}


/* -----------------------------------------------------
   LOGIN SCHLIESSEN
   ----------------------------------------------------- */

function closeLogin() {

    document
        .getElementById("loginOverlay")
        .classList.remove("active");

}


/* -----------------------------------------------------
   OWNER LOGIN
   ----------------------------------------------------- */

function ownerLogin() {

    const email =
        document.getElementById("ownerEmail").value.trim();


    const password =
        document.getElementById("ownerPassword").value;


    const error =
        document.getElementById("loginError");


    if (
        email === OWNER_EMAIL &&
        password === OWNER_PASSWORD
    ) {

        error.textContent = "";


        closeLogin();


        document
            .getElementById("ownerPanel")
            .classList.add("active");


        loadOwnerFields();

        loadWishlist();

    }

    else {

        error.textContent =
            "❌ E-Mail oder Passwort ist falsch.";

    }

}


/* -----------------------------------------------------
   OWNER FELDER LADEN
   ----------------------------------------------------- */

function loadOwnerFields() {

    document.getElementById("youtubeInput").value =
        data.links.youtube;


    document.getElementById("tiktokInput").value =
        data.links.tiktok;


    document.getElementById("discordInput").value =
        data.links.discord;


    document.getElementById("domainInput").value =
        data.domain;


    document.getElementById("statusInput").value =
        data.status;


    document.getElementById("playersInput").value =
        data.players;

}


/* -----------------------------------------------------
   LINKS SPEICHERN
   ----------------------------------------------------- */

function saveLinks() {

    data.links.youtube =
        document.getElementById("youtubeInput").value;


    data.links.tiktok =
        document.getElementById("tiktokInput").value;


    data.links.discord =
        document.getElementById("discordInput").value;


    saveData();

    updateWebsite();


    alert(
        "✅ Social-Media-Links gespeichert!"
    );

}


/* -----------------------------------------------------
   SERVER SPEICHERN
   ----------------------------------------------------- */

function saveServer() {

    data.domain =
        document.getElementById("domainInput").value;


    data.status =
        document.getElementById("statusInput").value;


    data.players =
        Number(
            document.getElementById("playersInput").value
        );


    saveData();

    updateWebsite();


    alert(
        "✅ Server-Einstellungen gespeichert!"
    );

}


/* -----------------------------------------------------
   WUNSCH ABSENDEN
   ----------------------------------------------------- */

document
    .getElementById("wishlistForm")
    .addEventListener("submit", function (event) {

        event.preventDefault();


        const name =
            document.getElementById("wishName").value.trim();


        const title =
            document.getElementById("wishTitle").value.trim();


        const text =
            document.getElementById("wishText").value.trim();


        if (!name || !title || !text) {

            return;

        }


        const wish = {

            id: Date.now(),

            name: name,

            title: title,

            text: text,

            date: new Date().toLocaleString("de-DE")

        };


        data.wishes.push(wish);


        saveData();


        document
            .getElementById("wishlistForm")
            .reset();


        document
            .getElementById("wishlistMessage")
            .textContent =
            "✅ Dein Wunsch wurde gespeichert!";


        loadWishlist();

    });


/* -----------------------------------------------------
   WÜNSCHE IM OWNER PANEL
   ----------------------------------------------------- */

function loadWishlist() {

    const container =
        document.getElementById("adminWishlist");


    if (!data.wishes.length) {

        container.innerHTML =
            "<p>Keine Wünsche vorhanden.</p>";

        return;

    }


    container.innerHTML = "";


    data.wishes.forEach(function (wish) {

        const item =
            document.createElement("div");


        item.className =
            "wish-admin-card";


        item.innerHTML = `

            <h4>
                ⭐ ${escapeHTML(wish.title)}
            </h4>

            <p>
                <strong>Spieler:</strong>
                ${escapeHTML(wish.name)}
            </p>

            <p>
                <strong>Datum:</strong>
                ${escapeHTML(wish.date)}
            </p>

            <p>
                ${escapeHTML(wish.text)}
            </p>

            <button
                onclick="deleteWish(${wish.id})"
                class="danger-button"
            >
                WUNSCH LÖSCHEN
            </button>

        `;


        container.appendChild(item);

    });

}


/* -----------------------------------------------------
   EINEN WUNSCH LÖSCHEN
   ----------------------------------------------------- */

function deleteWish(id) {

    data.wishes =
        data.wishes.filter(function (wish) {

            return wish.id !== id;

        });


    saveData();

    loadWishlist();

}


/* -----------------------------------------------------
   ALLE WÜNSCHE LÖSCHEN
   ----------------------------------------------------- */

function clearWishlist() {

    if (
        !confirm(
            "Wirklich ALLE Wünsche löschen?"
        )
    ) {

        return;

    }


    data.wishes = [];


    saveData();

    loadWishlist();

}


/* -----------------------------------------------------
   OWNER PANEL SCHLIESSEN
   ----------------------------------------------------- */

function closeOwnerPanel() {

    document
        .getElementById("ownerPanel")
        .classList.remove("active");

}


/* -----------------------------------------------------
   HTML SICHER AUSGEBEN
   ----------------------------------------------------- */

function escapeHTML(value) {

    return String(value)

        .replaceAll("&", "&amp;")

        .replaceAll("<", "&lt;")

        .replaceAll(">", "&gt;")

        .replaceAll('"', "&quot;")

        .replaceAll("'", "&#039;");

}
