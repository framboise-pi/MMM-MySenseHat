// Sense HAT Sensor Library using Python sense_hat
// Wrapper that calls Python script via child_process

const { spawn } = require('child_process');
const path = require('path');

class SenseHatSensors {
    constructor() {
        this.pythonScript = path.join(__dirname, 'read_sensors.py');
        this.initialized = true; // Python doesn't need initialization
    }

    async init() {
        // No initialization needed for Python approach
        return Promise.resolve(true);
    }

    async getValue() {
        return new Promise((resolve, reject) => {
            const python = spawn('python3', [this.pythonScript]);
            let dataString = '';
            let errorString = '';

            python.stdout.on('data', (data) => {
                dataString += data.toString();
            });

            python.stderr.on('data', (data) => {
                errorString += data.toString();
            });

            python.on('close', (code) => {
                if (code !== 0) {
                    console.error('Python script error:', errorString);
                    reject(new Error(`Python script exited with code ${code}: ${errorString}`));
                    return;
                }

                try {
                    const data = JSON.parse(dataString);
                    
                    if (data.error) {
                        reject(new Error(data.error));
                        return;
                    }

                    // Add timestamp
                    data.timestamp = new Date();
                    resolve(data);
                } catch (err) {
                    console.error('Failed to parse Python output:', err);
                    console.error('Raw output:', dataString);
                    reject(err);
                }
            });

            python.on('error', (err) => {
                console.error('Failed to start Python script:', err);
                reject(err);
            });
        });
    }

    async close() {
        // Nothing to close for Python approach
        return Promise.resolve();
    }
}

module.exports = SenseHatSensors;
