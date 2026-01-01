import { getShiprocketToken } from "../../../lib/shiprocket"; // absolute import recommended

export async function POST(req) {
  try {
    const body = await req.json();
    const { pincode, weight = 0.5, cod = false } = body;

    if (!pincode) {
      return new Response(JSON.stringify({ error: "Pincode required" }), {
        status: 400,
      });
    }

    const token = await getShiprocketToken();

    const response = await fetch(
      `https://apiv2.shiprocket.in/v1/external/courier/serviceability?pickup_postcode=110001&delivery_postcode=${pincode}&cod=${
        cod ? 1 : 0
      }&weight=${weight}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const data = await response.json();

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
