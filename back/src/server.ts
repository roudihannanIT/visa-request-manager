import app from "./app";

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`);
});

process.on('unhandledRejection', (err: Error) => {
    console.log('Unhandled Rejection', err.message);
    server.close(() => process.exit(1));
});