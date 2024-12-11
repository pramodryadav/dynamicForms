const { validateUser } = require('../services/authService');
const { decodeToken } = require("../utils/token");

const verifyLogin = async (req, res) => {

    try {
        const response = await validateUser(req.body);
        const { status, grant } = response;

        if (status === "success" && grant) {
            const payload = decodeToken(grant);

            if (payload) {
                const { data, iat, exp } = payload;
                res.status(200).json({ status: "success", data: { ...data, iat, exp, grant } });
            } else {
                res.status(500).json({ status: "error", msg: 'User data not found' });
            }
        } else {
            res.status(500).json({ status: "error", msg: 'Internal Server Error' });
        }
    } catch (error) {
        res.status(error.response?.status || 500).json(error.response?.data || { message: 'Internal Server Error' });
    }
};


module.exports = {
    verifyLogin
};