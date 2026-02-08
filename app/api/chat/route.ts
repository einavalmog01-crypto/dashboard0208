import { getActiveEnvironment } from "@/lib/get-active-environment"
import { runSshCommand } from "@/lib/ssh/run-ssh-command.server"

export async function POST(req: Request) {
  try {
    const { message } = await req.json()
    const selectedEnv = req.headers.get("x-env")

    if (!selectedEnv) {
      return new Response(
        JSON.stringify({ error: "No active environment selected" }),
        { status: 400 }
      )
    }

    let env
    try {
      env = getActiveEnvironment(selectedEnv)
    } catch {
      return new Response(
        JSON.stringify({ error: `Environment "${selectedEnv}" not found` }),
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
