let baseUrl = window.location.origin + window.location.pathname.split("/").slice(0, 2).join("/") + "/";


export const CONFIG = {
    "baseURL": `${baseUrl}api`,
    "endPoints": {
        "verify-login": "/auth/verify-login",
        "validate-session": "/auth/validate-session",
        "get-customer-by-id": "/docufacts/get-customerById",
        "get-customer-info-by-id": "/docufacts/get-customerInfoById",
        "company-categories": "/docufacts/company-categories",
        "mainform-submit": "/docufacts/mainform-submit",
        "mainform-update": "/docufacts/mainform-update",
        "info-form": "/docufacts/info-form",
        "doc-form": "/docufacts/doc-form",
        "upload-file": "/docufacts/upload-file",
        "get-files": "/docufacts/get-subProject-files",
        "info-form-update": "/docufacts/info-form-update",
        "get-app-data": "/app/app-data",
        "update-doc-status": "/docufacts/update-docs-status",
        "get-projects-detail": "/docufacts/get-projects-detail",
        "list-projects": "/docufacts/list-projects",
        "project-forms": "/docufacts/project-forms",
        "submit-form": "/docufacts/submit-form",
        "form-json-data": "/docufacts/form-json-data",
        "update-form": "/docufacts/update-form"
    }
}