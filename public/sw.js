if (!self.define) {
  const e = e => {
      'require' !== e && (e += '.js')
      let c = Promise.resolve()
      return (
        a[e] ||
          (c = new Promise(async c => {
            if ('document' in self) {
              const a = document.createElement('script')
              ;(a.src = e), document.head.appendChild(a), (a.onload = c)
            } else importScripts(e), c()
          })),
        c.then(() => {
          if (!a[e]) throw new Error(`Module ${e} didn’t register its module`)
          return a[e]
        })
      )
    },
    c = (c, a) => {
      Promise.all(c.map(e)).then(e => a(1 === e.length ? e[0] : e))
    },
    a = { require: Promise.resolve(c) }
  self.define = (c, i, s) => {
    a[c] ||
      (a[c] = Promise.resolve().then(() => {
        let a = {}
        const n = { uri: location.origin + c.slice(1) }
        return Promise.all(
          i.map(c => {
            switch (c) {
              case 'exports':
                return a
              case 'module':
                return n
              default:
                return e(c)
            }
          })
        ).then(e => {
          const c = s(...e)
          return a.default || (a.default = c), a
        })
      }))
  }
}
define('./sw.js', ['./workbox-e032be30'], function(e) {
  'use strict'
  importScripts(),
    e.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        { url: '/', revision: 'hXTcxQfXa6_FMevUtzE5D' },
        {
          url:
            '/_next/static/chunks/1501303581af259d819eeaeb0a2ea00c03b9ce86.fb329a5748dc4cb53785.js',
          revision: 'e768fc74c2c6af6a9645fca0b751856d',
        },
        {
          url: '/_next/static/chunks/1606726a.7c860838c0a8de0f7e67.js',
          revision: '380e22c90914bc7817022680ff524e18',
        },
        {
          url: '/_next/static/chunks/28.dda5d71d04641c65fa51.js',
          revision: '449efe68e2fae556c4bffa40450b523e',
        },
        {
          url: '/_next/static/chunks/29.1433933792e448bfc59a.js',
          revision: '6294718320b786faee08d3aa214a5814',
        },
        {
          url:
            '/_next/static/chunks/3ff2d2de91d0ffde1f2c8a2cf7918a5a5df5d386.5f51292abea99be8800d.js',
          revision: '743d6b8561114dbb7cf108efbf71bfc7',
        },
        {
          url:
            '/_next/static/chunks/512e0e19efa0371c98eb67d663f306508316a5cb.b7ab6246bab96d5f99a8.js',
          revision: '51fb9a682c50ed7b55ed469f9c4d29d4',
        },
        {
          url: '/_next/static/chunks/5e708014.aa92d3b6336259e22667.js',
          revision: '1e3f3751b3a2fa9721fa1df3cc8a8ffc',
        },
        {
          url: '/_next/static/chunks/75fc9c18.ab94ac3445ecd814f6e3.js',
          revision: '7f3a2cb68cc32ac4c2c719bfbf497c7e',
        },
        {
          url: '/_next/static/chunks/9f96d65d.5fcfa114a68b2251bb6d.js',
          revision: '6f40a3b60b4a59202506e0d82eca7398',
        },
        {
          url:
            '/_next/static/chunks/ae604c4ebcabc3ca936f510a5df7a8e24f3ecac1.c2e7b864cd5f7c77da15.js',
          revision: '31894fb1057ec4f2d21d020bf39bb1a3',
        },
        {
          url: '/_next/static/chunks/bee240a3.26528619e4b871985c9c.js',
          revision: '6bda91bca3b418b3ec7e68253283577e',
        },
        {
          url: '/_next/static/chunks/c660bb88.e9acb1f5eaeeeb371127.js',
          revision: '71c1751803084f697e1187d5d71b50ed',
        },
        {
          url:
            '/_next/static/chunks/cb9754276d53f49564be5e37db379c7536a00ef1.eb466074c17490b59f62.js',
          revision: '1a59a3fb5549f517f81b9adc136eeda5',
        },
        {
          url:
            '/_next/static/chunks/cfd581c10b6c3c7a11adc5aab01348d357ccf86a.38fea07998e9577951c1.js',
          revision: '3777c5420bd6583f4d2997a175344a30',
        },
        {
          url:
            '/_next/static/chunks/dfa2a2ccc54fb01b6665e4d05e7e60eb7b7acdc3.eccb3908276a7574cb2d.js',
          revision: 'd6e5b585a9a5d0d198f06a014e0a962b',
        },
        {
          url: '/_next/static/chunks/f65a48b9.84bad09b0ae0fceb793f.js',
          revision: '0fe0288b64623d70631252d17e233c79',
        },
        {
          url: '/_next/static/chunks/framework.6e858d56f2143b524638.js',
          revision: 'abe94c3705c261eec48948d3f918f480',
        },
        {
          url: '/_next/static/hXTcxQfXa6_FMevUtzE5D/_buildManifest.js',
          revision: 'd1fd0cd66959dcd801d5b08c8275ee89',
        },
        {
          url: '/_next/static/hXTcxQfXa6_FMevUtzE5D/_ssgManifest.js',
          revision: 'abee47769bf307639ace4945f9cfd4ff',
        },
        {
          url: '/_next/static/hXTcxQfXa6_FMevUtzE5D/pages/404.js',
          revision: '99fcec7d34865474b1f6b171bb9a0a3e',
        },
        {
          url: '/_next/static/hXTcxQfXa6_FMevUtzE5D/pages/_app.js',
          revision: '8e246176b923548b756b7e476cef46c5',
        },
        {
          url: '/_next/static/hXTcxQfXa6_FMevUtzE5D/pages/_error.js',
          revision: '33bffbbc4997cc08269b1a552564807f',
        },
        {
          url: '/_next/static/hXTcxQfXa6_FMevUtzE5D/pages/about.js',
          revision: 'b934cc6f3f51d105bcd707c35db27894',
        },
        {
          url: '/_next/static/hXTcxQfXa6_FMevUtzE5D/pages/blog.js',
          revision: '5b23b8e0cab16f5b3ce0905411b21cb4',
        },
        {
          url: '/_next/static/hXTcxQfXa6_FMevUtzE5D/pages/blog/[slug].js',
          revision: 'ef5e6d7e3b2ebf0d3b704bdc5807b890',
        },
        {
          url: '/_next/static/hXTcxQfXa6_FMevUtzE5D/pages/dashboard.js',
          revision: '9695e49e126519e99f475ce84940a10f',
        },
        {
          url:
            '/_next/static/hXTcxQfXa6_FMevUtzE5D/pages/github/authorizing.js',
          revision: 'cf71c008566beb78ed3a118c38a6bd8b',
        },
        {
          url: '/_next/static/hXTcxQfXa6_FMevUtzE5D/pages/index.js',
          revision: '6a328f57bc12f55320d63b5817ecb478',
        },
        {
          url: '/_next/static/hXTcxQfXa6_FMevUtzE5D/pages/projects.js',
          revision: '10fa5f945f55102abf260fe73a441a8b',
        },
        {
          url: '/_next/static/runtime/main-13fe24ac749abef3d374.js',
          revision: 'b2ed7a5281a1f1be56f90e8ae80e3022',
        },
        {
          url: '/_next/static/runtime/polyfills-0f75c8ede6fe59f93383.js',
          revision: 'a55c276313284c558121ba7ba4d7370c',
        },
        {
          url: '/_next/static/runtime/webpack-0f8fe6a67e678324a1da.js',
          revision: '6fb6f6b8c9513eef5269e709eff63287',
        },
        {
          url: '/app-images.zip',
          revision: '804d2470c255a4bd36484a46eb621e10',
        },
        {
          url: '/avatar-512.png',
          revision: 'b761e13eace94e67e30a1dcfa1dd08d4',
        },
        { url: '/avatar.png', revision: '5fcdf794903550e29f0a7e894f5eab53' },
        {
          url: '/b2b9a2603e45a2ba01b6345dc6805bc8.ico.zip',
          revision: '481578e321ddb080504a10c248dbf243',
        },
        {
          url: '/darkavatar.png',
          revision: 'b0f1588498fda46ddae4c9604ab63979',
        },
        { url: '/favicon.ico', revision: '412192267449ea67eebabd3e62acfe51' },
        {
          url: '/images/icons/android-icon-144x144.png',
          revision: 'a592b0cf786cf7e3c04cdb0b5ad2bfb3',
        },
        {
          url: '/images/icons/android-icon-192x192.png',
          revision: 'aba91f94d083fa4d30e554eca84961ec',
        },
        {
          url: '/images/icons/android-icon-36x36.png',
          revision: '27ad966e2b1120b22465485eac1e138e',
        },
        {
          url: '/images/icons/android-icon-48x48.png',
          revision: '44811e1b75f1ed86ec311442f70c25c8',
        },
        {
          url: '/images/icons/android-icon-72x72.png',
          revision: '701ac9dc67ec1b80a845da56807dd6a7',
        },
        {
          url: '/images/icons/android-icon-96x96.png',
          revision: '56086db452011d1aa815330be2660a52',
        },
        {
          url: '/images/icons/apple-icon-114x114.png',
          revision: '37350eafea9d90cf3fe0565f65c23ba9',
        },
        {
          url: '/images/icons/apple-icon-120x120.png',
          revision: '1a8f00c5a619157380897fd9ee52261a',
        },
        {
          url: '/images/icons/apple-icon-144x144.png',
          revision: '720dcfa5c8e3639cb4f70b300fb9543c',
        },
        {
          url: '/images/icons/apple-icon-152x152.png',
          revision: '828d5ee4a2d9a90820e0a48fc502ada4',
        },
        {
          url: '/images/icons/apple-icon-180x180.png',
          revision: '386bd92edfcccfb3475c944d0ced8f73',
        },
        {
          url: '/images/icons/apple-icon-57x57.png',
          revision: '66043e9e34cdc3f8c913b776f5fbf70e',
        },
        {
          url: '/images/icons/apple-icon-60x60.png',
          revision: '4f85e0a2772b70f37548d0d3ab3cbe7c',
        },
        {
          url: '/images/icons/apple-icon-72x72.png',
          revision: '2e8dd0bc67b16d27d159a71d0d89546d',
        },
        {
          url: '/images/icons/apple-icon-76x76.png',
          revision: '965639409dc0407773fadbbd86e05f74',
        },
        {
          url: '/images/icons/apple-icon-precomposed.png',
          revision: '7dc1598fcea74c299285c808e10c114c',
        },
        {
          url: '/images/icons/apple-icon.png',
          revision: '19312f80607bfbf43a85373444c39399',
        },
        {
          url: '/images/icons/browserconfig.xml',
          revision: '7eeb9da85c8ea3f5a7f5f62fa8253f74',
        },
        {
          url: '/images/icons/favicon-16x16.png',
          revision: 'e405dbf897c8a4f6d11c660d0d45c123',
        },
        {
          url: '/images/icons/favicon-32x32.png',
          revision: '167c6d405699ecfe2605f09ba67d021e',
        },
        {
          url: '/images/icons/favicon-96x96.png',
          revision: '54f70834b9128b6b1b8ea5891157ee26',
        },
        {
          url: '/images/icons/favicon.ico',
          revision: '197a99bf417a2cd4bc3b58c877cf4285',
        },
        {
          url: '/images/icons/icon-128x128.png',
          revision: '0de6c93efc230714e0b8d342e5a52c16',
        },
        {
          url: '/images/icons/icon-144x144.png',
          revision: 'a2262f4a0a9608c63eee9a8fea26fc7a',
        },
        {
          url: '/images/icons/icon-152x152.png',
          revision: 'be2b7ff6eeff8c3f1cc28e2e37efbced',
        },
        {
          url: '/images/icons/icon-192x192.png',
          revision: '1cddc56ed678cdcb70c759b3e519e85c',
        },
        {
          url: '/images/icons/icon-384x384.png',
          revision: 'e7d4b306a0b2fbb6fe2c6f40b6cb12c8',
        },
        {
          url: '/images/icons/icon-512x512.png',
          revision: 'cd224428dc1de61e0e88be59736cb301',
        },
        {
          url: '/images/icons/icon-72x72.png',
          revision: '7d57d7b8afe495bd5a6f97308d0f14e1',
        },
        {
          url: '/images/icons/icon-96x96.png',
          revision: '0189bac56d916b77b0bc735724ba5172',
        },
        {
          url: '/images/icons/manifest.json',
          revision: '08e652082b44afa9ef0cf7bb183875f5',
        },
        {
          url: '/images/icons/ms-icon-144x144.png',
          revision: '9c490ecf1b421f4b1c1b311fa696f625',
        },
        {
          url: '/images/icons/ms-icon-150x150.png',
          revision: 'bf3925265a31b61481c6136bb62c4de5',
        },
        {
          url: '/images/icons/ms-icon-310x310.png',
          revision: '712a0eafbc40965d99abf039516bf416',
        },
        {
          url: '/images/icons/ms-icon-70x70.png',
          revision: 'd76e3cffa3c78ff7f8735c74773d9427',
        },
        { url: '/jquery.min.js', revision: '656456bb6c8cd918bd5799d9eaad9dc0' },
        {
          url: '/lightavatar.png',
          revision: '92136e860a626c5dc0d1af3c7ad32fa0',
        },
        { url: '/manifest.json', revision: '688128be216cc2f753fe641590f2fcd3' },
        { url: '/notion.png', revision: '5763f53d2354698d9641f51c4438cea3' },
        { url: '/og-image.png', revision: 'bcb90f74b7ba9ae5a1bea9ab32b90438' },
        { url: '/sw.js.rej', revision: 'df9a9c4316ca40967d83b6aa9fd489d8' },
        {
          url: '/zeit-and-notion.png',
          revision: '80aaa1f135e1e0abbc789c03923e68fc',
        },
      ],
      { ignoreURLParametersMatching: [] }
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      /^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,
      new e.CacheFirst({
        cacheName: 'google-fonts',
        plugins: [
          new e.ExpirationPlugin({
            maxEntries: 4,
            maxAgeSeconds: 31536e3,
            purgeOnQuotaError: !0,
          }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /^https:\/\/use\.fontawesome\.com\/releases\/.*/i,
      new e.CacheFirst({
        cacheName: 'font-awesome',
        plugins: [
          new e.ExpirationPlugin({
            maxEntries: 1,
            maxAgeSeconds: 31536e3,
            purgeOnQuotaError: !0,
          }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-font-assets',
        plugins: [
          new e.ExpirationPlugin({
            maxEntries: 4,
            maxAgeSeconds: 604800,
            purgeOnQuotaError: !0,
          }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-image-assets',
        plugins: [
          new e.ExpirationPlugin({
            maxEntries: 64,
            maxAgeSeconds: 86400,
            purgeOnQuotaError: !0,
          }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:js)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-js-assets',
        plugins: [
          new e.ExpirationPlugin({
            maxEntries: 16,
            maxAgeSeconds: 86400,
            purgeOnQuotaError: !0,
          }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:css|less)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-style-assets',
        plugins: [
          new e.ExpirationPlugin({
            maxEntries: 16,
            maxAgeSeconds: 86400,
            purgeOnQuotaError: !0,
          }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:json|xml|csv)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-data-assets',
        plugins: [
          new e.ExpirationPlugin({
            maxEntries: 16,
            maxAgeSeconds: 86400,
            purgeOnQuotaError: !0,
          }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /.*/i,
      new e.StaleWhileRevalidate({
        cacheName: 'others',
        plugins: [
          new e.ExpirationPlugin({
            maxEntries: 16,
            maxAgeSeconds: 86400,
            purgeOnQuotaError: !0,
          }),
        ],
      }),
      'GET'
    )
})
