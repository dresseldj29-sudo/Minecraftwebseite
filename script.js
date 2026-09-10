/* ================================================= */
/* MINECRAFT SERVER WEBSITE */
/* ================================================= */


/* ================================================= */
/* OWNER LOGIN */
/* ================================================= */

/*
    WICHTIG:

    Diese Daten sind in einer GitHub-Pages-Webseite
    NICHT geheim.

    Jeder, der den Quellcode untersucht, kann sie
    theoretisch sehen.

    Deshalb hier niemals dein echtes Gmail-Passwort
    verwenden.
*/

const OWNER_EMAIL = "ServerOwner@gmail.com";
const OWNER_PASSWORD = "Server";


/* ================================================= */
/* STANDARD DATEN */
/* ================================================= */

const defaultData = {

    server: {
        status: "online",
        domain: "play.deinserver.de",
        players: "0 / 100",
        version: "Java & Bedrock"
    },

    discord: "",

    youtube: [],

    tiktok: [],

    wishes: []

};


/* ================================================= */
/* DATEN LADEN */
/* ================================================= */

function getData() {

    const saved =
        localStorage.getItem("minecraftServerData");

    if (!saved) {

        localStorage.setItem(
            "minecraftServerData",
            JSON.stringify(defaultData)
        );

        return structuredClone(defaultData);
    }

    try {

        return JSON.parse(saved);

    } catch {

        return structuredClone(defaultData);

    }
}


/* ================================================= */
/* DATEN SPEICHERN */
/* ================================================= */

function saveData(data) {

    localStorage.setItem(
        "minecraftServerData",
        JSON.stringify(data)
    );

}


/* ================================================= */
/* LOGIN ÖFFNEN */
/* ================================================= */

function openLogin() {

    document
        .getElementById("loginModal")
        .classList.add("show");

    document
        .getElementById("loginEmail")
        .focus();

}


/* ================================================= */
/* LOGIN SCHLIESSEN */
/* ================================================= */

function closeLogin() {

    document
        .getElementById("loginModal")
        .classList.remove("show");

}


/* ================================================= */
/* OWNER LOGIN */
/* ================================================= */

function ownerLogin() {

    const email =
        document
        .getElementById("loginEmail")
        .value
        .trim();

    const password =
        document
        .getElementById("loginPassword")
        .value;

    const error =
        document
        .getElementById("loginError");


    if (
        email === OWNER_EMAIL &&
        password === OWNER_PASSWORD
    ) {

        localStorage.setItem(
            "ownerLoggedIn",
            "true"
        );

        error.textContent = "";

        closeLogin();

        openOwnerPanel();

    } else {

        error.textContent =
            "❌ E-Mail oder Passwort ist falsch.";

    }

}


/* ================================================= */
/* OWNER PANEL ÖFFNEN */
/* ================================================= */

function openOwnerPanel() {

    const panel =
        document.getElementById("ownerPanel");

    panel.classList.add("show");

    loadOwnerSettings();

}


/* ================================================= */
/* OWNER LOGOUT */
/* ================================================= */

function logoutOwner() {

    localStorage.removeItem(
        "ownerLoggedIn"
    );

    document
        .getElementById("ownerPanel")
        .classList.remove("show");

}


/* ================================================= */
/* LOGIN BEIM START PRÜFEN */
/* ================================================= */

function checkOwnerLogin() {

    /*
        Absichtlich KEIN automatisches Öffnen
        des Owner Panels.

        Der Owner klickt selbst auf
        "Owner Login".
    */

}


/* ================================================= */
/* SERVER LADEN */
/* ================================================= */

function loadServer() {

    const data = getData();

    const server = data.server;


    document.getElementById("serverDomain")
        .textContent = server.domain;


    document.getElementById("playerCount")
        .textContent = server.players;


    document.getElementById("serverVersion")
        .textContent = server.version;


    const status =
        document.getElementById("serverStatus");

    const statusText =
        document.getElementById("serverStatusText");

    const dot =
        document.getElementById("statusDot");


    dot.className =
        "status-dot " + server.status;


    if (server.status === "online") {

        status.textContent =
            "Online";

        statusText.textContent =
            "Der Server ist online und bereit.";

    }


    if (server.status === "offline") {

        status.textContent =
            "Offline";

        statusText.textContent =
            "Der Server ist momentan offline.";

    }


    if (server.status === "maintenance") {

        status.textContent =
            "Wartung";

        statusText.textContent =
            "Der Server befindet sich momentan in Wartung.";

    }

}


/* ================================================= */
/* SERVER EINSTELLUNGEN LADEN */
/* ================================================= */

function loadOwnerSettings() {

    const data = getData();


    document.getElementById("editStatus")
        .value = data.server.status;


    document.getElementById("editDomain")
        .value = data.server.domain;


    document.getElementById("editPlayers")
        .value = data.server.players;


    document.getElementById("editVersion")
        .value = data.server.version;


    document.getElementById("editDiscord")
        .value = data.discord;


    renderAdminYouTube();

    renderAdminTikTok();

    renderAdminWishes();

}


/* ================================================= */
/* SERVER SPEICHERN */
/* ================================================= */

function saveServerSettings() {

    const data = getData();


    data.server.status =
        document.getElementById("editStatus").value;


    data.server.domain =
        document.getElementById("editDomain").value
        .trim();


    data.server.players =
        document.getElementById("editPlayers").value
        .trim();


    data.server.version =
        document.getElementById("editVersion").value
        .trim();


    saveData(data);

    loadServer();


    alert("✅ Serverdaten wurden gespeichert.");

}


/* ================================================= */
/* DISCORD SPEICHERN */
/* ================================================= */

function saveDiscord() {

    const data = getData();


    data.discord =
        document.getElementById("editDiscord")
        .value
        .trim();


    saveData(data);

    renderSocialLinks();


    alert("✅ Discord wurde gespeichert.");

}


/* ================================================= */
/* YOUTUBE HINZUFÜGEN */
/* ================================================= */

function addYouTube() {

    const name =
        document
        .getElementById("youtubeName")
        .value
        .trim();


    const url =
        document
        .getElementById("youtubeURL")
        .value
        .trim();


    if (!name || !url) {

        alert(
            "Bitte Kanalname und URL eingeben."
        );

        return;

    }


    const data = getData();


    data.youtube.push({

        name: name,

        url: url

    });


    saveData(data);


    document.getElementById("youtubeName")
        .value = "";

    document.getElementById("youtubeURL")
        .value = "";


    renderSocialLinks();

    renderAdminYouTube();

}


/* ================================================= */
/* YOUTUBE LÖSCHEN */
/* ================================================= */

function deleteYouTube(index) {

    const data = getData();

    data.youtube.splice(index, 1);

    saveData(data);

    renderSocialLinks();

    renderAdminYouTube();

}


/* ================================================= */
/* TIKTOK HINZUFÜGEN */
/* ================================================= */

function addTikTok() {

    const name =
        document
        .getElementById("tiktokName")
        .value
        .trim();


    const url =
        document
        .getElementById("tiktokURL")
        .value
        .trim();


    if (!name || !url) {

        alert(
            "Bitte TikTok Name und URL eingeben."
        );

        return;

    }


    const data = getData();


    data.tiktok.push({

        name: name,

        url: url

    });


    saveData(data);


    document.getElementById("tiktokName")
        .value = "";

    document.getElementById("tiktokURL")
        .value = "";


    renderSocialLinks();

    renderAdminTikTok();

}


/* ================================================= */
/* TIKTOK LÖSCHEN */
/* ================================================= */

function deleteTikTok(index) {

    const data = getData();

    data.tiktok.splice(index, 1);

    saveData(data);

    renderSocialLinks();

    renderAdminTikTok();

}


/* ================================================= */
/* SOCIAL MEDIA ANZEIGEN */
/* ================================================= */

function renderSocialLinks() {

    const data = getData();

    const container =
        document.getElementById("socialLinks");


    container.innerHTML = "";


    /* DISCORD */

    if (data.discord) {

        const card =
            document.createElement("a");

        card.className =
            "social-card";

        card.href =
            data.discord;

        card.target =
            "_blank";

        card.rel =
            "noopener noreferrer";


        card.innerHTML = `
            <div class="icon">💬</div>
            <h3>Discord</h3>
            <p>Unsere Community</p>
        `;


        container.appendChild(card);

    }


    /* YOUTUBE */

    data.youtube.forEach(channel => {

        const card =
            document.createElement("a");

        card.className =
            "social-card";

        card.href =
            channel.url;

        card.target =
            "_blank";

        card.rel =
            "noopener noreferrer";


        card.innerHTML = `
            <div class="icon">▶️</div>
            <h3>${escapeHTML(channel.name)}</h3>
            <p>YouTube Kanal</p>
        `;


        container.appendChild(card);

    });


    /* TIKTOK */

    data.tiktok.forEach(channel => {

        const card =
            document.createElement("a");

        card.className =
            "social-card";

        card.href =
            channel.url;

        card.target =
            "_blank";

        card.rel =
            "noopener noreferrer";


        card.innerHTML = `
            <div class="icon">🎵</div>
            <h3>${escapeHTML(channel.name)}</h3>
            <p>TikTok Kanal</p>
        `;


        container.appendChild(card);

    });


    if (!data.discord &&
        data.youtube.length === 0 &&
        data.tiktok.length === 0) {

        container.innerHTML = `
            <div class="social-card">
                <div class="icon">📱</div>
                <h3>Noch keine Kanäle</h3>
                <p>
                    Der Owner kann hier YouTube,
                    TikTok und Discord hinzufügen.
                </p>
            </div>
        `;

    }

}


/* ================================================= */
/* ADMIN YOUTUBE LISTE */
/* ================================================= */

function renderAdminYouTube() {

    const data = getData();

    const container =
        document.getElementById("youtubeAdminList");


    container.innerHTML = "";


    data.youtube.forEach((channel, index) => {

        const item =
            document.createElement("div");

        item.className =
            "admin-item";


        item.innerHTML = `
            <span>
                ▶️ ${escapeHTML(channel.name)}
            </span>

            <button
                onclick="deleteYouTube(${index})">
                Löschen
            </button>
        `;


        container.appendChild(item);

    });

}


/* ================================================= */
/* ADMIN TIKTOK LISTE */
/* ================================================= */

function renderAdminTikTok() {

    const data = getData();

    const container =
        document.getElementById("tiktokAdminList");


    container.innerHTML = "";


    data.tiktok.forEach((channel, index) => {

        const item =
            document.createElement("div");

        item.className =
            "admin-item";


        item.innerHTML = `
            <span>
                🎵 ${escapeHTML(channel.name)}
            </span>

            <button
                onclick="deleteTikTok(${index})">
                Löschen
            </button>
        `;


        container.appendChild(item);

    });

}


/* ================================================= */
/* WUNSCH EINREICHEN */
/* ================================================= */

function submitWish() {

    const name =
        document
        .getElementById("wishName")
        .value
        .trim();


    const category =
        document
        .getElementById("wishCategory")
        .value;


    const text =
        document
        .getElementById("wishText")
        .value
        .trim();


    if (!name || !text) {

        alert(
            "Bitte Minecraft-Name und Wunsch eingeben."
        );

        return;

    }


    const data = getData();


    data.wishes.push({

        id: Date.now(),

        name: name,

        category: category,

        text: text,

        date:
            new Date().toLocaleString("de-DE")

    });


    saveData(data);


    document.getElementById("wishName")
        .value = "";

    document.getElementById("wishText")
        .value = "";


    updateWishCount();

    alert(
        "⭐ Dein Wunsch wurde eingereicht!"
    );

}


/* ================================================= */
/* WUNSCH COUNT */
/* ================================================= */

function updateWishCount() {

    const data = getData();


    document.getElementById("wishCount")
        .textContent =
        data.wishes.length;

}


/* ================================================= */
/* OWNER WÜNSCHE */
/* ================================================= */

function renderAdminWishes() {

    const data = getData();


    const container =
        document.getElementById("adminWishes");


    container.innerHTML = "";


    if (data.wishes.length === 0) {

        container.innerHTML = `
            <p style="color:#9aa9b6;">
                Noch keine Wünsche vorhanden.
            </p>
        `;

        return;

    }


    data.wishes
        .slice()
        .reverse()
        .forEach(wish => {

            const item =
                document.createElement("div");

            item.className =
                "wish-admin-item";


            item.innerHTML = `
                <strong>
                    ⭐ ${escapeHTML(wish.name)}
                </strong>

                <small>
                    ${escapeHTML(wish.category)}
                    ·
                    ${escapeHTML(wish.date)}
                </small>

                <p>
                    ${escapeHTML(wish.text)}
                </p>

                <button
                    onclick="deleteWish(${wish.id})">
                    Wunsch löschen
                </button>
            `;


            container.appendChild(item);

        });

}


/* ================================================= */
/* WUNSCH LÖSCHEN */
/* ================================================= */

function deleteWish(id) {

    const data = getData();


    data.wishes =
        data.wishes.filter(
            wish => wish.id !== id
        );


    saveData(data);


    renderAdminWishes();

    updateWishCount();

}


/* ================================================= */
/* SERVER IP KOPIEREN */
/* ================================================= */

function copyServerIP() {

    const data = getData();

    const domain =
        data.server.domain;


    navigator.clipboard
        .writeText(domain)
        .then(() => {

            alert(
                "📋 Server-Adresse kopiert!"
            );

        })
        .catch(() => {

            alert(
                "Server-Adresse: " + domain
            );

        });

}


/* ================================================= */
/* HTML SICHER DARSTELLEN */
/* ================================================= */

function escapeHTML(value) {

    return String(value)

        .replaceAll("&", "&amp;")

        .replaceAll("<", "&lt;")

        .replaceAll(">", "&gt;")

        .replaceAll('"', "&quot;")

        .replaceAll("'", "&#039;");

}


/* ================================================= */
/* JAHR */
/* ================================================= */

function setYear() {

    document.getElementById("year")
        .textContent =
        new Date().getFullYear();

}


/* ================================================= */
/* START */
/* ================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        loadServer();

        renderSocialLinks();

        updateWishCount();

        setYear();

        checkOwnerLogin();

    }
);
