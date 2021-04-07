import {UnControlled as CodeMirror} from 'react-codemirror2'
import Head from 'next/head'
import Link from 'next/link'
import React, { useState } from 'react'


export default function Home() {

  // const [codeMirrorOptions, setCodeMirrorOptions] = useState({ theme: "material", lineNumbers: true, mode: "xml", autoRefresh: {force: true}})
  const [editorCode, setEditorCode] = useState("<h1>I love react-codemirror2</h1>")
  const [generatedLink, setGeneratedLink] = useState("")

  let modeLoaded = false
  var my_lzma = require('lzma/src/lzma_worker.js').LZMA_WORKER;
  var editorInstance = null
  // const [editorInstance, setEditorInstance] = useState();
  const [lang, setLang] = useState("xml");
  const [modeVar, setModeVar] = useState("xml");

  React.useEffect(() => {  
    var url_string = window.location.href
    var url = new URL(url_string);
    var langParam = url.searchParams.get("lang");
    console.log("lang: " + langParam);    

    // setLang("xml")
    // setMode("xml")


      setTimeout(()=>{
        if (langParam){
          setLang(langParam)
          setMode(langParam)
          document.getElementById("lang").value = langParam
        }else{
          setLang("html")
          setMode("html")
        }
      }, 300)

    if (typeof window !== 'undefined' && typeof window.navigator !== 'undefined') {
      require('codemirror/mode/xml/xml')
      modeLoaded = true
      console.log("MODE LOADED.")
    }
    let base64 = window.location.hash.substr(1);
    console.log(base64)
    if (base64.length !== 0) {
      urlToCode(base64)
    }

  }, []);

  React.useEffect(() => {  
    
    console.log("CHECKING LINK...")
    if (generatedLink != ""){
      console.log(generatedLink)
    }

  }, [generatedLink]);

  React.useEffect(() => {  
    if (modeLoaded == true && editorInstance != null){
      console.log("LOADING MODE?")
      console.log(editorInstance)
      setMode(lang)
    }
  }, [modeLoaded])

  // React.useEffect(() => {  
  //   console.log("LANG UPDATED?")
  //   setMode(lang)    
  // }, [lang])

  // if (editorInstance){    
  //   // setEditorInstance(undefined);
  //   console.log("REFRESH? " + lang)
  //   editorInstance.setOption('mode', lang);
  //   editorInstance.refresh()
  // }

  function selectedLanguage(e){
    e.preventDefault()
    console.log("Selected Lang " + e.target.value)    
    setLang(e.target.value)
    setMode(e.target.value)
    console.log(editorInstance)

    // editorInstance.refresh()
    // editorInstance.setOption('mode', lang);
  }

  function setMode(language){

    console.log(language)
    if (language === undefined){
      return
    }

    var langSelect = language.toLowerCase()

    var newMode = langSelect

    if (langSelect == "java"){
      require(`codemirror/mode/clike/clike`)
      newMode = "text/x-java"
    }else if (langSelect == "html"){
      newMode = "xml"
      require(`codemirror/mode/xml/xml`)
    }else{
      require(`codemirror/mode/${langSelect}/${langSelect}`)
    }
    // editorInstance.refresh()
    setModeVar(newMode)

    // setModeVar(newMode)
    // codeMirrorOptions.mode = langSelect    
    console.log("Setting Mode: ")
    // console.log(editorInstance)
    // editorInstance.refresh()
    // editorInstance.setOption('mode', newMode);    
    // editorInstance.setOption('mode', newMode);

  }

  function init(){
    editorInstance.setOption('mode', lang.toLowerCase());    
  }

  function generateLink(e){
    e.preventDefault()
    const data = editorCode
    console.log("Link generated..")
    console.log(editorCode)
    codeToURL(data).then((res)=>{
      console.log(res)
      // window.open("?lang=" + codeMirrorOptions.mode + "#" + res, "_self")
      var domain = window.location.href
      if (window.location.href.includes("?")){
        domain = window.location.href.split("?")[0]
      }
      var newUrl = domain + "?lang=" + lang + "#" + res
      setGeneratedLink(newUrl)
      console.log(newUrl)
    })
    
  }

  async function codeToURL(code){
    return new Promise( (resolve,reject)=>{        
        my_lzma.compress(code, 1, (res,err)=>{
            console.log(res)
            var binary = '';
            var bytes = new Uint8Array( res );
            // console.log("bytes: " + bytes)
            var len = bytes.byteLength;
            for (var i = 0; i < len; i++) {
                binary += String.fromCharCode( bytes[ i ] );
            }
            // console.log("binary: " + binary)
            var encoded = btoa(binary)
            // console.log("base64: " + encoded)
            resolve(encoded); 
        })
    })
  }

  function urlToCode(url){
    var decoded = atob(url)    
    var array = []
    for (var char of decoded.split('')){
        array.push(char.charCodeAt(0))
    }
    // console.log(array)
    var decodedBytes = new Uint8Array(array);
    // console.log(decodedBytes)
    my_lzma.decompress(decodedBytes,  (res,err)=>{
        // console.log("DECODED LZMA : " + res)
        setEditorCode(res)
        // editorInstance.setValue(res);
        // editor.setOption('mode', "xml");

    })  
  }


  return (    
    <div>
      <Head>
        {/* <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css" /> */}
        <link rel="stylesheet" href="codemirror/lib/codemirror.css" />
        <link rel="stylesheet" href="codemirror/theme/material.css" />
        {/* <link rel="stylesheet" href="bootstrap/dist/css/bootstrap.min.css" /> */}

        {/* <script src="codemirror/xml/xml.js" /> */}
        <title>ChaseBin</title>
        <meta name="title" content="ChaseBin" />
        <meta name="description" content="Quickly and easily present visually pleasing code. No storage of any kind." />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://chasebin.vercel.app/" />
        <meta property="og:title" content="ChaseBin" />
        <meta property="og:description" content="Quickly and easily present visually pleasing code. No storage of any kind." />
        <meta property="og:image" content="preview.png" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://chasebin.vercel.app/" />
        <meta property="twitter:title" content="ChaseBin" />
        <meta property="twitter:description" content="Quickly and easily present visually pleasing code. No storage of any kind." />
        <meta property="twitter:image" content="preview.png" />
        <script src="/client.js"></script>
      </Head>
      <div id="header">
        <Link href="/">
          <div className="inner" style={{marginRight: '50px', cursor: 'pointer'}}>
            <h1 className="title"><span className="title2">{"{"}</span> ChaseBin <span className="title2">{"}"}</span></h1>
            <span>
          </span> 
          </div>
        </Link>

        <select id="lang" onChange={e=>{selectedLanguage(e)}}>
          <option>XML</option>
          <option>HTML</option>
          <option>JAVA</option>
          <option>CSS</option>
          <option>PYTHON</option>
        </select>
        <div className="inner" style={{marginLeft: '50px', height: '100%'}}>

          <button onClick={e=>generateLink(e)} style={{background:'#FCBF49', borderColor: '#000000', color: '#003049'}} type="button">
            Generate Link
          </button>
          {/* <Button onClick={_=>generateLink()} style={{background:'#FCBF49', borderColor: '#000000', color: '#003049'}}variant="success">Generate Link</Button>{' '} */}
        </div>
      </div>
      <div id="generatedLink" hidden={generatedLink == ""}>
        <input value={generatedLink} readOnly={true}/>
        <button id="linkButton" style={{width: '80px'}} onClick={_=>{
            navigator.clipboard.writeText(generatedLink).then(result=>{
              document.getElementById("linkButton").style.color = "green"
              document.getElementById("linkButton").innerText = "Copied!"
            })
        }}>Copy</button>
        <button onClick={_=>{
          setGeneratedLink("")
        }}>Close</button>
      </div>
      <CodeMirror     
        value={editorCode}
        options={{
          mode: modeVar,
          theme: "material",
          autoRefresh: {force: true},
          autoRefresh: true,
          highlightSelectionMatches: true,
          matchBrackets: true,
          lineNumbers: true}}
        editorDidMount={editor => {
          editor.refresh()
          setTimeout(()=> {
            editor.refresh()
            editorInstance = editor
            console.log("SETTING EDITOR INSTANCE...")
            init()
          }, 200);
        }}
        onChange={(editor,changeVal, value)=>{
          // console.log(value)
          setEditorCode(value)
        }}
      />
    </div>
  )
}
