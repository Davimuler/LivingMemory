import { useLocation, useNavigate } from "react-router";

export const useLang = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const getCurrentLang = () => {
        const match = location.pathname.match(/^\/(ua|eng)(\/|$)/);
        return match ? match[1] : "ua"; // По умолчанию 'ua'
    };

    const lang = getCurrentLang();

    const goTo = (path = "") => {
        const normalizedPath = path.startsWith("/") ? path : `/${path}`;
        navigate(`/${lang}${normalizedPath}`);
    };

    return { lang, goTo };
};