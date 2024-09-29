# Pose Detection Web Application

## Overview

This is a real-time pose detection web application that utilizes the *PoseNet* model from *ML5.js* to track human poses via webcam input. The application is built using Flask for the backend and renders a frontend page with interactive pose detection controls, allowing users to toggle keypoints, skeleton, and video feed visibility. It also provides a feature to capture snapshots of the detected pose.

## Features

- *Real-time Pose Detection:* Utilizes PoseNet to detect human poses.
- *Keypoints & Skeleton Display:* Visualizes the keypoints and skeleton of the detected pose.
- *Pose Recognition:* Recognizes basic poses like:
  - T-Pose
  - Hands Up Pose
  - Squat Pose
- *Interactive Controls:*
  - Toggle video feed
  - Toggle keypoints visibility
  - Toggle skeleton visibility
  - Capture snapshots of the current pose
- *Pose Feedback:* Displays detected poses with on-screen labels and dynamically changes background color based on the detected pose.

## Technologies Used

- *Backend:*
  - Flask (Python-based web framework)

- *Frontend:*
  - HTML5
  - CSS3
  - JavaScript
  - [ML5.js](https://ml5js.org/) (PoseNet Model for pose detection)
  - [p5.js](https://p5js.org/) (For rendering canvas and handling video feed)

## Project Structure

```bash
pose-detection-app/
├── app.py                 # Flask app file
├── templates/
│   └── index.html         # Main frontend page
├── static/
│   ├── css/
│   └── js/
└── README.md              # Project documentation
