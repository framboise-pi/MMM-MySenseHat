#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Sense HAT Sensor Reader
Reads all sensor data and outputs as JSON
"""

import json
import sys
import random

try:
    from sense_hat import SenseHat
    SENSE_HAT_AVAILABLE = True
except ImportError:
    SENSE_HAT_AVAILABLE = False

def get_mock_data():
    """Return mock sensor data for development/testing"""
    return {
        "accel": {
            "x": random.uniform(-0.1, 0.1),
            "y": random.uniform(-0.1, 0.1),
            "z": random.uniform(0.9, 1.0)
        },
        "gyro": {
            "x": random.uniform(-1, 1),
            "y": random.uniform(-1, 1),
            "z": random.uniform(-1, 1)
        },
        "compass": {
            "x": random.uniform(-0.5, 0.5),
            "y": random.uniform(-0.5, 0.5),
            "z": random.uniform(-0.5, 0.5)
        },
        "temperature": round(random.uniform(20, 25), 2),
        "humidity": round(random.uniform(40, 60), 2),
        "pressure": round(random.uniform(1000, 1020), 2)
    }

def main():
    try:
        if not SENSE_HAT_AVAILABLE:
            # Return mock data if sense_hat is not available
            data = get_mock_data()
            print(json.dumps(data))
            sys.exit(0)
        
        sense = SenseHat()
        
        # Read accelerometer
        accel = sense.get_accelerometer_raw()
        
        # Read gyroscope
        gyro = sense.get_gyroscope_raw()
        
        # Read magnetometer (compass)
        compass = sense.get_compass_raw()
        
        # Read environmental sensors
        temperature = sense.get_temperature()
        humidity = sense.get_humidity()
        pressure = sense.get_pressure()
        
        # Build response object
        data = {
            "accel": {
                "x": accel['x'],
                "y": accel['y'],
                "z": accel['z']
            },
            "gyro": {
                "x": gyro['x'],
                "y": gyro['y'],
                "z": gyro['z']
            },
            "compass": {
                "x": compass['x'],
                "y": compass['y'],
                "z": compass['z']
            },
            "temperature": temperature,
            "humidity": humidity,
            "pressure": pressure
        }
        
        # Output as JSON
        print(json.dumps(data))
        sys.exit(0)
        
    except Exception as e:
        error = {
            "error": str(e)
        }
        print(json.dumps(error), file=sys.stderr)
        sys.exit(1)

if __name__ == "__main__":
    main()
