/* =====================================================
   OWNER LOGIN
=====================================================

   WICHTIG:

   Diese Daten kannst DU ändern.

   Beispiel:

   const OWNER_EMAIL = "Server";
   const OWNER_PASSWORD = "DEIN_PASSWORT";

   ACHTUNG:
   Das ist KEIN sicherer Passwortschutz.
   Jeder Besucher mit Programmierkenntnissen könnte
   diese Daten im JavaScript sehen.

===================================================== */

const OWNER_EMAIL = "Server@gmail.com";

const OWNER_PASSWORD = "Server";


/* =====================================================
   STANDARD-DATEN
===================================================== */

const defaultData = {

    serverName:
        "Mein Minecraft Server",

    domain:
        "play.deinserver.de",

    status:
        "ONLINE",

    description:
        "Gemeinsam spielen. Gemeinsam erleben.",

    youtube:
        "https://youtube.com/",

    tiktok:
        "https://tiktok.com/",

    discord:
        "https://discord.com/",

    wishes:
        []

};


/* =====================================================
   DATEN LADEN
===================================================== */

let data =
    JSON.parse(
        localStorage.getItem("minecraftWebsiteData")
    ) || defaultData;


/* =====================================================
   DATEN SPEICHERN
===================================================== */

function saveData() {

    localStorage.setItem(
        "minecraftWebsiteData",
        JSON.stringify(data)
    );

}


/* =====================================================
   WEBSEITE AKTUALISIEREN
===================================================== */

function updateWebsite() {

    document.getElementById("serverTitle")
        .textContent =
        data.serverName;

    document.getElementById("serverName")
        .textContent =
        data.serverName;

    document.getElementById("serverDomain")
        .textContent =
        data.domain;

    document.getElementById("serverDescription")
        .textContent =
        data.description;

    document.getElementById("serverStatus")
        .textContent =
        data.status;


    const circle =
        document.getElementById("statusCircle");


    circle.className =
        "status-circle";


    if (data.status === "ONLINE") {

        circle.classList.add("online");

    }

    else if (data.status === "OFFLINE") {

        circle.classList.add("offline");

    }

    else {

        circle.classList.add("maintenance");

    }


    document.getElementById("youtubeLink")
        .href =
        data.youtube;

    document.getElementById("tiktokLink")
        .href =
        data.tiktok;

    document.getElementById("discordLink")
        .href =
        data.discord;


    displayWishes();

}


/* =====================================================
   SERVER IP KOPIEREN
===================================================== */

function copyServerIP() {

    navigator.clipboard.writeText(
        data.domain
    );

    alert(
        "Server-Adresse kopiert:\n\n" +
        data.domain
    );

}


/* =====================================================
   WUNSCH HINZUFÜGEN
===================================================== */

function addWish() {

    const input =
        document.getElementById("wishInput");

    const wish =
        input.value.trim();


    if (!wish) {

        alert(
            "Bitte zuerst einen Wunsch eingeben."
        );

        return;
    }


    data.wishes.push(wish);

    saveData();

    input.value = "";

    displayWishes();

}


/* =====================================================
   WÜNSCHE ANZEIGEN
===================================================== */

function displayWishes() {

    const list =
        document.getElementById("wishList");


    list.innerHTML = "";


    if (data.wishes.length === 0) {

        list.innerHTML =
            `
            <div class="wish-item">
                📝 Noch keine Wünsche vorhanden.
            </div>
            `;

        return;
    }


    data.wishes.forEach(
        function(wish, index) {

            const item =
                document.createElement("div");

            item.className =
                "wish-item";


            item.innerHTML =
                `
                <span>
                    💡 ${escapeHTML(wish)}
                </span>
                `;


            list.appendChild(item);

        }
    );


}


/* =====================================================
   HTML SICHER MACHEN
===================================================== */

function escapeHTML(text) {

    const div =
        document.createElement("div");

    div.textContent =
        text;

    return div.innerHTML;

}


/* =====================================================
   OWNER BUTTON
===================================================== */

document
    .getElementById("ownerButton")
    .addEventListener(
        "click",
        function() {

            document
                .getElementById("loginModal")
                .classList.remove("hidden");

        }
    );


/* =====================================================
   LOGIN SCHLIESSEN
===================================================== */

function closeLogin() {

    document
        .getElementById("loginModal")
        .classList.add("hidden");

}


/* =====================================================
   OWNER LOGIN
===================================================== */

function login() {

    const email =
        document
            .getElementById("loginEmail")
            .value;

    const password =
        document
            .getElementById("loginPassword")
            .value;


    if (
        email === OWNER_EMAIL &&
        password === OWNER_PASSWORD
    ) {

        document
            .getElementById("loginModal")
            .classList.add("hidden");


        document
            .getElementById("ownerPanel")
            .classList.remove("hidden");


        loadAdminData();

    }

    else {

        document
            .getElementById("loginError")
            .textContent =
            "❌ E-Mail oder Passwort falsch.";

    }

}


/* =====================================================
   OWNER PANEL DATEN LADEN
===================================================== */

function loadAdminData() {

    document
        .getElementById("adminServerName")
        .value =
        data.serverName;


    document
        .getElementById("adminDomain")
        .value =
        data.domain;


    document
        .getElementById("adminStatus")
        .value =
        data.status;


    document
        .getElementById("adminDescription")
        .value =
        data.description;


    document
        .getElementById("adminYoutube")
        .value =
        data.youtube;


    document
        .getElementById("adminTiktok")
        .value =
        data.tiktok;


    document
        .getElementById("adminDiscord")
        .value =
        data.discord;


    displayAdminWishes();

}


/* =====================================================
   SERVER SPEICHERN
===================================================== */

function saveServer() {

    data.serverName =
        document
            .getElementById("adminServerName")
            .value;


    data.domain =
        document
            .getElementById("adminDomain")
            .value;


    data.status =
        document
            .getElementById("adminStatus")
            .value;


    data.description =
        document
            .getElementById("adminDescription")
            .value;


    saveData();

    updateWebsite();

    alert(
        "✅ Serverdaten gespeichert!"
    );

}


/* =====================================================
   SOCIAL LINKS SPEICHERN
===================================================== */

function saveSocial() {

    data.youtube =
        document
            .getElementById("adminYoutube")
            .value;


    data.tiktok =
        document
            .getElementById("adminTiktok")
            .value;


    data.discord =
        document
            .getElementById("adminDiscord")
            .value;


    saveData();

    updateWebsite();

    alert(
        "✅ Social-Media-Links gespeichert!"
    );

}


/* =====================================================
   OWNER WÜNSCHE
===================================================== */

function displayAdminWishes() {

    const list =
        document
            .getElementById("adminWishList");


    list.innerHTML = "";


    if (data.wishes.length === 0) {

        list.innerHTML =
            `
            <p>
                Keine Spieler-Wünsche vorhanden.
            </p>
            `;

        return;
    }


    data.wishes.forEach(
        function(wish, index) {

            const item =
                document.createElement("div");

            item.className =
                "admin-wish";


            item.innerHTML =
                `
                <span>
                    💡 ${escapeHTML(wish)}
                </span>

                <button
                    onclick="deleteWish(${index})">
                    🗑️ Löschen
                </button>
                `;


            list.appendChild(item);

        }
    );

}


/* =====================================================
   WUNSCH LÖSCHEN
===================================================== */

function deleteWish(index) {

    if (
        !confirm(
            "Diesen Wunsch wirklich löschen?"
        )
    ) {

        return;

    }


    data.wishes.splice(index, 1);

    saveData();

    displayWishes();

    displayAdminWishes();

}


/* =====================================================
   ABMELDEN
===================================================== */

function logout() {

    document
        .getElementById("ownerPanel")
        .classList.add("hidden");

}


/* =====================================================
   START
===================================================== */

updateWebsite();
updateWebsite();
