const path = require('path');
const fs = require('fs');
const connectDB = require("../config/db");
const { applyDefaultValues } = require("../utils/customerTblDefaultValues");
const mime = require('mime-types')

const fetchProjectDetail = async () => {
    try {
        const connection = await connectDB();
        const [rows] = await connection.execute('SELECT * FROM projects_detail');
        await connection.end(); // Close the connection
        return rows;
    } catch (error) {
        throw new Error(`Error fetching data: ${error.message}`);
    }
}


const fetchProjects = async () => {
    try {
        const connection = await connectDB();
        const [rows] = await connection.execute('SELECT * FROM data_projects');
        await connection.end(); // Close the connection
        return rows;
    } catch (error) {
        throw new Error(`Error fetching data: ${error.message}`);
    }
}


const fetchProjectForms = async (projectID) => {
    try {
        const connection = await connectDB();
        // Construct the SQL query
        const query = `
           SELECT * FROM data_projects_form
           WHERE data_project_id = ?
       `;
        const [rows] = await connection.execute(query, [projectID]);
        await connection.end(); // Close the connection
        return rows;
    } catch (error) {
        throw new Error(`Error fetching data: ${error.message}`);
    }
}

const fetchFormData = async (order_id, sub_project_id) => {
    try {
        const connection = await connectDB();
        // Construct the SQL query
        const query = `
           SELECT * FROM project_detail_data
           WHERE project_detail_id = ?  AND order_id = ? 
       `;
        const [rows] = await connection.execute(query, [sub_project_id, order_id]);
        await connection.end(); // Close the connection
        return rows[0];
    } catch (error) {
        throw new Error(`Error fetching data: ${error.message}`);
    }
}






const fetchCustomerInfoByID = async (id) => {
    try {
        const connection = await connectDB();
        const [rows] = await connection.execute('SELECT * FROM customer_info WHERE customer_id = ?', [id]);
        await connection.end(); // Close the connection

        return rows;
    } catch (error) {
        throw new Error(`Error fetching data: ${error.message}`);
    }
}

const fetchCustomerByID = async (id) => {
    try {
        const connection = await connectDB();
        const [rows] = await connection.execute('SELECT * FROM customer_tbl WHERE id = ?', [id]);
        await connection.end(); // Close the connection

        return rows;
    } catch (error) {
        throw new Error(`Error fetching data: ${error.message}`);
    }
}

// Function to fetch form fields based on form2-category
const fetchInfoForm = async (id, category) => {

    let connection;
    try {
        connection = await connectDB();

        // Construct the SQL query
        const query = `
            SELECT name, type, label, required
            FROM data_form2_fields
            WHERE category = ?
        `;

        // Execute the query
        const [rows] = await connection.execute(query, [category]);
        await insertCustomerInfo(id, category, rows, connection);
        await connection.end(); // Close the connection
        const infoForm = {};
        rows.forEach((row) => {
            infoForm[row.name] = row
        })
        return infoForm;
    } catch (error) {

        if (connection) {
            await connection.end(); // Ensure connection is closed in case of error
        }
        throw new Error(`Error fetching form fields: ${error.message}`);
    }
};


const insertCustomerInfo = async (customerId, category, fields, connection) => {
    try {
        // Construct the SQL query
        const query = `
            INSERT INTO customer_info (customer_id, category, field_name, field_value)
            VALUES (?, ?, ?, ?)
        `;
        const queyToCheckExistingRecord = `
        SELECT COUNT(*) as count FROM customer_info 
        WHERE customer_id = ? AND category = ? AND field_name = ?
        `
        // Execute the query for each field

        for (const eachField of fields) {
            const [existingRecords] = await connection.execute(queyToCheckExistingRecord,
                [customerId, category, eachField["name"]]
            );

            if (existingRecords[0].count > 0) {
                continue;
            }
            const value = [customerId, category, eachField["name"], ''];
            await connection.execute(query, value);
        }

        return { message: 'Initial data inserted successfully' };
    } catch (error) {

        throw new Error(`Error inserting data: ${error.message}`);
    }
};


const updateCustomerInfo = async (id, category, formData) => {
    try {
        const connection = await connectDB();

        // Construct the SQL query

        const query = `
            UPDATE customer_info
            SET field_value = ?
            WHERE customer_id = ? AND field_name = ? AND category = ? 
        `;

        // Execute the query

        const promises = [];

        for (let key in formData) {
            promises.push(connection.execute(query, [formData[key], id, key, category]));
        }
        const res = await Promise.all(promises);
        await connection.end(); // Close the connection

        return { status: "success", message: 'Data updated successfully', data: { id, category } };
    } catch (error) {
        throw new Error(`Error updating data: ${error.message}`);
    }
};

const fetchDocForm = async (id, category) => {

    let connection;
    try {
        connection = await connectDB();

        // Construct the SQL query
        const query = `
            SELECT name, type, label, required
            FROM data_form3_fields
            WHERE category = ?
        `;

        // Execute the query
        const [rows] = await connection.execute(query, [category]);
        await connection.end(); // Close the connection
        const docForm = {};
        rows.forEach((row) => {
            docForm[row.name] = row
        })
        return docForm;
    } catch (error) {

        if (connection) {
            await connection.end(); // Ensure connection is closed in case of error
        }
        throw new Error(`Error fetching form fields: ${error.message}`);
    }
};

const fetchCompanyCategories = async (groupid) => {

    try {
        const connection = await connectDB();
        const [rows] = await connection.execute('SELECT title, value FROM do_lists WHERE groupid = ?', [groupid]); // Replace with your actual table name
        await connection.end(); // Close the connection
        return rows;
    } catch (error) {
        throw new Error(`Error fetching data: ${error.message}`);
    }

}

const insertCustomerData = async (formData) => {
    try {
        const connection = await connectDB();
        formData = {
            ...applyDefaultValues(formData),

        };

        // Construct the SQL query
        const query = `
            INSERT INTO customer_tbl (
                assigned_to, blacklist, blocked, blood_group, category, demography, dob, email1,
                email2, fax, full_name, gst, mobile, mobile_others, organization, owner,
                pan, profile_code, remarks, tags, website,created_by,created_on,edited_by,edited_on
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        // Extract values from formData
        const values = [
            formData.assigned_to, formData.blacklist, formData.blocked, formData.blood_group,
            formData.category, formData.demography, formData.dob, formData.email1,
            formData.email2, formData.fax, formData.full_name, formData.gst,
            formData.mobile, formData.mobile_others, formData.organization, formData.owner,
            formData.pan, formData.profile_code, formData.remarks, formData.tags, formData.website,
            formData.created_by, formData.created_on, formData.edited_by, formData.edited_on
        ];


        // Execute the query
        const [result] = await connection.execute(query, values);

        const { insertId } = result;

        await insertDocStatus(insertId, connection);
        await connection.end(); // Close the connection


        return { id: insertId, category: formData.category };;
    } catch (error) {
        if (connection) {
            await connection.end(); // Ensure connection is closed in case of error
        }
        throw new Error(`Error fetching form fields: ${error.message}`);

    }
};

const insertDocStatus = async (customerId, connection) => {

    try {
        const query = `INSERT INTO docs_status (customer_id, status) VALUES(?, ?)`;
        const values = [customerId, 'new'];

        // Execute the query to update the status to "processing"
        await connection.execute(query, values);

    } catch (error) {

        throw new Error(`Error inserting data: ${error.message}`);

    }
};

const updateDocStatus = async (customerId, status) => {
    const connection = await connectDB();
    try {
        const query = `UPDATE docs_status SET status = ? WHERE customer_id = ?`;
        const values = [status, customerId];

        // Execute the query to update the status to "processing"
        await connection.execute(query, values);

        await connection.end(); // Close the connection
        return { status: "success", message: 'Data updated successfully' };
    } catch (error) {
        throw new Error(`Error updating doc status: ${error.message}`);
    }
};

const updateCustomerData = async (formData) => {
    try {
        const connection = await connectDB();

        // format payload
        formData = {
            ...applyDefaultValues(formData),
        };


        // Construct the SQL query
        const query = `
        UPDATE customer_tbl
        SET
        assigned_to = ?, blacklist = ?, blocked = ?, blood_group = ?, category = ?, demography = ?, 
        dob = ?, email1 = ?, email2 = ?, fax = ?, full_name = ?, gst = ?, mobile = ?, 
        mobile_others = ?, organization = ?, owner = ?, pan = ?, profile_code = ?, 
        remarks = ?, tags = ?, website = ?, edited_by = ?, edited_on = ?
        WHERE id = ?
        `;

        // Extract values from formData
        const values = [
            formData.assigned_to, formData.blacklist, formData.blocked, formData.blood_group,
            formData.category, formData.demography, formData.dob, formData.email1,
            formData.email2, formData.fax, formData.full_name, formData.gst,
            formData.mobile, formData.mobile_others, formData.organization, formData.owner,
            formData.pan, formData.profile_code, formData.remarks, formData.tags, formData.website,
            formData.edited_by, formData.edited_on, formData.id

        ];

        // Execute the query
        const [result] = await connection.execute(query, values);

        await connection.end(); // Close the connection

        return { id: formData.id, category: formData.category };
    } catch (error) {

        throw new Error(`Error inserting data: ${error.message}`);
    }
};

const fetchFiles = async (subProjectId, order_id) => {

    try {

        // Construct the folder path using the customer ID
        const folderPath = path.join(__dirname, '../subProjectDocs', `subProject_${subProjectId}_${order_id}`);
      


        // Check if the folder exists
        if (!fs.existsSync(folderPath)) {
            // Throw a custom error for folder not found with 404 status
            const error = new Error(`No folder found for subProject ID: ${subProjectId}`);
            error.statusCode = 404;  // Custom status code for not found


            throw error;
        }

        // Read all files inside the folder
        const files = await fs.promises.readdir(folderPath);

        // If you need the full paths of the files, you can map the file names to their full paths
        // const filePaths = files.map(file => path.join(folderPath, file));
        // Build file paths and include MIME types
        const fileDetails = files.map((file) => {
            const fullPath = `/subProject-docs/subProject_${subProjectId}_${order_id}/${file}`;
            const mimeType = mime.lookup(file) || 'application/octet-stream';
            return { url: fullPath, name: file, mimeType };
        });

        return fileDetails;
    } catch (error) {
  

        throw error
    }
}


const uploadFileService = async (file, subProjectId, orderId, fileName) => {
    const subProjectDir = path.join(__dirname, '..', 'subProjectDocs', `subProject_${subProjectId}_${orderId}`);

    // Check if directory exists, create if not
    if (!fs.existsSync(subProjectDir)) {
        fs.mkdirSync(subProjectDir, { recursive: true });
    }

    let existingFiles;
    try {
        // Read existing files in the customer directory
        existingFiles = await fs.promises.readdir(subProjectDir);
    } catch (err) {
        throw new Error('Failed to read directory');
    }


    

    // Filter existing files that start with the field name
    const filesToDelete = existingFiles.filter(existingFile => {
        const preFileName = existingFile.split("-")[0];
        return preFileName === fileName;
    });

    // Delete the files asynchronously
    for (const existingFile of filesToDelete) {
        const filePath = path.join(subProjectDir, existingFile);
        try {
            await fs.promises.unlink(filePath);
        } catch (err) {
            console.error(`Failed to delete file ${filePath}: ${err.message}`);
        }
    }

    // Move the new file
    const oldPath = file.filepath;
    const newPath = path.join(subProjectDir, `${fileName}-${file.originalFilename}`);

    try {
        await fs.promises.rename(oldPath, newPath);
        return { status: "success", message: 'File uploaded successfully' };
    } catch (err) {
        throw new Error('Failed to move file');
    }
};







const insertSubProjectDetail = async (formData) => {
    let connection;
    try {


        connection = await connectDB();

        // Construct the SQL query using INSERT ... ON DUPLICATE KEY UPDATE
        const query = `
         INSERT INTO projects_detail (
             data_project_id, project_title, status
         ) VALUES (?, ?, ?)
         ON DUPLICATE KEY UPDATE
             project_title = VALUES(project_title),
             status = VALUES(status)
     `;

        // Extract values from formData
        const values = [
            formData.data_project_id, formData.project_title, formData.status
        ];


        // Execute the query
        const [result] = await connection.execute(query, values);

        const { insertId } = result;
        formData["insertID"] = insertId;

        await insertSubProjectFormData(formData, connection);
        await connection.end(); // Close the connection

        return { subProjectId: insertId };
    } catch (error) {
        if (connection) {
            await connection.end(); // Ensure connection is closed in case of error
        }
        throw new Error(`Error fetching form fields: ${error.message}`);

    }
};


const updateSubProjectDetail = async (formData) => {
    let connection;
    try {



        connection = await connectDB();
        // formData = {
        //     ...applyDefaultValues(formData),

        // };

        // Construct the SQL query
        const query = `
            UPDATE projects_detail 
            SET 
            project_title=?,status = ?
            WHERE id = ?
               
        `;

        // Extract values from formData
        const values = [
            formData.project_title, formData.status, formData.subProjectId
        ];


        // Execute the query
        const [result] = await connection.execute(query, values);


        await updateSubProjectFormData(formData, connection);
        await connection.end(); // Close the connection


        return { subProjectId: formData.subProjectId };
    } catch (error) {

        if (connection) {
            await connection.end(); // Ensure connection is closed in case of error
        }
        throw new Error(`Error fetching form fields: ${error.message}`);

    }
};


const insertSubProjectFormData = async (formData, connection) => {
    try {



        // Construct the SQL query
        const query = `
            INSERT INTO project_detail_data (
                project_detail_id, order_id,name,form_json,form_json_data
            ) VALUES (?, ?, ?, ?, ?)
        `;

        // Extract values from formData
        const values = [
            formData?.insertID, formData.order_id, formData.name, formData.form_json, formData.form_json_data
        ];



        // Execute the query
        await connection.execute(query, values);


    } catch (error) {
        if (connection) {
            await connection.end(); // Ensure connection is closed in case of error
        }


        throw new Error(`Error fetching form fields: ${error.message}`);

    }
};



const updateSubProjectFormData = async (formData, connection) => {
    try {




        // formData = {
        //     ...applyDefaultValues(formData),

        // };

        // Construct the SQL query
        // const query = `
        //     UPDATE project_detail_data
        //     SET
        //     form_json_data = ?
        //     WHERE project_detail_id = ?  AND order_id = ?
        // `;

        // Construct the SQL query using INSERT ... ON DUPLICATE KEY UPDATE
        const query = `
          INSERT INTO project_detail_data (project_detail_id, order_id,name,form_json,form_json_data)
          VALUES (?, ?, ?, ?, ?)
          ON DUPLICATE KEY UPDATE
          form_json_data = VALUES(form_json_data)
      `;

        // Extract values from formData
        const values = [
            formData.subProjectId, formData.order_id, formData.name, formData.form_json, formData.form_json_data
        ];


        // Execute the query
        const [result] = await connection.execute(query, values);


    } catch (error) {
        if (connection) {
            await connection.end(); // Ensure connection is closed in case of error
        }
        throw new Error(`Error fetching form fields: ${error.message}`);

    }
};



module.exports = {
    fetchCompanyCategories,
    insertCustomerData,
    fetchInfoForm,
    updateCustomerInfo,
    fetchDocForm,
    fetchCustomerByID,
    updateCustomerData,
    fetchCustomerInfoByID,
    fetchFiles,
    uploadFileService,
    updateDocStatus,

    fetchProjectDetail,
    fetchProjects,
    fetchProjectForms,
    insertSubProjectDetail,
    updateSubProjectDetail,
    fetchFormData


}