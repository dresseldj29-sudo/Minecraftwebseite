/* =====================================================
   OWNER EINSTELLUNGEN

   WICHTIG:
   Alles hier ist öffentlich im Webseiten-Code sichtbar.

   Benutze deshalb NICHT dein normales
   Google-/Gmail-Passwort.
===================================================== */

const OWNER_EMAIL = "ServerOwner@gmail.com";
const OWNER_PASSWORD = "Server";


/* =====================================================
   STANDARD DATEN
===================================================== */

let websiteData = JSON.parse(
    localStorage.getItem("minecraftWebsiteData")
) || {

    domain: "play.deinserver.de",

    version: "1.21.x",

    players: "0 / 100",

    status: "ONLINE",

    discord:
        "https://discord.gg/deinserver",

    youtube: [
        {
            name: "Mein YouTube",
            url: "https://youtube.com/"
        }
    ],

    tiktok: [
        {
            name: "Mein TikTok",
            url: "https://tiktok.com/"
        }
    ],

    wishes: []

};


/* =====================================================
   ELEMENTE
===================================================== */

const loginModal =
    document.getElementById("loginModal");

const ownerPanel =
    document.getElementById("ownerPanel");


/* =====================================================
   LOGIN ÖFFNEN
===================================================== */

document
    .getElementById("ownerButton")
    .addEventListener("click", function() {

        loginModal.classList.add("show");

    });


/* =====================================================
   LOGIN SCHLIESSEN
===================================================== */

function closeLogin() {

    loginModal.classList.remove("show");

}


/* =====================================================
   OWNER LOGIN
===================================================== */

function loginOwner() {

    const email =
        document.getElementById("loginEmail").value.trim();

    const password =
        document.getElementById("loginPassword").value;

    const error =
        document.getElementById("loginError");


    if (
        email === OWNER_EMAIL &&
        password === OWNER_PASSWORD
    ) {

        error.textContent = "";

        loginModal.classList.remove("show");

        ownerPanel.classList.add("show");

        loadAdminPanel();

    } else {

        error.textContent =
            "❌ E-Mail oder Passwort ist falsch.";

    }

}


/* =====================================================
   OWNER PANEL SCHLIESSEN
===================================================== */

function closeOwnerPanel() {

    ownerPanel.classList.remove("show");

}


/* =====================================================
   LOGOUT
===================================================== */

function logoutOwner() {

    ownerPanel.classList.remove("show");

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
   SERVER DATEN
===================================================== */

function saveServerSettings() {

    websiteData.domain =
        document.getElementById("adminDomain").value;

    websiteData.version =
        document.getElementById("adminVersion").value;

    websiteData.players =
        document.getElementById("adminPlayers").value;

    websiteData.status =
        document.getElementById("adminStatus").value;


    saveData();

    updateWebsite();

    alert("✅ Server wurde gespeichert.");

}


/* =====================================================
   DISCORD
===================================================== */

function saveDiscord() {

    websiteData.discord =
        document.getElementById("adminDiscord").value;

    saveData();

    updateWebsite();

    alert("✅ Discord wurde gespeichert.");

}


/* =====================================================
   YOUTUBE HINZUFÜGEN
===================================================== */

function addYouTube() {

    const name =
        document.getElementById("youtubeName").value.trim();

    const url =
        document.getElementById("youtubeUrl").value.trim();


    if (!name || !url) {

        alert("Bitte Name und Link eingeben.");

        return;

    }


    websiteData.youtube.push({
        name: name,
        url: url
    });


    document.getElementById("youtubeName").value = "";
    document.getElementById("youtubeUrl").value = "";


    saveData();

    updateWebsite();

    loadAdminPanel();

}


/* =====================================================
   YOUTUBE LÖSCHEN
===================================================== */

function deleteYouTube(index) {

    websiteData.youtube.splice(index, 1);

    saveData();

    updateWebsite();

    loadAdminPanel();

}


/* =====================================================
   TIKTOK HINZUFÜGEN
===================================================== */

function addTikTok() {

    const name =
        document.getElementById("tiktokName").value.trim();

    const url =
        document.getElementById("tiktokUrl").value.trim();


    if (!name || !url) {

        alert("Bitte Name und Link eingeben.");

        return;

    }


    websiteData.tiktok.push({
        name: name,
        url: url
    });


    document.getElementById("tiktokName").value = "";
    document.getElementById("tiktokUrl").value = "";


    saveData();

    updateWebsite();

    loadAdminPanel();

}


/* =====================================================
   TIKTOK LÖSCHEN
===================================================== */

function deleteTikTok(index) {

    websiteData.tiktok.splice(index, 1);

    saveData();

    updateWebsite();

    loadAdminPanel();

}


/* =====================================================
   WEBSITE AKTUALISIEREN
===================================================== */

function updateWebsite() {

    document.getElementById(
        "serverDomain"
    ).textContent =
        websiteData.domain;


    document.getElementById(
        "serverVersion"
    ).textContent =
        websiteData.version;


    document.getElementById(
        "playerCount"
    ).textContent =
        websiteData.players;


    document.getElementById(
        "serverStatus"
    ).textContent =
        websiteData.status;


    document.getElementById(
        "discordLink"
    ).href =
        websiteData.discord;


    updateStatus();

    updateYouTube();

    updateTikTok();

    updateWishes();

}


/* =====================================================
   SERVER STATUS
===================================================== */

function updateStatus() {

    const circle =
        document.getElementById("statusCircle");


    if (websiteData.status === "ONLINE") {

        circle.style.background = "#18e56b";

        circle.style.boxShadow =
            "0 0 20px #18e56b";

    }


    if (websiteData.status === "OFFLINE") {

        circle.style.background = "#ff3344";

        circle.style.boxShadow =
            "0 0 20px #ff3344";

    }


    if (websiteData.status === "WARTUNG") {

        circle.style.background = "#ffc400";

        circle.style.boxShadow =
            "0 0 20px #ffc400";

    }

}


/* =====================================================
   YOUTUBE
===================================================== */

function updateYouTube() {

    const list =
        document.getElementById("youtubeList");

    list.innerHTML = "";


    websiteData.youtube.forEach(function(channel) {

        const a =
            document.createElement("a");

        a.className = "channel";

        a.href = channel.url;

        a.target = "_blank";

        a.textContent =
            "▶️ " + channel.name + " →";

        list.appendChild(a);

    });

}


/* =====================================================
   TIKTOK
===================================================== */

function updateTikTok() {

    const list =
        document.getElementById("tiktokList");

    list.innerHTML = "";


    websiteData.tiktok.forEach(function(channel) {

        const a =
            document.createElement("a");

        a.className = "channel";

        a.href = channel.url;

        a.target = "_blank";

        a.textContent =
            "🎵 " + channel.name + " →";

        list.appendChild(a);

    });

}


/* =====================================================
   WUNSCH ABSENDEN
===================================================== */

document
    .getElementById("wishForm")
    .addEventListener("submit", function(event) {

        event.preventDefault();


        const name =
            document
                .getElementById("wishName")
                .value
                .trim();


        const wish =
            document
                .getElementById("wishText")
                .value
                .trim();


        if (!name || !wish) {

            return;

        }


        websiteData.wishes.push({

            name: name,

            wish: wish,

            date:
                new Date().toLocaleDateString("de-DE")

        });


        saveData();

        updateWebsite();


        document
            .getElementById("wishName")
            .value = "";


        document
            .getElementById("wishText")
            .value = "";


        alert(
            "✅ Dein Wunsch wurde gespeichert!"
        );

    });


/* =====================================================
   WÜNSCHE ANZEIGEN
===================================================== */

function updateWishes() {

    const list =
        document.getElementById("wishList");

    list.innerHTML = "";


    if (websiteData.wishes.length === 0) {

        list.innerHTML =
            '<div class="wish">' +
            'Noch keine Wünsche vorhanden.' +
            '</div>';

        return;

    }


    websiteData.wishes
        .slice()
        .reverse()
        .forEach(function(item) {

            const div =
                document.createElement("div");

            div.className = "wish";


            const strong =
                document.createElement("strong");

            strong.textContent =
                item.name;


            const span =
                document.createElement("span");

            span.textContent =
                item.wish +
                " • " +
                item.date;


            div.appendChild(strong);

            div.appendChild(span);

            list.appendChild(div);

        });

}


/* =====================================================
   OWNER PANEL LADEN
===================================================== */

function loadAdminPanel() {

    document.getElementById(
        "adminDomain"
    ).value =
        websiteData.domain;


    document.getElementById(
        "adminVersion"
    ).value =
        websiteData.version;


    document.getElementById(
        "adminPlayers"
    ).value =
        websiteData.players;


    document.getElementById(
        "adminStatus"
    ).value =
        websiteData.status;


    document.getElementById(
        "adminDiscord"
    ).value =
        websiteData.discord;


    loadAdminYouTube();

    loadAdminTikTok();

    loadAdminWishes();

}


/* =====================================================
   ADMIN YOUTUBE
===================================================== */

function loadAdminYouTube() {

    const list =
        document.getElementById(
            "adminYoutubeList"
        );

    list.innerHTML = "";


    websiteData.youtube.forEach(
        function(channel, index) {

            const div =
                document.createElement("div");

            div.className =
                "admin-item";


            div.innerHTML =
                `
                <span>
                    ▶️ ${escapeHTML(channel.name)}
                </span>

                <button
                    class="delete-button"
                    onclick="deleteYouTube(${index})">

                    Löschen

                </button>
                `;


            list.appendChild(div);

        }
    );

}


/* =====================================================
   ADMIN TIKTOK
===================================================== */

function loadAdminTikTok() {

    const list =
        document.getElementById(
            "adminTiktokList"
        );

    list.innerHTML = "";


    websiteData.tiktok.forEach(
        function(channel, index) {

            const div =
                document.createElement("div");

            div.className =
                "admin-item";


            div.innerHTML =
                `
                <span>
                    🎵 ${escapeHTML(channel.name)}
                </span>

                <button
                    class="delete-button"
                    onclick="deleteTikTok(${index})">

                    Löschen

                </button>
                `;


            list.appendChild(div);

        }
    );

}


/* =====================================================
   ADMIN WÜNSCHE
===================================================== */

function loadAdminWishes() {

    const list =
        document.getElementById(
            "adminWishList"
        );

    list.innerHTML = "";


    if (websiteData.wishes.length === 0) {

        list.innerHTML =
            "<p>Noch keine Wünsche.</p>";

        return;

    }


    websiteData.wishes
        .slice()
        .reverse()
        .forEach(function(item, reversedIndex) {

            const realIndex =
                websiteData.wishes.length -
                1 -
                reversedIndex;


            const div =
                document.createElement("div");

            div.className =
                "admin-wish";


            div.innerHTML =
                `
                <strong>
                    ${escapeHTML(item.name)}
                </strong>

                <p>
                    ${escapeHTML(item.wish)}
                </p>

                <small>
                    ${escapeHTML(item.date)}
                </small>

                <br>

                <button
                    onclick="deleteWish(${realIndex})">

                    Wunsch löschen

                </button>
                `;


            list.appendChild(div);

        });

}


/* =====================================================
   WUNSCH LÖSCHEN
===================================================== */

function deleteWish(index) {

    websiteData.wishes.splice(index, 1);

    saveData();

    updateWebsite();

    loadAdminPanel();

}


/* =====================================================
   HTML SICHER MACHEN
===================================================== */

function escapeHTML(text) {

    return String(text)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");

}


/* =====================================================
   SERVER-IP KOPIEREN
===================================================== */

function copyServerIP() {

    navigator.clipboard.writeText(
        websiteData.domain
    );

    alert(
        "📋 Server-Adresse kopiert!"
    );

}


/* =====================================================
   START
===================================================== */

updateWebsite();
