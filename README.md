# Pose Detection Web Application
## Overview

This is a **pose detection web application** that uses **ml5.js** and the **p5.js** libraries. It will detect the human pose from video feed captured by the user through webcam. The application will show key points on the user's body and draw the skeleton in real-time. It also tries to classify the T-pose, Hands Up pose, and Squat pose.

## Features

- **Live Pose Detection:** Detect peoples' poses and show keypoints, for instance, wrists, elbows, knees; and skeleton.
- **Pose Classification from Video:** Automatically detects specific poses, such as T-pose, Hands Up pose, and Squat pose.
**Custom Controls:** Clients can enable or disable the video stream, keypoints and skeleton, including enlarge the size of keypoints
- Screenshot Capture: Provide an option to capture the current pose.
- **Responsive Design:** The size of the canvas is responsive. That means the size of the canvas depends on the size of the user's window.
## Tech Stack
- **Backend Framework:** Flask (Python)
- **Frontend:** HTML, CSS, JavaScript
- **Libraries:**
  - **ml5.js**: A set of libraries built on top of TensorFlow.js, making it easier to access the vast capabilities of machine learning. This includes pose detection, for example.
  - **p5.js**: A creative coding library that helps you create the canvas and handle the drawing functions.
- **Flask**: This is a Python web framework. It can be used for serving the web application in this case.
## Getting Started

### Prerequisites

- Python 3.x

- Flask (`pip install flask`)

### Install
1. Clone the repository:

    ```bash
    git clone https://github.com/your-repository/pose-detection-web-app.git
    cd pose-detection-web-app
    ```
2. Install Flask if not already installed:

    ```bash
    pip install flask
3. Create a file `index.html` in the `templates` folder if the folder does not exist yet. You can simply copy the project main user interface code.
  
4. Launch the Flask application:
 
```
    python app.py
```
5. Open a web browser and navigate to `http://localhost:3000`. Now you are able to see the application.

END

- **Pose Detection:** The application will start video capture and starts detecting poses the moment the page loads.

- **Controls**
  - Toggle Video Feed. Turn the webcam feed on or off
  - Toggle Keypoints, showing keypoints on the body
  - Toggle Skeleton, show or hide connecting skeleton among keypoints.
*** Snapshot Capture***. Take the current view of the canvas and save it in an image file.
**Keyboard Shortcut**
Click on **S** to capture and save a snapshot
Click on **K** to enable/disable keypoints 
Click on **L** to enable/disable skeleton
Click on **+** increases keypoint size
Click on **-** to reduce keypoint size
Click on **V** to enable/disable the video feed.
## Pose Classification

The app can currently detect and classify the following poses below:

- **T-Pose:** The case where the two wrists align with shoulders and hands are stretched wide apart.
- **Hands Up Pose:** Where both wrists are above shoulder level.
- **Squat Pose:** Where both knees are bent below the hip.
For the other pose, the app will show **"No Pose Detected"** with a black background.

## Project Structure

```bash

pose-detection-web-app/
├── app.py                   # Flask server
├── templates/
│   └── index.html            # Frontend HTML page
└── README.md                 # Project README file
```
