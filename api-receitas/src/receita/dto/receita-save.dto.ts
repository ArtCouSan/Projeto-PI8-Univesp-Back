export interface ReceitaSaveDTO {
    cpfPaciente: string;
    crmMedico: string;
    file: Express.Multer.File
}