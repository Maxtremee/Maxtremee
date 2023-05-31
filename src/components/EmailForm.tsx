import { Show, createSignal } from 'solid-js'

const sendEmail = async (email: string, message: string) => {
	return fetch('/email', {
		method: 'POST',
		body: JSON.stringify({
			email,
			message
		})
	})
}

export default function EmailForm() {
	const [loading, setLoading] = createSignal(false)
	const [success, setSuccess] = createSignal(false)
	const [error, setError] = createSignal('')

	const onSubmit = async (
		event: Event & {
			submitter: HTMLElement
		} & {
			currentTarget: HTMLFormElement
			target: Element
		}
	) => {
		event.preventDefault()

		setLoading(true)
		const res = await sendEmail(event.currentTarget.email.value, event.currentTarget.message.value)
		setLoading(false)

		if (res.status === 200) {
			setSuccess(true)
		} else {
			setError(`Error: ${res.statusText}`)
		}
	}

	return (
		<form onSubmit={onSubmit} class="flex w-full flex-col justify-between gap-4 md:w-1/2">
			<div class="flex flex-col gap-2">
				<label for="email" class="text-sm font-bold tracking-wide dark:text-white">
					Email
				</label>
				<input
					id="email"
					type="email"
					placeholder="Your email"
					required
					class="rounded-sm border border-gray-600 px-6 py-4 transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-gray-600 dark:border-gray-400 dark:focus:ring-gray-600"
				/>
			</div>
			<div class="flex flex-col gap-2">
				<label for="message" class="text-sm font-bold tracking-wide dark:text-white">
					Message
				</label>
				<textarea
					id="message"
					minLength={10}
					maxLength={1000}
					required
					placeholder="Your message"
					class="rounded-sm border border-gray-600 px-6 py-4 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-gray-600 dark:border-gray-400 dark:focus:ring-gray-600"
				/>
			</div>
			<Show when={error()}>
				<div class="font-sans text-red-600 dark:text-red-400">{error()}</div>
			</Show>
			<button
				type="submit"
				class="rounded-sm bg-gray-600 px-4 py-2 font-bold text-white transition-all hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:bg-gray-400 dark:text-black dark:hover:bg-gray-600 dark:focus:ring-gray-400"
				disabled={loading() || success()}
			>
				<Show when={!loading() && !success()}>Send</Show>
				<Show when={loading()}>Sending...</Show>
				<Show when={success()}>Message sent!</Show>
			</button>
		</form>
	)
}
