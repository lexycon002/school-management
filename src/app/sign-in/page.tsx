"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await signIn("credentials", {
        redirect: false, 
        username,
        password,
      });

      if (!res) {
        setError("Something went wrong. Please try again.");
      } else if (res.error) {
        setError("Invalid username or password.");
      } else if (res.ok) {
        // ✅ fetch session manually to get role
        const sessionRes = await fetch("/api/auth/session");
        const session = await sessionRes.json();

        if (session?.user?.role) {
          router.replace(`/dashboard/${session.user.role}`);
        } else {
          router.replace("/"); // fallback
        }
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Unexpected error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-primary">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-12 rounded-md shadow-2xl flex flex-col gap-4 w-80"
      >
        <h1 className="text-xl font-bold text-center">School Management</h1>
        <h2 className="text-gray-500 text-center text-sm">
          Sign in to your account
        </h2>

        {error && <p className="text-sm text-red-500 text-center">{error}</p>}

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="p-2 rounded-md ring-1 ring-gray-300 focus:ring-2 focus:ring-blue-400 outline-none"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 rounded-md ring-1 ring-gray-300 focus:ring-2 focus:ring-blue-400 outline-none"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 transition text-white font-medium rounded-md text-sm p-2"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
