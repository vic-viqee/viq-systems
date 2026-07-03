import type { Env } from "./schemas";
import { corsOrigins, generateIntakeId, validateLead } from "./schemas";

const DEFAULT_ORIGINS = [
  "http://localhost:4173",
  "http://localhost:5173",
  "http://127.0.0.1:4173",
  "http://127.0.0.1:5173",
  "https://viqsystems.tech",
  "https://viq-systems.pages.dev",
];

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const origin = request.headers.get("Origin") || "";
    const allowed = [...DEFAULT_ORIGINS, ...corsOrigins(env.CORS_ORIGINS)];
    const corsOrigin = allowed.includes(origin) ? origin : "";

    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: corsHeaders(corsOrigin),
      });
    }

    if (request.method === "GET") {
      return handleGet(url.pathname, env, corsOrigin);
    }

    if (request.method === "POST" && url.pathname === "/contact") {
      return handlePost(request, env, corsOrigin);
    }

    return json({ error: "Not Found" }, 404, corsOrigin);
  },
};

function handleGet(path: string, env: Env, cors: string): Response {
  const name = env.APP_NAME || "Viq Systems API";
  const ver = env.APP_VERSION || "0.1.0";
  const site = env.PUBLIC_SITE_URL || "https://viqsystems.tech";
  const appEnv = env.APP_ENV || "development";

  switch (path) {
    case "/":
      return json(
        {
          service: name,
          version: ver,
          docs_url: "/docs",
          contact_url: "/contact",
          environment: appEnv,
        },
        200,
        cors,
      );

    case "/health":
      return json({ service: name, version: ver, status: "ok" }, 200, cors);

    case "/version":
      return json({ service: name, version: ver, public_site_url: site }, 200, cors);

    default:
      return json({ error: "Not Found" }, 404, cors);
  }
}

async function handlePost(request: Request, env: Env, cors: string): Promise<Response> {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return json({ error: "Invalid JSON body" }, 400, cors);
  }

  const result = validateLead(body);
  if (result.errors) {
    return json({ errors: result.errors }, 422, cors);
  }

  const lead = result.lead!;
  const intakeId = generateIntakeId();
  const receivedAt = new Date().toISOString();

  const emailHtml = [
    "<h2>New Contact Form Submission</h2>",
    `<p><strong>Intake ID:</strong> ${intakeId}</p>`,
    `<p><strong>Received:</strong> ${receivedAt}</p>`,
    "<hr>",
    `<p><strong>Name:</strong> ${htmlEscape(lead.name)}</p>`,
    `<p><strong>Email:</strong> ${htmlEscape(lead.email)}</p>`,
    `<p><strong>Business:</strong> ${htmlEscape(lead.business)}</p>`,
    `<p><strong>Problem:</strong> ${htmlEscape(lead.problem)}</p>`,
    `<p><strong>Impact:</strong> ${htmlEscape(lead.impact)}</p>`,
    `<p><strong>Timeline:</strong> ${htmlEscape(lead.timeline)}</p>`,
    lead.package ? `<p><strong>Package:</strong> ${htmlEscape(lead.package)}</p>` : "",
    "<hr>",
    `<p><em>Sent from viqsystems.tech contact form</em></p>`,
  ].join("\n");

  const emailText = [
    "New Contact Form Submission",
    `Intake ID: ${intakeId}`,
    `Received: ${receivedAt}`,
    "---",
    `Name: ${lead.name}`,
    `Email: ${lead.email}`,
    `Business: ${lead.business}`,
    `Problem: ${lead.problem}`,
    `Impact: ${lead.impact}`,
    `Timeline: ${lead.timeline}`,
    lead.package ? `Package: ${lead.package}` : "",
    "---",
    "Sent from viqsystems.tech contact form",
  ].join("\n");

  const toEmail = env.LEAD_EMAIL_TO || "victorlewismurimi@gmail.com";

  let emailError: string | undefined;
  if (env.EMAIL) {
    try {
      await env.EMAIL.send({
        to: toEmail,
        from: { email: "hello@viqsystems.tech", name: "Viq Systems" },
        replyTo: lead.email,
        subject: `New lead from ${lead.name} — ${lead.business}`,
        html: emailHtml,
        text: emailText,
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      emailError = msg;
    }
  } else {
    emailError = "Email binding not configured";
  }

  return json(
    {
      status: "received",
      intake_id: intakeId,
      message: "Lead received. We will review the details and follow up within 24 hours.",
      next_step: `Review the submission and contact the sender from ${env.APP_NAME || "Viq Systems API"}.`,
      received_at: receivedAt,
      package: lead.package || null,
      ...(emailError ? { email_error: emailError } : {}),
    },
    202,
    cors,
  );
}

function htmlEscape(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function corsHeaders(origin: string): Record<string, string> {
  const h: Record<string, string> = {
    "access-control-allow-methods": "GET, POST, OPTIONS",
    "access-control-allow-headers": "Content-Type, Authorization",
  };
  if (origin) {
    h["access-control-allow-origin"] = origin;
    h["vary"] = "Origin";
  }
  return h;
}

function json(data: unknown, status: number, origin: string): Response {
  return Response.json(data, {
    status,
    headers: {
      ...corsHeaders(origin),
      "content-type": "application/json",
    },
  });
}
