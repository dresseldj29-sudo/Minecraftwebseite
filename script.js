/* =========================================================
   MINECRAFT SERVER WEBSITE
   OWNER SYSTEM
   VERSION 2.0
========================================================= */


/* =========================================================
   OWNER LOGIN
=========================================================

   HIER DEINE OWNER-DATEN EINTRAGEN.

   WICHTIG:
   NICHT dein echtes Gmail-Passwort verwenden.

========================================================= */

const OWNER_EMAIL = "deine-email@gmail.com";

const OWNER_PASSWORD = "MeinOwnerPasswort123";


/* =========================================================
   STANDARD-DATEN
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

function loadData() {

    try {

        const saved =
            localStorage.getItem(
                "minecraftServerWebsite"
            );


        if (!saved) {

            return defaultData;

        }


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

    catch (error) {

        console.error(
            "Fehler beim Laden der Daten:",
            error
        );


        return defaultData;

    }

}


/* =========================================================
   AKTUELLE DATEN
========================================================= */

let data = loadData();


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
            "Speichern fehlgeschlagen:",
            error
        );


        return false;

    }

}


/* =========================================================
   WEBSITE STARTEN
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

    updateServerStatus();

    updateSocialLinks();

    updatePlayerCount();

}


/* =========================================================
   DOMAIN
========================================================= */

function updateDomain() {

    const domain =
        document.getElementById(
            "serverDomain"
        );


    if (!domain) {

        return;

    }


    domain.textContent =
        data.domain ||
        "play.deinserver.de";

}


/* =========================================================
   SPIELERANZAHL
========================================================= */

function updatePlayerCount() {

    const players =
        document.getElementById(
            "playerCount"
        );


    if (!players) {

        return;

    }


    players.textContent =
        Number(data.players) || 0;

}


/* =========================================================
   SERVERSTATUS
========================================================= */

function updateServerStatus() {

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
   SOCIAL LINKS AUF STARTSEITE
========================================================= */

function updateSocialLinks() {

    const container =
        document.getElementById(
            "socialLinks"
        );


    if (!container) {

        return;

    }


    container.innerHTML = "";


    data.social.forEach(
        function (social) {

            if (
                !social ||
                !social.url
            ) {

                return;

            }


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
                social.url;


            card.target =
                "_blank";


            card.rel =
                "noopener noreferrer";


            const iconDiv =
                document.createElement(
                    "div"
                );


            iconDiv.className =
                "social-icon";


            iconDiv.textContent =
                icon;


            const title =
                document.createElement(
                    "h3"
                );


            title.textContent =
                social.title ||
                social.type ||
                "Social Media";


            const description =
                document.createElement(
                    "p"
                );


            description.textContent =
                social.description ||
                "Unser Kanal";


            card.appendChild(
                iconDiv
            );


            card.appendChild(
                title
            );


            card.appendChild(
                description
            );


            container.appendChild(
                card
            );

        }
    );

}


/* =========================================================
   DOMAIN KOPIEREN
========================================================= */

function copyDomain() {

    const domain =
        data.domain ||
        "play.deinserver.de";


    if (
        navigator.clipboard &&
        navigator.clipboard.writeText
    ) {

        navigator.clipboard
            .writeText(domain)
            .then(
                function () {

                    showTemporaryMessage(
                        "✅ Server-Domain kopiert!"
                    );

                }
            )
            .catch(
                function () {

                    prompt(
                        "Server-Domain:",
                        domain
                    );

                }
            );

    }

    else {

        prompt(
            "Server-Domain:",
            domain
        );

    }

}


/* =========================================================
   TEMPORÄRE MELDUNG
========================================================= */

function showTemporaryMessage(
    message
) {

    alert(message);

}


/* =========================================================
   LOGIN EVENTS EINRICHTEN
========================================================= */

function setupLoginEvents() {

    const emailInput =
        document.getElementById(
            "ownerEmail"
        );


    const passwordInput =
        document.getElementById(
            "ownerPassword"
        );


    if (
        !emailInput ||
        !passwordInput
    ) {

        return;

    }


    passwordInput.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Enter"
            ) {

                event.preventDefault();

                ownerLogin();

            }

        }
    );


    emailInput.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Enter"
            ) {

                event.preventDefault();

                ownerLogin();

            }

        }
    );

}


/* =========================================================
   OWNER LOGIN ÖFFNEN
========================================================= */

function openLogin() {

    const overlay =
        document.getElementById(
            "loginOverlay"
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


    if (!overlay) {

        console.error(
            "loginOverlay wurde nicht gefunden."
        );

        return;

    }


    overlay.classList.add(
        "active"
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


/* =========================================================
   LOGIN SCHLIESSEN
========================================================= */

function closeLogin() {

    const overlay =
        document.getElementById(
            "loginOverlay"
        );


    if (!overlay) {

        return;

    }


    overlay.classList.remove(
        "active"
    );

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
        !passwordInput ||
        !error
    ) {

        alert(
            "❌ Das Login-Fenster wurde nicht richtig geladen."
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
        OWNER_EMAIL
            .trim()
            .toLowerCase();


    const correctPassword =
        OWNER_PASSWORD;


    /* -----------------------------------------
       LEERE EINGABE
    ----------------------------------------- */

    if (
        enteredEmail === "" ||
        enteredPassword === ""
    ) {

        error.textContent =
            "❌ Bitte E-Mail und Passwort eingeben.";

        return;

    }


    /* -----------------------------------------
       LOGIN PRÜFEN
    ----------------------------------------- */

    if (
        enteredEmail === correctEmail &&
        enteredPassword === correctPassword
    ) {

        /* LOGIN ERFOLGREICH */

        error.textContent = "";


        /* Login schließen */

        closeLogin();


        /* Owner Panel öffnen */

        openOwnerPanel();


        /* Eingaben löschen */

        emailInput.value = "";

        passwordInput.value = "";


        return;

    }


    /* -----------------------------------------
       LOGIN FALSCH
    ----------------------------------------- */

    error.textContent =
        "❌ E-Mail oder Passwort ist falsch.";


    passwordInput.value = "";


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

        alert(
            "❌ Owner Panel wurde nicht gefunden."
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


/* =========================================================
   OWNER PANEL SCHLIESSEN
========================================================= */

function closeOwnerPanel() {

    const panel =
        document.getElementById(
            "ownerPanel"
        );


    if (!panel) {

        return;

    }


    panel.classList.remove(
        "active"
    );

}


/* =========================================================
   ESC TASTE
========================================================= */

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key !== "Escape"
        ) {

            return;

        }


        closeLogin();

        closeOwnerPanel();

    }
);


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


    let players =
        Number(
            playersInput.value
        );


    if (!domain) {

        domain =
            "play.deinserver.de";

    }


    if (
        Number.isNaN(players) ||
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


    if (
        saveData()
    ) {

        updateWebsite();


        alert(
            "✅ Server-Einstellungen gespeichert!"
        );

    }

}


/* =========================================================
   ADMIN SOCIAL LINKS
========================================================= */

function loadAdminSocial() {

    const container =
        document.getElementById(
            "adminSocialList"
        );


    if (!container) {

        return;

    }


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
   SOCIAL ADMIN ZEILE ERSTELLEN
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


    /* SELECT */

    const select =
        document.createElement(
            "select"
        );


    const youtube =
        document.createElement(
            "option"
        );

    youtube.value =
        "YouTube";

    youtube.textContent =
        "YouTube";


    const tiktok =
        document.createElement(
            "option"
        );

    tiktok.value =
        "TikTok";

    tiktok.textContent =
        "TikTok";


    const discord =
        document.createElement(
            "option"
        );

    discord.value =
        "Discord";

    discord.textContent =
        "Discord";


    select.appendChild(
        youtube
    );

    select.appendChild(
        tiktok
    );

    select.appendChild(
        discord
    );


    select.value =
        social.type ||
        "YouTube";


    /* LINK INPUT */

    const input =
        document.createElement(
            "input"
        );


    input.type =
        "url";


    input.value =
        social.url ||
        "";


    input.placeholder =
        "https://...";


    /* LÖSCHEN */

    const remove =
        document.createElement(
            "button"
        );


    remove.className =
        "remove-social";


    remove.type =
        "button";


    remove.textContent =
        "×";


    remove.onclick =
        function () {

            removeSocial(
                index
            );

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

        description: "Unser YouTube Kanal"

    });


    loadAdminSocial();

}


/* =========================================================
   SOCIAL LINK ENTFERNEN
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
                "Unser Kanal";


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

        updateSocialLinks();


        alert(
            "✅ Social-Media-Links gespeichert!"
        );

    }

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
        function (event) {

            event.preventDefault();


            submitWishlist();

        }
    );

}


/* =========================================================
   WUNSCHLISTE INITIALISIEREN
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        setupWishlist();

    }
);


/* =========================================================
   WUNSCH ABSENDEN
========================================================= */

function submitWishlist() {

    const nameInput =
        document.getElementById(
            "wishName"
        );


    const titleInput =
        document.getElementById(
            "wishTitle"
        );


    const textInput =
        document.getElementById(
            "wishText"
        );


    const message =
        document.getElementById(
            "wishlistMessage"
        );


    if (
        !nameInput ||
        !titleInput ||
        !textInput
    ) {

        return;

    }


    const name =
        nameInput.value.trim();


    const title =
        titleInput.value.trim();


    const text =
        textInput.value.trim();


    if (
        !name ||
        !title ||
        !text
    ) {

        if (message) {

            message.textContent =
                "❌ Bitte alle Felder ausfüllen.";

        }

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


    if (
        saveData()
    ) {

        nameInput.value = "";

        titleInput.value = "";

        textInput.value = "";


        if (message) {

            message.textContent =
                "✅ Dein Wunsch wurde erfolgreich gesendet!";

        }


        loadWishlist();

    }

}


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


    if (
        !Array.isArray(data.wishes) ||
        data.wishes.length === 0
    ) {

        container.innerHTML =
            "<p>⭐ Noch keine Wünsche vorhanden.</p>";

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


            const title =
                document.createElement(
                    "h4"
                );


            title.textContent =
                "⭐ " +
                wish.title;


            const player =
                document.createElement(
                    "p"
                );


            player.innerHTML =
                "<strong>Spieler:</strong> ";


            player.appendChild(
                document.createTextNode(
                    wish.name
                )
            );


            const date =
                document.createElement(
                    "p"
                );


            date.innerHTML =
                "<strong>Datum:</strong> ";


            date.appendChild(
                document.createTextNode(
                    wish.date
                )
            );


            const text =
                document.createElement(
                    "p"
                );


            text.textContent =
                wish.text;


            const deleteButton =
                document.createElement(
                    "button"
                );


            deleteButton.className =
                "wish-delete";


            deleteButton.textContent =
                "🗑 WUNSCH LÖSCHEN";


            deleteButton.onclick =
                function () {

                    deleteWish(
                        wish.id
                    );

                };


            card.appendChild(
                title
            );


            card.appendChild(
                player
            );


            card.appendChild(
                date
            );


            card.appendChild(
                text
            );


            card.appendChild(
                deleteButton
            );


            container.appendChild(
                card
            );

        }
    );

}


/* =========================================================
   EINEN WUNSCH LÖSCHEN
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

}


/* =========================================================
   ALLE WÜNSCHE LÖSCHEN
========================================================= */

function clearWishlist() {

    if (
        data.wishes.length === 0
    ) {

        alert(
            "Es sind keine Wünsche vorhanden."
        );

        return;

    }


    const confirmed =
        confirm(
            "⚠️ Wirklich ALLE Wünsche löschen?"
        );


    if (!confirmed) {

        return;

    }


    data.wishes = [];


    saveData();

    loadWishlist();


    alert(
        "✅ Alle Wünsche wurden gelöscht."
    );

}


/* =========================================================
   ALLES SPEICHERN
========================================================= */

function saveEverything() {

    saveServerWithoutAlert();

    saveSocialLinksWithoutAlert();

    saveData();

    updateWebsite();

    loadOwnerFields();

    loadAdminSocial();

    alert(
        "✅ Alle Änderungen wurden gespeichert!"
    );

}


/* =========================================================
   SERVER OHNE EXTRA ALERT
========================================================= */

function saveServerWithoutAlert() {

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

        return;

    }


    data.domain =
        domainInput.value.trim() ||
        "play.deinserver.de";


    data.status =
        statusInput.value;


    data.players =
        Math.max(
            0,
            Math.floor(
                Number(
                    playersInput.value
                ) || 0
            )
        );

}


/* =========================================================
   SOCIAL OHNE EXTRA ALERT
========================================================= */

function saveSocialLinksWithoutAlert() {

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


            const url =
                input.value.trim();


            if (!url) {

                return;

            }


            const type =
                select.value;


            let description =
                "Unser Kanal";


            if (
                type === "YouTube"
            ) {

                description =
                    "Unsere YouTube Videos";

            }


            else if (
                type === "TikTok"
            ) {

                description =
                    "Unsere TikTok Videos";

            }


            else if (
                type === "Discord"
            ) {

                description =
                    "Unsere Discord Community";

            }


            newSocial.push({

                type:
                    type,

                url:
                    url,

                title:
                    type,

                description:
                    description

            });

        }
    );


    data.social =
        newSocial;

}


/* =========================================================
   LOGIN OVERLAY:
   KLICK AUF AUSSEN SCHLIESST
========================================================= */

document.addEventListener(
    "click",
    function (event) {

        const overlay =
            document.getElementById(
                "loginOverlay"
            );


        if (
            !overlay ||
            !overlay.classList.contains(
                "active"
            )
        ) {

            return;

        }


        if (
            event.target === overlay
        ) {

            closeLogin();

        }

    }
);
