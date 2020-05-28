if (!self.define) {
  const e = e => {
      'require' !== e && (e += '.js')
      let a = Promise.resolve()
      return (
        c[e] ||
          (a = new Promise(async a => {
            if ('document' in self) {
              const c = document.createElement('script')
              ;(c.src = e), document.head.appendChild(c), (c.onload = a)
            } else importScripts(e), a()
          })),
        a.then(() => {
          if (!c[e]) throw new Error(`Module ${e} didn’t register its module`)
          return c[e]
        })
      )
    },
    a = (a, c) => {
      Promise.all(a.map(e)).then(e => c(1 === e.length ? e[0] : e))
    },
    c = { require: Promise.resolve(a) }
  self.define = (a, i, s) => {
    c[a] ||
      (c[a] = Promise.resolve().then(() => {
        let c = {}
        const n = { uri: location.origin + a.slice(1) }
        return Promise.all(
          i.map(a => {
            switch (a) {
              case 'exports':
                return c
              case 'module':
                return n
              default:
                return e(a)
            }
          })
        ).then(e => {
          const a = s(...e)
          return c.default || (c.default = a), c
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
        { url: '/', revision: 'uSejT7z1NYyjgXcWyLF8R' },
        {
          url: '/_next/static/chunks/1606726a.0ba8fdacc3ef54b300f0.js',
          revision: 'b69502c2969de2d508361bb779ceba9b',
        },
        {
          url:
            '/_next/static/chunks/1cb43cfda1ea6371dd6588002651737cd2398c57.996e8f54b7a33cc30e3e.js',
          revision: 'd00a383db58d66a05db69a45bbc8ba93',
        },
        {
          url:
            '/_next/static/chunks/214a0bb74f134572b83b2f63ab329f6af1398bc5.f7f1d450caaa570d3e51.js',
          revision: '6759b29445f379739a7e72bfa0b9d906',
        },
        {
          url:
            '/_next/static/chunks/276134704dfb3488094fce8fd9e1dcab630f4752.d5f09d71161a66379f96.js',
          revision: '0d96d02b6f01d225e01fab449d0202ab',
        },
        {
          url: '/_next/static/chunks/28.141c3dd92daf7234bb23.js',
          revision: '7d1b33db7b1adbf2c90a6726b334b0a9',
        },
        {
          url: '/_next/static/chunks/29.4d84aed31e0109eeef1f.js',
          revision: '6294718320b786faee08d3aa214a5814',
        },
        {
          url:
            '/_next/static/chunks/44f6fd801098dc5d5f1491d73497149dbc4053d3.71a90bae24c72e3973b7.js',
          revision: '2d75f6273963da6291e6468470483e9d',
        },
        {
          url: '/_next/static/chunks/5e708014.962b66ecceb8a27556aa.js',
          revision: '1e3f3751b3a2fa9721fa1df3cc8a8ffc',
        },
        {
          url: '/_next/static/chunks/75fc9c18.c6f64e14cf8cf56be858.js',
          revision: '90d1b924fc229cb9eb38e07946e6db4c',
        },
        {
          url: '/_next/static/chunks/9f96d65d.f08ddf4685f0676ae239.js',
          revision: 'e8439f25931372a69d4a7bb2f094adb0',
        },
        {
          url:
            '/_next/static/chunks/b7b7ac3d505a65c20a72e8d61b3a29893d892df1.34775c86986740380ecb.js',
          revision: 'c690134a61d71e46e935a138559bfa8c',
        },
        {
          url: '/_next/static/chunks/bee240a3.df5109a35bd0943683fe.js',
          revision: '6bda91bca3b418b3ec7e68253283577e',
        },
        {
          url: '/_next/static/chunks/c660bb88.e0132fb4b55a91d4185b.js',
          revision: 'e7f7cbf328b7e68af57101bec1ec354a',
        },
        {
          url:
            '/_next/static/chunks/dca731c0540d94b3040f44570e508ff0c8a7488c.c8a721546ecc8675f647.js',
          revision: '0fcac3ff3b93215443ff8b3823771943',
        },
        {
          url:
            '/_next/static/chunks/f28248decb216d48ddb813c1314b4aa8b667e80f.b9901488afd9ccd57505.js',
          revision: '91f16376377a7da87d19d126e89c25ac',
        },
        {
          url: '/_next/static/chunks/f65a48b9.84187d6caa06a8fe7d73.js',
          revision: 'c7b522bf22aa88eed952ee66c345b221',
        },
        {
          url: '/_next/static/chunks/framework.0bfd43c6146a5dba8d12.js',
          revision: '08cfd14bfc04b7b520a3898282958271',
        },
        {
          url: '/_next/static/runtime/main-b0a48e31c4362a372394.js',
          revision: '5ad425f4b650c248c672f8aa71c70d22',
        },
        {
          url: '/_next/static/runtime/polyfills-77721d15543ca8c9d48f.js',
          revision: '8e7149fa24aa585cf20a05862b88a955',
        },
        {
          url: '/_next/static/runtime/webpack-3e7132bd23fe89ef562c.js',
          revision: '09ff18fc1fc7be9ad3faae9703a488ec',
        },
        {
          url: '/_next/static/uSejT7z1NYyjgXcWyLF8R/_buildManifest.js',
          revision: 'ed9a5a51373a7b47e043e74d1063a0ed',
        },
        {
          url: '/_next/static/uSejT7z1NYyjgXcWyLF8R/_ssgManifest.js',
          revision: 'abee47769bf307639ace4945f9cfd4ff',
        },
        {
          url: '/_next/static/uSejT7z1NYyjgXcWyLF8R/pages/404.js',
          revision: 'ca669f795b0ee7280ad1e6a9e32e6505',
        },
        {
          url: '/_next/static/uSejT7z1NYyjgXcWyLF8R/pages/_app.js',
          revision: '93bfc6c64687818cbb6f8cb8f74bf36c',
        },
        {
          url: '/_next/static/uSejT7z1NYyjgXcWyLF8R/pages/_error.js',
          revision: '43d90648dc80db873b24dc85c82a266f',
        },
        {
          url: '/_next/static/uSejT7z1NYyjgXcWyLF8R/pages/about.js',
          revision: '3aa30755ba1605208a4d319dac20394f',
        },
        {
          url: '/_next/static/uSejT7z1NYyjgXcWyLF8R/pages/blog.js',
          revision: 'c79785f208829f7a55dc2cf77517475f',
        },
        {
          url: '/_next/static/uSejT7z1NYyjgXcWyLF8R/pages/blog/[slug].js',
          revision: '38c164f7b056de73e7da715e8aea0c51',
        },
        {
          url: '/_next/static/uSejT7z1NYyjgXcWyLF8R/pages/dashboard.js',
          revision: '348e2239943f10f2f7e70345781251e3',
        },
        {
          url:
            '/_next/static/uSejT7z1NYyjgXcWyLF8R/pages/github/authorizing.js',
          revision: 'eea56109246d3d8d204bde91d6be289b',
        },
        {
          url: '/_next/static/uSejT7z1NYyjgXcWyLF8R/pages/index.js',
          revision: '2efd953dfd2d46dfeb20b0dd9b5f5bdf',
        },
        {
          url: '/_next/static/uSejT7z1NYyjgXcWyLF8R/pages/projects.js',
          revision: '052ef0bf1055a1adc2568e9b614cdb1f',
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
