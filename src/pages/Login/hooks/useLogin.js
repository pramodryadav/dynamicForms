import { useEffect, useState, useContext } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { verifyLogin } from "../../../services/auth";
import { UserProfileContext } from "../../../context/UserProfile";
import { getAppData } from "../../../services/appService";
import { getSubdirectory } from "../../../utilities/GetSubdirectory";
import { getLocalAppData } from "../../../utilities/getLocalAppData";


const useLogin = () => {
    const localAppData = getLocalAppData();
    const [searchParams] = useSearchParams();
    const { setProfile } = useContext(UserProfileContext)
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [verifyMsg, setVerifyMsg] = useState("");
    const [isGuestModeOn, setIsGuestModeOn] = useState(false);
    const code = searchParams.get('code');

    useEffect(() => {
        if (code) return;
        fetchAppData();

    }, [code]);

    //fetch app details

    const fetchAppData = async () => {
        try {
            setLoading(true);
            const subdirectory = getSubdirectory();
            const response = await getAppData();
            const appData = response?.data?.data || "";
            const guestModeOn = appData?.guestMode === "true";
            if (!guestModeOn) {
                redirect(appData);
            }
            setIsGuestModeOn(guestModeOn)
            localStorage.setItem(`${subdirectory}-appData`, JSON.stringify(appData));
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    }
    //once back from the silk auth domain, get the code from query parameter and validate the login

    useEffect(() => {

        if (code) {
            const params = {
                grant: code,
                appid: localAppData["appid"]
            }
            setLoading(true);
            verifyLogin(params).then((res) => {
                setLoading(false);

                const { status, data } = res?.data;

                if (status === "success") { // on success redirect to chat page i.e. /
                    const subdirectory = getSubdirectory();
                    localStorage.setItem(`${subdirectory}-token`, data.grant);
                    setProfile(data);
                    setVerifyMsg("Verification succesfull")
                    navigate("/")
                } else {
                    setVerifyMsg("")
                }

            }).catch((err) => {
                setLoading(false);
                setVerifyMsg("")
            })
        }

    }, [code]);

    const loginAsGuest = () => {
        const subdirectory = getSubdirectory();

        localStorage.setItem(`${subdirectory}-token`, "guestLogin");
        setProfile({ user_name: "guest" });
        navigate("/")
    }


    // redirect to silk auth domain , 
    const redirect = (appData) => {

        try {

            const { appid, appScope, SSO_URL } = appData;
            if (!appid || !appScope || !SSO_URL) {
                toast.error("App data missing");
                return;
            }

            const baseURL = SSO_URL;
            const returnURL = window.location.href;
            const url = baseURL + `authenticate?appid=${appid}&scope=${appScope}&returnURL=${returnURL}`;

            window.open(url, "_self")
        } catch (error) {

        }
    }

    const closeDialog = () => {
        setIsGuestModeOn(false);
        fetchAppData()
    }


    return {

        redirect,
        loading,
        verifyMsg,
        closeDialog,
        isGuestModeOn,
        localAppData,
        loginAsGuest


    }
}
export default useLogin