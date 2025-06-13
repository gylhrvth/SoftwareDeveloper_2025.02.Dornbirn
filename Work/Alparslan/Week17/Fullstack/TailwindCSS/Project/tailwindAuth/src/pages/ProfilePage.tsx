import { useAuth0 } from "@auth0/auth0-react";

export default function ProfilePage() {
  const { user, logout, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div className="text-center p-8">Lädt...</div>;
  }

  if (!isAuthenticated || !user) {
    return (
      <div className="text-center p-8 text-[var(--color-error)]">
        Nicht eingeloggt.
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-8 rounded-2xl shadow-lg bg-[var(--color-bg)] dark:bg-[var(--color-bg-dark)] text-[var(--color-text)] text-center">
      <img
        src={user.picture}
        alt={user.name}
        className="mx-auto mb-4 w-24 h-24 rounded-full shadow"
      />
      <h2 className="text-2xl font-bold mb-2">{user.name}</h2>
      <p className="mb-4">{user.email}</p>
      <button
        onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
        className="bg-[var(--color-primary)] text-white px-4 py-2 rounded hover:bg-[var(--color-primary-hover)] transition"
      >
        Logout
      </button>
    </div>
  );
}
