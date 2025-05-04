import { j as json } from "../../../../chunks/index2.js";
import { q as query } from "../../../../chunks/db.js";
async function GET() {
  try {
    const result = await query("DELETE FROM sessions WHERE expires < $1", [(/* @__PURE__ */ new Date()).toISOString()]);
    return json({
      success: true,
      message: `Cron job completed successfully. Deleted ${result.rowCount} expired sessions.`
    });
  } catch (error) {
    console.error("Cron job error:", error);
    return json({
      success: false,
      message: "Cron job failed",
      error: error.message
    }, { status: 500 });
  }
}
export {
  GET
};
