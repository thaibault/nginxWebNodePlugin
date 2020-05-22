// #!/usr/bin/env node
// -*- coding: utf-8 -*-
'use strict'
/* !
    region header
    Copyright Torben Sickert (info["~at~"]torben.website) 16.12.2012

    License
    -------

    This library written by Torben Sickert stand under a creative commons
    naming 3.0 unported license.
    See https://creativecommons.org/licenses/by/3.0/deed.de
    endregion
*/
// region imports
import {configuration as baseConfiguration, PluginAPI} from 'web-node'
import {Configuration, Services} from 'web-node/type'

import Index from './index'
// endregion
describe('nginx', async ():Promise<void> => {
    const configuration:Configuration = (await PluginAPI.loadAll(
        baseConfiguration
    )).configuration
    // region tests
    // / region api
    test('loadService', async ():Promise<void> => {
        try {
            expect(await Index.loadService({}, {nginx: null}, configuration))
                .toBeNull()
        } catch (error) {
            console.error(error)
        }
    })
    test('shouldExit', async ():Promise<void> => {
        let testValue:boolean = false
        const services:Services = {nginx: {kill: ():void => {
            testValue = true
        }}}
        try {
            expect(await Index.shouldExit(services, configuration))
                .toStrictEqual(services)
        } catch (error) {
            console.error(error)
        }
        expect(services).toStrictEqual({})
        expect(testValue).toStrictEqual(true)
    })
    // / endregion
    // / region helper
    test('checkReachability', async ():Promise<void> => {
        try {
            await Index.checkReachability(configuration.server, false, 0.2)
        } catch (error) {}
        expect(true).toStrictEqual(true)
        try {
            await Index.checkReachability(configuration.server, true, 0.2)
            expect(true).toStrictEqual(true)
        } catch (error) {
            console.error(error)
        }
    })
    // / endregion
    // endregion
})
// region vim modline
// vim: set tabstop=4 shiftwidth=4 expandtab:
// vim: foldmethod=marker foldmarker=region,endregion:
// endregion
