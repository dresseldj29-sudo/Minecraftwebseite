/* =========================================================
   MINECRAFT SERVER WEBSEITE
   OWNER SYSTEM - KOMPLETTE VERSION
   =========================================================

   WICHTIG:
   Das ist eine GitHub-Pages-Version.

   Die Zugangsdaten sind im Browser-Code sichtbar.
   Deshalb NIEMALS dein echtes Gmail-Passwort verwenden.

   Verwende:
   - deine Owner-E-Mail
   - ein eigenes Website-Passwort
   ========================================================= */


/* =========================================================
   OWNER ZUGANGSDATEN
   =========================================================

   HIER EINTRAGEN:

   OWNER_EMAIL:
   Deine E-Mail, mit der du dich auf der Webseite anmelden
   möchtest.

   OWNER_PASSWORD:
   Ein eigenes Passwort NUR für diese Webseite.

   NICHT dein Gmail-Passwort!
   ========================================================= */

const OWNER_EMAIL = "ServerOwner@gmail.com";

const OWNER_PASSWORD = "Server";


/* =========================================================
   EINSTELLUNGEN
   ========================================================= */

const STORAGE_KEY =
    "minecraftServerWebsite_V4";

const LOGIN_KEY =
    "minecraftOwnerLogin_V4";


/* =========================================================
   STANDARD-DATEN
   ========================================================= */

const DEFAULT_DATA = {

    domain:
        "play.deinserver.de",

    status:
        "online",

    players:
        0,

    social: [

        {
            type:
                "YouTube",

            url:
                "https://youtube.com/",

            title:
                "YouTube",

            description:
                "Unsere YouTube Videos"
        },

        {
            type:
                "TikTok",

            url:
                "https://tiktok.com/",

            title:
                "TikTok",

            description:
                "Unsere TikTok Videos"
        },

        {
            type:
                "Discord",

            url:
                "https://discord.com/",

            title:
                "Discord",

            description:
                "Unsere Discord Community"
        }

    ],

    wishes:
        []

};


/* =========================================================
   SICHER DATEN LADEN
   ========================================================= */

function loadData() {

    try {

        const saved =
            localStorage.getItem(
                STORAGE_KEY
            );


        if (!saved) {

            return cloneDefaultData();

        }


        const parsed =
            JSON.parse(saved);


        return {

            ...cloneDefaultData(),

            ...parsed,

            social:
                Array.isArray(parsed.social)
                    ? parsed.social
                    : cloneDefaultData().social,

            wishes:
                Array.isArray(parsed.wishes)
                    ? parsed.wishes
                    : []

        };

    }

    catch (error) {

        console.error(
            "Daten konnten nicht geladen werden:",
            error
        );


        return cloneDefaultData();

    }

}


/* =========================================================
   STANDARD DATEN KOPIEREN
   ========================================================= */

function cloneDefaultData() {

    return JSON.parse(
        JSON.stringify(
            DEFAULT_DATA
        )
    );

}


/* =========================================================
   DATEN
   ========================================================= */

let data =
    loadData();


/* =========================================================
   DATEN SPEICHERN
   ========================================================= */

function saveData() {

    try {

        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(data)
        );


        return true;

    }

    catch (error) {

        console.error(
            "Daten konnten nicht gespeichert werden:",
            error
        );


        return false;

    }

}


/* =========================================================
   DOM BEREIT
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

    const domain =
        document.getElementById(
            "serverDomain"
        );


    const players =
        document.getElementById(
            "playerCount"
        );


    if (domain) {

        domain.textContent =
            data.domain;

    }


    if (players) {

        players.textContent =
            data.players;

    }


    updateStatus();

    updateSocial();

}


/* =========================================================
   SERVERSTATUS
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


    if (
        data.status === "online"
    ) {

        icon.textContent =
            "🟢";

        title.textContent =
            "Server ist online";

        description.textContent =
            "Unser Minecraft Server ist momentan erreichbar.";

        return;

    }


    if (
        data.status === "offline"
    ) {

        icon.textContent =
            "🔴";

        title.textContent =
            "Server ist offline";

        description.textContent =
            "Der Minecraft Server ist momentan nicht erreichbar.";

        return;

    }


    icon.textContent =
        "🟡";

    title.textContent =
        "Server ist in Wartung";

    description.textContent =
        "Der Minecraft Server wird momentan gewartet.";

}


/* =========================================================
   SOCIAL MEDIA
   ========================================================= */

function updateSocial() {

    const container =
        document.getElementById(
            "socialLinks"
        );


    if (!container) {

        return;

    }


    container.innerHTML = "";


    if (
        !Array.isArray(
            data.social
        )
    ) {

        return;

    }


    data.social.forEach(
        function (social) {

            if (!social) {

                return;

            }


            let icon =
                "🔗";


            if (
                social.type === "YouTube"
            ) {

                icon =
                    "▶️";

            }


            else if (
                social.type === "TikTok"
            ) {

                icon =
                    "🎵";

            }


            else if (
                social.type === "Discord"
            ) {

                icon =
                    "💬";

            }


            const card =
                document.createElement(
                    "a"
                );


            card.className =
                "social-card";


            card.href =
                isValidHttpUrl(
                    social.url
                )
                    ? social.url
                    : "#";


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
                        social.title ||
                        social.type ||
                        "Kanal"
                    )}
                </h3>

                <p>
                    ${escapeHTML(
                        social.description ||
                        ""
                    )}
                </p>

            `;


            container.appendChild(
                card
            );

        }
    );

}


/* =========================================================
   URL PRÜFEN
   ========================================================= */

function isValidHttpUrl(
    value
) {

    try {

        const url =
            new URL(value);


        return (
            url.protocol ===
                "http:" ||
            url.protocol ===
                "https:"
        );

    }

    catch {

        return false;

    }

}


/* =========================================================
   DOMAIN KOPIEREN
   ========================================================= */

function copyDomain() {

    const domain =
        String(
            data.domain || ""
        );


    if (!domain) {

        return;

    }


    if (
        navigator.clipboard &&
        window.isSecureContext
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

                    fallbackCopy(
                        domain
                    );

                }
            );

    }

    else {

        fallbackCopy(
            domain
        );

    }

}


/* =========================================================
   ALTERNATIVE KOPIER-FUNKTION
   ========================================================= */

function fallbackCopy(
    text
) {

    const input =
        document.createElement(
            "textarea"
        );


    input.value =
        text;


    input.style.position =
        "fixed";


    input.style.left =
        "-9999px";


    document.body.appendChild(
        input
    );


    input.select();


    try {

        document.execCommand(
            "copy"
        );


        showMessage(
            "✅ Server-Domain kopiert!"
        );

    }

    catch {

        alert(
            "Server-Domain: " +
            text
        );

    }


    input.remove();

}


/* =========================================================
   LOGIN EVENTS
   ========================================================= */

function setupLoginEvents() {

    const email =
        document.getElementById(
            "ownerEmail"
        );


    const password =
        document.getElementById(
            "ownerPassword"
        );


    if (email) {

        email.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key ===
                    "Enter"
                ) {

                    ownerLogin();

                }

            }
        );

    }


    if (password) {

        password.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key ===
                    "Enter"
                ) {

                    ownerLogin();

                }

            }
        );

    }


    const overlay =
        document.getElementById(
            "loginOverlay"
        );


    if (overlay) {

        overlay.addEventListener(
            "click",
            function (event) {

                if (
                    event.target ===
                    overlay
                ) {

                    closeLogin();

                }

            }
        );

    }

}


/* =========================================================
   LOGIN ÖFFNEN
========================================================= */

function openLogin() {

    const overlay =
        document.getElementById(
            "loginOverlay"
        );


    if (!overlay) {

        return;

    }


    overlay.classList.add(
        "active"
    );


    clearLoginError();


    const email =
        document.getElementById(
            "ownerEmail"
        );


    if (email) {

        setTimeout(
            function () {

                email.focus();

            },
            100
        );

    }

}


/* =========================================================
   LOGIN SCHLIESSEN
========================================================= */

function closeLogin() {

    const overlay =
        document.getElementById(
            "loginOverlay"
        );


    if (overlay) {

        overlay.classList.remove(
            "active"
        );

    }


    const password =
        document.getElementById(
            "ownerPassword"
        );


    if (password) {

        password.value =
            "";

    }


    clearLoginError();

}


/* =========================================================
   LOGIN FEHLER LÖSCHEN
========================================================= */

function clearLoginError() {

    const error =
        document.getElementById(
            "loginError"
        );


    if (error) {

        error.textContent =
            "";

    }

}


/* =========================================================
   OWNER LOGIN
========================================================= */

function ownerLogin() {

    const emailElement =
        document.getElementById(
            "ownerEmail"
        );


    const passwordElement =
        document.getElementById(
            "ownerPassword"
        );


    const errorElement =
        document.getElementById(
            "loginError"
        );


    if (
        !emailElement ||
        !passwordElement
    ) {

        return;

    }


    const email =
        emailElement.value
            .trim()
            .toLowerCase();


    const password =
        passwordElement.value;


    const correctEmail =
        OWNER_EMAIL
            .trim()
            .toLowerCase();


    const correctPassword =
        OWNER_PASSWORD;


    if (
        email === "" ||
        password === ""
    ) {

        if (errorElement) {

            errorElement.textContent =
                "❌ Bitte E-Mail und Passwort eingeben.";

        }


        return;

    }


    if (
        email === correctEmail &&
        password === correctPassword
    ) {

        /* =========================================
           LOGIN ERFOLGREICH
        ========================================= */

        localStorage.setItem(
            LOGIN_KEY,
            "true"
        );


        if (errorElement) {

            errorElement.textContent =
                "";

        }


        closeLogin();


        openOwnerPanel();


        loadOwnerFields();

        loadAdminSocial();

        loadWishlist();


        showMessage(
            "✅ Erfolgreich als Owner angemeldet!"
        );


        return;

    }


    /* =============================================
       LOGIN FALSCH
    ============================================= */

    if (errorElement) {

        errorElement.textContent =
            "❌ E-Mail oder Passwort ist falsch.";

    }


    passwordElement.value =
        "";


    passwordElement.focus();

}


/* =========================================================
   OWNER PANEL ÖFFNEN
========================================================= */

function openOwnerPanel() {

    const panel =
        document.getElementById(
            "ownerPanel"
        );


    if (!panel) {

        return;

    }


    panel.classList.add(
        "active"
    );


    document.body.style.overflow =
        "hidden";


    loadOwnerFields();

    loadAdminSocial();

    loadWishlist();

}


/* =========================================================
   OWNER PANEL SCHLIESSEN
========================================================= */

function closeOwnerPanel() {

    const panel =
        document.getElementById(
            "ownerPanel"
        );


    if (panel) {

        panel.classList.remove(
            "active"
        );

    }


    document.body.style.overflow =
        "";


    logoutOwner();

}


/* =========================================================
   OWNER ABMELDEN
========================================================= */

function logoutOwner() {

    localStorage.removeItem(
        LOGIN_KEY
    );

}


/* =========================================================
   OWNER FELDER LADEN
========================================================= */

function loadOwnerFields() {

    const domain =
        document.getElementById(
            "domainInput"
        );


    const status =
        document.getElementById(
            "statusInput"
        );


    const players =
        document.getElementById(
            "playersInput"
        );


    if (domain) {

        domain.value =
            data.domain;

    }


    if (status) {

        status.value =
            data.status;

    }


    if (players) {

        players.value =
            data.players;

    }

}


/* =========================================================
   SERVER SPEICHERN
========================================================= */

function saveServer() {

    const domain =
        document.getElementById(
            "domainInput"
        );


    const status =
        document.getElementById(
            "statusInput"
        );


    const players =
        document.getElementById(
            "playersInput"
        );


    if (
        !domain ||
        !status ||
        !players
    ) {

        return;

    }


    let playerNumber =
        Number(
            players.value
        );


    if (
        !Number.isFinite(
            playerNumber
        )
    ) {

        playerNumber =
            0;

    }


    playerNumber =
        Math.max(
            0,
            Math.floor(
                playerNumber
            )
        );


    data.domain =
        domain.value.trim();


    data.status =
        status.value;


    data.players =
        playerNumber;


    if (
        saveData()
    ) {

        updateWebsite();


        showMessage(
            "✅ Server-Einstellungen gespeichert!"
        );

    }

}


/* =========================================================
   SOCIAL ADMIN LADEN
========================================================= */

function loadAdminSocial() {

    const container =
        document.getElementById(
            "adminSocialList"
        );


    if (!container) {

        return;

    }


    container.innerHTML =
        "";


    if (
        !Array.isArray(
            data.social
        )
    ) {

        data.social =
            [];

    }


    data.social.forEach(
        function (
            social,
            index
        ) {

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


    if (!container) {

        return;

    }


    const row =
        document.createElement(
            "div"
        );


    row.className =
        "social-admin-row";


    const type =
        social.type ||
        "YouTube";


    const url =
        social.url ||
        "";


    row.innerHTML = `

        <select>

            <option value="YouTube"
                ${type === "YouTube"
                    ? "selected"
                    : ""}>
                YouTube
            </option>

            <option value="TikTok"
                ${type === "TikTok"
                    ? "selected"
                    : ""}>
                TikTok
            </option>

            <option value="Discord"
                ${type === "Discord"
                    ? "selected"
                    : ""}>
                Discord
            </option>

        </select>


        <input
            type="url"
            value="${escapeAttribute(url)}"
            placeholder="https://...">


        <button
            type="button"
            class="remove-social"
            onclick="removeSocial(${index})">

            ×

        </button>

    `;


    container.appendChild(
        row
    );

}


/* =========================================================
   SOCIAL LINK HINZUFÜGEN
========================================================= */

function addSocialLink() {

    if (
        !Array.isArray(
            data.social
        )
    ) {

        data.social =
            [];

    }


    data.social.push({

        type:
            "YouTube",

        url:
            "",

        title:
            "YouTube",

        description:
            "Unser YouTube Kanal"

    });


    loadAdminSocial();

}


/* =========================================================
   SOCIAL LINK LÖSCHEN
========================================================= */

function removeSocial(
    index
) {

    if (
        !Array.isArray(
            data.social
        )
    ) {

        return;

    }


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

    const container =
        document.getElementById(
            "adminSocialList"
        );


    if (!container) {

        return;

    }


    const rows =
        container.querySelectorAll(
            ".social-admin-row"
        );


    const newSocial =
        [];


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


            if (
                !url
            ) {

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


    if (
        saveData()
    ) {

        updateSocial();


        showMessage(
            "✅ Social-Media-Links gespeichert!"
        );

    }

}


/* =========================================================
   WUNSCHLISTE ABSENDEN
========================================================= */

function setupWishlist() {

    const form =
        document.getElementById(
            "wishlistForm"
        );


    if (!form) {

        return;

    }


    form.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const name =
                document.getElementById(
                    "wishName"
                );


            const title =
                document.getElementById(
                    "wishTitle"
                );


            const text =
                document.getElementById(
                    "wishText"
                );


            if (
                !name ||
                !title ||
                !text
            ) {

                return;

            }


            const nameValue =
                name.value.trim();


            const titleValue =
                title.value.trim();


            const textValue =
                text.value.trim();


            if (
                !nameValue ||
                !titleValue ||
                !textValue
            ) {

                return;

            }


            if (
                !Array.isArray(
                    data.wishes
                )
            ) {

                data.wishes =
                    [];

            }


            data.wishes.push({

                id:
                    Date.now(),

                name:
                    nameValue,

                title:
                    titleValue,

                text:
                    textValue,

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
   WUNSCHLISTE STARTEN
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        setupWishlist();

    }
);


/* =========================================================
   WÜNSCHE IM OWNER PANEL
========================================================= */

function loadWishlist() {

    const container =
        document.getElementById(
            "adminWishlist"
        );


    if (!container) {

        return;

    }


    container.innerHTML =
        "";


    if (
        !Array.isArray(
            data.wishes
        ) ||
        data.wishes.length === 0
    ) {

        container.innerHTML = `

            <p>
                ⭐ Noch keine Wünsche vorhanden.
            </p>

        `;

        return;

    }


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
                    type="button"
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
   EINEN WUNSCH LÖSCHEN
========================================================= */

function deleteWish(
    id
) {

    if (
        !Array.isArray(
            data.wishes
        )
    ) {

        return;

    }


    data.wishes =
        data.wishes.filter(
            function (wish) {

                return (
                    wish.id !== id
                );

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
        !Array.isArray(
            data.wishes
        ) ||
        data.wishes.length === 0
    ) {

        showMessage(
            "Keine Wünsche vorhanden."
        );

        return;

    }


    const confirmed =
        confirm(
            "Wirklich ALLE Spieler-Wünsche löschen?"
        );


    if (!confirmed) {

        return;

    }


    data.wishes =
        [];


    saveData();

    loadWishlist();


    showMessage(
        "✅ Alle Wünsche wurden gelöscht!"
    );

}


/* =========================================================
   ALLES SPEICHERN
========================================================= */

function saveEverything() {

    saveServer();

    saveSocialLinks();

    loadWishlist();


    showMessage(
        "✅ Alle Änderungen wurden gespeichert!"
    );

}


/* =========================================================
   ESC = LOGIN/PANEL SCHLIESSEN
========================================================= */

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key !==
            "Escape"
        ) {

            return;

        }


        const login =
            document.getElementById(
                "loginOverlay"
            );


        if (
            login &&
            login.classList.contains(
                "active"
            )
        ) {

            closeLogin();

            return;

        }


        const panel =
            document.getElementById(
                "ownerPanel"
            );


        if (
            panel &&
            panel.classList.contains(
                "active"
            )
        ) {

            closeOwnerPanel();

        }

    }
);


/* =========================================================
   HTML SICHER AUSGEBEN
========================================================= */

function escapeHTML(
    value
) {

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
   ATTRIBUTE SICHER AUSGEBEN
========================================================= */

function escapeAttribute(
    value
) {

    return String(
        value ?? ""
    )

        .replaceAll(
            "&",
            "&amp;"
        )

        .replaceAll(
            '"',
            "&quot;"
        )

        .replaceAll(
            "<",
            "&lt;"
        )

        .replaceAll(
            ">",
            "&gt;"
        );

}


/* =========================================================
   NACHRICHT ANZEIGEN
========================================================= */

function showMessage(
    message
) {

    /* Kleine Nachricht */
    console.log(
        message
    );


    /* Wenn es keinen sichtbaren Bereich gibt,
       verwenden wir eine kurze Meldung. */

    const existing =
        document.querySelector(
            ".website-message"
        );


    if (existing) {

        existing.textContent =
            message;

        existing.classList.add(
            "show"
        );


        setTimeout(
            function () {

                existing.classList.remove(
                    "show"
                );

            },
            2500
        );


        return;

    }


    const box =
        document.createElement(
            "div"
        );


    box.className =
        "website-message";


    box.textContent =
        message;


    box.style.position =
        "fixed";


    box.style.left =
        "50%";


    box.style.bottom =
        "30px";


    box.style.transform =
        "translateX(-50%)";


    box.style.zIndex =
        "99999";


    box.style.padding =
        "14px 22px";


    box.style.borderRadius =
        "12px";


    box.style.background =
        "rgba(5,15,25,0.95)";


    box.style.color =
        "white";


    box.style.border =
        "1px solid rgba(0,160,255,0.4)";


    box.style.boxShadow =
        "0 10px 40px rgba(0,0,0,0.4)";


    box.style.fontWeight =
        "800";


    document.body.appendChild(
        box
    );


    setTimeout(
        function () {

            box.remove();

        },
        2500
    );

}
