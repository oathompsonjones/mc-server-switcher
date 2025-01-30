import type { CommandInteraction } from "eris";
import { exec } from "child_process";
import { promisify } from "util";

/**
 * Switches between the two available servers.
 * @param interaction - The interaction received from Discord.
 */
export async function switchCommand(interaction: CommandInteraction): Promise<void> {
    const currentServer = (await promisify(exec)("pm2 status"))
        .stdout
        .split("\n")
        .filter((line) => !line.includes("mc-server-switcher"))
        .find((line) => line.includes("online"));

    if (currentServer === undefined) {
        await interaction.createMessage("No server is currently running.");

        return;
    }

    const serverOn = currentServer.includes("fabric-1.20.1") ? 0 : 1;
    const serverOff = (serverOn + 1) % 2;

    await promisify(exec)(`pm2 stop ${serverOn}`);
    const status = await promisify(exec)(`pm2 start ${serverOff}`);

    await interaction.createMessage(`\`\`\`\n${status.stdout}\n\`\`\``);
}
