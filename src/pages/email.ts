import type { APIRoute } from 'astro'
import { MailerSend, EmailParams, Sender, Recipient } from 'mailersend'

const MAILERSEND_API_KEY = import.meta.env.MAILERSEND_API_KEY as string | undefined
const SENDER_EMAIL = import.meta.env.SENDER_EMAIL as string | undefined
const TARGET_EMAIL = import.meta.env.TARGET_EMAIL as string | undefined

export const post: APIRoute = async ({ request }) => {
	if (!MAILERSEND_API_KEY || !SENDER_EMAIL || !TARGET_EMAIL) {
		return new Response(null, { status: 500 })
	}

	const { email, message } = (await request.json()) as { email: string; message: string }

	if (!email || !message) {
		return new Response(null, {
			status: 400,
			statusText: 'No email or message provided'
		})
	}

	const mailerSend = new MailerSend({
		apiKey: MAILERSEND_API_KEY
	})
	const emailParams = new EmailParams()
		.setFrom(new Sender(SENDER_EMAIL, 'website (mzadka.me)'))
		.setTo([new Recipient(TARGET_EMAIL)])
		.setReplyTo(new Recipient(email))
		.setBcc([new Recipient(email)])
		.setSubject('New contact form submission')
		.setText(`From: ${email}\n\n${message}`)

	try {
		await mailerSend.email.send(emailParams)
	} catch (e) {
		console.error(e)
		return new Response(null, {
			status: 500
		})
	}

	return new Response(null, {
		status: 200
	})
}
