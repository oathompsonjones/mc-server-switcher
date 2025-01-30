import type { CommandInteraction } from "eris";
import { exec } from "child_process";
import { promisify } from "util";

/**
 * Restarts the given server.
 * @param interaction - The interaction received from Discord.
 */
export async function restartCommand(interaction: CommandInteraction): Promise<void> {
    const server = interaction.data.options?.[0] !== undefined && "value" in interaction.data.options[0]
        ? interaction.data.options[0].value
        : null;
    const status = await promisify(exec)(`pm2 restart ${server}`);

    await interaction.createMessage(`\`\`\`\n${status.stdout}\n\`\`\``);
}
