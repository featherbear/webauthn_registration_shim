(() => {
	if (!("credentials" in navigator)) {
		// Interesting.
		console.warn("Browser does not support web credentials...");
	}

	// Shim navigator.credentials.

	// const originalMethod: {
	// 	[fn in keyof Omit<CredentialsContainer, "preventSilentAccess">]: CredentialsContainer[fn];
	// } = {

	const originalMethod = {
		create: navigator.credentials.create.bind(navigator.credentials),
		get: navigator.credentials.get.bind(navigator.credentials),
		store: navigator.credentials.store.bind(navigator.credentials),
	};

	//
	navigator.credentials.create = async function (options) {
		// if (options?.publicKey?.rp) {
		//     console.log("Create for domain", options.publicKey.rp);
		// }
		console.log(options);
		const result = await originalMethod.create(options);
		console.log("navigator.credentials.create result", result);
		return result;
	};

	navigator.credentials.get = async function (options) {
		if (options?.publicKey?.rpId) {
			console.log("get for domain", options.publicKey.rpId);
		}
		// const result = await originalMethod.get(options);

		const result = await navigator.credentials.get(options);
		
		console.log("navigator.credentials.get result", result);
		return result;
	};

	navigator.credentials.store = async function (credential) {
		console.log("navigator.credentials.store", credential);
		const result = await originalMethod.store(credential);
		console.log("navigator.credentials.store result", result);
		return result;
	};
})();
