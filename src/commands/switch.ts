import type { CommandInteraction } from "eris";
import { Constants } from "eris";
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
        await interaction.createMessage({
            content: "No server is currently running.",
            flags: Constants.MessageFlags.EPHEMERAL,
        });

        return;
    }

    const serverOn = currentServer.includes("fabric-1.20.1") ? "fabric-1.20.1" : "forge-1.12.2";
    const serverOff = serverOn === "fabric-1.20.1" ? "forge-1.12.2" : "fabric-1.20.1";
    const status = await promisify(exec)(`pm2 stop ${serverOn} && pm2 start ${serverOff}`);

    await interaction.createMessage({
        content: `\`\`\`\n${status.stdout}\n\`\`\``,
        flags: Constants.MessageFlags.EPHEMERAL,
    });
}
