const {
    fetchProjects
} = require("../services/projectService");

const getProjects = async (req, res) => {
    try {

        const projects = await fetchProjects();
        res.status(200).json({ status: "success", data: projects });

    } catch (error) {
        res.status(error.response?.status || 500).json(error.response?.data || { message: 'Internal Server Error' });
    }
}

module.exports = {
    getProjects,
 
};