export class UploadController {
    static handleUpload(req, res, next) {
        try {
            if (!req.file) {
                res.status(400).json({ error: "No file provided in form-data field 'file'" });
                return;
            }
            const fileUrl = `/uploads/${req.file.filename}`;
            console.log(`File uploaded and mapped: ${req.file.filename}`);
            res.status(201).json({ url: fileUrl });
        }
        catch (error) {
            next(error);
        }
    }
}
