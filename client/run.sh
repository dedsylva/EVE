#! /bin/bash
# First time Setup

# Install npm and libraries
# npm install --legacy-peer-deps

# get id of usb
# lsusb
# Bus 003 Device 064: ID 04e8:6860 Samsung Electronics Co., Ltd Galaxy A5 (MTP)
# echo 'SUBSYSTEM=="usb", ATTR{idVendor}=="04e8", MODE="6860", GROUP="plugdev"' | sudo tee /etc/udev/rules.d/51-android-usb.rules

# installl Android Studio at https://developer.android.com/studio
# adb -s R9XR2000B2J reverse tcp:8081 tcp:8081
ANDROID_SDK_ROOT=/home/taylor/Android/Sdk npm run android
npm start