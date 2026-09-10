// =====================================================
// MINECRAFT SERVER WEBSITE
// SCRIPT
// =====================================================


// =====================================================
// DATEN LADEN
// =====================================================

let websiteData = JSON.parse(
    localStorage.getItem("minecraftWebsiteData")
) || {

    server: {
        domain: SERVER_CONFIG.domain,

        version: SERVER_CONFIG.version,

        maxPlayers: SERVER_CONFIG.maxPlayers,

        players: 0,

        status: "online"
    },

    discord: "",

    youtube: [],

    tiktok: [],

    wishes: []

};


// =====================================================
// DATEN SPEICHERN
// =====================================================

function saveData() {

    localStorage.setItem(
        "minecraftWebsiteData",
        JSON.stringify(websiteData)
    );

}


// =====================================================
// SEITE STARTEN
// =====================================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        loadWebsite();

        loadSocialLinks();

        loadWishlist();

        loadAdminLists();

        checkOwnerSession();

    }
);


// =====================================================
// WEBSITE LADEN
// =====================================================

function loadWebsite() {

    document.getElementById(
        "navServerName"
    ).textContent = SERVER_CONFIG.name;


    document.getElementById(
        "footerServerName"
    ).textContent = SERVER_CONFIG.name;


    document.getElementById(
        "serverDomain"
    ).textContent =
        websiteData.server.domain;


    document.getElementById(
        "heroDomain"
    ).textContent =
        websiteData.server.domain;


    document.getElementById(
        "footerDomain"
    ).textContent =
        websiteData.server.domain;


    document.getElementById(
        "serverVersion"
    ).textContent =
        websiteData.server.version;


    document.getElementById(
        "serverPlayers"
    ).textContent =
        websiteData.server.players +
        " / " +
        websiteData.server.maxPlayers;


    updateServerStatus();

}


// =====================================================
// SERVER STATUS
// =====================================================

function updateServerStatus() {

    const status =
        websiteData.server.status;


    const statusText =
        document.getElementById(
            "serverStatus"
        );

    const heroStatus =
        document.getElementById(
            "heroStatus"
        );


    const dot =
        document.getElementById(
            "serverStatusDot"
        );

    const heroDot =
        document.getElementById(
            "heroStatusDot"
        );


    dot.className =
        "big-status-dot " +
        status;

    heroDot.className =
        "status-dot " +
        status;


    if (status === "online") {

        statusText.textContent =
            "🟢 Online";

        heroStatus.textContent =
            "🟢 Server Online";

    }

    else if (status === "offline") {

        statusText.textContent =
            "🔴 Offline";

        heroStatus.textContent =
            "🔴 Server Offline";

    }

    else {

        statusText.textContent =
            "🟠 Wartung";

        heroStatus.textContent =
            "🟠 Wartung";

    }

}


// =====================================================
// SERVER ADRESSE KOPIEREN
// =====================================================

function copyServerAddress() {

    navigator.clipboard.writeText(
        websiteData.server.domain
    );

    alert(
        "Server-Adresse wurde kopiert!"
    );

}


// =====================================================
// OWNER LOGIN ÖFFNEN
// =====================================================

function openOwnerLogin() {

    document.getElementById(
        "loginModal"
    ).classList.add("active");

}


// =====================================================
// OWNER LOGIN SCHLIESSEN
// =====================================================

function closeOwnerLogin() {

    document.getElementById(
        "loginModal"
    ).classList.remove("active");

}


// =====================================================
// OWNER LOGIN
// =====================================================

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
        email === OWNER_CONFIG.email &&
        password === OWNER_CONFIG.password
    ) {

        sessionStorage.setItem(
            "ownerLoggedIn",
            "true"
        );


        closeOwnerLogin();


        document.getElementById(
            "ownerPanel"
        ).classList.add("active");


        loadAdminSettings();

        error.textContent = "";

    }

    else {

        error.textContent =
            "❌ E-Mail oder Passwort falsch.";

    }

}


// =====================================================
// OWNER SESSION PRÜFEN
// =====================================================

function checkOwnerSession() {

    if (
        sessionStorage.getItem(
            "ownerLoggedIn"
        ) === "true"
    ) {

        loadAdminSettings();

    }

}


// =====================================================
// OWNER PANEL SCHLIESSEN
// =====================================================

function closeOwnerPanel() {

    document.getElementById(
        "ownerPanel"
    ).classList.remove("active");

}


// =====================================================
// OWNER ABMELDEN
// =====================================================

function ownerLogout() {

    sessionStorage.removeItem(
        "ownerLoggedIn"
    );

    closeOwnerPanel();

}


// =====================================================
// OWNER EINSTELLUNGEN LADEN
// =====================================================

function loadAdminSettings() {

    document.getElementById(
        "adminDomain"
    ).value =
        websiteData.server.domain;


    document.getElementById(
        "adminVersion"
    ).value =
        websiteData.server.version;


    document.getElementById(
        "adminMaxPlayers"
    ).value =
        websiteData.server.maxPlayers;


    document.getElementById(
        "adminStatus"
    ).value =
        websiteData.server.status;


    document.getElementById(
        "discordLink"
    ).value =
        websiteData.discord;

}


// =====================================================
// SERVER SPEICHERN
// =====================================================

function saveServerSettings() {

    websiteData.server.domain =
        document.getElementById(
            "adminDomain"
        ).value.trim();


    websiteData.server.version =
        document.getElementById(
            "adminVersion"
        ).value.trim();


    websiteData.server.maxPlayers =
        Number(
            document.getElementById(
                "adminMaxPlayers"
            ).value
        );


    websiteData.server.status =
        document.getElementById(
            "adminStatus"
        ).value;


    saveData();

    loadWebsite();

    alert(
        "✅ Server-Einstellungen gespeichert!"
    );

}


// =====================================================
// DISCORD SPEICHERN
// =====================================================

function saveDiscord() {

    websiteData.discord =
        document.getElementById(
            "discordLink"
        ).value.trim();


    saveData();

    loadSocialLinks();

    alert(
        "✅ Discord gespeichert!"
    );

}


// =====================================================
// YOUTUBE HINZUFÜGEN
// =====================================================

function addYouTube() {

    const name =
        document.getElementById(
            "youtubeName"
        ).value.trim();


    const link =
        document.getElementById(
            "youtubeLink"
        ).value.trim();


    if (!name || !link) {

        alert(
            "Bitte Name und Link eingeben."
        );

        return;

    }


    websiteData.youtube.push({

        name: name,

        link: link

    });


    saveData();

    document.getElementById(
        "youtubeName"
    ).value = "";


    document.getElementById(
        "youtubeLink"
    ).value = "";


    loadSocialLinks();

    loadAdminLists();

}


// =====================================================
// YOUTUBE LÖSCHEN
// =====================================================

function deleteYouTube(index) {

    websiteData.youtube.splice(
        index,
        1
    );

    saveData();

    loadSocialLinks();

    loadAdminLists();

}


// =====================================================
// TIKTOK HINZUFÜGEN
// =====================================================

function addTikTok() {

    const name =
        document.getElementById(
            "tiktokName"
        ).value.trim();


    const link =
        document.getElementById(
            "tiktokLink"
        ).value.trim();


    if (!name || !link) {

        alert(
            "Bitte Name und Link eingeben."
        );

        return;

    }


    websiteData.tiktok.push({

        name: name,

        link: link

    });


    saveData();


    document.getElementById(
        "tiktokName"
    ).value = "";


    document.getElementById(
        "tiktokLink"
    ).value = "";


    loadSocialLinks();

    loadAdminLists();

}


// =====================================================
// TIKTOK LÖSCHEN
// =====================================================

function deleteTikTok(index) {

    websiteData.tiktok.splice(
        index,
        1
    );

    saveData();

    loadSocialLinks();

    loadAdminLists();

}


// =====================================================
// SOCIAL LINKS ANZEIGEN
// =====================================================

function loadSocialLinks() {

    const container =
        document.getElementById(
            "socialLinks"
        );


    container.innerHTML = "";


    // DISCORD

    if (websiteData.discord) {

        container.innerHTML += `

            <a
                class="social-card"
                href="${websiteData.discord}"
                target="_blank"
                rel="noopener"
            >

                <div class="social-icon">
                    💬
                </div>

                <h3>Discord</h3>

                <p>
                    Komm auf unseren Discord-Server.
                </p>

                <span>
                    Discord öffnen →
                </span>

            </a>

        `;

    }


    // YOUTUBE

    websiteData.youtube.forEach(
        function(channel) {

            container.innerHTML += `

                <a
                    class="social-card"
                    href="${channel.link}"
                    target="_blank"
                    rel="noopener"
                >

                    <div class="social-icon">
                        ▶️
                    </div>

                    <h3>
                        ${escapeHTML(channel.name)}
                    </h3>

                    <p>
                        YouTube-Kanal
                    </p>

                    <span>
                        Kanal öffnen →
                    </span>

                </a>

            `;

        }
    );


    // TIKTOK

    websiteData.tiktok.forEach(
        function(channel) {

            container.innerHTML += `

                <a
                    class="social-card"
                    href="${channel.link}"
                    target="_blank"
                    rel="noopener"
                >

                    <div class="social-icon">
                        🎵
                    </div>

                    <h3>
                        ${escapeHTML(channel.name)}
                    </h3>

                    <p>
                        TikTok-Kanal
                    </p>

                    <span>
                        TikTok öffnen →
                    </span>

                </a>

            `;

        }
    );


    if (
        websiteData.discord.length === 0 &&
        websiteData.youtube.length === 0 &&
        websiteData.tiktok.length === 0
    ) {

        container.innerHTML = `

            <div class="social-card">

                <div class="social-icon">
                    🌐
                </div>

                <h3>
                    Unsere Social Media
                </h3>

                <p>
                    Die Owner haben noch keine
                    Social-Media-Kanäle eingetragen.
                </p>

            </div>

        `;

    }

}


// =====================================================
// WUNSCH HINZUFÜGEN
// =====================================================

function addWish() {

    const input =
        document.getElementById(
            "wishInput"
        );


    const text =
        input.value.trim();


    if (!text) {

        alert(
            "Bitte zuerst einen Wunsch eingeben."
        );

        return;

    }


    websiteData.wishes.unshift({

        text: text,

        date:
            new Date().toLocaleString(
                "de-DE"
            )

    });


    saveData();


    input.value = "";


    loadWishlist();

    loadAdminLists();

}


// =====================================================
// WUNSCHLISTE
// =====================================================

function loadWishlist() {

    const container =
        document.getElementById(
            "wishlist"
        );


    container.innerHTML = "";


    if (
        websiteData.wishes.length === 0
    ) {

        container.innerHTML = `

            <div class="wish">

                💡 Noch keine Wünsche vorhanden.

            </div>

        `;

        return;

    }


    websiteData.wishes.forEach(
        function(wish) {

            container.innerHTML += `

                <div class="wish">

                    💡
                    ${escapeHTML(wish.text)}

                    <div class="wish-date">
                        ${escapeHTML(wish.date)}
                    </div>

                </div>

            `;

        }
    );

}


// =====================================================
// ALLE WÜNSCHE LÖSCHEN
// =====================================================

function deleteAllWishes() {

    if (
        !confirm(
            "Wirklich alle Wünsche löschen?"
        )
    ) {

        return;

    }


    websiteData.wishes = [];

    saveData();

    loadWishlist();

    loadAdminLists();

}


// =====================================================
// ADMIN LISTEN
// =====================================================

function loadAdminLists() {

    const youtube =
        document.getElementById(
            "adminYoutubeList"
        );


    youtube.innerHTML = "";


    websiteData.youtube.forEach(
        function(channel, index) {

            youtube.innerHTML += `

                <div class="admin-item">

                    <div class="admin-item-info">

                        <strong>
                            ▶️
                            ${escapeHTML(channel.name)}
                        </strong>

                        <small>
                            ${escapeHTML(channel.link)}
                        </small>

                    </div>

                    <button
                        class="delete-button"
                        onclick="deleteYouTube(${index})"
                    >
                        Löschen
                    </button>

                </div>

            `;

        }
    );


    const tiktok =
        document.getElementById(
            "adminTiktokList"
        );


    tiktok.innerHTML = "";


    websiteData.tiktok.forEach(
        function(channel, index) {

            tiktok.innerHTML += `

                <div class="admin-item">

                    <div class="admin-item-info">

                        <strong>
                            🎵
                            ${escapeHTML(channel.name)}
                        </strong>

                        <small>
                            ${escapeHTML(channel.link)}
                        </small>

                    </div>

                    <button
                        class="delete-button"
                        onclick="deleteTikTok(${index})"
                    >
                        Löschen
                    </button>

                </div>

            `;

        }
    );


    const wishes =
        document.getElementById(
            "adminWishList"
        );


    wishes.innerHTML = "";


    websiteData.wishes.forEach(
        function(wish) {

            wishes.innerHTML += `

                <div class="admin-item">

                    <div class="admin-item-info">

                        <strong>
                            💡
                            ${escapeHTML(wish.text)}
                        </strong>

                        <small>
                            ${escapeHTML(wish.date)}
                        </small>

                    </div>

                </div>

            `;

        }
    );

}


// =====================================================
// SICHERHEIT: HTML TEXT ENTSCHÄRFEN
// =====================================================

function escapeHTML(text) {

    const div =
        document.createElement(
            "div"
        );

    div.textContent = text;

    return div.innerHTML;

}
