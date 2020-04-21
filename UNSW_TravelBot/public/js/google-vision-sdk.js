async function detectLandmarks(fileName) {
	// [START vision_landmark_detection]
	const vision = require('@google-cloud/vision');

	// Creates a client
	const client = new vision.ImageAnnotatorClient();

	/**
	 * TODO(developer): Uncomment the following line before running the sample.
	 */
	// const fileName = 'Local image file, e.g. /path/to/image.png';

	// Performs landmark detection on the local file
	const [result] = await client.landmarkDetection(fileName);
	const landmarks = result.landmarkAnnotations;
	console.log('Landmarks:' + landmarks[0].description);
	return landmarks[0].description;
	// [END vision_landmark_detection]
}

module.exports = detectLandmarks;
