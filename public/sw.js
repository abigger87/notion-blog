/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// If the loader is already loaded, just stop.
if (!self.define) {
  const singleRequire = name => {
    if (name !== 'require') {
      name = name + '.js'
    }
    let promise = Promise.resolve()
    if (!registry[name]) {
      promise = new Promise(async resolve => {
        if ('document' in self) {
          const script = document.createElement('script')
          script.src = name
          document.head.appendChild(script)
          script.onload = resolve
        } else {
          importScripts(name)
          resolve()
        }
      })
    }
    return promise.then(() => {
      if (!registry[name]) {
        throw new Error(`Module ${name} didn’t register its module`)
      }
      return registry[name]
    })
  }

  const require = (names, resolve) => {
    Promise.all(names.map(singleRequire)).then(modules =>
      resolve(modules.length === 1 ? modules[0] : modules)
    )
  }

  const registry = {
    require: Promise.resolve(require),
  }

  self.define = (moduleName, depsNames, factory) => {
    if (registry[moduleName]) {
      // Module is already loading or loaded.
      return
    }
    registry[moduleName] = Promise.resolve().then(() => {
      let exports = {}
      const module = {
        uri: location.origin + moduleName.slice(1),
      }
      return Promise.all(
        depsNames.map(depName => {
          switch (depName) {
            case 'exports':
              return exports
            case 'module':
              return module
            default:
              return singleRequire(depName)
          }
        })
      ).then(deps => {
        const facValue = factory(...deps)
        if (!exports.default) {
          exports.default = facValue
        }
        return exports
      })
    })
  }
}
define('./sw.js', ['./workbox-b90066a8'], function(workbox) {
  'use strict'

  /**
   * Welcome to your Workbox-powered service worker!
   *
   * You'll need to register this file in your web app.
   * See https://goo.gl/nhQhGp
   *
   * The rest of the code is auto-generated. Please don't update this file
   * directly; instead, make changes to your Workbox build configuration
   * and re-run your build process.
   * See https://goo.gl/2aRDsh
   */

  importScripts()
  workbox.skipWaiting()
  workbox.clientsClaim()
  /**
   * The precacheAndRoute() method efficiently caches and responds to
   * requests for URLs in the manifest.
   * See https://goo.gl/S9QRab
   */

  workbox.precacheAndRoute(
    [
      {
        url: '/_next/static/runtime/amp.js',
        revision: '638440ab3e3f74a48d314a3c5ef0f0c1',
      },
      {
        url: '/_next/static/runtime/amp.js.map',
        revision: '539938e9e6db4ecde21a27aa8028a0c2',
      },
      {
        url: '/_next/static/runtime/main.js',
        revision: 'd7792927843fdd8d24208fb629d98b25',
      },
      {
        url: '/_next/static/runtime/main.js.map',
        revision: '21624ca42de444b849acadbd256435cb',
      },
      {
        url: '/_next/static/runtime/polyfills.js',
        revision: 'd483e1670f506a084bb4a623e938245c',
      },
      {
        url: '/_next/static/runtime/polyfills.js.map',
        revision: '9e99330d7177a9df34074356546c67da',
      },
      {
        url: '/_next/static/runtime/webpack.js',
        revision: '357be8f6e52fbf435bac84b44c771f79',
      },
      {
        url: '/_next/static/runtime/webpack.js.map',
        revision: 'c57164099ae1da7ba0ca3502e846d4e2',
      },
    ],
    {
      ignoreURLParametersMatching: [/ts/],
    }
  )
  workbox.cleanupOutdatedCaches()
})
//# sourceMappingURL=sw.js.map