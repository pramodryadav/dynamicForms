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
   const [buttonClicked, setButtonClicked] = useState("");
   const [showConfirm, setShowConfirm] = useState(false);

   useEffect(() => {

      fetchDocForm(preResponse)
   }, []);



 

 


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

         if (buttonClicked === "draft") {
            updateDocumentStatus()
         } else if (buttonClicked === "next") {

            setShowConfirm(true);

         }

      }
   });

   const onConfirm = async () => {
      try {
         setShowConfirm(false);
         await updateDocumentStatus();
         next({});
      } catch (error) {

      }

   }

   const updateDocumentStatus = async () => {
      try {
         const params = {
            id: preResponse.id,
            status: "processing"
         }
         setLoading(true);
         const res = await updateDocStatus(params);
         setLoading(false);


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
         formData.append('fileName', key);
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

const closeModal = () => {
   setShowConfirm(false);
}


   return {
      formik,
      docForm,
      loading,
      onChange,
      custDoucments,
      setButtonClicked,
      onConfirm,
      showConfirm,
      closeModal
   }
}

export default useCustomerDocs