import type { CommandInteraction } from "eris";
import { exec as execSync } from "child_process";
import { promisify } from "util";

const exec = promisify(execSync);

/**
 * Check the status of the servers.
 * @param interaction - The interaction received from Discord.
 */
export async function statusCommand(interaction: CommandInteraction): Promise<void> {
    const status = await exec("pm2 status");

    await interaction.createMessage(`\`\`\`\n${status.stdout}\n\`\`\``);
}
