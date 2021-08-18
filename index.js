module.exports = {
    Client: require('./client'),

    // Structures
    contextMenu: require('./structures/contextMenu'),
    slashCommand: require('./structures/slashCommand'),
    radioClient: require('./structures/radioClient'),
    chatBot: require('dotwood.js/structures/chatBot'),
    youtubeTogether: require('dotwood.js/structures/youtubeTogether'),
    betrayal: require('dotwood.js/structures/betrayal'),
    chess: require('dotwood.js/structures/chess'),
    fishington: require('dotwood.js/structures/fishington'),
    poker: require('dotwood.js/structures/poker'),

    codeBlock: require('./util/formatter').codeBlock,
    inlineCode: require('./util/formatter').inlineCode,
    italicText: require('./util/formatter').italicText,
    boldText: require('./util/formatter').boldText,
    strikethroughText: require('./util/formatter').strikethroughText,
    quoteText: require('./util/formatter').quoteText,
    blockQuote: require('./util/formatter').blockQuote,
    hyperlink: require('./util/formatter').hyperlink,
    spoiler: require('./util/formatter').spoiler,
    userMention: require('./util/formatter').userMention,
    channelMention: require('./util/formatter').channelMention,
    roleMention: require('./util/formatter').roleMention,
};