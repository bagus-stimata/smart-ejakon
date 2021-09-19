// import axios_http from "@/services/my-axios-http.js";
import axios_http from "@/my-axios-http.js";

class MyUploadFilesService {

    uploadImage(file, onUploadProgress) {
        let formData = new FormData();

        formData.append("file", file);

        return axios_http.post("/upload_image", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            },
            onUploadProgress
        });
    }

    uploadDocument(file, onUploadProgress) {
        let formData = new FormData();

        formData.append("file", file);

        return axios_http.post("/upload_file", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            },
            onUploadProgress
        });
    }

    getFiles() {
        return axios_http.get("/files");
    }
}

export default new MyUploadFilesService();