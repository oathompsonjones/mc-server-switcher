import type { CommandInteraction } from "eris";
import { exec as execSync } from "child_process";
import { promisify } from "util";

const exec = promisify(execSync);

/**
 * Starts the given server.
 * @param interaction - The interaction received from Discord.
 */
export async function startCommand(interaction: CommandInteraction): Promise<void> {
    const server = interaction.data.options?.[0] !== undefined && "value" in interaction.data.options[0]
        ? interaction.data.options[0].value
        : null;
    const status = await exec(`pm2 start ${server}`);

    await interaction.createMessage(`\`\`\`\n${status.stdout}\n\`\`\``);
}
