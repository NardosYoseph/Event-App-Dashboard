import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const Export=()=>{
    const [loader,setLoader]=useState();
    const downloadPdf=()=> {
    const capture=document.querySelector(".print");
    setLoader(true);
    html2canvas(capture).then((canvas)=>{
        const imageData=canvas.toDataURL("img/png");
        const doc= new jsPDF('p','mm','a4');
        const componentWidth= doc.internal.pageSize.getWidth();
        const componentHeight=doc.internal.pageSize.getHeight();
        doc.addImage(imageData,'PDF',0,0,componentWidth,componentHeight);
        setLoader(false);
        doc.save('ussdReport.pdf');
    })
    }
}