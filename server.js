const app = require('./src/app');
const connectDB = require('./src/config/database');
require('dotenv').config();

const PORT = process.env.PORT || 5000;

// Function to start server
const startServer = async () => {
    try {
        // Check if we should connect to database
        if (process.env.SKIP_DB === 'true') {
            console.log('⚠️  Database connection skipped');
        } else {
            await connectDB();
        }
        
        const server = app.listen(PORT, () => {
            console.log(`✓ Server running on port ${PORT}`);
            console.log(`✓ Environment: ${process.env.NODE_ENV || 'development'}`);
            console.log(`✓ Test the API: http://localhost:${PORT}/health`);
            console.log(`✓ Test route: http://localhost:${PORT}/api/test`);
        });
        
        // Handle unhandled promise rejections
        process.on('unhandledRejection', (err, promise) => {
            console.log(`✗ Error: ${err.message}`);
            server.close(() => process.exit(1));
        });
        
    } catch (error) {
        console.error('Failed to start server:', error.message);
        process.exit(1);
    }
};

startServer();