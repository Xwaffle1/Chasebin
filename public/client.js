// var my_lzma = new LZMA("lzma/src/lzma_worker.js");
// var base64 = new base64();
// console.log(my_lzma)
// let editorElement = null

// setTimeout(()=>{

//     let editorElement = window.document.getElementsByClassName("react-codemirror2")[0]
//     console.log(editorElement)
//     console.log("EDITOR: " + editorElement)
//     editor = new CodeMirror(document.getElementsByClassName("react-codemirror2")[0], {
//         lineNumbers: true,
//         theme: 'material',
//         mode: window.document.getElementById("lang"),
//         lineWrapping: false,
//     });
//     editorElement.setOption('mode', window.document.getElementById("lang"));
// }, 500); // check again in a second


// async function codeToURL(code){
//     return new Promise( (resolve,reject)=>{        
//         my_lzma.compress(code, 1, (res,err)=>{
//             // console.log(res)
//             var binary = '';
//             var bytes = new Uint8Array( res );
//             // console.log("bytes: " + bytes)
//             var len = bytes.byteLength;
//             for (var i = 0; i < len; i++) {
//                 binary += String.fromCharCode( bytes[ i ] );
//             }
//             // console.log("binary: " + binary)
//             var encoded = btoa(binary)
//             console.log("base64: " + encoded)
//             resolve(encoded); 
//         })
//     })
// }

// function urlToCode(url){
//     // console.log("encoded: " + url)
//     var decoded = atob(url)
//     // console.log("decoded: ")
//     // console.log(decoded)
    
//     var array = []
//     for (var char of decoded.split('')){
//         array.push(char.charCodeAt(0))
//     }
//     // console.log(array)
//     var decodedBytes = new Uint8Array(array);
//     // console.log(decodedBytes)
//     my_lzma.decompress(decodedBytes,  (res,err)=>{
//         console.log("DECODED LZMA : " + res)
//         editor.setValue(res);
//         editor.setOption('mode', "xml");

//     })
// }