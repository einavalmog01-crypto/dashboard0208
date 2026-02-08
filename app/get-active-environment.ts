// This is a simple helper to return the current active environment
// Adjust it based on your actual logic (e.g., from DB, localStorage, or config)

export async function getActiveEnvironment(): Promise<string | null> {
  // Example: pick from environment variable
  const env = process.env.ACTIVE_ENV || null;

  // Or hardcode for testing
  // const env = "tst"; 

  return env;
}
