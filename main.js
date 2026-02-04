import { Document, Packer, Paragraph, TextRun, AlignmentType } from "docx";

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
    
    try {
        const blob = await docx.Packer.toBlob(doc);
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `Declaracao_${dados.nome}.docx`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    } catch (error) {
        console.error("Erro ao gerar o documento:", error);
        alert("Erro ao gerar o arquivo.");
    }
}