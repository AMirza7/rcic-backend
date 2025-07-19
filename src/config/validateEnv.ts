// src/config/validateEnv.ts
import dotenv from "dotenv";
dotenv.config(); // load .env into process.env
// src/config/validateEnv.ts (top)
import "dotenv-flow/config";   // this auto‑loads the right file


const envFile =
  process.env.NODE_ENV === "production"
    ? ".env.production"
    : ".env.development";

dotenv.config({ path: envFile });


// List every key from Required-Keys.md that your app depends on
const requiredEnvVars = [
  "NODE_ENV",
  "PORT",
  "APP_SECRET",
  "SESSION_SECRET",
  "ENCRYPTION_KEY",
  "JWT_SECRET",
  "JWT_REFRESH_SECRET",
  "JWT_ACCESS_EXPIRES_IN",
  "JWT_REFRESH_EXPIRES_IN",
  "JWT_ALGORITHM",
  "RATE_LIMIT_WINDOW_MS",
  "RATE_LIMIT_MAX_REQUESTS",
  "CORS_ORIGIN",
  "DATABASE_URL",
  "REDIS_URL",
  "STRIPE_SECRET_KEY",
  "STRIPE_PUBLISHABLE_KEY",
  "STRIPE_WEBHOOK_SECRET",
  // include your STRIPE_PRICE_* IDs here if you want to validate them too
  "SMTP_HOST",
  "SMTP_PORT",
  "SMTP_USER",
  "SMTP_PASS",
  "EMAIL_FROM",
  "TWILIO_ACCOUNT_SID",
  "TWILIO_AUTH_TOKEN",
  "TWILIO_PHONE_NUMBER",
  "WASABI_ENDPOINT",
  "WASABI_KEY",
  "WASABI_SECRET",
  "WASABI_BUCKET",
  "OPENAI_API_KEY",
  "AI_MODEL_VERSION",
  "AI_CONTEXT_WINDOW",
  "AI_RATE_LIMIT",
  "QR_CODE_SECRET",
  "CONNECTION_EXPIRY_DAYS",
  // …add any other required THIRD-PARTY keys (Ad APIs, Analytics, etc.)
];

export function validateEnv() {
  const missing = requiredEnvVars.filter((key) => !process.env[key]);
  if (missing.length) {
    throw new Error(
      `🚨 Missing required environment variables: ${missing.join(", ")}`
    );
  }
}
