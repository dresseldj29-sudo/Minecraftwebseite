/* =========================================================
   MINECRAFT SERVER WEBSITE
   KOMPLETTES JAVASCRIPT
========================================================= */


/* =========================================================
   🔐 OWNER LOGIN
=========================================================

   HIER DEINE DATEN EINTRAGEN.

   WICHTIG:
   NICHT dein echtes Gmail-Passwort!

========================================================= */

const OWNER_EMAIL =
    "deine-email@gmail.com";


const OWNER_PASSWORD =
    "MeinOwnerPasswort123!";


/* =========================================================
   SPEICHER-NAMEN
========================================================= */

const DATA_KEY =
    "minecraft_server_data_v6";


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
                "https://www.youtube.com/",

            title:
                "YouTube",

            description:
                "Unsere YouTube Videos"
        },

        {
            type:
                "TikTok",

            url:
                "https://www.tiktok.com/",

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
   DATEN LADEN
========================================================= */

let data =
    loadData();


function loadData() {

    try {

        const saved =
            localStorage.getItem(
                DATA_KEY
            );


        if (!saved) {

            return JSON.parse(
                JSON.stringify(
                    DEFAULT_DATA
                )
            );

        }


        const parsed =
            JSON.parse(
                saved
            );


        return {

            ...DEFAULT_DATA,

            ...parsed,

            social:
                Array.isArray(
                    parsed.social
                )
                    ? parsed.social
                    : [],

            wishes:
                Array.isArray(
                    parsed.wishes
                )
                    ? parsed.wishes
                    : []

        };

    }

    catch (error) {

        console.error(
            "Fehler beim Laden:",
            error
        );


        return JSON.parse(
            JSON.stringify(
                DEFAULT_DATA
            )
        );

    }

}


/* =========================================================
   DATEN SPEICHERN
========================================================= */

function saveData() {

    localStorage.setItem(
        DATA_KEY,
        JSON.stringify(
            data
        )
    );

}


/* =========================================================
   SEITE STARTEN
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        updateWebsite();

        setupWishlist();

        setupLogin();

    }
);


/* =========================================================
   WEBSITE AKTUALISIEREN
========================================================= */

function updateWebsite() {

    updateServer();

    updateSocial();

}


/* =========================================================
   SERVER
========================================================= */

function updateServer() {

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
        data.status ===
        "online"
    ) {

        icon.textContent =
            "🟢";

        title.textContent =
            "Server ist online";

        description.textContent =
            "Unser Minecraft Server ist momentan erreichbar.";

    }


    else if (
        data.status ===
        "offline"
    ) {

        icon.textContent =
            "🔴";

        title.textContent =
            "Server ist offline";

        description.textContent =
            "Der Minecraft Server ist momentan nicht erreichbar.";

    }


    else {

        icon.textContent =
            "🟡";

        title.textContent =
            "Server ist in Wartung";

        description.textContent =
            "Der Minecraft Server wird momentan gewartet.";

    }

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


    container.innerHTML =
        "";


    data.social.forEach(
        function (
            item
        ) {

            if (
                !item.url
            ) {

                return;

            }


            let icon =
                "🔗";


            if (
                item.type ===
                "YouTube"
            ) {

                icon =
                    "▶️";

            }


            if (
                item.type ===
                "TikTok"
            ) {

                icon =
                    "🎵";

            }


            if (
                item.type ===
                "Discord"
            ) {

                icon =
                    "💬";

            }


            const link =
                document.createElement(
                    "a"
                );


            link.className =
                "social-card";


            link.href =
                item.url;


            link.target =
                "_blank";


            link.rel =
                "noopener noreferrer";


            link.innerHTML = `

                <div class="social-icon">
                    ${icon}
                </div>

                <h3>
                    ${escapeHTML(
                        item.title ||
                        item.type
                    )}
                </h3>

                <p>
                    ${escapeHTML(
                        item.description ||
                        ""
                    )}
                </p>

            `;


            container.appendChild(
                link
            );

        }
    );

}


/* =========================================================
   OWNER LOGIN
========================================================= */

function setupLogin() {

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

                    event.preventDefault();

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

                    event.preventDefault();

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
   LOGIN FENSTER ÖFFNEN
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


    const error =
        document.getElementById(
            "loginError"
        );


    if (error) {

        error.textContent =
            "";

    }


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
   LOGIN FENSTER SCHLIESSEN
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
   OWNER LOGIN PRÜFEN
========================================================= */

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

        return;

    }


    const email =
        emailInput.value
            .trim()
            .toLowerCase();


    const password =
        passwordInput.value;


    const correctEmail =
        OWNER_EMAIL
            .trim()
            .toLowerCase();


    if (
        email === "" ||
        password === ""
    ) {

        if (error) {

            error.textContent =
                "❌ Bitte beide Felder ausfüllen.";

        }

        return;

    }


    /* =====================================================
       HIER WIRD DER LOGIN GEPRÜFT
    ===================================================== */

    if (
        email ===
            correctEmail &&

        password ===
            OWNER_PASSWORD
    ) {

        /* LOGIN RICHTIG */

        closeLogin();

        openOwnerPanel();

        loadOwnerPanel();

        showToast(
            "✅ Owner Login erfolgreich!"
        );

        return;

    }


    /* LOGIN FALSCH */

    if (error) {

        error.textContent =
            "❌ E-Mail oder Passwort ist falsch.";

    }


    passwordInput.value =
        "";

    passwordInput.focus();

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

}


/* =========================================================
   OWNER PANEL LADEN
========================================================= */

function loadOwnerPanel() {

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


    loadAdminSocial();

    loadWishlist();

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


    saveData();

    updateWebsite();


    showToast(
        "✅ Server gespeichert!"
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


    if (!container) {

        return;

    }


    container.innerHTML =
        "";


    data.social.forEach(
        function (
            item,
            index
        ) {

            const row =
                document.createElement(
                    "div"
                );


            row.className =
                "social-admin-row";


            row.innerHTML = `

                <select>

                    <option value="YouTube"
                        ${
                            item.type ===
                            "YouTube"
                                ? "selected"
                                : ""
                        }>
                        YouTube
                    </option>

                    <option value="TikTok"
                        ${
                            item.type ===
                            "TikTok"
                                ? "selected"
                                : ""
                        }>
                        TikTok
                    </option>

                    <option value="Discord"
                        ${
                            item.type ===
                            "Discord"
                                ? "selected"
                                : ""
                        }>
                        Discord
                    </option>

                </select>


                <input
                    type="url"
                    value="${escapeAttribute(
                        item.url
                    )}"
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
    );

}


/* =========================================================
   SOCIAL HINZUFÜGEN
========================================================= */

function addSocialLink() {

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
   SOCIAL LÖSCHEN
========================================================= */

function removeSocial(
    index
) {

    if (
        index >= 0 &&
        index < data.social.length
    ) {

        data.social.splice(
            index,
            1
        );

    }


    loadAdminSocial();

}


/* =========================================================
   SOCIAL SPEICHERN
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


    const result =
        [];


    rows.forEach(
        function (
            row
        ) {

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


            result.push({

                type:
                    type,

                url:
                    url,

                title:
                    type,

                description:
                    getSocialDescription(
                        type
                    )

            });

        }
    );


    data.social =
        result;


    saveData();

    updateSocial();


    showToast(
        "✅ Social-Media-Links gespeichert!"
    );

}


/* =========================================================
   SOCIAL BESCHREIBUNG
========================================================= */

function getSocialDescription(
    type
) {

    if (
        type ===
        "YouTube"
    ) {

        return "Unsere YouTube Videos";

    }


    if (
        type ===
        "TikTok"
    ) {

        return "Unsere TikTok Videos";

    }


    if (
        type ===
        "Discord"
    ) {

        return "Unsere Discord Community";

    }


    return "Unser Kanal";

}


/* =========================================================
   WUNSCHLISTE
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
        function (
            event
        ) {

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


            const wish = {

                id:
                    Date.now(),

                name:
                    name.value.trim(),

                title:
                    title.value.trim(),

                text:
                    text.value.trim(),

                date:
                    new Date()
                        .toLocaleString(
                            "de-DE"
                        )

            };


            if (
                !wish.name ||
                !wish.title ||
                !wish.text
            ) {

                return;

            }


            data.wishes.push(
                wish
            );


            saveData();


            form.reset();


            const message =
                document.getElementById(
                    "wishlistMessage"
                );


            if (message) {

                message.textContent =
                    "✅ Dein Wunsch wurde abgesendet!";

            }


            showToast(
                "⭐ Wunsch gespeichert!"
            );

        }
    );

}


/* =========================================================
   WÜNSCHE LADEN
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
        data.wishes.length ===
        0
    ) {

        container.innerHTML = `

            <p>
                ⭐ Noch keine Wünsche vorhanden.
            </p>

        `;

        return;

    }


    data.wishes.forEach(
        function (
            wish
        ) {

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

function deleteWish(
    id
) {

    data.wishes =
        data.wishes.filter(
            function (
                wish
            ) {

                return wish.id !== id;

            }
        );


    saveData();

    loadWishlist();


    showToast(
        "🗑 Wunsch gelöscht!"
    );

}


/* =========================================================
   ALLE WÜNSCHE LÖSCHEN
========================================================= */

function clearWishlist() {

    if (
        data.wishes.length ===
        0
    ) {

        showToast(
            "Keine Wünsche vorhanden."
        );

        return;

    }


    const confirmDelete =
        confirm(
            "Möchtest du wirklich alle Wünsche löschen?"
        );


    if (!confirmDelete) {

        return;

    }


    data.wishes =
        [];


    saveData();

    loadWishlist();


    showToast(
        "🗑 Alle Wünsche gelöscht!"
    );

}


/* =========================================================
   DOMAIN KOPIEREN
========================================================= */

function copyDomain() {

    const text =
        String(
            data.domain
        );


    if (
        navigator.clipboard
    ) {

        navigator.clipboard
            .writeText(
                text
            )
            .then(
                function () {

                    showToast(
                        "📋 Domain kopiert!"
                    );

                }
            )
            .catch(
                function () {

                    oldCopy(
                        text
                    );

                }
            );

    }

    else {

        oldCopy(
            text
        );

    }

}


/* =========================================================
   ALTE KOPIER-METHODE
========================================================= */

function oldCopy(
    text
) {

    const textarea =
        document.createElement(
            "textarea"
        );


    textarea.value =
        text;


    document.body.appendChild(
        textarea
    );


    textarea.select();


    try {

        document.execCommand(
            "copy"
        );

        showToast(
            "📋 Domain kopiert!"
        );

    }

    catch {

        alert(
            text
        );

    }


    textarea.remove();

}


/* =========================================================
   HTML SICHER MACHEN
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
   ATTRIBUTE SICHER MACHEN
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
   TOAST
========================================================= */

function showToast(
    message
) {

    const old =
        document.querySelector(
            ".toast-message"
        );


    if (old) {

        old.remove();

    }


    const toast =
        document.createElement(
            "div"
        );


    toast.className =
        "toast-message";


    toast.textContent =
        message;


    Object.assign(
        toast.style,
        {

            position:
                "fixed",

            left:
                "50%",

            bottom:
                "30px",

            transform:
                "translateX(-50%)",

            zIndex:
                "99999",

            padding:
                "14px 22px",

            borderRadius:
                "12px",

            background:
                "rgba(3,12,22,.97)",

            color:
                "white",

            border:
                "1px solid rgba(0,180,255,.4)",

            boxShadow:
                "0 15px 50px rgba(0,0,0,.5)",

            fontWeight:
                "900"

        }
    );


    document.body.appendChild(
        toast
    );


    setTimeout(
        function () {

            toast.remove();

        },
        2500
    );

}


/* =========================================================
   ESC-TASTE
========================================================= */

document.addEventListener(
    "keydown",
    function (
        event
    ) {

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
