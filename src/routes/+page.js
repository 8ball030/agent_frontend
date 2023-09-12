const STATE_TRANSITION = "Entered in the '([^']+)"

export const prerender = true;
export class _LogLine {

    constructor(line) {
        this.line = line;
    }


    parseDate() {
        // function to return the joined line with the time removed
        const date = this.line.split(' ')[0];
        var time = this.line.split(' ')[1];
        // we remve the last 4 characters from the time
        time = time.slice(0, -4);
        const result = `${date} ${time}`;
        // we check if the result is a valid date
        const dateObj = new Date(result);
        if (dateObj.toString() === 'Invalid Date') {
            return 'Invalid Date';
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
        const moduleName = this.line.split(' ')[3]
        return moduleName;
    }

    parseAgent() {
        const agentName = this.line.split(' ')[4]
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
        if (date === 'Invalid Date') {
            return false;
        }
        return true;
    }

}
