import { useSession, signIn, signOut } from "next-auth/react";
import PasswordForm from "../components/PasswordForm";
import PasswordList from "../components/PasswordList";

export default function Home() {
  const { data: session } = useSession();

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold mb-4">No Place Like Home</h1>
        <p className="mb-4">Please sign in to manage your passwords.</p>
        <button
          onClick={() => signIn()}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Sign In
        </button>
      </div>
    );
  }

  const handlePasswordSubmit = async (passwordData) => {
    try {
      const response = await fetch("/api/passwords", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...passwordData, userId: session.user.id }),
      });

      if (!response.ok) {
        throw new Error("Failed to save password");
      }

      // Refresh the password list after adding a new password
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">No Place Like Home</h1>
      <p className="mb-4">Welcome, {session.user.email}</p>
      <button
        onClick={() => signOut()}
        className="bg-red-500 text-white px-4 py-2 rounded mb-4"
      >
        Sign Out
      </button>
      <PasswordForm onSubmit={handlePasswordSubmit} />
      <PasswordList />
    </div>
  );
}
