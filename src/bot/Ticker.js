/* @flow */
import type {BotInterface} from "kryptopus/src/domain/bot/model/BotInterface"
import type BotContext from "kryptopus/src/domain/bot/model/BotContext"

export default class Ticker implements BotInterface
{
    /**
     * Execute the bot
     *
     * @param   {BotContext}    context     Bot context
     */
    async execute(context:BotContext):void | Promise<void>
    {
        console.info("Ticker!");
    }

}
