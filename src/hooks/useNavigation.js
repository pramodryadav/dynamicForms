import { useState, useContext, useMemo } from "react";
import { UserProfileContext } from "../context/UserProfile";
import { getSubdirectory } from "../utilities/GetSubdirectory";
import { getLocalAppData } from "../utilities/getLocalAppData";
import { toast } from "react-toastify";

export default function useNavigation() {


    const [mobileOpen, setMobileOpen] = useState(false);

    const { setProfile, profile } = useContext(UserProfileContext);
    const localAppData = getLocalAppData();


    const userRole = profile?.user_name === "guest" ? "guest" : "other";

    const navItems = [
        {
            title: 'About',
            user: "other",
            anchorHandle: function () {
                window.open("https://www.smartinfologiks.com/about","_blank")
            }
        },
        {
            title: 'Contact Us',
            user: "other",
            anchorHandle: function () {
                window.open("https://www.smartinfologiks.com/about/contactus","_blank")
            }
        },
        {
            title: 'Logout',
            user: "guest",
            anchorHandle: function () {
                try {
                    const subdirectory = getSubdirectory();
                    setProfile(null);

                    localStorage.removeItem(`${subdirectory}-userProfile`);
                    localStorage.removeItem(`${subdirectory}-token`);
                    const { appid, appScope, SSO_URL } = localAppData;
                    if (!appid || !appScope || !SSO_URL) {
                        toast.error("App data missing");
                        return;
                    }

                    const baseURL = SSO_URL;
                    const returnURL = encodeURIComponent(window.location.href);

                    const url = baseURL + `logout?appid=${appid}&scope=${appScope}&returnURL=${returnURL}`;
                    window.open(url, "_self")
                } catch (error) {

                }
            }
        },
        {
            title: 'Login',
            user: "other",
            anchorHandle: function () {
                try {
                    const subdirectory = getSubdirectory();

                    localStorage.removeItem(`${subdirectory}-userProfile`);

                    localStorage.removeItem(`${subdirectory}-token`);
                    const { appid, appScope, SSO_URL } = localAppData;
                    if (!appid || !appScope || !SSO_URL) {
                        toast.error("App data missing");
                        return;
                    }

                    const baseURL = SSO_URL;
                    const returnURL = encodeURIComponent(window.location.href + "/login");
                    const url = baseURL + `authenticate?appid=${appid}&scope=${appScope}&returnURL=${returnURL}`;

                    window.open(url, "_self");
                    setProfile(null);
                } catch (error) {

                }
            }
        }
    ];

    const filteredNavs = useMemo(() => {

        return navItems.filter((item) => {
            if (userRole === "guest") {
                // Show "Login" button for guest users
                return item.title !== "Logout";
            } else {
                // Show "Logout" button for non-guest users
                return item.title !== "Login";
            }
        });

    }, [])




    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };


    return {
        handleDrawerToggle,
        mobileOpen,
        filteredNavs
    }
} 