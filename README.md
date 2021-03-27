[![Open Collective](https://opencollective.com/edudash/tiers/badge.svg)](https://opencollective.com/edudash/) [![GitHub latest release version](https://img.shields.io/github/v/release/edudash/edudash.svg?style=flat)](https://github.com/edudash/edudash/releases/latest) [![Github All Releases download count](https://img.shields.io/github/downloads/edudash/edudash/total.svg?style=flat)](https://github.com/edudash/edudash/releases/latest) [![GitHub contributors](https://img.shields.io/github/contributors/edudash/edudash.svg?style=flat)](https://github.com/edudash/edudash/graphs/contributors)

# About EduDash

Welcome to EduDash, a fully open-source homework management system for schools.

# Hyper Service

This repository features the code for EduDash's Hyper Service, a shortlink service for URLs related to EduDash.

For example, you might see the following: [https://hyper.edudash.org/discord](https://hyper.edudash.org/discord), which is configured to route to our Discord URL.

## Configuration

Before you begin, some variables need to be configured at your [config/.env](config/.env) file which controls environment variable for HyperService;

| Variable   | Example                   | Description                                            |
| ---------- | ------------------------- | ------------------------------------------------------ |
| PORT       | 3000                      | The port to run the HTTP service on for HyperService.  |
| PORT_HTTPS | 3001                      | The port to run the HTTPS service on for HyperService. |
| ADMIN_KEY  | secret                    | The secret authorization header to edit hyperlinks.    |
| MONGO_URI  | mongodb://localhost:27017 | The MongoDB connection URI for storage of hyperlinks.  |

<br />
## Running HyperService

First, clone HyperService with

```
git clone https://github.com/EduDash/HyperService .
```

To run hyperservice, first install all dependencies:

```
npm install
```

Next, run the application:

```
node app.js
```

You can access hyperlinks in development with `http://localhost:port/(hyperlink)`, for example `http://localhost:3000/discord`, and in our production environment with `https://hyper.edudash.org/(hyperlink)`, for example [https://hyper.edudash.org/discord](hyper.edudash.org/discord).

## Creating and Updating Links

To create, or update hyperlinks, make a `PUT` request to `/(hyperlink)`, for example `/discord`, with the body payload:

```json
{
  "href": "https://site.to.point.to/"
}
```

**Your Authorization Header must be set to the authorization variable you set in config/.env**

Example call:

```js
const axios = require('axios');
const URL = `http://localhost:3000/`;

/* Update or create the hyperlink for discord */

axios
  .put(
    `${URL}/discord`,
    {
      href: 'https://discord.gg/RbtYE6abVd',
    },
    {
      headers: {
        Authorization: 'secret',
      },
    }
  )
  .then(handleResponse);
```
