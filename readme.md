## grokified application

This project takes the default express example app

`npx express-generator example-app-name`

and integrates ngrok tunnels directly into the code. This allows for having a project you can port to a new server
at any moment without needing to manage server or firewall software.

In order for the project to work, you'll have to add the following to a `.env` file in the root of the directory

```
TOKEN=<your-ngrok-token>
SUBDOMAIN=<your-ngrok-subdomain>
```

Start the project with `npm start`