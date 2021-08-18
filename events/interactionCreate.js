const Discord = require('discord.js');

module.exports = async (client, interaction) => {
    interaction = client.interactionFunctions(interaction, client);

    if (interaction.isSelectMenu()) client.emit('selectionClick', interaction);
    if (interaction.isButton()) client.emit('buttonClick', interaction);
    if (interaction.isContextMenu()) client.emit('ContextClick', interaction);
}