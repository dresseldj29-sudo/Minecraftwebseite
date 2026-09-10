/* =====================================================
   OWNER EINSTELLUNGEN
   =====================================================

   WICHTIG:

   Diese Daten stehen im Browser-Code.

   Das bedeutet:
   Eine technisch versierte Person könnte
   diese Daten aus dem JavaScript auslesen.

   Für eine echte sichere Webseite später
   bitte eine Datenbank + sichere Anmeldung verwenden.
   ===================================================== */


/* =========================
   OWNER LOGIN
========================= */

const OWNER_EMAIL = "deine-email@gmail.com";

const OWNER_PASSWORD = "DEIN_PASSWORT";


/* =========================
   STANDARD DATEN
========================= */

const defaultData = {

    serverName:
        "MINECRAFT SERVER",

    serverDescription:
        "Gemeinsam mehr erleben!",

    serverDomain:
        "play.example.de",

    status:
        "online",

    youtube:
        "#",

    tiktok:
        "#",

    discord:
        "#",

    wishlist: [

        {
            title: "Neuen Spielmodus hinzufügen",
            description: "Wunsch der Spieler"
        },

        {
            title: "Neuen Spawn bauen",
            description: "Idee für die Community"
        }

    ]

};


/* =========================
   DATEN LADEN
========================= */

let data =
    JSON.parse(
        localStorage.getItem("minecraftWebsiteData")
    ) || defaultData;


/* =========================
   DATEN SPEICHERN
========================= */

function saveData() {

    localStorage.setItem(
        "minecraftWebsiteData",
        JSON.stringify(data)
    );

}


/* =========================
   WEBSEITE AKTUALISIEREN
========================= */

function updateWebsite() {

    document.getElementById(
        "serverName"
    ).textContent = data.serverName;


    document.getElementById(
        "footerServerName"
    ).textContent = data.serverName;


    document.getElementById(
        "serverDescription"
    ).textContent =
        data.serverDescription;


    document.getElementById(
        "serverDomain"
    ).textContent =
        data.serverDomain;


    /* SOCIAL LINKS */

    document.getElementById(
        "youtubeLink"
    ).href =
        data.youtube;


    document.getElementById(
        "tiktokLink"
    ).href =
        data.tiktok;


    document.getElementById(
        "discordLink"
    ).href =
        data.discord;


    /* SERVERSTATUS */

    const circle =
        document.getElementById(
            "statusCircle"
        );

    const statusText =
        document.getElementById(
            "statusText"
        );

    const playerText =
        document.getElementById(
            "playerText"
        );


    circle.className =
        "status-circle " +
        data.status;


    if (data.status === "online") {

        circle.textContent = "●";

        statusText.textContent =
            "Server ist ONLINE";

        playerText.textContent =
            "Spieler können jetzt beitreten.";

    }


    if (data.status === "offline") {

        circle.textContent = "●";

        statusText.textContent =
            "Server ist OFFLINE";

        playerText.textContent =
            "Der Server ist momentan nicht erreichbar.";

    }


    if (data.status === "maintenance") {

        circle.textContent = "●";

        statusText.textContent =
            "Server ist in WARTUNG";

        playerText.textContent =
            "Bitte später wieder versuchen.";

    }


    updateWishlist();

}


/* =========================
   WUNSCHLISTE
========================= */

function updateWishlist() {

    const container =
        document.getElementById(
            "wishlistContainer"
        );


    container.innerHTML = "";


    if (data.wishlist.length === 0) {

        container.innerHTML =
            "<p>Momentan gibt es keine Wünsche.</p>";

        return;

    }


    data.wishlist.forEach(
        function(item) {

            const div =
                document.createElement("div");


            div.className =
                "wishlist-item";


            div.innerHTML = `

                <h3>${escapeHTML(item.title)}</h3>

                <p>
                    ${escapeHTML(item.description)}
                </p>

            `;


            container.appendChild(div);

        }
    );

}


/* =========================
   HTML SICHER MACHEN
========================= */

function escapeHTML(text) {

    const div =
        document.createElement("div");

    div.textContent =
        text;

    return div.innerHTML;

}


/* =========================
   LOGIN ÖFFNEN
========================= */

function openLogin() {

    document.getElementById(
        "loginOverlay"
    ).style.display = "block";

}


/* =========================
   LOGIN SCHLIESSEN
========================= */

function closeLogin() {

    document.getElementById(
        "loginOverlay"
    ).style.display = "none";

}


/* =========================
   LOGIN
========================= */

function login() {

    const email =
        document.getElementById(
            "loginEmail"
        ).value.trim();


    const password =
        document.getElementById(
            "loginPassword"
        ).value;


    const error =
        document.getElementById(
            "loginError"
        );


    if (
        email === OWNER_EMAIL &&
        password === OWNER_PASSWORD
    ) {

        error.textContent = "";

        closeLogin();

        openOwnerPanel();

        loadAdminData();

    }

    else {

        error.textContent =
            "E-Mail oder Passwort ist falsch.";

    }

}


/* =========================
   OWNER PANEL ÖFFNEN
========================= */

function openOwnerPanel() {

    document.getElementById(
        "ownerPanel"
    ).style.display = "block";

}


/* =========================
   OWNER PANEL SCHLIESSEN
========================= */

function closeOwnerPanel() {

    document.getElementById(
        "ownerPanel"
    ).style.display = "none";

}


/* =========================
   ADMIN DATEN LADEN
========================= */

function loadAdminData() {

    document.getElementById(
        "adminServerName"
    ).value =
        data.serverName;


    document.getElementById(
        "adminServerDomain"
    ).value =
        data.serverDomain;


    document.getElementById(
        "adminDescription"
    ).value =
        data.serverDescription;


    document.getElementById(
        "adminStatus"
    ).value =
        data.status;


    document.getElementById(
        "adminYoutube"
    ).value =
        data.youtube;


    document.getElementById(
        "adminTiktok"
    ).value =
        data.tiktok;


    document.getElementById(
        "adminDiscord"
    ).value =
        data.discord;


    updateAdminWishlist();

}


/* =========================
   SERVER SPEICHERN
========================= */

function saveServerSettings() {

    data.serverName =
        document.getElementById(
            "adminServerName"
        ).value;


    data.serverDomain =
        document.getElementById(
            "adminServerDomain"
        ).value;


    data.serverDescription =
        document.getElementById(
            "adminDescription"
        ).value;


    data.status =
        document.getElementById(
            "adminStatus"
        ).value;


    saveData();

    updateWebsite();

    alert(
        "Server-Einstellungen gespeichert!"
    );

}


/* =========================
   SOCIAL LINKS SPEICHERN
========================= */

function saveSocials() {

    data.youtube =
        document.getElementById(
            "adminYoutube"
        ).value;


    data.tiktok =
        document.getElementById(
            "adminTiktok"
        ).value;


    data.discord =
        document.getElementById(
            "adminDiscord"
        ).value;


    saveData();

    updateWebsite();

    alert(
        "Social-Media-Links gespeichert!"
    );

}


/* =========================
   WUNSCH HINZUFÜGEN
========================= */

function addWishlist() {

    const title =
        document.getElementById(
            "wishlistTitle"
        ).value.trim();


    const description =
        document.getElementById(
            "wishlistDescription"
        ).value.trim();


    if (!title) {

        alert(
            "Bitte einen Wunsch eingeben."
        );

        return;

    }


    data.wishlist.push({

        title:
            title,

        description:
            description ||
            "Keine Beschreibung"

    });


    document.getElementById(
        "wishlistTitle"
    ).value = "";


    document.getElementById(
        "wishlistDescription"
    ).value = "";


    saveData();

    updateWebsite();

    updateAdminWishlist();

}


/* =========================
   ADMIN WUNSCHLISTE
========================= */

function updateAdminWishlist() {

    const container =
        document.getElementById(
            "adminWishlist"
        );


    container.innerHTML = "";


    data.wishlist.forEach(
        function(item, index) {

            const div =
                document.createElement("div");


            div.className =
                "admin-wishlist-item";


            div.innerHTML = `

                <strong>
                    ${escapeHTML(item.title)}
                </strong>

                <p>
                    ${escapeHTML(item.description)}
                </p>

                <button
                    onclick="deleteWishlist(${index})">
                    LÖSCHEN
                </button>

            `;


            container.appendChild(div);

        }
    );

}


/* =========================
   WUNSCH LÖSCHEN
========================= */

function deleteWishlist(index) {

    if (
        !confirm(
            "Diesen Wunsch wirklich löschen?"
        )
    ) {

        return;

    }


    data.wishlist.splice(
        index,
        1
    );


    saveData();

    updateWebsite();

    updateAdminWishlist();

}


/* =========================
   LOGOUT
========================= */

function logout() {

    closeOwnerPanel();

}


/* =========================
   SERVER-IP KOPIEREN
========================= */

function copyServerIP() {

    navigator.clipboard.writeText(
        data.serverDomain
    );

    alert(
        "Server-Adresse wurde kopiert!"
    );

}


/* =========================
   START
========================= */

updateWebsite();
