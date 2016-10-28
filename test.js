// @flow
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
    See http://creativecommons.org/licenses/by/3.0/deed.de
    endregion
*/
// region imports
import * as QUnit from 'qunit-cli'
// NOTE: Only needed for debugging this file.
try {
    module.require('source-map-support/register')
} catch (error) {}
import configuration from 'web-node/configurator.compiled'
import type {Services} from 'web-node/type'

import Index from './index'
// endregion
QUnit.module('index')
QUnit.load()
// TODO test rendering the tpls.
// TODO Is only a base config with extended vars of this plugin not the
// dependent plugins included!
console.log('A', configuration)
// region tests
// / region api
QUnit.test('exit', async (assert:Object):Promise<void> => {
    let testValue:boolean = false
    const services:Services = {nginx: {kill: ():void => {
        testValue = true
    }}}
    assert.deepEqual(await Index.exit(services, [], configuration), services)
    assert.ok(testValue)
})
QUnit.test('preLoadService', async (assert:Object):Promise<void> =>
    assert.deepEqual(
        await Index.preLoadService({nginx: {}}, configuration), {nginx: {}}))
// / endregion
// / region helper
QUnit.test('checkReachability', async (assert:Object):Promise<void> => {
    assert.ok(await Index.checkReachability(configuration.server))
    assert.notOk(await Index.checkReachability(configuration.server, false))
})
// / endregion
// endregion
// region vim modline
// vim: set tabstop=4 shiftwidth=4 expandtab:
// vim: foldmethod=marker foldmarker=region,endregion:
// endregion