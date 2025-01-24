import type { CommandInteraction } from "eris";
import { Constants } from "eris";
import { exec } from "child_process";
import { promisify } from "util";

/**
 * Check the status of the servers.
 * @param interaction - The interaction received from Discord.
 */
export async function statusCommand(interaction: CommandInteraction): Promise<void> {
    const status = await promisify(exec)("pm2 status");

    await interaction.createMessage({
        content: `\`\`\`\n${status.stdout}\n\`\`\``,
        flags: Constants.MessageFlags.EPHEMERAL,
    });
}
