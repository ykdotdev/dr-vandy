let cachedToken = null;
let tokenExpiry = 0;

export async function getShiprocketToken() {
  if (cachedToken && Date.now() < tokenExpiry) return cachedToken;

  const res = await fetch(
    "https://apiv2.shiprocket.in/v1/external/auth/login",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: process.env.SHIPROCKET_EMAIL,
        password: process.env.SHIPROCKET_PASSWORD,
      }),
    }
  );

  const data = await res.json();
  console.log("Shiprocket login response:", data); // <-- add here
  console.log("Token:", data.token); // <-- add here
  cachedToken = data.token;
  tokenExpiry = Date.now() + 9 * 24 * 60 * 60 * 1000; // ~9 days

  return cachedToken;
}
