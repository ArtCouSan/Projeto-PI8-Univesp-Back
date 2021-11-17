export interface ReceitaSaveDTO {
    cpfPaciente: string;
    crmMedico: string;
    cnpjHospital: string;
    file: Express.Multer.File
}