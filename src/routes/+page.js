
const STATE_TRANSITION = "Entered in the '([^']+)";

export const prerender = true;
export class _LogLine {
	constructor(line) {
		this.line = line;
	}

	parseDate() {
		const date = this.line.split(' ')[0];
        const time = this.line.split(' ')[1];
		var result = `${date} ${time}`;
        result = result.slice(1, -1);
        const microSeconds = result.split(',')[1];
        result = result.split(',')[0];
        result = new Date(result);
        // we add the microseconds
        result.setMilliseconds(microSeconds);
        if (isNaN(result.getTime())) {
            return false;
        }
        return result;
	}

	parseState() {
		const regex = new RegExp(STATE_TRANSITION);
		const match = regex.exec(this.line);
		if (match) {
			return match[1];
		}
		return false;
	}

	parseModule() {
		const moduleName = this.line.split(' ')[3];
		return moduleName;
	}

	parseAgent() {
		const agentName = this.line.split(' ')[4];
		return agentName;
	}

	parseLogLevel() {
		const logLevel = this.line.split(' ')[2];
		return logLevel;
	}

	parseLogMsg() {
		// we take all the words after the 5th word
		const logMsg = this.line.split(' ').slice(5).join(' ');
		return logMsg;
	}

	parseAll() {
		const date = this.parseDate();
		this.parseState();
		this.parseModule();
		this.parseAgent();
		this.parseLogLevel();
		this.parseLogMsg();
		// we check if the date is valid
		if (date === false) {
			return false;
		}
		return true;
	}
}
