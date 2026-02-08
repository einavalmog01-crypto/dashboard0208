import { getActiveEnvironment } from "@/app/get-active-environment"
import { runSshCommand } from "@/lib/ssh/run-ssh-command.server"

export async function POST(req: Request) {
  try {
    const { message } = await req.json()
    const env = await getActiveEnvironment()

    if (!env) {
      return new Response(
        JSON.stringify({ error: "No active environment selected" }),
        { status: 400 }
      )
    }

    // Call JESI chat handler
    const reply = await runSshCommand(
      env,
      `cd /jesi/chat && ./chat_handler.sh "${message.replace(/"/g, '\\"')}"`
    )

    return new Response(JSON.stringify({ reply }), { status: 200 })
  } catch (err) {
    console.error("Chat API error:", err)
    return new Response(JSON.stringify({ error: "Failed to get response" }), {
      status: 500,
    })
  }
}
