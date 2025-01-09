const path = require('path');
const fs = require('fs');
const connectDB = require("../config/db");
const { applyDefaultValues } = require("../utils/customerTblDefaultValues");

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

const fetchFilesByCustomerId = async (customerId) => {

    try {

        // Construct the folder path using the customer ID
        const folderPath = path.join(__dirname, '../customerdata', `customer${customerId}`);

        // Check if the folder exists
        if (!fs.existsSync(folderPath)) {
            // Throw a custom error for folder not found with 404 status
            const error = new Error(`No folder found for customer ID: ${customerId}`);
            error.statusCode = 404;  // Custom status code for not found

            throw error;
        }

        // Read all files inside the folder
        const files = await fs.promises.readdir(folderPath);

        // If you need the full paths of the files, you can map the file names to their full paths
        // const filePaths = files.map(file => path.join(folderPath, file));
        const filePaths = files.map(file => `/cust-docs/customer${customerId}/${file}`);

        return filePaths;
    } catch (error) {
        throw error
    }
}


const uploadFileService = async (file, id, field) => {
    const customerDir = path.join(__dirname, '..', 'customerdata', `customer${id}`);

    // Check if directory exists, create if not
    if (!fs.existsSync(customerDir)) {
        fs.mkdirSync(customerDir, { recursive: true });
    }

    let existingFiles;
    try {
        // Read existing files in the customer directory
        existingFiles = await fs.promises.readdir(customerDir);
    } catch (err) {
        throw new Error('Failed to read directory');
    }

    // Filter existing files that start with the field name
    const filesToDelete = existingFiles.filter(existingFile => {
        const preField = existingFile.split("-")[0];
        return preField === field;
    });

    // Delete the files asynchronously
    for (const existingFile of filesToDelete) {
        const filePath = path.join(customerDir, existingFile);
        try {
            await fs.promises.unlink(filePath);
        } catch (err) {
            console.error(`Failed to delete file ${filePath}: ${err.message}`);
        }
    }

    // Move the new file
    const oldPath = file.filepath;
    const newPath = path.join(customerDir, `${field}-${file.originalFilename}`);

    try {
        await fs.promises.rename(oldPath, newPath);
        return { status: "success", message: 'File uploaded successfully' };
    } catch (err) {
        throw new Error('Failed to move file');
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
    fetchFilesByCustomerId,
    uploadFileService,
    updateDocStatus,
    fetchProjectDetail,
    fetchProjects


}