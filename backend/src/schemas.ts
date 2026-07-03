export interface Env {
  APP_NAME?: string;
  APP_VERSION?: string;
  APP_ENV?: string;
  PUBLIC_SITE_URL?: string;
  CORS_ORIGINS?: string;
  LEAD_EMAIL_TO?: string;
  EMAIL?: SendEmail;
}

interface SendEmail {
  send(msg: EmailMessage): Promise<{ messageId: string }>;
}

interface EmailMessage {
  to: string | string[];
  from: { email: string; name?: string };
  replyTo?: string;
  subject: string;
  html?: string;
  text?: string;
}

const ALLOWED_PACKAGES = new Set(["starter", "business", "advanced"]);

export interface LeadInput {
  name: string;
  email: string;
  business: string;
  problem: string;
  impact: string;
  timeline: string;
  package?: string;
}

export interface ValidationError {
  field: string;
  message: string;
}

export function validateLead(data: Record<string, unknown>): {
  lead?: LeadInput;
  errors?: ValidationError[];
} {
  const errors: ValidationError[] = [];

  const name = stringField(data, "name");
  const email = stringField(data, "email");
  const business = stringField(data, "business");
  const problem = stringField(data, "problem");
  const impact = stringField(data, "impact");
  const timeline = stringField(data, "timeline");
  const pkg = data["package"];

  if (!name || name.length < 2)
    errors.push({ field: "name", message: "Must be at least 2 characters" });
  if (!email || !isValidEmail(email))
    errors.push({ field: "email", message: "Must be a valid email address" });
  if (!business || business.length < 2)
    errors.push({ field: "business", message: "Must be at least 2 characters" });
  if (!problem || problem.length < 2)
    errors.push({ field: "problem", message: "Must be at least 2 characters" });
  if (!impact || impact.length < 2)
    errors.push({ field: "impact", message: "Must be at least 2 characters" });

  if (pkg !== undefined && pkg !== null && pkg !== "" && !ALLOWED_PACKAGES.has(String(pkg))) {
    errors.push({ field: "package", message: "Package must be starter, business, or advanced" });
  }

  if (errors.length > 0) return { errors };

  return {
    lead: {
      name: name!,
      email: email!,
      business: business!,
      problem: problem!,
      impact: impact!,
      timeline: timeline || "Flexible, just exploring options",
      package: pkg ? String(pkg) : undefined,
    },
  };
}

function stringField(data: Record<string, unknown>, key: string): string | undefined {
  const v = data[key];
  if (typeof v === "string" && v.trim().length > 0) return v.trim();
  return undefined;
}

function isValidEmail(email: string): boolean {
  const at = email.indexOf("@");
  if (at < 1 || at === email.length - 1) return false;
  const domain = email.slice(at + 1);
  return domain.includes(".");
}

export function generateIntakeId(): string {
  const hex = crypto.randomUUID().replace(/-/g, "").slice(0, 12);
  return `lead_${hex}`;
}

export function corsOrigins(raw: string | undefined): string[] {
  if (!raw) return [];
  return raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}
