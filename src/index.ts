import { Client, CommandInteraction, Constants } from "eris";
import type { ApplicationCommandCreateOptions } from "eris";
import { pingCommand } from "./commands/ping.js";
import { restartCommand } from "./commands/restart.js";
import { startCommand } from "./commands/start.js";
import { statusCommand } from "./commands/status.js";
import { stopCommand } from "./commands/stop.js";
import { switchCommand } from "./commands/switch.js";

// Delcare environment variables.
declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace NodeJS {
        // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
        interface ProcessEnv {
            TOKEN: string;
            GUILD_ID: string;
            OWNER_ID: string;
        }
    }
}

// Create a new client instance.
const client = new Client(process.env.TOKEN);

// Log the ready event.
client.on("ready", () => {
    // Register commands.
    const serverArg = {
        choices: [
            {
                name: "Fabric 1.20.1",
                value: "fabric-1.20.1",
            },
            {
                name: "Forge 1.12.2",
                value: "forge-1.12.2",
            },
        ],
        description: "The server name",
        name: "server",
        required: true,
        type: Constants.ApplicationCommandOptionTypes.STRING,
    };

    const commandData: Array<ApplicationCommandCreateOptions<true>> = [
        {
            description: "Ping the bot",
            name: "ping",
            type: Constants.ApplicationCommandTypes.CHAT_INPUT,
        },
        {
            description: "Get the status of the Minecraft servers",
            name: "status",
            type: Constants.ApplicationCommandTypes.CHAT_INPUT,
        },
        {
            description: "Start the given Minecraft server",
            name: "start",
            options: [serverArg],
            type: Constants.ApplicationCommandTypes.CHAT_INPUT,
        },
        {
            description: "Stop the given Minecraft server",
            name: "stop",
            options: [serverArg],
            type: Constants.ApplicationCommandTypes.CHAT_INPUT,
        },
        {
            description: "Restart the given Minecraft server",
            name: "restart",
            options: [serverArg],
            type: Constants.ApplicationCommandTypes.CHAT_INPUT,
        },
        {
            description: "Switch between the two Minecraft servers",
            name: "switch",
            type: Constants.ApplicationCommandTypes.CHAT_INPUT,
        },
    ];

    for (const command of commandData)
        void client.createGuildCommand(process.env.GUILD_ID, command);

    console.log("Bot is ready.");
});

// Handle commands.
client.on("interactionCreate", (interaction) => {
    // Make sure the interaction is a command and in the correct guild.
    if (!(interaction instanceof CommandInteraction) || interaction.guildID !== process.env.GUILD_ID)
        return;

    // Make sure the user has the correct permissions.
    if (!interaction.member!.permissions.has("administrator"))
        return;

    // Check for owner commands.
    if (interaction.member!.id === process.env.OWNER_ID) {
        switch (interaction.data.name) {
            case "start":
                void startCommand(interaction);

                return;
            case "stop":
                void stopCommand(interaction);

                return;
            case "restart":
                void restartCommand(interaction);

                return;
        }
    }

    // Check for regular commands.
    switch (interaction.data.name) {
        case "ping":
            void pingCommand(interaction);
            break;
        case "status":
            void statusCommand(interaction);
            break;
        case "switch":
            void switchCommand(interaction);
            break;
        case "restart":
        case "start":
        case "stop":
            void interaction.createMessage({
                content: "You do not have permission to run this command.",
                flags: Constants.MessageFlags.EPHEMERAL,
            });
            break;
    }
});

// Connect to Discord.
await client.connect();
