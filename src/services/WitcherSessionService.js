// src/services/auth/WitcherSessionService.js

const STORAGE_KEY = "witcher_session"; // stocké jusqu’à fermeture de l’onglet

const WitcherSessionService = {
    /**
     * Stocke le sorceleur courant dans la session (onglet).
     * @param {{ id: string|number, name: string }} witcher
     */
    setWitcher(witcher) {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(witcher));
    },

    /**
     * Récupère le sorceleur courant.
     * @returns {{ id: string|number, name: string } | null}
     */
    getWitcher() {
        const raw = sessionStorage.getItem(STORAGE_KEY);
        if (!raw) return null;

        try {
            return JSON.parse(raw);
        } catch {
            return null;
        }
    },

    clearWitcher() {
        sessionStorage.removeItem(STORAGE_KEY);
    },

    isAuthenticated() {
        return !!this.getWitcher();
    },
};

export default WitcherSessionService;
