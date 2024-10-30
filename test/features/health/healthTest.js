// Import dependencies
const chai = require('chai');
const sinon = require('sinon');
const HealthController = require('../../../src/features/health/health.controller'); // Import the HealthController
const ResponseUtil = require('../../../src/shared/util/response').ResponseUtil; // Import the ResponseUtil module
const port = process.env.PORT || 3004; // Use the port from environment variables, or default to 3004
const dotenv = require('dotenv');
dotenv.config(); // Load environment variables from .env file

describe('HealthController', () => {
    let res; // Placeholder for a mocked response object

    beforeEach(() => {
        // Mock the response object with a `json` method using Sinon spy
        res = {
            json: sinon.spy() // Spy on the json method to verify it gets called correctly
        };
    });

    afterEach(() => {
        // Restore any stubs or spies after each test
        sinon.restore();
    });

    // Test case for the helloWorld method
    describe('#helloWorld()', () => {
        it('should respond with Hello World', (done) => {
            // Stub the respondOk method from ResponseUtil to test the controller logic
            sinon.stub(ResponseUtil, 'respondOk').callsFake((res, data, message) => {
                // Assert that the correct message is passed
                chai.assert.equal(message, 'Hello World');
                done(); // Call done to finish the test
            });

            // Call the controller method with the mocked response
            HealthController.helloWorld(null, res);
        });
    });

    // Test case for the error method
    describe('#error()', () => {
        it('should respond with error', (done) => {
            // Stub the respondError method from ResponseUtil to test the controller logic
            sinon.stub(ResponseUtil, 'respondError').callsFake((res, data, message) => {
                // Assert that the correct error message is passed
                chai.assert.equal(message, 'An error occurred');
                done(); // Call done to finish the test
            });

            // Call the controller method with the mocked response
            HealthController.error(null, res);
        });
    });

    // Test case for the status method
    describe('#status()', () => {
        it('should respond with the correct status message', (done) => {
            const envName = process.env.ENV_NAME || 'development'; // Default value if ENV_NAME is missing
            // Updated expected message without the colon
            const expectedMessage = `Environment '${envName}' running on port: ${port}`;

            // Stub the respondOk method from ResponseUtil to verify the response
            sinon.stub(ResponseUtil, 'respondOk').callsFake((res, data, message) => {
                try {
                    // Assert that the correct status message is passed
                    chai.assert.equal(message, expectedMessage);
                    done();
                } catch (error) {
                    done(error); // Call done with an error to fail the test if an exception occurs
                }
            });

            // Call the controller method with the mocked response
            HealthController.status(null, res);
        });
    });
});
