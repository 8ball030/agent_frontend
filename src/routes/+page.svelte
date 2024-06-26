<!-- YOU CAN DELETE EVERYTHING IN THIS PAGE -->
<script>
	import { SlideToggle, Table, tableMapperValues } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	import io from 'socket.io-client';
	import { _LogLine } from './+page';
	import { getToastStore } from '@skeletonlabs/skeleton';

    const AGENT_HOST = "http://0.0.0.0";
    const AGENT_PORT = 5556;

	const socket = io(AGENT_HOST + ':' + AGENT_PORT);
	const toastStore = getToastStore();

	// we want to call connect on the socket
	socket.connect();

	const defaultHeaders = ['Date', 'Log Level', 'Agent Name', 'Module Name', 'Message'];

	const DEFAULT_AGENT_STATE = 'Unknown';

	$: logs = [];
	$: agentState = DEFAULT_AGENT_STATE;
	$: latestDate = getLatestDate();

	$: connection_status = socket.connected;

	$: renderLoopRunning = false;

	$: followLogsChecked = true;
	$: displayDatesChecked = true;
	$: displayLogLevelChecked = false;
	$: displayAgentNameChecked = false;
	$: displayModuleNameChecked = false;
	$: streamLogsChecked = true;
	$: advancedChecked = false;

	$: headers = defaultHeaders;
	$: sourceData = [];
	$: tableData = {
		// A list of heading labels.
		head: headers,
		// The data visibly shown in your table body UI.
		body: tableMapperValues(sourceData, headers)
		// Optional: The data returned when interactive is enabled and a row is clicked.
	};

	$: pingData = 'Ping!';

	function clearLogs() {
		logs = [];
		mapLogsToRows();
	}

	socket.on('connect', () => {
		const setting = {
			message: 'Successfully connected to the agent!',
			timeout: 3000,
			background: 'variant-ghost-success'
		};
		toastStore.trigger(setting);
		connection_status = true;
		socket.emit('agent', 'agent');
	});

	socket.on('disconnect', () => {
		connection_status = false;
		const setting = {
			message: 'Disconnected from the agent!',
			timeout: 3000,
			background: 'variant-ghost-error'
		};
		toastStore.trigger(setting);
	});

	socket.on('data', (data) => {
		if (!streamLogsChecked) {
			return;
		}
		handleLog(data);
	});

	async function handleLog(data) {
		try {
			const result = await parseLogLine(data);
			if (result.parseAll() === false) {
				return;
			}
            if (!result.parseDate()) {
                return;
            }
			logs = [...logs, result];
			renderAll();
		} catch (e) {
            console.log(e);
			return;
		}
		renderAll();
	}
	function getLatestDate() {
		if (logs.length === 0) {
			return 'No logs yet';
		}
		const line = logs[logs.length - 1];
		const result = line.parseDate();
		latestDate = result;
		return result;
	}

	async function followLogs() {
		followLogsChecked = !followLogsChecked;
		if (followLogsChecked) {
			alwaysScrollToBottom();
			console.log('Following logs');
		}
		renderAll();
	}

	async function scrollToBottom() {
		if (logs.length === 0) {
			return;
		}
		try {
			const logCard = document.getElementById('log-card');
			logCard.scrollTop = logCard.scrollHeight;
		} catch (e) {
			return;
		}
	}

	function parseLogLine(line) {
		var logLine = new _LogLine(line);
		return logLine;
	}

	function getHeaders() {
		var checkedHeaders = [];
		if (displayDatesChecked) {
			checkedHeaders.push('Date');
		}
		if (displayLogLevelChecked) {
			checkedHeaders.push('Log Level');
		}
		if (displayAgentNameChecked) {
			checkedHeaders.push('Agent Name');
		}
		if (displayModuleNameChecked) {
			checkedHeaders.push('Module Name');
		}
		checkedHeaders.push('Message');
		headers = checkedHeaders;
		return checkedHeaders;
	}

	function mapLogsToRows() {
		var logRows = [];
		for (var i = 0; i < logs.length; i++) {
			var logLine = logs[i];
			var logRow = {
				position: i + 1
			};
			if (displayDatesChecked) {
				logRow['Date'] = logLine.parseDate();
			}
			if (displayLogLevelChecked) {
				logRow['Log Level'] = logLine.parseLogLevel();
			}
			if (displayAgentNameChecked) {
				logRow['Agent Name'] = logLine.parseAgent();
			}
			if (displayModuleNameChecked) {
				logRow['Module Name'] = logLine.parseModule();
			}
			const state = logLine.parseState();
			if (state != false) {
				agentState = state;
			}
			logRow['Message'] = logLine.parseLogMsg();
			logRows.push(logRow);
		}
		sourceData = logRows;
		tableData = {
			head: headers,
			body: tableMapperValues(sourceData, headers)
		};
	}

	async function alwaysScrollToBottom() {
		while (followLogsChecked) {
			scrollToBottom();
			await new Promise((r) => setTimeout(r, 20));
		}
	}

	function renderAll() {
		getLatestDate();
		getHeaders();
		mapLogsToRows();
	}

	async function renderLoop() {
		if (renderLoopRunning) {
			return;
		}
		renderLoopRunning = !renderLoopRunning;
		while (renderLoopRunning) {
			renderAll();
			await new Promise((r) => setTimeout(r, 20));
		}
	}

	onMount(() => {
		renderLoop();
	});

	function setAdvanced() {
		// if we are in the advanced mode, we display everything
		if (advancedChecked == true) {
			displayLogLevelChecked = false;
			displayModuleNameChecked = false;
			displayAgentNameChecked = false;
		} else {
		}
		if (followLogsChecked) {
			alwaysScrollToBottom();
		}
		renderAll();
	}
</script>

<div class="container h-full mx-auto flex justify-center items-center">
	<div class="space-y-10 text-center flex flex-col items-center card p-2">
		<div class="card m-2 p-2">
			<h1 class="h1 p-2">Agent</h1>
			<div
				class="flex flex-row justify-center items-center space-x-2 card p-5 bg variant-ghost-surface"
			>
				{#if agentState === DEFAULT_AGENT_STATE}
					<h4 class="h5 dynamic">
						Current State: <button type="button" class="btn variant-ghost-error"
							>{agentState}</button
						>
					</h4>
				{:else}
					<h4 class="h5">
						Current State: <button type="button" class="btn variant-ghost-secondary"
							>{agentState}</button
						>
					</h4>
				{/if}
            <!-- If advanced is ticked, we display  the connection paramters -->
                {#if advancedChecked == true}
                    <h4 class="h5">
                        Host: <button type="button" class="btn variant-ghost-secondary"
                            >{AGENT_HOST}</button
                        >
                    </h4>
                    <h4 class="h5">
                        Port: <button type="button" class="btn variant-ghost-secondary"
                            >{AGENT_PORT}</button
                        >
                    </h4>
                {/if}
			</div>

			<div
				class="flex flex-row justify-center items-center space-x-2 card p-5 bg variant-ghost-surface"
			>
				<SlideToggle name="slider-label" bind:checked={advancedChecked} on:click={setAdvanced}
					>Simple/Advanced</SlideToggle
				>
				{#if advancedChecked == true}
					<SlideToggle name="slider-label" bind:checked={streamLogsChecked} on:click={renderAll}
						>Stream Logs</SlideToggle
					>
					<SlideToggle name="slider-label" bind:checked={followLogsChecked} on:click={followLogs}
						>Follow Logs</SlideToggle
					>
				{/if}
			</div>
			{#if advancedChecked == true}
				<div
					class="flex flex-row justify-center items-center space-x-2 card p-5 bg variant-ghost-surface"
				>
					<SlideToggle name="slider-label" bind:checked={displayDatesChecked} on:click={renderAll}
						>Display Dates</SlideToggle
					>
					<SlideToggle
						name="slider-label"
						bind:checked={displayLogLevelChecked}
						on:click={renderAll}>Display Log Level</SlideToggle
					>
					<SlideToggle
						name="slider-label"
						bind:checked={displayAgentNameChecked}
						on:click={renderAll}>Display Agent Name</SlideToggle
					>
					<SlideToggle
						name="slider-label"
						bind:checked={displayModuleNameChecked}
						on:click={renderAll}>Display Module Name</SlideToggle
					>
				</div>
			{/if}

			<div
				class="flex flex-row justify-center items-center space-x-2 card p-2 bg variant-ghost-surface"
			>
				{#if logs.length > 0 && advancedChecked}
					<button type="button" class="btn btn-sm variant-filled-warning" on:click={clearLogs}
						>Clear Logs</button
					>
					<button type="button" class="btn btn-sm variant-ghost-secondary m-2 p-2"
						>Total Logs: {logs.length}</button
					>
				{/if}
				<button type="button" class="btn btn-sm variant-ghost-secondary m-2 p-2"
					>Latest Date: {latestDate}</button
				>
			</div>
		</div>

		<div class="card p-5 bg variant-ghost-surface">
			<div class="card p-2 w-full h-96 overflow-y-scroll" id="log-card">
				<Table regionHeadCell="text-center card bg variant-ghost-surface" source={tableData} />
			</div>
		</div>
		{#if advancedChecked == true}
			<div class="card m-2 p-2">
				<h1 class="h1 p-2">Ping Agent</h1>
				<div
					class="flex flex-row justify-center items-center space-x-2 card p-5 bg variant-ghost-surface"
				>
					{#if connection_status}
						<div
							class="flex flex-row justify-center items-center space-x-2 card p-5 bg variant-ghost-success"
						>
							<h4 class="h5">Connected</h4>
						</div>
					{:else}
						<div
							class="flex flex-row justify-center items-center space-x-2 card p-5 bg variant-ghost-error"
						>
							<h4 class="h5">Disconnected</h4>
						</div>
					{/if}
					<div
						class="flex flex-row justify-center items-center space-x-2 card p-5 bg variant-ghost-surface"
					>
						<input
							type="text"
							class="input input-primary input-bordered"
							placeholder="Enter Message"
							bind:value={pingData}
						/>
						<button
							type="button"
							class="btn btn-sm variant-filled-warning"
							on:click={() => socket.emit('message', pingData)}>Send Test</button
						>
					</div>
				</div>
			</div>
		{/if}
	</div>
</div>

<style lang="postcss">
	@keyframes glow {
		0% {
			@apply bg-primary-400/50;
		}
		33% {
			@apply bg-secondary-400/50;
		}
		66% {
			@apply bg-tertiary-400/50;
		}
		100% {
			@apply bg-primary-400/50;
		}
	}
	@keyframes pulse {
		50% {
			transform: scale(1.5);
		}
	}

	.btn:active {
		animation: glow 10s ease-in-out;
		animation-fill-mode: forwards;
	}
</style>
