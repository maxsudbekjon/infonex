// src/pages/Login.tsx
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";

export default function Login() {
  const { login } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr("");
    setLoading(true);

    try {
      await login(username, password);
      window.location.href = "/admin";
    } catch {
      setErr("Incorrect username or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen bg-gray-900 flex items-center justify-center">
      <form
        className="bg-gray-800 p-8 rounded-xl w-96 shadow-xl"
        onSubmit={handleLogin}
      >
        <h1 className="text-white text-2xl mb-6">Login</h1>

        {err && <div className="text-red-400 mb-3">{err}</div>}

        <input
          className="w-full p-3 mb-3 bg-gray-700 text-white rounded"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          className="w-full p-3 mb-4 bg-gray-700 text-white rounded"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          disabled={loading}
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
