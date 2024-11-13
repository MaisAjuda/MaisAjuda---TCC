const fs = require('fs');
const path = require('path');
const { google } = require('googleapis');

async function UploadFile(fileName, cli_cpf, time, file, res) {
    try {
        const auth = new google.auth.GoogleAuth({
            keyFile: path.resolve(__dirname, '../../maisajuda-441421-55db2a920193.json'),
            scopes: ['https://www.googleapis.com/auth/drive']
        });

        const driveService = google.drive({
            version: 'v3',
            auth: auth
        });

        const fileMetaData = {
            'name': fileName,
            'parents': [process.env.GOOGLE_API_FOLDER_ID]
        };
        console.log('Caminho do arquivo:', filePath);  

        if (!fs.existsSync(filePath)) {
            throw new Error("Arquivo não encontrado no caminho especificado.");
        }

        const media = {
            mimeType: 'image/jpg',
            body: fs.createReadStream(filePath)
        };

        const response = await driveService.files.create({
            resource: fileMetaData,
            media: media,
            fields: 'id'
        });

        return response.data.id;

    } catch (error) {
        console.error("Erro ao fazer upload:", error);
        res.status(500).json({
            msg: "Erro ao fazer upload da foto de perfil",
            erro: error.message
        });
    }
}