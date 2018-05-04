/* @flow */
import {bind} from "decko"
import type {BundleInterface} from "solfegejs-application/src/BundleInterface"

/**
 * Cryptocompare plugin for Kryptopus
 */
export default class Bundle implements BundleInterface
{
    /**
     * Get bundle path
     *
     * @return  {String}        The bundle path
     */
    getPath():string
    {
        return __dirname;
    }
}
