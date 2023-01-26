export type ActivityConfig = {
    channelId?: string;
    activityId?: ActivityTypes | string;
    token?: string;
}

export enum ActivityTypes {
    WatchTogether = "880218394199220334",
    PuttyParty = "945737671223947305",
    PokerNight = "755827207812677713",
    SketchHeads = "902271654783242291",
    ChessInThePark = "832012774040141894",
    LandIO = "903769130790969345",
    Blazing8s = "832025144389533716",
    LetterLeague = "879863686565621790",
    CheckersInThePark = "832013003968348200",
    SpellCast = "852509694341283871",
    BobbleLeague = "947957217959759964",
    KnowWhatIMeme = "950505761862189096",
    AskAway = "976052223358406656",
    WordSnacks = "879863976006127627",
    BashOut = "1006584476094177371"
}