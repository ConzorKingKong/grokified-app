## ngrok integration example

This project takes the default express example app.

`npx express-generator example-app-name`

and integrates ngrok connections directly into the code. This allows for having a project you can port to a new server
at any moment and not have to configure any server or firewall software like nginx or iptables.

To make using ngrok a little cleaner, I've added the npm packages `dotenv` and `open` to the project.

In order for the project to work, you'll have to add the following to your `.env` file.

`TOKEN=<your-ngrok-token>`