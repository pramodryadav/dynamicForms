import { getSubdirectory } from "./GetSubdirectory";

export const getLocalAppData = () => {


    try {
        const subdirectory = getSubdirectory();
        const localAppData = localStorage.getItem(`${subdirectory}-appData`);

        if (!localAppData) {
            return {}
        }
        const { appid, appScope,appName,privacyURL,termsURL,SSO_URL } = JSON.parse(localAppData) || {};
        return { appid, appScope,appName,privacyURL,termsURL,SSO_URL };


    } catch (error) {
        console.error("Failed to parse appData from localStorage:", error);
        return {};


    }
}