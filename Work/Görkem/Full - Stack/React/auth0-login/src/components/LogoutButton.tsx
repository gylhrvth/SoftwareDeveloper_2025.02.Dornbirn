import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton = () => {
    const { logout, isAuthenticated } = useAuth0();

    if (!isAuthenticated) return null;

    return (
        <button className="auth-btn" onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
            Logout
        </button>
    )
}

export default LogoutButton;
