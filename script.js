// ============================================
// SUPABASE
// ============================================

const supabaseClient =
    window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_KEY
    );


// ============================================
// NAVIGATION
// ============================================

function scrollToSection(id) {

    const element =
        document.getElementById(id);

    if (!element) return;

    element.scrollIntoView({
        behavior: "smooth"
    });
}


// ============================================
// LOGIN MODAL
// ============================================

function openOwnerLogin() {

    document.getElementById(
        "loginModal"
    ).style.display = "flex";
}

function closeOwnerLogin() {

    document.getElementById(
        "loginModal"
    ).style.display = "none";
}


// ============================================
// OWNER LOGIN
// ============================================

async function ownerLogin() {

    const email =
        document.getElementById(
            "ownerEmail"
        ).value.trim();

    const password =
        document.getElementById(
            "ownerPassword"
        ).value;

    const message =
        document.getElementById(
            "loginMessage"
        );

    message.textContent =
        "Login wird geprüft...";


    const { data, error } =
        await supabaseClient.auth.signInWithPassword({
            email: email,
            password: password
        });


    if (error) {

        message.textContent =
            "❌ E-Mail oder Passwort falsch.";

        return;
    }


    const user = data.user;


    const { data: owner } =
        await supabaseClient
            .from("owners")
            .select("id")
            .eq("id", user.id)
            .maybeSingle();


    if (!owner) {

        await supabaseClient.auth.signOut();

        message.textContent =
            "❌ Du bist kein Owner.";

        return;
    }


    closeOwnerLogin();

    openOwnerPanel();

    loadAdminData();
}


// ============================================
// OWNER PANEL
// ============================================

function openOwnerPanel() {

    document.getElementById(
        "ownerPanel"
    ).style.display = "block";

    document.body.style.overflow = "hidden";
}


function closeOwnerPanel() {

    document.getElementById(
        "ownerPanel"
    ).style.display = "none";

    document.body.style.overflow = "";
}


// ============================================
// LOGOUT
// ============================================

async function ownerLogout() {

    await supabaseClient.auth.signOut();

    closeOwnerPanel();

    alert("Du wurdest ausgeloggt.");
}


// ============================================
// EINSTELLUNGEN LADEN
// ============================================

async function loadSettings() {

    const { data, error } =
        await supabaseClient
            .from("settings")
            .select("*")
            .limit(1)
            .maybeSingle();


    if (error || !data) {

        console.log(
            "Einstellungen konnten nicht geladen werden."
        );

        return;
    }


    document.getElementById(
        "serverDomain"
    ).textContent =
        data.server_domain;


    document.getElementById(
        "youtubeLink"
    ).href =
        data.youtube || "#";


    document.getElementById(
        "tiktokLink"
    ).href =
        data.tiktok || "#";


    document.getElementById(
        "discordLink"
    ).href =
        data.discord || "#";


    document.getElementById(
        "adminYoutube"
    ).value =
        data.youtube || "";


    document.getElementById(
        "adminTiktok"
    ).value =
        data.tiktok || "";


    document.getElementById(
        "adminDiscord"
    ).value =
        data.discord || "";


    document.getElementById(
        "adminServerDomain"
    ).value =
        data.server_domain || "";


    checkMinecraftServer(
        data.server_domain
    );
}


// ============================================
// LINKS SPEICHERN
// ============================================

async function saveLinks() {

    const youtube =
        document.getElementById(
            "adminYoutube"
        ).value.trim();

    const tiktok =
        document.getElementById(
            "adminTiktok"
        ).value.trim();

    const discord =
        document.getElementById(
            "adminDiscord"
        ).value.trim();


    const { data: settings } =
        await supabaseClient
            .from("settings")
            .select("id")
            .limit(1)
            .single();


    if (!settings) {

        alert(
            "❌ Einstellungen nicht gefunden."
        );

        return;
    }


    const { error } =
        await supabaseClient
            .from("settings")
            .update({
                youtube: youtube,
                tiktok: tiktok,
                discord: discord
            })
            .eq("id", settings.id);


    if (error) {

        alert(
            "❌ Fehler beim Speichern."
        );

        console.error(error);

        return;
    }


    alert(
        "✅ Social Links gespeichert!"
    );


    loadSettings();
}


// ============================================
// SERVER SPEICHERN
// ============================================

async function saveServer() {

    const domain =
        document.getElementById(
            "adminServerDomain"
        ).value.trim();


    if (!domain) {

        alert(
            "Bitte eine Server-Domain eingeben."
        );

        return;
    }


    const { data: settings } =
        await supabaseClient
            .from("settings")
            .select("id")
            .limit(1)
            .single();


    const { error } =
        await supabaseClient
            .from("settings")
            .update({
                server_domain: domain
            })
            .eq("id", settings.id);


    if (error) {

        alert(
            "❌ Server konnte nicht gespeichert werden."
        );

        return;
    }


    alert(
        "✅ Server-Domain gespeichert!"
    );


    loadSettings();
}


// ============================================
// MINECRAFT SERVER STATUS
// ============================================

async function checkMinecraftServer(domain) {

    const statusText =
        document.getElementById(
            "serverStatus"
        );

    const playerText =
        document.getElementById(
            "playerCount"
        );

    const icon =
        document.getElementById(
            "statusIcon"
        );

    const light =
        document.getElementById(
            "statusLight"
        );


    statusText.textContent =
        "Server wird geprüft...";

    playerText.textContent =
        "Spieler: -";

    icon.textContent =
        "⏳";


    try {

        const response =
            await fetch(
                "https://api.mcsrvstat.us/3/" +
                encodeURIComponent(domain)
            );


        const data =
            await response.json();


        if (!data.online) {

            statusText.textContent =
                "🔴 Server offline";

            playerText.textContent =
                "Keine Verbindung zum Server";

            icon.textContent =
                "🔴";

            light.style.background =
                "#ff3333";

            return;
        }


        statusText.textContent =
            "🟢 Server online";


        const online =
            data.players?.online ?? 0;


        const max =
            data.players?.max ?? "?";


        playerText.textContent =
            "Spieler: " +
            online +
            " / " +
            max;


        icon.textContent =
            "🟢";


        light.style.background =
            "#39ff75";


        if (data.version) {

            playerText.textContent +=
                " • " +
                data.version;
        }


    } catch (error) {

        statusText.textContent =
            "⚠️ Status nicht verfügbar";

        playerText.textContent =
            "Server konnte nicht geprüft werden.";

        icon.textContent =
            "⚠️";

        console.error(error);
    }
}


// ============================================
// WUNSCH ABSCHICKEN
// ============================================

async function sendWish() {

    const username =
        document.getElementById(
            "wishUsername"
        ).value.trim();

    const wish =
        document.getElementById(
            "wishText"
        ).value.trim();

    const message =
        document.getElementById(
            "wishMessage"
        );


    if (!username || !wish) {

        message.textContent =
            "❌ Bitte beide Felder ausfüllen.";

        return;
    }


    message.textContent =
        "Wird gesendet...";


    const { error } =
        await supabaseClient
            .from("wishes")
            .insert({
                username: username,
                wish: wish
            });


    if (error) {

        message.textContent =
            "❌ Wunsch konnte nicht gespeichert werden.";

        console.error(error);

        return;
    }


    message.textContent =
        "✅ Dein Wunsch wurde gespeichert!";


    document.getElementById(
        "wishUsername"
    ).value = "";


    document.getElementById(
        "wishText"
    ).value = "";
}


// ============================================
// OWNER WÜNSCHE LADEN
// ============================================

async function loadAdminWishes() {

    const container =
        document.getElementById(
            "adminWishes"
        );


    container.innerHTML =
        "Lade Wünsche...";


    const { data, error } =
        await supabaseClient
            .from("wishes")
            .select("*")
            .order(
                "created_at",
                {
                    ascending: false
                }
            );


    if (error) {

        container.innerHTML =
            "❌ Wünsche konnten nicht geladen werden.";

        console.error(error);

        return;
    }


    if (!data.length) {

        container.innerHTML =
            "Noch keine Wünsche vorhanden.";

        return;
    }


    container.innerHTML = "";


    data.forEach(wish => {

        const div =
            document.createElement("div");

        div.className =
            "admin-wish";


        const strong =
            document.createElement("strong");

        strong.textContent =
            "👤 " + wish.username;


        const text =
            document.createElement("div");

        text.textContent =
            wish.wish;


        const button =
            document.createElement("button");

        button.className =
            "delete-wish";

        button.textContent =
            "🗑️ Löschen";


        button.onclick =
            () => deleteWish(wish.id);


        div.appendChild(strong);

        div.appendChild(text);

        div.appendChild(button);


        container.appendChild(div);

    });
}


// ============================================
// WUNSCH LÖSCHEN
// ============================================

async function deleteWish(id) {

    if (
        !confirm(
            "Diesen Wunsch wirklich löschen?"
        )
    ) {

        return;
    }


    const { error } =
        await supabaseClient
            .from("wishes")
            .delete()
            .eq("id", id);


    if (error) {

        alert(
            "❌ Wunsch konnte nicht gelöscht werden."
        );

        console.error(error);

        return;
    }


    loadAdminWishes();
}


// ============================================
// ADMIN DATEN
// ============================================

async function loadAdminData() {

    await loadSettings();

    await loadAdminWishes();
}


// ============================================
// START
// ============================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        loadSettings();

    }
);
