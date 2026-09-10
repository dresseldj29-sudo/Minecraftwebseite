/* =====================================================
   MINECRAFT SERVER WEBSEITE
   OWNER PANEL
===================================================== */


/* =====================================================
   OWNER LOGIN

   HIER DEINE TEST-DATEN EINTRAGEN.

   WICHTIG:
   GitHub Pages macht diesen Code öffentlich.
   Deshalb KEIN wichtiges echtes Passwort verwenden.
===================================================== */

const OWNER_EMAIL = "deine-email@gmail.com";

const OWNER_PASSWORD = "MeinTestPasswort123";


/* =====================================================
   STANDARD DATEN
===================================================== */

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


/* =====================================================
   DATEN LADEN
===================================================== */

let data;

try {

    data =
        JSON.parse(
            localStorage.getItem(
                "minecraftServerWebsite"
            )
        )
        || defaultData;

}
catch {

    data = defaultData;

}


/* =====================================================
   DATEN SPEICHERN
===================================================== */

function saveData() {

    localStorage.setItem(
        "minecraftServerWebsite",
        JSON.stringify(data)
    );

}


/* =====================================================
   START
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        updateWebsite();

        loadOwnerFields();

        loadAdminSocial();

        loadWishlist();

    }
);


/* =====================================================
   WEBSITE AKTUALISIEREN
===================================================== */

function updateWebsite() {

    document.getElementById(
        "serverDomain"
    ).textContent = data.domain;

    document.getElementById(
        "playerCount"
    ).textContent = data.players;

    updateStatus();

    updateSocial();

}


/* =====================================================
   SERVERSTATUS
===================================================== */

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
            "Der Minecraft Server wird momentan gewartet.";

    }

}


/* =====================================================
   SOCIAL LINKS ANZEIGEN
===================================================== */

function updateSocial() {

    const container =
        document.getElementById(
            "socialLinks"
        );


    container.innerHTML = "";


    data.social.forEach(
        function (social) {


            let icon = "🔗";


            if (
                social.type === "YouTube"
            ) {

                icon = "▶️";

            }


            if (
                social.type === "TikTok"
            ) {

                icon = "🎵";

            }


            if (
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


            card.innerHTML = `

                <div class="social-icon">
                    ${icon}
                </div>

                <h3>
                    ${escapeHTML(
                        social.title
                    )}
                </h3>

                <p>
                    ${escapeHTML(
                        social.description
                    )}
                </p>

            `;


            container.appendChild(card);

        }
    );

}


/* =====================================================
   DOMAIN KOPIEREN
===================================================== */

function copyDomain() {

    navigator.clipboard
        .writeText(data.domain)
        .then(
            function () {

                alert(
                    "✅ Server-Domain kopiert!"
                );

            }
        )
        .catch(
            function () {

                alert(
                    "Domain: " +
                    data.domain
                );

            }
        );

}


/* =====================================================
   LOGIN ÖFFNEN
===================================================== */

function openLogin() {

    document
        .getElementById(
            "loginOverlay"
        )
        .classList.add("active");


    setTimeout(
        function () {

            document
                .getElementById(
                    "ownerEmail"
                )
                .focus();

        },
        100
    );

}


/* =====================================================
   LOGIN SCHLIESSEN
===================================================== */

function closeLogin() {

    document
        .getElementById(
            "loginOverlay"
        )
        .classList.remove(
            "active"
        );

}


/* =====================================================
   OWNER LOGIN
===================================================== */

function ownerLogin() {

    const email =
        document
            .getElementById(
                "ownerEmail"
            )
            .value
            .trim();


    const password =
        document
            .getElementById(
                "ownerPassword"
            )
            .value;


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


        document
            .getElementById(
                "ownerPanel"
            )
            .classList.add(
                "active"
            );


        loadOwnerFields();

        loadAdminSocial();

        loadWishlist();

    }

    else {

        error.textContent =
            "❌ E-Mail oder Passwort falsch.";

    }

}


/* =====================================================
   ENTER BEIM LOGIN
===================================================== */

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Enter" &&
            document
                .getElementById(
                    "loginOverlay"
                )
                .classList.contains(
                    "active"
                )
        ) {

            ownerLogin();

        }

    }
);


/* =====================================================
   OWNER FELDER LADEN
===================================================== */

function loadOwnerFields() {

    document.getElementById(
        "domainInput"
    ).value = data.domain;


    document.getElementById(
        "statusInput"
    ).value = data.status;


    document.getElementById(
        "playersInput"
    ).value = data.players;

}


/* =====================================================
   SERVER SPEICHERN
===================================================== */

function saveServer() {

    data.domain =
        document
            .getElementById(
                "domainInput"
            )
            .value
            .trim();


    data.status =
        document
            .getElementById(
                "statusInput"
            )
            .value;


    data.players =
        Math.max(
            0,
            Number(
                document
                    .getElementById(
                        "playersInput"
                    )
                    .value
            ) || 0
        );


    saveData();

    updateWebsite();


    alert(
        "✅ Server gespeichert!"
    );

}


/* =====================================================
   SOCIAL ADMIN LADEN
===================================================== */

function loadAdminSocial() {

    const container =
        document.getElementById(
            "adminSocialList"
        );


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


/* =====================================================
   SOCIAL ADMIN ZEILE
===================================================== */

function createSocialAdminRow(
    social,
    index
) {

    const container =
        document.getElementById(
            "adminSocialList"
        );


    const row =
        document.createElement(
            "div"
        );


    row.className =
        "social-admin-row";


    row.innerHTML = `

        <select>

            <option ${
                social.type === "YouTube"
                ? "selected"
                : ""
            }>
                YouTube
            </option>

            <option ${
                social.type === "TikTok"
                ? "selected"
                : ""
            }>
                TikTok
            </option>

            <option ${
                social.type === "Discord"
                ? "selected"
                : ""
            }>
                Discord
            </option>

        </select>


        <input
            type="url"
            value="${escapeAttribute(
                social.url
            )}"
            placeholder="Link">


        <button
            class="remove-social"
            onclick="removeSocial(${index})">

            ×

        </button>

    `;


    container.appendChild(row);

}


/* =====================================================
   SOCIAL LINK HINZUFÜGEN
===================================================== */

function addSocialLink() {

    data.social.push({

        type: "YouTube",

        url: "https://youtube.com/",

        title: "Neuer Kanal",

        description: "Unser Kanal"

    });


    loadAdminSocial();

}


/* =====================================================
   SOCIAL LINK LÖSCHEN
===================================================== */

function removeSocial(index) {

    if (
        !confirm(
            "Diesen Kanal wirklich löschen?"
        )
    ) {

        return;

    }


    data.social.splice(
        index,
        1
    );


    loadAdminSocial();

}


/* =====================================================
   SOCIAL LINKS SPEICHERN
===================================================== */

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


            const type =
                select.value;


            const url =
                input.value.trim();


            let title =
                type;


            let description =
                "Unser " +
                type +
                " Kanal";


            if (type === "YouTube") {

                title = "YouTube";

                description =
                    "Unsere YouTube Videos";

            }


            if (type === "TikTok") {

                title = "TikTok";

                description =
                    "Unsere TikTok Videos";

            }


            if (type === "Discord") {

                title = "Discord";

                description =
                    "Unsere Discord Community";

            }


            if (url) {

                newSocial.push({

                    type: type,

                    url: url,

                    title: title,

                    description: description

                });

            }

        }
    );


    data.social =
        newSocial;


    saveData();

    updateSocial();


    alert(
        "✅ Social-Media-Links gespeichert!"
    );

}


/* =====================================================
   WUNSCHLISTE ABSENDEN
===================================================== */

document
    .getElementById(
        "wishlistForm"
    )
    .addEventListener(
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


            document
                .getElementById(
                    "wishlistForm"
                )
                .reset();


            document
                .getElementById(
                    "wishlistMessage"
                )
                .textContent =
                "✅ Dein Wunsch wurde gespeichert!";


            loadWishlist();

        }
    );


/* =====================================================
   WÜNSCHE OWNER PANEL
===================================================== */

function loadWishlist() {

    const container =
        document.getElementById(
            "adminWishlist"
        );


    if (
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


/* =====================================================
   WUNSCH LÖSCHEN
===================================================== */

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


/* =====================================================
   ALLE WÜNSCHE LÖSCHEN
===================================================== */

function clearWishlist() {

    if (
        !confirm(
            "Wirklich alle Wünsche löschen?"
        )
    ) {

        return;

    }


    data.wishes = [];


    saveData();

    loadWishlist();


    alert(
        "✅ Wunschliste gelöscht!"
    );

}


/* =====================================================
   ALLES SPEICHERN
===================================================== */

function saveEverything() {

    saveServer();

    saveSocialLinks();

}


/* =====================================================
   OWNER PANEL SCHLIESSEN
===================================================== */

function closeOwnerPanel() {

    document
        .getElementById(
            "ownerPanel"
        )
        .classList.remove(
            "active"
        );

}


/* =====================================================
   HTML SICHER MACHEN
===================================================== */

function escapeHTML(value) {

    return String(value)

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


/* =====================================================
   ATTRIBUTE SICHER MACHEN
===================================================== */

function escapeAttribute(value) {

    return String(value)

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
