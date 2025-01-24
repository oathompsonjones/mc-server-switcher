import type { CommandInteraction } from "eris";
import { Constants } from "eris";

/**
 * Pings the bot.
 * @param interaction - The interaction received from Discord.
 */
export async function pingCommand(interaction: CommandInteraction): Promise<void> {
    const start = Date.now();

    await interaction.createMessage({
        content: "Pong!",
        flags: Constants.MessageFlags.EPHEMERAL,
    });
    await interaction.editOriginalMessage(`Pong! ${Date.now() - start}ms`);
}
