/* @flow */
import type {CollectorInterface} from "kryptopus/src/domain/chart/model/CollectorInterface"
import Candle from "kryptopus/lib/domain/chart/model/Candle"
import fetch from "node-fetch"

/**
 * Collect candles
 *
 * @see https://min-api.cryptocompare.com/
 */
export default class Collector implements CollectorInterface
{

    async collect(exchange:string, baseAsset:string, quoteAsset:string, interval:number, startTime:number, endTime:number):Array<Candle> | Promise<Array<Candle>>
    {
        // Build URL
        let url = "https://min-api.cryptocompare.com/data/";
        switch (interval) {
            // 1 minute
            case 60000: {
                url += "histominute";
                break;
            }

            // 1 hour
            case 3600000: {
                url += "histohour";
                break;
            }

            // 1 day
            case 86400000: {
                url += "histoday";
                break;
            }

            // Invalid
            default: {
                throw new Error(`Invalid interval "${interval}", allowed: 60000 (1 minute), 3600000 (1 hour), 86400000 (1 day)`);
            }
        }
        url += `?fsym=${baseAsset}&tsym=${quoteAsset}&e=${exchange}&extraParams=kryptopus`;

        let json = {};
        try {
            let response = await fetch(url);
            json = await response.json();
        } catch (error) {
            throw new Error(`Unable to fetch candles from cryptocompare (${error.message})`);
        }

        if (json.Response !== "Success") {
            throw new Error("Unable to fetch candles from cryptocompare");
        }

        let candles = [];
        if (Array.isArray(json.Data)) {
            for (let raw of json.Data) {
                const openTime = raw.time * 1000;
                const closeTime = openTime + 24 * 60 * 60 * 1000;
                const open = raw.open;
                const close = raw.close;
                const low = raw.low;
                const high = raw.high;
                const volume = raw.volumefrom;
                let candle = new Candle(openTime, closeTime, open, close, low, high);

                candles.push(candle);
            }
        }

        return candles;
    }
}
