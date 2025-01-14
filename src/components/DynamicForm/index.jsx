import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';


const DynamicForm = ({ formik, config, categories, partners, onChange }) => {

    // Render form fields based on configuration

    const renderField = (key, fieldConfig) => {


        const getOptions = (key) => {
            switch (key) {
                case 'category':
                    return categories;
                case 'partners':
                    return partners;
                case 'blacklist':
                    return [
                        { title: "False", value: "false" },
                        { title: "True", value: "true" }
                    ]
                case 'blocked':
                    return [
                        { title: "False", value: "false" },
                        { title: "True", value: "true" }
                    ]
                default:
                    return [];
            }
        };

        switch (fieldConfig?.type) {


            case 'dataSelectorFromTable':
                return (
                    <Grid key={key} item xs={12} md={6} className="fieldContainer">
                        <Typography className="form-label" variant="body1" >{fieldConfig?.label}</Typography>
                        <select
                            name={key}
                            onBlur={formik.handleBlur}
                            value={formik.values[key] || ""}
                            onChange={formik.handleChange}
                            className="styledSelect"
                        >
                            <option value="">Select {fieldConfig?.label}</option>
                            {getOptions(key).map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.title}
                                </option>
                            ))}

                        </select>
                        {formik.touched[key] && formik.errors[key] &&
                            <Typography className="error">
                                {formik.errors[key]}
                            </Typography>
                        }
                    </Grid>
                );
            case 'select':
                return (
                    <Grid key={key} item xs={12} md={6} className="fieldContainer">
                        <Typography className="form-label" variant="body1" >{fieldConfig?.label}</Typography>
                        <select
                            name={key}
                            value={formik.values[key] || ""}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="styledSelect"
                        >
                            <option value="">Select {fieldConfig?.label}</option>
                            {fieldConfig?.options?.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}


                        </select>
                        {formik.touched[key] && formik.errors[key] &&
                            <Typography className="error">
                                {formik.errors[key]}
                            </Typography>
                        }
                    </Grid>
                );
            case 'textarea':
                return (
                    <Grid key={key} item xs={12} className="fieldContainer">
                        <Typography className="form-label" variant="body1" >{fieldConfig?.label}</Typography>
                        <textarea
                            name={key}
                            id={key}
                            value={formik.values[key] || ""}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="textAreafield"

                        />
                        {formik.touched[key] && formik.errors[key] &&
                            <Typography className="error">
                                {formik.errors[key]}
                            </Typography>
                        }
                    </Grid>
                );
            case "file":
                return <Grid key={key} item xs={12} md={6} className="fieldContainer">
                    <Typography className="form-label" variant="body1" >{fieldConfig?.label}</Typography>
                    <input

                        name={key}
                        className="inputStyle"
                        type="file"

                        onBlur={formik.handleBlur}
                        onChange={(e) => onChange(e, key)}

                    />
                    {formik.touched[key] && formik.errors[key] &&
                        <Typography className="error">
                            {formik.errors[key]}
                        </Typography>
                    }
                </Grid>
            default:
                return <Grid key={key} item xs={12} md={6} className="fieldContainer">
                    <Typography className="form-label" variant="body1" >{fieldConfig?.label}</Typography>
                    <input

                        name={key}
                        className="inputStyle"
                        type={fieldConfig?.type || "text"}
                        value={formik.values[key] || ""}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}

                    />
                    {formik.touched[key] && formik.errors[key] &&
                        <Typography className="error">
                            {formik.errors[key]}
                        </Typography>
                    }
                </Grid>
        }
    }

    return (
        <>
            {typeof config === "object" && config !== null ? (
                Object.keys(config).map(key => renderField(key, config[key]))
            ) : null}
        </>
    );
};

export default DynamicForm;
