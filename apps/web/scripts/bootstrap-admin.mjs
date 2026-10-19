import postgres from "postgres";

const databaseUrl = process.env.DATABASE_URL;
const googleSubject = process.env.AUTH_BOOTSTRAP_ADMIN_SUB;

if (!databaseUrl) throw new Error("DATABASE_URL is required.");
if (!googleSubject || !/^\d{6,255}$/.test(googleSubject)) {
  throw new Error("AUTH_BOOTSTRAP_ADMIN_SUB must be an exact Google subject identifier.");
}

const sql = postgres(databaseUrl, { max: 1, prepare: false });

try {
  const promoted = await sql.begin(async (transaction) => {
    const identities = await transaction`
      SELECT user_id
      FROM accounts
      WHERE provider = 'google' AND provider_account_id = ${googleSubject}
      FOR UPDATE
    `;

    if (identities.length !== 1) {
      throw new Error("Exactly one previously signed-in Google identity must match the configured subject.");
    }

    const [{ user_id: userId }] = identities;
    await transaction`UPDATE users SET role = 'admin', updated_at = NOW() WHERE id = ${userId}`;
    await transaction`DELETE FROM sessions WHERE user_id = ${userId}`;
    return true;
  });

  if (promoted) console.log("Administrator promoted. Existing sessions were revoked; sign in again.");
} finally {
  await sql.end();
}
