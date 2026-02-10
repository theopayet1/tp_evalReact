const HttpClient = {
    baseUrl: "http://localhost:3000/api", //#todo a relier avec un.env

    setBaseUrl(url) {
        this.baseUrl = url;
    },

    /**
     * Effectue une requête HTTP vers l’API en ajoutant automatiquement
     * le header d’authentification si un token est présent.
     *
     * - Centralise la gestion des headers (JSON + Authorization)
     * - Centralise le parsing de la réponse
     * - Centralise la gestion des erreurs HTTP (notamment 401)
     *
     * @param {string} path - Chemin de l’endpoint API (ex: "/api/domains").
     * @param {Object} options - Options de la requête.
     * @param {string} [options.method="GET"] - Méthode HTTP utilisée.
     * @param {Object} [options.body] - Corps de la requête (objet JS sérialisé en JSON).
     * @param {Object} [options.headers] - Headers supplémentaires à fusionner.
     *
     * @returns {Promise<any>} Données retournées par l’API (JSON ou texte).
     *
     * @throws {Error}
     *  - Si la réponse est 401 : suppression du token + événement global "auth:unauthorized".
     *  - Si la réponse HTTP n’est pas OK : erreur contenant le message API ou le code HTTP.
     */
    async request(path, { method = "GET", body, headers } = {}) {


        // Construction des headers finaux
        const finalHeaders = {
            Accept: "application/json",
            ...(body ? { "Content-Type": "application/json" } : {}),
            ...(headers || {}),
        };

        // Exécution de la requête HTTP
        const res = await fetch(`${this.baseUrl}${path}`, {
            method,
            headers: finalHeaders,
            body: body ? JSON.stringify(body) : undefined,
        });

        // Détection et parsing du contenu de la réponse
        const contentType = res.headers.get("content-type") || "";
        const isJson = contentType.includes("application/json");
        const data = isJson ? await res.json().catch(() => null) : await res.text();

        // Gestion centralisée des accès non autorisés
        if (res.status === 401) {
            window.dispatchEvent(new CustomEvent("auth:unauthorized"));
            throw new Error("Non autorisé (401).");
        }

        // Gestion des autres erreurs HTTP
        if (!res.ok) {
            const msg =
                (data && (data.error || data.message)) ||
                (typeof data === "string" && data) ||
                `Erreur HTTP ${res.status}`;
            throw new Error(msg);
        }

        return data;
    },



    get(path) {
        return this.request(path);
    },

    post(path, body) {
        return this.request(path, { method: "POST", body });
    },

    put(path, body) {
        return this.request(path, { method: "PUT", body });
    },

    del(path) {
        return this.request(path, { method: "DELETE" });
    },

};

export default HttpClient;
