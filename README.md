[My curriculum vitae](https://shaman-apprentice.github.io/curriculum-vitae/)

## How to update
The curriculum vitae is hosted as GitHub Page from main branch. To update the PWA we need to:
- Update cache name's version number within [Service Worker](./service.worker.js)
- Update `start_url` property from [manifest](./app.webmanifest) 
- Manual validate look and feel of desktop, mobile and print version