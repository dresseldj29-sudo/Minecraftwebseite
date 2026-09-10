/* =========================================================
   MINECRAFT SERVER WEBSEITE
   KOMPLETTES OWNER SYSTEM
   ========================================================= */


/* =========================================================
   🔐 OWNER LOGIN DATEN
   =========================================================

   HIER TRÄGST DU DEINE LOGIN-DATEN EIN.

   Beispiel:

   const OWNER_EMAIL = "deineemail@gmail.com";
   const OWNER_PASSWORD = "DeinPasswort123";

   ⚠️ NICHT dein echtes Gmail-Passwort benutzen.
   GitHub Pages kann JavaScript öffentlich anzeigen.
========================================================= */

const OWNER_EMAIL = "deineemail@gmail.com";

const OWNER_PASSWORD = "DeinPasswort123";


/* =========================================================
   STANDARD WEBSEITEN-DATEN
========================================================= */

const defaultData = {

    domain: "play.deinserver.de",

    status: "online",

    players: 0,

    social: [

        {
            type: "YouTube",
            url: "https://youtube.com/",
            title: "YouTube",
            description: "Unsere Videos"
        },

        {
            type: "TikTok",
            url: "https://tiktok.com/",
            title: "TikTok",
            description: "Unsere TikToks"
        },

        {
            type: "Discord",
            url: "https://discord.com/",
            title: "Discord",
            description: "Unsere Community"
        }

    ],

    wishes: []

};


/* =========================================================
   DATEN LADEN
========================================================= */

let data = loadData();


function loadData() {

    try {

        const saved =
            localStorage.getItem(
                "minecraftServerWebsite"
            );

        if (saved) {

            const parsed =
                JSON.parse(saved);

            return {

                ...defaultData,

                ...parsed,

                social:
                    Array.isArray(parsed.social)
                        ? parsed.social
                        : defaultData.social,

                wishes:
                    Array.isArray(parsed.wishes)
                        ? parsed.wishes
                        : []

            };

        }

    }

    catch (error) {

        console.error(
            "Fehler beim Laden der Daten:",
            error
        );

    }


    return {

        ...defaultData,

        social:
            [...defaultData.social],

        wishes: []

    };

}


/* =========================================================
   DATEN SPEICHERN
========================================================= */

function saveData() {

    try {

        localStorage.setItem(
            "minecraftServerWebsite",
            JSON.stringify(data)
        );

        return true;

    }

    catch (error) {

        console.error(
            "Fehler beim Speichern:",
            error
        );

        return false;

    }

}


/* =========================================================
   SEITE STARTEN
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        updateWebsite();

        loadOwnerFields();

        loadAdminSocial();

        loadWishlist();

        setupLoginEvents();

    }
);


/* =========================================================
   WEBSITE AKTUALISIEREN
========================================================= */

function updateWebsite() {

    updateDomain();

    updatePlayerCount();

    updateStatus();

    updateSocial();

}


/* =========================================================
   DOMAIN
========================================================= */

function updateDomain() {

    const domain =
        document.getElementById(
            "serverDomain"
        );

    if (!domain) return;


    domain.textContent =
        data.domain || "play.deinserver.de";

}


/* =========================================================
   SPIELERANZAHL
========================================================= */

function updatePlayerCount() {

    const playerCount =
        document.getElementById(
            "playerCount"
        );

    if (!playerCount) return;


    playerCount.textContent =
        Number(data.players) || 0;

}


/* =========================================================
   SERVER STATUS
========================================================= */

function updateStatus() {

    const icon =
        document.getElementById(
            "statusIcon"
        );

    const title =
        document.getElementById(
            "statusTitle"
        );

    const description =
        document.getElementById(
            "statusDescription"
        );


    if (
        !icon ||
        !title ||
        !description
    ) {

        return;

    }


    if (data.status === "online") {

        icon.textContent = "🟢";

        title.textContent =
            "Server ist online";

        description.textContent =
            "Unser Minecraft Server ist momentan erreichbar.";

    }

    else if (
        data.status === "offline"
    ) {

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
            "Der Minecraft Server wird momentan gewartet.";

    }

}


/* =========================================================
   SOCIAL MEDIA ANZEIGEN
========================================================= */

function updateSocial() {

    const container =
        document.getElementById(
            "socialLinks"
        );


    if (!container) return;


    container.innerHTML = "";


    if (
        !Array.isArray(data.social) ||
        data.social.length === 0
    ) {

        container.innerHTML = `

            <div class="social-card">

                <div class="social-icon">
                    🔗
                </div>

                <h3>
                    Keine Kanäle
                </h3>

                <p>
                    Der Owner hat noch keine Kanäle eingetragen.
                </p>

            </div>

        `;

        return;

    }


    data.social.forEach(
        function (social) {

            let icon = "🔗";


            if (
                social.type === "YouTube"
            ) {

                icon = "▶️";

            }

            else if (
                social.type === "TikTok"
            ) {

                icon = "🎵";

            }

            else if (
                social.type === "Discord"
            ) {

                icon = "💬";

            }


            const card =
                document.createElement(
                    "a"
                );


            card.className =
                "social-card";


            card.href =
                social.url || "#";


            card.target =
                "_blank";


            card.rel =
                "noopener noreferrer";


            card.innerHTML = `

                <div class="social-icon">
                    ${icon}
                </div>

                <h3>
                    ${escapeHTML(
                        social.title || social.type
                    )}
                </h3>

                <p>
                    ${escapeHTML(
                        social.description || ""
                    )}
                </p>

            `;


            container.appendChild(card);

        }
    );

}


/* =========================================================
   DOMAIN KOPIEREN
========================================================= */

function copyDomain() {

    const domain =
        data.domain || "play.deinserver.de";


    if (
        navigator.clipboard &&
        navigator.clipboard.writeText
    ) {

        navigator.clipboard
            .writeText(domain)
            .then(
                function () {

                    showMessage(
                        "✅ Server-Domain kopiert!"
                    );

                }
            )
            .catch(
                function () {

                    alert(
                        "Server-Domain:\n\n" +
                        domain
                    );

                }
            );

    }

    else {

        alert(
            "Server-Domain:\n\n" +
            domain
        );

    }

}


/* =========================================================
   🔐 LOGIN SYSTEM
========================================================= */


/* ---------------------------------------------------------
   LOGIN ÖFFNEN
--------------------------------------------------------- */

function openLogin() {

    const overlay =
        document.getElementById(
            "loginOverlay"
        );


    if (!overlay) {

        console.error(
            "loginOverlay wurde nicht gefunden!"
        );

        return;

    }


    overlay.classList.add(
        "active"
    );


    const email =
        document.getElementById(
            "ownerEmail"
        );


    const password =
        document.getElementById(
            "ownerPassword"
        );


    const error =
        document.getElementById(
            "loginError"
        );


    if (error) {

        error.textContent = "";

    }


    if (email) {

        email.value = "";

    }


    if (password) {

        password.value = "";

    }


    setTimeout(
        function () {

            if (email) {

                email.focus();

            }

        },
        150
    );

}


/* ---------------------------------------------------------
   LOGIN SCHLIESSEN
--------------------------------------------------------- */

function closeLogin() {

    const overlay =
        document.getElementById(
            "loginOverlay"
        );


    if (!overlay) return;


    overlay.classList.remove(
        "active"
    );

}


/* ---------------------------------------------------------
   OWNER LOGIN
--------------------------------------------------------- */

function ownerLogin() {

    const emailInput =
        document.getElementById(
            "ownerEmail"
        );


    const passwordInput =
        document.getElementById(
            "ownerPassword"
        );


    const error =
        document.getElementById(
            "loginError"
        );


    if (
        !emailInput ||
        !passwordInput
    ) {

        console.error(
            "Login-Felder fehlen!"
        );

        return;

    }


    const enteredEmail =
        emailInput.value
            .trim()
            .toLowerCase();


    const enteredPassword =
        passwordInput.value;


    const correctEmail =
        String(
            OWNER_EMAIL
        )
        .trim()
        .toLowerCase();


    const correctPassword =
        String(
            OWNER_PASSWORD
        );


    if (
        enteredEmail === correctEmail &&
        enteredPassword === correctPassword
    ) {

        if (error) {

            error.textContent = "";

        }


        /* Login merken */

        sessionStorage.setItem(
            "ownerLoggedIn",
            "true"
        );


        closeLogin();

        openOwnerPanel();

    }

    else {

        if (error) {

            error.innerHTML =
                "❌ E-Mail oder Passwort ist falsch.";

        }


        passwordInput.value = "";

        passwordInput.focus();

    }

}


/* ---------------------------------------------------------
   OWNER PANEL ÖFFNEN
--------------------------------------------------------- */

function openOwnerPanel() {

    const panel =
        document.getElementById(
            "ownerPanel"
        );


    if (!panel) {

        console.error(
            "ownerPanel wurde nicht gefunden!"
        );

        return;

    }


    panel.classList.add(
        "active"
    );


    loadOwnerFields();

    loadAdminSocial();

    loadWishlist();

}


/* ---------------------------------------------------------
   OWNER PANEL SCHLIESSEN
--------------------------------------------------------- */

function closeOwnerPanel() {

    const panel =
        document.getElementById(
            "ownerPanel"
        );


    if (!panel) return;


    panel.classList.remove(
        "active"
    );

}


/* ---------------------------------------------------------
   LOGOUT
--------------------------------------------------------- */

function ownerLogout() {

    sessionStorage.removeItem(
        "ownerLoggedIn"
    );


    closeOwnerPanel();


    showMessage(
        "Du wurdest ausgeloggt."
    );

}


/* =========================================================
   LOGIN EVENTS
========================================================= */

function setupLoginEvents() {


    /* Enter-Taste */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Enter"
            ) {

                const overlay =
                    document.getElementById(
                        "loginOverlay"
                    );


                if (
                    overlay &&
                    overlay.classList.contains(
                        "active"
                    )
                ) {

                    ownerLogin();

                }

            }


            /* ESC */

            if (
                event.key === "Escape"
            ) {

                const overlay =
                    document.getElementById(
                        "loginOverlay"
                    );


                if (
                    overlay &&
                    overlay.classList.contains(
                        "active"
                    )
                ) {

                    closeLogin();

                }

            }

        }
    );


    /* Klick auf dunklen Hintergrund */

    const overlay =
        document.getElementById(
            "loginOverlay"
        );


    if (overlay) {

        overlay.addEventListener(
            "click",
            function (event) {

                if (
                    event.target === overlay
                ) {

                    closeLogin();

                }

            }
        );

    }

}


/* =========================================================
   OWNER FELDER LADEN
========================================================= */

function loadOwnerFields() {

    const domainInput =
        document.getElementById(
            "domainInput"
        );


    const statusInput =
        document.getElementById(
            "statusInput"
        );


    const playersInput =
        document.getElementById(
            "playersInput"
        );


    if (domainInput) {

        domainInput.value =
            data.domain || "";

    }


    if (statusInput) {

        statusInput.value =
            data.status || "online";

    }


    if (playersInput) {

        playersInput.value =
            Number(data.players) || 0;

    }

}


/* =========================================================
   SERVER SPEICHERN
========================================================= */

function saveServer() {

    const domainInput =
        document.getElementById(
            "domainInput"
        );


    const statusInput =
        document.getElementById(
            "statusInput"
        );


    const playersInput =
        document.getElementById(
            "playersInput"
        );


    if (
        !domainInput ||
        !statusInput ||
        !playersInput
    ) {

        alert(
            "❌ Server-Felder wurden nicht gefunden."
        );

        return;

    }


    let domain =
        domainInput.value.trim();


    if (!domain) {

        domain =
            "play.deinserver.de";

    }


    let players =
        Number(
            playersInput.value
        );


    if (
        !Number.isFinite(players) ||
        players < 0
    ) {

        players = 0;

    }


    data.domain =
        domain;


    data.status =
        statusInput.value;


    data.players =
        Math.floor(players);


    saveData();

    updateWebsite();


    showMessage(
        "✅ Server-Einstellungen gespeichert!"
    );

}


/* =========================================================
   SOCIAL ADMIN
========================================================= */

function loadAdminSocial() {

    const container =
        document.getElementById(
            "adminSocialList"
        );


    if (!container) return;


    container.innerHTML = "";


    data.social.forEach(
        function (social, index) {

            createSocialAdminRow(
                social,
                index
            );

        }
    );

}


/* =========================================================
   SOCIAL ADMIN ZEILE
========================================================= */

function createSocialAdminRow(
    social,
    index
) {

    const container =
        document.getElementById(
            "adminSocialList"
        );


    if (!container) return;


    const row =
        document.createElement(
            "div"
        );


    row.className =
        "social-admin-row";


    const select =
        document.createElement(
            "select"
        );


    select.innerHTML = `

        <option value="YouTube">
            YouTube
        </option>

        <option value="TikTok">
            TikTok
        </option>

        <option value="Discord">
            Discord
        </option>

    `;


    select.value =
        social.type || "YouTube";


    const input =
        document.createElement(
            "input"
        );


    input.type =
        "url";


    input.value =
        social.url || "";


    input.placeholder =
        "https://...";


    const remove =
        document.createElement(
            "button"
        );


    remove.className =
        "remove-social";


    remove.textContent =
        "×";


    remove.type =
        "button";


    remove.onclick =
        function () {

            removeSocial(index);

        };


    row.appendChild(
        select
    );


    row.appendChild(
        input
    );


    row.appendChild(
        remove
    );


    container.appendChild(
        row
    );

}


/* =========================================================
   SOCIAL LINK HINZUFÜGEN
========================================================= */

function addSocialLink() {

    data.social.push({

        type: "YouTube",

        url: "",

        title: "YouTube",

        description:
            "Unser YouTube Kanal"

    });


    loadAdminSocial();

}


/* =========================================================
   SOCIAL LINK LÖSCHEN
========================================================= */

function removeSocial(index) {

    if (
        index < 0 ||
        index >= data.social.length
    ) {

        return;

    }


    data.social.splice(
        index,
        1
    );


    loadAdminSocial();

}


/* =========================================================
   SOCIAL LINKS SPEICHERN
========================================================= */

function saveSocialLinks() {

    const rows =
        document.querySelectorAll(
            ".social-admin-row"
        );


    const newSocial = [];


    rows.forEach(
        function (row) {

            const select =
                row.querySelector(
                    "select"
                );


            const input =
                row.querySelector(
                    "input"
                );


            if (
                !select ||
                !input
            ) {

                return;

            }


            const type =
                select.value;


            const url =
                input.value.trim();


            if (!url) {

                return;

            }


            let title =
                type;


            let description =
                "Unser " +
                type +
                " Kanal";


            if (
                type === "YouTube"
            ) {

                title =
                    "YouTube";

                description =
                    "Unsere YouTube Videos";

            }


            else if (
                type === "TikTok"
            ) {

                title =
                    "TikTok";

                description =
                    "Unsere TikTok Videos";

            }


            else if (
                type === "Discord"
            ) {

                title =
                    "Discord";

                description =
                    "Unsere Discord Community";

            }


            newSocial.push({

                type:
                    type,

                url:
                    url,

                title:
                    title,

                description:
                    description

            });

        }
    );


    data.social =
        newSocial;


    saveData();

    updateSocial();


    showMessage(
        "✅ Social-Media-Kanäle gespeichert!"
    );

}


/* =========================================================
   WUNSCHLISTE
========================================================= */

function setupWishlist() {

    const form =
        document.getElementById(
            "wishlistForm"
        );


    if (!form) return;


    form.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const name =
                document
                    .getElementById(
                        "wishName"
                    )
                    .value
                    .trim();


            const title =
                document
                    .getElementById(
                        "wishTitle"
                    )
                    .value
                    .trim();


            const text =
                document
                    .getElementById(
                        "wishText"
                    )
                    .value
                    .trim();


            if (
                !name ||
                !title ||
                !text
            ) {

                return;

            }


            data.wishes.push({

                id:
                    Date.now(),

                name:
                    name,

                title:
                    title,

                text:
                    text,

                date:
                    new Date()
                        .toLocaleString(
                            "de-DE"
                        )

            });


            saveData();


            form.reset();


            const message =
                document.getElementById(
                    "wishlistMessage"
                );


            if (message) {

                message.textContent =
                    "✅ Dein Wunsch wurde erfolgreich abgesendet!";

            }


            loadWishlist();

        }
    );

}


/* =========================================================
   WUNSCHLISTE LADEN
========================================================= */

function loadWishlist() {

    const container =
        document.getElementById(
            "adminWishlist"
        );


    if (!container) return;


    if (
        !Array.isArray(
            data.wishes
        ) ||
        data.wishes.length === 0
    ) {

        container.innerHTML = `

            <p>
                ⭐ Noch keine Spieler-Wünsche vorhanden.
            </p>

        `;

        return;

    }


    container.innerHTML = "";


    data.wishes.forEach(
        function (wish) {

            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "wish-card";


            card.innerHTML = `

                <h4>
                    ⭐ ${escapeHTML(
                        wish.title
                    )}
                </h4>

                <p>
                    <strong>
                        Spieler:
                    </strong>

                    ${escapeHTML(
                        wish.name
                    )}
                </p>

                <p>
                    <strong>
                        Datum:
                    </strong>

                    ${escapeHTML(
                        wish.date
                    )}
                </p>

                <p>
                    ${escapeHTML(
                        wish.text
                    )}
                </p>

                <button
                    class="wish-delete"
                    onclick="deleteWish(${wish.id})">

                    🗑 WUNSCH LÖSCHEN

                </button>

            `;


            container.appendChild(
                card
            );

        }
    );

}


/* =========================================================
   WUNSCH LÖSCHEN
========================================================= */

function deleteWish(id) {

    data.wishes =
        data.wishes.filter(
            function (wish) {

                return wish.id !== id;

            }
        );


    saveData();

    loadWishlist();


    showMessage(
        "✅ Wunsch gelöscht!"
    );

}


/* =========================================================
   ALLE WÜNSCHE LÖSCHEN
========================================================= */

function clearWishlist() {

    if (
        data.wishes.length === 0
    ) {

        showMessage(
            "Es gibt keine Wünsche."
        );

        return;

    }


    const confirmed =
        confirm(
            "⚠️ Wirklich ALLE Spieler-Wünsche löschen?"
        );


    if (!confirmed) {

        return;

    }


    data.wishes = [];


    saveData();

    loadWishlist();


    showMessage(
        "🗑 Alle Wünsche wurden gelöscht."
    );

}


/* =========================================================
   ALLES SPEICHERN
========================================================= */

function saveEverything() {

    saveServer();

    saveSocialLinks();

}


/* =========================================================
   HTML SICHER MACHEN
========================================================= */

function escapeHTML(value) {

    return String(
        value ?? ""
    )

        .replaceAll(
            "&",
            "&amp;"
        )

        .replaceAll(
            "<",
            "&lt;"
        )

        .replaceAll(
            ">",
            "&gt;"
        )

        .replaceAll(
            '"',
            "&quot;"
        )

        .replaceAll(
            "'",
            "&#039;"
        );

}


/* =========================================================
   NACHRICHT
========================================================= */

function showMessage(text) {

    console.log(
        text
    );

}


/* =========================================================
   WUNSCHLISTE AKTIVIEREN
========================================================= */

if (
    document.readyState ===
    "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        setupWishlist
    );

}

else {

    setupWishlist();

}
