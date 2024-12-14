const tf = require('@tensorflow/tfjs-node');

class MLHelper {
  constructor() {
    this.model = null;
  }

  async loadModel() {
    try {
      this.model = await tf.loadLayersModel('file://./src/ml/model/model.json');
      console.log('ML model loaded successfully');
    } catch (error) {
      console.error('Error loading ML model:', error);
    }
  }

  async predictDeals(userExpenses) {
    if (!this.model) {
      await this.loadModel();
    }

    try {
      // Process user expenses data
      const processedData = this.preprocessData(userExpenses);
      
      // Make predictions
      const predictions = await this.model.predict(processedData);
      return this.postprocessPredictions(predictions);
    } catch (error) {
      console.error('Prediction error:', error);
      return null;
    }
  }

  preprocessData(expenses) {
    // Implement data preprocessing logic
    return tf.tensor(expenses);
  }

  postprocessPredictions(predictions) {
    // Implement prediction postprocessing logic
    return predictions.arraySync();
  }
}

module.exports = new MLHelper();
