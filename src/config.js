let baseUrl = window.location.origin + window.location.pathname.split("/").slice(0, 2).join("/") + "/";


export const CONFIG = {
    "baseURL": `${baseUrl}api`,
    "endPoints": {
        "verify-login": "/auth/verify-login",
        "validate-session": "/auth/validate-session",
        "get-all-customers": "/audit/get-all-customers",
        "get-customer-by-id": "/audit/get-customerById",
        "get-customer-info-by-id": "/audit/get-customerInfoById",
        "mainform": "/audit/mainform",
        "company-categories": "/audit/company-categories",
        "mainform-submit": "/audit/mainform-submit",
        "mainform-update": "/audit/mainform-update",
        "info-form": "/audit/info-form",
        "doc-form": "/audit/doc-form",
        "upload-file": "/audit/upload-file",
        "get-files": "/audit/get-customer-files",
        "info-form-update": "/audit/info-form-update",
        "get-app-data": "/app/app-data",
        "update-doc-status": "/audit/update-docs-status",
        "get-docs-status": "/audit/get-docs-status"
    }
}