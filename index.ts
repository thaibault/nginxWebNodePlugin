// #!/usr/bin/env node
// -*- coding: utf-8 -*-
/** @module nginxWebNodePlugin */
'use strict'
/* !
    region header
    [Project page](https://torben.website/nginxWebNodePlugin)

    Copyright Torben Sickert (info["~at~"]torben.website) 16.12.2012

    License
    -------

    This library written by Torben Sickert stand under a creative commons
    naming 3.0 unported license.
    See https://creativecommons.org/licenses/by/3.0/deed.de
    endregion
*/
// region imports
import {
    ChildProcess, exec as executeChildProcess, spawn as spawnChildProcess
} from 'child_process'
import Tools from 'clientnode'
import {PlainObject} from 'clientnode/type'
import {Configuration, ServicePromises, Services} from 'web-node/type'
// endregion
// region plugins/classes
/**
 * Launches an application server und triggers all some pluginable hooks on
 * an event.
 */
export class Nginx {
    // region api
    /**
     * Start nginx's child process and return a Promise which observes this
     * service.
     * @param servicePromises - An object with stored service promise
     * instances.
     * @param services - An object with stored service instances.
     * @param configuration - Mutable by plugins extended configuration object.
     * @returns A promise which correspond to the plugin specific continues
     * service.
     */
    static async loadService(
        servicePromises:ServicePromises,
        services:Services,
        configuration:Configuration
    ):Promise<{name:string;promise:Promise<object>}> {
        if (!services.hasOwnProperty('nginx')) {
            services.nginx = spawnChildProcess('nginx', [], {
                cwd: process.cwd(),
                env: process.env,
                shell: true,
                stdio: 'inherit'
            })
            services.nginx.reload = ():Promise<string> =>
                new Promise((
                    resolve:Function, reject:Function
                ):ChildProcess =>
                    executeChildProcess(
                        'nginx -s reload',
                        {shell: true},
                        (
                            error:Error|undefined,
                            standardOutput:string,
                            standardErrorOutput:string
                        ):void => {
                            if (error) {
                                error.standardErrorOutput = standardErrorOutput
                                reject(error)
                            } else
                                resolve(standardOutput)
                        }
                    )
                )
            let promise:Promise<object> = new Promise((
                resolve:Function, reject:Function
            ):void => {
                for (const closeEventName:string of Tools.closeEventNames)
                    services.nginx.on(
                        closeEventName,
                        Tools.getProcessCloseHandler(
                            resolve,
                            configuration.server.proxy.optional ?
                                resolve :
                                reject,
                            {reason: services.nginx, process: services.nginx}
                        )
                    )
            })
            try {
                await Nginx.checkReachability(configuration.server)
            } catch (error) {
                if (configuration.server.proxy.optional) {
                    console.warn(
                        `Nginx couldn't be started but was marked as optional.`
                    )
                    services.nginx = null
                    promise = null
                } else
                    throw error
            }
            return {name: 'nginx', promise}
        }
        return services.nginx
    }
    /**
     * Application will be closed soon.
     * @param services - An object with stored service instances.
     * @param configuration - Mutable by plugins extended configuration object.
     * @returns Given object of services.
     */
    static async shouldExit(
        services:Services, configuration:Configuration
    ):Services {
        if (services.nginx !== null) {
            services.nginx.kill('SIGINT')
            await Nginx.checkReachability(configuration.server, true)
        }
        delete services.nginx
        return services
    }
    // endregion
    // region helper
    /**
     * Check if a nginx server is currently (not) running.
     * @param serverConfiguration - Mutable by plugins extended configuration
     * object.
     * @param inverse - Boolean indicating if we should check for reachability
     * or unreachability.
     * @param timeoutInSeconds - Delay after assuming given resource isn't
     * available if no response is coming.
     * @param pollIntervallInSeconds - Seconds between two tries to reach given
     * url.
     * @param statusCodes - Status codes to accept an interpret as running
     * server.
     * @param options - Fetch options to use.
     * @returns A promise which will be resolved if a request to given url has
     * (not) finished. Otherwise returned promise will be rejected.
     */
    static async checkReachability(
        serverConfiguration:Configuration,
        inverse:boolean = false,
        timeoutInSeconds:number = 3,
        pollIntervallInSeconds:number = 0.1,
        statusCodes:Array<number> = [
            100, 101, 102,
            200, 201, 202, 203, 204, 205, 206, 207, 208, 226,
            300, 301, 302, 303, 304, 305, 306, 307, 308
        ],
        options:PlainObject = {redirect: 'manual'}
    ):Promise<object> {
        if (serverConfiguration.proxy.ports.length > 0) {
            const url:string =
                'http' +
                (serverConfiguration.proxy.ports[0] === 443 ? 's' : '') +
                `://${serverConfiguration.application.hostName}:` +
                `${serverConfiguration.proxy.ports[0]}`
            return await (
                inverse ?
                    Tools.checkUnreachability(
                        url,
                        true,
                        timeoutInSeconds,
                        pollIntervallInSeconds,
                        statusCodes,
                        options
                    ) :
                    Tools.checkReachability(
                        url,
                        true,
                        statusCodes,
                        timeoutInSeconds,
                        pollIntervallInSeconds,
                        options
                    )
            )
        }
        return {}
    }
    // endregion
}
export default Nginx
// endregion
// region vim modline
// vim: set tabstop=4 shiftwidth=4 expandtab:
// vim: foldmethod=marker foldmarker=region,endregion:
// endregion