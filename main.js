const { Document, Packer, Paragraph, TextRun, AlignmentType } = require("docx");

function createDocument(dados) {
    return(new Document({
        sections: [{
            properties: {},
            children: [
                new Paragraph({
                    alignment: AlignmentType.CENTER,
                    children: [
                        new TextRun({
                            text: "Texto",
                            bold: true,
                            size: 18, 
                        }),
                    ],
                }),
                new Paragraph({
                    children: [
                        new TextRun(`Eu ${dados.nome.toUpperCase()} sou portador do ${dados.documenttype} nº ${dados.document}`)
                    ]
                }),
            ],
        }],
    }));
}


async function gerar_documento(e) {
    e.preventDefault();
    const dados = {
        nome: document.getElementById("nome").value,
        documenttype: document.getElementById("documenttype").value,
        document: document.getElementById("document").value,
    };
    const doc = createDocument(dados);
    const buffer = await Packer.toBuffer(doc);

    FileSystem.writeFile("Downloads/Documento.docx", buffer);
}