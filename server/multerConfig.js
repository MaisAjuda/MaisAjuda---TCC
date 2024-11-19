const multer = require('multer');
const path = require('path');

// Configuração do armazenamento
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        const uploadPath = path.resolve(__dirname, "uploads");
        console.log("Destino:", uploadPath); 
        callback(null, uploadPath);
    },
    filename: (req, file, callback) => {
        const time = Date.now(); // Timestamp único para evitar conflitos de nomes

        // Usando um valor seguro para o nome do arquivo
        const cpf = req.cli_cpf || "default"; // Valor padrão caso `req.cli_cpf` esteja ausente
        const safeName = file.originalname.replace(/\s+/g, "_"); // Substituir espaços por underscore
        console.log("Nome do arquivo:", safeName); // Log do nome do arquivo
        callback(null, `${cpf}_${time}_${safeName}`);
    }
});

// Filtros de tipo de arquivo e tamanho máximo
const fileFilter = (req, file, callback) => {
    const allowedMimes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
    if (allowedMimes.includes(file.mimetype)) {
        callback(null, true);
    } else {
        callback(new Error("Tipo de arquivo inválido. Apenas JPEG, JPG, PNG e GIF são permitidos."));
    }
};

// Inicializando o multer com limites
const upload = multer({
    storage: storage,
    limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
    fileFilter: fileFilter
});

module.exports = upload;
