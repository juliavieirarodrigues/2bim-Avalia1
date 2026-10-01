import { gerarDesenho } from "../../lib/desenho.js";

export async function onRequest(context) {
  const { request, env } = context;

  if (request.method !== "POST") {
    return new Response("Método Não Permitido", { status: 405 });
  }

  let body;
  try {
    body = await request.json();
  } catch (e) {
    return new Response(JSON.stringify({ error: "Corpo ausente ou JSON inválido." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { numero } = body || {};
  if (
    numero === undefined ||
    typeof numero !== "number" ||
    !Number.isInteger(numero) ||
    numero < 1 ||
    numero > 100
  ) {
    return new Response(JSON.stringify({ error: "O número deve ser um inteiro entre 1 e 100." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const authHeader = request.headers.get("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return new Response(JSON.stringify({ error: "Token ausente ou malformado." }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  const idToken = authHeader.split("Bearer ")[1];

  try {
    const googleResponse = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${idToken}`);
    if (!googleResponse.ok) {
      return new Response(JSON.stringify({ error: "Token inválido ou expirado." }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const tokenData = await googleResponse.json();

    if (tokenData.aud !== env.GOOGLE_CLIENT_ID || tokenData.email_verified !== "true") {
      return new Response(JSON.stringify({ error: "Token não autorizado ou e-mail não verificado." }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const email = tokenData.email;

    const svgContent = gerarDesenho(numero, email);

    return new Response(svgContent, {
      status: 200,
      headers: {
        "Content-Type": "image/svg+xml",
      },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Erro ao validar o token com o Google." }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }
}