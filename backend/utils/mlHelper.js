const { exec } = require('child_process');
const path = require('path'); // Add this line

const mlModelPath = path.join(__dirname, '..', 'ml_model.py'); // Construct the relative path

const mlHelper = {
  predictDeals: (userExpenses) => {
    return new Promise((resolve, reject) => {
      const pythonProcess = exec(`python ${mlModelPath} ${JSON.stringify(userExpenses)}`, (error, stdout, stderr) => {
        if (error) {
          console.error(`Error executing Python script: ${error}`);
          console.error(`stderr: ${stderr}`);
          reject(error);
          return;
        }
        try {
          const predictedCategories = JSON.parse(stdout);
          resolve(predictedCategories);
        } catch (parseError) {
          console.error(`Error parsing Python output: ${parseError}`);
          console.error(`stdout: ${stdout}`);
          reject(parseError);
        }
      });
    });
  },
};

module.exports = mlHelper;

