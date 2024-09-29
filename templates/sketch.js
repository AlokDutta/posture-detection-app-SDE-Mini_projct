let capture;
let posenet;
let poses = [];
let showKeypoints = true;
let showSkeleton = true;
let keypointSize = 20;
let showVideoFeed = true;
let backgroundColor = [0, 0, 0];
let currentPose = '';  // To store the detected pose

// p5.js setup
function setup() {
    let canvas = createCanvas(800, 500);
    canvas.parent('canvas-container'); // Attach canvas to HTML container

    // Start video capture
    capture = createCapture(VIDEO);
    capture.size(800, 500); // Ensure video is the same size as the canvas
    capture.hide(); // Hide the default HTML video element (we will draw it on the canvas)

    // Initialize PoseNet model
    posenet = ml5.poseNet(capture, modelLoaded);
    posenet.on('pose', receivedPoses);

    // Event listeners for controls
    document.getElementById('toggle-keypoints').addEventListener('click', () => {
        showKeypoints = !showKeypoints;
    });

    document.getElementById('toggle-skeleton').addEventListener('click', () => {
        showSkeleton = !showSkeleton;
    });

    document.getElementById('toggle-video').addEventListener('click', () => {
        showVideoFeed = !showVideoFeed;
    });

    document.getElementById('save-snapshot').addEventListener('click', () => {
        saveCanvas('pose_snapshot', 'png');
    });

    document.getElementById('increase-size').addEventListener('click', () => {
        keypointSize += 5;
    });

    document.getElementById('decrease-size').addEventListener('click', () => {
        if (keypointSize > 5) keypointSize -= 5;
    });
}

// p5.js draw loop
function draw() {
    background(backgroundColor);

    // Only draw the video if the video feed is enabled
    if (showVideoFeed && capture.loadedmetadata) {
        image(capture, 0, 0); // Draw the video on the canvas
    }

    fill(255, 0, 0);

    for (let i = 0; i < poses.length; i++) {
        let singlePose = poses[i].pose;
        let skeleton = poses[i].skeleton;

        // Draw keypoints if enabled
        if (showKeypoints) {
            for (let j = 0; j < singlePose.keypoints.length; j++) {
                let keypoint = singlePose.keypoints[j];
                ellipse(keypoint.position.x, keypoint.position.y, keypointSize);
            }
        }

        // Draw skeleton if enabled
        if (showSkeleton) {
            stroke(255, 255, 255);
            strokeWeight(5);
            for (let j = 0; j < skeleton.length; j++) {
                line(skeleton[j][0].position.x, skeleton[j][0].position.y, skeleton[j][1].position.x, skeleton[j][1].position.y);
            }
        }

        // Detect and display the pose name
        detectPoses(singlePose);
        fill(255, 255, 0);
        textSize(24);
        textAlign(CENTER);
        text(currentPose, width / 2, 30);  // Display pose at the top center

        // Display distances between nose and eyes (for first person)
        if (i === 0) {
            let nose = singlePose.keypoints[0];
            let leye = singlePose.keypoints[1];
            let reye = singlePose.keypoints[2];

            let distLeftEyeNose = dist(nose.position.x, nose.position.y, leye.position.x, leye.position.y).toFixed(2);
            let distRightEyeNose = dist(nose.position.x, nose.position.y, reye.position.x, reye.position.y).toFixed(2);

            fill(255);
            textSize(18);
            textAlign(LEFT);
            text(`Left Eye-Nose Distance: ${distLeftEyeNose}`, 10, height - 40);  // Bottom left
            text(`Right Eye-Nose Distance: ${distRightEyeNose}`, 10, height - 20);  // Bottom left
        }
    }
}

// Receive the poseNet pose data
function receivedPoses(results) {
    poses = results;
}

// Pose detection logic
function detectPoses(pose) {
    let lwrist = pose.keypoints[9];
    let rwrist = pose.keypoints[10];
    let lshoulder = pose.keypoints[5];
    let rshoulder = pose.keypoints[6];
    let lknee = pose.keypoints[13];
    let rknee = pose.keypoints[14];
    let hip = pose.keypoints[11]; // Left hip

    let wristAligned = Math.abs(lwrist.position.y - lshoulder.position.y) < 20 &&
                       Math.abs(rwrist.position.y - rshoulder.position.y) < 20;
    let handsApart = Math.abs(lwrist.position.x - rwrist.position.x) > 300;

    let handsAboveHead = lwrist.position.y < lshoulder.position.y && rwrist.position.y < rshoulder.position.y;
    let kneesBent = lknee.position.y < hip.position.y && rknee.position.y < hip.position.y;

    // Detect poses
    if (wristAligned && handsApart) {
        currentPose = 'T-Pose';
        backgroundColor = [0, 255, 0];  // Green background
    }
    else if (handsAboveHead) {
        currentPose = 'Hands Up Pose';
        backgroundColor = [0, 0, 255];  // Blue background
    }
    else if (kneesBent) {
        currentPose = 'Squat Pose';
        backgroundColor = [255, 0, 0];  // Red background
    }
    else {
        currentPose = 'No Pose Detected';
        backgroundColor = [0, 0, 0];  // Default background
    }
}

// Model loaded callback
function modelLoaded() {
    console.log('Model Loaded!');
}
