const fetch = require('node-fetch')

/**
 * This is the main entrypoint to your Probot app
 * @param {import('probot').Probot} app
 */
module.exports = (app) => {
	// Your code here
	app.log.info('Yay, the app was loaded!')

	app.on('pull_request.opened', async (context) => {
    context.log.debug(context)
    const text = `
      {title} \n
      {branch} \n
      PR: <https://example.com|Overlook Hotel> \n
      JR: <https://example.com|Overlook Hotel> \n
      Please review. \n
      Thanks!
    `
		fetch(process.env.SLACK_WEBHOOK_URL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
        type: 'mrkdwn',
				text
			}),
		}).then((response) => {
			context.log.debug(response)
		}).catch((err) => {
			context.log.error(err)
		})
	})

	// For more information on building apps:
	// https://probot.github.io/docs/

	// To get your app running against GitHub, see:
	// https://probot.github.io/docs/development/
}
