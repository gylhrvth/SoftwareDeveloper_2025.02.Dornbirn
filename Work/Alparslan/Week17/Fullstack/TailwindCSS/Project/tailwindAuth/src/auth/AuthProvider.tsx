import { Auth0Provider } from "@auth0/auth0-react";

type AuthProviderProps = {
    children: React.ReactNode;
};

const domain = import.meta.env.VITE_AUTH0_DOMAIN as string;
const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID as string;

export default function AuthProvider({ children }: AuthProviderProps) {
    return (
        <Auth0Provider
            domain={domain}
            clientId={clientId}
            authorizationParams={{
                redirect_uri: window.location.origin,
            }}
        >
            {children}
        </Auth0Provider>
    )
}
