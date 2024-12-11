const getAppData = async (req, res) => {
    console.log("req getappData");
    
    try {

        const appData = {
            "appid": process.env.APP_ID,
            "appScope": process.env.APP_SCOPE,
            "guestMode": process.env.GUEST_MODE_ENABLED,
            "privacyURL": process.env.PRIVACY_URL,
            "termsURL": process.env.TERMS_CONDITION_URL,
            "SSO_URL": process.env.SILK_AUTH_BASE_URL,
        }
        if (!appData.appid || !appData.appScope) {
            throw new Error('App data is missing');
        }
        res.status(200).json({ status: "success", data: appData });

    } catch (error) {
        if (error.message === 'App data is missing') {
            res.status(400).json({ status: "error", message: error.message });
        } else {
            res.status(500).json({ status: "error", message: "Internal server error" });
        }
    }
};

module.exports = {
    getAppData
};