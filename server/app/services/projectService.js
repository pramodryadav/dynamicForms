const connectDB = require("../config/db");

const fetchProjects = async () => {

    try {
        const connection = await connectDB();
      
        const [rows] = await connection.execute('SELECT * FROM data_projects');
        await connection.end(); // Close the connection
        return rows;

    } catch (error) {
        
        throw new Error(`Error inserting data: ${error.message}`);

    }
};

module.exports = {
    fetchProjects


}
