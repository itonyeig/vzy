import App from "./app";

const PORT = process.env.PORT || 4000;
const appInstance = new App();

const startServer = async () => {
    try {
        await appInstance.initialiseDatabaseConnection();
        appInstance.initializeRoutes();
        appInstance.express.listen(PORT, () => {
            console.log(`App listening on the port ${PORT}`);
        });
    } catch (error) {
        console.error("Failed to connect to the database:", error);
        process.exit(1);
    }
};

startServer();
