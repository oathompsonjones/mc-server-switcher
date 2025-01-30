import type { CommandInteraction } from "eris";

/**
 * Pings the bot.
 * @param interaction - The interaction received from Discord.
 */
export async function pingCommand(interaction: CommandInteraction): Promise<void> {
    const start = Date.now();

    await interaction.createMessage("Pong!");
    await interaction.editOriginalMessage(`Pong! ${Date.now() - start}ms`);
}
