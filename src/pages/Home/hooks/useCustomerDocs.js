import { useEffect, useState } from "react";
import { useFormik } from 'formik';
import * as Yup from "yup";
import { getDocFrom, uploadFile, getCustFilesByID, updateDocStatus } from "../../../services/auditform"
import { initalizeForm } from "../../../utilities/InitializeForm";
import { toast } from "react-toastify";

const useCustomerDocs = (next, preResponse) => {
   const [loading, setLoading] = useState(false);
   const [docForm, setDocForm] = useState({});
   const [custDocs, setCustDocs] = useState({});

   useEffect(() => {

      fetchDocForm(preResponse)
   }, []);



   useEffect(() => {
      if (preResponse.id) {
         fetchCustDocByID(preResponse.id)
      }
   }, [preResponse.id]);

   const fetchCustDocByID = async (id) => {
      try {
         const params = { id };
         setLoading(true);
         const res = await getCustFilesByID(params);
         setLoading(false);
         setCustDocs(res?.data?.data);
      } catch (error) {
         setLoading(false);
      }
   }

   console.log("docForm", docForm);


   console.log("custDocs", custDocs);


   const fetchDocForm = async (preResponse) => {
      try {
         setLoading(true);
         const params = { id: preResponse.id, category: preResponse.category }
         const res = await getDocFrom(params);
         setDocForm(res.data?.data)
         setLoading(false);
      } catch (error) {
         setLoading(false);
      }

   }
   const baseUrl = `${window.location.origin}`;
   const custDoucments = {};
   const { initialValues, validationSchema } = initalizeForm(docForm, {}, {});

   const formik = useFormik({
      initialValues: initialValues,
      enableReinitialize: true,
      validationSchema: Yup.object().shape(
         validationSchema
      ),
      onSubmit: async (values) => {
         updateDocumentStatus()
      }
   });

   const updateDocumentStatus = async () => {
      try {
         const params = {
            id: preResponse.id,
            status: "processing"
         }
         setLoading(true);
         const res = await updateDocStatus(params);
         next({});
      } catch (error) {
         setLoading(false);
      }
   }

   if (custDocs.length > 0) {
      custDocs.reduce((acc, eachDoc) => {
         const fileName = eachDoc.split("/").pop().split("-")[0];

         const formattedDocPath = `${baseUrl + eachDoc}`;

         initialValues[fileName] = formattedDocPath;
         custDoucments[fileName] = formattedDocPath;

      }, custDoucments)
   } else {

   }

   console.log("initialValues", initialValues);
   console.log("custDoucments", custDoucments);

   const onChange = async (event, key) => {

      try {

         const file = event.target.files[0];


         const { id } = preResponse; // Make sure preResponse contains valid data

         if (!file) {
            toast.error('Please select a file to upload.');
            return;
         }
         formik.setFieldValue(`${key}`, file);
         const formData = new FormData();
         formData.append('file', file);
         formData.append('id', id);
         formData.append('field', key);
         setLoading(true);
         const res = await uploadFile(formData);
         fetchCustDocByID(id);
         setLoading(false);


         if (res.data.status === "success") {

            toast.success(res.data.message);

         } else {
            toast.success(res.data.message)
         }
      } catch (error) {
         setLoading(false);
      }
   }




   return {
      formik,
      docForm,
      loading,
      onChange,
      custDoucments,
      baseUrl
   }
}

export default useCustomerDocs